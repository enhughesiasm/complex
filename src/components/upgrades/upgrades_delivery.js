import employeeTypes from '../employees/employee_types';
import upgradesKeys from './upgrades_keys';

const deliveryUpgrades = [
	{
		key: upgradesKeys.BUILD_ROAD,
		'name': 'Build a Road',
		'description': 'Hills and forests would be easier to traverse if they were paved over...',
		'explanation': 'Halves the amount of time required to deliver traits.',
		icon: 'road',
		cost: 14,
		unlocked: true,
		unlockedAtTraitsDelivered: 55,
		apply: function(traitsState){

			traitsState.employees[employeeTypes.DELIVERY].workRequiredMultiplier *= 0.5;

			traitsState.tryGetUpgradeByName('Stackable Crates').unlocked = true;
		}
	},
	{
		key: upgradesKeys.STACKABLE_CRATES,
		'name': 'Stackable Crates',
		'description': 'Deliveries will become a joy to watch. So quick, so efficient.',
		'explanation': 'Multiplies your delivery rate by 1.5',
		icon: 'truck-loading',
		cost: 150000,
		unlocked: false,
		unlockedAtTraitsDelivered: 8200000,
		apply: function(traitsState){
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 1.5;
			traitsState.tryGetUpgradeByName('Invent Cranes').unlocked = true;
		}
	},
	{
		key: upgradesKeys.INVENT_CRANES,
		'name': 'Invent Cranes',
		'description': 'Lift containers of crates into your delivery vehicles all at once.',
		'explanation': 'Doubles your delivery rate.',
		icon: 'quidditch',
		cost: 9500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 12500000,
		apply: function(traitsState){
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 2;
		}
	},
	{
		key: upgradesKeys.HIGH_SPEED_TRAINS,
		'name': 'High Speed Trains',
		'description': 'Vastly superior train technology.',
		'explanation': 'Massively increases delivery output.',
		icon: 'object-ungroup',
		cost: 1000000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 1200000000,
		apply: function(traitsState){
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 10;
		}
	},
];

export default deliveryUpgrades;