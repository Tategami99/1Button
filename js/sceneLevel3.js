class SceneLevel3 extends Phaser.Scene{
    constructor(){
        super('SceneLevel3');
    }
    init(data){
        this.deathCount = data.deathCount;
        console.log(this.deathCount);
    }
    preload(){
        this.load.image('tileset3', 'images/tilesets/beach.png');
        this.load.tilemapTiledJSON('map3', 'images/tilemaps/level3.json');
    }
    create(){
        //important variables
        this.gameWidth = 640;
        this.gameHeight = 416;
        const scaleRatio = 0.65;
        
        this.cameras.main.setBackgroundColor('#87ceeb');

        //tilemap and tileset stuff
        const map = this.make.tilemap({key: 'map3'});
        const tileset1 = map.addTilesetImage('beach', 'tileset3');
        const floorLayer = map.createLayer('beachFloor', tileset1, 0, 0);
        const elevationLayer = map.createLayer('beachElevation', tileset1, 0, 0);
        const worldLayer = map.createLayer('beachWorld', tileset1, 0, 0);
        const hazardLayer = map.createLayer('beachHazards', tileset1, 0, 0);
        floorLayer.setCollisionByExclusion(-1, true);
        elevationLayer.setCollisionByExclusion(-1, true);
        worldLayer.setCollisionByExclusion(-1, true);
        hazardLayer.setCollisionByExclusion(-1, true);

        //text on screen
        this.deathBox = this.add.text(10, 10, 'Deaths: ' + this.deathCount).setColor('black');

        //winning thing
        this.createGold();

        //player stuff
        this.createPlayer([floorLayer, elevationLayer], worldLayer, hazardLayer);
    }
    update(){
        this.updatePlayer();
    }

    createPlayer(layers, world, hazards){
        //creation stuff
        const playerScale = 1.25
        this.justAfter = false;
        this.player = this.physics.add.sprite(15, 325, 'player').setScale(playerScale, playerScale);
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
            this.player.flipX = !this.player.flipX;
        });

        //collision stuff
        this.physics.add.collider(this.player, layers);
        this.physics.add.collider(this.player, world, () =>{
            this.velocityScaleX *= -1;
            this.velocityScaleY = 1.5;
            this.player.flipX = !this.player.flipX;
        });
        this.physics.add.collider(this.player, hazards, () => {
            this.deathCount += 1;
            this.scene.restart({deathCount: this.deathCount});
        });
        this.physics.add.collider(this.player, this.gold, () => {
            this.scene.start('SceneLevel4', {deathCount: this.deathCount});
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
        this.gold = this.physics.add.staticSprite(12, 200, 'gold').setScale(1.5, 1.5);
        this.gold.setActive();
    }
}