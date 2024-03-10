import { LightningElement } from 'lwc';
import CustomModalLwc from 'c/customModalLwc';

export default class CreateMatchLwc extends LightningElement {

    connectedCallback() {
        this.openCreateMatchModal();
    }

    async openCreateMatchModal() {
        const flowInputParams = [
            { name : 'varLaunchedFrom', type: 'String', value : 'New Match' }
        ];

        await CustomModalLwc.open({
            size : 'small', 
            header : 'Create Match', 
            flow : 'Custom_Modal_Flow', 
            flowParams : flowInputParams, 
            onfooterbuttonclick : (event) => {
                const { label } = event;
            }
        });
    }
}