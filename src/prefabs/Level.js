// Level Prefab
class Level extends Phaser.Scene {
    constructor(name, attributes, enemNum, levelNum, exitSquareNum) {
        super(name);
        this.attributes = attributes;
        this.enemNum = enemNum;
        this.levelNum = levelNum;
        this.exitSquareNum = exitSquareNum;
    }

    preload() {
        // Load Map Rooms
        this.load.image('1exitRoomM', './assets/map/1Map_r_a.png');
        this.load.image('1exitHallM', './assets/map/1Map_h_a.png');
        this.load.image('2exitRoomCornerM', './assets/map/2Map_rc_a.png');
        this.load.image('2exitHallCornerM', './assets/map/2Map_hc_a.png');
        this.load.image('2exitRoomM', './assets/map/2Map_r_a.png');
        this.load.image('2exitHallM', './assets/map/2Map_h_a.png');
        this.load.image('3exitRoomM', './assets/map/3Map_r_a.png');
        this.load.image('3exitHallM', './assets/map/3Map_h_a.png');
        this.load.image('4exitRoomM', './assets/map/4Map_r.png');
        this.load.image('4exitHallM', './assets/map/4Map_h.png');
        this.load.image('1exitM', './assets/map/1Map_e_a.png');
        this.load.image('2exitCornerM', './assets/map/2Map_ec_a.png');
        this.load.image('2exitM', './assets/map/2Map_e_a.png');
        this.load.image('3exitM', './assets/map/3Map_e_a.png');
        this.load.image('4exitM', './assets/map/4Map_e.png');

        // Load Rooms
        this.load.image('1exitRoom', './assets/rooms/1Room.png');
        this.load.image('1exitHall', './assets/rooms/1Hallway.png');
        this.load.image('2exitRoomCorner', './assets/rooms/2Room_a.png');
        this.load.image('2exitHallCorner', './assets/rooms/2Hallway_a.png');
        this.load.image('2exitRoom', './assets/rooms/2Room_b.png');
        this.load.image('2exitHall', './assets/rooms/2Hallway_b.png');
        this.load.image('3exitRoom', './assets/rooms/3Room.png');
        this.load.image('3exitHall', './assets/rooms/3Hallway.png');
        this.load.image('4exitRoom', './assets/rooms/4Room.png');
        this.load.image('4exitHall', './assets/rooms/4Hallway.png');
        this.load.image('1exit', './assets/rooms/1Exit.png');
        this.load.image('2exitCorner', './assets/rooms/2Exit_a.png');
        this.load.image('2exit', './assets/rooms/2Exit_b.png');
        this.load.image('3exit', './assets/rooms/3Exit.png');
        this.load.image('4exit', './assets/rooms/4Exit.png');

        // Load Character
        this.load.image('player', './assets/characters/player.png');
        this.load.image('trace', './assets/characters/inkblot.png');

        // Load Sanity Meter
        this.load.image('0', './assets/characters/sanity_meter/0.png');
        this.load.image('1', './assets/characters/sanity_meter/1.png');
        this.load.image('2', './assets/characters/sanity_meter/2.png');
        this.load.image('3', './assets/characters/sanity_meter/3.png');
        this.load.image('4', './assets/characters/sanity_meter/4.png');
        this.load.image('5', './assets/characters/sanity_meter/5.png');
        this.load.image('6', './assets/characters/sanity_meter/6.png');
        this.load.image('7', './assets/characters/sanity_meter/7.png');
        this.load.image('8', './assets/characters/sanity_meter/8.png');
        this.load.image('9', './assets/characters/sanity_meter/9.png');
        this.load.image('10', './assets/characters/sanity_meter/10.png');

        // Load Enemies
        this.load.spritesheet('enemy', './assets/characters/enemysheet.png',
        {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 7});

        // Load Invisible Assets
        this.load.image('temp60x10', './assets/invisible/temp60x10.png');
        this.load.image('temp10x60', './assets/invisible/temp10x60.png');
        this.load.image('temp50x10', './assets/invisible/temp50x10.png');
        this.load.image('temp10x50', './assets/invisible/temp10x50.png');
        this.load.image('emptySquare', './assets/invisible/Empty.png');

        // Load Sound
        this.load.audio('roomSlide', './assets/sounds/roomSlide.wav');
        this.load.audio('ambiance', './assets/sounds/Ambiance.wav');
        this.load.audio('walking', './assets/sounds/walking_loop.wav');
        this.load.audio('enemySound', './assets/sounds/enemy.wav');

        // Load Cursor
        this.load.image('cursor', './assets/characters/quill.png');

        // Load Buttons
        this.load.image('mapButton', './assets/map/UI/mapButton.png');
        this.load.image('mapButtonHover', './assets/map/UI/mapButtonHover.png');
        this.load.image('startButton', './assets/map/UI/startButton.png');
        this.load.image('startButtonHover', './assets/map/UI/startButtonHover.png');
        this.load.image('resetButton', './assets/map/UI/resetButton.png');
        this.load.image('resetButtonHover', './assets/map/UI/resetButtonHover.png');

        // Load Edge
        this.load.image('edge', './assets/rooms/Edge.png');
        this.load.image('edge2', './assets/rooms/Edge2.png');
    }

    create() {
        // Define text config for sanity meter
        this.textConfig = {
            fontFamily: 'Calibri',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            frameWidth: 0
        }

        // Create rooms, hallways, and invisible colliders
        this.populateSpaces(this.attributes);
        this.populateColliders(this.attributes);

        // Define Sanity Meter
        this.sanityText = this.add.text(300, 25,
        'Sanity:', this.textConfig).setOrigin(0.5, 0.5);

        this.brains = [];
        for(let it = 1; it <= this.sanity/11; it++) {
            let brain = this.add.sprite(this.sanityText.x + 50 + (it * 25), 25, '0').
            setScale(0.1, 0.1);
            this.brains.push(brain);
        }

        // Create Player and Tracer objects
        this.player = new Player(this, this.space1.x/2, this.space1.y, 'player').
        setOrigin(0.5, 0.5).setScale(0.15, 0.15);
        this.player = this.physics.add.existing(this.player);
        this.player.setBounce(0.2, 0.2);
        this.player.setSize(this.player.width * 0.9, this.player.height * 0.9, true);

        this.tracer = new Tracer(this, this.space1.x/2, this.space1.y, 'trace').
        setOrigin(0.5, 0.5);

        // Create Enemies
        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 8,
            repeat: -1
        });

        this.enemies = [];

        // Random enemy placement in any room or hall except starting room
        let seeds = [];
        for(let iter = 0; iter < this.enemNum; iter++) {
            let seed = Phaser.Math.Between(2, 15);
            while(seed == this.exitSquareNum) {
                seed = Phaser.Math.Between(2, 15);
            }
            for(let iter = 0; iter < seeds.length; iter++) {
                if(seed == seeds[iter]) {
                    seed = Phaser.Math.Between(2, 15);
                    iter = 0;
                }
            }
            seeds.push(seed);
            let spaceType = this.attributes[(seed * 4) - 4];
            let spaceNum = this.findSquare(seed);
            let genEnemy = this.placeEnemy(spaceType, spaceNum);
            genEnemy.anims.play('enemyMove', true);
            this.enemies.push(genEnemy);
        }

        // Creating Buttons
        this.mapButton = this.add.image(this.player.x + 125, this.player.y + 150, 'mapButton').
        setOrigin(0.5, 0.5).setScale(0.25, 0.25);

        this.startButton = this.add.image(730, 30, 'startButton').
        setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        this.resetButton = this.add.image(70, 30, 'resetButton').
        setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Creating quill to follow cursor
        this.cursor = this.add.sprite(this.input.activePointer.x * 1.25,
        this.input.activePointer.y * 1.25, 'cursor').setOrigin(0, 0);

        // Add ambiance noise
        this.ambiance = this.sound.add('ambiance');
        this.ambiance.setLoop(true);
        this.ambiance.play();

        // Add room sliding sound effect
        this.roomSlide = this.sound.add('roomSlide');

        // Add walking sounds
        this.walking = this.sound.add('walking');
        this.walking.setLoop(true);

        // Add enemy sounds
        this.enemySound = this.sound.add('enemySound');
        this.enemySound.setLoop(true);

        // Creat points array
        this.points = [];

        // Creating timer for room movement
        this.moveTimer = this.time.addEvent({
            delay: 1500,
            loop: true
        });

        this.moveTimer.paused = true;

        // Creating timer for sanity meter
        this.sanityTimer = this.time.addEvent({
            delay: 1000,
            loop: true
        });

        // Setting initial variables

        this.camera = this.cameras.main;

        // Camera fading effect
        this.fading = false;

        // Player and room movement
        this.moving = false;
        this.roomMoving = false;

        // Player in contact with enemy
        this.inEnemy = false;

        // Iterators for points array
        this.pointsIter1 = 0;
        this.pointsIter2 = 1;

        // Room movement vairable
        this.started = false;

        // Variables for player view
        this.mapView = false;

        this.justOpenedMap = false;

        // Game Over Flag
        this.gameOver = false;
    }

    update() {
        // Check if reached end of level
        if(this.player.x <= this.findSquare(this.exitSquareNum).x + 30 &&
        this.player.x >= this.findSquare(this.exitSquareNum).x - 30 &&
        this.player.y <= this.findSquare(this.exitSquareNum).y + 30 &&
        this.player.y >= this.findSquare(this.exitSquareNum).y - 30) {
            this.gameOver = true;
        }

        if(this.sanity <= 0) {
            this.gameOver = true;
        }
        // Do if game over
        if(this.gameOver == true && this.fading == false) {
            if(this.sanity <= 0 ){
                this.ambiance.stop();
                this.walking.stop();
                this.enemySound.stop();
                this.fading = true;
                this.cameras.main.fadeOut(1000, 0, 0, 0, () => {
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.scene.start('endScene', {win: false, tutorial: false});
                    });
                });
            } else {
                this.goToNextScene();
            }
        }

        // Main gameplay loop
        if(this.gameOver == false) {

            if(this.mapView == true) {
                // Map View

                // Zoom Out Camera
                this.camera.stopFollow();
                this.camera.setZoom(0.8);
                this.camera.centerOn(400, 425);

                // Stop enemy sound
                this.enemySound.stop();

                // Make Quill and Inkblot Visible
                this.cursor.alpha = 1;
                this.tracer.alpha = 1;

                // Make Player Invisible
                this.player.alpha = 0;

                // Set map button invisible
                this.mapButton.alpha = 0;

                // Make start and reset buttons visible
                this.startButton.alpha = 1;
                this.resetButton.alpha = 1;

                // Make Enemies Invisible
                for(let iter = 0; iter < this.enemies.length; iter++) {
                        this.enemies[iter].alpha = 0;
                }

                // Make quill follow cursor
                this.cursor.x = this.input.activePointer.x * 1.25;
                this.cursor.y = this.input.activePointer.y * 1.25;

                // Move Sanity Meter
                this.sanityText.x = 300;
                this.sanityText.y = 25;
                this.sanityText.setScale(1, 1);
                for(let it = 1; it <= this.brains.length; it++) {
                        this.brains[it - 1].setScale(0.1);
                        this.brains[it - 1].x = this.sanityText.x + 50 + (it * 25);
                        this.brains[it - 1].y = 25;
                }

                // Check for Start Button Press
                if(this.input.activePointer.x < 632 &&
                this.input.activePointer.x > 537 &&
                this.input.activePointer.y < 44 &&
                this.input.activePointer.y > 8){
                    this.startButton.setTexture('startButtonHover');
                    if (this.input.activePointer.isDown) {
                            this.mapView = false;
                            this.setZoomTextures();
                    }
                } else {
                    this.startButton.setTexture('startButton');
                }

                // Check for Reset Button Press
                if(this.input.activePointer.x < 104 &&
                this.input.activePointer.x > 8 &&
                this.input.activePointer.y < 44 &&
                this.input.activePointer.y > 8){
                    this.resetButton.setTexture('resetButtonHover');
                    if (this.input.activePointer.isDown) {
                            this.resetTracer();
                    }
                } else {
                    this.resetButton.setTexture('resetButton');
                }

                // Clear points array when map opened
                if(this.points.length > 1 && this.justOpenedMap == true) {
                        this.moveTimer.paused = true;
                        this.tracer.x = this.player.x;
                        this.tracer.y = this.player.y;
                        this.moving = false;
                        this.points.splice(0, this.points.length);
                        this.pointsIter1 = 0;
                        this.pointsIter2 = 1;
                        this.points.push(this.player.x);
                        this.points.push(this.player.y);
                }

                // Allow player to trace path with cursor
                if(this.moving == false) {
                        if (this.input.activePointer.isDown) {
                            if (this.input.activePointer.x * 1.25 < this.tracer.x + 25 &&
                                    this.input.activePointer.x * 1.25 > this.tracer.x - 25 &&
                                    this.input.activePointer.y * 1.25 < this.tracer.y + 25 &&
                                    this.input.activePointer.y * 1.25 > this.tracer.y - 25) {
                                        this.tracer.update(this.input.activePointer.x * 1.25,
                                        this.input.activePointer.y * 1.25);
                                        this.points.push(this.tracer.x);
                                        this.points.push(this.tracer.y);
                                        }
                            }
                }
                this.justOpenedMap = false;
            } else {
                // Zoomed-in View

                // Zoom in camera
                this.camera.startFollow(this.player);
                this.camera.setZoom(2);

                // Make Quill and Inkblot Invisible
                this.cursor.alpha = 0;
                this.tracer.alpha = 0;

                // Make Player Visible
                this.player.alpha = 1;

                // Make map button visible
                this.mapButton.alpha = 1;

                // Make start and reset buttons invisible
                this.startButton.alpha = 0;
                this.resetButton.alpha = 0;

                // Make Enemies Visible
                for(let iter = 0; iter < this.enemies.length; iter++) {
                        this.enemies[iter].alpha = 1;
                }

                // Move Sanity Meter
                this.sanityText.x = this.player.x - 136;
                this.sanityText.y = this.player.y - 160;
                this.sanityText.setScale(0.4, 0.4);
                for(let it = 1; it <= this.brains.length; it++) {
                        this.brains[it - 1].setScale(0.05);
                        this.brains[it - 1].x = this.player.x - 121 + (it * 15);
                        this.brains[it - 1].y = this.player.y - 158;
                }

                // Move Map Button
                this.mapButton.x = this.player.x + 125;
                this.mapButton.y = this.player.y + 150;

                // Decrement Sanity
                if(this.sanityTimer.getProgress() > 0.978) {
                        this.sanity--;
                        if(this.sanity > 0) {
                            if(this.sanity % 11 == 0) {
                                    this.brains[this.brains.length - 1].alpha = 0;
                                    this.brains.pop();
                            } else{
                                    this.changeBrain(this.brains[this.brains.length - 1]);
                            }
                        }
                }

                // Enemy affects sanity
                this.inEnemy = false;
                for(let iter = 0; iter < this.enemies.length; iter++) {
                        if(this.player.x < this.enemies[iter].x + 60 &&
                            this.player.x > this.enemies[iter].x - 60 &&
                            this.player.y < this.enemies[iter].y + 60 &&
                            this.player.y > this.enemies[iter].y - 60) {
                                this.inEnemy = true;
                                this.sanity -= 0.25;
                                if(this.sanity > 0 && this.sanity % 1 == 0){
                                    if(this.sanity % 11 == 0 && this.sanity % 1 == 0) {
                                            this.brains[this.brains.length - 1].alpha = 0;
                                            this.brains.pop();
                                    } else{
                                            this.changeBrain(this.brains[this.brains.length - 1]);
                                    }
                                }
                        }
                }

                // Play enemy sound if player is in contact with enemy
                if(this.inEnemy == true) {
                    if(this.enemySound.isPlaying == false) {
                        this.enemySound.play();
                    }
                } else {
                    this.enemySound.stop();
                }

                // Move player character along path
                if(this.points.length > 1) {
                        // Stop and clear points array when player reaches end of drawn path
                        if(this.pointsIter2 > this.points.length) {
                            this.walking.stop();
                            this.moveTimer.paused = true;
                            this.tracer.x = this.player.x;
                            this.tracer.y = this.player.y;
                            this.moving = false;
                            this.points.splice(0, this.points.length);
                            this.pointsIter1 = 0;
                            this.pointsIter2 = 1;
                            this.points.push(this.player.x);
                            this.points.push(this.player.y);
                        } else {
                            // Do while player is moving
                            if(this.walking.isPlaying == false) {
                                this.walking.play();
                            }
                            this.moveTimer.paused = false;
                            this.moving = true;
                            this.moveCharacter(this.points);
                            this.pointsIter1 += 2;
                            this.pointsIter2 += 2;

                            // Random room movement
                            if (this.moveTimer.getProgress() > 0.989) {
                                    let randomNum = Phaser.Math.Between(1, 15);
                                    let adjToEmpty = this.checkAdj(randomNum);

                                    // Only move room adjacent to empty square
                                    // and don't move room with player inside
                                    while(adjToEmpty == false ||
                                        (this.player.x < this.findSquare(randomNum).x + 150 &&
                                        this.player.x > this.findSquare(randomNum).x - 150 &&
                                        this.player.y < this.findSquare(randomNum).y + 150 &&
                                        this.player.y > this.findSquare(randomNum).y - 150)) {
                                            randomNum = Phaser.Math.Between(1, 15);
                                            adjToEmpty = this.checkAdj(randomNum);
                                        }

                                        if(this.roomMoving == false) {
                                            this.tempEmptyX = this.findSquare(randomNum).x;
                                            this.tempEmptyY = this.findSquare(randomNum).y;
                                        }
                                        this.tempColls = this.emptyRoomColliders(this.findSquare(randomNum));
                                        for(let iter = 0; iter < this.tempColls.length; iter++) {
                                            this.tempColls[iter].alpha = 0;
                                        }

                                        this.started = true;
                                        this.moveSquare(randomNum);
                                        this.roomSlide.play();
                                        this.holdNum = randomNum;
                                        this.roomMoving = true;
                            }

                            if (this.started == true) {
                                if(this.emptySpace.x == this.findSquare(this.holdNum).x &&
                                    this.emptySpace.y == this.findSquare(this.holdNum).y) {
                                        this.roomMoving = false;
                                        this.started = false;
                                        this.moveEmpty();
                                        for(let iter = 0; iter < this.tempColls.length; iter++) {
                                            this.tempColls[iter].destroy();
                                        }
                                    }

                                    if (this.roomMoving == true) {
                                        this.moveSquare(this.holdNum);
                                    }
                                }
                    }
            }

                // Check for Map Button Press
                        // Had to Use Raw Coordinates as camera zoom does not allow
                        // for more streamlined methods
                if(this.input.activePointer.x < 630 &&
                this.input.activePointer.x > 510 &&
                this.input.activePointer.y < 664 &&
                this.input.activePointer.y > 617){
                        this.mapButton.setTexture('mapButtonHover');
                        if (this.input.activePointer.isDown) {
                            this.mapView = true;
                            this.walking.stop();
                            this.setMapTextures();
                            this.justOpenedMap = true;
                        }
                } else {
                        this.mapButton.setTexture('mapButton');
                }
            }
        }
    }

    // Resets Tracer when Reset Button Pressed
    resetTracer() {
        this.tracer.x = this.player.x;
        this.tracer.y = this.player.y;
        this.points.splice(0, this.points.length);
        this.pointsIter1 = 0;
        this.pointsIter2 = 1;
        this.points.push(this.player.x);
        this.points.push(this.player.y);
    }

    // Sets room textures when opening map -- normal textures to map textures
    setMapTextures() {
        for(let iter = 1; iter < 16; iter++) {
            switch(this.findSquare(iter).texture.key) {
                case '1exitRoom':
                    this.findSquare(iter).setTexture('1exitRoomM');
                    break;
                case '1exitHall':
                    this.findSquare(iter).setTexture('1exitHallM');
                    break;
                case '2exitRoomCorner':
                    this.findSquare(iter).setTexture('2exitRoomCornerM');
                    break;
                case '2exitHallCorner':
                    this.findSquare(iter).setTexture('2exitHallCornerM');
                    break;
                case '2exitRoom':
                    this.findSquare(iter).setTexture('2exitRoomM');
                    break;
                case '2exitHall':
                    this.findSquare(iter).setTexture('2exitHallM');
                    break;
                case '3exitRoom':
                    this.findSquare(iter).setTexture('3exitRoomM');
                    break;
                case '3exitHall':
                    this.findSquare(iter).setTexture('3exitHallM');
                    break;
                case '4exitRoom':
                    this.findSquare(iter).setTexture('4exitRoomM');
                    break;
                case '4exitHall':
                    this.findSquare(iter).setTexture('4exitHallM');
                    break;
                case '1exit':
                    this.findSquare(iter).setTexture('1exitM');
                    break;
                case '2exit':
                    this.findSquare(iter).setTexture('2exitM');
                    break;
                case '2exitCorner':
                    this.findSquare(iter).setTexture('2exitCornerM');
                    break;
                case '3exit':
                    this.findSquare(iter).setTexture('3exitM');
                    break;
                default:
                    this.findSquare(iter).setTexture('4exitM');
            }
        }
    }

    // Sets room textures when closing map -- map textures to normal textures
    setZoomTextures() {
        for(let iter = 1; iter < 16; iter++) {
            switch(this.findSquare(iter).texture.key) {
                case '1exitRoomM':
                    this.findSquare(iter).setTexture('1exitRoom');
                    break;
                case '1exitHallM':
                    this.findSquare(iter).setTexture('1exitHall');
                    break;
                case '2exitRoomCornerM':
                    this.findSquare(iter).setTexture('2exitRoomCorner');
                    break;
                case '2exitHallCornerM':
                    this.findSquare(iter).setTexture('2exitHallCorner');
                    break;
                case '2exitRoomM':
                    this.findSquare(iter).setTexture('2exitRoom');
                    break;
                case '2exitHallM':
                    this.findSquare(iter).setTexture('2exitHall');
                    break;
                case '3exitRoomM':
                    this.findSquare(iter).setTexture('3exitRoom');
                    break;
                case '3exitHallM':
                    this.findSquare(iter).setTexture('3exitHall');
                    break;
                case '4exitRoomM':
                    this.findSquare(iter).setTexture('4exitRoom');
                    break;
                case '4exitHallM':
                    this.findSquare(iter).setTexture('4exitHall');
                    break;
                case '1exitM':
                    this.findSquare(iter).setTexture('1exit');
                    break;
                case '2exitM':
                    this.findSquare(iter).setTexture('2exit');
                    break;
                case '2exitCornerM':
                    this.findSquare(iter).setTexture('2exitCorner');
                    break;
                case '3exitM':
                    this.findSquare(iter).setTexture('3exit');
                    break;
                default:
                    this.findSquare(iter).setTexture('4exit');
            }
        }
    }

    // Changes brain png image for degrading sanity
    changeBrain(brain) {
        switch(brain.texture.key) {
            case '0':
                brain.setTexture('1');
                break;
            case '1':
                brain.setTexture('2');
                break;
            case '2':
                brain.setTexture('3');
                break;
            case '3':
                brain.setTexture('4');
                break;
            case '4':
                brain.setTexture('5');
                break;
            case '5':
                brain.setTexture('6');
                break;
            case '6':
                brain.setTexture('7');
                break;
            case '7':
                brain.setTexture('8');
                break;
            case '8':
                brain.setTexture('9');
                break;
            default:
                brain.setTexture('10');
                break;
        }
    }

    // Moves Empty Square and its colliders
    moveEmpty() {
        if(this.tempEmptyX > this.emptySpace.x) {
            for(let iter = 0; iter < this.ecolls.length; iter++) {
                this.ecolls[iter].x += 200;
            }
        } else if (this.tempEmptyX < this.emptySpace.x) {
            for(let iter = 0; iter < this.ecolls.length; iter++) {
                this.ecolls[iter].x -= 200;
            }
        } else if (this.tempEmptyY > this.emptySpace.y) {
            for(let iter = 0; iter < this.ecolls.length; iter++) {
                this.ecolls[iter].y += 200;
            }
        } else if (this.tempEmptyY < this.emptySpace.y) {
            for(let iter = 0; iter < this.ecolls.length; iter++) {
                this.ecolls[iter].y -= 200;
            }
        }

        this.emptySpace.x = this.tempEmptyX;
        this.emptySpace.y = this.tempEmptyY;
    }

    // Returns square that corresponds to given number
    findSquare(number) {
        switch(number) {
            case 1:
                return this.space1;
                break;
            case 2:
                return this.space2;
                break;
            case 3:
                return this.space3;
                break;
            case 4:
                return this.space4;
                break;
            case 5:
                return this.space5;
                break;
            case 6:
                return this.space6;
                break;
            case 7:
                return this.space7;
                break;
            case 8:
                return this.space8;
                break;
            case 9:
                return this.space9;
                break;
            case 10:
                return this.space10;
                break;
            case 11:
                return this.space11;
                break;
            case 12:
                return this.space12;
                break;
            case 13:
                return this.space13;
                break;
            case 14:
                return this.space14;
                break;
            default:
                return this.space15;
        }
    }

    // Returns array of colliders that correspond to square of given number
    findColls(number) {
        switch(number) {
            case 1:
                return this.s1colls;
                break;
            case 2:
                return this.s2colls;
                break;
            case 3:
                return this.s3colls;
                break;
            case 4:
                return this.s4colls;
                break;
            case 5:
                return this.s5colls;
                break;
            case 6:
                return this.s6colls;
                break;
            case 7:
                return this.s7colls;
                break;
            case 8:
                return this.s8colls;
                break;
            case 9:
                return this.s9colls;
                break;
            case 10:
                return this.s10colls;
                break;
            case 11:
                return this.s11colls;
                break;
            case 12:
                return this.s12colls;
                break;
            case 13:
                return this.s13colls;
                break;
            case 14:
                return this.s14colls;
                break;
            default:
                return this.s15colls;
        }
    }

    // Returns current time to function as game clock
    currTime() {
        let curr = new Date();
        return curr.getTime();
    }

    // Checks if given square is adjacent to empty square
    checkAdj(number) {
        if (this.findSquare(number).x + 200 == this.emptySpace.x &&
        this.findSquare(number).y == this.emptySpace.y ||
        this.findSquare(number).x - 200 == this.emptySpace.x &&
        this.findSquare(number).y == this.emptySpace.y ||
        this.findSquare(number).y + 200 == this.emptySpace.y &&
        this.findSquare(number).x == this.emptySpace.x ||
        this.findSquare(number).y - 200 == this.emptySpace.y &&
        this.findSquare(number).x == this.emptySpace.x) {
            return true;
        }
        else {
            return false;
        }
    }

    // Moves player along array of points from tracer, 1 jump each time called
    moveCharacter(points) {
        if(points.length > 1) {
            let timeDelay = this.currTime() + 20;
            let mx = points[this.pointsIter1];
            let my = points[this.pointsIter2];

            // Determine Character Turning
            if(this.points.length > this.pointsIter2 + 2) {
                let mxb = points[this.pointsIter1 + 2];
                let myb = points[this.pointsIter2 + 2];

                // Ensure character does not spaz while turning
                if((mx != mxb || my != myb) && ((mxb > mx + 2 || mxb < mx - 2) ||
                (myb > my + 2 || myb < my - 2))) {
                    // Determine which direction movement is going
                    if(mxb >= mx && my >= myb) {
                        // Movement Vector in Cartesian Q1
                        if(mxb - mx >= my - myb) {
                            // Face Right
                            this.player.setAngle(270);
                        } else {
                            // Face Up
                            this.player.setAngle(180);
                        }
                    } else if(mx >= mxb && my >= myb) {
                        // Movement Vector in Cartesian Q2
                        if(mx - mxb >= my - myb) {
                            // Face Left
                            this.player.setAngle(90);
                        } else {
                            // Face Up
                            this.player.setAngle(180);
                        }
                    } else if(mx >= mxb && myb >= my) {
                        // Movement Vector in Cartesian Q3
                        if(mx - mxb >= myb - my) {
                            // Face Left
                            this.player.setAngle(90);
                        } else {
                            // Face Down
                            this.player.setAngle(0);
                        }
                    } else if(mxb >= mx && myb >= my) {
                        // Movement Vector in Cartesian Q4
                        if(mxb - mx >= myb - my) {
                            // Face Right
                            this.player.setAngle(270);
                        } else {
                            // Face Down
                            this.player.setAngle(0);
                        }
                    } else {
                        // Do nothing
                    }
                }
            }

            // Do if player has not collided with wall
            if (!this.physics.collide(this.player, this.colliders)) {
                while(timeDelay > this.currTime()) {
                    // Empty on Purpose
                }
                this.player.update(mx, my);
            } else {
                // Reset Tracer at Player  if hit barrier
                if(points[this.pointsIter1 - 6] != undefined && points[this.pointsIter2 - 6] != undefined) {
                    this.player.x = points[this.pointsIter1 - 6];
                    this.player.y = points[this.pointsIter2 - 6];
                } else {
                    // Make sure player does not glitch into collider
                    let currSquare = 0;
                    for(let iter = 1; iter < 16; iter++) {
                        currSquare = this.findSquare(iter);
                        if(this.player.x < currSquare.x + 100 &&
                        this.player.x > currSquare.x - 100 &&
                        this.player.y < currSquare.y + 100 &&
                        this.player.y > currSquare.y - 100) {
                            break;
                        }
                    }
                    if(this.player.x < currSquare.x) {
                        this.player.x += 10;
                    } else{
                        this.player.x -= 10;
                    }

                    if(this.player.y < currSquare.y) {
                        this.player.y += 10;
                    } else{
                        this.player.y -= 10;
                    }
                }
                this.tracer.x = this.player.x;
                this.tracer.y = this.player.y;
                this.moving = false;
                this.points.splice(0, this.points.length);
                this.pointsIter1 = 0;
                this.pointsIter2 = 1;
            }
        }
    }

    // Move Square by 10px in direction of empty square when called
    moveSquare(squareNum) {
        let emptyX = this.emptySpace.x;
        let emptyY = this.emptySpace.y;
        let timeDelay = this.currTime() + 25;
        this.roomMoving = true;
        let enemMove;
        let enemMoving = false;

        // Move square if right of empty space
        if(emptyX == this.findSquare(squareNum).x - 200 ||(emptyX >
            this.findSquare(squareNum).x - 200 && emptyX <= this.findSquare(squareNum).x - 10)) {
            while(timeDelay > this.currTime()) {
                // Empty on Purpose
            }
            this.findSquare(squareNum).x -= 10;

            // Move enemy in room along with room
            for(let it = 0; it < this.enemies.length; it++) {
                if(this.enemies[it].x < this.findSquare(squareNum).x + 100 &&
                this.enemies[it].x > this.findSquare(squareNum).x - 100 &&
                this.enemies[it].y < this.findSquare(squareNum).y + 100 &&
                this.enemies[it].y > this.findSquare(squareNum).y - 100) {
                    this.enemies[it].x -= 10;
                }
            }

            // Move colliders along with room
            for(let iter = 0; iter < this.findColls(squareNum).length; iter++) {
                this.findColls(squareNum)[iter].x -= 10;
            }
        }

        // Move square if left of empty space
        else if (emptyX == this.findSquare(squareNum).x + 200 ||(emptyX <
            this.findSquare(squareNum).x + 200 && emptyX >= this.findSquare(squareNum).x + 10)) {
            while(timeDelay > this.currTime()) {
                // Empty on Purpose
            }
            this.findSquare(squareNum).x += 10;

            // Move enemy in room along with room
            for(let it = 0; it < this.enemies.length; it++) {
                if(this.enemies[it].x < this.findSquare(squareNum).x + 100 &&
                this.enemies[it].x > this.findSquare(squareNum).x - 100 &&
                this.enemies[it].y < this.findSquare(squareNum).y + 100 &&
                this.enemies[it].y > this.findSquare(squareNum).y - 100) {
                    this.enemies[it].x += 10;
                }
            }

            // Move colliders along with room
            for(let iter = 0; iter < this.findColls(squareNum).length; iter++) {
                this.findColls(squareNum)[iter].x += 10;
            }
        }

        // Move square if below empty space
        else if (emptyY == this.findSquare(squareNum).y - 200 ||(emptyY >
            this.findSquare(squareNum).y - 200 && emptyY <= this.findSquare(squareNum).y - 10)) {
            while(timeDelay > this.currTime()) {
                // Empty on Purpose
            }
            this.findSquare(squareNum).y -= 10;

            // Move enemy in room along with room
            for(let it = 0; it < this.enemies.length; it++) {
                if(this.enemies[it].x < this.findSquare(squareNum).x + 100 &&
                this.enemies[it].x > this.findSquare(squareNum).x - 100 &&
                this.enemies[it].y < this.findSquare(squareNum).y + 100 &&
                this.enemies[it].y > this.findSquare(squareNum).y - 100) {
                    this.enemies[it].y -= 10;
                }
            }

            // Move colliders along with room
            for(let iter = 0; iter < this.findColls(squareNum).length; iter++) {
                this.findColls(squareNum)[iter].y -= 10;
            }
        }

        // Move square if above empty space
        else if (emptyY == this.findSquare(squareNum).y + 200 ||(emptyY <
            this.findSquare(squareNum).y + 200 && emptyY >= this.findSquare(squareNum).y + 10)) {
            while(timeDelay > this.currTime()) {
                // Empty on Purpose
            }
            this.findSquare(squareNum).y += 10;

            // Move enemy in room along with room
            for(let it = 0; it < this.enemies.length; it++) {
                if(this.enemies[it].x < this.findSquare(squareNum).x + 100 &&
                this.enemies[it].x > this.findSquare(squareNum).x - 100 &&
                this.enemies[it].y < this.findSquare(squareNum).y + 100 &&
                this.enemies[it].y > this.findSquare(squareNum).y - 100) {
                    this.enemies[it].y += 10;
                }
            }

            // Move colliders along with room
            for(let iter = 0; iter < this.findColls(squareNum).length; iter++) {
                this.findColls(squareNum)[iter].y += 10;
            }
        }
    }

    // Place enemy in a random place in specified room or hall
    placeEnemy(type, space) {
        let enem;
        if (type == 'r') {
            let randX = Phaser.Math.Between(-70, 70);
            let randY = Phaser.Math.Between(-70, 70);
            enem = new Enemy(this, space.x + randX, space.y + randY, 'enemy').
            setOrigin(0.5, 0.5);
        } else {
            let randX = Phaser.Math.Between(-20, 20);
            let randY = Phaser.Math.Between(-20, 20);
            enem = new Enemy(this, space.x + randX, space.y + randY, 'enemy').
            setOrigin(0.5, 0.5);
        }
        return enem;
    }

    // Function to read from attribute array and create specific square
    determineSpace(type, exits, isExit, x, y) {
        let space;
        if(type == 'r') {
            if(isExit == false) {
                if(exits == '1') {
                    space = new Room4(this, x, y, '1exitRoom').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits == '2') {
                    space = new Room4(this, x, y, '2exitRoom').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits =='2c') {
                    space = new Room4(this, x, y, '2exitRoomCorner').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits == '3') {
                    space = new Room4(this, x, y, '3exitRoom').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else {
                    space = new Room4(this, x, y, '4exitRoom').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                }
            } else {
                if(exits == '1') {
                    space = new Room4(this, x, y, '1exit').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits == '2') {
                    space = new Room4(this, x, y, '2exit').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits =='2c') {
                    space = new Room4(this, x, y, '2exitCorner').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else if(exits == '3') {
                    space = new Room4(this, x, y, '3exit').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                } else {
                    space = new Room4(this, x, y, '4exit').
                    setOrigin(0.5, 0.5).setScale(0.334, 0.334);
                }
            }
        } else {
            if(exits == '1') {
                space = new Hall4(this, x, y, '1exitHall').
                setOrigin(0.5, 0.5).setScale(0.334, 0.334);
            } else if(exits == '2') {
                space = new Hall4(this, x, y, '2exitHall').
                setOrigin(0.5, 0.5).setScale(0.334, 0.334);
            } else if(exits =='2c') {
                space = new Hall4(this, x, y, '2exitHallCorner').
                setOrigin(0.5, 0.5).setScale(0.334, 0.334);
            } else if(exits == '3') {
                space = new Hall4(this, x, y, '3exitHall').
                setOrigin(0.5, 0.5).setScale(0.334, 0.334);
            } else {
                space = new Hall4(this, x, y, '4exitHall').
                setOrigin(0.5, 0.5).setScale(0.334, 0.334);
            }
        }
        return space;
    }

    // Function to read from attribute array and create colliders for a square
    determineColliders(space, type, exits) {
        let colls;
        if (type == 'r') {
            if(exits == '1') {
                colls = this.roomColliders(space, 1, false);
            } else if(exits == '2') {
                colls = this.roomColliders(space, 2, false);
            } else if(exits =='2c') {
                colls = this.roomColliders(space, 2, true);
            } else if(exits == '3') {
                colls = this.roomColliders(space, 3, false);
            } else {
                colls = this.roomColliders(space, 4, false);
            }
        } else {
            if(exits == '1') {
                colls = this.hallColliders(space, 1, false);
            } else if(exits == '2') {
                colls = this.hallColliders(space, 2, false);
            } else if(exits =='2c') {
                colls = this.hallColliders(space, 2, true);
            } else if(exits == '3') {
                colls = this.hallColliders(space, 3, false);
            } else {
                colls = this.hallColliders(space, 4, false);
            }
        }
        return colls;
    }

    // Creates all squares on map
    populateSpaces(attributes) {
        this.space1 = this.determineSpace(attributes[0], attributes[1], attributes[2], 100, 150);
        this.space1.angle = attributes[3];
        this.space2 = this.determineSpace(attributes[4], attributes[5], attributes[6], 300, 150);
        this.space2.angle = attributes[7];
        this.space3 = this.determineSpace(attributes[8], attributes[9], attributes[10], 500, 150);
        this.space3.angle = attributes[11];
        this.emptySpace = new Hall4(this, 700, 150, 'emptySquare').
        setOrigin(0.5, 0.5);
        this.emptySpace.alpha = 0;
        this.space4 = this.determineSpace(attributes[12], attributes[13], attributes[14], 100, 350);
        this.space4.angle = attributes[15];
        this.space5 = this.determineSpace(attributes[16], attributes[17], attributes[18], 300, 350);
        this.space5.angle = attributes[19];
        this.space6 = this.determineSpace(attributes[20], attributes[21], attributes[22], 500, 350);
        this.space6.angle = attributes[23];
        this.space7 = this.determineSpace(attributes[24], attributes[25], attributes[26], 700, 350);
        this.space7.angle = attributes[27];
        this.space8 = this.determineSpace(attributes[28], attributes[29], attributes[30], 100, 550);
        this.space8.angle = attributes[31];
        this.space9 = this.determineSpace(attributes[32], attributes[33], attributes[34], 300, 550);
        this.space9.angle = attributes[35];
        this.space10 = this.determineSpace(attributes[36], attributes[37], attributes[38], 500, 550);
        this.space10.angle = attributes[39];
        this.space11 = this.determineSpace(attributes[40], attributes[41], attributes[42], 700, 550);
        this.space11.angle = attributes[43];
        this.space12 = this.determineSpace(attributes[44], attributes[45], attributes[46], 100, 750);
        this.space12.angle = attributes[47];
        this.space13 = this.determineSpace(attributes[48], attributes[49], attributes[50], 300, 750);
        this.space13.angle = attributes[51];
        this.space14 = this.determineSpace(attributes[52], attributes[53], attributes[54], 500, 750);
        this.space14.angle = attributes[55];
        this.space15 = this.determineSpace(attributes[56], attributes[57], attributes[58], 700, 750);
        this.space15.angle = attributes[59];
    }

    // Creates all colliders to correspond with squares
    populateColliders(attributes) {
        this.colliders = [];

        this.s1colls = this.determineColliders(this.space1, attributes[0], attributes[1]);
        this.s2colls = this.determineColliders(this.space2, attributes[4], attributes[5]);
        this.s3colls = this.determineColliders(this.space3, attributes[8], attributes[9]);
        this.s4colls = this.determineColliders(this.space4, attributes[12], attributes[13]);
        this.s5colls = this.determineColliders(this.space5, attributes[16], attributes[17]);
        this.s6colls = this.determineColliders(this.space6, attributes[20], attributes[21]);
        this.s7colls = this.determineColliders(this.space7, attributes[24], attributes[25]);
        this.s8colls = this.determineColliders(this.space8, attributes[28], attributes[29]);
        this.s9colls = this.determineColliders(this.space9, attributes[32], attributes[33]);
        this.s10colls = this.determineColliders(this.space10, attributes[36], attributes[37]);
        this.s11colls = this.determineColliders(this.space11, attributes[40], attributes[41]);
        this.s12colls = this.determineColliders(this.space12, attributes[44], attributes[45]);
        this.s13colls = this.determineColliders(this.space13, attributes[48], attributes[49]);
        this.s14colls = this.determineColliders(this.space14, attributes[52], attributes[53]);
        this.s15colls = this.determineColliders(this.space15, attributes[56], attributes[57]);
        this.ecolls = this.emptyRoomColliders(this.emptySpace);

        // Create screen Edges
        this.edgeLeft = new Collision(this, 7, 450, 'edge2').setOrigin(0.5, 0.5);
        this.edgeLeft = this.physics.add.existing(this.edgeLeft);
        this.edgeRight = new Collision(this, 793, 450, 'edge2').setOrigin(0.5, 0.5);
        this.edgeRight = this.physics.add.existing(this.edgeRight);
        this.edgeTop = new Collision(this, 400, 57, 'edge').setOrigin(0.5, 0.5);
        this.edgeTop = this.physics.add.existing(this.edgeTop);
        this.edgeBottom = new Collision(this, 400, 843, 'edge').setOrigin(0.5, 0.5);
        this.edgeBottom = this.physics.add.existing(this.edgeBottom);

        this.colliders = this.colliders.concat(this.s1colls, this.s2colls, this.s3colls, this.s4colls,
        this.s5colls, this.s6colls, this.s7colls, this.s8colls, this.s9colls,
        this.s10colls, this.s11colls, this.s12colls, this.s13colls, this.s14colls,
        this.s15colls, this.ecolls);

        this.colliders.push(this.edgeLeft);
        this.colliders.push(this.edgeRight);
        this.colliders.push(this.edgeTop);
        this.colliders.push(this.edgeBottom);

        // Makes colliders invisible
        for (let iter = 0; iter < this.colliders.length - 4; iter++) {
            this.colliders[iter].alpha = 0;
        }
    }

    // Creates special colliders for empty square
    emptyRoomColliders(emptyRoom) {
        let colls = []
        let c1 = this.makeCollider(emptyRoom, -53, -87, 'temp50x10');
        let c2 = this.makeCollider(emptyRoom, -87, -53, 'temp10x50');
        let c3 = this.makeCollider(emptyRoom, -87, 53, 'temp10x50');
        let c4 = this.makeCollider(emptyRoom, -53, 87, 'temp50x10');
        let c5 = this.makeCollider(emptyRoom, 53, 87, 'temp50x10');
        let c6 = this.makeCollider(emptyRoom, 87, 53, 'temp10x50');
        let c7 = this.makeCollider(emptyRoom, 87, -53, 'temp10x50');
        let c8 = this.makeCollider(emptyRoom, 53, -87, 'temp50x10');
        let c9 = this.makeCollider(emptyRoom, 0, -87, 'temp50x10');
        let c10 = this.makeCollider(emptyRoom, -87, 0, 'temp10x50');
        let c11 = this.makeCollider(emptyRoom, 87, 0, 'temp10x50');
        let c12 = this.makeCollider(emptyRoom, 0, 87, 'temp50x10');

        colls.push(c1);
        colls.push(c2);
        colls.push(c3);
        colls.push(c4);
        colls.push(c5);
        colls.push(c6);
        colls.push(c7);
        colls.push(c8);
        colls.push(c9);
        colls.push(c10);
        colls.push(c11);
        colls.push(c12);

        return colls;
    }

    // Returns array of colliders for specified room
    roomColliders(room, doors, corner) {
        let colls = [];
        let c1 = this.makeCollider(room, -66, -100, 'temp50x10');
        let c2 = this.makeCollider(room, -100, -66, 'temp10x50');
        let c3 = this.makeCollider(room, -100, 66, 'temp10x50');
        let c4 = this.makeCollider(room, -66, 100, 'temp50x10');
        let c5 = this.makeCollider(room, 66, 100, 'temp50x10');
        let c6 = this.makeCollider(room, 100, 66, 'temp10x50');
        let c7 = this.makeCollider(room, 100, -66, 'temp10x50');
        let c8 = this.makeCollider(room, 66, -100, 'temp50x10');

        colls.push(c1);
        colls.push(c2);
        colls.push(c3);
        colls.push(c4);
        colls.push(c5);
        colls.push(c6);
        colls.push(c7);
        colls.push(c8);

        // Blocks certain sides where path ends
        if (doors == 1) {
            let a1 = this.makeCollider(room, 0, -100, 'temp50x10');
            let a2 = this.makeCollider(room, -100, 0, 'temp10x50');
            let a3 = this.makeCollider(room, 100, 0, 'temp10x50');
            colls.push(a1);
            colls.push(a2);
            colls.push(a3);
        } else if (doors == 2) {
            if (corner == true) {
                let a1 = this.makeCollider(room, 0, 100, 'temp50x10');
                let a2 = this.makeCollider(room, -100, 0, 'temp10x50');
                colls.push(a1);
                colls.push(a2);
            } else {
                let a1 = this.makeCollider(room, -100, 0, 'temp10x50');
                let a2 = this.makeCollider(room, 100, 0, 'temp10x50');
                colls.push(a1);
                colls.push(a2);
            }
        } else if (doors == 3) {
            let a1 = this.makeCollider(room, -100, 0, 'temp10x50');
            colls.push(a1);
        }

        return colls;
    }

    // Returns array of colliders for specified hallway
    hallColliders(hall, doors, corner) {
        let colls = [];
        let c1 = this.makeCollider(hall, -46, -71, 'temp10x60');
        let c2 = this.makeCollider(hall, -71, -46, 'temp60x10');
        let c3 = this.makeCollider(hall, -71, 46, 'temp60x10');
        let c4 = this.makeCollider(hall, -46, 71, 'temp10x60');
        let c5 = this.makeCollider(hall, 46, 71, 'temp10x60');
        let c6 = this.makeCollider(hall, 71, 46, 'temp60x10');
        let c7 = this.makeCollider(hall, 71, -46, 'temp60x10');
        let c8 = this.makeCollider(hall, 46, -71, 'temp10x60');

        colls.push(c1);
        colls.push(c2);
        colls.push(c3);
        colls.push(c4);
        colls.push(c5);
        colls.push(c6);
        colls.push(c7);
        colls.push(c8);

        // Blocks certain sides where path ends
        if (doors == 1) {
            let a1 = this.makeCollider(hall, -46, 0, 'temp10x60');
            let a2 = this.makeCollider(hall, 0, 46, 'temp60x10');
            let a3 = this.makeCollider(hall, 46, 0, 'temp10x60');
            colls.push(a1);
            colls.push(a2);
            colls.push(a3);
        } else if (doors == 2) {
            if (corner == true) {
                let a1 = this.makeCollider(hall, -46, 0, 'temp10x60');
                let a2 = this.makeCollider(hall, 0, 46, 'temp60x10');
                colls.push(a1);
                colls.push(a2);1
            } else {
                let a1 = this.makeCollider(hall, -46, 0, 'temp10x60');
                let a2 = this.makeCollider(hall, 46, 0, 'temp10x60');
                colls.push(a1);
                colls.push(a2);
            }
        } else if (doors == 3) {
            let a1 = this.makeCollider(hall, -46, 0, 'temp10x60');
            colls.push(a1);
        }

        return colls;
    }

    // Makes each collider object
    makeCollider(square, xoffset, yoffset, texture) {
        let col = new Collision(this, square.x + xoffset,
        square.y + yoffset, texture).setOrigin(0.5, 0.5);
        col = this.physics.add.existing(col);
        return col;
    }

    // Determines Which Game Scene is Next
    determineNextScene() {
        switch(this.levelNum) {
            case 1:
                return 'level02Scene';
                break;
            case 2:
                return 'level03Scene';
                break;
            case 3:
                return 'level04Scene';
                break;
            case 4:
                return 'level05Scene';
                break;
            default:
                return 'endScene';
        }
    }

    // Moves Game to Next Scene
    goToNextScene() {
        // Stop audio
        this.walking.stop();
        this.ambiance.stop();
        this.enemySound.stop();

        // Make player invisible
        this.player.alpha = 0;

        // Zoom camera into exit
        this.camera.stopFollow();
        this.camera.centerOn(this.findSquare(this.exitSquareNum).x,
        this.findSquare(this.exitSquareNum).y);
        this.camera.zoomTo(30, 800);

        // Fade out
        if(this.determineNextScene() == 'endScene') {
            if(this.fading == false) {
                this.fading = true;
                this.cameras.main.fadeOut(1000, 255, 255, 255, () => {
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.scene.start('endScene', {win: true, tutorial: false});
                    });
                });
            }
        } else {
            this.time.delayedCall(1000, () => { this.gameOver = false;
            this.scene.start(this.determineNextScene(), this.sanity);});
        }
    }

}
