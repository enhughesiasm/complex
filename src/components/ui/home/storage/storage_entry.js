import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import jar1 from './../../../../resources/images/jar1.jpg';
import jar2 from './../../../../resources/images/jar2.jpg';
import jar3 from './../../../../resources/images/jar3.jpg';
import jar4 from './../../../../resources/images/jar4.jpg';
import jar5 from './../../../../resources/images/jar5.jpg';
import EasingFunctions from './../../../shared/easing';

const images = [jar1, jar2, jar3, jar4, jar5];

export default class StorageEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: images[Math.floor(Math.random() * images.length)],
			deliveryTime: moment(),
		};
	}

	render() {
		let heightMaxPx = 40; // defined in complex.scss
		if (this.props.delivered) {
			let fractionSinceDelivered =
				moment().diff(this.state.deliveryTime) /
				this.props.deliveryFadeOutTimeMs;
			heightMaxPx =
				heightMaxPx -
				heightMaxPx *
					EasingFunctions.easeInQuint(fractionSinceDelivered);
		}

		return (
			<>
				<div
					style={{ height: heightMaxPx + 'px' }}
					onClick={() => {
						if (!this.props.delivered) {
							this.setState({ deliveryTime: moment() });
							this.props.onClickDeliver();
						}
					}}
					className={
						'traitBoxEntry ' +
						(this.props.delivered ? 'delivered' : '')
					}>
					<span className='imgContainer'>
						<img src={this.state.image} alt='a jar' />
					</span>
					<span className='traitName'>{this.props.name}</span>
					{!this.props.delivered && (
						<button
							className='button is-success is-rounded is-small is-pulled-right'
							style={{ marginRight: '1rem' }}>
							Deliver
						</button>
					)}
					{this.props.delivered && (
						<button
							className='button is-warning is-rounded is-small is-pulled-right'
							disabled>
							Delivering
						</button>
					)}
				</div>
			</>
		);
	}
}

StorageEntry.propTypes = {
	delivered: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	onClickDeliver: PropTypes.func.isRequired,
	deliveryFadeOutTimeMs: PropTypes.number.isRequired,
};
