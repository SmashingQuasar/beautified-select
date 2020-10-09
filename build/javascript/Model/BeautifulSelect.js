import { BeautifulList } from "./BeautifulList.js";
import { BeautifulGroup } from "./BeautifulGroup.js";
import { BeautifulOption } from "./BeautifulOption.js";
import { BeautifulTitle } from "./BeautifulTitle.js";
class BeautifulSelect extends HTMLElement {
    constructor(select, configuration) {
        super();
        this.multiple = false;
        this.DISPLAYED_OPTION = 3;
        if (configuration !== undefined) {
            if (configuration.placeholder !== undefined) {
                this.PLACEHOLDER = configuration.placeholder;
            }
            if (configuration.displayedOptions !== undefined) {
                this.DISPLAYED_OPTION = configuration.displayedOptions;
            }
        }
        this.ORIGINAL_SELECT = select;
        this.ORIGINAL_SELECT.addEventListener("change", this.refresh.bind(this));
        this.beautifulTitle = new BeautifulTitle();
        this.appendChild(this.beautifulTitle);
        this.beautifulTitle.setBeautifulSelect(this);
        this.list = new BeautifulList();
        this.appendChild(this.list);
        this.list.setBeautifulSelect(this);
        this.beautifulTitle.refresh().then(() => {
            console.info("Beautiful Title successfully refreshed.");
        }, (error) => {
            console.error(`Error occurred while refreshing Beautiful Title: ${error.message}`);
        });
    }
    getDisplayedOptions() {
        return this.DISPLAYED_OPTION;
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
        return this.PLACEHOLDER;
    }
    getOriginalSelect() {
        return this.ORIGINAL_SELECT;
    }
    getMultiple() {
        return this.multiple;
    }
    async build() {
        this.multiple = this.ORIGINAL_SELECT.multiple;
        await this.list.clean();
        await Promise.all(Array.from(this.ORIGINAL_SELECT.children).map((children) => {
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
        await this.beautifulTitle.refresh();
        return this;
    }
    async refresh() {
        await this.list.refresh();
    }
    async getValues() {
        return this.list.getValues();
    }
    async getActiveContents() {
        return this.list.getActiveContents();
    }
    async refreshTitle() {
        return this.beautifulTitle.refresh();
    }
}
customElements.define("beautiful-select", BeautifulSelect);
export { BeautifulSelect };
