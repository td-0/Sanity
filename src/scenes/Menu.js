class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('quill', './assets/characters/quill.png');
        this.load.image('inkblot', './assets/characters/inkblot.png');
    }

    create() {
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '54px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            frameWidth: 0
        }

        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            frameWidth: 0
        }

        // Displays menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.add.text(centerX, centerY - 175, 'SANITY', titleConfig).
        setOrigin(0.5, 0.5);
        this.pButton = this.add.text(centerX, centerY + 25, 'PLAY',
        menuConfig).setOrigin(0.5, 0.5);
        this.pButton.setInteractive();
        this.tButton = this.add.text(centerX, centerY + 100, 'TUTORIAL', menuConfig).
        setOrigin(0.5, 0.5);
        this.tButton.setInteractive();
        this.cButton = this.add.text(centerX, centerY + 175, 'CREDITS',
        menuConfig).setOrigin(0.5, 0.5);
        this.cButton.setInteractive();

        this.pButton.on('pointerover', () => { this.pButton.setColor('#FF0000'); });
        this.pButton.on('pointerout', () => { this.pButton.setColor('#FFFFFF'); });
        this.pButton.on('pointerdown', () => { this.scene.start('level01Scene'); });

        this.tButton.on('pointerover', () => { this.tButton.setColor('#FFA500'); });
        this.tButton.on('pointerout', () => { this.tButton.setColor('#FFFFFF'); });
        this.tButton.on('pointerdown', () => { this.scene.start('tutorialScene'); });

        this.cButton.on('pointerover', () => { this.cButton.setColor('#FFFF00'); });
        this.cButton.on('pointerout', () => { this.cButton.setColor('#FFFFFF'); });
        this.cButton.on('pointerdown', () => { this.scene.start('creditsScene'); });
    }

    update() {
    }
}
