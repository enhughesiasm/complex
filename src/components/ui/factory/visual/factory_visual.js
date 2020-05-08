import React from 'react';
import PropTypes from 'prop-types';
import HelpText from '../../../shared/help_text';
import PowerBuildings from './power_buildings';
import StorageBuildings from './storage_buildings';
import ProdBuildings from './prod_buildings';
import moment from 'moment';
import { getTraitName } from './../../../trait_names';
import jar1 from '../../../../resources/images/jar1.jpg';
import jar2 from '../../../../resources/images/jar2.jpg';
import jar3 from '../../../../resources/images/jar3.jpg';
import jar4 from '../../../../resources/images/jar4.jpg';
import jar5 from '../../../../resources/images/jar5.jpg';
import jarMix from '../../../../resources/images/jarmix.jpg';
import DeliveryPeople from './delivery_people';
import CurrentJar from './current_jar';

const jars = [
	jar1,
	jarMix,
	jar2,
	jarMix,
	jar3,
	jarMix,
	jar4,
	jarMix,
	jar5,
	jarMix,
];

function reMap(s, a1, a2, b1, b2) {
	return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
}

export default class FactoryVisual extends React.Component {
	constructor(props) {
		super(props);

		let lifespan = 5 * 10000;

		this.state = {
			jars: [
				{
					name: getTraitName(),
					born: moment(),
					jar: jars[Math.floor(Math.random() * jars.length)],
					lifespan: lifespan,
				},
			],
			jarLifespanMilliseconds: lifespan,
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 500);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		if (this.state.jars.length < 1) {
			let jar = {
				name: getTraitName(),
				born: moment(),
				jar: jars[Math.floor(Math.random() * jars.length)],
				lifespan: this.state.jarLifespanMilliseconds,
			};
			this.setState({ jars: [jar] });
		} else {
			if (
				moment().diff(this.state.jars[0].born) >
				this.state.jarLifespanMilliseconds
			) {
				this.setState({
					jars: [],
				});
			}

			const { builtProdBuildings } = this.props;

			let totalMachineWork = builtProdBuildings
				.map((a) => a.traitsOutputPerSecond)
				.reduce((a, b) => a + b, 0);

			let max = 8000;
			let min = 500;
			let newLifespan = reMap(totalMachineWork, 0, 1000000, max, min);

			newLifespan = Math.min(max, newLifespan);
			newLifespan = Math.max(min, newLifespan);
			this.setState({
				jarLifespanMilliseconds: newLifespan,
			});
		}
	}

	render() {
		const {
			manualWorkers,
			builtProdBuildings,
			builtPowerBuildings,
			builtStorageBuildings,
			powerTotal,
		} = this.props;

		let currentProdWork = manualWorkers.outcomePerSecond;
		let totalMachineWork = builtProdBuildings
			.map((a) => a.traitsOutputPerSecond)
			.reduce((a, b) => a + b, 0);

		let totalOutput = currentProdWork + totalMachineWork;

		return (
			<div id='factoryVisual' className='tile is-child box homeBox'>
				<span className={'subtitle'}>Factory</span>
				<HelpText helpKey='factoryVisual' direction='left' />

				{builtPowerBuildings.length > 0 && (
					<div id='allBuildings'>
						<PowerBuildings
							buildings={builtPowerBuildings}
							totalFactoryPower={powerTotal}
						/>

						<HelpText helpKey='prodBuildings' />
						<ProdBuildings
							storageIsFull={this.props.storageIsFull}
							manualWorkers={manualWorkers}
							buildings={builtProdBuildings}
							onReallocateProdWorker={
								this.props.onReallocateProdWorker
							}
						/>

						<StorageBuildings
							buildings={builtStorageBuildings}
							storageNaturalSize={this.props.storageNaturalSize}
							storageMachineSize={this.props.storageMachineSize}
							storageIsFull={this.props.storageIsFull}
							storageAmount={this.props.storageAmount}
							machineStorageMultiplier={
								this.props.machineStorageMultiplier
							}
						/>

						<DeliveryPeople
							deliverers={this.props.deliverers}
							getOutcomePerSecond={this.props.getOutcomePerSecond}
							builtDeliveryBuildings={
								this.props.builtDeliveryBuildings
							}
						/>

						{totalOutput > 0 && (
							<CurrentJar
								jars={this.state.jars}
								amount={totalOutput}
							/>
						)}
						<div
							className='is-divider'
							data-content='THE SHOP BEFORE LIFE'></div>
					</div>
				)}
			</div>
		);
	}
}

FactoryVisual.propTypes = {
	manualWorkers: PropTypes.object.isRequired,
	deliverers: PropTypes.object.isRequired,

	getOutcomePerSecond: PropTypes.func.isRequired,

	builtProdBuildings: PropTypes.array.isRequired,
	builtDeliveryBuildings: PropTypes.array.isRequired,
	builtPowerBuildings: PropTypes.array.isRequired,
	builtStorageBuildings: PropTypes.array.isRequired,

	powerTotal: PropTypes.number.isRequired,

	storageIsFull: PropTypes.bool.isRequired,
	storageAmount: PropTypes.number.isRequired,

	storageNaturalSize: PropTypes.number.isRequired,
	storageMachineSize: PropTypes.number.isRequired,
	machineStorageMultiplier: PropTypes.number.isRequired,

	onReallocateProdWorker: PropTypes.func.isRequired,
};
