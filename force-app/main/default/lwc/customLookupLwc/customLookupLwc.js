import { api, LightningElement } from 'lwc';

//-- Constants for maintaining the relevant classes required for custom lookup component --//
const FORM_ELEMENT = 'slds-form-element';
const COMBOBOX_CLASS = 'slds-combobox_container';
const COMBOBOX_DROPDOWN_CLASS = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
const COMBOBOX_FORM_ELEMENT_CLASS = 'slds-combobox__form-element slds-input-has-icon';
const INPUT_RIGHT_ICON_CLASS = ' slds-input-has-icon_right';
const INPUT_LEFT_RIGHT_ICON_CLASS = ' slds-input-has-icon_left_right';
const ICON_SIZE_X_SMALL = 'x-small';
const COMBOBOX_INPUT_CLASS = 'slds-input slds-combobox__input slds-combobox__input-value';
const SEARCH_CONTAINER_ICON_CLASS = 'slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right';
const DEFAULT_LOOKUP_OPTION = { label : '', value : '' };
const DROPDOWN_LINE_ITEM_CLASS = 'slds-listbox__item';
const DROPDOWN_LINE_ITEM_MEDIA_CLASS = 'slds-media slds-media_center slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta';
const BTN_ICON_CLASS = 'slds-button slds-button_icon slds-input__icon slds-input__icon_right';
const LABEL_STACKED = 'label-stacked';
const LABEL_HIDDEN = 'label-hidden';
const LABEL_INLINE = 'label-inline';
const SELECTION_CLASS = ' slds-has-selection';
const HAS_ERROR_CLASS = ' slds-has-error';
const COMBOBOX_OPEN_CLASS = ' slds-is-open';

export default class CustomLookupLwc extends LightningElement {
    @api label;
    @api selectedValue;
    @api disabled = false;
    @api errorMessage = 'Required! Please provide a value.';

    isLabelHidden = false;
    formElementClass = FORM_ELEMENT;
    isRequired = false;
    showHelpText = false;
    helpTextValue;
    lookupContainerClass = COMBOBOX_CLASS;
    searchBoxContainerClass = COMBOBOX_CLASS;
    lookupModifiedClass = COMBOBOX_DROPDOWN_CLASS;
    isAriaExpanded = false;
    lookupFormElementModifiedClass = COMBOBOX_FORM_ELEMENT_CLASS + INPUT_RIGHT_ICON_CLASS;
    isLookupSelected = false;
    _iconName;
    _iconSize = ICON_SIZE_X_SMALL;
    varaintValue = LABEL_STACKED;
    hasIcon = false;
    icon = {};
    isReadOnly = false;
    showError = false;
    placeHolderValue = 'Search...'
    searchInputClass;
    selectedLookupOption = {...DEFAULT_LOOKUP_OPTION };
    alwaysLookupOption = {...DEFAULT_LOOKUP_OPTION };
    lookupOptions = [];
    lookupOptionsToDisplay = [];
    searchContainerIconClass = SEARCH_CONTAINER_ICON_CLASS;
    searchIconClass;
    btnIconClass = BTN_ICON_CLASS;
    closeIconClass;
    loadFinished = false;
    blurFinished = false;
    isInputOnFocus = false;
    noRecordsFound = false;

    //-- Get and set required field on custom lookup --//
    get required() {
        return this.isRequired;
    }
    @api set required(value) {
        this.isRequired = value ? value : false;
    }

    //-- Get and set helptext value on custom lookup --//
    get helpText() {
        return this.helpTextValue;
    }
    @api set helpText(value) {
        this.helpTextValue = value;
        this.showHelpTextVal = value ? true : false;
    }

    //-- Get and set icon name on the custom lookup --//
    get iconName() {
        return this._iconName;
    }
    @api set iconName(value) {
        this._iconName = value ? value : '';
        this.hasIcon = value ? true : false;
        const iconType = value.split(':')[0];
        const iconName = value.split(':')[1];
        this.icon = {
            title : iconName, 
            containerClass : `slds-icon_container slds-icon-${iconType}-${iconName} slds-input__icon ${INPUT_RIGHT_ICON_CLASS}`, 
            url : `/_slds/icons/${iconType}-sprite/svg/symbols.svg#${iconName}`
        };
    }

    //-- Get and set icon size on the custom lookup --//
    get iconSize(){
        return this._iconSize;
    }
    @api set iconSize(value){
        this._iconSize = value ? value : 'x-small';
    }

    //-- Get and set readonly on the custom lookup --//
    get readOnly(){
        return this.isReadOnly;
    }
    @api set readOnly(value){
        this.isReadOnly = value ? value : false;
    }

    //-- Get and set placeholder value on the custom lookup --//
    get placeHolder() {
        return this.placeHolderValue;
    }
    @api set placeHolder(value) {
        this.placeHolderValue = value ? value : this.placeHolderValue;
    }

    //-- Get and set lookup options on the custom lookup component --//
    get options() {
        return this.lookupOptions;
    }
    @api set options(value) {
        if (!value) {
            return;
        }

        let index = 0;
        value.forEach((option) => {
            let optionObj = {...option };
            optionObj.index = index++;

            if (this.selectedValue && this.selectedValue === optionObj.value) {
                this.selectedLookupOption = {...optionObj };
            }
            optionObj.ddLIClass = DROPDOWN_LINE_ITEM_CLASS;
            optionObj.ddLIMediaClass = DROPDOWN_LINE_ITEM_MEDIA_CLASS;

            this.lookupOptionsToDisplay.push(optionObj);
            this.lookupOptions.push(optionObj);
        });
        
    }

    //-- Get and set variant on the custom lookup component --//
    get variant() {
        return this.varaintValue;
    }
    @api setVaraint(value) {
        this.varaintValue = value ? value : LABEL_STACKED;
        this.isLabelHidden = value === LABEL_HIDDEN;
        this.formElementClass = value === LABEL_INLINE ? FORM_ELEMENT + ' slds-form-element_horizontal' : FORM_ELEMENT + ' slds-form-element_stacked';
    }

    //-- Connected callback lifecycle hook called when component is inserted in DOM --//
    connectedCallback() {
        this.loadFinished = true;
        this.hasIcon = this.iconName ? true : false;
        this.lookupContainerClass += ' ' + this.iconSize;
        this.icon.iconClass = 'slds-icon slds-icon_' + this.iconSize;
        this.searchInputClass = `${COMBOBOX_INPUT_CLASS} ${this.iconSize}`;
        this.searchIconClass = `slds-icon slds-icon-text-default slds-icon_${this.iconSize}`;
        this.closeIconClass = `slds-button__icon slds-icon_${this.iconSize}`;

        //-- In case there is an already selected record show that in the lookup --//
        if (this.selectedValue) {
            this.selectedLookupOption = this.lookupOptions.find(option => option.value === this.selectedValue);
            this.showSelectedOption(this.selectedLookupOption);
        }
    }

    disconnectedCallback() {
        this.loadFinished = false;
    }

    //-- Get the input element on custom lookup --//
    get inputElement() {
        return this.template.querySelector('input');
    }

    //-- Focus the input element on custom lookup --//
    @api focus(){
        if (this.loadFinished === true) {
            this.inputElement.focus();
        }
    }

    //-- Focus the input element on custom lookup --//
    @api blur() {
        if (this.loadFinished === true) {
            this.inputElement.blur();
        }
    }

    handleLookupClick(event) {
        event.stopPropagation();
        this.isBlurCancelled = false;

        if (!this.isLookupSelected && !this.readOnlyVal && !this.disabled && !this.noRecordsFound) {
            this.openLookup();
            this.inputElement.focus();
        }
    }

    openLookup() {
        if (this.lookupOptions.length > 0) {
            this.lookupOptionsToDisplay = [...this.lookupOptions];        
        }

        this.isAriaExpanded = true;
        this.lookupModifedClass = COMBOBOX_DROPDOWN_CLASS + COMBOBOX_OPEN_CLASS;
    }

    handleKeyUp(event) {
        if (event.target.readOnly) {
            return;
        }
        this.showError = false;
        this.noRecordsFound = false;
        
        let searchKey = event.target.value;
        if (searchKey) {            
            this.selectedLookupOption.label = searchKey;
            
            //-- Show Lookup Options here --//
            if (this.lookupModifedClass !== COMBOBOX_DROPDOWN_CLASS + COMBOBOX_OPEN_CLASS) {
                this.lookupModifedClass = COMBOBOX_DROPDOWN_CLASS + COMBOBOX_OPEN_CLASS;
            }

            //-- Set the options that need to be displayed with search results --//
            searchKey = searchKey.toLowerCase();            
            this.lookupOptionsToDisplay = this.lookupOptions.filter(opt => opt.label.toLowerCase().includes(searchKey));

            if (this.alwaysLookupOption.value !== '') {
                this.lookupOptionsToDisplay.push(this.alwaysLookupOption);
            }                
            else if (this.lookupOptionsToDisplay.length === 0) {
                this.noRecordsFound = true;
            }
        }
        else{
            this.selectedLookupOption = {...initialOption};
            this.lookupOptionsToDisplay = this.lookupOptions;
        }
    }

    handleFocus() {
        this.isInputOnFocus = true;
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleBlur() {
        if (this.blurFinished) {
            return;
        }
        this.isInputOnFocus = false;
        this.closeLookup();

        if (this.isRequired && !this.selectedLookupOption.value) {
            this.formElementClass += HAS_ERROR_CLASS;
            this.showError = true;
            this.errorMessage = 'Required! Please provide a value.';
        }
        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleSelectedOptionRemoval() {
        this.selectedLookupOption = {...DEFAULT_LOOKUP_OPTION };
        this.isLookupSelected = false;
        this.isReadOnly = false;
        this.lookupContainerClass = this.searchBoxContainerClass;
        this.lookupFormElementModifiedClass = COMBOBOX_FORM_ELEMENT_CLASS + INPUT_RIGHT_ICON_CLASS;

        //-- Once the lookup is removed we fire a custom event to pass on the lookup option which was removed to parent cmp --//
        const lookupChangeEvent = new CustomEvent('change', {
            detail : this.selectedLookupOption
        });
        this.dispatchEvent(lookupChangeEvent);
    }

    handleOptionSelection(event) {
        event.stopPropagation();

        this.isBlurCancelled = true;
        let optionObject = {...initialOption};

        let childElm = event.target;
        let parentElm = childElm.parentNode;
        while (parentElm.tagName != 'LI') {
            parentElm = parentElm.parentNode;
        }
        
        let index = parentElm.id.split('-')[0];
        if (Number(index) < this.searchBoxOptions.length) {
            optionObject = this.searchBoxOptions[index];
        }

        if (!optionObject.value) {
            return;
        }
        this.showSelectedOption(optionObject);
        
        this.dispatchEvent(new CustomEvent('change', {
            detail: this.selectedLookupOption
        }));
    }

    showSelectedOption(option) {
        this.selectedLookupOption = {
            label : option.label,
            value : option.value
        }

        //-- Mark isLookupSelected as true so that the Unoredered List (UL) gets populated with the option icon and close button --//
        this.isLookupSelected = true;
        this.formElementClass = this.formElClass;
        this.lookupContainerClass += SELECTION_CLASS;
        this.lookupModifedClass = COMBOBOX_DROPDOWN_CLASS;
        this.lookupFormElementModifiedClass = COMBOBOX_FORM_ELEMENT_CLASS;
        this.lookupFormElementModifiedClass += this.hasIcon ? INPUT_LEFT_RIGHT_ICON_CLASS : INPUT_RIGHT_ICON_CLASS; 

        //-- Make Option as read only so that after selection the option becomes non-editable --//
        this.isReadOnly = true;
        this.showError = false;
    }

    closeLookup() {
        this.isAriaExpanded = false;
        this.lookupModifedClass = COMBOBOX_DROPDOWN_CLASS;
    }

    handleLookupMouseDownEvent(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.isBlurCancelled = true;
        }
    }

    handleLookupMouseUpEvent() {
        this.isBlurCancelled = false;
    }
}