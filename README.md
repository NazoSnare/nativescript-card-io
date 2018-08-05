# nativescript-card-io

nativescript-card-io provides fast, easy credit card scanning in mobile apps.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-card-io
```

## Usage 

```typescript
import { CardIo } from 'nativescript-card-io';

let cardIo = new CardIo();

cardIo.scan({
    android: {
        requireExpiry: true,
        requireCvv: true,
        requirePostalCode: false,
        returnCardImage: true
    }
}).then((result: CreditCard) => {
    console.log("RESULT >>> ", result);
}, error => {
    console.log("ERROR >>> ", error);
});
```

## API

`scan(options): Promise;`

Start the scanning process

## Options format

`Everything that has '?' is optional`

### Scan Options

| Property                   | Description                                           |
| -------------------------- | ----------------------------------------------------- |
|  android?: AndroidOption   | Set Android Options                                   |
|  ios?: any                 | Set iOS Options                                       |

### Android Options

| Property                       | Default    | Description                                           |
| ------------------------------ | ---------- | ----------------------------------------------------- |
| noCamera?: boolean             | Defaults to false. | If set, the card will not be scanned with the camera.
| requireExpiry?: boolean       | Defaults to false. | If set to false, expiry information will not be required.
| unblurDigits?: number       | Defaults to -1 (no blur). | How many of the Card number digits NOT to blur on the resulting image. Setting it to 4 will blur all digits except the last four.
| scanExpiry?: boolean          | Defaults to true. | If set to true, and `requireExpiry` is true, an attempt to extract the expiry from the card image will be made.
| requireCvv?: boolean          | Defaults to false. | If set, the user will be prompted for the card CVV.
| requirePostalCode?: boolean   | Defaults to false. | If set, the user will be prompted for the card billing postal code.
| restrictPostalCodeToNumericOnly?: boolean | Defaults to false. | If set, the postal code will only collect numeric input. Set this if you know the expected country's postal code has only numeric postal codes.
| requireCardholderName?: boolean | Defaults to false. | If set, the user will be prompted for the cardholder name.
| suppressManualEntry?: boolean | Defaults to false. | Removes the keyboard button from the scan screen. 
| useCardioLogo?: boolean | Defaults to false. | If set, the card.io logo will be shown instead of the PayPal logo.
| hideCardioLogo?: boolean | Defaults to false. | When set to true the card.io logo will not be shown overlaid on the camera.
| languageOrLocale?: string | | The preferred language for all strings appearing in the user interface. If not set, or if set to null, defaults to the device's current language setting. Can be specified as a language    code ("en", "fr", "zh-Hans", etc.) or as a locale ("en_AU", "fr_FR", "zh-Hant_TW", etc.).
| usePaypalActionbarIcon?: boolean | | Use the PayPal icon in the ActionBar.
| keepApplicationTheme?: boolean |  | If this value is set to true, and the application has a theme, the theme will be set to the theme of the application.
| guideColor?: string | Defaults to green. | Changes the color of the guide overlay on the camera.
| suppressConfirmation?: boolean | | If this value is set to true the user will not be prompted to confirm their card number after processing.
| suppressScan?: boolean | | Once a card image has been captured but before it has been processed, this value will determine whether to continue processing as usual.
| returnCardImage?: boolean | | If this value is set to true the card image will be return as ImageSource

### Result Option

#### Credit Card

| Property           | Description                                           |
| ------------------ | ----------------------------------------------------- |
| cardType: CardType | Get Card `CardType` Details                           |
| formattedCardNumber: string | Get the formatted Card Number                |
| lastFourDigitsOfCardNumber: string | Get the last Four Digit on the Card Number |
| redactedCardNumber: string | Get Redacted Card Number                      |
| isExpiryValid: boolean | Get a boolean which indicate the validity of the Card |
| content: string | Get the Card Details                                     |

#### Card Type

| Property           | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| cvvLength: number  | Get cvv number length (4 for Amex, 3 for others, -1 for unknown) |
| displayName(languageOrLocale: string): string | Get the Card Display Name             |
| imageBitmap: any   | Get The ImageBitmap image after scan if `returnCardImage` is `true` |
| numberLength: number | Get Card Number Length e.g(15 for AmEx, -1 for unknown, 16 for others.) |
| content: string | Get Card Type Details                                      |

## Author

Jonathan Mayunga, mayunga.j@gmail.com
    
## License

Apache License Version 2.0, January 2004
