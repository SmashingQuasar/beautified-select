class BeautifiedSelect extends HTMLElement
{
    private originalSelect: HTMLSelectElement|null = null;
    private beautifulSelect: BeautifulSelect|null = null;

    /**
     * constructor
     */
    public constructor(select?: HTMLSelectElement, configuration?: BeautifiedSelectConfiguration)
    {
        super();

        /* Managing vanilla select */

        if (select === undefined)
        {
            this.originalSelect = document.createElement("select");
            const EMPTY_OPTION: HTMLOptionElement = document.createElement("option");
            this.originalSelect.append(EMPTY_OPTION);
        }
        else
        {
            this.originalSelect = select;
        }

        const ORIGINAL_PARENT: HTMLElement|null = this.originalSelect.parentElement;
        let original_position: number = 0;

        if (ORIGINAL_PARENT !== null)
        {
            Array.from(ORIGINAL_PARENT.children).forEach(
                (child: Element, index: number): void => {
                    if (child === this.originalSelect)
                    {
                        original_position = index;
                    }
                }
            );
        }

        this.appendChild(this.originalSelect);
        this.originalSelect.hidden = true;

        if (ORIGINAL_PARENT !== null)
        {
            ORIGINAL_PARENT.insertBefore(this, ORIGINAL_PARENT.children[original_position]);
        }

        /* Creating beautiful select */

        this.beautifulSelect = new BeautifulSelect(this.originalSelect, configuration);
        this.appendChild(this.beautifulSelect);

        this.build();
    }

    /**
     * getOriginalSelect
     */
    public getOriginalSelect(): HTMLSelectElement|null
    {
        return this.originalSelect;    
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
     * build
     */
    public async build(): Promise<BeautifiedSelect>
    {
        if (this.beautifulSelect !== null)
        {
            await this.beautifulSelect.build();
        }

        return this;
    }

}

customElements.define("beautified-select", BeautifiedSelect);