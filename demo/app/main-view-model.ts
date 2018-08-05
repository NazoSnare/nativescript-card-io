import { Observable } from 'tns-core-modules/data/observable';
import { CardIo } from 'nativescript-card-io';

export class HelloWorldModel extends Observable {
  public message: string;
  private cardIo: CardIo;

  constructor() {
    super();

    this.cardIo = new CardIo();
    this.message = this.cardIo.message;
  }
}
