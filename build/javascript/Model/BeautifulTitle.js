"use strict";
class BeautifulTitle extends HTMLElement {
    constructor() {
        super();
        this.beautifulSelect = null;
        this.content = "";
        this.addEventListener("click", () => {
            if (this.beautifulSelect === null) {
                return;
            }
            const LIST = this.beautifulSelect.getList();
            if (LIST === null) {
                return;
            }
            LIST.toggleDisplay();
        });
    }
    getContent() {
        return this.content;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    async refresh() {
        if (this.beautifulSelect === null) {
            return;
        }
        const VALUES = await this.beautifulSelect.getActiveContents();
        const PLACEHOLDER = this.beautifulSelect.getPlaceholder();
        if (VALUES.length === 0 && PLACEHOLDER !== null) {
            this.content = PLACEHOLDER;
        }
        else {
            this.content = VALUES.join(", ");
        }
        this.textContent = this.content;
    }
}
customElements.define("beautiful-title", BeautifulTitle);