import React from 'react';
import PropTypes from 'prop-types';
import BuildProgress from './build_progress';
import StatusEntry from './status_entry';
import BuildQueue from './build_queue';
import FlexibleMachinery from './flexible_machinery';

const FactoryStatus = (props) => {
	let { builders, flexibleMachinerySetting, flexibleMachineryUnlocked,onFlexibleMachineryUpdate } = props;

	return(<div id="factoryStatus" className="tile is-child is-12 is-size-7 homeBox box status has-text-centered">
		{/* <HelpText helpKey='factory' direction='bottom'/> */}
		<div className="subtitle is-size-6-mobile">BUILDING</div>

		<div className="tile is-parent is-paddingless is-margingless">
			<div className="tile is-child is-paddingless is-marginless">
				<StatusEntry text={(builders.hiredAmount || 0) + ' ' + builders.name }
					icon='hard-hat'
					helpKey='builders'
					notificationType={builders.hiredAmount > 0 ? 'light' : 'danger'}
				/>

				<BuildProgress builders={builders}
					buildingCurrentMachine={props.buildingCurrentMachine}/>
			</div>
			<BuildQueue buildQueue={props.buildQueue}
				onCancelMachineFromBuildQueue={props.onCancelMachineFromBuildQueue}
				buildingGetCancellationRefundAmount={props.buildingGetCancellationRefundAmount} />
		</div>

		{ flexibleMachineryUnlocked && <FlexibleMachinery flexibleMachinerySetting={flexibleMachinerySetting}
			flexibleMachineryAbsMax={props.flexibleMachineryAbsMax}
			onFlexibleMachineryUpdate={onFlexibleMachineryUpdate}
			getOutcomePerSecond={props.getOutcomePerSecond}
		/>

		}
	</div>);};

export default FactoryStatus;

FactoryStatus.propTypes = {
	builders: PropTypes.object.isRequired,
	buildingCurrentMachine: PropTypes.object.isRequired,
	buildQueue:PropTypes.array.isRequired,
	onCancelMachineFromBuildQueue: PropTypes.func.isRequired,
	buildingGetCancellationRefundAmount: PropTypes.func.isRequired,
	flexibleMachinerySetting: PropTypes.number.isRequired,
	flexibleMachineryAbsMax: PropTypes.number.isRequired,
	flexibleMachineryUnlocked: PropTypes.bool.isRequired,
	onFlexibleMachineryUpdate: PropTypes.func.isRequired,
	getOutcomePerSecond: PropTypes.func.isRequired
};