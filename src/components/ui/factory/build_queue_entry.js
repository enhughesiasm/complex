import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../../shared/font_awesome';

const BuildQueueEntry = (props) => (
	<div
		className='tile is-parent has-text-centered is-marginless is-paddingless'
		key={props.index}>
		<div
			style={{ marginLeft: '.7rem !important' }}
			className='tile is-child is-8 is-marginless is-paddingless is-size-7'>
			{props.index + 1}. {props.entry.name}
		</div>
		<div className='tile is-child is-2 is-marginless is-paddingless is-size-7'>
			{props.entry.cost}
		</div>
		<div className='tile is-child is-2 is-marginless is-paddingless is-size-7'>
			<div
				style={{ cursor: 'pointer' }}
				onClick={() =>
					props.onCancelMachineFromBuildQueue(
						props.entry,
						props.index
					)
				}
				className='tooltip is-tooltip-left'
				data-tooltip={
					'Refunds ' +
					props.buildingGetCancellationRefundAmount(
						props.entry.cost
					) +
					' of ' +
					props.entry.cost +
					' Favours'
				}>
				<FontAwesome icon='times-circle' />
			</div>
		</div>
	</div>
);

export default BuildQueueEntry;

BuildQueueEntry.propTypes = {
	entry: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	onCancelMachineFromBuildQueue: PropTypes.func.isRequired,
	buildingGetCancellationRefundAmount: PropTypes.func.isRequired,
};
