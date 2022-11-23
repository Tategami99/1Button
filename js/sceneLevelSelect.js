class SceneLevelSelect extends Phaser.Scene{
    constructor(){
        super('SceneLevelSelect');
    }
    preload(){
        this.load.image('level1', 'images/level1.png');
    }
    create(){
        //important variables
        this.gameWidth = 640;
        this.gameHeight = 416;
        const scaleRatio = 0.65;

        this.keyE = this.input.keyboard.addKey('E');

        this.levelSelected = 'N/A';
        this.level1 = this.add.image(0.15*this.gameWidth, 0.25*this.gameHeight, 'level1');
        this.level1.setScale(scaleRatio, scaleRatio);
        this.level1.setInteractive();
        this.level1.on('pointerover', () => {this.levelSelected = 'SceneLevel1'});
    }
    update(){
        this.detectE();
    }
    detectE(){
        if(this.keyE.isDown && this.levelSelected != 'N/A'){
            this.scene.start(this.levelSelected);
            console.log('selected ' + this.levelSelected);
        }
    }
}