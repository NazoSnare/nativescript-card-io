import { Observable } from 'tns-core-modules/data/observable';
import { CardIo } from 'nativescript-card-io';
import { CreditCard } from 'nativescript-card-io/card-io.common';

export class HelloWorldModel extends Observable {
    private cardIo: CardIo;

    constructor() {
        super();
        this.cardIo = new CardIo();
    }

    scan(): void {
        this.cardIo.scan({
            android: {
                requireExpiry: true,
                requireCvv: true,
                requirePostalCode: false,
                returnCardImage: true
            }
        }).then((result: CreditCard) => {
            console.log("Result >>> ", result);
        }, error => {
            console.log("ERROR >>> ", error);
        });
    }
}
