"use strict";
{

    const raw_selects = document.querySelectorAll("beautified-select select"); // All the <select> tags we need to beautify.

    // Creating required nodes to append.

    const template_title = document.createElement("beautified-title");
    const template_reset = document.createElement("button");
    template_reset.type = "button";
    template_reset.textContent = "↺";

    const template_list = document.createElement("ul");

    const template_select = document.createElement("beautiful-select");

    const template_option = document.createElement("li");

    const template_input = document.createElement("input");
    template_input.type = "search";

    const template_group = document.createElement("ul");

    function beautify_option(option)
    {
        const beautiful_option = template_option.cloneNode();

        beautiful_option.classList.add("css_option");
        beautiful_option.dataset.index = option.index;
        beautiful_option.textContent = option.label || option.textContent;

        if (option.disabled)
        {
            beautiful_option.classList.add("css_disabled");
        }
        this.appendChild(beautiful_option);
    }

    function beautify_group(group)
    {
        const beautiful_group = template_group.cloneNode();
        const options = group.querySelectorAll("option");
        const group_title = template_option.cloneNode();
        const group_container = template_option.cloneNode();

        group_container.classList.add("css_optgroup");

        if (group.disabled)
        {
            beautiful_group.classList.add("css_disabled");
        }

        group_title.classList.add("css_label");
        group_title.textContent = group.label || "";
        beautiful_group.appendChild(group_title);
        Array.prototype.forEach.call(options, beautify_option, beautiful_group);
        group_container.appendChild(beautiful_group);
        this.appendChild(group_container);
    }

    function get_list_height(beautiful_list, select, total_border)
    {
        let children = beautiful_list.querySelectorAll("li.css_option");
        let base_offsetHeight = beautiful_list.querySelector("li.css_option").offsetHeight;

        if (select.size)
        {
            if (select.size < children.length)
            {
                return ((base_offsetHeight * select.size) + total_border) + "px";
            }
            else
            {
                return ((base_offsetHeight * children.length) + total_border) + "px";
            }
        }
        else
        {
            if (3 < children.length)
            {
                return ((base_offsetHeight * 3) + total_border) + "px";
            }
            else
            {
                return ((base_offsetHeight * children.length) + total_border) + "px";
            }
        }
    }

    function beautify_select(select)
    {
        let wrapper = select.closest("beautified-select");

        // Handling incorrect select configuration.

        if (!wrapper)
        {
            throw new Error("Couldn't beautify select since it is not child of a <beautified-select> tag.");
            return false;
        }

        select.hidden = true;

        if (select.multiple)
        {
            wrapper.classList.add("css_multiple");
        }
        document.querySelector("form").reset();
        const default_selection = select.selectedIndex;

        const beautiful_title = template_title.cloneNode();

        const beautiful_reset = template_reset.cloneNode(true);
        if (select.dataset.reset === undefined)
        {
            beautiful_reset.hidden = true;
        }
        const beautiful_list = template_list.cloneNode();

        const default_option = select.options[default_selection];

        beautiful_title.textContent = default_option && default_option.textContent ? default_option.textContent : select.dataset.placeholder;

        const raw_groups = select.querySelectorAll("optgroup");

        if (raw_groups)
        {
            Array.prototype.forEach.call(raw_groups, beautify_group, beautiful_list);
            const stray_options = wrapper.querySelectorAll("select > option");

            if (stray_options)
            {
                Array.prototype.forEach.call(stray_options, beautify_option, beautiful_list);
            }

        }
        else
        {
            const raw_options = select.querySelectorAll("option");
            Array.prototype.forEach.call(raw_options, beautify_option, beautiful_list);
        }
        
        let container = template_select.cloneNode();
        select.insertAdjacentElement("afterend", container);

        container.appendChild(beautiful_title);
        container.appendChild(beautiful_reset);
        container.appendChild(beautiful_list);
        
        // Taking CSS affected borders in account for smooth display.

        let computed_style = window.getComputedStyle(beautiful_list);
        let bottom_border = +computed_style.borderBottomWidth.match(/[0-9]+/);
        let top_border = +computed_style.borderTopWidth.match(/[0-9]+/);
        let total_border = bottom_border + top_border;

        beautiful_list.style.height = 0;

        if (select.dataset.autocomplete === "true")
        {
            const beautiful_input = template_input.cloneNode();

            container.appendChild(beautiful_input);

            beautiful_input.addEventListener(
                "input",
                function (event)
                {
                    if (wrapper.classList.contains("css_active"))
                    {
                        Array.prototype.forEach.call(
                            beautiful_list.querySelectorAll("li.css_option"),
                            function (option)
                            {
                                option.hidden = event.target.value && !option.textContent.toLowerCase().match(event.target.value.toLowerCase());
                            }
                        );
                    }

                }
            );

        }

        wrapper.addEventListener(
            "click",
            function (event)
            {
                const target = event.target.closest("beautified-title, li, button");

                if (!target)
                {
                    return;
                }
                switch (target.nodeName)
                {
                    case "BEAUTIFIED-TITLE":

                        if (!select.disabled)
                        {
                            beautiful_list.style.height = wrapper.classList.toggle("css_active") ? get_list_height(beautiful_list, select, total_border) : 0;
                            if (select.dataset.autocomplete === "true")
                            {
                                wrapper.querySelector("input[type=search]").focus();
                            }
                        }

                        break;

                    case "LI":

                        if (event.target.classList.contains("css_option") && !event.target.closest(".css_disabled"))
                        {

                            if (!select.multiple)
                            {
                                Array.prototype.forEach.call(
                                    beautiful_list.childNodes,
                                    function (list_item)
                                    {
                                        list_item.classList.remove("css_selected");
                                    }
                                );
                            }

                            target.classList.toggle("css_selected");
                            select.options[+target.dataset.index].selected = !select.options[+target.dataset.index].selected;

                            if (!select.multiple)
                            {
                                beautiful_title.textContent = event.target.textContent || select.dataset.placeholder;
                                wrapper.classList.remove("css_active");
                                beautiful_list.style.height = 0;
                                if (select.dataset.autocomplete === "true")
                                {
                                    wrapper.querySelector("input[type=search]").value = null;
                                    Array.prototype.forEach.call(
                                        beautiful_list.querySelectorAll("li.css_option"),
                                        function (option)
                                        {
                                            option.hidden = false;
                                        }
                                    );
                                }
                            }
                            else
                            {
                                const checked_options = select.querySelectorAll("option:checked");

                                let regexp = new RegExp(",? ?(" + target.textContent + ",?)", "g");
                                let match = beautiful_title.textContent.match(regexp);


                                if (match)
                                {
                                    beautiful_title.textContent = beautiful_title.textContent.replace(match[0], "");
                                    if (!checked_options.length)
                                    {
                                        beautiful_title.textContent = select.dataset.placeholder || "";
                                    }
                                }
                                else
                                {
                                    if (checked_options.length === 1)
                                    {
                                        beautiful_title.textContent = target.textContent;
                                    }
                                    else
                                    {
                                        beautiful_title.textContent += ", " + target.textContent;
                                    }
                                }
                            }
                            select.dispatchEvent(new CustomEvent("change"));

                        }
                        break;

                    case "BUTTON":
                        
                        if (!select.disabled)
                        {
                            Array.prototype.forEach.call(
                                wrapper.querySelectorAll("li.css_option"),
                                function (list_item)
                                {
                                    list_item.classList.remove("css_selected");
                                }
                            );
                            Array.prototype.forEach.call(
                                select.options,
                                function (option)
                                {
                                    option.selected = false;
                                }
                            );
                            if (select.multiple)
                            {
                                beautiful_title.textContent = select.dataset.placeholder || "";
                            }
                            else
                            {
                                beautiful_list.childNodes[default_selection].classList.add("css_selected");
                                beautiful_title.textContent = default_option.textContent || select.dataset.placeholder;
                                default_option.selected = true;
                            }
                            if (select.dataset.autocomplete === "true")
                            {
                                wrapper.querySelector("input[type=search]").value = null;
                                Array.prototype.forEach.call(
                                    beautiful_list.querySelectorAll("li.css_option"),
                                    function (option)
                                    {
                                        option.hidden = false;
                                    }
                                );
                            }
                            select.dispatchEvent(new CustomEvent("change"));
                        }
                        break;
                }
            }
        );
    }

    Array.prototype.forEach.call(raw_selects, beautify_select);
    
    document.addEventListener(
        "click",
        function (event)
        {
            Array.prototype.forEach.call(
                document.querySelectorAll("beautified-select"),
                function (beautified_select)
                {
                    if (beautified_select !== event.target.closest("beautified-select"))
                    {
                        beautified_select.classList.remove("css_active");
                        let list = beautified_select.querySelector("ul");
                        let style = window.getComputedStyle(list);
                        let borders = style.borderBottomWidth.match(/[0-9]+/) + style.borderTopWidth.match(/[0-9]+/);
                        list.style.height = (list.offsetHeight - borders) ? 0 : list.dataset.height + "px";

                        if (beautified_select.querySelector("select").dataset.autocomplete === "true")
                        {
                            beautified_select.querySelector("input[type=search]").value = null;

                            Array.prototype.forEach.call(
                                beautified_select.querySelectorAll("li.css_option"),
                                function (option)
                                {
                                    option.hidden = false;
                                }
                            );
                        }
                    }
                }
            );
        }
    );
    
    window.beautify_select = beautify_select;

}