class GroupContainer extends HTMLElement
{
    private options: NodeListOf<BeautifulOption>

    /**
     * constructor
     */
    public constructor(options: NodeListOf<BeautifulOption|HTMLOptionElement>)
    {
        super();

        options.forEach(
            (option: BeautifulOption|HTMLOptionElement) => {

                if (option instanceof HTMLOptionElement)
                {
                    option = new BeautifulOption(option);
                }
                this.appendChild(option);
            }
        );
        this.options = this.querySelectorAll("beautiful-option");
    }

    /**
     * setOptions
     */
    public setOptions(options: NodeListOf<BeautifulOption>): void
    {
        this.options = options;    
    }

    public getOptions(): NodeListOf<BeautifulOption>
    {
        return this.options;
    }
}

customElements.define("group-container", GroupContainer, { extends: "div" });