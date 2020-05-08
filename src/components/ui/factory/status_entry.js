import React from 'react';
import PropTypes from 'prop-types';
import HelpText from '../../shared/help_text';
import FontAwesome from '../../shared/font_awesome';

export default class StatusEntry extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className={
					'statusEntry notification is-paddingless is-' +
					this.props.notificationType +
					(this.props.additionalClass || ' ')
				}>
				<FontAwesome icon={this.props.icon} />
				<span className='is-size-7 has-text-weight-bold'>
					{this.props.text}
				</span>
				<HelpText helpKey={this.props.helpKey} direction='right' />

				{this.props.showProgressBar && (
					<div
						className={
							'card-footer ' +
							'tooltip is-tooltip-bottom is-tooltip-info'
						}
						data-tooltip={
							(this.props.currentTimeTaken || 0).toFixed(2) +
							' seconds'
						}>
						<progress
							className='progress is-marginless is-primary'
							value={this.props.progress}
							max={this.props.workRequiredToComplete}>
							{this.props.workRequiredToComplete}%
						</progress>
					</div>
				)}
			</div>
		);
	}
}

StatusEntry.propTypes = {
	showProgressBar: PropTypes.bool,
	progress: PropTypes.number,

	currentTimeTaken: PropTypes.number,
	workRequiredToComplete: PropTypes.number,

	text: PropTypes.string,
	icon: PropTypes.string,
	additionalClass: PropTypes.string,
	notificationType: PropTypes.string,
	helpKey: PropTypes.string,
};
