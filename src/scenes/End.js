class End extends Phaser.Scene {
    constructor(scene) {
        super("endScene");
    }

    preload() {

    }

    init(data) {
        this.win = data.win;
        this.tutorial = data.tutorial;
    }

    create() {
        let textConfig = {
            fontFamily: 'Calibri',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            frameWidth: 0
        }

        // Displays ending text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        if(this.win == true) {
        this.add.text(centerX, centerY - 150, 'You escaped the dungeon!', textConfig).
        setOrigin(0.5);
        } else {
            this.add.text(centerX, centerY - 150, 'You went insane.', textConfig).
            setOrigin(0.5);

            this.rButton = this.add.text(centerX, centerY, 'RESTART', textConfig).
            setOrigin(0.5).setInteractive().
            on('pointerover', () => { this.rButton.setColor('#FF0000'); }).
            on('pointerout', () => { this.rButton.setColor('#FFFFFF'); }).
            on('pointerdown', () => {
                if(this.tutorial == true){
                    this.scene.start('tutorialScene');
                } else {
                    this.scene.start('level01Scene');
                }
            });
        }
        this.mButton = this.add.text(centerX, centerY + 150, 'Return to Menu',
        textConfig).setOrigin(0.5).setInteractive().
        on('pointerover', () => { this.mButton.setColor('#00FFFF'); }).
        on('pointerout', () => { this.mButton.setColor('#FFFFFF'); }).
        on('pointerdown', () => { this.scene.start('menuScene'); });
    }

    update() {

    }
}
