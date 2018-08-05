import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';

export interface ScanCardIO {
  scan(options?: CardScanOption): Promise<any>;
}

export interface CardScanOption {
  android?: AndroidOption;
  ios?: any;
}

export interface AndroidOption {
  noCamera?: boolean;
  requireExpiry?: boolean;
  unblurDigits?: number;
  scanExpiry?: boolean;
  requireCvv?: boolean;
  requirePostalCode?: boolean;
  restrictPostalCodeToNumericOnly?: boolean;
  requireCardholderName?: boolean;
  suppressManualEntry?: boolean;
  useCardioLogo?: boolean;
  hideCardioLogo?: boolean;
  languageOrLocale?: string;
  usePaypalActionbarIcon?: boolean;
  keepApplicationTheme?: boolean;
  guideColor?: number;
  suppressConfirmation?: boolean;
  suppressScan?: boolean;
  returnCardImage?: boolean;
}

export interface CreditCard {
  describeContents: number;
  cardType: CardType;
  formattedCardNumber: string;
  lastFourDigitsOfCardNumber: string;
  redactedCardNumber: string;
  isExpiryValid: boolean;
  content: string;
}

export interface CardType {
  cvvLength: number;
  fromCardNumber(numStr: string): CardType;
  fromString(typeStr: string): CardType;
  displayName(languageOrLocale: string): string;
  imageBitmap: any;
  numberLength: number;
  content: string;
  valueOf(name: string): CardType;
  values?: CardType[];
}

export class Common extends Observable {


}
