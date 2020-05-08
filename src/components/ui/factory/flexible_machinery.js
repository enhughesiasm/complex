import React from 'react';
import PropTypes from 'prop-types';
import employeeTypes from '../../employees/employee_types';
import HelpText from '../../shared/help_text';
import FriendlyNumber from '../../shared/friendly_number';

const FlexibleMachinery = (props) => {
	const producingPerS = props.getOutcomePerSecond(employeeTypes.PRODUCTION);
	const deliveringPerS = props.getOutcomePerSecond(employeeTypes.DELIVERY);


	const { flexibleMachineryAbsMax, flexibleMachinerySetting} = props;

	const canDeliverMore = (props.flexibleMachinerySetting != props.flexibleMachineryAbsMax);
	const canProduceMore = (props.flexibleMachinerySetting != props.flexibleMachineryAbsMax * -1);

	return (<div className="tile is-parent is-flex is-paddingless is-margingless has-text-centered notification is-light"
		style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>

		<h3 className="has-text-centered has-text-weight-bold" style={{padding:'.7rem'}}>Flexible Machinery</h3>
		<HelpText helpKey='flexibleMachinery'/>
		<div className="level is-flex" style={{alignItems: 'center', justifyContent: 'center'}}>
			<div className="level-item is-flex"
				style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
				<div className="level-item"><p>Producing <FriendlyNumber amount={producingPerS} /> / s</p></div>
				<div className="level-item">
					<button className={'button is-small is-rounded is-'+ (canProduceMore ? 'success' : 'danger')}
						disabled={!canProduceMore}
						onClick={() => props.onFlexibleMachineryUpdate({ type: 'production', current: props.flexibleMachinerySetting, absMax: props.flexibleMachineryAbsMax })}>More Production
					</button>
				</div>
			</div>

			<div className="level-item" style={{padding: '0 1rem'}}>
				<input className={'slider is-medium is-circle is-warning is-success'} step="1" min={props.flexibleMachineryAbsMax * -1} max={props.flexibleMachineryAbsMax} value={props.flexibleMachinerySetting} type="range" disabled />
			</div>
			<div className="level-item is-flex" style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
				<div className="level-item"><p>Delivery <FriendlyNumber amount={deliveringPerS} /> / s</p></div>
				<div className="level-item">
					<button className={'button is-small is-rounded is-' + (canDeliverMore ? 'success' : 'danger')}
						disabled={!canDeliverMore}
						onClick={() => props.onFlexibleMachineryUpdate({ type: 'delivery', current: props.flexibleMachinerySetting, absMax: props.flexibleMachineryAbsMax })}>More Delivery
					</button></div>
			</div>
		</div>
	</div>);
};

export default FlexibleMachinery;

FlexibleMachinery.propTypes = {
	getOutcomePerSecond: PropTypes.func.isRequired,
	flexibleMachineryAbsMax: PropTypes.number.isRequired,
	flexibleMachinerySetting: PropTypes.number.isRequired,
	onFlexibleMachineryUpdate: PropTypes.func.isRequired
};