class BeautifulGroup extends HTMLElement
{
    private beautifulSelect: BeautifulSelect|null = null;
    private originalGroup: HTMLOptGroupElement;
    private options: Array<BeautifulOption> = [];

    /**
     * constructor
     */
    public constructor(group: HTMLOptGroupElement)
    {
        super();

        this.originalGroup = group;
    }

    /**
     * getOptions
     */
    public getOptions(): Array<BeautifulOption>
    {
        return this.options;
    }

    /**
     * setOptions
     */
    public setOptions(options: Array<BeautifulOption>): void
    {
        this.options = options;
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
     * getGroup
     */
    public getGroup(): HTMLOptGroupElement
    {
        return this.originalGroup;    
    }

    /**
     * add
     */
    public add(option: BeautifulOption): void
    {
        this.options.push(option);
    }

    /**
     * build
     */
    public async build(): Promise<BeautifulGroup>
    {
        await Promise.all(
            Array.from(this.originalGroup.children).map(
                (child: Element): void => {
                    if (child instanceof HTMLOptionElement)
                    {
                        this.options.push(new BeautifulOption(child));
                    }
                }
            )
        );
        
        return this;
    }

    /**
     * refresh
     */
    public async refresh(): Promise<void>
    {
        await Promise.all(
            this.options.map(
                (option: BeautifulOption): void => {
                    option.build();
                }
            )
        );
    }

    /**
     * getValues
     */
    public async getValues(): Promise<Array<string>>
    {
        const VALUES: Array<string> = [];

        await Promise.all(
            this.options.map(
                (option: BeautifulOption): void => {
                    if (option.getActive())
                    {
                        VALUES.push(option.getValue());
                    }
                }
            )
        );

        return VALUES;
    }

    /**
     * getActiveContents
     */
    public async getActiveContents(): Promise<Array<string>>
    {
        const CONTENTS: Array<string> = [];

        await Promise.all(
            this.options.map(
                (option: BeautifulOption): void => {
                    if (option.getActive())
                    {
                        CONTENTS.push(option.getContent());
                    }
                }
            )
        );

        return CONTENTS;
    }

}

customElements.define("beautiful-group", BeautifulGroup);