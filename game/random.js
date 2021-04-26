/* exported randFloat, randInt */


function randFloat(min, max)
{
	return min + Math.random()*(max - min);
}

function randInt(min, max)
{
	return Math.floor(randFloat(min, max + 1));
}