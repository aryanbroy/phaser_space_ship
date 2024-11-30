export class VerticalMovementComponent {
  #gameObject;
  #inputComponent;
  #velocity;

  constructor(gameObject, inputComponent, velocity) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent;
    this.#velocity = velocity;

    this.#gameObject.body.setDamping(true);
    this.#gameObject.body.setDrag(0.01);
    this.#gameObject.body.setMaxVelocity(220);
  }

  reset() {
    this.#gameObject.body.velocity.y = 0;
    this.#gameObject.body.setAngularAcceleration(0);
  }

  update() {
    if (this.#inputComponent.upIsDown) {
      this.#gameObject.body.velocity.y -= this.#velocity;
    } else if (this.#inputComponent.downIsDown) {
      this.#gameObject.body.velocity.y += this.#velocity;
    } else {
      this.#gameObject.body.setAngularAcceleration(0);
    }

    // if(this.#inputComponent.downIsDown) {
    //     this.#gameObject.body.velocity.y = -200;
    // } else {
    //     this.#gameObject.body.velocity.y = 0;
    //     this.#gameObject.body.setAngularAcceleration(0);
    // }
    // this.#gameObject.body.velocity.y = this.#velocity;
  }
}
