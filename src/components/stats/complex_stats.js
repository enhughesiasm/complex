import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import jarMix from '../../resources/images/jarmix.jpg';
import UpgradesBought from './upgrades_bought';
import FriendlyNumber from '../shared/friendly_number';
import FontAwesome from '../shared/font_awesome';
import HelpText from '../shared/help_text';

export default class ComplexStats extends React.Component {
	componentDidMount() {
		this.props.attachQuickviews();
	}

	render() {
		let timeLived = moment.duration(0);
		if (this.props.totalTimePlayed) {
			timeLived = moment.duration(
				(this.props.totalTimePlayed.asSeconds() *
					0.006 *
					this.props.totalTimePlayed.asMinutes()) /
					1.8,
				'years'
			);
		}

		return (
			<div
				id='statsView'
				className={
					'quickview ' + (this.props.statsActive ? 'is-active' : '')
				}>
				<div className='statsHeader notification is-primary has-text-centered is-flex'>
					<span className='title is-size-4'>Statistics</span>
				</div>

				<div className='quickview-body'>
					<div className='quickview-block has-text-centered'>
						<p>
							<strong>
								<FontAwesome icon={'globe-europe'} /> Time
								Played (Earth):{' '}
							</strong>
							<span>
								{moment
									.utc(
										this.props.totalTimePlayed?.asMilliseconds()
									)
									.format('HH:mm:ss')}{' '}
							</span>
						</p>
						<p>
							<strong>
								<FontAwesome icon={'heartbeat'} /> Time Lived
								(Prelife):{' '}
							</strong>
							<span>{timeLived?.humanize()} </span>
						</p>
						<p>
							<strong>Favours Spent: </strong>{' '}
							<FriendlyNumber amount={this.props.favoursSpent} />
						</p>
						<div className='is-divider' data-content='TRAITS'></div>
						<p>
							<strong>Made: </strong>{' '}
							<FriendlyNumber
								amount={this.props.totalMade || 0}
							/>
						</p>
						<p>
							<strong>Delivered: </strong>{' '}
							<FriendlyNumber
								amount={this.props.totalDelivered || 0}
							/>
						</p>
						<p>
							<HelpText
								helpKey='wastedProduction'
								direction='right'
							/>{' '}
							<strong>Wasted Production: </strong>{' '}
							<FriendlyNumber
								amount={this.props.totalWastedProduction || 0}
							/>
						</p>
						<p>
							<HelpText
								helpKey='wastedDeliveries'
								direction='right'
							/>{' '}
							<strong>Empty Deliveries: </strong>{' '}
							<FriendlyNumber
								amount={this.props.totalWastedDeliveries || 0}
							/>
						</p>
						<p>
							<strong>Production Efficiency: </strong>{' '}
							{(
								(this.props.totalMade * 100) /
								(this.props.totalWastedProduction +
									this.props.totalMade)
							).toFixed(1)}
							%
						</p>
						<p>
							<strong>Delivery Efficiency: </strong>{' '}
							{(
								(this.props.totalDelivered * 100) /
								(this.props.totalWastedDeliveries +
									this.props.totalDelivered)
							).toFixed(1)}
							%
						</p>

						<img alt='' src={jarMix} style={{ width: '40px' }} />
						<div
							className='is-divider'
							data-content='AUTOMATIC'></div>
						<p>
							<strong>Producing </strong>{' '}
							{this.props.producingPerS} traits / second{' '}
						</p>
						<p>
							<strong>Delivering </strong>{' '}
							{this.props.deliveringPerS} traits / second{' '}
						</p>
						<div
							className='is-divider'
							data-content='UPGRADES'></div>
						<UpgradesBought allUpgrades={this.props.allUpgrades} />

						{this.props.areMachinesUnlocked && (
							<div
								className='is-divider'
								data-content='MACHINES'></div>
						)}
						{this.props.areMachinesUnlocked && (
							<p>
								<strong>Invented: </strong>{' '}
								{this.props.machinesUnlockedList.length}{' '}
							</p>
						)}
						{this.props.areMachinesUnlocked && (
							<p>
								<strong>Built: </strong>{' '}
								{this.props.machinesAll
									.map((a) => a.builtAmount || 0)
									.reduce((a, b) => a + b, 0)}
							</p>
						)}
					</div>
				</div>

				<footer className='quickview-footer has-text-centered is-size-7 notification is-primary'>
					<span className='smallprint'>
						Management {this.props.managementReaction}.
					</span>
				</footer>
			</div>
		);
	}
}

ComplexStats.propTypes = {
	attachQuickviews: PropTypes.func,
	totalTimePlayed: PropTypes.object,
	statsActive: PropTypes.bool,
	favoursSpent: PropTypes.number,
	totalMade: PropTypes.number,
	totalDelivered: PropTypes.number,
	totalWastedProduction: PropTypes.number,
	totalWastedDeliveries: PropTypes.number,
	producingPerS: PropTypes.number,
	deliveringPerS: PropTypes.number,
	allUpgrades: PropTypes.array,
	areMachinesUnlocked: PropTypes.bool,
	machinesUnlockedList: PropTypes.array,
	machinesAll: PropTypes.array,
	managementReaction: PropTypes.string,
};
