class Level01 extends Level {
    constructor() {
        // Array [room or hall, # of exits, level exit, rotation]
        let sp1Atts = ['r', '1', false, 0];
        let sp2Atts = ['h', '2c', false, 0];
        let sp3Atts = ['r', '4', false, 0];
        let sp4Atts = ['h', '3', false, 0];
        let sp5Atts = ['r', '4', false, 0];
        let sp6Atts = ['h', '4', false, 0];
        let sp7Atts = ['r', '4', false, 0];
        let sp8Atts = ['r', '2', false, 0];
        let sp9Atts = ['h', '2', false, 0];
        let sp10Atts = ['r', '3', false, 0];
        let sp11Atts = ['h', '4', false, 0];
        let sp12Atts = ['h', '1', false, 0];
        let sp13Atts = ['r', '3', false, 0];
        let sp14Atts = ['h', '4', false, 0];
        let sp15Atts = ['r', '4', true, 0];

        // Number of enemies in level
        let enemNum = 3;

        // Level Number
        let levelNum = 1;

        // Create array of attributes to feed into Level.js
        let attributes = [];
        attributes = attributes.concat(sp1Atts, sp2Atts, sp3Atts, sp4Atts,
        sp5Atts, sp6Atts, sp7Atts, sp8Atts, sp9Atts, sp10Atts, sp11Atts, sp12Atts,
        sp13Atts, sp14Atts, sp15Atts);
        super("level01Scene", attributes, enemNum, levelNum, 15);
    }

    preload() {
        super.preload();
    }

    create() {
        // Set sanity to fix bug in level restart
        this.sanity = 99;
        super.create();
    }

    update() {
        super.update();
    }
}
