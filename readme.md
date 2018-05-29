# Beautified Select

This plugin aims to ease the beautifying process of HTML 5 `<select>` tags. You do not require any JavaScript knowledge to use this plugin as it is based on the HTML standard and uses the default HTML syntax. Please read the following sections to have more information on the plugin syntax.

## Licence

> Copyright (c) 2018 Nicolas "SmashingQuasar" Cordier
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

## Reviews of files

### beautified_select.html

This is a sample file provided just to give you 5 examples of how to use this plugin.

### style/reset.css

This file is a basic CSS reset file, it is provided to make the default CSS work in any case. If you intend to change the style of the plugin or if you already have your reset.css file, you do not need it.

### style/style.css

This file contains only the default style for this plugin. It uses low weight CSS selectors so you can easily override them.
It is not required BUT the plugin will NOT work without a minimum style added to it!

### javascript/beautified-select.js

The main JavaScript file for this plugin. This file is required for the plugin to work. It does not provide any polyfill or load any external library and is fully standalone.

## A quick word about CSS

This plugin has been written with a default style so it can work properly when loaded. The default CSS provided with this plugin has the lowest possible weight, which means you can easily override it with your own CSS at your convenience.

## Requirements

This plugin requires the following JavaScript functionalities to work properly:

* Element.closest() function: For Internet Explorer 11 you will need to use a polyfill.
* CustomEvent class: For Internet Explorer 11 you will need a polyfill for this class to work.

## Getting Started

To use the plugin, load the _style.css_ file and the _beautified-select.js_ script in your webpage.

Since this is a non-intrusive plugin trying not to mess with other scripts/plugins, you will need to surround the `<select>` tags you want to beautify with a custom tag : `<beautified-select>`.
Once you have surrounded your `<select>` with a `<beautified-select>` custom tag, the plugin should beautify it accordingly.

## Basic HTML5 features

The plugin will adapt the display of your beautified select to the attributes of your select tag and its inner HTML.

### Simple & Multiple `<select>`

Just as you would do with a basic HTML5 select, you can create a multiple select with this plugin. Simply add the attribute `multiple` to your `<select>` tag (not the `<beautified-select>` tag!) and refresh your webpage.

Example:
```html
<!-- This configuration will allow the user to select any of the option or both -->

<beautified-select>
    <select multiple name="sample">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
    </select>
</beautified-select>
```

### Managing number of displayed items

Beautified Select fully supports the `size` attribute of the `<select>` tag. By default most browser display 3 elements inside `<select>` dropdowns, so this is the default value for Beautified Select as well. If you want to change it, simply add the `size="x"` attribute to your `<select>` tag.

Example:
```html
<!-- This configuration will display "Foo", "Bar", "Smashing", "Quasar" in the dropdown -->

<beautified-select>
    <select name="sample" size="4">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="smashing">Smashing</option>
        <option value="quasar">Quasar</option>
        <option value="zamralik">Zamralik</option>
    </select>
</beautified-select>
```

### Optgroups

You can define HTML5 `<optgroup>` tags within your `<select>` innerHTML and Beautified Select will parse them and display an embellished version of them.
The generated DOM will work exactly as a vanilla `<optgroup>` would and will not be selectable.
Please refer to the official HTML standard if you want to know more about `<optgroup>`: [WhatWG](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element)

Example:
```html
<!-- This configuration will display two <optgroup>: "Zamralik" and "Default" -->

<beautified-select>
    <select name="sample">
        <optgroup label="Zamralik">
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
        </optgroup>
        <optgroup label="Default">
            <option value="smashing">Smashing</option>
            <option value="quasar">Quasar</option>
        </optgroup>
        <option value="zamralik">Zamralik</option>
    </select>
</beautified-select>
```

## Advanced features

Beautified Select goes further in the customization and allows you to add advanced features simply by adding a data-attribute in your select.

### Autocompletion

You can enable an autocompletion feature to help users find what they are looking for in vastly populated lists.
To add this feature, simply add the following attribute to your `<select>` tag: `data-autocomplete="true"`
An important note is to understand this autocomplete feature only search within `<option>` tags and not `<optgroup>` as its primary goal is to provide easily selectable options to the user.

Example:
```html
<!-- This configuration will enable the autocompletion for this select -->

<beautified-select>
    <select name="sample" data-autocomplete="true">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="smashing">Smashing</option>
        <option value="quasar">Quasar</option>
        <option value="zamralik">Zamralik</option>
    </select>
</beautified-select>
```

### Placeholder

The HTML standard does not provide a way to define a placeholder value for `<select>` tag. Beautified Select offers this possibility.
To defined a placeholder, you just need to add a data-attribute as follows: `data-placeholder="Choisissez une valeur"` in your `<select>` tag definition.

Example:
```html
<!-- This configuration will enable the autocompletion for this select -->

<beautified-select>
    <select name="sample" data-placeholder="Please select a value">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="smashing">Smashing</option>
        <option value="quasar">Quasar</option>
        <option value="zamralik">Zamralik</option>
    </select>
</beautified-select>
```

> Note: In vanilla HMTL you would simply define an option with an empty value to define a placeholder. This is fully supported by Beautified Select.
> If you have defined an empty option with an empty value AND a data-placeholder, then selecting the empty option will display the placeholder.

### Reset value

Beautified Select provides a simple way to reset the value within the select.
To enable the reset button, please add the following data-attribute to your `<select>` tag: `data-reset`:

Example:
```html
<!-- This configuration will enable the autocompletion for this select -->

<beautified-select>
    <select name="sample" data-reset>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="smashing">Smashing</option>
        <option value="quasar">Quasar</option>
        <option value="zamralik">Zamralik</option>
    </select>
</beautified-select>
```
