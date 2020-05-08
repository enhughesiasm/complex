export function calculateOutcomePerSecond(tickLengthMs, workPerTick, workRequiredToComplete, outcomePerCompletion){
	let ticksPerSecond = 1000.0 / tickLengthMs;
	let workPerSecond = workPerTick * ticksPerSecond;
	let outcomePerSecond = (workPerSecond * 1.0 / workRequiredToComplete) * outcomePerCompletion;
	return outcomePerSecond;
}