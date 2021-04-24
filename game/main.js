const WIDTH_CANVAS = 800;
const HEIGHT_CANVAS = 600;


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
				this.add.image(400, 300, "sky");

				this.physics.world.setBounds(0, 0, 20*24, 100*24);
				player = this.physics.add.sprite(100, 200, 'dude').setDisplaySize(20, 30).setOrigin(0.5, 1);
				console.log(player);
				player.setCollideWorldBounds(true);
				cursors = this.input.keyboard.createCursorKeys();
				platforms = this.physics.add.staticGroup();

				console.log(this);
				this.cameras.main.startFollow(player);

				this.physics.add.collider(player, platforms);

				level = [];
				for(let i = 0; i < 100; ++i)
				{
					const row = [];
					for(let j = 0; j < 20; ++j)
						row.push(i >= 10 ? ID_DIRT : ID_EMPTY);

					level.push(row);
				}

				levelsprites = [];
				for(let index_row = 0; index_row < level.length; ++index_row)
				{
					const row = level[index_row];

					const rowsprites = [];
					for(let index_col = 0; index_col < row.length; ++index_col)
					{
						const id_tile = row[index_col];

						let tile = null;
						if(id_tile !== ID_EMPTY)
						{
							tile = platforms.create(index_col*24, index_row*24, id_tile === ID_DIRT ? 'dirt' : null).setSize(24, 24).setDisplaySize(24, 24);
							tile.setOrigin(0, 0);
							tile.body.updateFromGameObject();
						}

						rowsprites.push(tile);
						
					}

					levelsprites.push(rowsprites);
				}

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
				if (cursors.left.isDown)
				{
					player.setVelocityX(-160);

					player.anims.play('left', true);
				}
				else if (cursors.right.isDown)
				{
					player.setVelocityX(160);

					player.anims.play('right', true);
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

				if (cursors.down.isDown && player.body.touching.down)
				{
					// dig
					const sprite = levelsprites[Math.floor(player.y/24)][Math.floor(player.x/24)];
					if(sprite !== null)
						sprite.destroy();
				}
			}
		}
	});

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