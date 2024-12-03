import { BotScoutInputComponent } from '../../components/input/bot-scout-input-component.js';
import { HorizontalMovement } from '../../components/movement/horizontal-movement.js';
import { VerticalMovementComponent } from '../../components/movement/vertical-movement.js';
import { BOT_SCOUT_MOVEMENT_VERTICAL_VELOCITY, ENEMY_SCOUT_MOVEMENT_HORIZONTAL_VELOCITY } from '../../config.js';

export class ScoutEnemy extends Phaser.GameObjects.Container {
  #shipSprite;
  #shipEngine;
  #inputComponent;
  #verticalMovementComponent;
  #horizontalMovementComponent;

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

    this.#inputComponent = new BotScoutInputComponent(this);
    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
      this.#inputComponent,
      BOT_SCOUT_MOVEMENT_VERTICAL_VELOCITY
    );

    this.#horizontalMovementComponent = new HorizontalMovement(
      this,
      this.#inputComponent,
      ENEMY_SCOUT_MOVEMENT_HORIZONTAL_VELOCITY
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
    // responsible for moving the scout enemy
    this.#inputComponent.update();
    this.#verticalMovementComponent.update();
    this.#horizontalMovementComponent.update();
  }
}
