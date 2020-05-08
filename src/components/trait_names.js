// pos + pref + NEGATIVES = 1
const positiveFraction = .6;
const preferencesFraction = .25;

// additionally:
const adjectiveFraction = 0.75;
const preferenceAdjectiveFraction = 0.25;

const positives = ['Adventurous','Helpful','Affable',	'Humble','Capable',	'Imaginative','Charming', 'Impartial','Confident','Independent','Conscientious',
	'Keen','Cultured',	'Meticulous','Dependable','Observant','Discreet','Optimistic','Dutiful','Persistent','Encouraging'
	,'Precise','Exuberant',	'Reliable','Fair','Sociable','Fearless','Trusting','Gregarious','Valiant','Accessible',
	'Attractive',
	'Intriguing',
	'Loves Cats',
	'Mathematically Skilled',
	'Good with words',
	'Computer Savvy',
	'ecstatic',
	'colossal',
	'intimidating',
	'phenomenal',
	'adores biscuits',
	'addicted to cheese',
	'Active',
	'Adaptable',
	'Admirable',
	'Adventurous',
	'Agreeable',
	'Hopeful',
	'Optimistic',
	'Alert',
	'Legendary',
	'Meaty',
	'Cosmic',
	'People-centric',
	'Amiable',
	'Anticipative',
	'Appreciative',
	'Articulate',
	'Aspiring',
	'Athletic',
	'Attractive',
	'Balanced',
	'Benevolent',
	'Brilliant',
	'Calm',
	'Capable',
	'Captivating',
	'Caring',
	'Challenging',
	'Charismatic',
	'Charming',
	'Cheerful',
	'Clean',
	'Clear-headed',
	'Clever',
	'Colourful',
	'Compassionate',
	'Conciliatory',
	'Confident',
	'Conscientious',
	'Considerate',
	'Constant',
	'Contemplative',
	'Cooperative',
	'Courageous',
	'Courteous',
	'Creative',
	'Cultured',
	'Curious',
	'Daring',
	'Debonair',
	'Decent',
	'Decisive',
	'Dedicated',
	'Deep',
	'Dignified',
	'Directed',
	'Disciplined',
	'Discreet',
	'Dramatic',
	'Dutiful',
	'Dynamic',
	'Earnest',
	'Ebullient',
	'Educated',
	'Efficient',
	'Elegant',
	'Eloquent',
	'Empathetic',
	'Energetic',
	'Enthusiastic',
	'Fair',
	'Exciting',
	'Extraordinary',
	'Far-sighted',
	'Faithful',
	'Lucky',
	'Firm',
	'Flexible',
	'Focussed',
	'Forceful',
	'Forgiving',
	'Forthright',
	'Freethinking',
	'Friendly',
	'Fun-loving',
	'Gallant',
	'Generous',
	'Gentle',
	'Genuine',
	'Good-natured',
	'Gracious',
	'Hardworking',
	'Healthy',
	'Hearty',
	'Helpful',
	'Heroic',
	'High-minded',
	'Honest',
	'Honorable',
	'Humble',
	'Humorous',
	'Idealistic',
	'Imaginative',
	'Impressive',
	'Incisive',
	'Incorruptible',
	'Independent',
	'Individualistic',
	'Innovative',
	'Inoffensive',
	'Insightful',
	'Insouciant',
	'Intelligent',
	'Intuitive',
	'Invulnerable',
	'Kind',
	'Filled with Knowledge',
	'Leaderly',
	'Leisurely',
	'Liberal',
	'Logical',
	'Lovable',
	'Loyal',
	'Lyrical',
	'Magnanimous',
	'Many-sided',
	'Mature',
	'Methodical',
	'Meticulous',
	'Moderate',
	'Modest',
	'Multi-leveled',
	'Neat',
	'Anti-authoritarian',
	'Objective',
	'Observant',
	'Open',
	'Optimistic',
	'Orderly',
	'Organised',
	'Original',
	'Painstaking',
	'Passionate',
	'Patient',
	'Patriotic',
	'Peaceful',
	'Perceptive',
	'Perfectionist',
	'Personable',
	'Persuasive',
	'Planful',
	'Playful',
	'Polished',
	'Popular',
	'Practical',
	'Precise',
	'Principled',
	'Profound',
	'Protean',
	'Protective',
	'Providential',
	'Prudent',
	'Punctual',
	'Purposeful',
	'Rational',
	'Realistic',
	'Reflective',
	'Relaxed',
	'Reliable',
	'Resourceful',
	'Respectful',
	'Responsible',
	'Responsive',
	'Reverential',
	'Romantic',
	'Rustic',
	'Sage',
	'Scholarly',
	'Scrupulous',
	'Secure',
	'Selfless',
	'Self-critical',
	'Self-defacing',
	'Self-denying',
	'Self-reliant',
	'Self-sufficent',
	'Sensitive',
	'Sentimental',
	'Seraphic',
	'Serious',
	'Sexy',
	'Shrewd',
	'Simple',
	'Skillful',
	'Sober',
	'Sociable',
	'Solid',
	'Sophisticated',
	'Spontaneous',
	'Sporting',
	'Stable',
	'Steadfast',
	'Steady',
	'Stoic',
	'Strong',
	'Studious',
	'Suave',
	'Subtle',
	'Sweet',
	'Sympathetic',
	'Systematic',
	'Tasteful',
	'Teacherly',
	'Thorough',
	'Tidy',
	'Tolerant',
	'Tractable',
	'Trusting',
	'Uncomplaining',
	'Understanding',
	'Undogmatic',
	'Late',
	'Upright',
	'Urbane',
	'Venturesome',
	'Vivacious',
	'Warm',
	'Well-bred',
	'Well-read',
	'Well-rounded',
	'Winning',
	'Wise',
	'Witty',
	'Youthful',
	'Absentminded',
	'Aggressive',
	'Ambitious',
	'Amusing',
	'Artful',
	'Ascetic',
	'Authoritarian',
	'Big-thinking',
	'Breezy',
	'Businesslike',
	'Busy',
	'Casual',
	'Cerebral',
	'Chummy',
	'Circumspect',
	'Competitive',
	'Complex',
	'Confidential',
	'Conservative',
	'Contradictory',
	'Crisp',
	'Cute',
	'Deceptive',
	'Determined',
	'Dominating',
	'Dreamy',
	'Driving',
	'Droll',
	'Dry',
	'Earthy',
	'Emotional',
	'Enigmatic',
	'Experimental',
	'Familial',
	'Folksy',
	'Formal',
	'Freewheeling',
	'Frugal',
	'Glamorous',
	'Guileless',
	'High-spirited',
	'Hurried',
	'Hypnotic',
	'Iconoclastic',
	'Idiosyncratic',
	'Impassive',
	'Impersonal',
	'Impressionable',
	'Intense',
	'Invisible',
	'Irreligious',
	'Irreverent',
	'Maternal',
	'Mellow',
	'Modern',
	'Moralistic',
	'Mystical',
	'Neutral',
	'Noncommittal',
	'Noncompetitive',
	'Obedient',
	'Old-fashioned',
	'Ordinary',
	'Outspoken',
	'Paternalistic',
	'Physical',
	'Placid',
	'Political',
	'Predictable',
	'Preoccupied',
	'Private',
	'Progressive',
	'Proud',
	'Pure',
	'Questioning',
	'Quiet',
	'Religious',
	'Reserved',
	'Restrained',
	'Retiring',
	'Sarcastic',
	'Self-conscious',
	'Sensual',
	'Skeptical',
	'Smooth',
	'Soft',
	'Solemn',
	'Solitary',
	'Stern',
	'Stolid',
	'Strict',
	'Stubborn',
	'Stylish',
	'Subjective',
	'Surprising',
	'Soft',
	'Tough',
	'Unaggressive',
	'Unambitious',
	'Unceremonious',
	'Unchanging',
	'Undemanding',
	'Unfathomable',
	'Unhurried',
	'Uninhibited',
	'Unpatriotic',
	'Unpredictable',
	'Unsentimental',
	'Whimsical',];

const negatives = [
	'Abrasive',
	'Abrupt',
	'Aimless',
	'Airy',
	'Aloof',
	'Amoral',
	'Angry',
	'Anxious',
	'Apathetic',
	'Arbitrary',
	'Argumentative',
	'Arrogant',
	'Artificial',
	'Asocial',
	'Assertive',
	'Astigmatic',
	'Barbaric',
	'Bewildered',
	'Bizarre',
	'Bland',
	'Blunt',
	'Boisterous',
	'Brittle',
	'Brutal',
	'Calculating',
	'Callous',
	'Cantankerous',
	'Careless',
	'Cautious',
	'Charmless',
	'Childish',
	'Clumsy',
	'Coarse',
	'Cold',
	'Colourless',
	'Complacent',
	'Compulsive',
	'Conceited',
	'Condemnatory',
	'Conformist',
	'Confused',
	'Contemptible',
	'Conventional',
	'Cowardly',
	'Crafty',
	'Crass',
	'Crazy',
	'Criminal',
	'Critical',
	'Crude',
	'Cruel',
	'Cynical',
	'Decadent',
	'Deceitful',
	'Delicate',
	'Demanding',
	'Dependent',
	'Desperate',
	'Destructive',
	'Devious',
	'Difficult',
	'Dirty',
	'Disconcerting',
	'Discontented',
	'Discouraging',
	'Discourteous',
	'Dishonest',
	'Disloyal',
	'Disobedient',
	'Disorderly',
	'Disorganised',
	'Disrespectful',
	'Disruptive',
	'Distractible',
	'Disturbing',
	'Dogmatic',
	'Domineering',
	'Dull',
	'Discouraged',
	'Egocentric',
	'Envious',
	'Erratic',
	'Escapist',
	'Excitable',
	'Extravagant',
	'Extreme',
	'Faithless',
	'False',
	'Fanatical',
	'Fanciful',
	'Fatalistic',
	'Fawning',
	'Fearful',
	'Fickle',
	'Fiery',
	'Fixed',
	'Flamboyant',
	'Foolish',
	'Forgetful',
	'Fraudulent',
	'Frightening',
	'Frivolous',
	'Gloomy',
	'Graceless',
	'Grand',
	'Greedy',
	'Grim',
	'Gullible',
	'Hateful',
	'Haughty',
	'Hedonistic',
	'Hesitant',
	'High-handed',
	'Hostile',
	'Ignorant',
	'Imitative',
	'Impatient',
	'Impractical',
	'Impudent',
	'Impulsive',
	'Inconsiderate',
	'Incurious',
	'Indecisive',
	'Indulgent',
	'Inert',
	'Inhibited',
	'Insecure',
	'Insensitive',
	'Insincere',
	'Insulting',
	'Intolerant',
	'Irascible',
	'Irrational',
	'Irresponsible',
	'Irritable',
	'Lazy',
	'Libidinous',
	'Loquacious',
	'Malicious',
	'Mannered',
	'Mannerless',
	'Mawkish',
	'Mealy-mouthed',
	'Mechanical',
	'Meddlesome',
	'Melancholic',
	'Messy',
	'Miserable',
	'Miserly',
	'Misguided',
	'Mistaken',
	'Monstrous',
	'Moody',
	'Morbid',
	'Muddle-headed',
	'Naive',
	'Narcissistic',
	'Narrow',
	'Narrow-minded',
	'Negative',
	'Neglectful',
	'Neurotic',
	'Nihilistic',
	'Obnoxious',
	'Obsessive',
	'Obvious',
	'Odd',
	'Offhanded',
	'One-dimensional',
	'One-sided',
	'Opinionated',
	'Opportunistic',
	'Oppressed',
	'Outrageous',
	'Overimaginative',
	'Paranoid',
	'Passive',
	'Pedantic',
	'Perverse',
	'Petty',
	'Phlegmatic',
	'Plodding',
	'Pompous',
	'Possessive',
	'Power-hungry',
	'Predatory',
	'Prejudiced',
	'Presumptuous',
	'Pretentious',
	'Prim',
	'Procrastinating',
	'Provocative',
	'Puritanical',
	'Quirky',
	'Reactionary',
	'Reactive',
	'Regimental',
	'Regretful',
	'Repentant',
	'Repressed',
	'Resentful',
	'Ridiculous',
	'Rigid',
	'Ritualistic',
	'Rowdy',
	'Ruined',
	'Sadistic',
	'Sanctimonious',
	'Scheming',
	'Scornful',
	'Secretive',
	'Sedentary',
	'Selfish',
	'Self-indulgent',
	'Shallow',
	'Shortsighted',
	'Shy',
	'Silly',
	'Single-minded',
	'Sloppy',
	'Slow',
	'Sly',
	'Small-thinking',
	'Softheaded',
	'Sordid',
	'Steely',
	'Stiff',
	'Strong-willed',
	'Stupid',
	'Submissive',
	'Superficial',
	'Superstitious',
	'Suspicious',
	'Tactless',
	'Tasteless',
	'Tense',
	'Thievish',
	'Thoughtless',
	'Timid',
	'Transparent',
	'Treacherous',
	'Trendy',
	'Troublesome',
	'Unappreciative',
	'Uncaring',
	'Uncharitable',
	'Unconvincing',
	'Uncooperative',
	'Uncreative',
	'Uncritical',
	'Undisciplined',
	'Unfriendly',
	'Ungrateful',
	'Hopeful',
	'Unimaginative',
	'Unimpressive',
	'Unpolished',
	'Unprincipled',
	'Unrealistic',
	'Unreflective',
	'Unreliable',
	'Unrestrained',
	'Stable,',
	'Scientific',
	'Vacuous',
	'Vague',
	'Venomous',
	'Vindictive',
	'Vulnerable',
	'Weak',
	'Weak-willed',
	'Well-meaning',
	'Willful',
	'Wishful',
	'Zany',
	'Happy-go-lucky'
];

const preferenceVerbs = ['Likes ',  'Allergic to ', 'Addicted to ', 'Hates ', 'Prefers ', 'Quite likes ',
	'Adores ', 'Resists ', 'Avoids ', 'Pleased by ', 'Repulsed by ', 'Despises ', 'Craves ',
	'Fascinated by ', 'Intrigued by ', 'Curious about ', 'Studies ',
	'Thinks of ', 'Dreams of ', 'Often Googles ', 'Fan of ', 'Admires ', 'Cherishes ', 'Loathes ', 'Shuns ', 'Yearns for ', 'Desires ',
	'Longs for ', 'Hungers for ', 'Wants ', 'Seeks ',
	'Neutral about ', 'Doesn\'t care for ', 'Indifferent to ', 'Talks about ', 'Obsessed with ',
	'Interested in ', 'Believes in ', 'Hopes for ', 'Wishes for '];

const nouns = ['cows', 'soap operas', 'reality tv', 'documentaries',
	'jokes', 'bad jokes', 'comedy', 'depth perception', 'scuba diving', 'hair',
	'parties', 'mountains', 'dancing', 'running', 'mints', 'buttons',
	'shoes', 'clothes', 'makeup', 'gloves', 'magic', 'the environment', 'growth', 'kittens', 'bees', 'markets',
	'learning', 'education', 'teaching', 'mathematics', 'chemistry', 'guitars',
	'languages', 'painting','drawing','thinking', 'lighting',
	'jungles', 'forests', 'deserts', 'beaches', 'pies', 'dessert',
	'elephants', 'mice', 'badgers', 'parkour', 'aardvarks', 'pizza',
	'hippos', 'food', 'shopping', 'the news',
	'singing','songs', 'music','gymnastics', 'climbing',
	'athletics', 'meditating',
	'social media', 'sightseeing', 'travelling', 'writing', 'bathing',
	'accountancy', 'the law', 'zoos', 'theme parks',
	'museums', 'art galleries', 'hugging', 'shaking hands', 'talking', 'new people', 'speaking', 'performing',
	'meetings', 'committees', 'coffee', 'hamsters', 'swimming',
	'running', 'walking','stretching','sneezing','coughing',
	'armadillos','lions', 'crocodiles', 'rams', 'chickens', 'contests', 'ants', 'insects', 'gerbils', 'moles',
	'pirates', 'water parks', 'cartoons', 'diving', 'the olympics', 'skincare', 'showering', 'old movies',
	'snakes', 'peace', 'conflict', 'bananas', 'cookies', 'noodles', 'cheesy music', 'tv quizzes', 'round things',
	'straight lines', 'abstract art', 'abstract concepts', 'philosophy', 'long books', 'easy things', 'challenges',
	'dares', 'truth or dare', 'daydreaming', 'telling stories', 'composing music', 'building', 'engineering',
	'truthfulness', 'clowns', 'airports', 'train stations', 'caves', 'furniture', 'camping', 'rabbits',
	'vegetables', 'fruit', 'apples', 'work',  'leisure', 'carpentry',
	'pasta', 'cheese', 'burgers', 'animals', 'dogs', 'cats', 'ducks', 'frogs', 'birds', 'maps',
	'meat', 'music', 'people', 'history', 'geography', 'science',
	'biology', 'clouds', 'water','oceans', 'tomatoes', 'potatoes', 'teapots', 'dry food', 'hot food', 'cold food', 'sushi',
	'television','boats', 'trains','friendship', 'houses', 'cities',
	'the countryside', 'pubs', 'competition', 'acknowledgement', 'recognition', 'salad', 'property',
	'restaurants', 'tea', 'snacks', 'gardens', 'cars','horses',
	'goats','tricyles','birds','knowledge','power','computers','art',
	'libraries','parks','movies','relationships','fish','politics',
	'eggs','lettuce','sheep','trees','plants', 'seeds', 'flowers','football',
	'sports','rugby','cricket','basketball','love','books','games', 'cider', 'grapes'];

const adjectives = [
	'Intrinsically ', 'Masterfully ', 'Expertly ', 'Adeptly ', 'Keenly ', 'Enthusiastically ', 'Uniquely ', 'Exceedingly ', 'Notably ',
	'Outstandingly ', 'Surprisingly ', 'Very ', 'Extremely ', 'Rather ', 'Partly ', 'Sort of ', 'Hardly ', 'A bit ',
	'A little ', 'Really ', 'Truly ', 'Somewhat ',  'Just ', 'Merely ', 'A touch of ', 'Always ', 'Remarkably ',
	'Amazingly ', 'Exceptionally ', 'Unusually ', 'Incredibly ', 'Particularly ', 'Terribly ', 'Totally ', 'Utterly ',
	'Completely ', 'Absolutely ', 'Quite ', 'Fantastically ', 'Intriguingly ', 'Dangerously ', 'Dreadfully ', 'Seriously ','Highly ',
	'Bitterly ', 'Cautiously ', 'Actually ', 'Deeply ', 'Absolutely ', 'Slightly ', 'Marginally ',
	'Worryingly ', 'Concerningly ', 'Inspirationally '
];

function getAdjective(fraction){
	return (Math.random() < fraction ?	adjectives[Math.floor(Math.random() * adjectives.length)]
		: '');
}

export function getTraitName(){

	let x = Math.random();
	let trait = 'NEUTRAL';
	if(x < positiveFraction){
		trait = getAdjective(adjectiveFraction) + positives[Math.floor(Math.random() * positives.length)];
	}else if (x < positiveFraction + preferencesFraction){
		trait = getAdjective(preferenceAdjectiveFraction) + preferenceVerbs[Math.floor(Math.random() * preferenceVerbs.length)]
				+ nouns[Math.floor(Math.random() * nouns.length)];
	}else{
		trait = getAdjective(adjectiveFraction) + negatives[Math.floor(Math.random() * negatives.length)];
	}

	return trait;
}