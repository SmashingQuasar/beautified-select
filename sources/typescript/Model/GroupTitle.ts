class GroupTitle extends HTMLElement
{
    /**
     * constructor
     */
    public constructor(content: string|Document|Node)
    {
        super();

        if (typeof content === "string")
        {
            this.textContent = content;
        }
        else
        {
            this.appendChild(content);
        }
    }
}

customElements.define("group-title", GroupTitle, { extends: "span"} );