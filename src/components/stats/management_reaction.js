const reactions = {
	three: [ 'impatient', 'irritable', 'anxious', 'testy', 'fretful'],
	six: [ 'intrigued', 'fascinated', 'captivated', 'enthralled', 'charmed', 'curious'],
	nine: [ 'impressed', 'amazed', 'struck', 'excited', 'dazzled'],
	twelve: ['absent', 'missing', 'distracted', 'preoccupied', 'oblivious'],
	fifteen: [ 'tiring', 'weary', 'losing interest', 'becoming bored'],
	eighteen: ['silent']
};

const adverbs_positive = [
	'extremely ', 'very ', 'rather ', 'highly ','particularly ', 'remarkably ', '', '', '', '', ''
];

const adverbs_negative = [
	'oddly ', 'unusually ', 'suspiciously ', 'weirdly ', 'confusingly ', 'curiously ', '','', '', '', ''
];

export function getManagementReaction(totalDelivered){
	let magnitude = Math.floor(Math.log10(totalDelivered));

	let reaction = ' are ';

	let possibles = [];

	let adverb = '';

	if(magnitude < 3){
		possibles = reactions.three;
		adverb = adverbs_positive[Math.floor(Math.random() * adverbs_positive.length)];
	}else if (magnitude < 6){
		possibles = reactions.six;
		// no adverb
	}else if (magnitude < 9){
		possibles = reactions.nine;
		adverb = adverbs_positive[Math.floor(Math.random() * adverbs_positive.length)];
	}else if (magnitude < 12){
		possibles = reactions.twelve;
		adverb = adverbs_negative[Math.floor(Math.random() * adverbs_positive.length)];
	}else if (magnitude < 15){
		adverb = adverbs_negative[Math.floor(Math.random() * adverbs_positive.length)];
		possibles = reactions.fifteen;
	}else if (magnitude < 18){
		possibles = reactions.eighteen;
	}else{
		possibles = reactions.eighteen;
	}

	reaction += adverb;
	reaction += possibles[Math.floor(Math.random() * possibles.length)];

	return reaction;
}