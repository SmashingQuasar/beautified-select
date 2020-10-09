import { BeautifiedSelectConfiguration } from "../declarations/BeautifiedSelectConfiguration.js";
import { BeautifulSelect } from "./BeautifulSelect.js";

class BeautifiedSelect extends HTMLElement
{
    private readonly ORIGINAL_SELECT: HTMLSelectElement|undefined;
    private beautifulSelect: BeautifulSelect|undefined;

    /**
     * constructor
     */
    public constructor(select?: HTMLSelectElement, configuration?: BeautifiedSelectConfiguration)
    {
        super();

        /* Managing vanilla select */

        if (select === undefined)
        {
            this.ORIGINAL_SELECT = document.createElement("select");
            const EMPTY_OPTION: HTMLOptionElement = document.createElement("option");
            this.ORIGINAL_SELECT.append(EMPTY_OPTION);
        }
        else
        {
            this.ORIGINAL_SELECT = select;
        }

        const ORIGINAL_PARENT: HTMLElement|null = this.ORIGINAL_SELECT.parentElement;
        let original_position: number = 0;

        if (ORIGINAL_PARENT instanceof HTMLElement)
        {
            Array.from(ORIGINAL_PARENT.children).forEach(
                (child: Element, index: number): void => {
                    if (child === this.ORIGINAL_SELECT)
                    {
                        original_position = index;
                    }
                }
            );
        }

        this.appendChild(this.ORIGINAL_SELECT);
        this.ORIGINAL_SELECT.hidden = true;

        if (ORIGINAL_PARENT instanceof HTMLElement)
        {
            ORIGINAL_PARENT.insertBefore(this, ORIGINAL_PARENT.children[original_position]);
        }

        /* Creating beautiful select */

        this.beautifulSelect = new BeautifulSelect(this.ORIGINAL_SELECT, configuration);
        this.appendChild(this.beautifulSelect);

        this.build().then(
            (): void => {
                console.info("Beautified Select successfully built.");
            },
            (error: Error): void => {
                console.error(`Error occurred while building BeautifiedSelect: ${error.message}`);
            }
        );
    }

    /**
     * getOriginalSelect
     */
    public getOriginalSelect(): HTMLSelectElement|undefined
    {
        return this.ORIGINAL_SELECT;
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
     * build
     */
    public async build(): Promise<BeautifiedSelect>
    {
        if (this.beautifulSelect)
        {
            await this.beautifulSelect.build();
        }

        return this;
    }

}

customElements.define("beautified-select", BeautifiedSelect);

export { BeautifiedSelect };
