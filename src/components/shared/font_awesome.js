import React from 'react';
import PropTypes from 'prop-types';

const FontAwesome = (props) => (
	<i className={'fas fa-' + props.icon} style={props.style}></i>
);

export default FontAwesome;

FontAwesome.propTypes = {
	icon: PropTypes.string.isRequired,
	style: PropTypes.object,
};
