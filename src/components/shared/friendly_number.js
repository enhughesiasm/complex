import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../shared/font_awesome';

const FriendlyNumber = (props) => {
	let orderOfMagnitude = Math.floor(Math.log10(props.amount));
	let suffix = '';
	let dp = 2;

	let amount = props.amount;
	let display = '';
	let afterDp = '';

	if (orderOfMagnitude < 3) {
		if (Number.isInteger(amount)) {
			display = Math.floor(amount).toLocaleString();
		} else {
			display = Number(amount).toFixed(2).toLocaleString();
		}
	} else if (orderOfMagnitude < 6) {
		display = Math.floor(amount).toLocaleString();
	} else {
		// YES THIS IS UGLY AND COULD BE DONE WITH A BIT OF SMART MATHS BUT IT'S LATE AND I JUST WANT IT TO WORK
		switch (orderOfMagnitude) {
			case 6:
				suffix = ' million';
				afterDp = amount.toString().substring(1, 1 + dp);

				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 7:
				suffix = ' million';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}
				break;
			case 8:
				suffix = ' million';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 9:
				suffix = ' billion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 10:
				suffix = ' billion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 11:
				suffix = ' billion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 12:
				suffix = ' trillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 13:
				suffix = ' trillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 14:
				suffix = ' trillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 15:
				suffix = ' quadrillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 16:
				suffix = ' quadrillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 17:
				suffix = ' quadrillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 18:
				suffix = ' quintillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 19:
				suffix = ' quintillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 20:
				suffix = ' quintillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 21:
				suffix = ' sextillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 22:
				suffix = ' sextillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 23:
				suffix = ' sextillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 24:
				suffix = ' septillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 25:
				suffix = ' septillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 26:
				suffix = ' septillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}

				break;
			case 27:
				suffix = ' octillion';
				afterDp = amount.toString().substring(1, 1 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 1) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 1);
				}

				break;
			case 28:
				suffix = ' octillion';
				afterDp = amount.toString().substring(2, 2 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 2) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 2);
				}

				break;
			case 29:
				suffix = ' octillion';
				afterDp = amount.toString().substring(3, 3 + dp);
				if (parseInt(afterDp) != 0) {
					display = amount.toString().substring(0, 3) + '.' + afterDp;
				} else {
					display = amount.toString().substring(0, 3);
				}
				break;
			default:
				suffix = ' gajillion';
				display = amount; // yup this will break but *surely* will never happen ;p
				break;
		}
	}

	let direction = props.direction || 'bottom';

	return (
		<span
			className={
				'is-size-7-mobile ' +
				(props.amount > 999999 ? 'tooltip is-tooltip-' + direction : '')
			}
			data-tooltip={props.amount + (props.name ? ' ' + props.name : '')}>
			{(props.prefix || '') + display + suffix}{' '}
			{props.icon && <FontAwesome icon={props.icon} />}
		</span>
	);
};

export default FriendlyNumber;

FriendlyNumber.propTypes = {
	amount: PropTypes.number,
	direction: PropTypes.string,
	name: PropTypes.string,
	icon: PropTypes.string,
	prefix: PropTypes.string,
};
