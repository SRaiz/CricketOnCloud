import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CustomModalLwc extends LightningModal {
    @api header = 'Modal Header';
    @api footer = false;
    @api buttons = [];
    @api flow;
    @api flowParams = [];

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // set behavior after a finished flow interview
        }
    }
}