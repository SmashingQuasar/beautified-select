import { BeautifulOption } from "./BeautifulOption.js";
class BeautifulList extends HTMLElement {
    constructor() {
        super();
        this.options = [];
        this.groups = [];
        this.unfolded = false;
        this.NULL_HEIGHT = 0;
        this.NULL_LENGTH = 0;
        document.addEventListener("click", (event) => {
            const TARGET = event.target;
            if (!(TARGET instanceof HTMLElement)) {
                return;
            }
            const BEAUTIFUL_SELECT = TARGET.closest("beautiful-select");
            if (BEAUTIFUL_SELECT !== this.beautifulSelect) {
                this.hide();
            }
        });
    }
    getOptions() {
        return this.options;
    }
    setOptions(options) {
        this.options = options;
    }
    getGroups() {
        return this.groups;
    }
    setGroups(groups) {
        this.groups = groups;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    getUnfolded() {
        return this.unfolded;
    }
    add(element) {
        if (element instanceof BeautifulOption) {
            this.options.push(element);
            this.appendChild(element);
        }
        else {
            this.groups.push(element);
            this.appendChild(element);
        }
    }
    async clean() {
        this.options = [];
        this.groups = [];
        await Promise.all(Array.from(this.children).map((child) => {
            child.remove();
        }));
    }
    calculateHeight() {
        if (this.beautifulSelect === undefined) {
            return this.NULL_HEIGHT;
        }
        return this.calculateAverageHeight() * this.beautifulSelect.getDisplayedOptions();
    }
    calculateAverageHeight() {
        if (this.options.length === this.NULL_LENGTH) {
            return this.NULL_HEIGHT;
        }
        let total_height = 0;
        let total_options = 0;
        this.options.map((option) => {
            if (option.getValue()) {
                const OPTION_RECT = option.getBoundingClientRect();
                total_height += OPTION_RECT.height;
                ++total_options;
            }
        });
        if (total_options === this.NULL_LENGTH) {
            return this.NULL_LENGTH;
        }
        return total_height / total_options;
    }
    show() {
        this.style.height = `${this.calculateHeight()}px`;
        this.classList.add("unfolded");
        this.unfolded = true;
        if (this.beautifulSelect !== undefined) {
            const TITLE = this.beautifulSelect.getTitle();
            TITLE.classList.add("active");
        }
    }
    hide() {
        this.style.height = "0px";
        this.classList.remove("unfolded");
        this.unfolded = false;
        if (this.beautifulSelect !== undefined) {
            const TITLE = this.beautifulSelect.getTitle();
            TITLE.classList.remove("active");
        }
    }
    toggleDisplay() {
        if (this.unfolded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    async refresh() {
        await Promise.all(this.options.map(async (option) => {
            return option.build();
        }));
        await Promise.all(this.groups.map(async (group) => {
            return group.refresh();
        }));
    }
    async getValues() {
        let values = [];
        await Promise.all(this.options.map((option) => {
            if (option.getActive()) {
                values.push(option.getValue());
            }
        }));
        await Promise.all(this.groups.map(async (group) => {
            values = values.concat(await group.getValues());
        }));
        return values;
    }
    async getActiveContents() {
        let contents = [];
        await Promise.all(this.options.map((option) => {
            if (option.getActive()) {
                contents.push(option.getContent());
            }
        }));
        await Promise.all(this.groups.map(async (group) => {
            contents = contents.concat(await group.getActiveContents());
        }));
        return contents;
    }
}
customElements.define("beautiful-list", BeautifulList);
export { BeautifulList };
//# sourceMappingURL=BeautifulList.js.map