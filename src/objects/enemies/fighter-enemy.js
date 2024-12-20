import { BotFighterInputComponent } from '../../components/input/bot-fighter-input-component.js';
import { VerticalMovementComponent } from '../../components/movement/vertical-movement.js';
import { BOT_FIGHTER_MOVEMENT_VERTICAL_VELOCITY } from '../../config.js';

export class FighterEnemy extends Phaser.GameObjects.Container {
  #shipSprite;
  #shipEngine;
  #inputComponent;
  #verticalMovementComponent;

  constructor(scene, x, y) {
    super(scene, x, y, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);

    this.#shipSprite = scene.add.sprite(0, 0, 'scout', 0);
    this.#shipEngine = scene.add.sprite(0, 0, 'scout_engine');

    this.#shipEngine.angle = 180;
    this.#shipEngine.play('scout_engine');

    this.add([this.#shipEngine, this.#shipSprite]);

    this.#inputComponent = new BotFighterInputComponent();
    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
      this.#inputComponent,
      BOT_FIGHTER_MOVEMENT_VERTICAL_VELOCITY
    );

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this
    );
  }

  update(timeStamp, deltaTime) {
    // responsible for moving the fighter enemy
    this.#verticalMovementComponent.update();
  }
}
