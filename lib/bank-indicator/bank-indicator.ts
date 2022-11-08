import HTML from './bank-indicator.html';
import CSS from './bank-indicator.scss';
import { BankIndicatorElements, BankItem } from './types';
import {allBankInfo} from './BankInfo';
import creditCardIcon from './credit-card.svg';
export class BankIndicatorWebComponent extends HTMLElement {
    elements!:BankIndicatorElements;
    bankInfo = allBankInfo;
    #selectedBank:BankItem | null = null;
    get selectedBank(){
        return this.#selectedBank;
    }
    set selectedBank(value:BankItem | null){
        this.#selectedBank = value;
        if(value){
            this.elements.bankImageWrapper.innerHTML= value.logo;
            this.elements.bankImageWrapper.setAttribute("title", value.title.fa);
        }else{
            this.elements.bankImageWrapper.innerHTML = creditCardIcon;
        }
    }
    constructor() {
        super();
        this.initWebComponent();
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
        this.initProp();
        this.callOnInitEvent();

    }
    callOnLoadEvent() {
        const event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        const event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true,
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            //input: shadowRoot.querySelector('jb-input')! as JBInputWebComponent,
            bankImageWrapper: shadowRoot.querySelector('.bank-image-wrapper')! as HTMLDivElement,
            PaymentInputParent: null
        };
        this.changeBank(null);
        this.registerEventListener();
    }

    registerEventListener() {
        //add event listeners if exist here
    }
    initProp() {
        //find parent jb-payment-input web component if exist
        this.elements.PaymentInputParent = this.closest('jb-payment-input');
        if(this.elements.PaymentInputParent){
            this.elements.PaymentInputParent.addEventListener('input',()=>{
                const value = this.elements.PaymentInputParent?.value;
                const bankPrefix = value?.substring(0,6);
                this.changeBank(bankPrefix || null);
            });
        }
    }
    static get observedAttributes() {
        return ['prefix'];
    }
    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name:string, value:string) {
        switch (name) {
            case 'prefix':
                //do something
                this.changeBank(value);
                break;
        }

    }
    changeBank(prefix:string | null){
        if(prefix !== null){
            const bank = this.bankInfo.find((item)=>item.prefix.includes(prefix));
            if(bank){
                this.selectedBank = bank;
            }else{
                this.selectedBank = null; 
            }
        }else{
            this.selectedBank = null;
        }
        
    }
}
const myElementNotExists = !customElements.get('bank-indicator');
if (myElementNotExists) {
    window.customElements.define('bank-indicator', BankIndicatorWebComponent);
}
