"use strict";
class BeautifulGroup extends HTMLElement {
    constructor(group) {
        super();
        this.beautifulSelect = null;
        this.options = [];
        this.originalGroup = group;
    }
    getOptions() {
        return this.options;
    }
    setOptions(options) {
        this.options = options;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    getGroup() {
        return this.originalGroup;
    }
    add(option) {
        this.options.push(option);
    }
    async build() {
        await Promise.all(Array.from(this.originalGroup.children).map((child) => {
            if (child instanceof HTMLOptionElement) {
                this.options.push(new BeautifulOption(child));
            }
        }));
        return this;
    }
    async refresh() {
        await Promise.all(this.options.map((option) => {
            option.build();
        }));
    }
    async getValues() {
        const VALUES = [];
        await Promise.all(this.options.map((option) => {
            if (option.getActive()) {
                VALUES.push(option.getValue());
            }
        }));
        return VALUES;
    }
    async getActiveContents() {
        const CONTENTS = [];
        await Promise.all(this.options.map((option) => {
            if (option.getActive()) {
                CONTENTS.push(option.getContent());
            }
        }));
        return CONTENTS;
    }
}
customElements.define("beautiful-group", BeautifulGroup);
