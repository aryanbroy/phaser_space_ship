export class WeaponComponent {
  #gameObject;
  #bulletConfig;
  #inputComponent;
  #bulletGroup;
  #fireBulletInterval;

  constructor(gameObject, inputComponent, bulletConfig) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent;
    this.#bulletConfig = bulletConfig;
    this.#fireBulletInterval = 0;

    this.#bulletGroup = this.#gameObject.scene.physics.add.group({
      name: `bullets-${Phaser.Math.RND.uuid()}`,
      enable: false,
    });

    this.#bulletGroup.createMultiple({
      key: 'bullet',
      quantity: this.#bulletConfig.maxBullets,
      active: false,
      visible: false,
    });

    // console.log(this.#bulletGroup);
  }

  update(dt) {
    this.#fireBulletInterval -= dt;

    if (this.#fireBulletInterval > 0) {
      return;
    }
    if (this.#inputComponent.shootIsDown) {
      const bullet = this.#bulletGroup.getFirstDead();

      if (bullet === null || bullet === undefined) {
        return;
      }
      const x = this.#gameObject.x;
      const y = this.#gameObject.y + this.#bulletConfig.offsetY;
      bullet.enableBody(true, x, y, true, true);

      this.#fireBulletInterval = this.#bulletConfig.interval;
    }
  }
}
