import React from 'react';
import PropTypes from 'prop-types';
import jar1t from '../../../resources/images/jar1transinverted.png';
import HelpText from './../../shared/help_text';
import FontAwesome from '../../shared/font_awesome';

import MassDeliveryButton from './mass_delivery_button';
import FriendlyNumber from '../../shared/friendly_number';

class ComplexNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			burgerActive: false,
		};

		this.toggleBurger = this.toggleBurger.bind(this);

		this.onLinkClicked = this.onLinkClicked.bind(this);
	}

	toggleBurger() {
		let active = !this.state.burgerActive;
		this.setState({ burgerActive: active });
	}

	onLinkClicked() {
		this.setState({ burgerActive: false });
	}

	render() {
		const {
			showMassDeliveryBtn,
			favours,
			canMakeTraits,
			onMakeTraitsClicked,
			totalDelivered,
			producingPerS,
			deliveringPerS,
			upgradesAvailable,
			totalStorageSize,
			bottleNeckedPerSecond,
		} = this.props;

		return (
			<div>
				<nav
					id='complexNav'
					className='navbar is-dark is-bold is-fixed-top'
					role='navigation'
					aria-label='main navigation'>
					<div className='navbar-brand'>
						<a
							href='https://walkingoncustard.com'
							className='navbar-item'
							activeclassname='active'
							target='_blank'
							rel='noopener noreferrer'>
							<div
								onClick={this.onNavLinkClicked}
								className='tooltip is-tooltip-right is-tooltip-info'
								data-tooltip="exit to the developer's homepage">
								<h1
									className='is-size-1 has-text-weight-bold'
									style={{
										fontFamily:
											'"Jost*", "Helvetica Neue", Helvetica, Arial, sans-serif',
									}}>
									🏠
								</h1>
							</div>
						</a>

						<div className='navbar-item is-hidden-desktop'>
							<button
								className='button is-rounded is-small is-success'
								disabled={!canMakeTraits}
								onClick={onMakeTraitsClicked}>
								Make Traits
							</button>
						</div>

						{this.props.totalDelivered > 0 && (
							<div
								className='navbar-item favours is-hidden-desktop'
								activeclassname='active'>
								<span
									className='is-size-7 favourText is-info has-text-weight-bold'
									style={{ marginRight: '1.5rem' }}>
									<FriendlyNumber
										icon='thumbs-up'
										name='Favours'
										amount={this.props.favours || 0}
									/>
								</span>
								<HelpText
									helpKey='favours'
									direction='bottom'
								/>
							</div>
						)}

						<div className='navbar-item is-hidden-desktop has-text-centered massDeliveryItem'>
							{this.props.showMassDeliveryBtn && (
								<MassDeliveryButton
									onPerformMassDelivery={
										this.props.onPerformMassDelivery
									}
								/>
							)}
						</div>
					</div>
					<div
						className={
							'navbar-menu ' +
							(this.state.burgerActive ? 'is-active' : '')
						}>
						<div className='navbar-start' style={{}}>
							<h2>The Supplier&apos;s Complex</h2>
							<div className='navbar-item traitStats is-hidden-mobile is-size-7'>
								{totalDelivered > 10 && (
									<button
										className={
											'button is-small is-rounded is-' +
											(this.props.statsActive
												? 'danger'
												: 'light')
										}
										data-show='quickview'
										data-target='statsView'
										onClick={
											this.props.onToggleStatsActive
										}>
										Statistics
									</button>
								)}
							</div>

							<div
								className='navbar-item upgradesAvailable is-hidden-mobile is-size-7'
								style={{
									overflowWrap: 'break-word',
									maxWidth: '10rem',
								}}>
								{totalDelivered > 10 &&
									upgradesAvailable.length > 0 && (
										<span
											style={{
												padding:
													'0rem 0.5rem 0rem 0.5rem',
											}}
											className={
												'notification is-' +
												(upgradesAvailable.length > 1
													? upgradesAvailable.length >
													  2
														? 'success'
														: 'warning'
													: 'light')
											}>
											Upgrades Available:{' '}
											{upgradesAvailable.length}{' '}
										</span>
									)}
							</div>
						</div>
						<div className='navbar-end is-hidden-mobile'>
							{totalDelivered > 0 && (
								<div
									className='navbar-item successfulDeliveries tooltip is-tooltip-bottom is-tooltip-multiline '
									data-tooltip={
										'Producing: ' +
										producingPerS +
										'/s - ' +
										'Storing: ' +
										totalStorageSize +
										' - Delivering: ' +
										deliveringPerS +
										'/s'
									}
									activeclassname='active'>
									<span className='is-size-7 sdText has-text-weight-bold'>
										<img
											alt='a jar'
											src={jar1t}
											style={{
												width: '25px',
												marginRight: '.3rem',
											}}
										/>
										<FriendlyNumber
											name='Favours'
											amount={bottleNeckedPerSecond}
										/>{' '}
										/s
									</span>
								</div>
							)}

							{totalDelivered > 0 && (
								<div
									className='navbar-item favours is-hidden-mobile'
									activeclassname='active'>
									<span
										className='is-size-7 favourText is-info has-text-weight-bold'
										style={{ marginRight: '1.5rem' }}>
										<FriendlyNumber
											name='Favours'
											amount={favours || 0}
											icon='thumbs-up'
										/>
									</span>
									<HelpText
										helpKey='favours'
										direction='bottom'
									/>
								</div>
							)}
							<div className='navbar-item is-hidden-mobile has-text-centered massDeliveryItem'>
								{showMassDeliveryBtn && (
									<MassDeliveryButton
										onPerformMassDelivery={
											this.props.onPerformMassDelivery
										}
									/>
								)}
								{!showMassDeliveryBtn && (
									<div
										className='hasTextCentered'
										style={{ width: '100%' }}>
										<FontAwesome icon='globe-europe' />
									</div>
								)}
							</div>

							<div className='navbar-item is-hidden-mobile-only'>
								<button
									className='button is-rounded is-size-6 is-success'
									disabled={!this.props.canMakeTraits}
									onClick={this.props.onMakeTraitsClicked}>
									Make Traits
								</button>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default ComplexNav;

ComplexNav.propTypes = {
	showMassDeliveryBtn: PropTypes.bool.isRequired,
	favours: PropTypes.number,
	canMakeTraits: PropTypes.bool.isRequired,
	onMakeTraitsClicked: PropTypes.func.isRequired,
	totalDelivered: PropTypes.number.isRequired,
	producingPerS: PropTypes.number.isRequired,
	deliveringPerS: PropTypes.number.isRequired,
	upgradesAvailable: PropTypes.array.isRequired,
	totalStorageSize: PropTypes.number.isRequired,
	bottleNeckedPerSecond: PropTypes.number.isRequired,
	onPerformMassDelivery: PropTypes.func.isRequired,
	statsActive: PropTypes.bool.isRequired,
	onToggleStatsActive: PropTypes.func.isRequired,
};
