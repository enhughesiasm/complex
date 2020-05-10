import React from 'react';
import PropTypes from 'prop-types';

const texts = {
	complex:
		'The Supplier creates and delivers human traits to the Shop Before Life',
	favours:
		'Earn Favours from Management and spend them to improve your business',
	production: 'Make traits by your own hand, and with your own tools.',
	employees:
		'You can hire people to help make traits, perform deliveries, and build your factory.',
	upgrades:
		'Research technology to make your factory bigger, better and faster.',
	storage: 'This is where you keep your traits. Try not to run out of space!',
	factory:
		'Your builders can build machines to industrialise your trait production, delivery and storage. Be careful—the machines use electricity.',
	tabs: 'You can now switch between your home & your factory.',
	machines:
		'Build machines to help you create and store traits. They might get out of control pretty fast...',
	buildqueue: "These are the machines you're planning to build.",
	factoryVisual:
		"It's a mess. A beautiful, beautiful mess. Hover over any part for more detailed information.",
	workers:
		'Your workers can either make traits by hand, or use your fancy new machines.',
	power: 'All this machinery requires power!',
	builders: "Factories don't just build themselves.",
	about:
		'This is a quick, messy project I threw together in a few days, just for fun. (And I wanted to play a bit more in the world of the prelife.) If you like it, or have any comments, or just want to say hi, get in touch via complex@walkingoncustard.com :) Thanks for playing!',
	prodBuildings:
		'Your workers can either make traits manually or via machine. Click on them to reassign from one to the other.',
	wastedProduction: 'Full storage.', // has to be short
	wastedDeliveries: 'Empty storage.', // has to be short,
	flexibleMachinery:
		'Your machines can be repurposed to provide more production or delivery capacity.',
};

const HelpText = (props) => (
	<span
		className={
			'helpText is-hidden-mobile ' +
			props.helpKey +
			' tooltip is-tooltip-primary is-tooltip-multiline is-tooltip-' +
			(props.direction ? props.direction : 'top') +
			' is-tooltip-multiline ' +
			(props.additionalClassName || '')
		}
		data-tooltip={
			texts[props.helpKey]
				? texts[props.helpKey]
				: 'Missing key: ' + props.helpKey
		}>
		<i className='fas fa-question-circle' />
	</span>
);

export default HelpText;

HelpText.propTypes = {
	helpKey: PropTypes.string.isRequired,
	direction: PropTypes.string,
	additionalClassName: PropTypes.string,
};
