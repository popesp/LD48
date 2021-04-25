const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const SIZE_TILE = 24;

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
let minerals = 0;


function getSurrounding(level, index_row, index_col)
{
	let surrounding = "";
	for(let index_row_check = index_row - 1; index_row_check <= index_row + 1; ++index_row_check)
		for(let index_col_check = index_col - 1; index_col_check <= index_col + 1; ++index_col_check)
			if(index_row_check < 0 || index_row_check >= level.height || index_col_check < 0 || index_col_check >= level.width)
				surrounding += "1";
			else
				surrounding += level.tiles[index_row_check][index_col_check];

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
					"assets/dude2.png",
					{frameWidth: 32, frameHeight: 32}
				);
				this.load.audio('music', 'assets/cavemusic.wav');
				this.load.image('button_home', 'assets/btn_home.png');
				this.load.image('button_bag', 'assets/btn_backpack.png');
				this.load.image('button_success', 'assets/btn_success.png');
				this.load.image('button_dirty', 'assets/btn_dirty.png');
				this.load.image('dialog', 'assets/dialog.png');
				this.load.image('bag', 'assets/bag.png');
				this.load.image('bag_close', 'assets/btn_close.png');
				this.load.image('item_slot', 'assets/item_slot.png');
				this.load.image('mineral_slot', 'assets/mineral_slot.png');
			},
			create: function()
			{
				level = generate(0.5, 0.1);
				music = this.sound.add('music');
				music.loop = true;
				music.play();

				let parent = this;
				let home_open = false;
				let bag_open = false;

				this.physics.world.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);

				player = this.physics.add.sprite(100, 200, "dude").setDisplaySize(32, 32).setOrigin(0.5, 1);
				player.setCollideWorldBounds(true);
				this.cameras.main.startFollow(player);
				this.cameras.main.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);

				const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
				const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

				this.input.gamepad.start();
				cursors = this.input.keyboard.createCursorKeys();

				platforms = this.physics.add.staticGroup();
				this.physics.add.collider(player, platforms);

				emitter = this.add.particles("tiles", "dirt").createEmitter({
					speed: {min: 20, max: 100},
					angle: {min: 200, max: 340},
					alpha: {start: 1, end: 0},
					scale: 3,
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 300
				});

				mineral_emitter = this.add.particles("tiles", "mineral").createEmitter({
					speed: {min: 20, max: 100},
					angle: {min: 200, max: 340},
					alpha: {start: 1, end: 0},
					scale: 3,
					blendMode: "NORMAL",
					on: false,
					lifespan: 1000,
					gravityY: 300
				});


				level.sprites = [];
				level.mineral_sprites = [];
				for(let index_row = 0; index_row < level.height; ++index_row)
				{
					const row = level.tiles[index_row];

					const row_sprites = [];
					for(let index_col = 0; index_col < level.width; ++index_col)
					{
						const t = map_tile[getSurrounding(level, index_row, index_col)];


						const tile = platforms.create(index_col*SIZE_TILE, index_row*SIZE_TILE, "tiles", t === undefined ? "void" : t.frame).setSize(SIZE_TILE, SIZE_TILE).setDisplaySize(SIZE_TILE, SIZE_TILE);
						tile.setOrigin(0, 0);
						tile.body.updateFromGameObject();

						if(t === undefined)
							tile.body.enable = false;
						else if(t.flipped)
							tile.flipX = true;

						row_sprites.push(tile);
					}

					level.sprites.push(row_sprites);
				}
				console.log("player", player);

				for(let index_gem = 0; index_gem < level.gems.length; ++index_gem)
				{
					const gem = level.gems[index_gem];
					mineral_tile = platforms.create(gem.index_col*SIZE_TILE, gem.index_row*SIZE_TILE, "tiles", "mineral").setSize(SIZE_TILE, SIZE_TILE).setDisplaySize(SIZE_TILE, SIZE_TILE).setOrigin(0, 0);
					mineral_tile.body.updateFromGameObject();
					level.mineral_sprites.push(mineral_tile);
				}

				console.log("afer adding minerals", this);


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

				button_home = this.add.image(372, 23, "button_home").setInteractive();
				button_home.setScrollFactor(0);
				button_home.scale = 0.3;
				button_home.scaleY = button_home.scaleX;
				button_home.on("pointerup", function()
				{
					if(!home_open)
					{
						home_open = true;
						home_modal = parent.add.image(screenCenterX, screenCenterY, "dialog");
						home_modal.setScrollFactor(0);
						home_modal.scale = 0.8;
						confirm_text1 = parent.add.text(141, 120, "Are you sure you", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
						confirm_text2 = parent.add.text(128, 135, "want to return home?", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);

						button_yes = parent.add.image(162, 178, "button_success").setInteractive();
						yes_text = parent.add.text(151, 170, "YES", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
						button_yes.setScrollFactor(0);
						button_yes.scale = 0.3;
						button_yes.scaleY = button_home.scaleX;
						button_no = parent.add.image(240, 178, "button_dirty").setInteractive();
						no_text = parent.add.text(233, 170, "NO", {fontSize: "12px", fill: "#000"}).setScrollFactor(0);
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

				button_bag = this.add.image(330, 23, "button_bag").setInteractive();
				button_bag.setScrollFactor(0);
				button_bag.scale = 0.3;
				button_bag.scaleY = button_home.scaleX;
				button_bag.on("pointerup", function()
				{
					if(!bag_open)
					{
						bag_open = true;
						bag = parent.add.image(screenCenterX, screenCenterY, "bag");
						bag.setScrollFactor(0);
						bag.scale = 0.75;

						bag_close = parent.add.image(screenCenterX, screenCenterY + 50, "bag_close").setInteractive();
						bag_close.setScrollFactor(0);
						bag_close.scale = 0.2;

						slots = [];
						items = [];

						for(let grid_index = 1; grid_index <= 6; grid_index++)
						{
							if(grid_index <= 3)
							{
								//first row
								xsubtract = 30 * grid_index;
								ysubtract = 20;
								item_slot = parent.add.image((screenCenterX + 60) - xsubtract, screenCenterY - ysubtract, "item_slot");
								item_slot.setScrollFactor(0);
								item_slot.scale = 0.3;
								slots.push(item_slot);
								if(grid_index === 3)
								{
									mineral_slot = parent.add.image((screenCenterX + 60) - xsubtract, screenCenterY - ysubtract, "mineral_slot");
									mineral_slot.setScrollFactor(0);
									mineral_slot.scale = 0.3;
									mineral_count = parent.add.text((screenCenterX + 60) - xsubtract + 5, screenCenterY - ysubtract - 12, minerals, {fontSize: "10px", fill: "#fff"});
									mineral_count.setScrollFactor(0);
									items.push(mineral_slot);
									items.push(mineral_count)
								}
							}
							else
							{
								//second row
								xsubtract = 30 * grid_index;
								ysubtract = -15;
								item_slot = parent.add.image((screenCenterX + 150) - xsubtract, screenCenterY - ysubtract, "item_slot");
								item_slot.setScrollFactor(0);
								item_slot.scale = 0.3;
								slots.push(item_slot);
							}
						}

						bag_close.on("pointerup", function()
						{
							bag.destroy();
							bag_close.destroy();
							slots.forEach(slot => slot.destroy());
							slots = [];
							items.forEach(slot => slot.destroy());
							items = [];
							bag_open = false;
						});
					}
				});


				this.anims.create({
					key: "left",
					frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 6}),
					frameRate: 10,
					repeat: -1
				});

				this.anims.create({
					key: "turn",
					frames: [{key: "dude", frame: 7}],
					frameRate: 20
				});

				this.anims.create({
					key: "right",
					frames: this.anims.generateFrameNumbers("dude", {start: 8, end: 13}),
					frameRate: 10,
					repeat: -1
				});
			},
			update: function()
			{
				const gamepad = this.input.gamepad.gamepads[0];

				const left = cursors.left.isDown || (gamepad && (gamepad.left || gamepad.leftStick.x < -0.1));
				const right = cursors.right.isDown || (gamepad && (gamepad.right || gamepad.leftStick.x > 0.1));
				const down = cursors.down.isDown || (gamepad && (gamepad.down || gamepad.leftStick.y > 0.1));
				const jump = cursors.up.isDown || (gamepad && gamepad.A);

				if(left)
				{
					player.setVelocityX(-160);

					player.anims.play("left", true);
					if(player.body.touching.down && energy_current > 0)
					{
						const index_row = Math.floor(player.y/SIZE_TILE) - 1;
						const index_col = Math.floor(player.x/SIZE_TILE) - 1;

						dig(level, emitter, mineral_emitter, index_row, index_col);
					}
				}
				else if(right)
				{
					player.setVelocityX(160);
					player.anims.play("right", true);

					if(player.body.touching.down && energy_current > 0)
					{
						const index_row = Math.floor(player.y/SIZE_TILE) - 1;
						const index_col = Math.floor(player.x/SIZE_TILE) + 1;

						dig(level, emitter, mineral_emitter, index_row, index_col);
					}
				}
				else
				{
					player.setVelocityX(0);

					player.anims.play("turn");
				}

				if(jump && player.body.touching.down)
				{
					player.setVelocityY(-180);
				}

				if(down && player.body.touching.down && energy_current > 0)
				{
					const index_row = Math.floor(player.y/SIZE_TILE);
					const index_col = Math.floor(player.x/SIZE_TILE);

					dig(level, emitter, mineral_emitter, index_row, index_col);
				}
			}
		}
	});

	function dig(level, emitter, mineral_emitter, index_row, index_col)
	{
		if(index_row < 0 || index_row >= level.height || index_col < 0 || index_col >= level.width)
			return;

		if(!level.tiles[index_row][index_col])
			return;

		const sprite = level.sprites[index_row][index_col];
		level.tiles[index_row][index_col] = 0;
		sprite.setFrame("void");
		sprite.body.enable = false;
		emitter.explode(20, sprite.x + SIZE_TILE/2, sprite.y + SIZE_TILE/2);


		for(let index_row_check = index_row - 1; index_row_check <= index_row + 1; ++index_row_check)
			for(let index_col_check = index_col - 1; index_col_check <= index_col + 1; ++index_col_check)
			{
				if(index_row_check < 0 || index_row_check >= level.height || index_col_check < 0 || index_col_check >= level.width)
					continue;

				const surrounding = getSurrounding(level, index_row_check, index_col_check);
				const t = map_tile[surrounding];
				const s = level.sprites[index_row_check][index_col_check];

				if(t !== undefined)
				{
					s.setFrame(t.frame);
					s.flipX = t.flipped;
				}
			}

		for(let index_gem = 0; index_gem < level.gems.length; ++index_gem)
		{
			const gem = level.gems[index_gem];
			if(gem.index_col === index_col && gem.index_row === index_row)
			{
				const mineral_sprite = level.mineral_sprites[index_gem];
				level.tiles[index_row][index_col] = 0;
				mineral_sprite.setFrame("void");
				mineral_sprite.body.enable = false;
				mineral_emitter.explode(20, mineral_sprite.x + SIZE_TILE/2, mineral_sprite.y + SIZE_TILE/2);

				minerals += 10;
			}
		}

		// energy_current --;
		// energy_display.setText( 'Energy:' + energy_current);
		// bar.scaleX = energy_current/energy_max;
		// //x offset
		// bar.x += 16 * (1/energy_max);

	}

	window.addEventListener("resize", resize);
	resize();
});