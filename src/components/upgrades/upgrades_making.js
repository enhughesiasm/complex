import upgradesKeys from './upgrades_keys';


const makingUpgrades = [
	{
		key: upgradesKeys.WORKBENCH,
		'name': 'A Workbench',
		'description': 'It\'d be nice not to work on the floor anymore.',
		'explanation': '"Make Traits" becomes a little faster.',
		icon: 'shapes',
		cost: 2,
		unlocked: true,
		unlockedAtTraitsDelivered: 1,
		apply: function(traitsState){
			traitsState.makeRateMultiplier += 0.5;
			traitsState.getUpgradeByKey(upgradesKeys.TOOLS).unlocked = true;
		}
	},
	{
		key: upgradesKeys.TOOLS,
		'name': 'Some Tools',
		'description': 'Creating glass with your bare hands is getting painful.',
		'explanation': '"Make Traits" becomes a little faster.',
		icon: 'tools',
		cost: 3,
		unlocked: false,
		unlockedAtTraitsDelivered: 3,
		apply: function(traitsState){
			traitsState.makeRateMultiplier += 0.25;
			traitsState.getUpgradeByKey(upgradesKeys.GLASSBLOWING).unlocked = true;
		}
	},
	{
		key: upgradesKeys.GLASSBLOWING,
		'name': 'Actual glassblowing equipment',
		'description': 'This is how the pros do it.',
		'explanation': '"Make Traits" becomes a little faster.',
		icon: 'wine-glass',
		cost: 5,
		unlocked: false,
		unlockedAtTraitsDelivered: 20,
		apply: function(traitsState){
			traitsState.makeRateBase *= 1.5;
			traitsState.getUpgradeByKey(upgradesKeys.LABELS).unlocked = true;
		}
	},
	{
		key: upgradesKeys.LABELS,
		'name': 'Label Applicators',
		'description': 'You\'re starting to hate picking the corners of these horrible sticky labels.',
		'explanation': '"Make Traits" becomes a little faster.',
		icon: 'tags',
		cost: 10,
		unlocked: false,
		unlockedAtTraitsDelivered: 35,
		apply: function(traitsState){
			traitsState.makeRateBase *= 1.5;
			traitsState.getUpgradeByKey(upgradesKeys.TRAIT_SYNTHESIS).unlocked = true;
		}
	},
	{
		key: upgradesKeys.TRAIT_SYNTHESIS,
		'name': 'Better Trait Synthesis',
		'description': 'Create twice as many traits at once with your own hands.',
		'explanation': 'Doubles the output of "Make Traits".',
		icon: 'brain',
		cost: 10,
		unlocked: false,
		unlockedAtTraitsDelivered: 35,
		apply: function(traitsState){
			traitsState.madePerClick *= 2;
			traitsState.getUpgradeByKey(upgradesKeys.LABEL_ROLLS).unlocked = true;
		}
	},
	{
		key: upgradesKeys.LABEL_ROLLS,
		'name': 'Industrial Label Rolls',
		'description': 'Less fiddly, so you can produce traits faster by hand.',
		'explanation': '"Make Traits" is now 25% faster.',
		icon: 'toilet-paper',
		cost: 10,
		unlocked: false,
		unlockedAtTraitsDelivered: 50,
		apply: function(traitsState){
			traitsState.makeRateMultiplier += .75;
			traitsState.getUpgradeByKey(upgradesKeys.TURBO_PRODUCTION).unlocked = true;
		}
	},
	{
		key: upgradesKeys.TURBO_PRODUCTION,
		'name': 'Turbo Production',
		'description': 'Discover how to produce many traits by hand at once. It\'s basically magic.',
		'explanation': 'Your "Make Traits" button now produces 10x as many traits at once.',
		icon: 'toilet-paper',
		cost: 30,
		unlocked: false,
		unlockedAtTraitsDelivered: 180,
		apply: function(traitsState){
			traitsState.madePerClick *= 10;
		}
	},
];

export default makingUpgrades;