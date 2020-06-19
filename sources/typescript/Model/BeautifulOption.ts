class BeautifulOption extends HTMLElement
{
    private originalOption: HTMLOptionElement;
    private beautifulSelect: BeautifulSelect|null = null;
    private active: boolean = false;
    private value: string = "";
    private content: string = "";

    /**
     * constructor
     */
    public constructor(option: HTMLOptionElement)
    {
        super();

        /* Managing vanilla option */
        
        this.originalOption = option;

        this.build();

        this.addEventListener("click", this.toggleActivation);
    }

    /**
     * getActive
     */
    public getActive(): boolean
    {
        return this.active;    
    }

    /**
     * getOriginalOption
     */
    public getOriginalOption(): HTMLOptionElement|null
    {
        return this.originalOption;
    }

    /**
     * getValue
     */
    public getValue(): string
    {
        return this.value;    
    }

    /**
     * getContent
     */
    public getContent(): string
    {
        return this.content;
    }

    /**
     * setContent
     */
    public setContent(content: string): void
    {
        this.content = content;
        this.innerHTML = content;    
    }

    /**
     * getBeautifulSelect
     */
    public getBeautifulSelect(): BeautifulSelect|null
    {
        return this.beautifulSelect;    
    }

    /**
     * setBeautifulSelect
     */
    public setBeautifulSelect(beautiful_select: BeautifulSelect): void
    {
        this.beautifulSelect = beautiful_select;
    }
    
    /**
     * activate
     */
    public activate(): void
    {
        this.active = true;
        this.classList.add("active");

        if (this.originalOption === null)
        {
            return;
        }

        this.originalOption.selected = true;

        if (this.beautifulSelect === null)
        {
            return;
        }

        const CUSTOM_CHANGE_EVENT: CustomEvent = new CustomEvent("change");

        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        this.beautifulSelect.refreshTitle();

        const LIST: BeautifulList|null = this.beautifulSelect.getList();

        if (LIST === null)
        {
            return;
        }
        
        if (this.beautifulSelect.getMultiple() === false)
        {
            LIST.hide();
        }

    }

    /**
     * deactivate
     */
    public deactivate(): void
    {
        this.active = false;
        this.classList.remove("active");

        if (this.originalOption === null)
        {
            return;
        }

        this.originalOption.selected = false;
        
        if (this.beautifulSelect === null)
        {
            return;
        }

        const CUSTOM_CHANGE_EVENT: CustomEvent = new CustomEvent("change");

        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        this.beautifulSelect.refreshTitle();

        const LIST: BeautifulList|null = this.beautifulSelect.getList();

        if (LIST === null)
        {
            return;
        }
        
        if (this.beautifulSelect.getMultiple() === false)
        {
            LIST.hide();
        }

        
    }

    /**
     * toggleActivation
     */
    public toggleActivation(): boolean
    {
        if (this.beautifulSelect !== null)
        {
            if (this.beautifulSelect.getMultiple())
            {
                this.active ? this.deactivate() : this.activate();
            }
            else
            {
                this.activate();
            }
        }

        return this.active;
    }

    /**
     * build
     */
    public build(): void
    {
        this.value = this.originalOption.value;

        console.log(this.content === "");
        if (this.content === "")
        {
            this.setContent(this.originalOption.textContent || "");
        }

        if (this.originalOption.selected)
        {
            this.active = true;
            this.classList.add("active");

            if (this.beautifulSelect === null)
            {
                return;
            }

            this.beautifulSelect.refreshTitle();
        
        }
        else
        {
            this.active = false;
            this.classList.remove("active");
        }
    }

}

customElements.define("beautiful-option", BeautifulOption);