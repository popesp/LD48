const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const WIDTH_PLAYER = 12;
const HEIGHT_PLAYER = 20;

const MAX_SPEED = 3;

const SIZE_TILE = 24;
const EPSILON = 0.00000000001;

const COOLDOWN_DIG = 30;

const map_tile = {
	"111111111": {frame: "solid", flipped: false},
	"111111110": {frame: "solid", flipped: false},
	"111111101": {frame: "ceiling", flipped: false},
	"111111100": {frame: "ceiling", flipped: false},
	"111111011": {frame: "solid", flipped: false},
	"111111010": {frame: "solid", flipped: false},
	"111111001": {frame: "ceiling", flipped: false},
	"111111000": {frame: "ceiling", flipped: false},
	"111110111": {frame: "wall", flipped: true},
	"111110110": {frame: "wall", flipped: true},
	"111110101": {frame: "overhang", flipped: true},
	"111110100": {frame: "overhang", flipped: true},
	"111110011": {frame: "wall", flipped: true},
	"111110010": {frame: "wall", flipped: true},
	"111110001": {frame: "overhang", flipped: true},
	"111110000": {frame: "overhang", flipped: true},
	"111011111": {frame: "wall", flipped: false},
	"111011110": {frame: "wall", flipped: false},
	"111011101": {frame: "overhang", flipped: false},
	"111011100": {frame: "overhang", flipped: false},
	"111011011": {frame: "wall", flipped: false},
	"111011010": {frame: "wall", flipped: false},
	"111011001": {frame: "overhang", flipped: false},
	"111011000": {frame: "overhang", flipped: false},
	"111010111": {frame: "wallwall", flipped: false},
	"111010110": {frame: "wallwall", flipped: false},
	"111010101": {frame: "overhangoverhang", flipped: false},
	"111010100": {frame: "overhangoverhang", flipped: false},
	"111010011": {frame: "wallwall", flipped: false},
	"111010010": {frame: "wallwall", flipped: false},
	"111010001": {frame: "overhangoverhang", flipped: false},
	"111010000": {frame: "overhangoverhang", flipped: false},
	"110111111": {frame: "corner", flipped: true},
	"110111110": {frame: "corner", flipped: true},
	"110111101": {frame: "cornerceiling", flipped: true},
	"110111100": {frame: "cornerceiling", flipped: true},
	"110111011": {frame: "corner", flipped: true},
	"110111010": {frame: "corner", flipped: true},
	"110111001": {frame: "cornerceiling", flipped: true},
	"110111000": {frame: "cornerceiling", flipped: true},
	"110110111": {frame: "wall", flipped: true},
	"110110110": {frame: "wall", flipped: true},
	"110110101": {frame: "overhang", flipped: true},
	"110110100": {frame: "overhang", flipped: true},
	"110110011": {frame: "wall", flipped: true},
	"110110010": {frame: "wall", flipped: true},
	"110110001": {frame: "overhang", flipped: true},
	"110110000": {frame: "overhang", flipped: true},
	"110011111": {frame: "cornerwall", flipped: false},
	"110011110": {frame: "cornerwall", flipped: false},
	"110011101": {frame: "corneroverhang", flipped: false},
	"110011100": {frame: "corneroverhang", flipped: false},
	"110011011": {frame: "cornerwall", flipped: false},
	"110011010": {frame: "cornerwall", flipped: false},
	"110011001": {frame: "corneroverhang", flipped: false},
	"110011000": {frame: "corneroverhang", flipped: false},
	"110010111": {frame: "wallwall", flipped: false},
	"110010110": {frame: "wallwall", flipped: false},
	"110010101": {frame: "overhangoverhang", flipped: false},
	"110010100": {frame: "overhangoverhang", flipped: false},
	"110010011": {frame: "wallwall", flipped: false},
	"110010010": {frame: "wallwall", flipped: false},
	"110010001": {frame: "overhangoverhang", flipped: false},
	"110010000": {frame: "overhangoverhang", flipped: false},
	"101111111": {frame: "floor", flipped: false},
	"101111110": {frame: "floor", flipped: false},
	"101111101": {frame: "floorceiling", flipped: false},
	"101111100": {frame: "floorceiling", flipped: false},
	"101111011": {frame: "floor", flipped: false},
	"101111010": {frame: "floor", flipped: false},
	"101111001": {frame: "floorceiling", flipped: false},
	"101111000": {frame: "floorceiling", flipped: false},
	"101110111": {frame: "edge", flipped: true},
	"101110110": {frame: "edge", flipped: true},
	"101110101": {frame: "edgeoverhang", flipped: true},
	"101110100": {frame: "edgeoverhang", flipped: true},
	"101110011": {frame: "edge", flipped: true},
	"101110010": {frame: "edge", flipped: true},
	"101110001": {frame: "edgeoverhang", flipped: true},
	"101110000": {frame: "edgeoverhang", flipped: true},
	"101011111": {frame: "edge", flipped: false},
	"101011110": {frame: "edge", flipped: false},
	"101011101": {frame: "edgeoverhang", flipped: false},
	"101011100": {frame: "edgeoverhang", flipped: false},
	"101011011": {frame: "edge", flipped: false},
	"101011010": {frame: "edge", flipped: false},
	"101011001": {frame: "edgeoverhang", flipped: false},
	"101011000": {frame: "edgeoverhang", flipped: false},
	"101010111": {frame: "edgeedge", flipped: false},
	"101010110": {frame: "edgeedge", flipped: false},
	"101010101": {frame: "island", flipped: false},
	"101010100": {frame: "island", flipped: false},
	"101010011": {frame: "edgeedge", flipped: false},
	"101010010": {frame: "edgeedge", flipped: false},
	"101010001": {frame: "island", flipped: false},
	"101010000": {frame: "island", flipped: false},
	"100111111": {frame: "floor", flipped: false},
	"100111110": {frame: "floor", flipped: false},
	"100111101": {frame: "floorceiling", flipped: false},
	"100111100": {frame: "floorceiling", flipped: false},
	"100111011": {frame: "floor", flipped: false},
	"100111010": {frame: "floor", flipped: false},
	"100111001": {frame: "floorceiling", flipped: false},
	"100111000": {frame: "floorceiling", flipped: false},
	"100110111": {frame: "edge", flipped: true},
	"100110110": {frame: "edge", flipped: true},
	"100110101": {frame: "edgeoverhang", flipped: true},
	"100110100": {frame: "edgeoverhang", flipped: true},
	"100110011": {frame: "edge", flipped: true},
	"100110010": {frame: "edge", flipped: true},
	"100110001": {frame: "edgeoverhang", flipped: true},
	"100110000": {frame: "edgeoverhang", flipped: true},
	"100011111": {frame: "edge", flipped: false},
	"100011110": {frame: "edge", flipped: false},
	"100011101": {frame: "edgeoverhang", flipped: false},
	"100011100": {frame: "edgeoverhang", flipped: false},
	"100011011": {frame: "edge", flipped: false},
	"100011010": {frame: "edge", flipped: false},
	"100011001": {frame: "edgeoverhang", flipped: false},
	"100011000": {frame: "edgeoverhang", flipped: false},
	"100010111": {frame: "edgeedge", flipped: false},
	"100010110": {frame: "edgeedge", flipped: false},
	"100010101": {frame: "island", flipped: false},
	"100010100": {frame: "island", flipped: false},
	"100010011": {frame: "edgeedge", flipped: false},
	"100010010": {frame: "edgeedge", flipped: false},
	"100010001": {frame: "island", flipped: false},
	"100010000": {frame: "island", flipped: false},
	"011111111": {frame: "corner", flipped: false},
	"011111110": {frame: "corner", flipped: false},
	"011111101": {frame: "cornerceiling", flipped: false},
	"011111100": {frame: "cornerceiling", flipped: false},
	"011111011": {frame: "corner", flipped: false},
	"011111010": {frame: "corner", flipped: false},
	"011111001": {frame: "cornerceiling", flipped: false},
	"011111000": {frame: "cornerceiling", flipped: false},
	"011110111": {frame: "cornerwall", flipped: true},
	"011110110": {frame: "cornerwall", flipped: true},
	"011110101": {frame: "corneroverhang", flipped: true},
	"011110100": {frame: "corneroverhang", flipped: true},
	"011110011": {frame: "cornerwall", flipped: true},
	"011110010": {frame: "cornerwall", flipped: true},
	"011110001": {frame: "corneroverhang", flipped: true},
	"011110000": {frame: "corneroverhang", flipped: true},
	"011011111": {frame: "wall", flipped: false},
	"011011110": {frame: "wall", flipped: false},
	"011011101": {frame: "overhang", flipped: false},
	"011011100": {frame: "overhang", flipped: false},
	"011011011": {frame: "wall", flipped: false},
	"011011010": {frame: "wall", flipped: false},
	"011011001": {frame: "overhang", flipped: false},
	"011011000": {frame: "overhang", flipped: false},
	"011010111": {frame: "wallwall", flipped: false},
	"011010110": {frame: "wallwall", flipped: false},
	"011010101": {frame: "overhangoverhang", flipped: false},
	"011010100": {frame: "overhangoverhang", flipped: false},
	"011010011": {frame: "wallwall", flipped: false},
	"011010010": {frame: "wallwall", flipped: false},
	"011010001": {frame: "overhangoverhang", flipped: false},
	"011010000": {frame: "overhangoverhang", flipped: false},
	"010111111": {frame: "corners", flipped: false},
	"010111110": {frame: "corners", flipped: false},
	"010111101": {frame: "cornersceiling", flipped: false},
	"010111100": {frame: "cornersceiling", flipped: false},
	"010111011": {frame: "corners", flipped: false},
	"010111010": {frame: "corners", flipped: false},
	"010111001": {frame: "cornersceiling", flipped: false},
	"010111000": {frame: "cornersceiling", flipped: false},
	"010110111": {frame: "cornerwall", flipped: true},
	"010110110": {frame: "cornerwall", flipped: true},
	"010110101": {frame: "corneroverhang", flipped: true},
	"010110100": {frame: "corneroverhang", flipped: true},
	"010110011": {frame: "cornerwall", flipped: true},
	"010110010": {frame: "cornerwall", flipped: true},
	"010110001": {frame: "corneroverhang", flipped: true},
	"010110000": {frame: "corneroverhang", flipped: true},
	"010011111": {frame: "cornerwall", flipped: false},
	"010011110": {frame: "cornerwall", flipped: false},
	"010011101": {frame: "corneroverhang", flipped: false},
	"010011100": {frame: "corneroverhang", flipped: false},
	"010011011": {frame: "cornerwall", flipped: false},
	"010011010": {frame: "cornerwall", flipped: false},
	"010011001": {frame: "corneroverhang", flipped: false},
	"010011000": {frame: "corneroverhang", flipped: false},
	"010010111": {frame: "wallwall", flipped: false},
	"010010110": {frame: "wallwall", flipped: false},
	"010010101": {frame: "overhangoverhang", flipped: false},
	"010010100": {frame: "overhangoverhang", flipped: false},
	"010010011": {frame: "wallwall", flipped: false},
	"010010010": {frame: "wallwall", flipped: false},
	"010010001": {frame: "overhangoverhang", flipped: false},
	"010010000": {frame: "overhangoverhang", flipped: false},
	"001111111": {frame: "floor", flipped: false},
	"001111110": {frame: "floor", flipped: false},
	"001111101": {frame: "floorceiling", flipped: false},
	"001111100": {frame: "floorceiling", flipped: false},
	"001111011": {frame: "floor", flipped: false},
	"001111010": {frame: "floor", flipped: false},
	"001111001": {frame: "floorceiling", flipped: false},
	"001111000": {frame: "floorceiling", flipped: false},
	"001110111": {frame: "edge", flipped: true},
	"001110110": {frame: "edge", flipped: true},
	"001110101": {frame: "edgeoverhang", flipped: true},
	"001110100": {frame: "edgeoverhang", flipped: true},
	"001110011": {frame: "edge", flipped: true},
	"001110010": {frame: "edge", flipped: true},
	"001110001": {frame: "edgeoverhang", flipped: true},
	"001110000": {frame: "edgeoverhang", flipped: true},
	"001011111": {frame: "edge", flipped: false},
	"001011110": {frame: "edge", flipped: false},
	"001011101": {frame: "edgeoverhang", flipped: false},
	"001011100": {frame: "edgeoverhang", flipped: false},
	"001011011": {frame: "edge", flipped: false},
	"001011010": {frame: "edge", flipped: false},
	"001011001": {frame: "edgeoverhang", flipped: false},
	"001011000": {frame: "edgeoverhang", flipped: false},
	"001010111": {frame: "edgeedge", flipped: false},
	"001010110": {frame: "edgeedge", flipped: false},
	"001010101": {frame: "island", flipped: false},
	"001010100": {frame: "island", flipped: false},
	"001010011": {frame: "edgeedge", flipped: false},
	"001010010": {frame: "edgeedge", flipped: false},
	"001010001": {frame: "island", flipped: false},
	"001010000": {frame: "island", flipped: false},
	"000111111": {frame: "floor", flipped: false},
	"000111110": {frame: "floor", flipped: false},
	"000111101": {frame: "floorceiling", flipped: false},
	"000111100": {frame: "floorceiling", flipped: false},
	"000111011": {frame: "floor", flipped: false},
	"000111010": {frame: "floor", flipped: false},
	"000111001": {frame: "floorceiling", flipped: false},
	"000111000": {frame: "floorceiling", flipped: false},
	"000110111": {frame: "edge", flipped: true},
	"000110110": {frame: "edge", flipped: true},
	"000110101": {frame: "edgeoverhang", flipped: true},
	"000110100": {frame: "edgeoverhang", flipped: true},
	"000110011": {frame: "edge", flipped: true},
	"000110010": {frame: "edge", flipped: true},
	"000110001": {frame: "edgeoverhang", flipped: true},
	"000110000": {frame: "edgeoverhang", flipped: true},
	"000011111": {frame: "edge", flipped: false},
	"000011110": {frame: "edge", flipped: false},
	"000011101": {frame: "edgeoverhang", flipped: false},
	"000011100": {frame: "edgeoverhang", flipped: false},
	"000011011": {frame: "edge", flipped: false},
	"000011010": {frame: "edge", flipped: false},
	"000011001": {frame: "edgeoverhang", flipped: false},
	"000011000": {frame: "edgeoverhang", flipped: false},
	"000010111": {frame: "edgeedge", flipped: false},
	"000010110": {frame: "edgeedge", flipped: false},
	"000010101": {frame: "island", flipped: false},
	"000010100": {frame: "island", flipped: false},
	"000010011": {frame: "edgeedge", flipped: false},
	"000010010": {frame: "edgeedge", flipped: false},
	"000010001": {frame: "island", flipped: false},
	"000010000": {frame: "island", flipped: false}
};

let energy_current = 10;


function handleCollision(player, level)
{
	function collideTile(index_row, index_col)
	{
		const y_top = index_row*SIZE_TILE;
		const y_bottom = y_top + SIZE_TILE;
		const x_left = index_col*SIZE_TILE;
		const x_right = x_left + SIZE_TILE;

		if(player.sprite.y - EPSILON > y_top && player.y_old - EPSILON <= y_top)
		{
			player.falling = false;
			player.yvel = 0;
			player.sprite.y = y_top;
			return;
		}

		if(player.sprite.x + WIDTH_PLAYER/2 - EPSILON > x_left && player.x_old + WIDTH_PLAYER/2 - EPSILON <= x_left)
		{
			player.xvel = 0;
			player.sprite.x = x_left - WIDTH_PLAYER/2;
			return;
		}

		if(player.sprite.x - WIDTH_PLAYER/2 < x_right && player.x_old - WIDTH_PLAYER/2 >= x_right)
		{
			player.xvel = 0;
			player.sprite.x = x_right + WIDTH_PLAYER/2;
			return;
		}

		if(player.sprite.y - HEIGHT_PLAYER < y_bottom && player.y_old - HEIGHT_PLAYER >= y_bottom)
		{
			player.yvel = 0;
			player.sprite.y = y_bottom + HEIGHT_PLAYER;
			return;
		}
	}

	let index_row, index_col;

	// top left
	index_row = Math.floor((player.sprite.y - HEIGHT_PLAYER)/SIZE_TILE);
	index_col = Math.floor((player.sprite.x - WIDTH_PLAYER/2)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// top right
	index_col = Math.floor((player.sprite.x + WIDTH_PLAYER/2 - EPSILON)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// bottom left
	index_row = Math.floor((player.sprite.y - EPSILON)/SIZE_TILE);
	index_col = Math.floor((player.sprite.x - WIDTH_PLAYER/2)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// bottom right
	index_col = Math.floor((player.sprite.x + WIDTH_PLAYER/2 - EPSILON)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// top left again
	index_row = Math.floor((player.sprite.y - HEIGHT_PLAYER)/SIZE_TILE);
	index_col = Math.floor((player.sprite.x - WIDTH_PLAYER/2)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// bottom left again
	index_row = Math.floor((player.sprite.y - EPSILON)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// top right again
	index_row = Math.floor((player.sprite.y - HEIGHT_PLAYER)/SIZE_TILE);
	index_col = Math.floor((player.sprite.x + WIDTH_PLAYER/2 - EPSILON)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);

	// bottom right again
	index_row = Math.floor((player.sprite.y - EPSILON)/SIZE_TILE);
	if(level.tiles[index_row][index_col])
		collideTile(index_row, index_col);
}


function getSurrounding(level, index_row, index_col)
{
	let surrounding = "";
	for(let index_row_check = index_row - 1; index_row_check <= index_row + 1; ++index_row_check)
		for(let index_col_check = index_col - 1; index_col_check <= index_col + 1; ++index_col_check)
			if(index_row_check < 0 || index_row_check >= level.height || index_col_check < 0 || index_col_check >= level.width)
				surrounding += "1";
			else
				surrounding += level.tiles[index_row_check][index_col_check] ? 1 : 0;

	return surrounding;
}


document.addEventListener("DOMContentLoaded", function()
{
	const dom_container = document.getElementById("container");

	function resize()
	{
		let w = window.innerWidth;
		let h = window.innerHeight;

		const r = HEIGHT_CANVAS/WIDTH_CANVAS;

		if(w*r > window.innerHeight)
			w = Math.min(w, Math.ceil(h/r), WIDTH_CANVAS);
		h = Math.floor(w*r);

		dom_container.style.width = game.canvas.style.width = `${w}px`;
		dom_container.style.height = game.canvas.style.height = `${h}px`;
		dom_container.style.top = `${Math.floor((window.innerHeight - h)/2)}px`;
		dom_container.style.left = `${Math.floor((window.innerWidth - w)/2)}px`;
	}

	const game = new Phaser.Game({
		pixelArt: true,
		type: Phaser.AUTO,
		title: "LD48",
		parent: dom_container,
		width: WIDTH_CANVAS/2,
		height: HEIGHT_CANVAS/2,
		resolution: 5,
		backgroundColor: 0x202838,
		input: {
			gamepad: true
		},
		physics: {
			default: "arcade",
			arcade: {
				gravity: {
					y: 300
				},
				debug: true
			}
		},
		scene: {
			preload: function()
			{
				this.load.atlas("tiles", "assets/tiles-extruded.png", "assets/tiles-extruded.json");
				this.load.spritesheet("dude",
					"assets/dude.png",
					{frameWidth: 32, frameHeight: 48}
				);
			},

			create: function()
			{
				const level = generate(0.5);
				level.images = [];
				for(let index_row = 0; index_row < level.height; ++index_row)
				{
					const row_images = [];
					for(let index_col = 0; index_col < level.width; ++index_col)
					{
						let frame = "void", flipped = false;
						if(level.tiles[index_row][index_col] === -1)
							frame = "bedrock";
						else if(level.tiles[index_row][index_col])
						{
							const t = map_tile[getSurrounding(level, index_row, index_col)];
							frame = t.frame;
							flipped = t.flipped;
						}

						const tile = this.add.image(index_col*SIZE_TILE, index_row*SIZE_TILE, "tiles", frame);
						tile.setOrigin(0, 0);
						tile.setDisplaySize(SIZE_TILE, SIZE_TILE);

						tile.flipX = flipped;

						row_images.push(tile);
					}

					level.images.push(row_images);
				}
				this.data.set("level", level);

				this.input.gamepad.start();
				this.data.set("cursors", this.input.keyboard.createCursorKeys());

				this.data.set("emitter", this.add.particles("tiles", "dirt").createEmitter({
					speed: {min: 20, max: 100},
					angle: {min: 200, max: 340},
					alpha: {start: 1, end: 0},
					scale: 3,
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 300
				}));

				const player = {
					falling: true,
					jump: false,
					jumpCancel: false,
					xvel: 0,
					yvel: 0,
					cooldown_dig: 0,
					facing: "right",
					sprite: this.add.sprite(132, 120, "dude")
				};
				player.sprite.setOrigin(0.5, 1);
				player.sprite.setDisplaySize(16, 24);
				this.cameras.main.startFollow(player.sprite);
				this.cameras.main.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);
				this.data.set("player", player);

				barbg = this.add.graphics();
				barbg.fillStyle(0xcc2418, 1);
				barbg.fillRect(14, 14, 204, 19);
				barbg.setScrollFactor(0);

				bar = this.add.graphics();
				bar.fillStyle(0xebb134, 1);
				bar.displayOriginX = 16;

				bar.fillRect(16, 16, 200, 15);
				bar.setScrollFactor(0);

				energy_max = 10;
				energy_current = energy_max;
				energy_display = this.add.text(84, 16, "Energy:" + energy_current, {fontSize: "12px", fill: "#000"});
				energy_display.setScrollFactor(0);

				this.anims.create({
					key: "left",
					frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
					frameRate: 10,
					repeat: -1
				});

				this.anims.create({
					key: "turn",
					frames: [{key: "dude", frame: 4}],
					frameRate: 20
				});

				this.anims.create({
					key: "right",
					frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
					frameRate: 10,
					repeat: -1
				});
			},

			update: function()
			{
				const gamepad = this.input.gamepad.gamepads[0];
				const cursors = this.data.get("cursors");

				const left = cursors.left.isDown || (gamepad && (gamepad.left || gamepad.leftStick.x < -0.1));
				const right = cursors.right.isDown || (gamepad && (gamepad.right || gamepad.leftStick.x > 0.1));
				const jump = cursors.up.isDown || (gamepad && gamepad.A);
				const action = cursors.space.isDown;

				const player = this.data.get("player");
				const level = this.data.get("level");
				const emitter = this.data.get("emitter");

				if(jump && !player.falling)
				{
					player.yvel = -5;
					player.falling = true;
				}
				if(!jump && player.falling)
					player.yvel = Math.max(player.yvel, -2);

				if(left && !right)
				{
					player.xvel = Math.max(-MAX_SPEED, player.xvel - 0.4);
					player.sprite.anims.play("left", true);
					player.facing = "left";
				}
				if(right && !left)
				{
					player.xvel = Math.min(MAX_SPEED, player.xvel + 0.4);
					player.sprite.anims.play("right", true);
					player.facing = "right";
				}
				if(left === right)
				{
					player.sprite.anims.stop();

					if(player.xvel > 0)
						player.xvel = Math.max(0, player.xvel - 0.3);
					else
						player.xvel = Math.min(0, player.xvel + 0.3);
				}

				player.x_old = player.sprite.x;
				player.y_old = player.sprite.y;

				if(player.falling)
					player.yvel += 0.22;

				player.sprite.x += player.xvel;
				player.sprite.y += player.yvel;

				if(player.sprite.y < HEIGHT_PLAYER)
				{
					player.sprite.y = HEIGHT_PLAYER;
					player.yvel = 0;
				}
				else if(player.sprite.y > level.height*SIZE_TILE)
				{
					player.falling = false;
					player.sprite.y = level.height*SIZE_TILE - EPSILON;
					player.yvel = 0;
				}

				if(player.sprite.x < WIDTH_PLAYER/2)
				{
					player.sprite.x = WIDTH_PLAYER/2;
					player.xvel = 0;
				}
				else if(player.sprite.x > level.width*SIZE_TILE - WIDTH_PLAYER/2)
				{
					player.sprite.x = level.width*SIZE_TILE - WIDTH_PLAYER/2 - EPSILON;
					player.xvel = 0;
				}

				handleCollision(player, level);

				const index_row_under = Math.floor(player.sprite.y/SIZE_TILE);
				const index_col_left = Math.floor((player.sprite.x - WIDTH_PLAYER/2)/SIZE_TILE);
				const index_col_right = Math.floor((player.sprite.x + WIDTH_PLAYER/2 - EPSILON)/SIZE_TILE);

				if(!level.tiles[index_row_under][index_col_left] && !level.tiles[index_row_under][index_col_right])
					player.falling = true;

				if(player.cooldown_dig)
					player.cooldown_dig--;
				else if(action && !player.falling)
				{
					const index_row = Math.floor((player.sprite.y - EPSILON)/SIZE_TILE);
					const index_col = Math.floor(player.sprite.x/SIZE_TILE) + (player.facing === "right" ? 1 : -1);

					if(dig(level, emitter, index_row + (level.tiles[index_row][index_col] ? 0 : 1), index_col))
						player.cooldown_dig = COOLDOWN_DIG;
				}
			}
		}
	});

	function dig(level, emitter, index_row, index_col)
	{
		if(index_row < 0 || index_row >= level.height || index_col < 0 || index_col >= level.width)
			return false;

		if(level.tiles[index_row][index_col] !== 1)
			return false;

		const image = level.images[index_row][index_col];
		level.tiles[index_row][index_col] = 0;
		image.setFrame("void");
		emitter.explode(20, image.x + SIZE_TILE/2, image.y + SIZE_TILE/2);

		for(let index_row_check = index_row - 1; index_row_check <= index_row + 1; ++index_row_check)
			for(let index_col_check = index_col - 1; index_col_check <= index_col + 1; ++index_col_check)
			{
				if(level.tiles[index_row_check][index_col_check] === -1)
					continue;

				if(index_row_check < 0 || index_row_check >= level.height || index_col_check < 0 || index_col_check >= level.width)
					continue;

				const surrounding = getSurrounding(level, index_row_check, index_col_check);
				const t = map_tile[surrounding];
				const s = level.images[index_row_check][index_col_check];

				if(t !== undefined)
				{
					s.setFrame(t.frame);
					s.flipX = t.flipped;
				}
			}

		energy_current --;
		energy_display.setText("Energy:" + energy_current);
		bar.scaleX = energy_current/energy_max;
		//x offset
		bar.x += 16 * (1/energy_max);

		return true;
	}

	window.addEventListener("resize", resize);
	resize();
});