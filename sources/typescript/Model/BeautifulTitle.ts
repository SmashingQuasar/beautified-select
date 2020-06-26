class BeautifulTitle extends HTMLElement
{
    private beautifulSelect: BeautifulSelect|null = null;
    private content: string = "";

    /**
     * constructor
     */
    public constructor()
    {
        super();

        this.addEventListener(
            "click",
            (): void =>
            {
                if (this.beautifulSelect === null)
                {
                    return;
                }

                const LIST: BeautifulList|null = this.beautifulSelect.getList();

                if (LIST === null)
                {
                    return;
                }
                
                LIST.toggleDisplay();
            }
        );
    }

    /**
     * getContent
     */
    public getContent(): string
    {
        return this.content;    
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
     * refresh
     */
    public async refresh(): Promise<void>
    {
        if (this.beautifulSelect === null)
        {
            return;
        }

        const VALUES: Array<string> = await this.beautifulSelect.getActiveContents();
        const PLACEHOLDER: string|null = this.beautifulSelect.getPlaceholder();
        
        if (VALUES.length === 0 && PLACEHOLDER !== null)
        {
            this.content = PLACEHOLDER;
        }
        else
        {
            let active_contents: Array<string> = await this.beautifulSelect.getActiveContents();
            this.content = active_contents.join(", ");
        }

        this.innerHTML = this.content;
    }
}

customElements.define("beautiful-title", BeautifulTitle);