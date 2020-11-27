import { BeautifiedSelect } from "../Model/BeautifiedSelect.js";
const SELECTS = document.querySelectorAll("select");
Array.from(SELECTS).forEach((select) => {
    new BeautifiedSelect(select, { placeholder: "Select a value..." });
});
//# sourceMappingURL=main.js.map