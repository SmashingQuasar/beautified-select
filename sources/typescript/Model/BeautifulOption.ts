import { BeautifulSelect } from "./BeautifulSelect.js";
import { BeautifulList } from "./BeautifulList.js";

class BeautifulOption extends HTMLElement
{
    private originalOption: HTMLOptionElement;
    private beautifulSelect: BeautifulSelect|undefined;
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

        this.build().then(
            (): void => {
                console.info("Beautiful Option successfully built.");
            },
            (error: Error): void => {
                console.error(`Error occurred while refreshing Beautiful Option: ${error.message}`);
            }
        );

        this.addEventListener("click", this.toggleActivation.bind(this));
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
     * activate
     */
    public async activate(): Promise<void>
    {
        this.active = true;
        this.classList.add("active");

        if (this.originalOption === undefined)
        {
            return;
        }

        this.originalOption.selected = true;

        if (this.beautifulSelect === undefined)
        {
            return;
        }

        const CUSTOM_CHANGE_EVENT: CustomEvent = new CustomEvent("change");

        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        await this.beautifulSelect.refreshTitle();

        const LIST: BeautifulList|undefined = this.beautifulSelect.getList();

        if (LIST === undefined)
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
    public async deactivate(): Promise<void>
    {
        this.active = false;
        this.classList.remove("active");

        if (this.originalOption === undefined)
        {
            return;
        }

        this.originalOption.selected = false;

        if (this.beautifulSelect === undefined)
        {
            return;
        }

        const CUSTOM_CHANGE_EVENT: CustomEvent = new CustomEvent("change");

        this.beautifulSelect.getOriginalSelect().dispatchEvent(CUSTOM_CHANGE_EVENT);
        await this.beautifulSelect.refreshTitle();

        const LIST: BeautifulList|undefined = this.beautifulSelect.getList();

        if (LIST === undefined)
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
    public async toggleActivation(event: Event): Promise<boolean>
    {
        event.preventDefault();
        if (this.beautifulSelect !== undefined)
        {
            if (this.beautifulSelect.getMultiple() && this.active)
            {
                await this.deactivate();
            }
            else
            {
                await this.activate();
            }
        }

        return this.active;
    }

    /**
     * build
     */
    public async build(): Promise<void>
    {
        this.value = this.originalOption.value;
        this.hidden = this.originalOption.hidden;

        if (this.content === "")
        {
            if (typeof this.originalOption.textContent === "string")
            {
                this.setContent(this.originalOption.textContent);
            }
            else
            {
                this.setContent("");
            }
        }

        if (this.originalOption.selected)
        {
            this.active = true;
            this.classList.add("active");

            if (this.beautifulSelect === undefined)
            {
                return;
            }

            await this.beautifulSelect.refreshTitle();

        }
        else
        {
            this.active = false;
            this.classList.remove("active");
        }
    }

}

if (customElements.get("beautiful-option") === undefined)
{
    customElements.define("beautiful-option", BeautifulOption);
}

export { BeautifulOption };
