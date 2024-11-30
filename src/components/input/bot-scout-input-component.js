import { ENEMY_SCOUT_MOVEMENT_MAX_X } from '../../config.js';
import { InputComponent } from './input-component.js';

export class BotScoutInputComponent extends InputComponent {
  #gameObject;
  #startX;
  #maxMovement;

  constructor(gameObject) {
    super();
    this.#gameObject = gameObject;
    this.#maxMovement = ENEMY_SCOUT_MOVEMENT_MAX_X;
    this.#startX = this.#gameObject.x;
    this._right = true;
    this._down = true;
    this._left = false;
  }

  update() {
    if (this.#gameObject.x > this.#startX + this.#maxMovement) {
      this._right = false;
      this._left = true;
    } else if (this.#gameObject.x < this.#startX - this.#maxMovement) {
      this._right = true;
      this._left = false;
    }
  }
}
