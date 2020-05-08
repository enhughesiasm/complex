import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '../shared/font_awesome';
import FriendlyNumber from '../shared/friendly_number';

export default class ComplexListEntry extends React.Component {
	render() {
		return (
			<div
				key={this.props.id}
				className={
					'card ' +
					(this.props.additionalClass || ' ') +
					(this.props.justFailed ? ' justFailed ' : ' ')
				}>
				<div className={'card-header'}>
					<span
						className={
							'card-header-icon is-size-7 is-size-7-mobile ' +
							(this.props.tooltipData
								? 'tooltip is-tooltip-right is-tooltip-info'
								: '')
						}
						data-tooltip={this.props.tooltipData}>
						<FontAwesome icon={this.props.icon} />
					</span>
					<span
						className={
							'card-header-title is-not-centered is-size-7 is-size-7-mobile'
						}>
						{this.props.name}
					</span>
					{this.props.cost && (
						<span
							className={
								'cost is-size-7 is-size-7-mobile  has-text-weight-bold has-text-centered ' +
								(this.props.favoursAvailable
									? ' available'
									: '')
							}>
							<FriendlyNumber
								amount={this.props.cost}
								direction='top'
								name='Favours'
								icon='thumbs-up'
							/>
						</span>
					)}
				</div>
				<div className='card-content is-size-7-mobile '>
					{this.props.power && (
						<span
							className={
								'power notification is-paddingless is-size-7 is-marginless ' +
								(this.props.power > 0
									? ' is-warning '
									: ' is-light ')
							}>
							<FriendlyNumber
								amount={Math.abs(this.props.power)}
								prefix={this.props.power > 0 ? '+' : '-'}
								icon='bolt'
							/>
						</span>
					)}
					<span className='description is-size-7'>
						{this.props.description}
					</span>
					<div className='buttonContainer'>
						{false && this.props.sellText && (
							<button
								className='button is-small is-light'
								onClick={this.props.onSellClicked}>
								{this.props.sellText}
							</button>
						)}

						<button
							className={
								'button mainButton is-small is-size-7-mobile ' +
								(this.props.canPurchase
									? ' is-success '
									: ' is-danger ') +
								(this.props.buildTooltipText
									? ' tooltip is-tooltip-right is-tooltip-multiline '
									: ' ')
							}
							style={{ opacity: 1 }}
							data-tooltip={this.props.buildTooltipText}
							disabled={!this.props.canPurchase}
							onClick={this.props.onPurchaseClicked}>
							{this.props.purchaseText}
						</button>
					</div>
				</div>
				{this.props.showProgressBar && (
					<div
						className={
							'card-footer ' +
							'tooltip is-tooltip-bottom is-tooltip-info'
						}
						data-tooltip={this.props.tooltipData}>
						{!this.props.paused && (
							<progress
								style={{ height: '0.7rem' }}
								className={
									'progress is-marginless is-' +
									(this.props.progressTooFast
										? 'success'
										: 'primary')
								}
								value={
									this.props.progressTooFast
										? null
										: this.props.progress
								}
								max={this.props.workRequiredToComplete}>
								{this.props.progress}%
							</progress>
						)}
						{this.props.paused && (
							<progress
								style={{ height: '0.7rem' }}
								className={'progress is-marginless is-danger'}
								value={this.props.workRequiredToComplete}
								max={this.props.workRequiredToComplete}>
								{this.props.workRequiredToComplete}%
							</progress>
						)}

						<div
							className={
								'pauseIcon tooltip is-tooltip-info is-tooltip-left ' +
								(this.props.paused
									? 'has-text-danger'
									: 'has-text-info')
							}
							style={{ cursor: 'pointer' }}
							data-tooltip={this.props.pauseText}
							onClick={this.props.onPauseClicked}>
							<FontAwesome icon={this.props.pauseIcon} />
						</div>
					</div>
				)}
			</div>
		);
	}
}

ComplexListEntry.propTypes = {
	id: PropTypes.number.isRequired,
	additionalClass: PropTypes.string,
	justFailed: PropTypes.bool,
	tooltipData: PropTypes.string,
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	cost: PropTypes.number,
	favoursAvailable: PropTypes.bool,
	power: PropTypes.number,
	description: PropTypes.string.isRequired,
	sellText: PropTypes.string,
	onSellClicked: PropTypes.func,
	canPurchase: PropTypes.bool,
	buildTooltipText: PropTypes.string,
	onPurchaseClicked: PropTypes.func,
	purchaseText: PropTypes.string,
	showProgressBar: PropTypes.bool,
	paused: PropTypes.bool,
	progressTooFast: PropTypes.bool,
	progress: PropTypes.number,
	workRequiredToComplete: PropTypes.number,
	pauseText: PropTypes.string,
	onPauseClicked: PropTypes.func,
	pauseIcon: PropTypes.string,
};
