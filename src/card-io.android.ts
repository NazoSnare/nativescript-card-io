import { Common, ScanCardIO, CardScanOption, CreditCard, CardType } from './card-io.common';
import * as app from 'tns-core-modules/application';

declare var io;
const CardIOActivity = io.card.payment.CardIOActivity;
const CardType = io.card.payment.CardType;
const CreditCard = io.card.payment.CreditCard;
const StringKey = io.card.payment.i18n.StringKey;
const SupportedLocale = io.card.payment.i18n.SupportedLocale;
const LocalizedStringsList = io.card.payment.i18n.locales.LocalizedStringsList;

const REQUEST_SCAN = 100;

export class CardIo extends Common implements ScanCardIO {

    constructor() {
        super();
    }

    public scan(options?: CardScanOption) {
        return new Promise((resolve, reject) => {

            app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
                if (args.requestCode === REQUEST_SCAN && args.intent != null && args.intent.hasExtra(CardIOActivity.EXTRA_SCAN_RESULT)) {
                    const result: any = args.intent.getParcelableExtra(CardIOActivity.EXTRA_SCAN_RESULT);
                    if (result != null) {

                        const cardType: any = result.getCardType();

                        let data: CreditCard = {
                            describeContents: result.describeContents(),
                            cardType: {
                                cvvLength: cardType.cvvLength(),
                                fromCardNumber: (numStr: string) => cardType.fromCardNumber(numStr),
                                fromString: (typeStr: string) => cardType.fromString(typeStr),
                                displayName: (languageOrLocale: string) => cardType.getDisplayName(languageOrLocale),
                                imageBitmap: cardType.imageBitmap(app.android.context),
                                numberLength: cardType.numberLength(),
                                content: cardType.toString(),
                                valueOf: (name) => cardType.valueOf(name)
                            },
                            formattedCardNumber: result.getFormattedCardNumber(),
                            lastFourDigitsOfCardNumber: result.getLastFourDigitsOfCardNumber(),
                            redactedCardNumber: result.getRedactedCardNumber(),
                            isExpiryValid: result.isExpiryValid(),
                            content: result.toString()
                        };

                        resolve(data);
                    } else {
                        reject('error result');
                    }

                } else {
                    reject('error');
                }

                app.android.off(app.AndroidApplication.activityResultEvent);
            });

            let scanIntent = new android.content.Intent(app.android.context, CardIOActivity.class);
            // set options

            if (options.android.noCamera !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_NO_CAMERA, options.android.noCamera);
            }

            if (options.android.requireExpiry !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_REQUIRE_EXPIRY, options.android.requireExpiry);
            }

            if (options.android.scanExpiry !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_SCAN_EXPIRY, options.android.scanExpiry);
            }

            if (options.android.requireCvv !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_REQUIRE_CVV, options.android.requireCvv);
            }

            if (options.android.requirePostalCode !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_REQUIRE_POSTAL_CODE, options.android.requirePostalCode);
            }

            if (options.android.restrictPostalCodeToNumericOnly !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_RESTRICT_POSTAL_CODE_TO_NUMERIC_ONLY, options.android.restrictPostalCodeToNumericOnly);
            }

            if (options.android.requireCardholderName !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_REQUIRE_CARDHOLDER_NAME, options.android.requireCardholderName);
            }

            if (options.android.suppressManualEntry !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_SUPPRESS_MANUAL_ENTRY, options.android.suppressManualEntry);
            }

            if (options.android.useCardioLogo !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_USE_CARDIO_LOGO, options.android.useCardioLogo);
            }

            if (options.android.languageOrLocale !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_LANGUAGE_OR_LOCALE, options.android.languageOrLocale);
            }

            if (options.android.usePaypalActionbarIcon !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_USE_PAYPAL_ACTIONBAR_ICON, options.android.usePaypalActionbarIcon);
            }

            if (options.android.keepApplicationTheme !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_KEEP_APPLICATION_THEME, options.android.keepApplicationTheme);
            }

            if (options.android.guideColor !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_GUIDE_COLOR, options.android.guideColor);
            }

            if (options.android.suppressConfirmation !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_SUPPRESS_CONFIRMATION, options.android.suppressConfirmation);
            }

            if (options.android.suppressScan !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_SUPPRESS_SCAN, options.android.suppressScan);
            }

            if (options.android.returnCardImage !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_RETURN_CARD_IMAGE, options.android.returnCardImage);
            }

            if (options.android.unblurDigits !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_UNBLUR_DIGITS, options.android.unblurDigits);
            }

            if (options.android.hideCardioLogo !== undefined) {
                scanIntent.putExtra(CardIOActivity.EXTRA_HIDE_CARDIO_LOGO, options.android.hideCardioLogo);
            }

            // REQUEST_SCAN is arbitrary and is only used within this activity.
            app.android.foregroundActivity.startActivityForResult(scanIntent, REQUEST_SCAN);
        });
    }
}
