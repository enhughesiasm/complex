import React from 'react';
import PropTypes from 'prop-types';

const MassDeliveryButton = (props) => <button className="button is-small is-rounded massDelivery is-success tooltip is-tooltip-bottom" onClick={props.onPerformMassDelivery}
	data-tooltip="Lucky! Everyone wants to help with your deliveries.">DELIVER LOTS</button>;

export default MassDeliveryButton;

MassDeliveryButton.propTypes = {
	onPerformMassDelivery: PropTypes.func.isRequired
};