import machineTypes from './machine_types';
import machineRoles from './machine_roles';

const machines = [
	{
		name: 'None',
		type: machineTypes.NONE,
		role: machineRoles.NONE,
		unlocked: false,
		storage(){
			return 0;
		},
		canBuild(){
			return false;
		}
	},
	{
		name: 'Lemon Power',
		tier: 0,
		description: 'Simple, delicious electricity.',
		icon: 'lemon',
		type: machineTypes.LEMON_POWER,
		role: machineRoles.POWER,
		unlocked: true,
		baseCost: 65,
		power: 10,
		workRequiredToBuild: 500,
		builtAmount: 0,
		storage(){
			return 0;
		}
	},
	{
		tier: 0,
		name: 'Machining Table',
		description: 'Electrified tools to produce traits FAST.',
		type: machineTypes.MACHINING_TABLE,
		role: machineRoles.PRODUCTION,
		icon: 'wrench',
		unlocked: true,
		baseCost: 100,
		power: -5,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 2500, // 20000,

		baseProduction: 10,
		multProduction: .97,
		traitsPerOutput: 5,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},
		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		tier: 0,
		name: 'Loader',
		description: 'Each loader speeds up delivery more than the one before.',
		type: machineTypes.LOADER,
		role: machineRoles.DELIVERY,
		icon: 'arrow-circle-down',
		unlocked: true,
		baseCost: 150,
		power: -20,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 3000,

		baseDelivery: .45,
		multDelivery: 0.4,
		traitsPerOutput: 1,

		totalDeliveryMultiplier(){
			return (1 + (this.baseDelivery * this.multDelivery * Math.pow(this.builtAmount, 1.65)));
		},
		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		tier: 1,
		name: 'Small Warehouse',
		description: 'A vast place to put your box collection.',
		type: machineTypes.SMALL_WAREHOUSE,
		role: machineRoles.STORAGE,
		icon: 'warehouse', // cog, cogs
		unlocked: false,
		baseCost: 1000,
		power: -150,
		builtAmount: 0,
		workRequiredToBuild: 2500,
		baseStorage: 1500,
		multStorage: 1,
		storage(){
			return this.baseStorage * this.multStorage;
		}
	},
	{
		tier: 1,
		name: 'Personality Assembler',
		description: 'Generates traits faster than electrified tables.',
		type: machineTypes.ASSEMBLER,
		role: machineRoles.PRODUCTION,
		icon: 'cogs',
		unlocked: false,
		baseCost: 2000,
		power: -200,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 12500,

		baseProduction: 15,
		multProduction: 1.6,
		traitsPerOutput: 35,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},

		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		name: 'Water Power',
		tier: 1,
		description: 'Use that nearby river to generate electricity.',
		icon: 'water',
		type: machineTypes.WATER_POWER,
		role: machineRoles.POWER,
		unlocked: false,
		baseCost: 1500,
		power: 300,
		workRequiredToBuild: 10000,
		builtAmount: 0,
		baseProduction: 0,
		multProduction: 1,
		baseDelivery: 0,
		multDelivery: 1,
		storage(){
			return 0;
		},
	},
	{
		tier: 2,
		name: 'Medium Warehouse',
		description: 'Boxes just aren\'t enough anymore.',
		type: machineTypes.MEDIUM_WAREHOUSE,
		role: machineRoles.STORAGE,
		icon: 'hospital-alt', // cog, cogs
		unlocked: false,
		baseCost: 125000,
		power: -500,
		builtAmount: 0,
		workRequiredToBuild: 20000,
		baseProduction: 1,
		multProduction: 1,
		baseStorage: 10000,
		multStorage: 1,
		storage(){
			return this.baseStorage * this.multStorage;
		},
	},
	{
		tier: 2,
		name: 'Conveying Machines',
		description: 'Produce traits faster by shipping them quickly around your factory.',
		type: machineTypes.CONVEYOR_BELT,
		role: machineRoles.PRODUCTION,
		icon: 'bacon',
		unlocked: false,
		baseCost: 150000,
		power: -500,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 40000, // 20000,

		baseProduction: 15,
		multProduction: 3.8,
		traitsPerOutput: 250,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},

		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		name: 'Steam Power',
		tier: 2,
		description: 'BOIL the river to make MORE electricity.',
		icon: 'mug-hot',
		type: machineTypes.STEAM_POWER,
		role: machineRoles.POWER,
		unlocked: false,
		baseCost: 100000,
		power: 1000,
		workRequiredToBuild: 25000,
		builtAmount: 0,
		baseProduction: 0,
		multProduction: 1,
		baseDelivery: 0,
		multDelivery: 1,
		storage(){
			return 0;
		},
	},
	{
		name: 'Turbine Power',
		tier: 3,
		description: 'Why stop at the river? Harness electricity from the air itself.',
		icon: 'wind',
		type: machineTypes.TURBINE_POWER,
		role: machineRoles.POWER,
		unlocked: false,
		baseCost: 1000000,
		power: 20000,
		workRequiredToBuild: 75000,
		builtAmount: 0,
		baseProduction: 0,
		multProduction: 1,
		storage(){
			return 0;
		},
	},
	{
		tier: 3,
		name: 'Trait Pump',
		description: 'Fills thousands of jars at once to generate traits SUPER fast.',
		type: machineTypes.TRAIT_PUMP,
		role: machineRoles.PRODUCTION,
		icon: 'gas-pump',
		unlocked: false,
		baseCost: 1200000,
		power: -10000,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 100000, // 20000,

		baseProduction: 15,
		multProduction: 3.8,
		traitsPerOutput: 2000,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},

		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		tier: 4,
		name: 'Industrial Warehouse',
		description: 'The biggest box anyone could ever imagine.',
		type: machineTypes.INDUSTRIAL_WAREHOUSE,
		role: machineRoles.STORAGE,
		icon: 'industry', // cog, cogs
		unlocked: false,
		baseCost: 9500000,
		power: -200000,
		builtAmount: 0,
		workRequiredToBuild: 125000,
		baseProduction: 1,
		multProduction: 1,
		baseStorage: 50000,
		multStorage: 1,
		storage(){
			return this.baseStorage * this.multStorage;
		},
	},
	{
		name: 'Coal Power',
		tier: 4,
		description: 'Burn rocks to make more electricity than boring old air and water put together.',
		icon: 'burn',
		type: machineTypes.COAL_POWER,
		role: machineRoles.POWER,
		unlocked: false,
		baseCost: 5500000,
		power: 100000,
		workRequiredToBuild: 100000,
		builtAmount: 0,
		baseProduction: 0,
		multProduction: 1,
		storage(){
			return 0;
		},
	},
	{
		tier: 4,
		name: 'Assembly Line',
		description: 'Identical machines producing traits in a line. Soul-crushing, but VERY productive.',
		type: machineTypes.ASSEMBLY_LINE,
		role: machineRoles.PRODUCTION,
		icon: 'grip-lines',
		unlocked: false,
		baseCost: 12000000,
		power: -100000,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 200000, // 20000,

		baseProduction: 15,
		multProduction: 18,
		traitsPerOutput: 2500,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},
		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		tier: 5,
		name: 'Trait Compressor',
		description: 'Concentrates traits at the highest possible density so they can be produced at incredible speed.',
		type: machineTypes.TRAIT_COMPRESSOR,
		role: machineRoles.PRODUCTION,
		icon: 'star',
		unlocked: false,
		baseCost: 90000000,
		power: -1000000,
		builtAmount: 0,
		workers: 0,
		workRequiredToBuild: 800000, // 20000,

		baseProduction: 15,
		multProduction: 20,
		traitsPerOutput: 16000,

		baseWorkPerSecond(){
			return this.baseProduction * this.multProduction;
		},
		storage(){
			return 0;
		},
		work: {
			required: 100,
			progress: 0
		},
		traitsOutputPerSecond: 0,
		currentTimeTaken: 0
	},
	{
		name: 'Massive Stone Wheel',
		tier: 5,
		description: 'This tremendous flywheel stores and releases all the electricity you\'ll ever need.',
		icon: 'hockey-puck',
		type: machineTypes.MASSIVE_WHEEL,
		role: machineRoles.POWER,
		unlocked: false,
		baseCost: 65000000,
		power: 2000000,
		workRequiredToBuild: 250000,
		builtAmount: 0,
		baseProduction: 0,
		multProduction: 1,
		baseDelivery: 0,
		multDelivery: 1,
		storage(){
			return 0;
		},
	},
];

export default machines;