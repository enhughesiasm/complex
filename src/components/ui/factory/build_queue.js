import React from 'react';
import PropTypes from 'prop-types';
import BuildQueueEntry from './build_queue_entry';

const BuildQueue = (props) => {

	const buildQueueMax = 3;

	const { buildQueue } = props;

	return (<div className="tile is-child buildqueue box">

		{/* { queueLength == 0 && <div className="message">Empty</div>} */}

		{ buildQueue.length > 0 && <div className="tile is-ancestor is-vertical queue">
			<div className="tile is-parent has-text-centered has-text-weight-bold is-paddingless">
				<div className="tile is-child is-8 is-size-7">

				</div>
				<div className="tile is-child is-2 is-size-7">
						Cost
				</div>
				<div className="tile is-child is-2 is-size-7">
						Cancel
				</div>
			</div>
			{ buildQueue.slice(0,buildQueueMax).map((m,i) => <BuildQueueEntry key={i} entry={m} index={i}
				onCancelMachineFromBuildQueue={props.onCancelMachineFromBuildQueue}
				buildingGetCancellationRefundAmount={props.buildingGetCancellationRefundAmount}
			/> )}
			{ buildQueue.length > buildQueueMax && <div className="has-text-weight-bold has-text-centered is-size-7"> ({buildQueue.length - buildQueueMax} more...)</div>}
		</div>}


	</div>);};

export default BuildQueue;

BuildQueue.propTypes = {
	buildQueue:PropTypes.array.isRequired,
	onCancelMachineFromBuildQueue: PropTypes.func.isRequired,
	buildingGetCancellationRefundAmount: PropTypes.func.isRequired,

};