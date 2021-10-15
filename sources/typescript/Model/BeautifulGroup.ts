import type { BeautifulSelect } from "./BeautifulSelect.js";
import { BeautifulOption } from "./BeautifulOption.js";

class BeautifulGroup extends HTMLElement
{
	private beautifulSelect: BeautifulSelect|undefined;
	private readonly originalGroup: HTMLOptGroupElement;
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
				(child: Element): undefined =>
				{
					if (child instanceof HTMLOptionElement)
					{
						this.options.push(new BeautifulOption(child));
					}

					return undefined;
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
				async (option: BeautifulOption): Promise<void> =>
				{
					return await option.build();
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
				(option: BeautifulOption): undefined =>
				{
					if (option.getActive())
					{
						VALUES.push(option.getValue());
					}

					return undefined;
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
				(option: BeautifulOption): undefined =>
				{
					if (option.getActive())
					{
						CONTENTS.push(option.getContent());
					}

					return undefined;
				}
			)
		);

		return CONTENTS;
	}
}

if (customElements.get("beautiful-group") === undefined)
{
	customElements.define("beautiful-group", BeautifulGroup);
}

export { BeautifulGroup };
