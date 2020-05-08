// import React from 'react';
// import HelpText from '../../shared/help_text';
// import FontAwesome from '../../shared/font_awesome';
// import employeeAllocations from '../../employees/employee_allocation';
// import employeeTypes from './../../employees/employee_types';
// import machineRoles from '../../machines/machine_roles';

// const WorkerAllocation = (props) => {

// 	let workers = props.traitsState.getEmployeeByType(employeeTypes.PRODUCTION);

// 	let manualWorkers = workers.allocation.manual || 0;
// 	let machineWorkers = workers.allocation.machines || 0;
// 	let machineCount = props.traitsState.machines.getCountByRole(machineRoles.PRODUCTION) || 0;

// 	let canManual = props.traitsState.canReallocateProdWorker(employeeAllocations.MANUAL);
// 	let canMachine = props.traitsState.canReallocateProdWorker(employeeAllocations.MACHINE);

// 	let cantMachineMessage = workers.hiredAmount > machineCount ? 'Not enough machines' : 'No workers to move';

// 	return(<div className={'workerAllocation tile is-vertical is-ancestor is-marginless notification ' + ((manualWorkers + machineWorkers == 0) ? 'is-danger' : 'is-light') }>
// 		<HelpText helpKey="workers" direction="right"/>
// 		{/* <h3 className="has-text-weight-bold"><span><FontAwesome icon="user-friends"/> { workers.hiredAmount } workers</span></h3> */}
// 		<div className="tile is-parent is-12 is-marginless is-paddingless">
// 			<span className="tile is-child is-8"><strong><FontAwesome icon="hand-paper"/> Working manually:</strong> { manualWorkers || 0} workers / { workers.hiredAmount }</span>
// 			<span className="tile is-child is-4">
// 				<button className={'tooltip button is-small is-' + (canManual ? 'success' : 'danger') + ' is-tooltip-' + (canManual ? 'success' : 'warning')} disabled={!canManual} data-tooltip={canManual ? 'Move someone to manual work' : 'No workers to move'} onClick={() => props.traitsState.reallocateProdWorker(employeeAllocations.MANUAL)}>+1</button>
// 			</span>

// 		</div>
// 		<div className="tile is-parent is-12 is-marginless is-paddingless">

// 			<span className="tile is-child is-8"><strong><FontAwesome icon="cogs"/> Working on { machineCount } machines:</strong> { machineWorkers || 0 } workers / { workers.hiredAmount }</span>
// 			<span className="tile is-child is-4">
// 				<button className={'button tooltip is-small is-' + (canMachine ? 'success' : 'danger') + ' is-tooltip-bottom is-tooltip-' + (canMachine ? 'success' : 'warning')} data-tooltip={canMachine ? 'Move someone to a machine' : cantMachineMessage} disabled={!canMachine} onClick={() => props.traitsState.reallocateProdWorker(employeeAllocations.MACHINE)}>+1</button>
// 			</span>

// 		</div>
// 	</div>);};

// export default WorkerAllocation;
