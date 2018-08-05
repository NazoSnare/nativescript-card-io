import { Common } from './card-io.common';
declare var CardIOPaymentViewController, UIModalPresentationFormSheet, CardIOPaymentViewControllerDelegate, CardIOUtilities;

class CardIODelegate extends NSObject {
    public static ObjCProtocols = [CardIOPaymentViewControllerDelegate];
    private _owner: WeakRef<CardIo>;

    public static initWithOwner(owner: WeakRef<CardIo>): CardIODelegate {
        let delegate = <CardIODelegate>CardIODelegate.new();
        delegate._owner = owner;
        return delegate;
    }

    public userDidCancelPaymentViewController(paymentViewController: any) {
        console.log('Inside');
        paymentViewController.dismissViewControllerAnimated(true, null);
    }

    public userDidProvideCreditCardInfoInPaymentViewController(cardInfo: any, paymentViewController: any) {
        // if let info = cardInfo {
        //     let str = NSString(format: "Received card info.\n Number: %@\n expiry: %02lu/%lu\n cvv: %@.", info.redactedCardNumber, info.expiryMonth, info.expiryYear, info.cvv)
        //     resultLabel.text = str as String
        // }

        paymentViewController.dismissViewControllerAnimated(true, null);
    }

}

export class CardIo extends Common {
    constructor() {
        super();

        CardIOUtilities.preload();
    }

    public scan(): Promise<any> {
        return new Promise((resolve, reject) => {
            let delegate = CardIODelegate.initWithOwner(new WeakRef(this));
            let scanViewController = CardIOPaymentViewController.alloc().initWithPaymentDelegate(delegate);
            scanViewController.modalPresentationStyle = UIModalPresentationFormSheet;
            rootVC().presentViewControllerAnimatedCompletion(scanViewController, true, resolve);
        });
    }
}

const rootVC = function () {
    let appWindow = UIApplication.sharedApplication.keyWindow;
    return appWindow.rootViewController;
};
