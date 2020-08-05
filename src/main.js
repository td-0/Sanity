let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 680,
    scene: [Menu, Tutorial, Level01, Level02, Level03, Level04, Level05, End, Credits],
    physics:{
        default: 'arcade'
    }
};

let game = new Phaser.Game(config);
