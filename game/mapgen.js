const NUM_SMOOTHPASSES = 5;


function randFloat(min, max)
{
	return min + Math.random()*(max - min);
}

function randInt(min, max)
{
	return Math.floor(randFloat(min, max + 1));
}


function countSurrounding(level, index_row_test, index_col_test)
{
	let num = 0;
	for(let index_row = index_row_test - 1; index_row <= index_row_test + 1; ++index_row)
		for(let index_col = index_col_test - 1; index_col <= index_col_test + 1; ++index_col)
			if(index_row < 0 || index_row >= level.height || index_col < 0 || index_col >= level.width)
				++num;
			else if(index_row !== index_row_test || index_col !== index_col_test)
				num += level.tiles[index_row][index_col];

	return num;
}


function generate(density)
{
	const level = {
		width: randInt(40, 80),
		height: randInt(100, 140),
		tiles: [],
		density: density
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

				if(num_surrounding > 4)
					level.tiles[index_row][index_col] = 1;
				else if(num_surrounding < 4)
					level.tiles[index_row][index_col] = 0;
			}

	return level;
}