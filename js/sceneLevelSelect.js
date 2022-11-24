class SceneLevelSelect extends Phaser.Scene{
    constructor(){
        super('SceneLevelSelect');
    }
    init(data){
        if(data.deathCount === undefined){
            this.deathCount = 0;
        }
        else{
            this.deathCount = data.deathCount;
        }
        console.log(this.deathCount);
    }
    preload(){
        this.load.image('level1', 'images/level1.png');
        this.load.image('level2', 'images/level2.png');
        this.load.image('level3', 'images/level3.png');
        this.load.image('level4', 'images/level4.png');

        //stuff used for every level
        this.load.spritesheet('player', 'images/player.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('gold', 'images/gold.png');
    }
    create(){
        //important variables
        this.gameWidth = 640;
        this.gameHeight = 416;

        this.keyE = this.input.keyboard.addKey('E');

        this.levelSelected = 'N/A';

        const levels = [this.level1, this.level2, this.level3, this.level4];
        for(let i = 0; i<levels.length; i++){
            this.createLevel(i, i+1);
        }
    }
    update(){
        this.detectE();
    }
    detectE(){
        if(this.keyE.isDown && this.levelSelected != 'N/A'){
            this.scene.start(this.levelSelected, {deathCount: this.deathCount});
            console.log('selected ' + this.levelSelected);
        }
    }
    createLevel(level, lvlNum){
        const scaleRatio = 0.65;
        let x,y;
        if(lvlNum<4){
            y = 1;
            x=lvlNum;
        }
        else if(lvlNum<7){
            y=2;
            x = lvlNum - 3;
        }
        level = this.add.image(0.25*this.gameWidth*x, 0.2*this.gameHeight*y, 'level' + parseInt(lvlNum));
        level.setScale(scaleRatio, scaleRatio);
        level.setInteractive();
        level.on('pointerover', () => {this.levelSelected = 'SceneLevel' + parseInt(lvlNum); level.setScale(1, 1)});
        level.on('pointerout', () => {this.levelSelected = 'N/A'; level.setScale(scaleRatio, scaleRatio)});
    }
}