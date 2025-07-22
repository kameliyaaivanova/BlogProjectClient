import { BehaviorSubject } from 'rxjs';

export class AuthSubject {
  private static emitter: BehaviorSubject<boolean>;

  private constructor() {}

  public static get() {
    if (!this.emitter) {
      this.emitter = new BehaviorSubject<boolean>(false);;
    }

    return this.emitter;
  }
}
