"use strict";
class BeautifiedSelect extends HTMLElement {
    constructor(select, configuration) {
        super();
        this.originalSelect = null;
        this.beautifulSelect = null;
        if (select === undefined) {
            this.originalSelect = document.createElement("select");
            const EMPTY_OPTION = document.createElement("option");
            this.originalSelect.append(EMPTY_OPTION);
        }
        else {
            this.originalSelect = select;
        }
        const ORIGINAL_PARENT = this.originalSelect.parentElement;
        let original_position = 0;
        if (ORIGINAL_PARENT !== null) {
            Array.from(ORIGINAL_PARENT.children).forEach((child, index) => {
                if (child === this.originalSelect) {
                    original_position = index;
                }
            });
        }
        this.appendChild(this.originalSelect);
        this.originalSelect.hidden = true;
        if (ORIGINAL_PARENT !== null) {
            ORIGINAL_PARENT.insertBefore(this, ORIGINAL_PARENT.children[original_position]);
        }
        this.beautifulSelect = new BeautifulSelect(this.originalSelect, configuration);
        this.appendChild(this.beautifulSelect);
        this.build();
    }
    getOriginalSelect() {
        return this.originalSelect;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    async build() {
        if (this.beautifulSelect !== null) {
            await this.beautifulSelect.build();
        }
        return this;
    }
}
customElements.define("beautified-select", BeautifiedSelect);
