class BeautifulSelect extends HTMLElement
{
    private originalSelect: HTMLSelectElement;
    private beautifulTitle: BeautifulTitle;
    private list: BeautifulList;
    private multiple: boolean = false;
    private placeholder: string|null = null;
    private displayedOptions: number = 3;

    /**
     * constructor
     */
    public constructor(select: HTMLSelectElement, configuration?: BeautifiedSelectConfiguration)
    {
        super();

        /* Handling configuration */

        if (configuration !== undefined)
        {
            if (configuration.placeholder !== undefined)
            {
                this.placeholder = configuration.placeholder;
            }
            if (configuration.displayedOptions !== undefined)
            {
                this.displayedOptions = configuration.displayedOptions;
            }
        }

        /* Managing vanilla select */

        this.originalSelect = select;
        this.originalSelect.addEventListener("change", this.refresh.bind(this));

        /* Creating title */

        this.beautifulTitle = new BeautifulTitle();
        this.appendChild(this.beautifulTitle);
        this.beautifulTitle.setBeautifulSelect(this);

        /* Creating list */
        
        this.list = new BeautifulList();
        this.appendChild(this.list);
        this.list.setBeautifulSelect(this);

        this.beautifulTitle.refresh();
    }

    /**
     * getDisplayedOptions
     */
    public getDisplayedOptions(): number
    {
        return this.displayedOptions;
    }

    /**
     * getTitle
     */
    public getTitle(): BeautifulTitle
    {
        return this.beautifulTitle;    
    }

    /**
     * setTitle
     */
    public setTitle(title: BeautifulTitle): void
    {
        this.beautifulTitle = title;
    }

    /**
     * getList
     */
    public getList(): BeautifulList|null
    {
        return this.list;    
    }

    /**
     * setList
     */
    public setList(list: BeautifulList): void
    {
        this.list = list;   
    }
    
    /**
     * getPlaceholder
     */
    public getPlaceholder(): string|null
    {
        return this.placeholder;
    }

    /**
     * getOriginalSelect
     */
    public getOriginalSelect(): HTMLSelectElement
    {
        return this.originalSelect;
    }

    /**
     * getMultiple
     */
    public getMultiple(): boolean
    {
        return this.multiple;    
    }

    /**
     * build
     */
    public async build(): Promise<BeautifulSelect>
    {
        if (this.originalSelect === null)
        {
            this.multiple = false;
        }
        else
        {
            this.multiple = this.originalSelect.multiple;
        }

        this.list.clean();
        
        await Promise.all(
            Array.from(this.originalSelect.children).map(
                (children: Element): void => {
                    if (children instanceof HTMLOptionElement)
                    {
                        const OPTION: BeautifulOption = new BeautifulOption(children);
                        OPTION.setBeautifulSelect(this);
                        this.list.add(OPTION);
                    }
                    if (children instanceof HTMLOptGroupElement)
                    {
                        const GROUP: BeautifulGroup = new BeautifulGroup(children);
                        GROUP.setBeautifulSelect(this);
                        this.list.add(GROUP);
                    }
                }
            )
        );
        
        this.beautifulTitle.refresh();

        return this;
    }

    /**
     * refresh
     */
    public async refresh(): Promise<void>
    {
        await this.list.refresh();
    }

    /**
     * getValues
     */
    public async getValues(): Promise<Array<string>>
    {
        return await this.list.getValues();
    }

    /**
     * getActiveContents
     */
    public async getActiveContents(): Promise<Array<string>>
    {
        return await this.list.getActiveContents();
    }

    /**
     * refreshTitle
     */
    public async refreshTitle(): Promise<void>
    {
        return await this.beautifulTitle.refresh();
    }

}

customElements.define("beautiful-select", BeautifulSelect);