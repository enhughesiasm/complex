import React from 'react';
import PropTypes from 'prop-types';
import employeeTypes from '../../../employees/employee_types';
import FontAwesome from '../../../shared/font_awesome';
import OutputIndicator from './output_indicator';
import machineTypes from '../../../machines/machine_types';

const ratios = {
	BAD: 0,
	OKAY: 0.66,
	GOOD: 0.95,
};

const DeliveryPeople = (props) => {
	const { deliverers, getOutcomePerSecond, builtDeliveryBuildings } = props;

	let anyLoaders =
		builtDeliveryBuildings?.filter((a) => a.type == machineTypes.LOADER)
			.length > 0;
	let loaders = {};
	if (anyLoaders) {
		loaders = builtDeliveryBuildings.filter(
			(a) => a.type == machineTypes.LOADER
		)[0];
	}

	let deliveryRate = getOutcomePerSecond(employeeTypes.DELIVERY);
	let productionRate = getOutcomePerSecond(employeeTypes.PRODUCTION);

	let deliveryRatio = (deliveryRate * 1.0) / productionRate;

	let ratio = ratios.BAD;
	if (deliveryRatio > ratios.OKAY) ratio = ratios.OKAY;
	if (deliveryRatio > ratios.GOOD) ratio = ratios.GOOD;

	let ratioType =
		ratio == ratios.BAD
			? 'danger'
			: ratio == ratios.OKAY
			? 'warning'
			: 'success';

	let dp = deliveryRate < 100 ? 2 : 0;

	return (
		<div id='deliveryPeople' className='visualBuildings'>
			{anyLoaders && (
				<span
					className={
						'building has-text-success loaders tooltip is-tooltip-left is-tooltip-success'
					}
					data-tooltip={
						loaders.builtAmount +
						' Loaders - Delivery speed x' +
						loaders.totalDeliveryMultiplier().toFixed(2)
					}>
					{loaders.builtAmount} <FontAwesome icon={loaders.icon} />
				</span>
			)}

			<span
				style={{
					animationDuration:
						deliverers.deliveryAnimationDuration + 's',
				}}
				className={
					'building delivery tooltip is-tooltip-multiline is-tooltip-top is-tooltip-' +
					ratioType +
					' is-delivery-' +
					ratioType
				}
				data-tooltip={
					deliverers.hiredAmount +
					' ' +
					deliverers.name +
					' making ' +
					deliveryRate.toFixed(dp) +
					' deliveries per second'
				}>
				<FontAwesome icon={deliverers.icon} />
			</span>

			<OutputIndicator
				text='Delivering'
				additionalClassName='totalDeliveryOutput'
				notificationType={ratioType}
				amount={Number.parseFloat(deliveryRate.toFixed(dp))}
				suffixText='per second'
			/>
		</div>
	);
};

export default DeliveryPeople;

DeliveryPeople.propTypes = {
	builtDeliveryBuildings: PropTypes.array.isRequired,
	deliverers: PropTypes.object.isRequired,
	getOutcomePerSecond: PropTypes.func.isRequired,
};
