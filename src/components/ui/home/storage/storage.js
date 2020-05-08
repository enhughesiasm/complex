import React from 'react';
import PropTypes from 'prop-types';
import StorageEntry from './storage_entry';
import HelpText from '../../../shared/help_text';
import FriendlyNumber from '../../../shared/friendly_number';

const Storage = ({storageCurrentSize, storageIsFull, storageTraits, storageAmount, storageMax, deliveryFadeOutTimeMs}) => {

	let dp = Math.floor(Math.log10(storageCurrentSize)) + 1;

	return(<div className={'tile is-child homeBox box traitBox ' +(storageIsFull ? ' full' : '') }>
		<HelpText helpKey="storage" direction="left"/>
		<span className={'subtitle is-size-6-mobile ' + (storageIsFull ? ' full' : '') }>Storage ({storageAmount.toLocaleString().padStart(dp, '0')} / {storageCurrentSize.toLocaleString()}) {storageIsFull ? ' - Full' : ''}</span>

		{
			storageTraits && storageTraits.map((trait) => <StorageEntry key={trait.id} name={trait.name} delivered={trait.delivered} onClickDeliver={trait.deliver} deliveryFadeOutTimeMs={deliveryFadeOutTimeMs}/>)
		}


		{ (storageAmount - storageMax > 1 || storageCurrentSize >= 2000) && <div className="has-text-centered is-size-7" style={{    marginTop: '.7rem'}}>
			<em>(& <FriendlyNumber amount={ Math.max(storageAmount - storageMax, 0) }/> more...)</em>
		</div> }


	</div>);

};

export default Storage;

Storage.propTypes = {
	storageCurrentSize: PropTypes.number.isRequired,
	storageIsFull: PropTypes.bool.isRequired,
	storageTraits: PropTypes.array.isRequired,
	storageAmount: PropTypes.number.isRequired,
	storageMax: PropTypes.number,
	deliveryFadeOutTimeMs: PropTypes.number.isRequired
};