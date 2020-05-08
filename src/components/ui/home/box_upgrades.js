import React from 'react';
import PropTypes from 'prop-types';
import HelpText from '../../shared/help_text';
import ComplexListEntry from '../complex_list_entry';
import FontAwesome from '../../shared/font_awesome';

const BoxUpgrades = (props) => {
	const {
		upgradesUnlocked,
		upgradesAll,
		upgradesCanPurchase,
		upgradesPurchase,
	} = props;

	let remainingUpgrades = upgradesAll.filter((u) => !u.purchased).length;

	// let heightUnitsPerUpgrade = 10;
	// let height = 3 + (Math.max(upgradesUnlocked.length, 1) * heightUnitsPerUpgrade);

	return (
		<div className='tile is-child homeBox box upgrades cardList'>
			<HelpText helpKey={'upgrades'} direction='left' />
			<span className='subtitle is-size-6-mobile '>UPGRADES</span>
			<div id='upgradeBox'>
				{upgradesUnlocked.length == 0 && remainingUpgrades > 0 && (
					<div className='message'>
						There&apos;s {remainingUpgrades} more...
					</div>
				)}
				{upgradesUnlocked.length == 0 && remainingUpgrades == 0 && (
					<div className='message'>
						<FontAwesome icon={'handshake'} /> COMPLETE{' '}
						<FontAwesome icon={'glass-cheers'} />
					</div>
				)}
				{upgradesUnlocked.map((upgrade) => {
					let canPurchase = upgradesCanPurchase(upgrade.id);
					return (
						<ComplexListEntry
							key={upgrade.id}
							id={upgrade.id}
							additionalClass='upgrade'
							icon={upgrade.icon}
							name={upgrade.name}
							description={upgrade.description}
							canPurchase={canPurchase}
							favoursAvailable={canPurchase}
							cost={upgrade.cost}
							buildTooltipText={upgrade.explanation}
							purchaseText='Buy'
							onPurchaseClicked={() =>
								upgradesPurchase(upgrade.id)
							}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default BoxUpgrades;

BoxUpgrades.propTypes = {
	upgradesUnlocked: PropTypes.array.isRequired,
	upgradesAll: PropTypes.array.isRequired,
	upgradesCanPurchase: PropTypes.func.isRequired,
	upgradesPurchase: PropTypes.func.isRequired,
};
