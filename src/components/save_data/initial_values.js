import moment from 'moment';

const initialValues = {

	debug: false,
	overallWorkMultiplier: 1.2,

	totalTimePlayed: moment.duration(0),

	stored: 0,
	storedTraits: [],
	storageMax: 1000000000000,
	storageBase: 1,
	storageMultiplier: 1,
	machineStorageMultiplier: 1,
	isMakingTraits: false,
	justFailedToMake: false,
	workRequiredToMakeTrait: 60,
	makeRateBase: 10,
	makeRateMultiplier: 1,
	makeProgressPercent: 0,
	madePerClick: 1,
	gameComplete: false,
	totalMade: 0,
	totalDelivered: 0,

	totalWastedProduction: 0,
	totalWastedDeliveries: 0,

	favours: 0,
	favoursSpent: 0,
	deliveryRateBase: 1,
	deliveryRateMultiplier: 1,

	costScalingExponent: 1.45,
	costScalingBaseMultiplier: 1.12,

	machineCostMultiplier: 1,
	machineOutputMultiplier: 1,

	flexibleMachineryUnlocked: false,
	flexibleMachinerySetting: 0,
	flexibleMachineryAbsMax: 3,
	flexibleMachineFactor: 0.15,

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
		// yes this is a hacky paste of an enum, I'm sorry
		'lemonpower': 0,
		'machiningtable': 0,
		'loader': 0,
		'smallwarehouse': 0,

		'assembler': 0,
		'waterpower': 0,

		'conveyorbelt': 0,
		'steampower': 0,
		'mediumwarehouse': 0,

		'turbinepower': 0,
		'traitpump': 0,
		'industrialwarehouse': 0,

		'assemblyline': 0,
		'coalpower': 0,

		'traitcompressor': 0,
		'massivewheel': 0

	}

};

export default initialValues;