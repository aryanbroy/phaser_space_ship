import { KeyboardInputComponent } from '../components/input/keyboard-input-component.js';
import { HorizontalMovement } from '../components/movement/horizontal-movement.js';
import { WeaponComponent } from '../components/weapon/weapon-component.js';
import { PLAYER_BULLET_MAX_COUNT, PLAYER_MOVEMENT_HORIZONTAL_VELOCITY } from '../config.js';

export class Player extends Phaser.GameObjects.Container {
  #shipSprite;
  #weaponComponent;
  #shipEngine;
  #shipEngineThruster;
  #keyboardInputComponent;
  #horizontalMovementComponent;

  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);
    this.body.setCollideWorldBounds(true);
    this.setDepth(2);

    this.#shipSprite = scene.add.sprite(0, 0, 'ship');
    this.#shipEngine = scene.add.sprite(0, 0, 'ship_engine');
    this.#shipEngineThruster = scene.add.sprite(0, 0, 'ship_engine_thruster');

    this.add([this.#shipEngineThruster, this.#shipEngine, this.#shipSprite]);
    this.#shipEngineThruster.play('ship_engine_thruster');

    this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);
    this.#horizontalMovementComponent = new HorizontalMovement(
      this,
      this.#keyboardInputComponent,
      PLAYER_MOVEMENT_HORIZONTAL_VELOCITY
    );
    this.#weaponComponent = new WeaponComponent(this, this.#keyboardInputComponent, {
      maxBullets: PLAYER_BULLET_MAX_COUNT,
      offsetY: -20,
      interval: 500,
    });

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
    // console.log(timeStamp, deltaTime);
    this.#keyboardInputComponent.update();
    this.#horizontalMovementComponent.update();
    this.#weaponComponent.update(deltaTime);
    // console.log(this.#keyboardInputComponent.downIsDown);
  }
}
