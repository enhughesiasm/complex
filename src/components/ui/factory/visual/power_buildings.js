import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from './../../../shared/font_awesome';
import OutputIndicator from './output_indicator';

const PowerBuildings = (props) => {
	let totalGeneratedPower = props.buildings
		.map((b) => b.power * b.builtAmount || 0)
		.reduce((a, b) => a + b, 0);

	let totalUsedPower = (props.totalFactoryPower - totalGeneratedPower) * -1;

	let actualBuildings = [];
	props.buildings.forEach((b, x) => {
		for (let i = 0; i < b.builtAmount; i++) {
			b.x = x;

			if (totalUsedPower > 0) {
				b.isUsed = true;
				b.amountUsed = Math.min(totalUsedPower, b.power);
			} else {
				b.isUsed = false;
				b.amountUsed = 0;
			}

			totalUsedPower -= b.power;
			actualBuildings.push({ ...b });
		}
	});

	return (
		<div id='powerBuildings' className='visualBuildings'>
			{actualBuildings.map((building, y) => {
				let tooltipText =
					building.name +
					(building.amountUsed > 0
						? ' - Using ' +
						  building.amountUsed +
						  ' of ' +
						  building.power
						: ' - ' + building.power + ' Unused');

				return (
					<span
						key={building.x * y + y}
						className={
							'powerBuilding building tooltip is-tooltip-left is-tooltip-' +
							(building.isUsed ? 'warning isUsed' : 'danger')
						}
						data-tooltip={tooltipText}
						// style={{animationDelay: Math.random() * 3 }}
					>
						<FontAwesome icon={building.icon} />
					</span>
				);
			})}
			<OutputIndicator
				text='Generating'
				icon='bolt'
				additionalClassName='totalPowerOutput'
				notificationType={
					props.totalFactoryPower > 0 ? 'success' : 'warning'
				}
				amount={totalGeneratedPower}
				suffixText={' - ' + props.totalFactoryPower + ' unused'}
			/>
		</div>
	);
};

export default PowerBuildings;

PowerBuildings.propTypes = {
	buildings: PropTypes.array.isRequired,
	totalFactoryPower: PropTypes.number.isRequired,
};
