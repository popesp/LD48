const NUM_SMOOTHPASSES = 2;


function randFloat(min, max)
{
	return min + Math.random()*(max - min);
}

function randInt(min, max)
{
	return Math.floor(randFloat(min, max + 1));
}


// guassian 5x5
const FILTER = [
	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625],
	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
	[0.02343750, 0.09375000, 0.14062500, 0.09375000, 0.02343750],
	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625]
];

// // guassian 5x5
// const FILTER = [
// 	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625],
// 	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
// 	[0.02343750, 0.09375000, 0.14062500, 0.09375000, 0.02343750],
// 	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
// 	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625]
// ];

function countSurrounding(level, index_row, index_col)
{
	const xmin_filter = Math.floor(FILTER[0].length/2);
	const ymin_filter = Math.floor(FILTER.length/2);

	let acc = 0;
	for(let index_row_filter = 0; index_row_filter < FILTER.length; ++index_row_filter)
	{
		const row_filter = FILTER[index_row_filter];

		for(let index_col_filter = 0; index_col_filter < row_filter.length; ++index_col_filter)
		{
			const index_row_test = index_row + index_row_filter - ymin_filter;
			const index_col_test = index_col + index_col_filter - xmin_filter;

			const test = (index_row_test < 0 || index_row_test >= level.height || index_col_test < 0 || index_col_test >= level.width) ? 1 : level.tiles[index_row_test][index_col_test]
			acc += test*row_filter[index_col_filter];
		}
	}

	return acc;
}


function generate(density, gem_density)
{
	const level = {
		width: randInt(40, 80),
		height: randInt(100, 140),
		tiles: [],
		density: density,
		gems: []
	};

	for(let index_row = 0; index_row < level.height; ++index_row)
	{
		const row = [];
		for(let index_col = 0; index_col < level.width; ++index_col)
			row.push(randFloat(0, 1) < density ? 1 : 0);

		level.tiles.push(row);
	}


	for(let index_pass = 0; index_pass < NUM_SMOOTHPASSES; ++index_pass)
		for(let index_row = 0; index_row < level.height; ++index_row)
			for(let index_col = 0; index_col < level.width; ++index_col)
			{
				const num_surrounding = countSurrounding(level, index_row, index_col);

				if(num_surrounding > 0.5)
					level.tiles[index_row][index_col] = 1;
				else if(num_surrounding < 0.5)
					level.tiles[index_row][index_col] = 0;
			}

	//list on level for gems
	for(let index_row = 0; index_row < level.height; ++index_row)
		for(let index_col = 0; index_col < level.width; ++index_col)
		{
			if(level.tiles[index_row][index_col] === 1)
				if(randFloat(0, 1) < gem_density)
					level.gems.push({index_col: index_col, index_row: index_row});
		}

	return level;
}