import React from 'react';
import PropTypes from 'prop-types';


const UpgradeBoughtEntry = (props) => {
	const {upgrade} = props;
	return(<li className="is-size-7 has-text-variant-italic tooltip is-tooltip-left" data-tooltip={upgrade.description} >
		{ upgrade.name }
	</li>);};

export default UpgradeBoughtEntry;

UpgradeBoughtEntry.propTypes = {
	upgrade: PropTypes.object.isRequired
};