import React from 'react';
import PropTypes from 'prop-types';
import BoxProduction from './box_production';
import BoxEmployees from './box_employees';
import BoxUpgrades from './box_upgrades';
import Storage from './storage/storage';

export default class HomeTab extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="tile is-ancestor">
				<div className="tile is-parent is-7 is-6-hd is-vertical">
					<BoxProduction justFailedToMake={this.props.justFailedProduction}
						productionPerClick={this.props.productionPerClick}
						productionTimeToMake={this.props.productionTimeToMake}
						productionProgressPercent={this.props.productionProgressPercent}
					/>
					{ this.props.canShowEmployees &&
						<BoxEmployees employeesUnlocked={this.props.employeesUnlocked}
							employees={this.props.employees}
							employeesCanHire={this.props.employeesCanHire}
							employeesGetCost={this.props.employeesGetCost}
							employeesHire={this.props.employeesHire}

						/>}
					{ this.props.canShowUpgrades &&
						<BoxUpgrades upgradesUnlocked={this.props.upgradesUnlocked}
							upgradesAll={this.props.upgradesAll}
							upgradesCanPurchase={this.props.upgradesCanPurchase}
							upgradesPurchase={this.props.upgradesPurchase}
						/>}
				</div>
				<div className="tile is-parent is-5 is-6-hd">
					<Storage storageCurrentSize={this.props.storageCurrentSize}
						storageIsFull={this.props.storageIsFull}
						storageTraits={this.props.storageTraits}
						storageAmount={this.props.storageAmount}
						storageMax={this.props.storageMax}
						deliveryFadeOutTimeMs={this.props.deliveryFadeOutTimeMs}
					/>
				</div>
			</div>
		);
	}
}

HomeTab.propTypes = {
	justFailedProduction: PropTypes.bool,
	productionPerClick: PropTypes.number.isRequired,
	productionTimeToMake: PropTypes.number.isRequired,
	productionProgressPercent: PropTypes.number.isRequired,

	canShowEmployees: PropTypes.bool.isRequired,
	canShowUpgrades: PropTypes.bool.isRequired,
	employeesUnlocked: PropTypes.array.isRequired,
	employeesCanHire: PropTypes.func.isRequired,
	employeesGetCost: PropTypes.func.isRequired,
	employeesHire: PropTypes.func.isRequired,
	employees: PropTypes.object.isRequired,

	upgradesUnlocked: PropTypes.array.isRequired,
	upgradesAll: PropTypes.array.isRequired,

	upgradesCanPurchase: PropTypes.func.isRequired,
	upgradesPurchase: PropTypes.func.isRequired,

	deliveryFadeOutTimeMs: PropTypes.number.isRequired,
	storageCurrentSize: PropTypes.number.isRequired,
	storageAmount: PropTypes.number.isRequired,
	storageMax: PropTypes.number.isRequired,
	storageIsFull: PropTypes.bool.isRequired,
	storageTraits: PropTypes.array.isRequired,


};