import React from 'react';
import PropTypes from 'prop-types';
import UpgradeBoughtEntry from './upgrade_bought_entry';

const UpgradesBought = (props) => {
	const purchasedUpgrades = props.allUpgrades.filter(u => u.purchased);

	return(<div id="upgradesBought">
		<p><strong>Purchased </strong> { purchasedUpgrades.length } of { props.allUpgrades.length } </p>
		<ul className="box is-paddingless has-spacing-top">
			{ purchasedUpgrades.map((upgrade) => <UpgradeBoughtEntry key={upgrade.id} upgrade={upgrade}  />)}
		</ul>
	</div>);};

export default UpgradesBought;

UpgradesBought.propTypes = {
	allUpgrades: PropTypes.array.isRequired
};