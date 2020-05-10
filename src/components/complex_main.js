import React from 'react';
import PropTypes from 'prop-types';
import complexTabs from './complex_tabs';
import HomeTab from './ui/home/tab_home';
import FactoryTab from './ui/factory/tab_factory';

const ComplexMain = (props) => (
	<main style={{ paddingBottom: '3rem' }}>
		{/* // style={{ minHeight: props.wrapperHeight + 'vh' }}> */}
		{props.showPyro && (
			<div className='pyro is-fixed-top'>
				<div className='before'></div>
				<div className='after'></div>
			</div>
		)}
		<div className='section'>
			<div className='columns'>
				<div id='complexGame' className='column has-spacing-top'>
					{props.areMachinesUnlocked &&
						props.employees['builder'].hiredAmount > 0 && (
							<span>
								{/* <HelpText helpKey='tabs' direction='right' additionalClassName="is-pulled-left"/> */}
								<div className='tabs is-centered is-toggle is-toggle-rounded'>
									<ul>
										<li
											className={
												'is-size-7-mobile ' +
												(props.activeTab ===
												complexTabs.HOME
													? ' is-active'
													: '')
											}>
											{/* eslint-disable-next-line*/}
											<a
												onClick={() =>
													props.onSetActiveTab(
														complexTabs.HOME
													)
												}>
												Home
											</a>
										</li>
										<li
											className={
												'is-size-7-mobile ' +
												(props.activeTab ===
												complexTabs.FACTORY
													? ' is-active'
													: '')
											}>
											{/* eslint-disable-next-line*/}
											<a
												onClick={() =>
													props.onSetActiveTab(
														complexTabs.FACTORY
													)
												}>
												Factory
											</a>
										</li>
									</ul>
								</div>
							</span>
						)}
					{props.activeTab === complexTabs.HOME && (
						<HomeTab
							productionPerClick={props.productionPerClick}
							productionTimeToMake={props.productionTimeToMake}
							productionProgressPercent={
								props.productionProgressPercent
							}
							canShowEmployees={props.canShowEmployees}
							employees={props.employees}
							employeesUnlocked={props.employeesUnlocked}
							employeesCanHire={props.employeesCanHire}
							employeesGetCost={props.employeesGetCost}
							employeesHire={props.employeesHire}
							canShowUpgrades={props.canShowUpgrades}
							upgradesUnlocked={props.upgradesUnlocked}
							upgradesAll={props.upgradesAll}
							upgradesCanPurchase={props.upgradesCanPurchase}
							upgradesPurchase={props.upgradesPurchase}
							deliveryFadeOutTimeMs={props.deliveryFadeOutTimeMs}
							storageCurrentSize={props.storageCurrentSize}
							storageIsFull={props.storageIsFull}
							storageTraits={props.storageTraits}
							storageAmount={props.storageAmount}
							storageMax={props.storageMax}
						/>
					)}
					{props.activeTab === complexTabs.FACTORY && (
						<FactoryTab
							employees={props.employees}
							manualWorkers={props.manualWorkers}
							deliverers={props.deliverers}
							builders={props.builders}
							getOutcomePerSecond={props.getOutcomePerSecond}
							powerCommitted={props.powerCommitted}
							powerTotal={props.powerTotal}
							storageAmount={props.storageAmount}
							storageIsFull={props.storageIsFull}
							storageNaturalSize={props.storageNaturalSize}
							storageMachineSize={props.storageMachineSize}
							machineStorageMultiplier={
								props.machineStorageMultiplier
							}
							buildQueue={props.buildQueue}
							buildingCurrentMachine={
								props.buildingCurrentMachine
							}
							onCancelMachineFromBuildQueue={
								props.onCancelMachineFromBuildQueue
							}
							buildingGetCancellationRefundAmount={
								props.buildingGetCancellationRefundAmount
							}
							builtProdBuildings={props.builtProdBuildings}
							builtDeliveryBuildings={
								props.builtDeliveryBuildings
							}
							builtPowerBuildings={props.builtPowerBuildings}
							builtStorageBuildings={props.builtStorageBuildings}
							machinesAll={props.machinesAll}
							machinesUnlockedList={props.machinesUnlockedList}
							machinesGetCost={props.machinesGetCost}
							machinesAddToQueue={props.machinesAddToQueue}
							machinesSell={props.machinesSell}
							machinesCanBuild={props.machinesCanBuild}
							flexibleMachinerySetting={
								props.flexibleMachinerySetting
							}
							flexibleMachineryUnlocked={
								props.flexibleMachineryUnlocked
							}
							onFlexibleMachineryUpdate={
								props.onFlexibleMachineryUpdate
							}
							flexibleMachineryAbsMax={
								props.flexibleMachineryAbsMax
							}
							onReallocateProdWorker={
								props.onReallocateProdWorker
							}
						/>
					)}
				</div>
			</div>
		</div>
	</main>
);

export default ComplexMain;

ComplexMain.propTypes = {
	wrapperHeight: PropTypes.number.isRequired,
	showPyro: PropTypes.bool.isRequired,
	areMachinesUnlocked: PropTypes.bool.isRequired,
	canShowEmployees: PropTypes.bool.isRequired,
	canShowUpgrades: PropTypes.bool.isRequired,
	employees: PropTypes.object.isRequired,
	activeTab: PropTypes.string.isRequired,
	onSetActiveTab: PropTypes.func.isRequired,
	productionPerClick: PropTypes.number.isRequired,
	productionTimeToMake: PropTypes.number.isRequired,
	productionProgressPercent: PropTypes.number.isRequired,
	employeesCanHire: PropTypes.func.isRequired,
	employeesHire: PropTypes.func.isRequired,
	employeesGetCost: PropTypes.func.isRequired,

	employeesUnlocked: PropTypes.array.isRequired,
	upgradesUnlocked: PropTypes.array.isRequired,
	upgradesAll: PropTypes.array.isRequired,
	upgradesCanPurchase: PropTypes.func.isRequired,
	upgradesPurchase: PropTypes.func.isRequired,

	storageIsFull: PropTypes.bool.isRequired,
	storageAmount: PropTypes.number.isRequired,
	storageTraits: PropTypes.array.isRequired,
	storageCurrentSize: PropTypes.number.isRequired,
	storageNaturalSize: PropTypes.number.isRequired,
	storageMachineSize: PropTypes.number.isRequired,
	storageMax: PropTypes.number.isRequired,
	machineStorageMultiplier: PropTypes.number.isRequired,

	manualWorkers: PropTypes.object,
	deliverers: PropTypes.object,
	builders: PropTypes.object,

	getOutcomePerSecond: PropTypes.func.isRequired,
	powerCommitted: PropTypes.number.isRequired,
	powerTotal: PropTypes.number.isRequired,

	buildQueue: PropTypes.array.isRequired,
	buildingCurrentMachine: PropTypes.object,
	onCancelMachineFromBuildQueue: PropTypes.func.isRequired,
	buildingGetCancellationRefundAmount: PropTypes.func.isRequired,
	builtProdBuildings: PropTypes.array.isRequired,
	builtDeliveryBuildings: PropTypes.array.isRequired,
	builtPowerBuildings: PropTypes.array.isRequired,
	builtStorageBuildings: PropTypes.array.isRequired,

	machinesAll: PropTypes.array.isRequired,
	machinesUnlockedList: PropTypes.array.isRequired,
	machinesGetCost: PropTypes.func.isRequired,
	machinesAddToQueue: PropTypes.func.isRequired,
	machinesSell: PropTypes.func.isRequired,
	machinesCanBuild: PropTypes.func.isRequired,
	onReallocateProdWorker: PropTypes.func.isRequired,
	deliveryFadeOutTimeMs: PropTypes.number.isRequired,

	flexibleMachinerySetting: PropTypes.number.isRequired,
	flexibleMachineryUnlocked: PropTypes.bool.isRequired,
	flexibleMachineryAbsMax: PropTypes.number.isRequired,
	onFlexibleMachineryUpdate: PropTypes.func.isRequired,
};
