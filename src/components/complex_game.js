import React from 'react';
import ComplexNav from './ui/nav/complex_nav';
import FirstLoad from './ui/first_load';
import WinScreen from './ui/win_screen';
import traitsState from './traits_state';
import ComplexStats from './stats/complex_stats';
import ComplexFooter from './complex_footer';
import employeeTypes from './employees/employee_types';
import ComplexMain from './complex_main';
import complexTabs from './complex_tabs';
import machineRoles from './machines/machine_roles';
import moment from 'moment';
import ComplexPatchNotes from './ui/complex_patch_notes';
import savableValues from './save_data/savable_values';
import { getManagementReaction } from './stats/management_reaction';

export default class ComplexGame extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			debug: traitsState.debug,
			firstLoad: true,

			lastSaved: moment(),
			traitsState: traitsState,
			statsActive: false,
			patchNotesActive: false,

			canShowWinScreen: true,
			activeTab: traitsState.debug ? complexTabs.HOME : complexTabs.HOME,

			// pyro
			showPyro: false,
			pyroStart: moment(),
			pyroLength: 5 * 1000,

			// slow updates:
			canMakeTraits: false,
			canShowEmployees: traitsState.getUnlockedEmployees().length > 0,
			canShowUpgrades: traitsState.totalDelivered >= 1,
			bottleNeckedPerSecond: 0,
			favours: 0,
			totalStorageSize: 0,
			builtDeliveryBuildings: [],
			builtProdBuildings: [],
			builtPowerBuildings: [],
			builtStorageBuildings: [],
			manualWorkers: traitsState.getEmployeeByType(
				employeeTypes.PRODUCTION
			),
			deliverers: traitsState.getEmployeeByType(employeeTypes.DELIVERY),
			builders: traitsState.getEmployeeByType(employeeTypes.BUILDER),
			productionTimeToMake: 0,
			storageIsFull: false,
			storageCurrentSize: 0,
			storageNaturalSize: 0,
			storageMachineSize: 0,
			employeesUnlocked: [],
			upgradesUnlocked: [],
			machinesUnlockedList: [],
			powerCommitted: 0,
			powerTotal: 0,
			buildingCurrentMachine: traitsState.getCurrentlyBuildingMachine(),
			totalTimePlayed: moment.duration(0),
			managementReaction: getManagementReaction(0),
			flexibleMachineryUnlocked: false,
			flexibleMachinerySetting: 0,
			flexibleMachineryAbsMax: 0,
			machineStorageMultiplier: 1,
		};

		this.onFirstLoadModalClosed = this.onFirstLoadModalClosed.bind(this);
		this.onWinScreenClosed = this.onWinScreenClosed.bind(this);
		this.onMakeTraitsClicked = this.onMakeTraitsClicked.bind(this);
		this.toggleStatsActive = this.toggleStatsActive.bind(this);
		this.togglePatchNotes = this.togglePatchNotes.bind(this);

		this.saveGame = this.saveGame.bind(this);

		//initiate the webworker: (this works!)
		// this.worker = new MyWorker();
		// this.worker.onmessage = (m) => { this.handleTick(m);};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			this.state.traitsState.tickLengthMs
		);
		this.updateState();
		this.slowTimerID = setInterval(
			() => this.updateState(),
			this.state.traitsState.tickLengthMs * 4
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
		clearInterval(this.slowTimerID);
	}

	saveGame() {
		// build save object
		let save = {};
		for (let prop in savableValues) {
			switch (prop) {
				case 'totalTimePlayed':
					save[prop] = this.state.traitsState[prop].asMilliseconds();
					break;
				default:
					save[prop] = this.state.traitsState[prop];
					break;
			}
		}

		if (save) {
			let stringifiedSave = JSON.stringify(save);
			localStorage.setItem('thesupplierscomplex_save', stringifiedSave);
			this.setState({ lastSaved: moment() });
			// console.log('saved game');
		}
	}

	activatePyro = () => {
		this.setState({
			showPyro: true,
			pyroStart: moment(),
		});
		window.scrollTo(0, 0);
	};

	purchaseUpgrade = (id) => {
		this.state.traitsState.purchaseUpgrade(id, this.activatePyro);
	};

	onFlexibleMachineryUpdate = (settings) => {
		if (!settings) return;

		switch (settings.type) {
			case 'production': // negative
				if (
					traitsState.flexibleMachinerySetting >
					traitsState.flexibleMachineryAbsMax * -1
				) {
					traitsState.flexibleMachinerySetting--;
				}
				break;
			case 'delivery': // positive
				if (
					traitsState.flexibleMachinerySetting <
					traitsState.flexibleMachineryAbsMax
				) {
					traitsState.flexibleMachinerySetting++;
				}
				break;
			default:
				console.error('unknown flexible machinery: ', settings);
		}
	};

	updateState = () => {
		let showPyro = this.state.showPyro;
		if (this.state.showPyro) {
			const length = moment().diff(this.state.pyroStart);
			if (length > this.state.pyroLength) {
				showPyro = false;
			}
		}

		this.setState({
			showPyro: showPyro,
			canShowEmployees:
				this.state.traitsState.getUnlockedEmployees().length > 0,
			canShowUpgrades: this.state.traitsState.totalDelivered >= 1,
			bottleNeckedPerSecond: this.state.traitsState.getBottleneckedPerSecond(),
			favours: this.state.traitsState.favours,
			totalStorageSize: this.state.traitsState.currentStorageSize(),
			canMakeTraits: this.state.traitsState.canMakeTraits(),
			builtDeliveryBuildings: this.state.traitsState.machines.getBuiltByRole(
				machineRoles.DELIVERY
			),
			builtProdBuildings: this.state.traitsState.machines.getBuiltByRole(
				machineRoles.PRODUCTION
			),
			builtPowerBuildings: this.state.traitsState.machines
				.getBuiltByRole(machineRoles.POWER)
				.sort((b) => b.power)
				.reverse(),
			builtStorageBuildings: this.state.traitsState.machines.getBuiltByRole(
				machineRoles.STORAGE
			),
			manualWorkers: this.state.traitsState.getEmployeeByType(
				employeeTypes.PRODUCTION
			),
			deliverers: this.state.traitsState.getEmployeeByType(
				employeeTypes.DELIVERY
			),
			builders: this.state.traitsState.getEmployeeByType(
				employeeTypes.BUILDER
			),
			productionTimeToMake: Number.parseFloat(
				this.state.traitsState.getTimeToMake().toFixed(2)
			),
			storageIsFull: this.state.traitsState.isStorageFull(),
			storageCurrentSize: this.state.traitsState.currentStorageSize(),
			storageNaturalSize: this.state.traitsState.getNaturalStorageSize(),
			storageMachineSize: this.state.traitsState.machines.getMachineStorageSize(),
			employeesUnlocked: this.state.traitsState.getUnlockedEmployees(),
			upgradesUnlocked: this.state.traitsState.getUnlockedUpgrades(),
			powerCommitted:
				this.state.traitsState.machines.totalPower(true) -
				this.state.traitsState.machines.totalPower(false),
			powerTotal: this.state.traitsState.machines.totalPower(),
			buildingCurrentMachine: this.state.traitsState.getCurrentlyBuildingMachine(),
			machinesUnlockedList: this.state.traitsState.getUnlockedMachines(),
			totalTimePlayed: this.state.traitsState.totalTimePlayed,
			flexibleMachineryUnlocked: this.state.traitsState
				.flexibleMachineryUnlocked,
			flexibleMachinerySetting: this.state.traitsState
				.flexibleMachinerySetting,
			flexibleMachineryAbsMax: this.state.traitsState
				.flexibleMachineryAbsMax,
			machineStorageMultiplier: this.state.traitsState
				.machineStorageMultiplier,
		});
	};

	toggleStatsActive() {
		let active = !this.state.statsActive;
		this.setState({
			statsActive: active,
			managementReaction: getManagementReaction(
				this.state.traitsState.totalDelivered
			),
		});
	}

	togglePatchNotes() {
		let active = !this.state.patchNotesActive;
		this.setState({ patchNotesActive: active });
	}

	setActiveTab = (tab) => this.setState({ activeTab: tab });

	tick() {
		let isPaused =
			this.state.traitsState.gameComplete && this.state.canShowWinScreen;

		this.state.traitsState.tick(isPaused);
		this.setState({
			traitsState: this.state.traitsState,
		});

		if (
			!this.state.firstLoad &&
			moment().diff(this.state.lastSaved) > 1000
		) {
			this.saveGame();
		}

		// this.worker.postMessage(null);
	}

	onFirstLoadModalClosed(saveData) {
		if (!saveData) {
			localStorage.removeItem('thesupplierscomplex_save');
		}

		this.state.traitsState.init(saveData);
		this.setState({
			firstLoad: false,
		});
	}

	onWinScreenClosed() {
		this.setState({
			canShowWinScreen: false,
		});
	}

	onMakeTraitsClicked() {
		this.state.traitsState.onMakeTraitsClicked();
		this.updateState();
	}

	hireEmployee = (id) => {
		this.state.traitsState.hireEmployee(id);
		this.updateState();
	};

	render() {
		const unlockedUpgrades = this.state.traitsState.getUnlockedUpgrades();
		const producingPerS = Number.parseFloat(
			this.state.traitsState
				.getOutcomePerSecond(employeeTypes.PRODUCTION)
				.toFixed(2)
		);
		const deliveringPerS = Number.parseFloat(
			this.state.traitsState
				.getOutcomePerSecond(employeeTypes.DELIVERY)
				.toFixed(2)
		);

		return (
			<div>
				{(!this.state.traitsState.gameComplete ||
					!this.state.canShowWinScreen) && (
					<div>
						{this.state.firstLoad && (
							<FirstLoad
								onFirstLoadModalClosed={
									this.onFirstLoadModalClosed
								}
							/>
						)}
						{!this.state.firstLoad && (
							<ComplexNav
								showMassDeliveryBtn={
									this.state.traitsState.massDelivery.isActive
								}
								favours={this.state.favours}
								canMakeTraits={this.state.canMakeTraits}
								totalDelivered={
									this.state.traitsState.totalDelivered
								}
								statsActive={this.state.statsActive}
								onToggleStatsActive={this.toggleStatsActive}
								onMakeTraitsClicked={this.onMakeTraitsClicked}
								onPerformMassDelivery={
									this.state.traitsState.massDelivery.perform
								}
								producingPerS={producingPerS}
								deliveringPerS={deliveringPerS}
								upgradesAvailable={unlockedUpgrades}
								totalStorageSize={this.state.totalStorageSize}
								bottleNeckedPerSecond={
									this.state.bottleNeckedPerSecond
								}
							/>
						)}
						{!this.state.firstLoad && (
							<ComplexMain
								wrapperHeight={
									this.state.traitsState.wrapperHeight
								}
								showPyro={this.state.showPyro}
								manualWorkers={this.state.manualWorkers}
								deliverers={this.state.deliverers}
								builders={this.state.builders}
								getOutcomePerSecond={
									this.state.traitsState.getOutcomePerSecond
								}
								activeTab={this.state.activeTab}
								onSetActiveTab={this.setActiveTab}
								productionPerClick={
									this.state.traitsState.madePerClick
								}
								productionTimeToMake={
									this.state.productionTimeToMake
								}
								productionProgressPercent={
									this.state.traitsState.makeProgressPercent
								}
								canShowEmployees={this.state.canShowEmployees}
								employees={this.state.traitsState.employees}
								employeesUnlocked={this.state.employeesUnlocked}
								employeesCanHire={
									this.state.traitsState.canHireEmployee
								}
								employeesGetCost={
									this.state.traitsState.getEmployeeCost
								}
								employeesHire={this.hireEmployee}
								canShowUpgrades={this.state.canShowUpgrades}
								upgradesUnlocked={this.state.upgradesUnlocked}
								upgradesAll={this.state.traitsState.allUpgrades}
								upgradesCanPurchase={
									this.state.traitsState.canPurchaseUpgrade
								}
								upgradesPurchase={this.purchaseUpgrade}
								storageCurrentSize={
									this.state.storageCurrentSize
								}
								storageNaturalSize={
									this.state.storageNaturalSize
								}
								storageMachineSize={
									this.state.storageMachineSize
								}
								storageIsFull={this.state.storageIsFull}
								storageAmount={this.state.traitsState.stored}
								storageTraits={
									this.state.traitsState.storedTraits
								}
								storageMax={
									this.state.traitsState.visualStorageMax
								}
								machineStorageMultiplier={
									this.state.machineStorageMultiplier || 1
								}
								deliveryFadeOutTimeMs={
									this.state.traitsState
										.deliveryFadeOutTimeMs || 2500
								}
								powerCommitted={this.state.powerCommitted}
								powerTotal={this.state.powerTotal}
								buildQueue={
									this.state.traitsState.machines.buildQueue
								}
								buildingCurrentMachine={
									this.state.buildingCurrentMachine
								}
								onCancelMachineFromBuildQueue={
									this.state.traitsState
										.cancelMachineFromQueue
								}
								buildingGetCancellationRefundAmount={
									this.state.traitsState
										.getCancellationRefundAmount
								}
								builtDeliveryBuildings={
									this.state.builtDeliveryBuildings
								}
								builtProdBuildings={
									this.state.builtProdBuildings
								}
								builtPowerBuildings={
									this.state.builtPowerBuildings
								}
								builtStorageBuildings={
									this.state.builtStorageBuildings
								}
								areMachinesUnlocked={
									this.state.traitsState.machines.unlocked
								}
								machinesAll={
									this.state.traitsState.machines.all
								}
								machinesUnlockedList={
									this.state.machinesUnlockedList
								}
								machinesGetCost={
									this.state.traitsState.getMachineCost
								}
								machinesAddToQueue={
									this.state.traitsState.addMachineToQueue
								}
								machinesSell={
									this.state.traitsState.machines.sell
								}
								machinesCanBuild={
									this.state.traitsState.canBuildMachine
								}
								flexibleMachinerySetting={
									this.state.flexibleMachinerySetting || 0
								}
								flexibleMachineryAbsMax={
									this.state.flexibleMachineryAbsMax || 2
								}
								flexibleMachineryUnlocked={
									this.state.flexibleMachineryUnlocked ||
									false
								}
								onFlexibleMachineryUpdate={
									this.onFlexibleMachineryUpdate
								}
								onReallocateProdWorker={
									this.state.traitsState.reallocateProdWorker
								}
							/>
						)}
						{!this.state.firstLoad && (
							<ComplexFooter
								version={this.state.traitsState.version}
								togglePatchNotes={this.togglePatchNotes}
							/>
						)}
					</div>
				)}
				{this.state.traitsState.gameComplete &&
					this.state.canShowWinScreen && (
						<WinScreen
							startTime={this.state.traitsState.startTime}
							gameWinTime={this.state.traitsState.gameWinTime}
							onWinScreenClosed={this.onWinScreenClosed}
						/>
					)}
				<ComplexStats
					totalTimePlayed={this.state.totalTimePlayed}
					managementReaction={this.state.managementReaction}
					totalMade={this.state.traitsState.totalMade}
					totalDelivered={this.state.traitsState.totalDelivered}
					favoursSpent={this.state.traitsState.favoursSpent}
					totalWastedProduction={
						this.state.traitsState.totalWastedProduction
					}
					totalWastedDeliveries={
						this.state.traitsState.totalWastedDeliveries
					}
					producingPerS={producingPerS}
					deliveringPerS={deliveringPerS}
					attachQuickviews={this.state.traitsState.attachQuickviews}
					statsActive={this.state.statsActive}
					allUpgrades={this.state.traitsState.allUpgrades}
					areMachinesUnlocked={
						this.state.traitsState.machines.unlocked
					}
					machinesAll={this.state.traitsState.machines.all}
					machinesUnlockedList={this.state.machinesUnlockedList}
				/>
				<ComplexPatchNotes
					attachQuickviews={this.state.traitsState.attachQuickviews}
					patchNotesActive={this.state.patchNotesActive}
					onTogglePatchNotes={this.togglePatchNotes}
				/>
			</div>
		);
	}
}
