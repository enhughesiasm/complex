import employeeTypes from './employee_types';
import machineTypes from '../machines/machine_types';
import employeeAllocation from './employee_allocation';
import machineRoles from '../machines/machine_roles';

function processTick(delta, traitsState, employee, onCompletion) {
	if (employee.work.paused) {
		employee.outcomePerSecond = 0;
		return;
	}

	let currentEmployeeState = traitsState.employees[employee.type];

	// calculate work progress
	let timeToProgress = (delta * 1.0) / 1000;

	// apply progress
	let progress = timeToProgress * employee.workPerSecond(traitsState);
	employee.work.progress += progress;

	// check for completion
	let actualWorkRequired =
		employee.workRequiredToComplete *
		currentEmployeeState.workRequiredMultiplier;

	let currentOutputAmount = Math.floor(
		employee.outputPerCompletion * currentEmployeeState.outputMultiplier
	);

	if (employee.type === employeeTypes.DELIVERY) {
		let machineAssistance = traitsState
			.getMachineByType(machineTypes.LOADER)
			.totalDeliveryMultiplier();
		currentOutputAmount *= machineAssistance;
		currentOutputAmount = Math.floor(currentOutputAmount);
	}

	currentOutputAmount *= traitsState.getFlexibleMultiplier(employee.type);
	currentOutputAmount = Math.floor(currentOutputAmount);

	if (employee.work.progress >= actualWorkRequired) {
		let everFailed = false;

		// we might have succeeded multiple times if the delta is very large, so make sure all get processed
		while (employee.work.progress > actualWorkRequired) {
			//console.log('completing ' + employee.type);
			let successAmount = onCompletion(currentOutputAmount);
			if (successAmount < currentOutputAmount) {
				everFailed = true;
			}
			employee.work.progress -= actualWorkRequired;
		}

		employee.work.progress = 0;

		if (everFailed && !employee.work.justFailed) {
			employee.work.justFailed = true;
			setTimeout(
				() => (employee.work.justFailed = false),
				traitsState.justFailedMs
			);
		}
	}

	// set the current rate on the platonic employee object
	let timeRequired =
		(actualWorkRequired * 1.0) / employee.workPerSecond(traitsState);
	employee.currentTimeTaken = timeRequired;

	employee.outcomePerSecond = currentOutputAmount / timeRequired;
}

const employees = [
	{
		name: 'Assistants',
		description: 'Hire someone to help make traits.',
		type: employeeTypes.PRODUCTION,
		icon: 'user',
		baseCost: 4,
		unlockedAtTraitsDelivered: 7,
		baseWorkPerSecond: 30, // 0.1,
		workPerSecond(traitsState) {
			return (
				traitsState.overallWorkMultiplier *
				this.baseWorkPerSecond *
				traitsState.employees[employeeTypes.PRODUCTION]
					.workPerSecondMultiplier *
				this.allocation.manual
			);
		},
		workRequiredToComplete: 200,
		outputPerCompletion: 1,
		hiredAmount: 0,
		outcomePerSecond: 0,
		hire(traitsState) {
			traitsState.employees[employeeTypes.PRODUCTION].hiredAmount += 1;

			if (this.canReallocate(employeeAllocation.MACHINE, traitsState)) {
				this.allocation.machines += 1;
			} else {
				this.allocation.manual += 1;
			}

			traitsState.machines.spreadAllocation(this.allocation.machines);
		},
		work: {
			paused: false,
			progress: 0,
			justFailed: false,
		},
		allocation: {
			manual: 0,
			machines: 0,
		},
		canReallocate(allocation, traitsState) {
			let prodMachineCount = traitsState.machines.getCountByRole(
				machineRoles.PRODUCTION
			);

			switch (allocation) {
				case employeeAllocation.MANUAL:
					return this.allocation.machines > 0; // any machine worker can always be reallocated

				case employeeAllocation.MACHINE:
					return (
						this.allocation.manual > 0 &&
						this.allocation.machines < prodMachineCount
					);
				default:
					return false;
			}
		},
		reallocate(allocation, traitsState) {
			if (
				allocation === employeeAllocation.MANUAL &&
				this.canReallocate(allocation, traitsState)
			) {
				this.allocation.machines -= 1;
				this.allocation.manual += 1;
			} else if (
				allocation === employeeAllocation.MACHINE &&
				this.canReallocate(allocation, traitsState)
			) {
				this.allocation.machines += 1;
				this.allocation.manual -= 1;
			}

			traitsState.machines.spreadAllocation(this.allocation.machines);
		},
		unlocked(traitsState) {
			return traitsState.totalDelivered >= this.unlockedAtTraitsDelivered;
		},
		tick(delta, traitsState, employee) {
			processTick(delta, traitsState, employee, traitsState.makeTraits);
		},
	},
	{
		name: 'Volunteers',
		description:
			'A kindly person will carry a trait to the Shop Before Life.',
		icon: 'people-carry',
		type: employeeTypes.DELIVERY,
		baseCost: 4,
		unlockedAtTraitsDelivered: 20,
		// specifics

		workPerSecond(traitsState) {
			return (
				traitsState.overallWorkMultiplier *
				this.baseWorkPerSecond *
				traitsState.employees[employeeTypes.DELIVERY]
					.workPerSecondMultiplier *
				traitsState.employees[employeeTypes.DELIVERY].hiredAmount
			);
		},

		baseWorkPerSecond: 20,
		outputPerCompletion: 1,
		workRequiredToComplete: 280,

		outcomePerSecond: 0,
		deliveryAnimationDuration: 20,
		hire(traitsState) {
			traitsState.employees[employeeTypes.DELIVERY].hiredAmount += 1;
		},
		work: {
			paused: false,
			progress: 0,
			justFailed: false,
		},
		unlocked(traitsState) {
			return traitsState.totalDelivered >= this.unlockedAtTraitsDelivered;
		},
		tick(delta, traitsState, employee) {
			processTick(
				delta,
				traitsState,
				employee,
				traitsState.autoDeliverTraits
			);
		},
	},
	{
		name: 'Amateurs',
		description: 'Some random people will help build your factory.',
		icon: 'hammer',
		type: employeeTypes.BUILDER,

		unlockedAtTraitsDelivered: 400,
		// specifics
		baseWorkPerSecond: 10,
		workPerSecond(traitsState) {
			return (
				traitsState.overallWorkMultiplier *
				this.baseWorkPerSecond *
				traitsState.employees[employeeTypes.BUILDER]
					.workPerSecondMultiplier *
				traitsState.employees[employeeTypes.BUILDER].hiredAmount
			);
		},

		workRequiredToComplete: 10000,
		baseCost: 25,
		outputPerCompletion: 1,

		outcomePerSecond: 0,
		hire(traitsState) {
			traitsState.employees[employeeTypes.BUILDER].hiredAmount += 1;
		},
		work: {
			building: machineTypes.NONE,
			paused: false,
			progress: 0,
			justFailed: false,
		},
		unlocked(traitsState) {
			return traitsState.machines.unlocked;
		},
		checkBuildQueue(traitsState, employee) {
			if (employee.work.building === machineTypes.NONE) {
				if (traitsState.machines.buildQueue.length > 0) {
					employee.work.building =
						traitsState.machines.buildQueue[0].type;
					let machine = traitsState.machines.all.filter(
						(a) => a.type === employee.work.building
					)[0];
					employee.workRequiredToComplete =
						machine.workRequiredToBuild;
				} else {
					// nothing to build
					employee.work.building = machineTypes.NONE;
					employee.outcomePerSecond = 0;
					return;
				}
			}
		},
		tick(delta, traitsState, employee) {
			if (employee.work.paused) {
				employee.outcomePerSecond = 0;
				return;
			}

			let currentEmployeeState =
				traitsState.employees[employeeTypes.BUILDER];

			employee.checkBuildQueue(traitsState, employee);

			if (employee.work.building === machineTypes.NONE) {
				return;
			}

			// get machine we're building
			let machine = traitsState.machines.all.filter(
				(a) => a.type === employee.work.building
			)[0];

			if (!machine) {
				console.error(
					"can't find machine to build: " + employee.work.building
				);
				return;
			}

			// calculate work progress
			let timeToProgress = (delta * 1.0) / 1000;

			// apply progress
			let progress = timeToProgress * employee.workPerSecond(traitsState);
			employee.work.progress += progress;

			let everFailed = false;
			let actualWorkRequired =
				employee.workRequiredToComplete *
				currentEmployeeState.workRequiredMultiplier;
			while (employee.work.progress >= actualWorkRequired) {
				let success = traitsState.buildMachine(
					machine,
					employee.outputPerCompletion *
						currentEmployeeState.outputMultiplier
				);

				if (!success) {
					everFailed = true;
				}
				employee.work.progress -= actualWorkRequired;
				employee.work.progress = Math.max(0, employee.work.progress);

				employee.work.building = machineTypes.NONE;
				employee.checkBuildQueue(traitsState, employee);

				if (employee.work.building === machineTypes.NONE) {
					employee.work.progress = 0;
				}

				if (everFailed) {
					employee.work.justFailed = true;
					setTimeout(
						() => (employee.work.justFailed = false),
						traitsState.justFailedMs
					);
				}
			}

			// set the current rate on the platonic employee object
			let timeRequired =
				(actualWorkRequired * 1.0) /
				employee.workPerSecond(traitsState);
			employee.currentTimeTaken = timeRequired;

			employee.outcomePerSecond =
				(employee.outputPerCompletion *
					currentEmployeeState.outputMultiplier *
					1.0) /
				timeRequired;
		},
	},
];

export default employees;
