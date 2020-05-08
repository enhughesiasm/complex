import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../../../shared/font_awesome';
import jar1t from '../../../../resources/images/jar1transinverted.png';
import FriendlyNumber from '../../../shared/friendly_number';

const OutputIndicator = (props) => (
	<div
		className={
			'outputIndicator ' +
			props.additionalClassName +
			' notification is-size-7 is-paddingless is-marginless is-' +
			props.notificationType
		}>
		<FontAwesome icon='arrow-down' />
		&nbsp;
		{props.text}
		&nbsp;
		{props.amountText && <span>{props.amountText}</span>}
		{!props.amountText && <FriendlyNumber amount={props.amount} />}
		&nbsp;
		{props.icon && <FontAwesome icon={props.icon} />}
		{!props.icon && <img alt='' src={jar1t} width='20' />}
		&nbsp;{props.suffixText}
	</div>
);

export default OutputIndicator;

OutputIndicator.propTypes = {
	text: PropTypes.string.isRequired,
	additionalClassName: PropTypes.string,
	notificationType: PropTypes.string,
	amountText: PropTypes.string,
	suffixText: PropTypes.string,
	icon: PropTypes.string,
	amount: PropTypes.number,
};
