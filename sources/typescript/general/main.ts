/* eslint-disable no-new */

import { BeautifiedSelect } from "../Model/BeautifiedSelect.js";

const SELECTS: NodeListOf<HTMLSelectElement> = document.querySelectorAll("select");

Array.from(SELECTS).forEach(
	(select: HTMLSelectElement): void =>
	{
		new BeautifiedSelect(select, { placeholder: select.dataset["placeholder"] === undefined ? "Sélectionner une valeur" : select.dataset["placeholder"] });
	}
);
