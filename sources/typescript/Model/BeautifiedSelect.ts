import type { BeautifiedSelectConfiguration } from "../declarations/BeautifiedSelectConfiguration.js";
import { BeautifulSelect } from "./BeautifulSelect.js";

class BeautifiedSelect extends HTMLElement
{
	private readonly originalSelect: HTMLSelectElement|undefined;
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

		if (ORIGINAL_PARENT instanceof HTMLElement)
		{
			Array.from(ORIGINAL_PARENT.children).forEach(
				(child: Element, index: number): void =>
				{
					if (child === this.originalSelect)
					{
						original_position = index;
					}
				}
			);
		}

		this.appendChild(this.originalSelect);
		this.originalSelect.hidden = true;

		if (ORIGINAL_PARENT instanceof HTMLElement)
		{
			const TO_INSERT: Element|undefined = ORIGINAL_PARENT.children[original_position];

			if (TO_INSERT instanceof Node)
			{
				ORIGINAL_PARENT.insertBefore(this, TO_INSERT);
			}
		}

		/* Creating beautiful select */

		this.beautifulSelect = new BeautifulSelect(this.originalSelect, configuration);
		this.appendChild(this.beautifulSelect);

		this.build().then(
			(): void =>
			{
				console.info("Beautified Select successfully built.");
			},
			(error: Error): void =>
			{
				console.error(`Error occurred while building BeautifiedSelect: ${error.message}`);
			}
		);
	}

	/**
	 * getOriginalSelect
	 */
	public getOriginalSelect(): HTMLSelectElement|undefined
	{
		return this.originalSelect;
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

if (customElements.get("beautified-select") === undefined)
{
	customElements.define("beautified-select", BeautifiedSelect);
}

export { BeautifiedSelect };
