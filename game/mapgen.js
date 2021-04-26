/* global randFloat, randInt */
/* exported generate */


function Level(width, height)
{
	this.width = width;
	this.height = height;

	this.tiles = new Array(height);
	for(let index_row = 0; index_row < height; ++index_row)
		this.tiles[index_row] = new Array(width);

	this.gems = [];
}

Level.prototype.generate = function(density_tile, density_resource)
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
				// border of bedrock
				if(index_row === 0 || index_row === level.height - 1 || index_col === 0 || index_col === level.width - 1)
					level.tiles[index_row][index_col] = -1;
				else
				{
					const num_surrounding = applyFilter(level, index_row, index_col);

					if(num_surrounding > 0.5)
						level.tiles[index_row][index_col] = 1;
					else if(num_surrounding < 0.5)
						level.tiles[index_row][index_col] = 0;
				}
			}

	// list on level for gems
	for(let index_row = 0; index_row < level.height; ++index_row)
		for(let index_col = 0; index_col < level.width; ++index_col)
		{
			if(level.tiles[index_row][index_col] === 1)
				if(randFloat(0, 1) < gem_density)
					level.gems.push({index_col: index_col, index_row: index_row});
		}

	region(level);

	return level;
};


const NUM_SMOOTHPASSES = 3;


// // guassian 5x5
// const FILTER = [
// 	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625],
// 	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
// 	[0.02343750, 0.09375000, 0.14062500, 0.09375000, 0.02343750],
// 	[0.01562500, 0.06250000, 0.09375000, 0.06250000, 0.01562500],
// 	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625]
// ];

const FILTER = [
	[0.00000000, 0.00390625, 0.00781250, 0.00390625, 0.00000000],
	[0.00390625, 0.01562500, 0.02343750, 0.01562500, 0.00390625],
	[0.03125000, 0.12500000, 0.21093750, 0.12500000, 0.03125000],
	[0.01953125, 0.07812500, 0.12500000, 0.07812500, 0.01953125],
	[0.00390625, 0.01953125, 0.03125000, 0.01953125, 0.00390625]
];

function inLevel(level, index_row, index_col)
{
	return index_row >= 0 && index_row < level.height && index_col >= 0 && index_col < level.width;
}

function applyFilter(level, index_row, index_col)
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

			const test = inLevel(level, index_row_test, index_col_test) ? (level.tiles[index_row_test][index_col_test] ? 1 : 0) : 1;
			acc += test*row_filter[index_col_filter];
		}
	}

	return acc;
}

function region(level, index_row_start, index_col_start)
{
	const type = level[index_row_start][index_col_start];
	const queue = [{index_row: index_row_start, index_col: index_col_start}];
	const tiles = [];

	const visited = [];
	for(let index_row = 0; index_row < level.height; ++index_row)
		visited.push(new Array(level.width).fill(false));
	visited[index_row_start][index_col_start] = true;

	while(queue.length > 0)
	{
		const tile = queue.shift();
		tiles.push(tile);

		
	}
	console.log(visited);



	// return tiles;
}


function generate(density, gem_density)
{
	
}