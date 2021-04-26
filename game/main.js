/* global randInt, Level*/


const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const WIDTH_PLAYER = 10;
const HEIGHT_PLAYER = 14;

const SIZE_TILE = 16;
const EPSILON = 0.00000000001;
const COOLDOWN_DIG = 30;

// PHYSICS
const JUMPSPEED = 3.4;
const JUMPSPEED_CANCEL = 1.2;
const RUN_ACCEL = 0.3;
const RUN_DECEL = 0.3;
const MAX_SPEED = 2.4;
const GRAVITY = 0.15;
const FALL_DMG_THRESHOLD = 5;

//PLAYER VARIABLES
const ENERGY_MAX = 20;
const shovel = {
	level: 1,
	dig_energy: 3
};

let minerals = 0;
let bar = "";

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

function handleCollision(player, level, scene)
{
	function collideTile(index_row, index_col)
	{
		const y_top = index_row*SIZE_TILE;
		const y_bottom = y_top + SIZE_TILE;
		const x_left = index_col*SIZE_TILE;
		const x_right = x_left + SIZE_TILE;

		if(player.sprite.y - EPSILON > y_top && player.y_old - EPSILON <= y_top)
		{
			if(player.yvel > FALL_DMG_THRESHOLD)
			{
				const old_energy = scene.data.values.energy_current;
				scene.tweens.addCounter({
					duration: 75,
					onUpdate: function ()
					{
						player.sprite.setTintFill(0xFFFFFF);
					},
					onComplete: function()
					{
						player.sprite.clearTint();
					}
				});
				scene.data.set("energy_current", Math.floor(scene.data.values.energy_current - (player.yvel - FALL_DMG_THRESHOLD)));
				setEnergy(scene, player, scene.data.values.energy_current, old_energy);
			}

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
			key: "main",
			preload: function()
			{
				this.load.atlas("tiles", "assets/tiles-extruded.png", "assets/tiles-extruded.json");

				this.load.spritesheet("dude",
					"assets/dude3.png",
					{frameWidth: 20, frameHeight: 16}
				);
				this.load.spritesheet("bug",
					"assets/bug.png",
					{frameWidth: 20, frameHeight: 16}
				);

				this.load.image("button_home", "assets/btn_home.png");
				this.load.image("button_bag", "assets/btn_backpack.png");
				this.load.image("button_success", "assets/btn_success.png");
				this.load.image("button_dirty", "assets/btn_dirty.png");
				this.load.image("dialog", "assets/dialog.png");
				this.load.image("bag", "assets/bag.png");
				this.load.image("bag_close", "assets/btn_close.png");
				this.load.image("item_slot", "assets/item_slot.png");
				this.load.image("mineral_slot", "assets/mineral_slot.png");

				this.load.audio("music", "assets/cavemusic.wav");
				this.load.audio("dig_dirt", "assets/soundfx/dig.wav");
				this.load.audio("dig_mineral", "assets/soundfx/dig-gold.wav");
			},

			create: function()
			{
				this.music = this.sound.add("music");
				this.music.loop = true;
				this.dig_dirt = this.sound.add("dig_dirt");
				this.dig_mineral = this.sound.add("dig_mineral");

				const player = {
					falling: true,
					xvel: 0,
					yvel: 0,
					cooldown_dig: 0,
					facing: "right",
					sprite: this.add.sprite(0, 0, "dude")
				};

				this.data.set("energy_max", ENERGY_MAX);

				const group_ui = this.add.group();

				this.ui = {
					energy_display: this.add.text(84, 16, "Energy:" + this.data.values.energy_max, {fontSize: "12px", fill: "#000"}),
					mineral_display: this.add.text(240, 8, minerals, {fontSize: "12px", fill: "#fff", stroke: "#000", strokeThickness: 1})
				};

				group_ui.add(this.ui.energy_display.setScrollFactor(0));
				group_ui.add(this.ui.mineral_display.setScrollFactor(0));
				group_ui.setDepth(4);


				const parent = this;
				let home_open = false;
				let bag_open = false;

				this.input.gamepad.start();
				this.data.set("cursors", this.input.keyboard.createCursorKeys());
				this.cursors = this.input.keyboard.createCursorKeys();


				this.anims.create({
					key: "turn",
					frames: [{key: "dude", frame: 5}],
					frameRate: 10
				});

				this.anims.create({
					key: "run",
					frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 4}),
					frameRate: 10,
					repeat: -1
				});

				this.anims.create({
					key: "dig",
					frames: this.anims.generateFrameNumbers("dude", {start: 6, end: 11}),
					frameRate: 20
				});

				this.anims.create({
					key: "idle",
					frames: this.anims.generateFrameNumbers("dude", {start: 12, end: 27}),
					frameRate: 10
				});

				this.anims.create({
					key: "jump",
					frames: this.anims.generateFrameNumbers("dude", {start: 28, end: 31}),
					frameRate: 10
				});

				this.anims.create({
					key: "fall",
					frames: this.anims.generateFrameNumbers("dude", {start: 32, end: 35}),
					frameRate: 10,
					repeat: -1
				});

				this.anims.create({
					key: "die",
					frames: this.anims.generateFrameNumbers("dude", {start: 36, end: 38}),
					frameRate: 10
				});

				this.anims.create({
					key: "eat",
					frames: this.anims.generateFrameNumbers("dude", {start: 39, end: 41}),
					frameRate: 10
				});

				this.anims.create({
					key: "move",
					frames: this.anims.generateFrameNumbers("bug", {start: 0, end: 9}),
					frameRate: 10,
					repeat: -1
				});

				restart_level(this, player);

				this.emitter_dirt = this.add.particles("tiles", "morsel_dirt").createEmitter({
					speed: {min: 20, max: 100},
					angle: {min: 200, max: 340},
					alpha: {start: 1, end: 0},
					scale: 3,
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 300
				});

				this.emitter_mineral = this.add.particles("tiles", "morsel_gold").createEmitter({
					speed: {min: 20, max: 100},
					angle: {min: 200, max: 340},
					alpha: {start: 1, end: 0},
					scale: 3,
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 300
				});

				this.emitter_dust = this.add.particles("tiles", "morsel_dirt").createEmitter({
					speedY: {min: -20, max: -10},
					alpha: {start: 1, end: 0},
					scale: {start: 2, end: 5},
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 20
				});

				const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width/2;
				const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height/2;

				const barbg = this.add.graphics();
				barbg.fillStyle(0xcc2418, 1);
				barbg.fillRect(14, 14, 204, 19);
				barbg.setScrollFactor(0);
				barbg.depth = 2;

				const mineral_slot = this.add.image(240, 20, "mineral_slot");
				mineral_slot.setScrollFactor(0);
				mineral_slot.scale = 0.3;
				mineral_slot.depth = 2;

				const button_home = this.add.image(372, 23, "button_home").setInteractive();
				button_home.setScrollFactor(0);
				button_home.scale = 0.3;
				button_home.scaleY = button_home.scaleX;
				button_home.depth = 2;
				button_home.on("pointerup", function()
				{
					if(!home_open)
					{
						home_open = true;
						const home_modal = parent.add.image(screenCenterX, screenCenterY, "dialog");
						home_modal.setScrollFactor(0);
						home_modal.scale = 0.8;
						const confirm_text1 = parent.add.text(141, 120, "Are you sure you", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
						const confirm_text2 = parent.add.text(128, 135, "want to return home?", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);

						const button_yes = parent.add.image(162, 178, "button_success").setInteractive();
						const yes_text = parent.add.text(151, 170, "YES", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
						button_yes.setScrollFactor(0);
						button_yes.scale = 0.3;
						button_yes.scaleY = button_home.scaleX;
						const button_no = parent.add.image(240, 178, "button_dirty").setInteractive();
						const no_text = parent.add.text(233, 170, "NO", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
						button_no.setScrollFactor(0);
						button_no.scale = 0.3;
						button_no.scaleY = button_home.scaleX;

						button_yes.on("pointerup", function()
						{
							home_modal.destroy();
							confirm_text1.destroy();
							confirm_text2.destroy();
							yes_text.destroy();
							button_yes.destroy();
							button_no.destroy();
							no_text.destroy();
							home_open = false;
						});

						button_no.on("pointerup", function()
						{
							home_modal.destroy();
							confirm_text1.destroy();
							confirm_text2.destroy();
							yes_text.destroy();
							button_yes.destroy();
							button_no.destroy();
							no_text.destroy();
							home_open = false;
						});
					}
				});

				const button_bag = this.add.image(330, 23, "button_bag").setInteractive();
				button_bag.setScrollFactor(0);
				button_bag.scale = 0.3;
				button_bag.scaleY = button_home.scaleX;
				button_bag.depth = 2;
				button_bag.on("pointerup", function()
				{
					if(!bag_open)
					{
						bag_open = true;
						const bag = parent.add.image(screenCenterX, screenCenterY, "bag");
						bag.setScrollFactor(0);
						bag.scale = 0.75;

						const bag_close = parent.add.image(screenCenterX, screenCenterY + 50, "bag_close").setInteractive();
						bag_close.setScrollFactor(0);
						bag_close.scale = 0.2;

						const slots = [];
						for(let grid_index = 1; grid_index <= 6; grid_index++)
						{
							if(grid_index <= 3)
							{
								// first row
								const item_slot = parent.add.image((screenCenterX + 60) - 30*grid_index, screenCenterY - 20, "item_slot");
								item_slot.setScrollFactor(0);
								item_slot.scale = 0.3;
								slots.push(item_slot);

							}
							else
							{
								// second row
								const item_slot = parent.add.image((screenCenterX + 150) - 30*grid_index, screenCenterY + 15, "item_slot");
								item_slot.setScrollFactor(0);
								item_slot.scale = 0.3;
								slots.push(item_slot);
							}
						}

						bag_close.on("pointerup", function()
						{
							bag.destroy();
							bag_close.destroy();
							slots.forEach(slot =>
							{
								slot.destroy();
							});
							bag_open = false;
						});
					}
				});
			},

			update: function()
			{
				const gamepad = this.input.gamepad.gamepads[0];

				const left = this.cursors.left.isDown || (gamepad && (gamepad.left || gamepad.leftStick.x < -0.1));
				const right = this.cursors.right.isDown || (gamepad && (gamepad.right || gamepad.leftStick.x > 0.1));
				const jump = this.cursors.up.isDown || (gamepad && gamepad.A);
				const action = this.cursors.space.isDown || (gamepad && gamepad.X);

				const player = this.data.get("player");
				const level = this.data.get("level");

				//shawns a nerd
				if(jump && !player.falling)
				{
					player.sprite.anims.play("jump", true);
					player.yvel = -JUMPSPEED;
					player.falling = true;

					const vel = player.xvel*5;
					this.emitter_dust.setSpeedX({min: vel - 10, max: vel + 10});
					this.emitter_dust.explode(10, player.sprite.x, player.sprite.y);
				}
				if(!jump && player.falling)
				{
					player.sprite.anims.play("fall", true);
					player.yvel = Math.max(player.yvel, -JUMPSPEED_CANCEL);
				}

				if(left === right)
				{
					if(!player.falling && !player.cooldown_dig)
						player.sprite.anims.play("idle", true);

					if(player.xvel > 0)
						player.xvel = Math.max(0, player.xvel - RUN_DECEL);
					else
						player.xvel = Math.min(0, player.xvel + RUN_DECEL);
				}
				else if(left)
				{
					if(player.xvel > 0 && !player.falling)
						this.emitter_dust.emitParticle(1, player.sprite.x, player.sprite.y);

					player.xvel = Math.max(-MAX_SPEED, player.xvel - RUN_ACCEL);
					if(!player.falling && !player.cooldown_dig)
						player.sprite.anims.play("run", true);

					player.facing = "left";
					player.sprite.flipX = true;
				}
				else if(right)
				{
					if(player.xvel < 0 && !player.falling)
						this.emitter_dust.emitParticle(1, player.sprite.x, player.sprite.y);

					player.xvel = Math.min(MAX_SPEED, player.xvel + RUN_ACCEL);
					if(!player.falling && !player.cooldown_dig)
						player.sprite.anims.play("run", true);

					player.facing = "right";
					player.sprite.flipX = false;
				}

				player.x_old = player.sprite.x;
				player.y_old = player.sprite.y;

				if(player.falling)
					player.yvel += GRAVITY;

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

				handleCollision(player, level, this);

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

					const dug = dig(level, this, player, index_row + (level.tiles[index_row][index_col] ? 0 : 1), index_col)
					if(dug !== false)
					{
						player.cooldown_dig = COOLDOWN_DIG;
						player.sprite.anims.play("dig");
						if(dug === "dirt")
						{
							this.dig_dirt.play();
						}
						else
						{
							this.dig_mineral.play();
						}
					}
				}
			}
		}
	});

	function dig(level, scene, player, index_row, index_col)
	{
		if(index_row < 0 || index_row >= level.height || index_col < 0 || index_col >= level.width)
			return false;

		if(level.tiles[index_row][index_col] !== 1)
			return false;

		const image = level.images[index_row][index_col];
		level.tiles[index_row][index_col] = 0;
		image.setFrame("void");

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


		let isMineral = false;
		for(let index_gem = 0; index_gem < level.gems.length; ++index_gem)
		{
			const gem = level.gems[index_gem];
			if(gem.index_col === index_col && gem.index_row === index_row)
			{
				const image_mineral = level.images_minerals[index_gem];

				image_mineral.destroy();
				isMineral = true;

				minerals += 10;
				scene.ui.mineral_display.setText(minerals);

			}
		}

		// particles
		const x_particle = image.x + SIZE_TILE/2;
		const y_particle = image.y + SIZE_TILE/2;
		if(isMineral)
		{
			scene.emitter_dirt.explode(10, x_particle, y_particle);
			scene.emitter_mineral.explode(10, x_particle, y_particle);
		}
		else
		{
			scene.emitter_dirt.explode(20, x_particle, y_particle);
		}	

		const old_energy = scene.data.values.energy_current;
		scene.data.set("energy_current", --scene.data.values.energy_current);
		if(scene.data.values.energy_current <= 0)
		{
			restart_level(scene, player);
		}
		setEnergy(scene, player, scene.data.values.energy_current, old_energy);

		if(isMineral)
		{
			return "mineral";
		}
		return "dirt";
	}

	window.addEventListener("resize", resize);
	resize();
});

/* exported upgrade_shovel */
function upgrade_shovel(scene, player)
{
	if(minerals >= 50 && shovel.level < 3)
	{
		shovel.level++;
		shovel.dig_energy--;
		minerals -= 50;
	}
	restart_level(scene, player);
	return shovel;
}

/* exported upgrade_energy */
function upgrade_energy(scene, player)
{
	if(minerals >= 20)
	{
		scene.data.set("energy_max", (scene.data.values.energy_max + 10));
		scene.data.set("energy_current", (scene.data.values.energy_max + 10));
		const old_energy = scene.data.values.energy_current;
		setEnergy(scene, player, scene.data.values.energy_max, old_energy);
		minerals -= 20;
	}

	restart_level(scene, player);
	return scene.data.values.energy_max;
}

function restart_level(scene, player)
{
	if(scene.group_world !== undefined)
	{
		scene.group_world.destroy(true);
		delete scene.group_world;
	}
	bar.scaleX = 0;
	bar.x = 0;
	minerals = 0;
	scene.ui.mineral_display.setText(minerals);

	scene.group_world = scene.add.group();

	const level = new Level(randInt(40, 80), randInt(100, 140));
	level.generate(0.5, 0.1, 0.1);
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

			const tile = scene.add.image(index_col*SIZE_TILE, index_row*SIZE_TILE, "tiles", frame);
			scene.group_world.add(tile);
			tile.setOrigin(0, 0);
			tile.setDisplaySize(SIZE_TILE, SIZE_TILE);

			tile.flipX = flipped;

			row_images.push(tile);
		}

		level.images.push(row_images);
	}

	player.sprite.setOrigin(0.5, 1);
	player.sprite.setDisplaySize(20, 16);
	player.sprite.depth = 1;
	scene.cameras.main.startFollow(player.sprite);
	player.sprite.setPosition(132, 132);
	scene.data.set("player", player);
	scene.cameras.main.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);

	scene.data.set("level", level);

	bar = scene.add.graphics();
	bar.depth = 3;
	bar.fillStyle(0xebb134, 1);
	bar.displayOriginX = 16;
	bar.fillRect(16, 16, 200, 15);
	bar.setScrollFactor(0);

	const old_energy = scene.data.values.energy_current;
	scene.data.set("energy_current", (scene.data.values.energy_current && scene.data.values.energy_current > 0) ? scene.data.values.energy_current : scene.data.values.energy_max);
	setEnergy(scene, player, scene.data.values.energy_current, old_energy);

	scene.music.play();

	level.images_minerals = [];
	for(let index_gem = 0; index_gem < level.gems.length; ++index_gem)
	{
		const gem = level.gems[index_gem];
		const image = scene.add.image(gem.index_col*SIZE_TILE, gem.index_row*SIZE_TILE, "tiles", "mineral").setOrigin(0, 0).setDisplaySize(SIZE_TILE, SIZE_TILE);
		scene.group_world.add(image);
		level.images_minerals.push(image);
	}

	level.sprites_bugs = [];
	for(let index_bug = 0; index_bug < level.bugs.length; ++index_bug)
	{
		const bug = level.bugs[index_bug];
		const sprite = scene.add.sprite(bug.index_col*SIZE_TILE +SIZE_TILE/2, bug.index_row*SIZE_TILE + SIZE_TILE, "bug").setOrigin(0.5, 1).setDisplaySize(20, 16);
		sprite.anims.play("move");
		scene.group_world.add(sprite);
		level.sprites_bugs.push(sprite);
	}
}

function setEnergy(scene, player, energy, old_energy)
{
	if(energy <= 0)
	{
		restart_level(scene, player);
	}
	else
	{
		scene.ui.energy_display.setText("Energy: " + energy);
		bar.scaleX = scene.data.values.energy_current/scene.data.values.energy_max;
		bar.x += (scene.data.values.energy_max !== scene.data.values.energy_current) ? 16 * ((old_energy-energy)/scene.data.values.energy_max) : 0;
	}
}