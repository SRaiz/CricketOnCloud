import { api, LightningElement } from 'lwc';

export default class NavigateToRecordLwc extends LightningElement {
    @api recordId;
    @api target = '_self';

    connectedCallback() {
        const recordUrl = `${window.location.origin}/${this.recordId}`;
        window.open(recordUrl, this.target);
    }
}