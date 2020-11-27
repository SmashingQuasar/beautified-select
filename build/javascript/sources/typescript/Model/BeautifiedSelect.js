import { BeautifulSelect } from "./BeautifulSelect.js";
class BeautifiedSelect extends HTMLElement {
    constructor(select, configuration) {
        super();
        if (select === undefined) {
            this.ORIGINAL_SELECT = document.createElement("select");
            const EMPTY_OPTION = document.createElement("option");
            this.ORIGINAL_SELECT.append(EMPTY_OPTION);
        }
        else {
            this.ORIGINAL_SELECT = select;
        }
        const ORIGINAL_PARENT = this.ORIGINAL_SELECT.parentElement;
        let original_position = 0;
        if (ORIGINAL_PARENT instanceof HTMLElement) {
            Array.from(ORIGINAL_PARENT.children).forEach((child, index) => {
                if (child === this.ORIGINAL_SELECT) {
                    original_position = index;
                }
            });
        }
        this.appendChild(this.ORIGINAL_SELECT);
        this.ORIGINAL_SELECT.hidden = true;
        if (ORIGINAL_PARENT instanceof HTMLElement) {
            ORIGINAL_PARENT.insertBefore(this, ORIGINAL_PARENT.children[original_position]);
        }
        this.beautifulSelect = new BeautifulSelect(this.ORIGINAL_SELECT, configuration);
        this.appendChild(this.beautifulSelect);
        this.build().then(() => {
            console.info("Beautified Select successfully built.");
        }, (error) => {
            console.error(`Error occurred while building BeautifiedSelect: ${error.message}`);
        });
    }
    getOriginalSelect() {
        return this.ORIGINAL_SELECT;
    }
    getBeautifulSelect() {
        return this.beautifulSelect;
    }
    setBeautifulSelect(beautiful_select) {
        this.beautifulSelect = beautiful_select;
    }
    async build() {
        if (this.beautifulSelect) {
            await this.beautifulSelect.build();
        }
        return this;
    }
}
customElements.define("beautified-select", BeautifiedSelect);
export { BeautifiedSelect };
//# sourceMappingURL=BeautifiedSelect.js.map