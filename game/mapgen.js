/* global randFloat, randInt*/
/* exported generate */


const NUM_SMOOTHPASSES = 3;
const NUM_MAINCAVERNS = 3;
const NUM_DOORCANDIDATES = 20;


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

function Level(width, height)
{
	this.width = width;
	this.height = height;

	this.tiles = new Array(height);
	for(let index_row = 0; index_row < height; ++index_row)
		this.tiles[index_row] = new Array(width);
}

Level.prototype.inbounds = function(index_row, index_col)
{
	return index_row >= 0 && index_row < this.height && index_col >= 0 && index_col < this.width;
};

Level.prototype.filter = function(index_row, index_col)
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

			const test = this.inbounds(index_row_test, index_col_test) ? (this.tiles[index_row_test][index_col_test] ? 1 : 0) : 1;
			acc += test*row_filter[index_col_filter];
		}
	}

	return acc;
};

Level.prototype.region = function(index_row_start, index_col_start, visited)
{
	const type = this.tiles[index_row_start][index_col_start];
	const queue = [{index_row: index_row_start, index_col: index_col_start}];
	const level = this;
	const coords = [];

	visited[index_row_start][index_col_start] = true;

	function testcoord(index_row, index_col)
	{
		if(level.tiles[index_row][index_col] === type && level.inbounds(index_row, index_col) && !visited[index_row][index_col])
		{
			visited[index_row][index_col] = true;
			queue.push({index_row: index_row, index_col: index_col});
		}
	}

	while(queue.length > 0)
	{
		const coord = queue.shift();
		coords.push(coord);

		testcoord(coord.index_row - 1, coord.index_col);
		testcoord(coord.index_row, coord.index_col - 1);
		testcoord(coord.index_row, coord.index_col + 1);
		testcoord(coord.index_row + 1, coord.index_col);
	}

	return coords;
};

Level.prototype.regions = function(type)
{
	const regions = [];
	const visited = [];

	for(let index_row = 0; index_row < this.height; ++index_row)
		visited.push(new Array(this.width).fill(false));

	for(let index_row = 0; index_row < this.height; ++index_row)
		for(let index_col = 0; index_col < this.width; ++index_col)
			if(!visited[index_row][index_col] && this.tiles[index_row][index_col] === type)
				regions.push(this.region(index_row, index_col, visited));

	return regions;
};

Level.prototype.generate = function(density_tile, density_resource, density_bug)
{
	const level = this;

	// initialize with noise
	for(let index_row = 0; index_row < level.height; ++index_row)
		for(let index_col = 0; index_col < level.width; ++index_col)
			level.tiles[index_row][index_col] = randFloat(0, 1) < density_tile ? 1 : 0;

	// apply filtering passes
	for(let index_pass = 0; index_pass < NUM_SMOOTHPASSES; ++index_pass)
		for(let index_row = 0; index_row < level.height; ++index_row)
			for(let index_col = 0; index_col < level.width; ++index_col)
			{
				// border of bedrock
				if(index_row === 0 || index_row === level.height - 1 || index_col === 0 || index_col === level.width - 1)
					level.tiles[index_row][index_col] = -1;
				else
				{
					const filter = level.filter(index_row, index_col);

					if(filter > 0.5)
						level.tiles[index_row][index_col] = 1;
					else if(filter < 0.5)
						level.tiles[index_row][index_col] = 0;
				}
			}

	function doorcheck(index_row, index_col)
	{
		if(level.tiles[index_row - 1][index_col - 1] !== 0)
			return false;
		if(level.tiles[index_row - 1][index_col] !== 0)
			return false;
		if(level.tiles[index_row - 1][index_col + 1] !== 0)
			return false;
		if(level.tiles[index_row][index_col - 1] !== 0)
			return false;
		if(level.tiles[index_row][index_col + 1] !== 0)
			return false;
		if(level.tiles[index_row + 1][index_col - 1] !== 1)
			return false;
		if(level.tiles[index_row + 1][index_col] !== 1)
			return false;
		if(level.tiles[index_row + 1][index_col + 1] !== 1)
			return false;

		return true;
	}

	const caverns = level.regions(0);
	caverns.sort(function(a, b)
	{
		return b.length - a.length;
	});
	const caverns_main = caverns.slice(0, NUM_MAINCAVERNS);

	const coords_doors = [];
	for(let index_cavern = 0; index_cavern < caverns_main.length; ++index_cavern)
	{
		const cavern = caverns_main[index_cavern];

		// find all door candidates
		for(let index_coord = 0; index_coord < cavern.length; ++index_coord)
		{
			const coord = cavern[index_coord];
			if(doorcheck(coord.index_row, coord.index_col))
				coords_doors.push(coord);
		}
	}

	coords_doors.sort(function(a, b)
	{
		return a.index_row - b.index_row;
	});

	level.coord_entrance = coords_doors.slice(0, NUM_DOORCANDIDATES)[randInt(0, NUM_DOORCANDIDATES - 1)];
	level.coord_exit = coords_doors.slice(-NUM_DOORCANDIDATES)[randInt(0, NUM_DOORCANDIDATES - 1)];

	// replace floor by doors with bedrock
	level.tiles[level.coord_entrance.index_row + 1][level.coord_entrance.index_col - 1] = -1;
	level.tiles[level.coord_entrance.index_row + 1][level.coord_entrance.index_col] = -1;
	level.tiles[level.coord_entrance.index_row + 1][level.coord_entrance.index_col + 1] = -1;
	level.tiles[level.coord_exit.index_row + 1][level.coord_exit.index_col - 1] = -1;
	level.tiles[level.coord_exit.index_row + 1][level.coord_exit.index_col] = -1;
	level.tiles[level.coord_exit.index_row + 1][level.coord_exit.index_col + 1] = -1;

	// randomly place items
	level.gems = [];
	level.bugs = [];
	for(let index_row = 0; index_row < level.height; ++index_row)
		for(let index_col = 0; index_col < level.width; ++index_col)
		{
			if(level.tiles[index_row][index_col] === 1)
			{
				if(randFloat(0, 1) < density_resource)
					level.gems.push({index_col: index_col, index_row: index_row, mineral_type: Math.floor(Math.random() * 3)});
				if(index_row > 0 && randFloat(0, 1) < density_bug && level.tiles[index_row - 1][index_col] === 0)
					level.bugs.push({index_col: index_col, index_row: index_row - 1, collected: false});
			}
		}
};