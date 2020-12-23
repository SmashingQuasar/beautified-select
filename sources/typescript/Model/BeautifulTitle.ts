import { BeautifulSelect } from "./BeautifulSelect.js";
import { BeautifulList } from "./BeautifulList.js";

class BeautifulTitle extends HTMLElement
{
    private beautifulSelect: BeautifulSelect|undefined;
    private content: string = "";
    private readonly NULL_LENGTH: number = 0;

    /**
     * constructor
     */
    public constructor()
    {
        super();

        this.addEventListener(
            "click",
            (event: Event): void =>
            {
                event.preventDefault();
                if (this.beautifulSelect === undefined)
                {
                    return;
                }

                const LIST: BeautifulList|undefined = this.beautifulSelect.getList();

                if (LIST === undefined)
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
    public getBeautifulSelect(): BeautifulSelect|undefined
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
        if (this.beautifulSelect === undefined)
        {
            return;
        }

        const VALUES: Array<string> = await this.beautifulSelect.getActiveContents();
        const PLACEHOLDER: string|undefined = this.beautifulSelect.getPlaceholder();

        if (VALUES.length === this.NULL_LENGTH && PLACEHOLDER !== undefined)
        {
            this.content = PLACEHOLDER;
        }
        else
        {
            const ACTIVE_CONTENTS: Array<string> = await this.beautifulSelect.getActiveContents();
            this.content = ACTIVE_CONTENTS.join(", ");
        }

        this.innerHTML = this.content;
    }
}

if (customElements.get("beautiful-title") === undefined)
{
    customElements.define("beautiful-title", BeautifulTitle);
}

export { BeautifulTitle };
