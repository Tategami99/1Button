class SceneLevel1 extends Phaser.Scene{
    constructor(){
        super('SceneLevel1');
    }
    preload(){
        this.load.spritesheet('player', 'images/player.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('gold', 'images/gold.png');
        this.load.image('tileset1', 'images/tilesets/original.png');
        this.load.tilemapTiledJSON('map1', 'images/tilemaps/level1.json');
    }
    create(){
        //important variables
        this.gameWidth = 640;
        this.gameHeight = 416;
        const scaleRatio = 0.65;

        this.cameras.main.setBackgroundColor('#ADD8E6');

        //tilemap and tileset stuff
        const map = this.make.tilemap({key: 'map1'});
        const tileset1 = map.addTilesetImage('original', 'tileset1');
        this.floorLayer = map.createLayer('Floor', tileset1, 0, 0);
        this.elevationLayer = map.createLayer('Elevation', tileset1, 0, 0);
        this.hazardLayer = map.createLayer('Hazards', tileset1, 0, 0);
        this.floorLayer.setCollisionByExclusion(-1, true);
        this.elevationLayer.setCollisionByExclusion(-1, true);
        this.hazardLayer.setCollisionByExclusion(-1, true);

        //winning thing
        this.createGold();

        //player stuff
        this.createPlayer();
    }
    update(){
        this.updatePlayer();
    }

    createPlayer(){
        //creation stuff
        const playerScale = 1.25
        this.justAfter = false;
        this.player = this.physics.add.sprite(50, 325, 'player').setScale(playerScale, playerScale);
        this.player.setActive(true);
        this.velocityScaleX = 1;
        this.velocityScaleY = 1;

        //jumping stuff
        this.player.setBounce(0.1);
        this.player.setGravityY(25);

        //world bounds stuff
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.player.body.world.on('worldbounds', () => {
            this.velocityScaleX *= -1;
            this.velocityScaleY = 1.5;
            this.player.flipX = true;
        });

        //collision stuff
        this.physics.add.collider(this.player, [this.floorLayer, this.elevationLayer]);
        this.physics.add.collider(this.player, this.hazardLayer, () => {
            this.scene.restart();
        });
        this.physics.add.collider(this.player, this.gold, () => {
            this.scene.start('SceneLevel2');
        })

        //input stuff
        this.keyE = this.input.keyboard.addKey('E');

        //animation stuff
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 1, 2, 3]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {frames: [1]}),
            frameRate: 8,
            repeat: -1
        });
    }
    updatePlayer(){
        if(this.keyE.isDown && !this.justAfter){
            this.player.play('walk', true);
            this.player.setVelocityX(100*this.velocityScaleX);
            this.justAfter = true;
        }
        else if(!this.keyE.isDown && this.justAfter){
            this.player.play('idle', true);
            this.player.setVelocityX(100*this.velocityScaleX);
            this.player.setVelocityY(500*this.velocityScaleY);
            this.velocityScaleY = 1;
            this.justAfter = false;
        }
    }

    createGold(){
        this.gold = this.physics.add.staticSprite(20, 160, 'gold').setScale(2.5, 2.5);
        this.gold.setActive();
        //this.gold.body.gravity = false;
    }
}