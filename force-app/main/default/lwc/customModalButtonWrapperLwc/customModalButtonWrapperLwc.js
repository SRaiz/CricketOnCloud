import { api, LightningElement } from 'lwc';

export default class CustomModalButtonWrapperLwc extends LightningElement {
    @api label;

    /** 
     *  Dispatch a custom event when the button is clicked to pass the name of the clicked button
    */
    handleFooterButtonClick(event) {
        const {label} = event.target;

        //-- Create and fire a custom event on button click --//
        const buttonClickEvent = new CustomEvent('footerbuttonclick', {
            bubbles : true, 
            composed : true, 
            detail : {
                label
            }
        });
        this.dispatchEvent(buttonClickEvent);
    }
}