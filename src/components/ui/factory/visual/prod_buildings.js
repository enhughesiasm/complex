import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../../../shared/font_awesome';
import employeeAllocations from '../../../employees/employee_allocation';
import OutputIndicator from './output_indicator';

const ProdBuildings = (props) => {
	let manualWorkers = props.manualWorkers;
	let currentProdWork = manualWorkers.outcomePerSecond;
	let totalMachineWork = props.buildings
		.map((a) => a.traitsOutputPerSecond)
		.reduce((a, b) => a + b, 0);

	let totalOutput = currentProdWork + totalMachineWork;

	let manualDp = currentProdWork < 100 ? 3 : 0;
	let machineDp = totalMachineWork < 100 ? 3 : 0;
	let totalDp = totalOutput < 100 ? 3 : 0;

	return (
		<div id='prodBuildings' className='visualBuildings'>
			<span
				style={{ cursor: 'pointer' }}
				onClick={() =>
					props.onReallocateProdWorker(employeeAllocations.MANUAL)
				}
				className={
					'building manualWorker tooltip is-tooltip-left is-tooltip-' +
					(currentProdWork > 0
						? 'success working'
						: 'warning notWorking')
				}
				data-tooltip={
					'Manual Production - ' +
					manualWorkers.allocation.manual +
					' workers - ' +
					currentProdWork.toFixed(manualDp) +
					'/s'
				}>
				<FontAwesome icon={manualWorkers.icon} />
			</span>

			{/* each object has a .builtAmount so create a new array with that many elements to repeat each object */}
			{/* each building has a .workers so if the inner index 'y' is < b.workers then it IS allocated (not <= because y is zero-indexed, while b.workers counts from 1, obviously) */}
			{props.buildings.map((b, x) =>
				[...Array(b.builtAmount)].map((building, y) => (
					<span
						key={x * y + y}
						className={
							'prodBuilding ' +
							(y < b.workers
								? 'buildingAllocated'
								: 'buildingUnallocated')
						}>
						{/* style={{animationDelay: Math.random() * 3 + 's'}} */}
						<span
							style={{ cursor: 'pointer' }}
							onClick={() =>
								props.onReallocateProdWorker(
									employeeAllocations.MACHINE
								)
							}
							className={
								'building tooltip is-tooltip-left is-tooltip-' +
								(y < b.workers ? 'success' : 'danger')
							}
							data-tooltip={
								b.name +
								' - ' +
								(y < b.workers
									? (
											(b.traitsOutputPerSecond * 1.0) /
											b.workers
									  ).toFixed(machineDp) + '/s'
									: ' 0/s - No worker!')
							}>
							<FontAwesome icon={b.icon} />
						</span>
					</span>
				))
			)}

			<OutputIndicator
				text='Producing'
				additionalClassName='totalProdOutput'
				notificationType={totalOutput > 0 ? 'success' : 'danger'}
				amount={Number.parseFloat(
					(currentProdWork + totalMachineWork || 0).toFixed(totalDp)
				)}
				suffixText='per second'
			/>
		</div>
	);
};

export default ProdBuildings;

ProdBuildings.propTypes = {
	manualWorkers: PropTypes.object.isRequired,
	buildings: PropTypes.array.isRequired,
	onReallocateProdWorker: PropTypes.func.isRequired,
};
