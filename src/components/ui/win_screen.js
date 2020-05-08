import React from 'react';
import PropTypes from 'prop-types';
import shopImg from '../../resources/images/shop.jpg';
import moment from 'moment';
import { submitToAnalytics } from '../shared/functions';

export default class WinScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tickLengthMs: 10,
			backgroundX: -350,
			backgroundY: -500,
			YMoveRate: 0,
			maxY: -100,
			minY: -1000,
			YDirection: 'down',
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), this.state.tickLengthMs);
		let seconds = Math.floor(
			Number.parseFloat(this.props.gameWinTime?.asSeconds())
		);
		submitToAnalytics('win', 'complex', 'time_seconds', seconds);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		let newX = this.state.backgroundX + 0;

		let direction = this.state.YDirection;

		let YChange =
			direction == 'down'
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
		const { gameWinTime } = this.props;

		let timeLived = moment.duration(0);

		if (gameWinTime) {
			timeLived = moment.duration(
				(gameWinTime.asSeconds() * 0.006 * gameWinTime.asMinutes()) /
					1.8,
				'years'
			);
		}

		return (
			<div className='modal is-active'>
				<div
					className='modal-background'
					style={{
						backgroundImage: 'url(' + shopImg + ')',
						backgroundRepeat: 'no-repeat',
						backgroundPositionY: -700 + 'px',
						backgroundSize: 'cover',
					}}></div>
				{/* <div className="pyro is-fixed-top" >
				<div className="before"></div>
				<div className="after"></div>
			</div> */}
				<div className='modal-content'>
					<div
						id='winScreenModal'
						style={{
							background: 'linear-gradient(#777, #8D516A) ',
						}}
						className='notification is-primary has-text-centered'>
						<button
							className='delete'
							onClick={this.props.onWinScreenClosed}>
							x
						</button>

						<h1 className='is-size-5 is-size-6-mobile has-text-weight-bold'>
							So, this is Earth...
						</h1>
						<br />
						<p className='is-size-5 is-size-6-mobile'>
							It took you roughly {gameWinTime.humanize()}—
							<strong>
								{moment
									.utc(gameWinTime?.asMilliseconds())
									.format('HH:mm:ss')}
							</strong>{' '}
							exactly—of Earth time to gather the courage to leave
							the Complex behind and see what &quot;life&quot; is
							all about.
						</p>
						<br />
						<p className='is-size-6 is-size-7-mobile'>
							(In the process, you spent {timeLived.humanize()} in
							the prelife.)
						</p>
						<br />
						<p className='is-size-6  is-size-7-mobile'>
							You left behind quite a mess of construction, but at
							least the Shop is always going to be well-supplied
							with traits.
						</p>
						<br />
						<p className='is-size-6  is-size-7-mobile'>
							Maybe you&apos;ll miss the factory you spent so long
							building... but after all these centuries, a new
							adventure beckons.
						</p>
						<hr />
						<p className='is-size-6 is-size-7-mobile'>
							Thanks for playing! I hope you had fun.
						</p>
						<br />
						<p className='is-size-6 is-size-7-mobile'>
							If you&apos;d like to say hi, please do:{' '}
							<strong>complex@walkingoncustard.com</strong>
						</p>
						<br />
						<p>
							<a
								href='https://enhughesiasm.com/sbl'
								target='_blank'
								rel='noopener noreferrer'>
								<button className='button is-size-6-mobile is-medium is-success'>
									You can explore the prelife further in
									&apos;The Shop Before Life&apos;
								</button>
							</a>
						</p>
						<p>
							<button
								className='button is-medium  is-size-6-mobile is-info'
								onClick={this.props.onWinScreenClosed}>
								Or return to the Factory
							</button>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

WinScreen.propTypes = {
	gameWinTime: PropTypes.object.isRequired,
	onWinScreenClosed: PropTypes.func.isRequired,
};
