import React from 'react';
import PropTypes from 'prop-types';
import FactoryVisual from './visual/factory_visual';
import MachinesBox from './machines_box';
import FactoryStatus from './factory_status';

const FactoryTab = (props) =>
{

	const { builders, powerCommitted, manualWorkers, employees, deliverers } = props;

	let numBuilders = employees['builder'].hiredAmount;
	let numDeliverers = employees['delivery'].hiredAmount;

	builders.hiredAmount = numBuilders;
	deliverers.hiredAmount = numDeliverers;
	return (
		<div id="factoryTab" className="tile is-ancestor ">
			<div className="tile is-7 is-vertical">
				<div className="tile is-parent">
					<FactoryStatus builders={builders}
						committedPower={powerCommitted}
						buildingCurrentMachine={props.buildingCurrentMachine}
						buildQueue={props.buildQueue}
						onCancelMachineFromBuildQueue={props.onCancelMachineFromBuildQueue}
						buildingGetCancellationRefundAmount={props.buildingGetCancellationRefundAmount}

						flexibleMachinerySetting={props.flexibleMachinerySetting}
						flexibleMachineryAbsMax={props.flexibleMachineryAbsMax}
						flexibleMachineryUnlocked={props.flexibleMachineryUnlocked}
						onFlexibleMachineryUpdate={props.onFlexibleMachineryUpdate}
						getOutcomePerSecond={props.getOutcomePerSecond}
					/>
				</div>
				<div className="tile is-parent">
					{ numBuilders > 0 && <MachinesBox machinesAll={props.machinesAll}
						machinesUnlockedList={props.machinesUnlockedList}
						machinesGetCost={props.machinesGetCost}
						machinesAddToQueue={props.machinesAddToQueue}
						machinesSell={props.machinesSell}
						machinesCanBuild={props.machinesCanBuild}
					/> }
				</div>
			</div>
			<div className="tile is-parent is-5">
				{ numBuilders > 0 && <FactoryVisual
					manualWorkers={manualWorkers}
					deliverers={deliverers}

					getOutcomePerSecond={props.getOutcomePerSecond}

					builtProdBuildings={props.builtProdBuildings}
					builtDeliveryBuildings={props.builtDeliveryBuildings}
					builtPowerBuildings={props.builtPowerBuildings}
					builtStorageBuildings={props.builtStorageBuildings}
					powerTotal={props.powerTotal}

					storageAmount={props.storageAmount}
					storageIsFull={props.storageIsFull}
					storageNaturalSize={props.storageNaturalSize}
					storageMachineSize={props.storageMachineSize}
					machineStorageMultiplier={props.machineStorageMultiplier}
					onReallocateProdWorker={props.onReallocateProdWorker}
				/> }
			</div>
		</div>
	);
};

export default FactoryTab;


FactoryTab.propTypes = {
	builders: PropTypes.object.isRequired,
	powerCommitted: PropTypes.number.isRequired,
	manualWorkers: PropTypes.object.isRequired,
	employees: PropTypes.object.isRequired,
	deliverers: PropTypes.object.isRequired,

	machinesAll: PropTypes.array.isRequired,
	machinesUnlockedList: PropTypes.array.isRequired,
	machinesGetCost: PropTypes.func.isRequired,
	machinesAddToQueue: PropTypes.func.isRequired,
	machinesSell: PropTypes.func.isRequired,
	machinesCanBuild: PropTypes.func.isRequired,
	onReallocateProdWorker: PropTypes.func.isRequired,

	buildQueue:PropTypes.array.isRequired,
	buildingCurrentMachine: PropTypes.object.isRequired,
	onCancelMachineFromBuildQueue: PropTypes.func.isRequired,
	buildingGetCancellationRefundAmount: PropTypes.func.isRequired,
	builtProdBuildings: PropTypes.array.isRequired,
	builtDeliveryBuildings: PropTypes.array.isRequired,
	builtPowerBuildings: PropTypes.array.isRequired,
	builtStorageBuildings: PropTypes.array.isRequired,

	storageIsFull: PropTypes.bool.isRequired,
	storageAmount: PropTypes.number.isRequired,

	storageNaturalSize:PropTypes.number.isRequired,
	storageMachineSize:PropTypes.number.isRequired,
	machineStorageMultiplier: PropTypes.number.isRequired,

	getOutcomePerSecond: PropTypes.func.isRequired,
	powerTotal: PropTypes.number.isRequired,

	flexibleMachinerySetting: PropTypes.number.isRequired,
	flexibleMachineryAbsMax: PropTypes.number.isRequired,
	flexibleMachineryUnlocked: PropTypes.bool.isRequired,
	onFlexibleMachineryUpdate: PropTypes.func.isRequired

};