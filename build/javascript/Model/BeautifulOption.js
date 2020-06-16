"use strict";
class BeautifulOption extends HTMLElement {
    constructor(option) {
        super();
        this.beautifulSelect = null;
        this.active = false;
        this.value = "";
        this.content = "";
        this.originalOption = option;
        this.build();
        this.addEventListener("click", this.toggleActivation);
    }
    getActive() {
        return this.active;
    }
    getOriginalOption() {
        return this.originalOption;
    }
    getValue() {
        return this.value;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
        this.innerHTML = content;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    activate() {
        this.active = true;
        this.classList.add("active");
        if (this.originalOption === null) {
            return;
        }
        this.originalOption.selected = true;
        if (this.beautifulSelect === null) {
            return;
        }
        const CUSTOM_CHANGE_EVENT = new CustomEvent("change");
        this.beautifulSelect.dispatchEvent(CUSTOM_CHANGE_EVENT);
        this.beautifulSelect.refreshTitle();
        const LIST = this.beautifulSelect.getList();
        if (LIST === null) {
            return;
        }
        if (this.beautifulSelect.getMultiple() === false) {
            LIST.hide();
        }
    }
    deactivate() {
        this.active = false;
        this.classList.remove("active");
        if (this.originalOption === null) {
            return;
        }
        this.originalOption.selected = false;
        if (this.beautifulSelect === null) {
            return;
        }
        const CUSTOM_CHANGE_EVENT = new CustomEvent("change");
        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        this.beautifulSelect.refreshTitle();
        const LIST = this.beautifulSelect.getList();
        if (LIST === null) {
            return;
        }
        if (this.beautifulSelect.getMultiple() === false) {
            LIST.hide();
        }
    }
    toggleActivation() {
        if (this.beautifulSelect !== null) {
            if (this.beautifulSelect.getMultiple()) {
                this.active ? this.deactivate() : this.activate();
            }
            else {
                this.activate();
            }
        }
        return this.active;
    }
    build() {
        this.value = this.originalOption.value;
        this.setContent(this.originalOption.textContent || "");
        if (this.originalOption.selected) {
            this.active = true;
            this.classList.add("active");
            if (this.beautifulSelect === null) {
                return;
            }
            this.beautifulSelect.refreshTitle();
        }
        else {
            this.active = false;
            this.classList.remove("active");
        }
    }
}
customElements.define("beautiful-option", BeautifulOption);
