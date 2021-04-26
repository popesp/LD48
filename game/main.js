/* global randFloat, randInt, Level*/


const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const WIDTH_PLAYER = 10;
const HEIGHT_PLAYER = 14;

const SIZE_TILE = 16;
const EPSILON = 0.00000000001;
const COOLDOWN_DIG = 30;
const COOLDOWN_EAT = 20;
const MENU_SPACING = 40;

const BUG_REJUVENATION = 3;

// PHYSICS
const JUMPSPEED = 3.4;
const JUMPSPEED_CANCEL = 1.2;
const JUMPSPEED_DOUBLE = 2.8;
const RUN_ACCEL = 0.3;
const RUN_DECEL = 0.3;
const MAX_SPEED = 2.4;
const GRAVITY = 0.15;
const FALL_DMG_THRESHOLD = 6;

//PLAYER VARIABLES
const STAMINA_MAX = 5;

const player = {
	level: 1,
	damage: 0,
	stamina_max: STAMINA_MAX,
	canDoubleJump: false,
	minerals: 0,
	shovel: {
		level: 1,
		dig_stamina: 3
	},
	input: {
		jump: false,
		dig: false
	}
};

let pressReset = false;

const shop = {
	index_selected: 0,
	items: [
		{
			key: "max_stamina",
			name: "Maximum stamina +2",
			curr_quantity: 4,
			price: 10,
			purchase: function(player, item)
			{
				player.stamina_max += 3;
				item.price += 20;
			}
		},
		{
			key: "double_jump",
			name: "Double jump",
			curr_quantity: 1,
			price: 100,
			purchase: function(player)
			{
				player.canDoubleJump = true;
			}
		},
		{
			key: "shovel",
			name: "Shovel upgrade",
			curr_quantity: 2,
			price: 10,
			purchase: function(player)
			{
				player.shovel.level++;
				player.shovel.dig_stamina--;
			}
		},
		{
			key: "descend",
			name: "Descend"
		}
	]
};

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

function handleCollision(scene)
{
	const player = scene.player;
	const level = scene.level;

	function collideTile(index_row, index_col)
	{
		const y_top = index_row*SIZE_TILE;
		const y_bottom = y_top + SIZE_TILE;
		const x_left = index_col*SIZE_TILE;
		const x_right = x_left + SIZE_TILE;

		if(player.sprite.y - EPSILON > y_top && player.y_old - EPSILON <= y_top)
		{
			player.sprite.y = y_top;

			if(player.yvel > FALL_DMG_THRESHOLD)
			{
				player.damage = Math.ceil((player.yvel - FALL_DMG_THRESHOLD)*2);

				scene.tweens.addCounter({
					duration: 75,
					onUpdate: function()
					{
						player.sprite.setTintFill(0xFFFFFF);
					},
					onComplete: function()
					{
						player.sprite.clearTint();
					}
				});
			}

			player.yvel = 0;
			player.falling = false;
			player.djumped = false;
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
				surrounding += level.tiles[index_row_check][index_col_check] === 1 ? 1 : 0;

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
		scene: [
			{
				key: "title",
				preload: function()
				{
					this.load.spritesheet("dude",
						"assets/dude3.png",
						{frameWidth: 20, frameHeight: 16}
					);

					this.load.audio("shoptheme", "assets/soundfx/shoptheme.wav");
				},
				create: function()
				{
					const scene = this;
					const title_text = scene.add.text(0, 24, "GOING DEEP...", {fontFamily: "nightie", fontSize: "27px", fixedWidth: scene.game.canvas.width, fixedHeight: 32, align: "center"}).setOrigin(0, 0);
					const start_text = scene.add.text(0, 200, "Start Game", {fontFamily: "nightie", fontSize: "27px", fixedWidth: scene.game.canvas.width, fixedHeight: 32, align: "center"}).setOrigin(0, 0);
					const credit_text = scene.add.text(0, 250, "By: Shawn, Dan, Vishnu", {fontFamily: "nightie", fontSize: "15px", fixedWidth: scene.game.canvas.width, fixedHeight: 32, align: "center"}).setOrigin(0, 0);
					const sprite = scene.add.sprite(scene.game.canvas.width/2, scene.game.canvas.height/2, "dude").setOrigin(0.5, 1).setDisplaySize(80, 64).setDepth(2);

					scene.anims.create({
						key: "idle",
						frames: scene.anims.generateFrameNumbers("dude", {start: 12, end: 27}),
						frameRate: 10,
						repeat: -1
					});

					scene.music = scene.sound.add("shoptheme");
					scene.music.loop = true;
					scene.music.play();

					sprite.play("idle");

					start_text.setInteractive({useHandCursor: true});
					start_text.on("pointerup", function()
					{
						title_text.destroy();
						start_text.destroy();
						credit_text.destroy();
						game.scene.stop("title");
						scene.music.stop();
						game.scene.start("main");
					});
					scene.input.keyboard.on("keydown", function()
					{
						title_text.destroy();
						start_text.destroy();
						credit_text.destroy();
						game.scene.stop("title");
						scene.music.stop();
						game.scene.start("main");
					});
				},
				update: function()
				{
				}
			},
			{
				key: "main",
				preload: function()
				{
					this.load.atlas("tiles", "assets/tiles-extruded.png", "assets/tiles-extruded.json");
					this.load.atlas("doors", "assets/doors-extruded.png", "assets/doors-extruded.json");

					this.load.spritesheet("dude",
						"assets/dude3.png",
						{frameWidth: 20, frameHeight: 16}
					);
					this.load.spritesheet("bug",
						"assets/bug.png",
						{frameWidth: 20, frameHeight: 16}
					);

					// this.load.image("button_home", "assets/btn_home.png");
					// this.load.image("button_bag", "assets/btn_backpack.png");
					// this.load.image("button_success", "assets/btn_success.png");
					// this.load.image("button_dirty", "assets/btn_dirty.png");
					// this.load.image("dialog", "assets/dialog.png");
					// this.load.image("bag", "assets/bag.png");
					// this.load.image("bag_close", "assets/btn_close.png");
					// this.load.image("item_slot", "assets/item_slot.png");
					this.load.image("mineral_slot", "assets/mineral_slot.png");

					this.load.audio("music", "assets/soundfx/cavemusic.wav");
					this.load.audio("dig_dirt", "assets/soundfx/dig.wav");
					this.load.audio("dig_mineral", "assets/soundfx/dig-gold.wav");
					this.load.audio("munch", "assets/soundfx/eating-notdan.wav");


				},

				create: function()
				{
					const scene = this;

					scene.music = scene.sound.add("music");
					scene.music.loop = true;

					scene.sound.add("dig_dirt");
					scene.sound.add("dig_mineral");
					scene.sound.add("munch");

					scene.player = player;
					player.stamina = player.stamina_max;
					player.facing = "right";
					player.sprite = scene.add.sprite(0, 0, "dude").setOrigin(0.5, 1).setDisplaySize(20, 16).setDepth(1);

					scene.ui = {
						bar_bg: scene.add.graphics().fillStyle(0xcc2418, 1).fillRect(0, 0, 204, 19).setPosition(14, 14),
						bar: scene.add.graphics().fillStyle(0xebb134, 1).fillRect(0, 0, 200, 15).setPosition(16, 16),
						mineral_icon: scene.add.image(240, 20, "mineral_slot").setScale(0.3),
						stamina_display: scene.add.text(84, 16, "Stamina:" + STAMINA_MAX, {fontSize: "12px", fill: "#000"}),
						mineral_display: scene.add.text(240, 8, player.minerals, {fontSize: "12px", fill: "#fff", stroke: "#000", strokeThickness: 1}),
						// button_home: scene.add.image(372, 23, "button_home").setInteractive().setScale(0.3),
						text_level: scene.add.text(16, 276, "Level " + player.level, {fontSize: "14px", fill: "#ffffff"})
					};

					// const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width/2;
					// const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height/2;

					// scene.ui.button_home.on("pointerup", function()
					// {
					// 	if(!home_open)
					// 	{
					// 		home_open = true;
					// 		const home_modal = parent.add.image(screenCenterX, screenCenterY, "dialog");
					// 		home_modal.depth = 4;
					// 		home_modal.setScrollFactor(0);
					// 		home_modal.scale = 0.8;
					// 		const confirm_text1 = parent.add.text(140, 105, "Are you sure you", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
					// 		const confirm_text2 = parent.add.text(148, 120, "want to return", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
					// 		const confirm_text3 = parent.add.text(145, 135, "to the surface?", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
					// 		confirm_text1.depth = 4;
					// 		confirm_text2.depth = 4;
					// 		confirm_text3.depth = 4;

					// 		const button_yes = parent.add.image(162, 178, "button_success").setInteractive();
					// 		const yes_text = parent.add.text(151, 170, "YES", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
					// 		button_yes.setScrollFactor(0);
					// 		button_yes.setScale(0.3);
					// 		button_yes.depth = 4;
					// 		yes_text.depth = 4;

					// 		const button_no = parent.add.image(240, 178, "button_dirty").setInteractive();
					// 		const no_text = parent.add.text(233, 170, "NO", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
					// 		button_no.setScrollFactor(0);
					// 		button_no.setScale(0.3);
					// 		button_no.depth = 4;
					// 		no_text.depth = 4;

					// 		button_yes.on("pointerup", function()
					// 		{
					// 			home_modal.destroy();
					// 			confirm_text1.destroy();
					// 			confirm_text2.destroy();
					// 			confirm_text3.destroy();
					// 			yes_text.destroy();
					// 			button_yes.destroy();
					// 			button_no.destroy();
					// 			no_text.destroy();
					// 			home_open = false;
					// 			scene.music.stop();
					// 			game.scene.stop("main");
					// 			game.scene.start("shop");
					// 		});

					// 		button_no.on("pointerup", function()
					// 		{
					// 			home_modal.destroy();
					// 			confirm_text1.destroy();
					// 			confirm_text2.destroy();
					// 			confirm_text3.destroy();
					// 			yes_text.destroy();
					// 			button_yes.destroy();
					// 			button_no.destroy();
					// 			no_text.destroy();
					// 			home_open = false;
					// 		});
					// 	}
					// });

					// const button_bag = scene.add.image(330, 23, "button_bag").setInteractive();
					// button_bag.setScrollFactor(0);
					// button_bag.scale = 0.3;
					// button_bag.scaleY = button_home.scaleX;
					// button_bag.depth = 4;
					// button_bag.on("pointerup", function()
					// {
					// 	if(!bag_open)
					// 	{
					// 		bag_open = true;
					// 		const bag = parent.add.image(screenCenterX, screenCenterY, "bag");
					// 		bag.setScrollFactor(0);
					// 		bag.scale = 0.75;
					// 		bag.depth = 4;

					// 		const bag_close = parent.add.image(screenCenterX, screenCenterY + 50, "bag_close").setInteractive();
					// 		bag_close.setScrollFactor(0);
					// 		bag_close.scale = 0.2;
					// 		bag_close.depth = 4;

					// 		const slots = [];
					// 		for(let grid_index = 1; grid_index <= 6; grid_index++)
					// 		{
					// 			if(grid_index <= 3)
					// 			{
					// 				// first row
					// 				const item_slot = parent.add.image((screenCenterX + 60) - 30*grid_index, screenCenterY - 20, "item_slot");
					// 				item_slot.setScrollFactor(0);
					// 				item_slot.scale = 0.3;
					// 				item_slot.depth = 4;
					// 				slots.push(item_slot);

					// 			}
					// 			else
					// 			{
					// 				// second row
					// 				const item_slot = parent.add.image((screenCenterX + 150) - 30*grid_index, screenCenterY + 15, "item_slot");
					// 				item_slot.setScrollFactor(0);
					// 				item_slot.scale = 0.3;
					// 				item_slot.depth = 4;
					// 				slots.push(item_slot);
					// 			}
					// 		}

					// 		bag_close.on("pointerup", function()
					// 		{
					// 			bag.destroy();
					// 			bag_close.destroy();
					// 			slots.forEach(function(slot)
					// 			{
					// 				slot.destroy();
					// 			});
					// 			bag_open = false;
					// 		});
					// 	}
					// });
					for(const key_object in scene.ui)
						scene.ui[key_object].setScrollFactor(0).setDepth(4);

					// const parent = scene;
					// let home_open = false;
					// let bag_open = false;

					scene.input.gamepad.start();
					scene.cursors = scene.input.keyboard.addKeys("UP,LEFT,DOWN,RIGHT,W,A,S,D,R,SPACE");

					scene.anims.create({
						key: "turn",
						frames: [{key: "dude", frame: 5}],
						frameRate: 10
					});

					scene.anims.create({
						key: "run",
						frames: scene.anims.generateFrameNumbers("dude", {start: 0, end: 4}),
						frameRate: 10,
						repeat: -1
					});

					scene.anims.create({
						key: "dig",
						frames: scene.anims.generateFrameNumbers("dude", {start: 6, end: 11}),
						frameRate: 20
					});

					scene.anims.create({
						key: "idle",
						frames: scene.anims.generateFrameNumbers("dude", {start: 12, end: 27}),
						frameRate: 10,
						repeat: -1
					});

					scene.anims.create({
						key: "jump",
						frames: scene.anims.generateFrameNumbers("dude", {start: 28, end: 31}),
						frameRate: 10
					});

					scene.anims.create({
						key: "fall",
						frames: scene.anims.generateFrameNumbers("dude", {start: 32, end: 35}),
						frameRate: 10,
						repeat: -1
					});

					scene.anims.create({
						key: "die",
						frames: scene.anims.generateFrameNumbers("dude", {start: 36, end: 38}),
						frameRate: 2
					});

					scene.anims.create({
						key: "eat",
						frames: scene.anims.generateFrameNumbers("dude", {start: 39, end: 41}),
						frameRate: 10
					});

					scene.anims.create({
						key: "move",
						frames: scene.anims.generateFrameNumbers("bug", {start: 0, end: 9}),
						frameRate: 10,
						repeat: -1
					});

					scene.emitter_dirt = scene.add.particles("tiles", "morsel_dirt").createEmitter({
						speed: {min: 20, max: 100},
						angle: {min: 200, max: 340},
						alpha: {start: 1, end: 0},
						scale: 3,
						blendMode: "NORMAL",
						on: false,
						lifespan: 1000,
						gravityY: 300
					});

					scene.emitter_mineral = scene.add.particles("tiles", "morsel_gold").createEmitter({
						speed: {min: 20, max: 100},
						angle: {min: 200, max: 340},
						alpha: {start: 1, end: 0},
						scale: 3,
						blendMode: "NORMAL",
						on: false,
						lifespan: 1000,
						gravityY: 300
					});

					scene.emitter_dust = scene.add.particles("tiles", "morsel_dirt").createEmitter({
						speedY: {min: -20, max: -10},
						alpha: {start: 1, end: 0},
						scale: {start: 2, end: 5},
						blendMode: "NORMAL",
						on: false,
						lifespan: 1000,
						gravityY: 20
					});

					restart_level(scene);
				},

				update: function()
				{
					const scene = this;

					const gamepad = scene.input.gamepad.gamepads[0];

					const left = scene.cursors.A.isDown || scene.cursors.LEFT.isDown || (gamepad && (gamepad.left || gamepad.leftStick.x < -0.1));
					const right = scene.cursors.D.isDown || scene.cursors.RIGHT.isDown || (gamepad && (gamepad.right || gamepad.leftStick.x > 0.1));
					const jump = scene.cursors.W.isDown || scene.cursors.UP.isDown || (gamepad && gamepad.A);
					const action = scene.cursors.SPACE.isDown || (gamepad && gamepad.X);
					const reset = scene.cursors.R.isDown; // TODO(shawn): gamepad binding

					const player = scene.player;
					const level = scene.level;

					function dig(level, scene, index_row, index_col)
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
									if(t.frame === "solid")
									{
										const r = randFloat(0, 1);
										s.setFrame("solid" + (r < 0.9 ? 0 : (r < 0.95 ? 1 : 2)));
									}
									else
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
								let mineral_amount = 0;
								if(gem.mineral_type === 0)
									mineral_amount = 10;
								else if(gem.mineral_type === 1)
									mineral_amount = 8;
								else if(gem.mineral_type === 2)
									mineral_amount = 6;

								setMinerals(scene, player.minerals + mineral_amount);
							}
						}

						// particles
						const x_particle = image.x + SIZE_TILE/2;
						const y_particle = image.y + SIZE_TILE/2;
						if(isMineral)
						{
							scene.sound.play("dig_mineral");
							scene.emitter_dirt.explode(10, x_particle, y_particle);
							scene.emitter_mineral.explode(10, x_particle, y_particle);
						}
						else
						{
							scene.sound.play("dig_dirt");
							scene.emitter_dirt.explode(20, x_particle, y_particle);
						}

						setStamina(scene, scene.player.stamina - 1);

						return true;
					}
					if(player.dead)
					{
						if(action)
						{
							setLevel(scene, 1);
							setMinerals(scene, 0);
							restart_level(scene);
						}
					}
					else
					{
						//shawns a nerd
						if(jump)
						{
							if(!player.input.jump)
							{
								if(player.falling)
								{
									if(player.canDoubleJump && !player.djumped)
									{
										player.sprite.anims.play("jump", true);
										player.yvel = -JUMPSPEED_DOUBLE;
										player.djumped = true;

										const vel = player.xvel*5;
										scene.emitter_dust.setSpeedX({min: vel - 10, max: vel + 10});
										scene.emitter_dust.explode(10, player.sprite.x, player.sprite.y);
									}
								}
								else
								{

									player.yvel = -JUMPSPEED;
									player.falling = true;
									player.sprite.anims.play("jump", true);
									const vel = player.xvel*5;
									scene.emitter_dust.setSpeedX({min: vel - 10, max: vel + 10});
									scene.emitter_dust.explode(10, player.sprite.x, player.sprite.y);
								}
							}

							player.input.jump = true;
						}
						else
						{
							if(player.falling)
							{
								if(!player.cooldown_eat)
								{
									player.sprite.anims.play("fall", true);
								}
								player.yvel = Math.max(player.yvel, -JUMPSPEED_CANCEL);
							}

							player.input.jump = false;
						}

						if(left === right)
						{
							if(!player.falling && !player.cooldown_dig && !player.cooldown_eat)
								player.sprite.anims.play("idle", true);

							if(player.xvel > 0)
								player.xvel = Math.max(0, player.xvel - RUN_DECEL);
							else
								player.xvel = Math.min(0, player.xvel + RUN_DECEL);
						}
						else if(left)
						{
							if(player.xvel > 0 && !player.falling)
								scene.emitter_dust.emitParticle(1, player.sprite.x, player.sprite.y);

							player.xvel = Math.max(-MAX_SPEED, player.xvel - RUN_ACCEL);
							if(!player.falling && !player.cooldown_dig && !player.cooldown_eat)
								player.sprite.anims.play("run", true);

							player.facing = "left";
							player.sprite.flipX = true;
						}
						else if(right)
						{
							if(player.xvel < 0 && !player.falling)
								scene.emitter_dust.emitParticle(1, player.sprite.x, player.sprite.y);

							player.xvel = Math.min(MAX_SPEED, player.xvel + RUN_ACCEL);
							if(!player.falling && !player.cooldown_dig && !player.cooldown_eat)
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

						handleCollision(scene);

						if(reset)
						{
							if(!pressReset)
							{
								setLevel(scene, 1);
								setMinerals(scene, 0);
								restart_level(scene);
							}

							pressReset = true;
						}
						else
							pressReset = false;

						// player coordinates
						const index_row = Math.floor((player.sprite.y - EPSILON)/SIZE_TILE);
						const index_col = Math.floor(player.sprite.x/SIZE_TILE);

						for(let index_bug = 0; index_bug < level.bugs.length; ++index_bug)
						{
							const bug = level.bugs[index_bug];

							if((bug.index_row === index_row && bug.index_col === index_col) && !bug.collected)
							{
								//xxx
								bug.collected = true;
								player.sprite.anims.play("eat");
								this.sound.play("munch");
								player.cooldown_eat = COOLDOWN_EAT;
								level.sprites_bugs[index_bug].destroy();
								setStamina(scene, player.stamina + BUG_REJUVENATION);
							}
						}

						const index_col_left = Math.floor((player.sprite.x - WIDTH_PLAYER/2)/SIZE_TILE);
						const index_col_right = Math.floor((player.sprite.x + WIDTH_PLAYER/2 - EPSILON)/SIZE_TILE);
						if(!level.tiles[index_row + 1][index_col_left] && !level.tiles[index_row + 1][index_col_right])
							player.falling = true;

						if(player.cooldown_dig > 0)
							--player.cooldown_dig;
						if(player.cooldown_eat > 0)
							--player.cooldown_eat;

						if(action)
						{
							if(!player.input.dig)
							{
								if(index_row === level.coord_exit.index_row && index_col === level.coord_exit.index_col)
								{
									setLevel(scene, player.level + 1);
									scene.music.stop();
									game.scene.stop("main");
									game.scene.start("shop");
								}
								else if(!player.falling && player.stamina > 0)
								{
									const index_col_facing = index_col + (player.facing === "right" ? 1 : -1);

									if(dig(level, scene, index_row + (level.tiles[index_row][index_col_facing] ? 0 : 1), index_col_facing))
									{
										player.cooldown_dig = COOLDOWN_DIG;
										player.sprite.anims.play("dig");
									}
								}
							}

							player.input.dig = true;
						}
						else
							player.input.dig = false;

						if(player.damage > 0)
						{
							setStamina(scene, player.stamina - player.damage);
							player.damage = 0;
						}
					}
				}
			},
			{
			//buttz
				key: "shop",
				preload: function()
				{
					this.load.image("mineral_slot", "assets/mineral_slot.png");
					this.load.audio("dig_dirt", "assets/soundfx/dig.wav");
					this.load.audio("upgrade", "assets/soundfx/upgrade.wav");
					this.load.audio("clink", "assets/soundfx/dig-clink.wav");
					this.load.audio("shoptheme", "assets/soundfx/shoptheme.wav");
				},

				create: function()
				{
					const scene = this;

					scene.music = scene.sound.add("shoptheme");
					scene.music.loop = true;
					scene.music.play();

					scene.sound.add("dig_dirt");
					scene.sound.add("upgrade");
					scene.sound.add("clink");

					scene.input.gamepad.start();
					scene.cursors = scene.input.keyboard.addKeys("UP,LEFT,DOWN,RIGHT,W,A,S,D,R,SPACE");

					scene.player = player;
					scene.shop = shop;
					scene.shop.index_selected = 0;
					scene.state = {
						up: false,
						down: false,
						action: false
					};

					scene.ui = {
						title: scene.add.text(200, 60, "SURFACE SHOP", {fontSize: "32px", fill: "#ba9756"}).setOrigin(0.5),
						mineral_icon: scene.add.image(200, 20, "mineral_slot").setScale(0.3),
						mineral_display: scene.add.text(200, 8, scene.player.minerals, {fontSize: "12px", fill: "#fff", stroke: "#000", strokeThickness: 1})
					};

					for(let index_item = 0; index_item < shop.items.length; ++index_item)
					{
						const item = shop.items[index_item];

						if(item.key !== "descend")
						{
							scene.add.rectangle(200, 112 + index_item*MENU_SPACING, 300, 25, 0x4788ad).setOrigin(0.5);
							scene.ui["item_" + item.key] = scene.add.text(60, 105 + index_item*MENU_SPACING, item.curr_quantity + " | ", {fontSize: "12px", fill: "#fff"});
							scene.ui["item_" + item.key] = scene.add.text(200, 112 + index_item*MENU_SPACING, item.name, {fontSize: "12px", fill: "#fff"}).setOrigin(0.5);
							scene.ui["item_" + item.key] = scene.add.text(290, 105 + index_item*MENU_SPACING, " | " + item.price + "g", {fontSize: "12px", fill: "#fff"});
						}
						else
						{
							scene.add.rectangle(200, 110 + index_item*MENU_SPACING, 300, 25, 0xc940406).setOrigin(0.5);
							scene.ui["item_" + item.key] = scene.add.text(200, 112 + index_item*MENU_SPACING, item.name, {fontSize: "12px", fill: "#fff"}).setOrigin(0.5);
						}
						scene.ui["outline_" + item.key] = scene.add.graphics().lineStyle(2, 0xffffff, 1.0).strokeRect(50, 100 + index_item*MENU_SPACING, 300, 25);
					}
					scene.ui.outline_selection = scene.add.graphics().lineStyle(4, 0xba9756, 1.0).strokeRect(0, 0, 300, 26);
					scene.ui.outline_selection.setPosition(50, 100 + shop.index_selected*MENU_SPACING);

					for(const key_object in scene.ui)
						scene.ui[key_object].setScrollFactor(0).setDepth(4);
				},

				update: function()
				{
					const scene = this;

					const gamepad = scene.input.gamepad.gamepads[0];

					const down = scene.cursors.S.isDown || scene.cursors.DOWN.isDown || (gamepad && (gamepad.down || gamepad.leftStick.y < -0.1));
					const up = scene.cursors.W.isDown || scene.cursors.UP.isDown || (gamepad && (gamepad.up || gamepad.leftStick.y < 0.1));
					const action = scene.cursors.SPACE.isDown || (gamepad && gamepad.A);

					const shop = scene.shop;

					function select()
					{
						scene.ui.outline_selection.setPosition(50, 100 + shop.index_selected*MENU_SPACING);
						scene.sound.play("dig_dirt");
					}

					if(down)
					{
						if(!scene.state.down)
						{
							shop.index_selected = (shop.index_selected + 1);
							if(shop.index_selected >= shop.items.length)
								shop.index_selected = 0;

							select();
						}

						scene.state.down = true;
					}
					else
						scene.state.down = false;

					if(up)
					{
						if(!scene.state.up)
						{
							shop.index_selected = (shop.index_selected - 1);
							if(shop.index_selected < 0)
								shop.index_selected = shop.items.length - 1;

							select();
						}

						scene.state.up = true;
					}
					else
						scene.state.up = false;

					if(action)
					{
						if(!scene.state.action)
						{
							const item_selected = shop.items[shop.index_selected];

							if(item_selected.key === "descend")
							{
								scene.sound.play("upgrade");
								game.scene.stop("shop");
								scene.music.stop();
								game.scene.start("main");
							}
							else if(scene.player.minerals >= item_selected.price && item_selected.curr_quantity > 0)
							{
								setMinerals(scene, scene.player.minerals - item_selected.price);

								item_selected.purchase(scene.player, item_selected);

								item_selected.curr_quantity--;
								scene.ui["item_" + item_selected.key].setText(" | $" + item_selected.price);

								scene.sound.play("upgrade");
							}
							else
								scene.sound.play("clink");
						}

						scene.state.action = true;
					}
					else
						scene.state.action = false;
				}
			}
		]
	});

	window.addEventListener("resize", resize);
	resize();
});

function restart_level(scene)
{
	if(scene.group_world !== undefined)
	{
		scene.group_world.destroy(true);
		delete scene.group_world;
	}

	const player = scene.player;
	player.xvel = 0;
	player.yvel = 0;
	player.falling = true;
	player.input.jump = false;
	player.input.dig = false;
	player.cooldown_dig = 0;
	player.cooldown_eat = 0;
	player.dead = false;

	const density_cave = Math.min(0.5 + 0.01*player.level, 0.6);
	const density_bug = Math.max(0.03 - 0.0015*player.level, 0.02);
	const width = 40 + player.level*8;
	const height = 40 + player.level*10;

	const level = scene.level = new Level(randInt(Math.max(30, width - 10), width + 10), randInt(Math.max(30, height - 10), height + 10));
	level.generate(density_cave, 0.05, density_bug);

	scene.group_world = scene.add.group();

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
				if(t.frame === "solid")
				{
					const r = randFloat(0, 1);
					frame = "solid" + (r < 0.9 ? 0 : (r < 0.95 ? 1 : 2));
				}
				else
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

	const entrance = scene.add.image(level.coord_entrance.index_col*SIZE_TILE + SIZE_TILE/2, level.coord_entrance.index_row*SIZE_TILE + SIZE_TILE, "doors", "entrance");
	entrance.setOrigin(0.5, 1);
	entrance.setDisplaySize(SIZE_TILE*3, SIZE_TILE*2);
	entrance.setAlpha(0.7);
	scene.group_world.add(entrance);

	const exit = scene.add.image(level.coord_exit.index_col*SIZE_TILE + SIZE_TILE/2, level.coord_exit.index_row*SIZE_TILE + SIZE_TILE, "doors", "exit");
	exit.setOrigin(0.5, 1);
	exit.setDisplaySize(SIZE_TILE*3, SIZE_TILE*2);
	exit.setAlpha(0.7);
	scene.group_world.add(exit);

	player.sprite.setPosition(entrance.x, entrance.y);
	scene.cameras.main.startFollow(player.sprite);
	scene.cameras.main.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);
	scene.cameras.main.setZoom(1);

	setStamina(scene, player.stamina_max);

	if(!scene.music.isPlaying)
		scene.music.play();

	level.images_minerals = [];
	for(let index_gem = 0; index_gem < level.gems.length; ++index_gem)
	{
		const gem = level.gems[index_gem];
		const mineral_type = gem.mineral_type;
		const image = scene.add.image(gem.index_col*SIZE_TILE, gem.index_row*SIZE_TILE, "tiles", "mineral" + mineral_type).setOrigin(0, 0).setDisplaySize(SIZE_TILE, SIZE_TILE);
		image.flipX = !!randInt(0, 1);
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

function setStamina(scene, stamina)
{
	let stamina_new = stamina;

	if(stamina >= scene.player.stamina_max)
		stamina_new = scene.player.stamina_max;
	else if(stamina < 0)
		stamina_new = 0;

	scene.ui.stamina_display.setText("Stamina: " + stamina_new);
	scene.ui.bar.scaleX = stamina_new/scene.player.stamina_max;
	scene.player.stamina = stamina_new;
	if(stamina < 0)
	{
		// we ded
		scene.player.dead = true;
		scene.player.sprite.anims.play("die");
		scene.music.stop();
		scene.tweens.addCounter({
			from: 0,
			to: 1,
			duration: 1500,
			onUpdate: function(tween)
			{
				const val = Math.floor(255 - tween.getValue()*255);
				scene.group_world.setTint(Phaser.Display.Color.GetColor(val, val, val));
				scene.cameras.main.setZoom(1 + tween.getValue()*2);
			}
		});
	}
}

function setMinerals(scene, minerals)
{
	scene.player.minerals = minerals;
	scene.ui.mineral_display.setText(minerals);
}

function setLevel(scene, level)
{
	scene.player.level = level;
	scene.ui.text_level.setText("Level " + level);
}