class BeautifulOption extends HTMLElement
{
    public index: number;

    /**
     * constructor
     */
    public constructor(option: HTMLOptionElement)
    {
        super();

        this.index = option.index;
        this.textContent = option.label || option.textContent;
        this.tabIndex = -1;
        
        /* Global attributes */

        /* itemscope */

        if (option.hasAttribute("itemscope"))
        {
            this.setAttribute("itemscope", ""); // itemscope has no value. It only need to be present on the node.
            option.removeAttribute("itemscope");
        }

        /* itemtype */

        if (option.hasAttribute("itemtype"))
        {
            const ITEM_TYPE: string|null = option.getAttribute("itemtype");

            if (ITEM_TYPE !== null)
            {
                this.setAttribute("itemtype", ITEM_TYPE);
            }
            option.removeAttribute("itemtype");
        }

        /* itemprop */

        if (option.hasAttribute("itemprop"))
        {
            const ITEM_PROP: string|null = option.getAttribute("itemprop");

            if (ITEM_PROP !== null)
            {
                this.setAttribute("itemprop", ITEM_PROP);
            }
            option.removeAttribute("itemprop");
        }

        /* Disabling option */
        
        if (option.disabled)
        {
            this.classList.add("css_disabled");
        }
        
        /* Hiding option */

        this.hidden = option.hasAttribute("disabled") || option.value === ""; // Updated to change && by ||
    }

    /**
     * getIndex
     */
    public getIndex(): number
    {
        return this.index;
    }

    /**
     * setIndex
     */
    public setIndex(index: number): void
    {
        this.index = index;
    }
}

customElements.define("beautiful-option", BeautifulOption, { extends: "option" });