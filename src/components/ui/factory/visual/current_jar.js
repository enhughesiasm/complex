import React from 'react';
import PropTypes from 'prop-types';

function getMagnitudeDisplay(magnitude){
	switch ((magnitude)) {
	case 0:
	case 1:
		return '';
	case 2:
	case 3:
		return Math.pow(10, magnitude);
	case 4:
	case 5:
		return Math.pow(10, magnitude - 3) + ' thousand';
	case 6:
	case 7:
	case 8:
		return Math.pow(10, magnitude - 6) + ' million';
	case 9:
	case 10:
	case 11:
		return Math.pow(10, magnitude - 9) + ' billion';
	case 12:
	case 13:
	case 14:
		return Math.pow(10, magnitude - 12) + ' trillion';
	case 15:
	case 16:
	case 17:
		return Math.pow(10, magnitude - 15) + ' quadrillion';
	default:
		return ' zillions';
	}
}

const CurrentJar = (props) => {

	let magnitude = Math.floor(Math.log10(props.amount));

	let display = getMagnitudeDisplay(magnitude);

	return(<div id="currentJarOutput" className="is-size-6">
		{props.jars.length > 0 && <span className="appearingJar" style={{animationDuration: props.jars[0].lifespan + 'ms'}}>
			<img src={props.jars[0].jar} />&nbsp;{props.jars[0].name} { display && <span>x {display}</span> }
		</span>}
	</div>);};

export default CurrentJar;

CurrentJar.propTypes = {
	jars: PropTypes.array.isRequired,
	amount: PropTypes.number.isRequired
};