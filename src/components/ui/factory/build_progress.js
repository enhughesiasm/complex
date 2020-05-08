import React from 'react';
import PropTypes from 'prop-types';
import machineTypes from '../../machines/machine_types';
import FontAwesome from '../../shared/font_awesome';

const BuildProgress = (props) => {
	const { buildingCurrentMachine } = props;

	let actuallyBuilding = buildingCurrentMachine.type != machineTypes.NONE;

	return (
		<div className='buildProgress notification is-light'>
			{actuallyBuilding && (
				<span className='is-size-7'>
					Building{' '}
					<span className='has-text-weight-bold'>
						{buildingCurrentMachine.name}
					</span>{' '}
					in{' '}
					{props.builders.currentTimeTaken
						? props.builders.currentTimeTaken.toFixed(2)
						: '?'}{' '}
					seconds
				</span>
			)}
			{!actuallyBuilding && (
				<span className='is-size-7'>
					<FontAwesome icon='frown' /> Nothing being built
				</span>
			)}
			<progress
				className='progress is-primary'
				value={props.builders.work.progress}
				max={props.builders.workRequiredToComplete}>
				{props.builders.workRequiredToComplete}%
			</progress>
		</div>
	);
};

export default BuildProgress;

BuildProgress.propTypes = {
	buildingCurrentMachine: PropTypes.object.isRequired,
	builders: PropTypes.object.isRequired,
};
