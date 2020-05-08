import upgradesKeys from './upgrades_keys';
import { submitToAnalytics } from './../shared/functions';

const specialUpgrades = [
	{
		key: upgradesKeys.INVENT_MACHINERY,
		name: 'Invent Machinery',
		description:
			'This is getting out of hand. Perhaps you need an actual factory..?',
		explanation: 'Unlocks the ability to build machines.',
		icon: 'industry',
		cost: 300,
		unlocked: true,
		unlockedAtTraitsDelivered: 120,
		apply: function (traitsState, activatePyro) {
			traitsState.machines.unlocked = true;
			traitsState.getUpgradeByKey(
				upgradesKeys.TALES_OF_THE_PRELIFE
			).unlocked = true;
			traitsState.getUpgradeByKey(
				upgradesKeys.BETTER_MACHINERY
			).unlocked = true;
			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics('upgrade', 'complex', 'INVENT_MACHINERY');
		},
	},
	{
		key: upgradesKeys.TALES_OF_THE_PRELIFE,
		name: 'Tales of the Prelife',
		description:
			'Have a storyteller visit, and tell you stories from the rest of the prelife.',
		explanation: '???',
		icon: 'comment',
		cost: 10000,
		unlocked: false,
		unlockedAtTraitsDelivered: 1000,
		apply: function (traitsState, activatePyro) {
			traitsState.getUpgradeByKey(
				upgradesKeys.WONDER_ABOUT_LIFE
			).unlocked = true;
			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics(
				'upgrade',
				'complex',
				'TALES_OF_THE_PRELIFE - 1/5'
			);
		},
	},
	{
		key: upgradesKeys.WONDER_ABOUT_LIFE,
		name: 'Tales of Earth',
		description:
			"This work is fun. You're helping people prepare to live their lives. But what else is out there...?",
		explanation: '???',
		icon: 'question',
		cost: 1000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 10000,
		apply: function (traitsState, activatePyro) {
			traitsState.getUpgradeByKey(
				upgradesKeys.WORK_SATISFACTION
			).unlocked = true;
			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics('upgrade', 'complex', 'WONDER_ABOUT_LIFE - 2/5');
		},
	},
	{
		key: upgradesKeys.WORK_SATISFACTION,
		name: 'Find Satisfaction in Work',
		description:
			'Who cares what else there is? Surely throwing yourself into your work will be enough.',
		explanation: '???',
		icon: 'question',
		cost: 10000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 10000,
		apply: function (traitsState, activatePyro) {
			traitsState.getUpgradeByKey(
				upgradesKeys.VISIT_THE_SHOP
			).unlocked = true;
			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics('upgrade', 'complex', 'WORK_SATISFACTION - 3/5');
		},
	},
	{
		key: upgradesKeys.VISIT_THE_SHOP,
		name: 'Visit the Shop Before Life',
		description:
			"It'd be nice to see what actually happens with all these traits, for once.",
		explanation: '???',
		icon: 'question',
		cost: 100000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 100000,
		apply: function (traitsState, activatePyro) {
			traitsState.getUpgradeByKey(
				upgradesKeys.LEAVE_FOR_EARTH
			).unlocked = true;
			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics('upgrade', 'complex', 'VISIT_THE_SHOP - 4/5');
		},
	},
	{
		key: upgradesKeys.LEAVE_FOR_EARTH,
		name: 'Leave for Earth',
		description:
			"Leave your factory behind and head to the Shop Before Life—and then onto Earth. It's time for life to begin...",
		explanation: '???',
		icon: 'globe-europe',
		cost: 25000000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 1000000,
		apply: function (traitsState, activatePyro) {
			traitsState.gameComplete = true;
			traitsState.gameWinTime = traitsState.totalTimePlayed.clone();

			if (activatePyro) {
				activatePyro();
			}
			submitToAnalytics('upgrade', 'complex', 'LEAVE_FOR_EARTH - 5/5');
		},
	},
];

export default specialUpgrades;
