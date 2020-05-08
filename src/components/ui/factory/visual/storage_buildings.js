import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../../../shared/font_awesome';
import OutputIndicator from './output_indicator';
//import {useTraceUpdate} from '../../shared/functions';

const getStorage = (totalUsed, capacity) => {
	if (totalUsed < 0) return 0;
	if (totalUsed - capacity <= 0) return totalUsed;
	return Math.max(Math.min(capacity, totalUsed - capacity), 0);
};

const StorageBuildings = (props) => {
	//	useTraceUpdate(props);

	const {
		storageNaturalSize,
		storageMachineSize,
		storageAmount,
		storageIsFull,
		machineStorageMultiplier,
	} = props;
	let totalStorage = storageNaturalSize + storageMachineSize;
	let currentStored = storageAmount;
	let buildings = [];

	let storageMagnitude = Math.floor(Math.log10(totalStorage)) + 1;

	buildings.push({
		id: 0,
		name: 'Boxes & things',
		icon: 'box',
		size: storageNaturalSize,
		storing: getStorage(currentStored, storageNaturalSize),
	});

	buildings[0].isFull = buildings[0].size == buildings[0].storing;

	currentStored -= storageNaturalSize;

	let id = 1;
	props.buildings.forEach((b) => {
		for (let i = 0; i < b.builtAmount; i++) {
			id++;
			let newB = {
				id: id,
				name: b.name,
				icon: b.icon,
				size: b.storage() * machineStorageMultiplier,
				storing: getStorage(
					currentStored,
					b.storage() * machineStorageMultiplier
				),
			};

			newB.isFull = newB.size == newB.storing;
			currentStored -= b.storage();

			buildings.push(newB);
		}
	});

	return (
		<div id='storageBuildings' className='visualBuildings'>
			{buildings.map((building) => (
				<span
					className={
						'storageBuilding building tooltip is-tooltip-left is-tooltip-' +
						(building.isFull ? 'warning isFull' : 'success')
					}
					key={building.id}
					data-tooltip={
						building.name +
						' (' +
						(building.isFull ? building.size : building.storing) +
						'/' +
						building.size +
						')'
					}
					//  style={{animationDelay: Math.random() * 5}}
				>
					<FontAwesome icon={building.icon} />
				</span>
			))}
			<OutputIndicator
				text='Storing'
				additionalClassName='totalStorageOutput'
				notificationType={storageIsFull ? 'danger' : 'success'}
				amountText={storageAmount
					.toLocaleString()
					.padStart(storageMagnitude, '0')}
				suffixText={
					' / ' +
					(storageNaturalSize + storageMachineSize).toLocaleString()
				}
			/>
		</div>
	);
};

export default StorageBuildings;

StorageBuildings.propTypes = {
	storageNaturalSize: PropTypes.number.isRequired,
	storageMachineSize: PropTypes.number.isRequired,
	storageAmount: PropTypes.number.isRequired,
	storageIsFull: PropTypes.bool.isRequired,
	buildings: PropTypes.array.isRequired,
	machineStorageMultiplier: PropTypes.number.isRequired,
};
