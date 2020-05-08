import moment from 'moment';

const savableValues = {

	overallWorkMultiplier: 1.2,

	totalTimePlayed: moment.duration(0),

	costScalingExponent: 1.45,
	costScalingBaseMultiplier: 1.1,

	stored: 0,
	storageMax: 1000000000000,
	isMakingTraits: false,
	totalMade: 0,
	totalDelivered: 0,

	totalWastedProduction: 0,
	totalWastedDeliveries: 0,

	flexibleMachinerySetting: 0,

	favours: 0,
	favoursSpent: 0,

	employees:{
		production:{
			hiredAmount: 0,
			outputMultiplier: 1,
			costMultiplier: 1,
			workPerSecondMultiplier: 1,
			workRequiredMultiplier: 1,
		},
		delivery:{
			hiredAmount: 0,
			outputMultiplier: 1,
			costMultiplier: 1,
			workPerSecondMultiplier: 1,
			workRequiredMultiplier: 1,
		},
		builder:{
			hiredAmount: 0,
			outputMultiplier: 1,
			costMultiplier: 1,
			workPerSecondMultiplier: 1,
			workRequiredMultiplier: 1,
		}
	},
	upgradesPurchased: [ ],
	machinesBuilt:{
	}

};

export default savableValues;