import React from 'react';
import PropTypes from 'prop-types';

export default class ComplexPatchNotes extends React.Component {
	componentDidMount() {
		this.props.attachQuickviews();
	}

	render() {
		return (
			<div
				id='quickviewPatchNotes'
				className={
					'patchNotes quickview' +
					(this.props.patchNotesActive ? ' is-active' : '')
				}>
				<header className='quickview-header notification is-danger'>
					<p className='title'>
						things have changed in the prelife...
					</p>
					<span
						className='delete'
						data-dismiss='quickview'
						onClick={this.props.onTogglePatchNotes}></span>
				</header>
				<div className='quickview-body'>
					<div className='quickview-block'>
						<p className='subtitle'>v0.9.2 - 08 May 2020</p>
						<ul>
							<li>moved host</li>
						</ul>
						<p className='subtitle'>v0.9.1 - 14 Nov 2019</p>
						<ul>
							<li>
								tweaked the storage system to better handle
								weird edge cases
							</li>
							<li>
								accepted that all human creations are ultimately
								imperfect
							</li>
						</ul>
						<p className='subtitle'>v0.9.0 - 13 Nov 2019</p>
						<ul>
							<li>
								fixed yet more <s>idiotic</s> subtle bugs
								allowing traits to be double-delivered or missed
							</li>
							<li>
								added thousand separators in various places
								where numbers were getting difficult to read
							</li>
							<li>
								<strong>smoother delivery animations</strong>—no
								more buttons jumping about annoyingly
							</li>
						</ul>
						<p className='subtitle'>v0.2.2 - 1 Nov 2019</p>
						<ul>
							<li>
								added dividers between machine types in the
								machines box for visual clarity
							</li>
							<li>
								added <strong>flexible machinery</strong>{' '}
								upgrade—moves capacity between
								production/delivery as required
							</li>
						</ul>
						<p className='subtitle'>v0.2.1 - 28 Oct 2019</p>
						<ul>
							<li>removed obsolete ability to sell machines</li>
							<li>minor bugfixes</li>
						</ul>
						<hr />
						<p className='subtitle'>v0.2.0 - 26 Oct 2019</p>
						<ul>
							<li>added simple changelog</li>
							<li>
								massive refactoring to support{' '}
								<strong>save/load</strong> and also{' '}
								<strong>fix page reloading exploit</strong> to
								prevent duplicating upgrades
							</li>
							<li>
								employee progress bars are now indeterminate
								when producing super fast, to{' '}
								<strong>
									reduce unnecessary strobe effect
								</strong>
							</li>
							<li>
								storage upgrades now end in a round number for
								extra satisfaction
							</li>
							<li>
								&apos;e&apos; homepage link now opens in a new
								window to prevent accidental loss of progress
							</li>
							<li>
								buffed delivery upgrades &apos;stackable
								crates&apos; and &apos;invent cranes&apos;
							</li>
							<li>
								industrial warehouse now has the actual intended
								size
							</li>
							<li>polished machine descriptions & displays</li>
							<li>
								added tooltips to explain the functionality of
								all upgrades as you buy them
							</li>
							<li>
								improved stats screen; added{' '}
								<strong>
									accurate playtimer (in Earth & prelife time)
								</strong>
								; efficiency stats; machine stats
							</li>
							<li>
								<strong>rebalancing:</strong> tweaked values for
								all production machines and added{' '}
								<strong>Loaders</strong>—exponentially powerful
								delivery machines. Maintaining balance between
								production/delivery should now be smoother and
								more in the player&apos;s control.
							</li>
							<li>
								<strong>rebalancing:</strong> tweaked all early
								game values and upgrades to reduce waiting time
								early on
							</li>
							<li>
								<strong>rebalancing:</strong> added extra late
								game upgrades to further smooth progression
							</li>
							<li>
								fixed subtle bug preventing some traits from
								appearing properly in storage
							</li>
							<li>
								fixed *other* subtle bug allowing small numbers
								of traits to be double-delivered
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ComplexPatchNotes.propTypes = {
	attachQuickviews: PropTypes.func.isRequired,
	patchNotesActive: PropTypes.bool.isRequired,
	onTogglePatchNotes: PropTypes.func.isRequired,
};
