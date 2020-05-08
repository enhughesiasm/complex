import React from 'react';
import PropTypes from 'prop-types';
import HelpText from '../../shared/help_text';

const BoxProduction = (props) =><div style={{maxHeight:'4rem', minHeight:'4rem'}}
	className={'tile is-child homeBox box production ' + (props.justFailedToMake ? 'justFailed' : '')}>
	<HelpText helpKey={'production'} direction="left"/>
	<span className={'subtitle is-size-6-mobile is-hidden-touch ' + (props.justFailedToMake ? 'justFailed' : '')}>PRODUCTION (Make {props.productionPerClick} in {props.productionTimeToMake} seconds)</span>
	<span className={'subtitle is-size-6-mobile is-hidden-desktop ' + (props.justFailedToMake ? 'justFailed' : '')}>PRODUCTION</span>
	<div className='progressContainer'>
		<progress className="progress is-primary" value={props.productionProgressPercent} max="100">{props.productionProgressPercent}%</progress>
	</div>
</div>;

export default BoxProduction;

BoxProduction.propTypes = {
	justFailedToMake: PropTypes.bool,
	productionPerClick: PropTypes.number.isRequired,
	productionTimeToMake: PropTypes.number.isRequired,
	productionProgressPercent: PropTypes.number.isRequired,

};