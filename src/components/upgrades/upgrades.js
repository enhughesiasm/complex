import makingUpgrades from './upgrades_making';
import employeeUpgrades from './upgrades_employees';
import deliveryUpgrades from './upgrades_delivery';
import machineUpgrades from './upgrades_machines';
import specialUpgrades from './upgrades_special';
import storageUpgrades from './upgrades_storage';

const upgrades = {
	loadAll(){
		let upgradeId = 0;
		let all = [];


		makingUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		employeeUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		deliveryUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		machineUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		storageUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		specialUpgrades.forEach((u) => {
			all.push( { id: upgradeId, purchased: false, ...u });
			upgradeId++;
		});

		all.sort((a, b) => (a.cost > b.cost) ? 1 : -1);

		return all;
	}
};

export default upgrades;