const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;

const SIZE_TILE = 20;


const ID_EMPTY = 0;
const ID_DIRT = 1;

document.addEventListener("DOMContentLoaded", function()
{
	const dom_container = document.getElementById("container");

	const game = new Phaser.Game({
		type: Phaser.AUTO,
		title: "LD48",
		parent: dom_container,
		width: WIDTH_CANVAS/2,
		height: HEIGHT_CANVAS/2,
		resolution: 5,
		backgroundColor: 0x0a0808,
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
				this.load.image("sky", "assets/sky.png");
				this.load.spritesheet('dude',
					'assets/dude.png',
					{frameWidth: 32, frameHeight: 48}
				);
				this.load.image("dirt", "assets/dirt.png");
			},
			create: function()
			{
				this.add.image(400, 300, "sky")

				level = generate(0.5);
				this.physics.world.setBounds(0, 0, level.width*SIZE_TILE, level.height*SIZE_TILE);
				player = this.physics.add.sprite(100, 200, 'dude').setDisplaySize(20, 30).setOrigin(0.5, 1);
				//console.log(player);
				player.setCollideWorldBounds(true);
				cursors = this.input.keyboard.createCursorKeys();
				platforms = this.physics.add.staticGroup();

				//console.log(this);
				this.cameras.main.startFollow(player);

				this.physics.add.collider(player, platforms);

				levelsprites = [];
				for(let index_row = 0; index_row < level.height; ++index_row)
				{
					const row = level.tiles[index_row];

					const rowsprites = [];
					for(let index_col = 0; index_col < level.width; ++index_col)
					{
						const id_tile = row[index_col];

						let tile = null;
						if(id_tile !== ID_EMPTY)
						{
							tile = platforms.create(index_col*SIZE_TILE, index_row*SIZE_TILE, id_tile === ID_DIRT ? 'dirt' : null).setSize(SIZE_TILE, SIZE_TILE).setDisplaySize(SIZE_TILE, SIZE_TILE);
							tile.setOrigin(0, 0);
							tile.body.updateFromGameObject();
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
					key: 'left',
					frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
					frameRate: 10,
					repeat: -1
				});
				
				this.anims.create({
					key: 'turn',
					frames: [ { key: 'dude', frame: 4 } ],
					frameRate: 20
				});
				
				this.anims.create({
					key: 'right',
					frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
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

				var emitter = this.add.particles('dirt').createEmitter({
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

					player.anims.play('turn');
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

	window.addEventListener("resize", resize);
	resize();
});