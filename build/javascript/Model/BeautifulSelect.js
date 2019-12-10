"use strict";
class BeautifulSelect extends HTMLElement {
    constructor(select, configuration) {
        super();
        this.multiple = false;
        this.placeholder = null;
        this.displayedOptions = 3;
        if (configuration !== undefined) {
            if (configuration.placeholder !== undefined) {
                this.placeholder = configuration.placeholder;
            }
            if (configuration.displayedOptions !== undefined) {
                this.displayedOptions = configuration.displayedOptions;
            }
        }
        this.originalSelect = select;
        this.originalSelect.addEventListener("change", this.refresh.bind(this));
        this.beautifulTitle = new BeautifulTitle();
        this.appendChild(this.beautifulTitle);
        this.beautifulTitle.setBeautifulSelect(this);
        this.list = new BeautifulList();
        this.appendChild(this.list);
        this.list.setBeautifulSelect(this);
        this.beautifulTitle.refresh();
    }
    getDisplayedOptions() {
        return this.displayedOptions;
    }
    getTitle() {
        return this.beautifulTitle;
    }
    setTitle(title) {
        this.beautifulTitle = title;
    }
    getList() {
        return this.list;
    }
    setList(list) {
        this.list = list;
    }
    getPlaceholder() {
        return this.placeholder;
    }
    getOriginalSelect() {
        return this.originalSelect;
    }
    getMultiple() {
        return this.multiple;
    }
    async build() {
        if (this.originalSelect === null) {
            this.multiple = false;
        }
        else {
            this.multiple = this.originalSelect.multiple;
        }
        this.list.clean();
        await Promise.all(Array.from(this.originalSelect.children).map((children) => {
            if (children instanceof HTMLOptionElement) {
                const OPTION = new BeautifulOption(children);
                OPTION.setBeautifulSelect(this);
                this.list.add(OPTION);
            }
            if (children instanceof HTMLOptGroupElement) {
                const GROUP = new BeautifulGroup(children);
                GROUP.setBeautifulSelect(this);
                this.list.add(GROUP);
            }
        }));
        this.beautifulTitle.refresh();
        return this;
    }
    async refresh() {
        await this.list.refresh();
    }
    async getValues() {
        return await this.list.getValues();
    }
    async getActiveContents() {
        return await this.list.getActiveContents();
    }
    async refreshTitle() {
        return await this.beautifulTitle.refresh();
    }
}
customElements.define("beautiful-select", BeautifulSelect);
