import { Common, ScanCardIO, CardScanOption } from './card-io.common';
export declare class CardIo extends Common implements ScanCardIO {
    constructor();
    scan(options: CardScanOption): Promise<{}>;
}
