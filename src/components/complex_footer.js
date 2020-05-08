import React from 'react';
import PropTypes from 'prop-types';
import HelpText from './shared/help_text';

const ComplexFooter = (props) => {
	var currentYear = new Date().getFullYear();

	return (
		<div className='footer is-paddingless is-size-7-mobile '>
			<div
				className='notification footerContents is-dark is-marginless smallPrint content has-text-centered'
				style={{ padding: '.2rem', alignItems: 'center' }}>
				<span>v{props.version}</span>
				<span>
					<button
						class={
							'button ' +
							(props.patchNotesActive ? 'is-danger' : 'is-dark')
						}
						onClick={props.togglePatchNotes}>
						Changelog
					</button>
				</span>
				<span>
					&copy; Neil Hughes 2019
					{currentYear !== 2019 ? '—' + currentYear : ''}
					&nbsp;
					<HelpText helpKey='about' />
				</span>
				<span>
					<a
						className='button is-light is-small'
						target='_blank'
						rel='noopener noreferrer'
						href='https://enhughesiasm.com/sbl'>
						Based on The Shop Before Life
					</a>
				</span>
				<span>
					<a
						className='button is-rounded is-primary is-small'
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.buymeacoffee.com/enhughesiasm'>
						<img
							style={{ width: '12px' }}
							src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
							alt='Buy me a coffee'
						/>
						<span style={{ marginLeft: '10px', fontSize: '12px' }}>
							Buy me a coffee
						</span>
					</a>
				</span>
			</div>
		</div>
	);
};

export default ComplexFooter;

ComplexFooter.propTypes = {
	version: PropTypes.string.isRequired,
	togglePatchNotes: PropTypes.func.isRequired,
};
