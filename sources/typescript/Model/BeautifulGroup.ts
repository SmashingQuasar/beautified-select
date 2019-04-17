class BeautifulGroup extends HTMLElement
{
    private customTitle: GroupTitle;
    private container: GroupContainer;

    /**
     * constructor
     */
    public constructor(optgroup: HTMLOptGroupElement)
    {
        super();

        const BASE_OPTIONS: NodeListOf<HTMLOptionElement> = this.querySelectorAll("option");

        this.customTitle = new GroupTitle(optgroup.label);
        this.appendChild(this.customTitle);
        this.container = new GroupContainer(BASE_OPTIONS);
        this.appendChild(this.container);

        /* Global attributes */

        /* itemscope */

        if (optgroup.hasAttribute("itemscope"))
        {
            this.setAttribute("itemscope", ""); // itemscope has no value. It only need to be present on the node.
            optgroup.removeAttribute("itemscope");
        }

        /* itemtype */

        if (optgroup.hasAttribute("itemtype"))
        {
            const ITEM_TYPE: string|null = optgroup.getAttribute("itemtype");

            if (ITEM_TYPE !== null)
            {
                this.setAttribute("itemtype", ITEM_TYPE);
            }
            optgroup.removeAttribute("itemtype");
        }

        /* itemprop */

        if (optgroup.hasAttribute("itemprop"))
        {
            const ITEM_PROP: string|null = optgroup.getAttribute("itemprop");

            if (ITEM_PROP !== null)
            {
                this.setAttribute("itemprop", ITEM_PROP);
            }
            optgroup.removeAttribute("itemprop");
        }

        /* Disabling optgroup */
        
        if (optgroup.disabled)
        {
            this.classList.add("css_disabled");
        }
        
    }

    /**
     * getOptions
     */
    public getOptions(): NodeListOf<BeautifulOption>
    {
        return this.container.getOptions();    
    }

    /**
     * getStaticOptions
     */
    public getStaticOptions(): Array<BeautifulOption>
    {
        return Array.from(this.getOptions());    
    }

    /**
     * getCustomTitle
     */
    public getCustomTitle(): GroupTitle
    {
        return this.customTitle;
    }
}

customElements.define("beautiful-group", BeautifulGroup, { extends: "optgroup"} );