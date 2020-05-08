import { getTraitName } from './trait_names';
import { create_UUID, orderByMultipleProperties } from './shared/functions';
import upgrades from './upgrades/upgrades';
import employees from './employees/employees';
import machines from './machines/machines';
import moment from 'moment';
import employeeTypes from './employees/employee_types';
import employeeAllocations from './employees/employee_allocation';
import poissonProcess from 'poisson-process';
import machineTypes from './machines/machine_types';
import machineRoles from './machines/machine_roles';
import machineBuildPermission from './machines/machine_build_permission';
import bulmaQuickview from 'bulma-extensions/bulma-quickview/dist/js/bulma-quickview';
import initialValues from './save_data/initial_values';
import debugValues from './save_data/debug_values';

const version = '0.9.2';
const tickLengthMs = 20;
const debug = true && process.env.NODE_ENV === 'development';

const traitsState = {
	version: version,

	tickLengthMs: tickLengthMs,
	lastTickTime: moment(),
	tickInProgress: false,

	// visuals
	visualStorageMax: 16, // empirically derived as it goes very screwy after this...
	wrapperHeight: 92, //vh, height of main #wrapper
	justFailedMs: 1250,
	deliveryFadeOutTimeMs: 2500, // matches complex.scss

	// time
	startTime: moment(),

	gameComplete: false,
	gameWinTime: moment.duration(123456),

	// employees
	allEmployees: [],

	// upgrades
	allUpgrades: [],

	initComplete: false,

	init(savedValues) {
		let values = debug ? debugValues : initialValues;

		// console.log(savedValues);
		if (savedValues) {
			for (let prop in savedValues) {
				switch (prop) {
					case 'totalTimePlayed':
						values[prop] = moment.duration(savedValues[prop]);
						break;
					default:
						values[prop] = savedValues[prop];
						break;
				}
			}

			for (let i in values['employees']) {
				values['employees'][i].outputMultiplier = 1;
				values['employees'][i].costMultiplier = 1;
				values['employees'][i].workPerSecondMultiplier = 1;
				values['employees'][i].workRequiredMultiplier = 1;
			}
		}

		for (let prop in values) {
			traitsState[prop] = values[prop];
		}

		traitsState.allUpgrades = [];
		traitsState.allEmployees = [];
		traitsState.machines.all = [];

		traitsState.machines.unlocked = false;
		traitsState.massDelivery.isActive = false;

		let employeeId = 0;
		employees.forEach((e) => {
			traitsState.allEmployees.push({ id: employeeId, ...e });
			employeeId++;
		});

		traitsState.getEmployeeByType(
			employeeTypes.PRODUCTION
		).allocation.manual =
			traitsState.employees[employeeTypes.PRODUCTION].hiredAmount;

		let machineId = 0;

		machines.forEach((m) => {
			traitsState.machines.all.push({ id: machineId, ...m });
			machineId++;
		});

		traitsState.machines.all = traitsState.machines.all.sort(
			orderByMultipleProperties('role', 'baseCost')
		);

		// console.log(traitsState.machinesBuilt);
		for (let builtMachineType in traitsState.machinesBuilt) {
			let amount = traitsState.machinesBuilt[builtMachineType];
			if (amount > 0) {
				traitsState.getMachineByType(
					builtMachineType
				).builtAmount += amount;

				// reallocate workers for maximum efficiency
				let workers = traitsState.getEmployeeByType(
					employeeTypes.PRODUCTION
				);

				if (
					workers.canReallocate(
						employeeAllocations.MACHINE,
						traitsState
					)
				) {
					workers.reallocate(
						employeeAllocations.MACHINE,
						traitsState
					);
				}
			}
		}
		// console.log(traitsState.getMachineByType(machineTypes.LOADER).builtAmount + ' loaders');

		traitsState.allUpgrades = upgrades.loadAll();
		if (values.upgradesPurchased && values.upgradesPurchased.length > 0) {
			for (let u in values.upgradesPurchased) {
				const upgrade = traitsState.getUpgradeByKey(
					values.upgradesPurchased[u]
				);
				if (upgrade) {
					traitsState.applyUpgrade(upgrade);
				}
			}
		}

		let p = poissonProcess.create(
			traitsState.massDelivery.averageWaitInMilliseconds,
			traitsState.massDelivery.trigger
		);
		p.start();

		traitsState.stored = Math.min(
			traitsState.stored,
			traitsState.currentStorageSize()
		);

		// reallocate workers for maximum efficiency
		let prodWorkers = traitsState.getEmployeeByType(
			employeeTypes.PRODUCTION
		);

		while (
			prodWorkers.canReallocate(employeeAllocations.MACHINE, traitsState)
		) {
			prodWorkers.reallocate(employeeAllocations.MACHINE, traitsState);
		}

		traitsState.updateVisualStorage();

		traitsState.initComplete = true;
		traitsState.lastTickTime = moment();
	},

	makeWorkPerSecond() {
		return traitsState.makeRateBase * traitsState.makeRateMultiplier;
	},

	// delivery constants
	massDelivery: {
		averageWaitInMilliseconds: 1000 * 200,
		isActive: false,

		trigger() {
			traitsState.massDelivery.isActive = true;
		},
		perform() {
			let s = traitsState.stored;
			let numberToDeliver = 0;
			if (s < 100) {
				numberToDeliver = s;
			} else if (s < 10000) {
				numberToDeliver = Math.floor(s * 0.5);
			} else if (s < 1000000) {
				numberToDeliver = Math.floor(s * 0.4);
			} else {
				numberToDeliver = Math.floor(s * 0.2);
			}
			traitsState.autoDeliverTraits(numberToDeliver);
			traitsState.massDelivery.isActive = false;
		},
	},

	// per second
	getTimeToMake() {
		let secondsRequired =
			(traitsState.workRequiredToMakeTrait * 1.0) /
			(traitsState.makeWorkPerSecond() *
				traitsState.overallWorkMultiplier);
		return secondsRequired;
	},
	getOutcomePerSecond(type) {
		let total = 0;
		traitsState.allEmployees.forEach((e) => {
			if (e.type === type) {
				total += e.outcomePerSecond || 0;
			}
		});

		if (type === employeeTypes.PRODUCTION) {
			// also add machine production
			traitsState.machines
				.getBuiltByRole(machineRoles.PRODUCTION)
				.forEach((m) => {
					total += m.traitsOutputPerSecond || 0;
				});
		}

		return Number.parseFloat(total.toFixed(2));
	},
	getBottleneckedPerSecond() {
		let prod = traitsState.getOutcomePerSecond(employeeTypes.PRODUCTION);
		let storage = traitsState.currentStorageSize();
		let del = traitsState.getOutcomePerSecond(employeeTypes.DELIVERY);

		return Math.min(Math.min(prod, del), storage);
	},

	// storage methods
	currentStorageSize() {
		return Math.min(
			traitsState.getNaturalStorageSize() +
				traitsState.machines.getMachineStorageSize(),
			traitsState.storageMax
		);
	},
	getNaturalStorageSize() {
		return Math.min(
			traitsState.storageBase * traitsState.storageMultiplier,
			traitsState.storageMax
		);
	},

	// upgrade methods
	getUpgradeById(id) {
		return traitsState.allUpgrades.filter((u) => u.id === id)[0];
	},
	tryGetUpgradeByName(name) {
		const u = traitsState.allUpgrades.filter((u) => u.name === name);

		if (u && u.length > 0) {
			return u[0];
		}
		return null;
	},
	getUpgradeByKey(key) {
		return traitsState.allUpgrades.filter((u) => u.key === key)[0];
	},
	getUnlockedUpgrades() {
		return traitsState.allUpgrades.filter(
			(u) =>
				u.unlocked &&
				traitsState.totalDelivered >= u.unlockedAtTraitsDelivered &&
				!u.purchased
		);
	},
	canPurchaseUpgrade(id) {
		const upgrade = traitsState.allUpgrades.filter((u) => u.id === id)[0];
		if (!upgrade) {
			console.error('missing upgrade in canPurchaseUpgrade, id: ' + id);
			return false;
		}

		return traitsState.favours >= upgrade.cost && !upgrade.purchased;
	},
	purchaseUpgrade(id, activatePyro) {
		const upgrade = traitsState.allUpgrades.filter((u) => u.id === id)[0];
		if (!upgrade) {
			console.error('missing upgrade in purchaseUpgrade, id: ' + id);
			return;
		}

		if (!traitsState.canPurchaseUpgrade(id)) {
			console.error(
				'attempting to purchase unpurchasable upgrade: ' + id
			);
			return;
		}

		traitsState.favours -= upgrade.cost;
		traitsState.favoursSpent += upgrade.cost;
		traitsState.applyUpgrade(upgrade, activatePyro);
	},
	applyUpgrade(upgrade, activatePyro) {
		upgrade.purchased = true;
		upgrade.apply(traitsState, activatePyro);

		if (
			traitsState.upgradesPurchased.filter((a) => a === upgrade.key)
				.length === 0
		) {
			traitsState.upgradesPurchased.push(upgrade.key);
		}
	},

	// employee methods
	getUnlockedEmployees() {
		return traitsState.allEmployees.filter((e) => e.unlocked(traitsState));
	},
	canHireEmployee(id) {
		const emp = traitsState.allEmployees.filter((u) => u.id === id)[0];
		if (!emp) {
			console.error('missing employee in canHireEmployee, id: ' + id);
			return false;
		}

		return traitsState.favours >= traitsState.getEmployeeCost(id);
	},
	getEmployeeByType(type) {
		return traitsState.allEmployees.filter((a) => a.type === type)[0];
	},
	getEmployeeCost(id) {
		const emp = traitsState.allEmployees.filter((u) => u.id === id)[0];
		if (!emp) {
			console.error('missing employee in getEmployeeCost, id: ' + id);
			return 9999999999990;
		}

		let status = traitsState.employees[emp.type];
		if (status.hiredAmount === 0) return emp.baseCost;

		let cost =
			emp.baseCost *
			status.costMultiplier *
			Math.pow(traitsState.costScalingBaseMultiplier, status.hiredAmount);
		//		let cost = (emp.baseCost * status.costMultiplier) * (Math.pow(status.hiredAmount, traitsState.costScalingExponent));

		return status.hiredAmount < 15
			? Math.ceil((cost / 2) * 2)
			: Math.ceil(cost / 5) * 5; // round to nearest 5, for fun
	},
	hireEmployee(id) {
		const emp = traitsState.allEmployees.filter((u) => u.id === id)[0];
		if (!emp) {
			console.error('missing employee in hireEmployee, id: ' + id);
			return false;
		}

		let cost = traitsState.getEmployeeCost(id);
		traitsState.favours -= cost;
		traitsState.favoursSpent += cost;

		emp.hire(traitsState);
	},
	canReallocateProdWorker(allocation) {
		let e = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);
		return e.canReallocate(allocation, traitsState);
	},
	reallocateProdWorker(allocation) {
		let e = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

		if (e.canReallocate(allocation, traitsState)) {
			e.reallocate(allocation, traitsState);
		}
	},

	getFlexibleMultiplier(employeeType) {
		if (
			!traitsState.flexibleMachineryUnlocked ||
			traitsState.flexibleMachinerySetting === 0
		)
			return 1;

		switch (employeeType) {
			case employeeTypes.PRODUCTION:
				return (
					1 -
					traitsState.flexibleMachinerySetting *
						traitsState.flexibleMachineFactor
				);
			case employeeTypes.DELIVERY:
				return (
					1 +
					traitsState.flexibleMachinerySetting *
						traitsState.flexibleMachineFactor
				);
			default:
				console.error(
					'called getFlexibleMultiplier with wrong type: ' +
						employeeType
				);
		}

		return 1;
	},

	// machines
	machines: {
		unlocked: false,
		justBuilt: false,
		all: [],
		cancellationRefundFactor: 0.5,
		getBuiltByRole(role) {
			return traitsState.machines.all.filter(
				(a) => a.role === role && a.builtAmount > 0
			);
		},
		getCountByRole(role) {
			let all = traitsState.machines.getBuiltByRole(role);
			if (all.length > 0) {
				return all
					.map((a) => a.builtAmount || 0)
					.reduce((a, b) => a + b);
			} else {
				return 0;
			}
		},
		totalPower(includeBuildQueue) {
			let power = 0;
			traitsState.machines.all
				.filter((a) => a.unlocked && a.builtAmount > 0)
				.forEach((m) => {
					power += m.power * m.builtAmount;
				});

			if (includeBuildQueue) {
				traitsState.machines.buildQueue.forEach((buildItem) => {
					power += traitsState.machines.all.filter(
						(m) => m.type === buildItem.type
					)[0].power;
				});
			}

			return power;
		},
		spreadAllocation(amount) {
			// TODO: consider having an actual object in memory for each machine, would be a LOT cleaner than this nonsense
			// (but it's late and honestly it's not THAT messy, assuming the game stays as simple as intended... :p)
			let machines = traitsState.machines
				.getBuiltByRole(machineRoles.PRODUCTION)
				.sort((a) => a.cost)
				.reverse();

			machines.forEach((m) => {
				m.workers = 0;
				if (amount > 0) {
					// still workers to allocate
					if (amount >= m.builtAmount) {
						m.workers = m.builtAmount;
						amount -= m.builtAmount;
					} else {
						m.workers = amount;
						amount = 0;
					}
				}
			});
		},
		buildQueue: [], // array of buildqueue objects
		getMachineStorageSize() {
			let size = 0;
			traitsState.machines.all
				.filter(
					(a) => a.builtAmount > 0 && a.role === machineRoles.STORAGE
				)
				.forEach((m) => {
					size +=
						m.storage() *
						traitsState.machineStorageMultiplier *
						m.builtAmount;
				});
			return size;
		},
		sell(machine) {
			if (machine.builtAmount <= 0) return;
			machine.builtAmount--;

			let cost = traitsState.getMachineCost(machine.type);
			let refund = traitsState.getCancellationRefundAmount(cost);

			traitsState.favours += refund;
			traitsState.favoursSpent -= refund;

			// reallocate workers for maximum efficiency
			let workers = traitsState.getEmployeeByType(
				employeeTypes.PRODUCTION
			);
			workers.reallocate(employeeAllocations.MANUAL, traitsState);
		},
		tick(delta) {
			if (!traitsState.machines.unlocked) {
				return;
			}

			let machines = traitsState.machines.getBuiltByRole(
				machineRoles.PRODUCTION
			);
			let workers = traitsState.getEmployeeByType(
				employeeTypes.PRODUCTION
			);

			if (!machines) {
				return;
			}

			machines.forEach((m) => {
				if (m.workers > 0) {
					if (workers.work.paused) {
						m.traitsOutputPerSecond = 0;
						m.currentTimeTaken = 0;
					} else {
						// calculate work progress for this machine
						let workPerSecond =
							1.0 *
							traitsState.overallWorkMultiplier *
							m.baseWorkPerSecond() *
							m.workers *
							workers.baseWorkPerSecond *
							traitsState.employees[employeeTypes.PRODUCTION]
								.workPerSecondMultiplier;

						m.work.progress += (workPerSecond * delta) / 1000.0;

						let everFailed = false;
						let outputAmount =
							m.traitsPerOutput *
							traitsState.machineOutputMultiplier *
							traitsState.getFlexibleMultiplier(
								employeeTypes.PRODUCTION
							);

						outputAmount = Math.floor(outputAmount);
						// apply progress
						while (m.work.progress >= m.work.required) {
							let success = traitsState.makeTraits(outputAmount);
							m.work.progress -= m.work.required;

							if (!success) {
								everFailed = true;
							}
						}

						if (everFailed && !m.work.justFailed) {
							m.work.justFailed = true;
							setTimeout(
								() => (m.work.justFailed = false),
								traitsState.justFailedMs
							);
						}

						// set the current rate on the platonic employee object
						let timeRequired =
							(m.work.required * 1.0) / workPerSecond;
						m.currentTimeTaken = timeRequired;

						m.traitsOutputPerSecond = outputAmount / timeRequired;
					}
				} else {
					m.traitsOutputPerSecond = 0;
					m.currentTimeTaken = 0;
				}
			});
		},
	},
	getUnlockedMachines() {
		let totalBuilt = traitsState.machines.all
			.map((a) => a.builtAmount)
			.reduce((a, b) => (a || 0) + (b || 0), 0);

		if (totalBuilt === 0) {
			return traitsState.machines.all.filter(
				(a) => a.unlocked && a.type === machineTypes.LEMON_POWER
			);
		} else {
			return traitsState.machines.all.filter((a) => a.unlocked);
		}
	},
	canBuildMachine(machine) {
		let cost = traitsState.getMachineCost(machine.type);
		let availablePower = Math.min(
			traitsState.machines.totalPower(false),
			traitsState.machines.totalPower(true)
		);

		if (cost > traitsState.favours) {
			return machineBuildPermission.NOFAVOURS;
		} else if (availablePower + machine.power < 0) {
			return machineBuildPermission.NOPOWER;
		} else {
			return machineBuildPermission.SUCCESS;
		}
	},
	getMachineCost(type) {
		let machine = traitsState.getMachineByType(type);
		if (!machine)
			console.error('missing machine in getMachineCost: (' + type + ' )');

		let amountInBuildQueue = traitsState.machines.buildQueue.filter(
			(a) => a.type === type
		).length;

		let totalAmount = machine.builtAmount + amountInBuildQueue;

		if (totalAmount === 0)
			return machine.baseCost * traitsState.machineCostMultiplier;

		let cost =
			machine.baseCost *
			traitsState.machineCostMultiplier *
			Math.pow(traitsState.costScalingBaseMultiplier, totalAmount);
		// let cost = machine.baseCost * traitsState.machineCostMultiplier * (Math.pow(totalAmount, traitsState.costScalingExponent));

		return Math.ceil(cost / 5) * 5; // round to nearest 5, for fun
	},
	addMachineToQueue(machine, cost) {
		if (traitsState.favours - cost < 0) {
			alert('no money for machine, should not happen');
			return;
		}
		traitsState.machines.buildQueue.push({
			type: machine.type,
			cost: cost,
			name: machine.name,
		});

		traitsState.favours -= cost;
		traitsState.favoursSpent += cost;
	},
	getCancellationRefundAmount(cost) {
		return Math.floor(cost * traitsState.machines.cancellationRefundFactor);
	},
	cancelMachineFromQueue(entry, index) {
		let queueEntry = traitsState.machines.buildQueue[index];
		if (queueEntry.type !== entry.type) {
			alert('something weird happened with the build queue, sorry.');
			return;
		}

		traitsState.machines.buildQueue.splice(index, 1);

		let refundAmount = traitsState.getCancellationRefundAmount(entry.cost);

		traitsState.favours += refundAmount;
		traitsState.favoursSpent -= refundAmount;

		if (index === 0) {
			// reset the machine we're actually building
			traitsState.getEmployeeByType(employeeTypes.BUILDER).work.building =
				machineTypes.NONE;
			traitsState.getEmployeeByType(
				employeeTypes.BUILDER
			).work.progress = 0;
		}
	},
	getMachineByType(type) {
		return traitsState.machines.all.filter((m) => m.type === type)[0];
	},
	getCurrentlyBuildingMachine() {
		let builder = traitsState.getEmployeeByType(employeeTypes.BUILDER);
		if (builder && builder.work) {
			return (
				traitsState.getMachineByType(builder.work.building) ||
				traitsState.getMachineByType(machineTypes.NONE)
			);
		}
		return traitsState.getMachineByType(machineTypes.NONE);
	},
	buildMachine(machine, amount) {
		if (!machine) {
			console.error('missing machine in buildMachine');
			return;
		}

		// check machine is still at the front of the buildqueue
		let bqItem = traitsState.machines.buildQueue[0];
		if (!bqItem) {
			console.error(
				'missing buildQueueItem in buildMachine: (' +
					machine.type +
					' )'
			);
			return;
		}

		if (bqItem.type !== machine.type) {
			console.error(
				'incorrect type for buildQueueItem in buildMachine: (' +
					machine.type +
					' )'
			);
			return;
		}

		// check machine still has enough power
		if (traitsState.machines.totalPower() + machine.power < 0) {
			// uhoh
			// autocancel this machine
			traitsState.cancelMachineFromQueue(bqItem, 0);
			return;
		}

		// it's all good
		machine.builtAmount += amount;
		if (traitsState.machinesBuilt[machine.type]) {
			traitsState.machinesBuilt[machine.type] += amount;
		} else {
			traitsState.machinesBuilt[machine.type] = amount;
		}
		traitsState.machines.buildQueue.splice(0, 1);
		traitsState.machines.justBuilt = true;

		// reallocate workers for maximum efficiency
		let workers = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

		if (workers.canReallocate(employeeAllocations.MACHINE, traitsState)) {
			workers.reallocate(employeeAllocations.MACHINE, traitsState);
		}

		return true;
	},

	// making
	onMakeTraitsClicked() {
		if (traitsState.isMakingTraits) {
			return;
		}
		traitsState.isMakingTraits = true;
	},
	progressMakingTraits(delta) {
		if (traitsState.makeProgressPercent >= 100) {
			traitsState.makeProgressPercent = 0; // this one can't wrap over 100 because it can't take place automatically
			traitsState.isMakingTraits = false;
			let success = traitsState.makeTraits(traitsState.madePerClick);
			if (!success && !traitsState.justFailedToMake) {
				traitsState.justFailedToMake = true;
				setTimeout(
					() => (traitsState.justFailedToMake = false),
					traitsState.justFailedMs
				);
			}
			return;
		}

		let amountToProgress = (delta * 1.0) / 1000;

		traitsState.makeProgressPercent +=
			((amountToProgress * 1.0) /
				((traitsState.workRequiredToMakeTrait * 1.0) /
					(traitsState.makeWorkPerSecond() *
						traitsState.overallWorkMultiplier))) *
			100;
	},
	canMakeTraits() {
		return !traitsState.isMakingTraits; // && !traitsState.isStorageFull()
	},
	makeTraits(amount) {
		if (!amount) return 0;
		amount = Math.floor(amount);

		if (!traitsState.isStorageFull()) {
			let amountMade = traitsState.addToStorage(amount);
			traitsState.totalMade += amountMade;
			traitsState.totalWastedProduction += Math.max(
				amount - amountMade,
				0
			);
			return amountMade;
		} else {
			traitsState.totalWastedProduction += Math.max(amount, 0);
			return 0;
		}
	},
	isStorageFull() {
		return traitsState.stored >= traitsState.currentStorageSize();
	},
	increaseStorageSize(amount) {
		traitsState.storageBase += amount;
	},
	increaseStorageMultiplierByAmount(amount) {
		traitsState.storageMultiplier += amount;
	},
	increaseStorageMultiplierByFactor(amount) {
		traitsState.storageMultiplier *= amount;
	},
	updateVisualStorage() {
		if (
			traitsState.storedTraits.filter((a) => !a.delivered).length ===
			traitsState.stored
		)
			return;

		let desiredAmount = Math.min(
			traitsState.visualStorageMax,
			traitsState.stored
		);

		let currentAmount =
			traitsState.stored <= traitsState.visualStorageMax &&
			traitsState.currentStorageSize() < traitsState.visualStorageMax &&
			traitsState.storedTraits.length < traitsState.visualStorageMax + 4 // allow a few extra delivery ones at the margins
				? traitsState.storedTraits.filter((a) => !a.delivered).length
				: traitsState.storedTraits.length; // once we get over the max we don't care whether the visual ones are delivered or not
		if (currentAmount < desiredAmount) {
			for (let i = 0; i < desiredAmount - currentAmount; i++) {
				const newTrait = {
					id: create_UUID(),
					name: getTraitName(),
					delivered: false,
					deliver: function () {
						this.delivered = true;
						traitsState.selfDeliver(1);
						setTimeout(
							() => traitsState.removeFromVisualStorage(this.id),
							traitsState.deliveryFadeOutTimeMs
						);
					},
				};

				newTrait.deliver = newTrait.deliver.bind(newTrait);

				traitsState.storedTraits.push(newTrait);
			}
		}
	},
	addToStorage(amount) {
		if (amount < 0) amount = 0;
		let initialStored = traitsState.stored;
		traitsState.stored = Math.min(
			traitsState.stored + amount,
			traitsState.currentStorageSize()
		);
		// console.log('adding ' + amount + ' to storage; previously ' + initialStored + '; now ' + traitsState.stored);
		traitsState.updateVisualStorage();
		return Math.max(traitsState.stored - initialStored, 0);
	},

	// delivery
	getDeliverySpeed() {
		return (
			traitsState.deliveryRateBase * traitsState.deliveryRateMultiplier
		);
	},
	autoDeliverTraits(amount) {
		if (amount <= 0) return 0;

		traitsState.updateVisualStorage(); // ensure we're starting from a consistent position

		amount = Math.floor(amount);

		let amountDelivered = 0;
		let currentStored = traitsState.stored;

		let amountToDeliver = Math.min(currentStored, amount); // can't deliver more than we have in storage

		if (amountToDeliver === 0) return 0;

		//console.log('attempting ' + amount + ' delivery; ' + currentStored + ' in storage; ' + ' will attempt ' + amountToDeliver);

		let amountRemaining = currentStored - amountToDeliver;
		if (amountRemaining >= traitsState.visualStorageMax) {
			// doesn't affect visual storage at all
			traitsState.selfDeliver(amountToDeliver);
			amountDelivered = amountToDeliver;
		} else if (amountRemaining <= 0) {
			// we're delivering everything in the whole place
			let undeliveredVisuals = traitsState.storedTraits.filter(
				(a) => !a.delivered
			);
			undeliveredVisuals.forEach((a) => a.deliver());
			traitsState.selfDeliver(currentStored - undeliveredVisuals.length);
		} else {
			// we have a few remaining after delivery but we're affecting visuals
			let visualsToAffect =
				traitsState.storedTraits.filter((a) => !a.delivered).length -
				amountRemaining;

			let affectedVisuals = traitsState.storedTraits
				.filter((a) => !a.delivered)
				.slice(0, visualsToAffect); // gets all elements from amount remaining to end

			if (
				visualsToAffect !== affectedVisuals.length ||
				visualsToAffect === 0
			) {
				// debugger;
			}

			//console.log('should affect ' + visualsToAffect + ' traits; found ' + affectedVisuals.length);

			let remainingDeliveries = amountToDeliver - affectedVisuals.length;

			affectedVisuals.forEach((a) => a.deliver()); // each calls selfDeliver itself

			if (remainingDeliveries > 0) {
				traitsState.selfDeliver(remainingDeliveries);
			}

			amountDelivered = amountToDeliver;
		}

		//console.log('delivered ' + amountDelivered + '; leaving ' + traitsState.stored + ' in storage');

		if (amountDelivered < amount) {
			traitsState.totalWastedDeliveries += amount - amountDelivered;
		}

		return amountDelivered;
	},
	selfDeliver(amount) {
		if (amount <= 0) amount = 0;
		traitsState.favours += amount;
		traitsState.totalDelivered += amount;
		traitsState.stored -= amount;
		if (traitsState.stored < 0) {
			traitsState.stored = 0;
		}
	},
	removeFromVisualStorage(id) {
		traitsState.storedTraits = traitsState.storedTraits.filter(
			(t) => t.id !== id
		);
		traitsState.updateVisualStorage();
	},

	attachQuickviews() {
		bulmaQuickview.attach();
	},

	tick(isPaused) {
		if (
			!traitsState.initComplete ||
			isPaused ||
			traitsState.tickInProgress
		) {
			return;
		}

		traitsState.tickInProgress = true;

		try {
			let start = moment();
			let delta = start.diff(traitsState.lastTickTime);

			traitsState.totalTimePlayed.add(delta);

			// if (traitsState.debug && delta > traitsState.tickLengthMs * 2) {
			// 	console.log('tick delta: ' + delta);
			// }

			if (traitsState.isMakingTraits) {
				traitsState.progressMakingTraits(delta);
			}

			traitsState.updateVisualStorage();

			traitsState.allEmployees.forEach((employee) => {
				if (traitsState.employees[employee.type].hiredAmount > 0) {
					employee.tick(delta, traitsState, employee);
				}
			});

			traitsState.machines.tick(delta);

			traitsState.updateVisualStorage();

			traitsState.lastTickTime = moment();
			traitsState.tickInProgress = false;
		} catch (ex) {
			console.error('Exception in tick', ex);
			traitsState.tickInProgress = false;
		}
	},
};

export default traitsState;
