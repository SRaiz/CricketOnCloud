import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowToastMessageLwc extends LightningElement {
    @api message;
    @api title;
    @api variant = 'info';
    @api mode = 'dismissible';

    connectedCallback() {
        this.fireToastEvent();
    }

    fireToastEvent() {
        const toastEvent = new ShowToastEvent({
            title : this.title, 
            message : this.message, 
            variant : this.variant, 
            mode : this.mode
        });
        this.dispatchEvent(toastEvent);
    }
}