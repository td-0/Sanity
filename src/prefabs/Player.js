// Player Character
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    update(mx,my) {
        this.x = mx;
        this.y = my;
    }
}
