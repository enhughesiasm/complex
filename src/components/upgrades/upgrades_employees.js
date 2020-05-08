import employeeTypes from '../employees/employee_types';
import upgradesKeys from './upgrades_keys';


const employeeUpgrades = [

	{
		key: upgradesKeys.LABOUR_TRAINING,
		'name': 'Labour Training',
		'description': 'Teach your assistants to work faster.',
		'explanation': 'Increases the productivity of your trait-making employees.',
		icon: 'chalkboard-teacher',
		cost: 3875,
		unlocked: true,
		unlockedAtTraitsDelivered: 6000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

			e.name = 'Labourers';
			e.description = 'Trait-makers with a little experience.';
			e.icon = 'running';

			traitsState.employees[employeeTypes.PRODUCTION].costMultiplier += 2;
			traitsState.employees[employeeTypes.PRODUCTION].workPerSecondMultiplier += .5;

			traitsState.getUpgradeByKey(upgradesKeys.ADVANCED_CRAFTING).unlocked= true;
		}
	},
	{
		key: upgradesKeys.ADVANCED_CRAFTING,
		'name': 'Advanced Crafting Lessons',
		'description': 'Train your workers to make more, better, faster!',
		'explanation': 'Increases the productivity of your trait-making employees.',
		icon: 'chalkboard-teacher',
		cost: 500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 2500000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

			e.name = 'Crafters';
			e.description = 'Highly experienced crafters of traits.';
			e.icon = 'screwdriver';
			traitsState.employees[employeeTypes.PRODUCTION].costMultiplier += 10;
			traitsState.employees[employeeTypes.PRODUCTION].workPerSecondMultiplier += .75;
			traitsState.getUpgradeByKey(upgradesKeys.ARTISANS).unlocked= true;

		}
	},
	{
		key: upgradesKeys.ARTISANS,
		'name': 'Artisanal Traitmaking Seminars',
		'description': 'Your workers will become the most skilled crafters in all the prelife.',
		'explanation': 'Increases the productivity of your trait-making employees.',
		icon: 'chalkboard-teacher',
		cost: 45000000,
		unlocked: false,
		unlockedAtTraitsDelivered: 75000000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

			e.name = 'Artisans';
			e.description = 'Artisanal makers of the finest traits.';
			e.icon = 'paint-brush';
			traitsState.employees[employeeTypes.PRODUCTION].costMultiplier += 100;
			traitsState.employees[employeeTypes.PRODUCTION].workPerSecondMultiplier += 1.25;
		}
	},
	{
		key: upgradesKeys.DELIVERY_GENIUS,
		'name': 'Delivery Genius',
		'description': 'Teach your volunteers to carry a trait in each hand.',
		'explanation': 'Doubles the delivery output of your delivery workers.',
		icon: 'wave-square',
		cost: 25,
		unlocked: true,
		unlockedAtTraitsDelivered: 165,
		apply: function(traitsState){
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 2;
			traitsState.getUpgradeByKey(upgradesKeys.HORSES).unlocked= true;
		}
	},
	{
		key: upgradesKeys.HORSES,
		'name': 'Discover Horses',
		'description': 'Your volunteers could use these weird long dogs to deliver faster.',
		'explanation': 'Increases the delivery output of your delivery workers.',
		icon: 'horse',
		cost: 120,
		unlocked: false,
		unlockedAtTraitsDelivered: 300,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.DELIVERY);

			e.name = 'Horse Riders';
			e.description = 'A charming volunteer delivery service.';
			e.icon = 'horse';

			traitsState.employees[employeeTypes.DELIVERY].costMultiplier *= 3;
			traitsState.employees[employeeTypes.DELIVERY].workPerSecondMultiplier *= 1.5;
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 1.55;

			e.deliveryAnimationDuration = 15;
			traitsState.getUpgradeByKey(upgradesKeys.WAGONS).unlocked= true;
		}
	},
	{
		key: upgradesKeys.WAGONS,
		'name': 'Wagons & Wheels',
		'description': 'Something tells you these could be useful for your delivery people.',
		'explanation': 'Massively increases the output of your delivery workers.',
		icon: 'dharmachakra',
		cost: 3500,
		unlocked: false,
		unlockedAtTraitsDelivered: 6500,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.DELIVERY);

			e.name = 'Wagon drivers';
			e.description = 'A marvellous fleet of trait-transporters.';
			e.icon = 'dharmachakra';

			traitsState.employees[employeeTypes.DELIVERY].costMultiplier *= 10;
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 10;

			e.deliveryAnimationDuration = 10;
			traitsState.getUpgradeByKey(upgradesKeys.HUMUNGOUS_WAGONS).unlocked= true;
		}
	},
	{
		key: upgradesKeys.HUMUNGOUS_WAGONS,
		'name': 'Wagon Convoys',
		'description': 'Make many delivery wagons travel together, and feed that hungry Shop faster.',
		icon: 'truck-loading',
		'explanation': 'Increases the delivery output of your delivery workers.',
		cost: 1250000,
		unlocked: false,
		unlockedAtTraitsDelivered: 1200000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.DELIVERY);

			e.name = 'Wagon Convoys';
			e.description = 'A massive force of vehicles to transport your traits.';
			e.icon = 'truck-loading';


			traitsState.employees[employeeTypes.DELIVERY].costMultiplier *= 5;
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 1.75;

			e.deliveryAnimationDuration = 10;
			traitsState.getUpgradeByKey(upgradesKeys.TRAINS).unlocked= true;
		}
	},
	{
		key: upgradesKeys.TRAINS,
		'name': 'Invent Trains',
		'description': 'Imagine a huge, fast machine barrelling straight to the Shop Before Life.',
		'explanation': 'Massively increases the delivery output of your delivery workers.',
		icon: 'train',
		cost: 25500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 75000000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.DELIVERY);

			e.name = 'Trains';
			e.description = 'Choo-choo! The *most* fun way to deliver human personality traits.';
			e.icon = 'train';

			traitsState.employees[employeeTypes.DELIVERY].costMultiplier *= 2;
			traitsState.employees[employeeTypes.DELIVERY].outputMultiplier *= 20;
			// traitsState.employees[employeeTypes.DELIVERY].workPerSecondMultiplier *= 2;

			e.deliveryAnimationDuration = 5;

			traitsState.getUpgradeByKey(upgradesKeys.HIGH_SPEED_TRAINS).unlocked= true;
		}
	},
	{
		key: upgradesKeys.CONSTRUCTION_101,
		'name': 'Construction 101',
		'description': 'Develop some expertise in machine construction.',
		icon: 'chalkboard-teacher',
		'explanation': 'Doubles the speed of your machine builders.',
		cost: 25000,
		unlocked: true,
		unlockedAtTraitsDelivered: 55000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.BUILDER);

			e.name = 'Novices';
			e.description = 'These people have built a machine or two. Just.';
			e.icon = 'hard-hat';

			traitsState.employees[employeeTypes.BUILDER].costMultiplier *= 2;
			traitsState.employees[employeeTypes.BUILDER].workPerSecondMultiplier *= 2;

			traitsState.getUpgradeByKey(upgradesKeys.CONSTRUCTION_INT).unlocked= true;
		}
	},
	{
		key: upgradesKeys.CONSTRUCTION_INT,
		'name': 'Intermediate Construction',
		'description': 'Train your builders to work faster!',
		icon: 'chalkboard-teacher',
		'explanation': 'Doubles the speed of your machine builders.',
		cost: 450000,
		unlocked: false,
		unlockedAtTraitsDelivered: 1200000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.BUILDER);

			e.name = 'Constructors';
			e.description = 'Highly experienced builders.';
			e.icon = 'hard-hat';
			traitsState.employees[employeeTypes.BUILDER].costMultiplier *= 2;
			traitsState.employees[employeeTypes.BUILDER].workPerSecondMultiplier *= 2;

			traitsState.getUpgradeByKey(upgradesKeys.CONSTRUCTION_ADV).unlocked= true;
		}
	},
	{
		key: upgradesKeys.CONSTRUCTION_ADV,
		'name': 'Advanced Construction Techniques',
		'description': 'Train your builders to work faster still.',
		'explanation': 'More than doubles the speed of your machine builders.',
		icon: 'chalkboard-teacher',
		cost: 2500000,
		unlocked: false,
		unlockedAtTraitsDelivered: 90000000,
		apply: function(traitsState){
			let e = traitsState.getEmployeeByType(employeeTypes.BUILDER);

			e.name = 'Manufacturers';
			e.description = 'The most elite builders in the known universe.';
			e.icon = 'hard-hat';

			traitsState.employees[employeeTypes.BUILDER].costMultiplier *= 2;
			traitsState.employees[employeeTypes.BUILDER].workPerSecondMultiplier *= 2.5;

		}
	},
];

export default employeeUpgrades;