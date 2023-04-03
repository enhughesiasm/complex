import React from 'react';
import PropTypes from 'prop-types';
import shopImg from '../../resources/images/shop.jpg';
import shelfImg from '../../resources/images/shelves_bw.jpg';

export default class FirstLoad extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tickLengthMs: 10,
			backgroundX: -210,
			backgroundY: -450,
			YMoveRate: 0.09,
			maxY: -100,
			minY: -650,
			YDirection: 'down',
			shopOpacity: 0,
			shelfOpacity: 1,
			saveData: localStorage.getItem('thesupplierscomplex_save'),
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), this.state.tickLengthMs);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		let newX = this.state.backgroundX + 0;

		let direction = this.state.YDirection;

		let YChange =
			direction === 'down'
				? this.state.YMoveRate * -1
				: this.state.YMoveRate;
		let newY = this.state.backgroundY + YChange; // (this.state.YDirection =='down' ? this.state.YMoveRate : -this.state.YMoveRate);

		if (newY >= this.state.maxY) {
			direction = 'down';
		} else if (newY <= this.state.minY) {
			direction = 'up';
		}

		this.setState({
			backgroundX: newX,
			backgroundY: newY,
			YDirection: direction,
		});
	}

	render() {
		return (
			<div id='complexFirstLoad' className='modal is-active'>
				<div
					className='modal-background has-text-centered'
					style={{ backgroundImage: 'url(' + shelfImg + ')' }}
					onClick={null}>
					<h1
						className='title is-size-5-mobile'
						style={{ marginTop: '0.5rem', marginBottom: '0' }}>
						The Supplier&apos;s Complex
					</h1>
					<p
						className='is-size-5 is-size-6-mobile'
						style={{ marginTop: '.2rem' }}>
						Based on{' '}
						<a
							href='https://walkingoncustard.com/sbl'
							target='_blank'
							rel='noopener noreferrer'>
							The Shop Before Life
						</a>
						, by Neil Hughes
					</p>
				</div>

				<div className='modal-content'>
					<div
						id='firstLoadModal'
						className='notification is-primary has-text-centered is-paddingless'
						style={{ fontFamily: 'Jost*' }}>
						<div
							id='background'
							style={{
								backgroundImage: 'url(' + shopImg + ')',
								padding: '1rem 2rem',
								backgroundPosition:
									this.state.backgroundX +
									'px ' +
									this.state.backgroundY +
									'px',
							}}>
							<p className='is-size-5 is-size-6-mobile has-text-weight-bold'>
								Welcome to the prelife.
							</p>
							<br />
							<p className='is-size-5 is-size-6-mobile'>
								<strong>The Shop Before Life</strong> is the
								magical place where all humans choose who to
								become once they&apos;re born on Earth. And
								Management have asked you to be the Supplier.
							</p>
							<br />
							<p className='is-size-5 is-size-6-mobile'>
								Your job is to make enough human traits to
								supply the Shop.
							</p>
							<br />
							<p className='is-size-5 is-size-6-mobile'>
								Use Favours from Management to grow your
								business from a tiny one-person enterprise to a{' '}
								<strong>
									colossal, chaotic valley-spanning
									megafactory
								</strong>
								.
							</p>
							<br />
							<p className='is-size-5 is-size-6-mobile'>
								Good luck.
							</p>
							<br />
							<p className='is-size-7 is-size-7-mobile is-italic'>
								(Estimated game length: 1—2 hours)
							</p>
							<br />

							{/* /* this.state.saveData && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}> */}

							{this.state.saveData && (
								<div className='buttons is-centered'>
									<button
										className='button is-medium is-rounded is-success'
										onClick={() =>
											this.props.onFirstLoadModalClosed(
												JSON.parse(this.state.saveData)
											)
										}
										style={{ fontFamily: 'Jost*' }}>
										Continue
									</button>
									<button
										className='button is-medium is-rounded is-success'
										onClick={() =>
											this.props.onFirstLoadModalClosed(
												null
											)
										}
										style={{ fontFamily: 'Jost*' }}>
										New Game
									</button>
								</div>
							)}
							{!this.state.saveData && (
								<button
									className='button is-medium is-rounded is-success'
									onClick={() =>
										this.props.onFirstLoadModalClosed(null)
									}
									style={{ fontFamily: 'Jost*' }}>
									I&apos;m ready
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

FirstLoad.propTypes = {
	onFirstLoadModalClosed: PropTypes.func.isRequired,
};
