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
    template_option.tabIndex = -1;

    const template_input = document.createElement("input");
    template_input.type = "search";

    const template_group = document.createElement("ul");

    function beautify_option(option)
    {
        const beautiful_option = template_option.cloneNode();

        beautiful_option.classList.add("css_option");
        beautiful_option.dataset.index = option.index;
        beautiful_option.textContent = option.label || option.textContent;

        if (option.hasAttribute("itemscope"))
        {
            beautiful_option.setAttribute("itemscope", "");
            option.removeAttribute("itemscope");
        }

        if (option.hasAttribute("itemtype"))
        {
            beautiful_option.setAttribute("itemtype", option.getAttribute("itemtype"));
            option.removeAttribute("itemtype");
        }

        if (option.hasAttribute("itemprop"))
        {
            beautiful_option.setAttribute("itemprop", option.getAttribute("itemprop"));
            option.removeAttribute("itemprop");
        }

        if (option.disabled)
        {
            beautiful_option.classList.add("css_disabled");
        }
        
        beautiful_option.hidden = option.hasAttribute("disabled") && !option.value;
        
        this.appendChild(beautiful_option);
    }

    function beautify_group(group)
    {
        const beautiful_group = template_group.cloneNode();
        const options = group.querySelectorAll("option");
        const group_title = template_option.cloneNode();
        const group_container = template_option.cloneNode();


        if (group.hasAttribute("itemscope"))
        {
            beautiful_group.setAttribute("itemscope", "");
            group.removeAttribute("itemscope");
        }

        if (group.hasAttribute("itemtype"))
        {
            beautiful_group.setAttribute("itemtype", group.getAttribute("itemtype"));
            group.removeAttribute("itemtype");
        }

        if (group.hasAttribute("itemprop"))
        {
            beautiful_group.setAttribute("itemprop", group.getAttribute("itemprop"));
            group.removeAttribute("itemprop");
        }


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
        let children = beautiful_list.querySelectorAll("li.css_option:not([hidden])");
        let base_offsetHeight = beautiful_list.querySelector("li.css_option:not([hidden])").offsetHeight;

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
        const form = select.closest("form");

        if (form)
        {
            form.reset();
        }

        let default_option;

        Array.prototype.forEach.call(
            select.options,
            function (option)
            {
                if (!default_option)
                {
                    default_option = option.defaultSelected ? option : null;
                }
            }
        );

        const beautiful_title = template_title.cloneNode();
        beautiful_title.tabIndex = select.tabIndex ? select.tabIndex : 0;
        const beautiful_reset = template_reset.cloneNode(true);

        beautiful_reset.hidden = (select.dataset.reset === undefined);
        
        const beautiful_list = template_list.cloneNode();

        if (select.dataset.placeholder)
        {
            let placeholder = document.createElement("option");

            select.add(placeholder, select.firstElementChild);

            placeholder.disabled = true;

            if (default_option)
            {
                beautiful_title.textContent = default_option.textContent;
            }
            else
            {
                placeholder.selected = true;
                beautiful_title.textContent = select.dataset.placeholder;
            }
        }
        else
        {
            beautiful_title.textContent = select.options[select.selectedIndex].textContent;
        }


        const raw_groups = select.querySelectorAll("optgroup");

        if (raw_groups.length)
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
            Array.prototype.forEach.call(select.options, beautify_option, beautiful_list);
        }
        
        let container = template_select.cloneNode();
        select.insertAdjacentElement("afterend", container);

        if (select.hasAttribute("itemscope"))
        {
            container.setAttribute("itemscope", "");
            select.removeAttribute("itemscope");
        }

        if (select.hasAttribute("itemtype"))
        {
            container.setAttribute("itemtype", select.getAttribute("itemtype"));
            select.removeAttribute("itemtype");
        }

        if (select.hasAttribute("itemprop"))
        {
            container.setAttribute("itemprop", select.getAttribute("itemprop"));
            select.removeAttribute("itemprop");
        }

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
        let focus_triggered = false;
        let has_focus = false;

        wrapper.addEventListener(
            "focus",
            function (event)
            {
                focus_triggered = true;
                
                console.log(event.target);

                if (event.target === beautiful_title)
                {
                    let root = beautiful_title.closest("beautified-select").querySelector("select");

                    if (root && !root.disabled)
                    {
                        wrapper.classList.add("css_active");
                        beautiful_list.style.height = get_list_height(beautiful_list, root, total_border);
                        if (root.dataset.autocomplete === "true")
                        {
                            wrapper.querySelector("input[type=search]").focus();
                        }
                    }

                    closeOtherSelects(root);
                    
                }
            },
            true
        );

        wrapper.addEventListener(
            "keypress",
            function (event)
            {
                if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.code))
                {
                    event.preventDefault();

                    let target = event.currentTarget.querySelector(":focus");
                    
                    if (["INPUT", "BEAUTIFIED-TITLE"].includes(target.nodeName))
                    {
                        target = undefined;
                    }

                    switch (event.code)
                    {
                        case "ArrowDown":

                            if (target)
                            {
                                selectNextOption(target);
                            }
                            else
                            {
                                beautiful_list.querySelector("ul:not(.css_disabled) > li.css_option:not(.css_disabled):not([hidden]):not(.css_optgroup)").focus();
                            }
                        
                        break;
                        case "ArrowUp":

                            if (target)
                            {
                                selectPreviousOption(target);
                            }
                            else
                            {
                                beautiful_list.querySelector("ul:not(.css_disabled) > li.css_option:not(.css_disabled):not([hidden]):not(.css_optgroup)").focus();
                            }
                    
                        break;
                        case "Enter":

                            selectOption(event.target);

                        break;
                        case "Escape":

                            closeOtherSelects(document.body);

                        break;
                    }

                }
            }
        );

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

                        if (!select.disabled && wrapper.classList.contains("css_active") && event.target === beautiful_title && has_focus)
                        {
                            wrapper.classList.remove("css_active");
                            beautiful_list.style.height =  0;
                        }
                        else
                        {
                                    
                            let root = beautiful_title.closest("beautified-select").querySelector("select");

                            if (root && !root.disabled)
                            {
                                wrapper.classList.add("css_active");
                                beautiful_list.style.height = get_list_height(beautiful_list, root, total_border);
                                if (root.dataset.autocomplete === "true")
                                {
                                    wrapper.querySelector("input[type=search]").focus();
                                }
                            }

                            closeOtherSelects(root);
                            
                        }

                        break;

                    case "LI":

                        has_focus = false;
                        focus_triggered = false;
                        selectOption(event.target);
                        
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
                                if (select.dataset.placeholder)
                                {
                                    beautiful_list.childNodes[0].classList.add("css_selected");
                                    beautiful_title.textContent = select.dataset.placeholder;
                                    select.options[0].selected = true;
                                }
                                else
                                {
                                    beautiful_list.childNodes[default_selection].classList.add("css_selected");
                                    beautiful_title.textContent = default_option.textContent || select.dataset.placeholder;
                                    default_option.selected = true;
                                }
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

                if (focus_triggered)
                {
                    if (has_focus && wrapper.classList.contains("css_active"))
                    {
                        wrapper.blur();
                        has_focus = false;
                    }
                    else
                    {
                        has_focus = true;
                    }
                    focus_triggered = false;
                }
            }
        );
    }

    function closeOtherSelects(select)
    {
        let root = null;
        if (select)
        {
            root = select.closest("beautified-select");
        }

        let beautified_selects = document.querySelectorAll("beautified-select");
        beautified_selects = Array.from(beautified_selects);

        beautified_selects.forEach(
            function (beautified_select)
            {
                if ((beautified_select !== root) && beautified_select.querySelector("beautiful-select"))
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

    function selectNextOption(option)
    {

        if (option === null || option.nodeName !== "LI")
        {
            return;
        }

        let wrapper = option.closest("beautiful-select");
        let options_list = wrapper.querySelectorAll("ul:not(.css_disabled) > li.css_option:not(.css_disabled):not([hidden]):not(.css_optgroup)");

        let index = 0;
        
        for (let i = 0; i < options_list.length; ++i)
        {
            if (options_list[i] === option)
            {
                index = i;
                break;
            }
        }
        if (options_list[index + 1])
        {
            options_list[index + 1].focus();
        }

    }

    function selectPreviousOption(option)
    {

        if (option === null || option.nodeName !== "LI")
        {
            return;
        }

        let wrapper = option.closest("beautiful-select");
        let options_list = wrapper.querySelectorAll("ul:not(.css_disabled) > li.css_option:not(.css_disabled):not([hidden]):not(.css_optgroup)");

        let index = 0;
        
        for (let i = 0; i < options_list.length; ++i)
        {
            if (options_list[i] === option)
            {
                index = i;
                break;
            }
        }
        if (options_list[index - 1])
        {
            options_list[index - 1].focus();
        }

    
    }
    function selectOption(option)
    {
        
        if (option.classList.contains("css_option") && !option.closest(".css_disabled"))
        {
            let wrapper = option.closest("beautified-select");
            let select = wrapper.querySelector("select");
            let beautiful_list = wrapper.querySelector("beautiful-select > ul");
            let beautiful_title = wrapper.querySelector("beautified-title");

            if (!select.multiple)
            {
                Array.prototype.forEach.call(
                    beautiful_list.childNodes,
                    function (list_item)
                    {
                        list_item.classList.remove("css_selected");
                    }
                );
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

            const clicked_option = select.options[+option.dataset.index];
            
            const state_changed = select.multiple || !clicked_option.selected;

            option.classList.toggle("css_selected");
            clicked_option.selected = select.multiple ? !clicked_option.selected : true;

            if (!select.multiple)
            {
                beautiful_title.textContent = option.textContent || select.dataset.placeholder;
                wrapper.classList.remove("css_active");
                beautiful_list.style.height = 0;
            }
            else
            {
                const checked_options = select.querySelectorAll("option:checked:not([disabled])");

                let regexp = new RegExp(",? ?(" + option.textContent + ",?)", "g");
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
                        beautiful_title.textContent = option.textContent;
                    }
                    else
                    {
                        beautiful_title.textContent += ", " + option.textContent;
                    }
                }
            }

            if (state_changed)
            {
                select.dispatchEvent(new CustomEvent("change"));
            }

        }
    }

    Array.prototype.forEach.call(raw_selects, beautify_select);
    
    document.addEventListener(
        "click",
        function (event)
        {
            closeOtherSelects(event.target);
        }
    );
    
    window.beautify_select = beautify_select;

}