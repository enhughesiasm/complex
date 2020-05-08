import employeeTypes from '../employees/employee_types';
import upgradesKeys from './upgrades_keys';

const machineUpgrades = [
	{
		key: upgradesKeys.BETTER_MACHINERY,
		name: 'Better Machinery',
		description:
			'If machines are good, then better machines must be even better...',
		explanation: 'Unlocks more productive machines for your factory.',
		icon: 'industry',
		cost: 5000,
		unlocked: false,
		unlockedAtTraitsDelivered: 9500,
		apply: function (traitsState) {
			traitsState.machines.all
				.filter((a) => a.tier === 1)
				.forEach((m) => (m.unlocked = true));
			traitsState.getUpgradeByKey(
				upgradesKeys.EVEN_BETTER_MACHINERY
			).unlocked = true;
			traitsState.getUpgradeByKey(
				upgradesKeys.FLEXIBLE_MACHINERY
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.FLEXIBLE_MACHINERY,
		name: 'Flexible Machinery',
		description:
			'Teach machines to modify themselves so they can perform different tasks.',
		explanation:
			'Unlocks the ability to move factory capacity between production and delivery.',
		icon: 'exchange-alt',
		cost: 150000,
		unlocked: false,
		unlockedAtTraitsDelivered: 125000,
		apply: function (traitsState) {
			traitsState.flexibleMachineryUnlocked = true;
		},
	},
	{
		key: upgradesKeys.EVEN_BETTER_MACHINERY,
		name: 'Even Better Machinery',
		description: 'Your mind is buzzing with dreams of bigger machines...',
		explanation: 'Unlocks more productive machines for your factory.',
		icon: 'industry',
		cost: 350000,
		unlocked: false,
		unlockedAtTraitsDelivered: 450000,
		apply: function (traitsState) {
			traitsState.machines.all
				.filter((a) => a.tier === 2)
				.forEach((m) => (m.unlocked = true));
			traitsState.getUpgradeByKey(
				upgradesKeys.CHEAPER_MATERIALS
			).unlocked = true;
			traitsState.getUpgradeByKey(
				upgradesKeys.EVEN_BETTERER_MACHINERY
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.CHEAPER_MATERIALS,
		name: 'Industrial Quarrying',
		description:
			'Pull metal straight out of the ground so all your machines will be cheaper.',
		explanation: 'Reduces the cost of your machines by 25%',
		icon: 'mountain',
		cost: 600000,
		unlocked: false,
		unlockedAtTraitsDelivered: 450000,
		apply: function (traitsState) {
			traitsState.machineCostMultiplier *= 0.75;
			traitsState.getUpgradeByKey(
				upgradesKeys.MORE_EFFICIENT_MACHINERY
			).unlocked = true;
			traitsState.getUpgradeByKey(
				upgradesKeys.SMARTER_CONSTRUCTION_METHODS
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.MORE_EFFICIENT_MACHINERY,
		name: 'More efficient machinery',
		description:
			'Your old designs were wasteful, but now you see how they can be GREATLY improved.',
		explanation: 'Doubles the output of all of your production machines.',
		icon: 'square-root-alt',
		cost: 12500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 26500000,
		apply: function (traitsState) {
			traitsState.machineOutputMultiplier *= 2;
			traitsState.getUpgradeByKey(
				upgradesKeys.CHEAPER_MATERIALS
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.SMARTER_CONSTRUCTION_METHODS,
		name: 'Smarter Construction Methods',
		description: 'Encourage your builders to work faster.',
		explanation: 'Speeds up construction work by 25%',
		icon: 'industry',
		cost: 1500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 2550000,
		apply: function (traitsState) {
			// traitsState.employees[employeeTypes.BUILDER].workRequiredMultiplier	*= .75;
			traitsState.employees[
				employeeTypes.BUILDER
			].workPerSecondMultiplier *= 1.25;
		},
	},
	{
		key: upgradesKeys.EVEN_BETTERER_MACHINERY,
		name: 'Even Betterer Machinery',
		description: 'What if everything were bigger still?',
		explanation: 'Unlocks more productive machines for your factory.',
		icon: 'industry',
		cost: 950000,
		unlocked: false,
		unlockedAtTraitsDelivered: 2500000,
		apply: function (traitsState) {
			traitsState.machines.all
				.filter((a) => a.tier === 3)
				.forEach((m) => (m.unlocked = true));
			traitsState.getUpgradeByKey(
				upgradesKeys.EVEN_BETTERERER_MACHINERY
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.EVEN_BETTERERER_MACHINERY,
		name: 'Even Bettererer Machinery',
		description: 'Okay, but what if everything was BIGGER AGAIN?',
		explanation: 'Unlocks more productive machines for your factory.',
		icon: 'industry',
		cost: 11500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 75000000,
		apply: function (traitsState) {
			traitsState.machines.all
				.filter((a) => a.tier === 4)
				.forEach((m) => (m.unlocked = true));
			traitsState.getUpgradeByKey(
				upgradesKeys.UNIMAGINABLE_MACHINERY
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.UNIMAGINABLE_MACHINERY,
		name: 'Unimaginable Machinery',
		description: 'YOUR MIND IS FILLED WITH A GINORMOUS FACTORY',
		explanation: 'Unlocks more productive machines for your factory.',
		icon: 'industry',
		cost: 95000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 250000000,
		apply: function (traitsState) {
			traitsState.machines.all
				.filter((a) => a.tier === 5)
				.forEach((m) => (m.unlocked = true));
			traitsState.getUpgradeByKey(
				upgradesKeys.SELF_REPLICATING_MACHINES
			).unlocked = true;
		},
	},
	{
		key: upgradesKeys.SELF_REPLICATING_MACHINES,
		name: 'Self-Replicating Machines',
		description:
			'Speed up construction by teaching machines to build themselves.',
		explanation: 'Reduces the work required to build each machine by 50%',
		icon: 'object-ungroup',
		cost: 500000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 400000000,
		apply: function (traitsState) {
			// traitsState.employees[employeeTypes.BUILDER].workRequiredMultiplier	*= .50;
			traitsState.employees[
				employeeTypes.BUILDER
			].workPerSecondMultiplier *= 2;
		},
	},
];

export default machineUpgrades;
