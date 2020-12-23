import { BeautifulOption } from "./BeautifulOption.js";
class BeautifulGroup extends HTMLElement {
    constructor(group) {
        super();
        this.options = [];
        this.ORIGINAL_GROUP = group;
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
        return this.ORIGINAL_GROUP;
    }
    add(option) {
        this.options.push(option);
    }
    async build() {
        await Promise.all(Array.from(this.ORIGINAL_GROUP.children).map((child) => {
            if (child instanceof HTMLOptionElement) {
                this.options.push(new BeautifulOption(child));
            }
        }));
        return this;
    }
    async refresh() {
        await Promise.all(this.options.map(async (option) => {
            return option.build();
        }));
    }
    async getValues() {
        const VALUES = [];
        await Promise.all(this.options.map((option) => {
            if (option.getActive() === true) {
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
if (customElements.get("beautiful-group") === undefined) {
    customElements.define("beautiful-group", BeautifulGroup);
}
export { BeautifulGroup };
//# sourceMappingURL=BeautifulGroup.js.map