class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//loads images or sounds
        this.load.image('title', 'images/title.png');
        this.load.image('play', 'images/play.png');
    }
    create() {
        //important variables
        this.gameWidth = 640;
        this.gameHeight = 416;

        this.cameras.main.setBackgroundColor('#87ceeb');

        this.title = this.add.image(0.5*this.gameWidth, 0.15*this.gameHeight, 'title');
        this.play = this.add.image(0.5*this.gameWidth, 0.5*this.gameHeight, 'play');
        this.play.setScale(1.5, 1.5);
        this.play.setInteractive();
        this.keyE = this.input.keyboard.addKey('E');
    }
    update() {
        //checks for collisions and updates values 
        if(this.keyE.isDown === true){
            console.log('working');
            this.scene.start('SceneLevelSelect');
        }
    }
}