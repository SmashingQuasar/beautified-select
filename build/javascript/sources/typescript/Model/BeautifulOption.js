class BeautifulOption extends HTMLElement {
    constructor(option) {
        super();
        this.active = false;
        this.value = "";
        this.content = "";
        this.originalOption = option;
        this.build().then(() => {
            console.info("Beautiful Option successfully built.");
        }, (error) => {
            console.error(`Error occurred while refreshing Beautiful Option: ${error.message}`);
        });
        this.addEventListener("click", this.toggleActivation.bind(this));
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
    async activate() {
        this.active = true;
        this.classList.add("active");
        if (this.originalOption === undefined) {
            return;
        }
        this.originalOption.selected = true;
        if (this.beautifulSelect === undefined) {
            return;
        }
        const CUSTOM_CHANGE_EVENT = new CustomEvent("change");
        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        await this.beautifulSelect.refreshTitle();
        const LIST = this.beautifulSelect.getList();
        if (LIST === undefined) {
            return;
        }
        if (this.beautifulSelect.getMultiple() === false) {
            LIST.hide();
        }
    }
    async deactivate() {
        this.active = false;
        this.classList.remove("active");
        if (this.originalOption === undefined) {
            return;
        }
        this.originalOption.selected = false;
        if (this.beautifulSelect === undefined) {
            return;
        }
        const CUSTOM_CHANGE_EVENT = new CustomEvent("change");
        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        await this.beautifulSelect.refreshTitle();
        const LIST = this.beautifulSelect.getList();
        if (LIST === undefined) {
            return;
        }
        if (this.beautifulSelect.getMultiple() === false) {
            LIST.hide();
        }
    }
    async toggleActivation(event) {
        event.preventDefault();
        if (this.beautifulSelect !== undefined) {
            if (this.beautifulSelect.getMultiple() && this.active) {
                await this.deactivate();
            }
            else {
                await this.activate();
            }
        }
        return this.active;
    }
    async build() {
        this.value = this.originalOption.value;
        this.hidden = this.originalOption.hidden;
        if (this.content === "") {
            if (typeof this.originalOption.textContent === "string") {
                this.setContent(this.originalOption.textContent);
            }
            else {
                this.setContent("");
            }
        }
        if (this.originalOption.selected) {
            this.active = true;
            this.classList.add("active");
            if (this.beautifulSelect === undefined) {
                return;
            }
            await this.beautifulSelect.refreshTitle();
        }
        else {
            this.active = false;
            this.classList.remove("active");
        }
    }
}
if (customElements.get("beautiful-option") === undefined) {
    customElements.define("beautiful-option", BeautifulOption);
}
export { BeautifulOption };
//# sourceMappingURL=BeautifulOption.js.map