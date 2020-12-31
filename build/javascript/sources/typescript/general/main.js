import { BeautifiedSelect } from "../Model/BeautifiedSelect.js";
const SELECTS = document.querySelectorAll("select");
Array.from(SELECTS).forEach((select) => {
    new BeautifiedSelect(select, { placeholder: select.dataset.placeholder === undefined ? "Sélectionner une valeur" : select.dataset.placeholder });
});
//# sourceMappingURL=main.js.map