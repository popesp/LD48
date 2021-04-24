const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const SIZE_TILE = 16;


const ID_EMPTY = 0;
const ID_DIRT = 1;

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
	"111010111": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"111010110": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"111010101": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"111010100": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"111010011": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"111010010": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"111010001": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"111010000": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"110111111": {frame: "corner", flipped: true},
	"110111110": {frame: "corner", flipped: true},
	"110111101": {frame: "corner", flipped: true}, // TODO(shawn): need corner + ceiling
	"110111100": {frame: "corner", flipped: true}, // TODO(shawn): need corner + ceiling
	"110111011": {frame: "corner", flipped: true},
	"110111010": {frame: "corner", flipped: true},
	"110111001": {frame: "corner", flipped: true}, // TODO(shawn): need corner + ceiling
	"110111000": {frame: "corner", flipped: true}, // TODO(shawn): need corner + ceiling
	"110110111": {frame: "wall", flipped: true},
	"110110110": {frame: "wall", flipped: true},
	"110110101": {frame: "overhang", flipped: true},
	"110110100": {frame: "overhang", flipped: true},
	"110110011": {frame: "wall", flipped: true},
	"110110010": {frame: "wall", flipped: true},
	"110110001": {frame: "overhang", flipped: true},
	"110110000": {frame: "overhang", flipped: true},
	"110011111": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"110011110": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"110011101": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"110011100": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"110011011": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"110011010": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"110011001": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"110011000": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"110010111": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"110010110": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"110010101": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"110010100": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"110010011": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"110010010": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"110010001": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"110010000": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"101111111": {frame: "floor", flipped: false},
	"101111110": {frame: "floor", flipped: false},
	"101111101": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"101111100": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"101111011": {frame: "floor", flipped: false},
	"101111010": {frame: "floor", flipped: false},
	"101111001": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"101111000": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"101110111": {frame: "edge", flipped: true},
	"101110110": {frame: "edge", flipped: true},
	"101110101": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"101110100": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"101110011": {frame: "edge", flipped: true},
	"101110010": {frame: "edge", flipped: true},
	"101110001": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"101110000": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"101011111": {frame: "edge", flipped: false},
	"101011110": {frame: "edge", flipped: false},
	"101011101": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"101011100": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"101011011": {frame: "edge", flipped: false},
	"101011010": {frame: "edge", flipped: false},
	"101011001": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"101011000": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"101010111": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"101010110": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"101010101": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"101010100": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"101010011": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"101010010": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"101010001": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"101010000": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"100111111": {frame: "floor", flipped: false},
	"100111110": {frame: "floor", flipped: false},
	"100111101": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"100111100": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"100111011": {frame: "floor", flipped: false},
	"100111010": {frame: "floor", flipped: false},
	"100111001": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"100111000": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"100110111": {frame: "edge", flipped: true},
	"100110110": {frame: "edge", flipped: true},
	"100110101": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"100110100": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"100110011": {frame: "edge", flipped: true},
	"100110010": {frame: "edge", flipped: true},
	"100110001": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"100110000": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"100011111": {frame: "edge", flipped: false},
	"100011110": {frame: "edge", flipped: false},
	"100011101": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"100011100": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"100011011": {frame: "edge", flipped: false},
	"100011010": {frame: "edge", flipped: false},
	"100011001": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"100011000": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"100010111": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"100010110": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"100010101": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"100010100": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"100010011": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"100010010": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"100010001": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"100010000": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"011111111": {frame: "corner", flipped: false},
	"011111110": {frame: "corner", flipped: false},
	"011111101": {frame: "corner", flipped: false}, // TODO(shawn): need corner + ceiling
	"011111100": {frame: "corner", flipped: false}, // TODO(shawn): need corner + ceiling
	"011111011": {frame: "corner", flipped: false},
	"011111010": {frame: "corner", flipped: false},
	"011111001": {frame: "corner", flipped: false}, // TODO(shawn): need corner + ceiling
	"011111000": {frame: "corner", flipped: false}, // TODO(shawn): need corner + ceiling
	"011110111": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"011110110": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"011110101": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"011110100": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"011110011": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"011110010": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"011110001": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"011110000": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"011011111": {frame: "wall", flipped: false},
	"011011110": {frame: "wall", flipped: false},
	"011011101": {frame: "overhang", flipped: false},
	"011011100": {frame: "overhang", flipped: false},
	"011011011": {frame: "wall", flipped: false},
	"011011010": {frame: "wall", flipped: false},
	"011011001": {frame: "overhang", flipped: false},
	"011011000": {frame: "overhang", flipped: false},
	"011010111": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"011010110": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"011010101": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"011010100": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"011010011": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"011010010": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"011010001": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"011010000": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"010111111": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner
	"010111110": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner
	"010111101": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner + ceiling
	"010111100": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner + ceiling
	"010111011": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner
	"010111010": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner
	"010111001": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner + ceiling
	"010111000": {frame: "corner", flipped: false}, // TODO(shawn): need double sided corner + ceiling
	"010110111": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"010110110": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"010110101": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"010110100": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"010110011": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"010110010": {frame: "wall", flipped: true}, // TODO(shawn): need corner + wall
	"010110001": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"010110000": {frame: "overhang", flipped: true}, // TODO(shawn): need corner + overhang
	"010011111": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"010011110": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"010011101": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"010011100": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"010011011": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"010011010": {frame: "wall", flipped: false}, // TODO(shawn): need corner + wall
	"010011001": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"010011000": {frame: "overhang", flipped: false}, // TODO(shawn): need corner + overhang
	"010010111": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"010010110": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"010010101": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"010010100": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"010010011": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"010010010": {frame: "wall", flipped: false}, // TODO(shawn): need double sided wall
	"010010001": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"010010000": {frame: "overhang", flipped: false}, // TODO(shawn): need double sided overhang
	"001111111": {frame: "floor", flipped: false},
	"001111110": {frame: "floor", flipped: false},
	"001111101": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"001111100": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"001111011": {frame: "floor", flipped: false},
	"001111010": {frame: "floor", flipped: false},
	"001111001": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"001111000": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"001110111": {frame: "edge", flipped: true},
	"001110110": {frame: "edge", flipped: true},
	"001110101": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"001110100": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"001110011": {frame: "edge", flipped: true},
	"001110010": {frame: "edge", flipped: true},
	"001110001": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"001110000": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"001011111": {frame: "edge", flipped: false},
	"001011110": {frame: "edge", flipped: false},
	"001011101": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"001011100": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"001011011": {frame: "edge", flipped: false},
	"001011010": {frame: "edge", flipped: false},
	"001011001": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"001011000": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"001010111": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"001010110": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"001010101": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"001010100": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"001010011": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"001010010": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"001010001": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"001010000": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"000111111": {frame: "floor", flipped: false},
	"000111110": {frame: "floor", flipped: false},
	"000111101": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"000111100": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"000111011": {frame: "floor", flipped: false},
	"000111010": {frame: "floor", flipped: false},
	"000111001": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"000111000": {frame: "floor", flipped: false}, // TODO(shawn): need floor + ceiling
	"000110111": {frame: "edge", flipped: true},
	"000110110": {frame: "edge", flipped: true},
	"000110101": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"000110100": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"000110011": {frame: "edge", flipped: true},
	"000110010": {frame: "edge", flipped: true},
	"000110001": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"000110000": {frame: "edge", flipped: true}, // TODO(shawn): need edge + overhang
	"000011111": {frame: "edge", flipped: false},
	"000011110": {frame: "edge", flipped: false},
	"000011101": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"000011100": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"000011011": {frame: "edge", flipped: false},
	"000011010": {frame: "edge", flipped: false},
	"000011001": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"000011000": {frame: "edge", flipped: false}, // TODO(shawn): need edge + overhang
	"000010111": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"000010110": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"000010101": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"000010100": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"000010011": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"000010010": {frame: "edge", flipped: false}, // TODO(shawn): need double sided edge
	"000010001": {frame: "edge", flipped: false}, // TODO(shawn): need weird floating thing
	"000010000": {frame: "edge", flipped: false} // TODO(shawn): need weird floating thing
};

var energy_current = 10;

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
		physics: {
			default: "arcade",
			arcade: {
				gravity: {
					y: 300
				},
				debug: false
			}
		},
		scene: {
			preload: function()
			{
				this.load.atlas("tiles", "assets/tiles.png", "assets/tiles.json");
				this.load.spritesheet("dude",
					"assets/dude.png",
					{frameWidth: 32, frameHeight: 48}
				);
			},
			create: function()
			{
				level = generate(0.5);
				this.physics.world.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);

				player = this.physics.add.sprite(100, 200, "dude").setDisplaySize(20, 30).setOrigin(0.5, 1);
				player.setCollideWorldBounds(true);
				this.cameras.main.startFollow(player);

				cursors = this.input.keyboard.createCursorKeys();
				platforms = this.physics.add.staticGroup();

				this.physics.add.collider(player, platforms);

				levelsprites = [];
				for(let index_row = 0; index_row < level.height; ++index_row)
				{
					const row = level.tiles[index_row];

					const rowsprites = [];
					for(let index_col = 0; index_col < level.width; ++index_col)
					{
						let surrounding = "";
						for(let index_row_check = index_row - 1; index_row_check <= index_row + 1; ++index_row_check)
							for(let index_col_check = index_col - 1; index_col_check <= index_col + 1; ++index_col_check)
								if(index_row_check < 0 || index_row_check >= level.height || index_col_check < 0 || index_col_check >= level.width)
									surrounding += "1";
								else
									surrounding += level.tiles[index_row_check][index_col_check];
						
						const t = map_tile[surrounding];

						let tile = null;
						if(t !== undefined)
						{
							tile = platforms.create(index_col*SIZE_TILE, index_row*SIZE_TILE, "tiles", t.frame).setSize(SIZE_TILE, SIZE_TILE).setDisplaySize(SIZE_TILE, SIZE_TILE);
							tile.setOrigin(0, 0);
							tile.body.updateFromGameObject();

							if(t.flipped)
								tile.flipX = true;
						}

						rowsprites.push(tile);
					}

					levelsprites.push(rowsprites);
				}
				bar = this.add.graphics();
				bar.fillStyle(0xebb134, 1);
				bar.fillRect(0, 0, 200, 15);
				energy_max = 10;
				energy_current = energy_max;
				energy_display = this.add.text(16, 16, 'Energy:' + energy_current, { fontSize: '12px', fill: '#000' });

				this.anims.create({
					key: "left",
					frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
					frameRate: 10,
					repeat: -1
				});

				this.anims.create({
					key: "turn",
					frames: [ { key: "dude", frame: 4 } ],
					frameRate: 20
				});

				this.anims.create({
					key: "right",
					frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
					frameRate: 10,
					repeat: -1
				});
			},
			update: function()
			{
				energy_display.x = player.body.position.x - WIDTH_CANVAS/8;
				energy_display.y = player.body.position.y - HEIGHT_CANVAS/5;
				bar.x = player.body.position.x - WIDTH_CANVAS/5;;
				bar.y = player.body.position.y - HEIGHT_CANVAS/5;

				const emitter = this.add.particles('dirt').createEmitter({
					speed: { min: -800, max: 800 },
					angle: { min: 0, max: 360 },
					scale: { start: 0.1, end: 0 },
					blendMode: 'SCREEN', //'NORMAL'
					on: false,
					lifespan: 600,
					gravityY: 800
				});

				if (cursors.left.isDown)
				{
					player.setVelocityX(-160);

					player.anims.play('left', true);
					if (player.body.touching.down && energy_current > 0)
					{
						// dig
						const sprite = levelsprites[Math.floor(player.y/SIZE_TILE-1)][Math.floor(player.x/SIZE_TILE)-1];
						if(sprite !== null)
						{
							dig(sprite)
							emitter.explode(20, player.x-SIZE_TILE, player.y-SIZE_TILE/2);
							levelsprites[Math.floor(player.y/SIZE_TILE)-1][Math.floor(player.x/SIZE_TILE)-1] = null;
						}
					}
				}
				else if (cursors.right.isDown)
				{
					player.setVelocityX(160);
					player.anims.play('right', true);

					if (player.body.touching.down && energy_current > 0)
					{
						const sprite = levelsprites[Math.floor(player.y/SIZE_TILE-1)][Math.floor(player.x/SIZE_TILE)+1];
						if(sprite !== null)
						{
							dig(sprite);
							emitter.explode(20, player.x+SIZE_TILE, player.y-SIZE_TILE/2);
							levelsprites[Math.floor(player.y/SIZE_TILE)-1][Math.floor(player.x/SIZE_TILE)+1] = null;
						}
					}
				}
				else
				{
					player.setVelocityX(0);

					player.anims.play("turn");
				}

				if (cursors.up.isDown && player.body.touching.down)
				{
					player.setVelocityY(-180);
				}

				if (cursors.down.isDown && player.body.touching.down && energy_current > 0)
				{
					const sprite = levelsprites[Math.floor(player.y/SIZE_TILE)][Math.floor(player.x/SIZE_TILE)];
					if(sprite !== null)
					{
						dig(sprite);
						emitter.explode(20, player.x, player.y+SIZE_TILE/2);
						levelsprites[Math.floor(player.y/SIZE_TILE)][Math.floor(player.x/SIZE_TILE)] = null;
					}
				}
			}
		}
	});
	
	function dig(sprite)
	{
		energy_current--;
		energy_display.setText( 'Energy:' + energy_current);
		bar.scaleX = energy_current/energy_max;
		sprite.destroy();
	}

	window.addEventListener("resize", resize);
	resize();
});