class BeautifulList extends HTMLElement
{
    private beautifulSelect: BeautifulSelect|null = null;
    private options: Array<BeautifulOption> = [];
    private groups: Array<BeautifulGroup> = [];
    private unfolded: boolean = false;

    /**
     * constructor
     */
    public constructor()
    {
        super();

        document.addEventListener(
            "click",
            (event: MouseEvent): void => {
                const TARGET: EventTarget|null = event.target;

                if (!(TARGET instanceof HTMLElement))
                {
                    return;
                }

                const BEAUTIFUL_SELECT: BeautifulSelect|Element|null = TARGET.closest("beautiful-select");

                if (BEAUTIFUL_SELECT !== this.beautifulSelect)
                {
                    this.hide();
                }

            }
        );
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
     * getGroups
     */
    public getGroups(): Array<BeautifulGroup>
    {
        return this.groups;
    }

    /**
     * setGroups
     */
    public setGroups(groups: Array<BeautifulGroup>): void
    {
        this.groups = groups;
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
     * getUnfolded
     */
    public getUnfolded(): boolean
    {
        return this.unfolded;    
    }
    
    /**
     * add
     */
    public add(element: BeautifulOption|BeautifulGroup): void
    {
        if (element instanceof BeautifulOption)
        {
            this.options.push(element);
            this.appendChild(element);
        }
        else
        {
            this.groups.push(element);
            this.appendChild(element);
        }
    }

    /**
     * clean
     */
    public async clean(): Promise<void>
    {
        this.options = [];
        this.groups = [];

        await Promise.all(
            Array.from(this.children).map(
                (child: Element): void => {
                    child.remove();
                }
            )
        );
    }

    /**
     * calculateHeight
     */
    public calculateHeight(): number
    {
        if (this.beautifulSelect === null)
        {
            return 0;
        }
        
        return this.calculateAverageHeight() * this.beautifulSelect.getDisplayedOptions();
    }

    /**
     * calculateAverageHeight
     */
    public calculateAverageHeight(): number
    {
        if (this.options.length === 0)
        {
            return 0;
        }
        
        let total_height: number = 0;
        let total_options: number = 0;

        this.options.map(
            (option: BeautifulOption): void => {
                if (option.getValue())
                {
                    const OPTION_RECT: ClientRect|DOMRect = option.getBoundingClientRect();
                    
                    total_height += OPTION_RECT.height;
                    ++total_options;
                }
                
            }
        );

        if (total_options === 0)
        {
            return 0;
        }

        return total_height/total_options;
    }

    /**
     * show
     */
    public show(): void
    {
        this.style.height = `${this.calculateHeight()}px`;
        this.classList.add("unfolded");
        this.unfolded = true;
    }
    
    /**
     * hide
     */
    public hide(): void
    {
        this.style.height = "0px";
        this.classList.remove("unfolded");
        this.unfolded = false;
    }

    /**
     * toggleDisplay
     */
    public toggleDisplay(): void
    {
        this.unfolded ? this.hide() : this.show();
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
        await Promise.all(
            this.groups.map(
                (group: BeautifulGroup): void => {
                    group.refresh();
                }
            )
        );
    }

    /**
     * getValues
     */
    public async getValues(): Promise<Array<string>>
    {
        let values: Array<string> = [];

        await Promise.all(
            this.options.map(
                (option: BeautifulOption): void => {
                    if (option.getActive())
                    {
                        values.push(option.getValue());
                    }
                }
            )
        );

        await Promise.all(
            this.groups.map(
                async (group: BeautifulGroup): Promise<void> => {
                    values = values.concat(await group.getValues());
                }
            )
        );

        return values;
    }

    /**
     * getActiveContents
     */
    public async getActiveContents(): Promise<Array<string>>
    {
        let contents: Array<string> = [];

        await Promise.all(
            this.options.map(
                (option: BeautifulOption): void => {
                    if (option.getActive())
                    {
                        contents.push(option.getContent());
                    }
                }
            )
        );

        await Promise.all(
            this.groups.map(
                async (group: BeautifulGroup): Promise<void> => {
                    contents = contents.concat(await group.getActiveContents());
                }
            )
        );

        return contents;
    }
}

customElements.define("beautiful-list", BeautifulList);