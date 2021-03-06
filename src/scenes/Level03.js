class Level03 extends Level {
    constructor() {
        // Array [room or hall, # of exits, level exit, exit square number, rotation]
        let sp1Atts = ['r', '3', false, 0];
        let sp2Atts = ['h', '4', false, 0];
        let sp3Atts = ['r', '1', false, 0];
        let sp4Atts = ['h', '2c', false, 0];
        let sp5Atts = ['r', '4', false, 0];
        let sp6Atts = ['h', '4', false, 0];
        let sp7Atts = ['r', '4', false, 0];
        let sp8Atts = ['r', '3', true, 0];
        let sp9Atts = ['h', '2c', false, 0];
        let sp10Atts = ['r', '4', false, 0];
        let sp11Atts = ['h', '2', false, 0];
        let sp12Atts = ['h', '4', false, 0];
        let sp13Atts = ['r', '4', false, 0];
        let sp14Atts = ['r', '4', false, 0];
        let sp15Atts = ['h', '1', false, 0];

        // Number of enemies in level
        let enemNum = 7;

        // Level Number
        let levelNum = 3;

        // Create array of attributes to feed into Level.js
        let attributes = [];
        attributes = attributes.concat(sp1Atts, sp2Atts, sp3Atts, sp4Atts,
        sp5Atts, sp6Atts, sp7Atts, sp8Atts, sp9Atts, sp10Atts, sp11Atts, sp12Atts,
        sp13Atts, sp14Atts, sp15Atts);
        super("level03Scene", attributes, enemNum, levelNum, 8);
    }

    preload() {
        super.preload();
    }

    create() {
        // Set sanity to fix bug in level restart
        this.sanity = 77;
        super.create();
    }

    update() {
        super.update();
    }
}
