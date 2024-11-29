import { KeyboardInputComponent } from '../components/input/keyboard-input-component.js';

export class Player extends Phaser.GameObjects.Container {
  #shipSprite;
  #shipEngine;
  #shipEngineThruster;
  #keyboardInputComponent;

  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

    this.scene.add.existing(this);

    this.#shipSprite = scene.add.sprite(0, 0, 'ship');
    this.#shipEngine = scene.add.sprite(0, 0, 'ship_engine');
    this.#shipEngineThruster = scene.add.sprite(0, 0, 'ship_engine_thruster');

    this.add([this.#shipEngineThruster, this.#shipEngine, this.#shipSprite]);
    this.#shipEngineThruster.play('ship_engine_thruster');

    this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);

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
    // console.log(this.#keyboardInputComponent.downIsDown);
  }
}
