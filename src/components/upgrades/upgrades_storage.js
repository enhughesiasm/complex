import upgradesKeys from './upgrades_keys';

const storageUpgrades = [
	{
		'key': upgradesKeys.BOX_1,
		'name': 'A Box',
		'description': 'A place to store human traits.',
		'explanation': 'Increases storage by 1',
		icon: 'box',
		cost: 1,
		unlocked: true,
		unlockedAtTraitsDelivered: 1,
		apply: function(traitsState){
			traitsState.increaseStorageSize(1);
			traitsState.getUpgradeByKey(upgradesKeys.BOX_2).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.BOX_2,
		'name': 'A Second Box',
		'description': 'Imagine what you could keep in it!',
		'explanation': 'Increases storage by 1',
		icon: 'box',
		cost: 6,
		unlocked: false,
		unlockedAtTraitsDelivered: 5,
		apply: function(traitsState){
			traitsState.increaseStorageSize(1);
			traitsState.getUpgradeByKey(upgradesKeys.BOX_3).unlocked= true;
			traitsState.getUpgradeByKey(upgradesKeys.BOX_4).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.BOX_3,
		'name': 'A Third Box',
		'description': 'You\'re starting to really like boxes.',
		'explanation': 'Increases storage by 1',
		icon: 'box',
		cost: 7,
		unlocked: false,
		unlockedAtTraitsDelivered: 15,
		apply: function(traitsState){
			traitsState.increaseStorageSize(1);
		}
	},
	{
		'key': upgradesKeys.BOX_4,
		'name': 'A Fourth Box',
		'description': 'Soon you\'ll need a box for all these boxes.',
		'explanation': 'Increases storage by 1',
		icon: 'box',
		cost: 8,
		unlocked: false,
		unlockedAtTraitsDelivered: 45,
		apply: function(traitsState){
			traitsState.increaseStorageSize(1);
			traitsState.getUpgradeByKey(upgradesKeys.BOX_BIGGER).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.BOX_BIGGER,
		'name': 'Bigger Boxes',
		'description': 'Like boxes, but bigger, and therefore BETTER!',
		'explanation': 'Doubles your basic box storage.',
		icon: 'boxes',
		cost: 15,
		unlocked: false,
		unlockedAtTraitsDelivered: 75,
		apply: function(traitsState){
			traitsState.increaseStorageMultiplierByFactor(2);
			traitsState.getUpgradeByKey(upgradesKeys.BOX_CRATES).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.BOX_CRATES,
		'name': 'Crates',
		'description': 'Like boxes with superpowers.',
		'explanation': 'Doubles your basic box storage.',
		icon: 'ruler-horizontal',
		cost: 15,
		unlocked: false,
		unlockedAtTraitsDelivered: 200,
		apply: function(traitsState){
			traitsState.increaseStorageMultiplierByFactor(2);
			traitsState.getUpgradeByKey(upgradesKeys.SHED).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.SHED,
		'name': 'A Shed',
		'description': 'A fun place to hang out. Or to store boxes of traits.',
		'explanation': 'Increases your basic box storage.',
		icon: 'home',
		cost: 50,
		unlocked: false,
		unlockedAtTraitsDelivered: 475,
		apply: function(traitsState){
			traitsState.increaseStorageSize(5);

			traitsState.getUpgradeByKey(upgradesKeys.STANDARDISED_JARS).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.STANDARDISED_JARS,
		'name': 'Standardised Jars',
		'description': 'Eureka! You can fit WAY more traits in the same space if you make them all the same size.',
		'explanation': 'Vastly increases your basic box storage.',
		icon: 'vector-square',
		cost: 550,
		unlocked: false,
		unlockedAtTraitsDelivered: 1350,
		apply: function(traitsState){
			traitsState.increaseStorageMultiplierByFactor(25);
			traitsState.getUpgradeByKey(upgradesKeys.VERTICAL_STACKING).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.VERTICAL_STACKING,
		'name': 'Vertical Stacking',
		'description': 'Putting things on top of other things could be a more effective use of space.',
		'explanation': 'Doubles your basic box storage.',
		icon: 'ruler-vertical',
		cost: 950,
		unlocked: false,
		unlockedAtTraitsDelivered: 10000,
		apply: function(traitsState){
			traitsState.increaseStorageMultiplierByFactor(2);
			traitsState.getUpgradeByKey(upgradesKeys.MORE_LAND).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.MORE_LAND,
		'name': 'More land',
		'description': 'Your warehouses demand more space.',
		'explanation': 'Massively increases the storage capacity of all warehouses.',
		icon: 'home',
		cost: 4500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 3000000,
		apply: function(traitsState){
			traitsState.machineStorageMultiplier *= 10;
			traitsState.getUpgradeByKey(upgradesKeys.CONTAINERISATION).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.CONTAINERISATION,
		'name': 'Containerisation',
		'description': 'Boxes inside crates inside containers inside warehouses. It\'s a storage-lovers dream.',
		'explanation': 'Massively increases the storage capacity of all warehouses.',
		icon: 'dolly-flatbed',
		cost: 10000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 40000000,
		apply: function(traitsState){
			traitsState.machineStorageMultiplier *= 10;
			traitsState.getUpgradeByKey(upgradesKeys.AUTOMATED_PIPE_NETWORK).unlocked= true;
		}
	},
	{
		'key': upgradesKeys.AUTOMATED_PIPE_NETWORK,
		'name': 'Automated Pipe Network',
		'description': 'Increase storage by removing the need for people to operate your warehouses.',
		'explanation': 'Massively increases the storage capacity of all warehouses.',
		icon: 'eye-dropper',
		cost: 200000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 800000000,
		apply: function(traitsState){
			traitsState.machineStorageMultiplier *= 10;
		}
	},
];

export default storageUpgrades;