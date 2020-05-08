import React from 'react';
import PropTypes from 'prop-types';
import HelpText from '../../shared/help_text';
import employeeTypes from '../../employees/employee_types';
import ComplexListEntry from '../complex_list_entry';

const BoxEmployees = (props) => {
	const {
		employeesUnlocked,
		employeesCanHire,
		employeesGetCost,
		employeesHire,
		employees,
	} = props;

	// let heightUnitsPerEmployee = 14;
	// let height = 2 + (Math.max(employeesUnlocked.length, 1) * heightUnitsPerEmployee);

	return (
		<div className='tile is-child homeBox box employees cardList'>
			<HelpText helpKey={'employees'} direction='left' />
			<span className='subtitle is-size-6-mobile '>EMPLOYEES</span>
			{employeesUnlocked.map((emp) => {
				let canHire = employeesCanHire(emp.id);
				let cost = employeesGetCost(emp.id);
				let showProgressBar = true;

				let pauseIcon = emp.work.paused
					? 'play-circle'
					: 'pause-circle';
				let pauseText = emp.work.paused
					? 'Order them back to work!'
					: 'Ask them to stop work, for some reason.';

				let workdescription =
					emp.type === employeeTypes.PRODUCTION
						? 'Making traits by hand: '
						: emp.type === employeeTypes.DELIVERY
						? 'Delivering traits: '
						: 'Building machines: ';

				let employeeStatus = employees[emp.type];

				return (
					<ComplexListEntry
						key={emp.id}
						id={emp.id}
						additionalClass='employee'
						icon={emp.icon}
						name={employeeStatus.hiredAmount + ' ' + emp.name}
						description={emp.description}
						favoursAvailable={canHire}
						canPurchase={canHire}
						cost={cost}
						onPurchaseClicked={() => employeesHire(emp.id)}
						justFailed={emp.work.justFailed}
						tooltipData={
							workdescription +
							(emp.outcomePerSecond || 0).toFixed(2) +
							' per second'
						}
						purchaseText='Hire'
						// employee specific:
						showProgressBar={showProgressBar}
						progressTooFast={emp.currentTimeTaken < 0.9}
						progress={emp.work.progress}
						workRequiredToComplete={
							emp.workRequiredToComplete *
							employeeStatus.workRequiredMultiplier
						}
						paused={emp.work.paused}
						onPauseClicked={() =>
							(emp.work.paused = !emp.work.paused)
						}
						pauseText={pauseText}
						pauseIcon={pauseIcon}
						currentTimeTaken={emp.currentTimeTaken}
					/>
				);
			})}
		</div>
	);
};
export default BoxEmployees;

BoxEmployees.propTypes = {
	employeesUnlocked: PropTypes.array.isRequired,
	employeesCanHire: PropTypes.func.isRequired,
	employeesGetCost: PropTypes.func.isRequired,
	employeesHire: PropTypes.func.isRequired,
	employees: PropTypes.object.isRequired,
};
