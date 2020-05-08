import React from 'react';
import PropTypes from 'prop-types';
import HelpText from './../../shared/help_text';
import machineBuildPermission from './../../machines/machine_build_permission';
import ComplexListEntry from '../complex_list_entry';
import { groupBy } from './../../shared/functions';

const MachinesBox = (props) => {
	const {
		machinesAll,
		machinesUnlockedList,
		machinesGetCost,
		machinesAddToQueue,
		machinesSell,
		machinesCanBuild,
	} = props;

	const groupedMachines = groupBy(machinesUnlockedList, (m) => m.role);

	const machinesByRole = [];
	for (let group in groupedMachines) {
		machinesByRole.push({ role: group, machines: groupedMachines[group] });
	}

	return (
		<div className='tile is-child homeBox box has-text-centered is-paddingless cardList'>
			<HelpText helpKey='machines' direction='left' />
			<div
				className='subtitle is-size-6-mobile'
				style={{ padding: '0 1.25rem' }}>
				MACHINES (INVENTED {machinesUnlockedList.length} /{' '}
				{machinesAll.length - 1})
			</div>

			{machinesByRole.map((role) => (
				<div key={role.role}>
					<div
						className='is-divider'
						data-content={role.role.toUpperCase()}></div>
					{role.machines.map((m) => {
						let canBuild = machinesCanBuild(m);
						let buildTooltip = ''; //'Add to queue!';
						if (canBuild === machineBuildPermission.NOPOWER) {
							buildTooltip = 'Not enough power.';
						} else if (
							canBuild === machineBuildPermission.NOFAVOURS
						) {
							buildTooltip = 'Not enough favours.';
						}

						let cost = machinesGetCost(m.type);

						return (
							<ComplexListEntry
								key={m.id}
								id={m.id}
								additionalClass='machine'
								icon={m.icon}
								name={
									m.name +
									(m.builtAmount > 0
										? ' (' + m.builtAmount + ')'
										: '')
								}
								description={m.description}
								favoursAvailable={
									canBuild !==
									machineBuildPermission.NOFAVOURS
								}
								canPurchase={
									canBuild === machineBuildPermission.SUCCESS
								}
								cost={cost}
								onPurchaseClicked={() =>
									machinesAddToQueue(m, cost)
								}
								sellText={
									m.builtAmount > 0
										? 'Sell (' + m.builtAmount + ')'
										: ''
								}
								onSellClicked={() => machinesSell(m)}
								justFailed={m.justFailed}
								tooltipData={
									(m.outcomePerSecond || 0).toFixed(2) + '/s'
								}
								purchaseText='Build'
								power={m.power}
								buildTooltipText={buildTooltip}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default MachinesBox;

MachinesBox.propTypes = {
	machinesAll: PropTypes.array.isRequired,
	machinesUnlockedList: PropTypes.array.isRequired,
	machinesGetCost: PropTypes.func.isRequired,
	machinesAddToQueue: PropTypes.func.isRequired,
	machinesSell: PropTypes.func.isRequired,
	machinesCanBuild: PropTypes.func.isRequired,
};
