class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {

    }

    create() {
        let creditsConfig = {
            fontFamily: 'Calibri',
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            frameWidth: 0
        }

        // Displays Credits text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.add.text(centerX * 0.9, centerY - 250, 'Credits', creditsConfig);
        this.add.text(centerX * 0.05, centerY - 150, 'Art and Sound Design:', creditsConfig);
        this.add.text(centerX * 1.4, centerY - 150, 'Giovanni Wenzler',
        creditsConfig);
        this.add.text(centerX * 0.05, centerY - 50, 'Programming and Level Design:', creditsConfig);
        this.add.text(centerX * 1.4, centerY - 50, 'Timothy Durbin',
        creditsConfig);
        this.mButton = this.add.text(centerX * 0.75, centerY + 150,
        'Return to Menu', creditsConfig).setInteractive().
        on('pointerover', () => { this.mButton.setColor('#00FFFF'); }).
        on('pointerout', () => { this.mButton.setColor('#FFFFFF'); }).
        on('pointerdown', () => { this.scene.start('menuScene'); });;
    }

    update() {

    }
}
