class BeautifulTitle extends HTMLElement {
    constructor() {
        super();
        this.content = "";
        this.NULL_LENGTH = 0;
        this.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.beautifulSelect === undefined) {
                return;
            }
            const LIST = this.beautifulSelect.getList();
            if (LIST === undefined) {
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
        if (this.beautifulSelect === undefined) {
            return;
        }
        const VALUES = await this.beautifulSelect.getActiveContents();
        const PLACEHOLDER = this.beautifulSelect.getPlaceholder();
        if (VALUES.length === this.NULL_LENGTH && PLACEHOLDER !== undefined) {
            this.content = PLACEHOLDER;
        }
        else {
            const ACTIVE_CONTENTS = await this.beautifulSelect.getActiveContents();
            this.content = ACTIVE_CONTENTS.join(", ");
        }
        this.innerHTML = this.content;
    }
}
if (customElements.get("beautiful-title") === undefined) {
    customElements.define("beautiful-title", BeautifulTitle);
}
export { BeautifulTitle };
//# sourceMappingURL=BeautifulTitle.js.map