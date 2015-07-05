[![Build Status](https://travis-ci.org/unframework/airtight-css-lint.svg?branch=master)](https://travis-ci.org/unframework/airtight-css-lint)

# Airtight CSS

Basic set of CSS encapsulation rules that reduce side-effects/interactions between displayed elements. It's [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), but with one simple rule to fence-in components.

That means:

* CSS is grouped into composable components
* changes/refactors have less chance of breaking neighbouring code
* code reviews (you're doing them, right?) are less of a mind-numbing 💩 experience
* puppies frolick and kittens play

## Sole-Sourced CSS

Encapsulating CSS means following one cardinal rule:

- **each DOM element should get its style from only one place**

Simple, right? It pays off surprisingly well!

For every element in DOM markup, there should be *one* clearly obvious stylesheet source that influences it. The developer should also be able to trust that *no other stylesheet* ends up overriding that DOM element's appearance.

Due to how CSS positioning model works, that also means being careful with how absolute positioning is declared (see further below).

## Writing Componentized CSS

Just like with BEM, we always work with a concept of a component class ("block" in BEM): e.g. `search-box` or `inline-form`. It is the self-contained independent visual block of screen space. It might contain other blocks, but it may not influence their own styling, including sizing and position properties. Interplay between blocks is limited to standard DOM layout flow.

Component markup might need to use child classes ("element" in BEM). They are always used under the umbrella of the top-level component class. To distinguish them, we either prefix them with a simple `_` (e.g. `_help-tip`), or the full top-level component name plus `__`: `search-box__help-tip`. Semantic element tags (e.g. `header`) may be used instead of a child class; anything except `div` and `span` falls under that rule.

Any element might also be augmented with a modifier class (like in BEM). They are always prefixed with `-`: e.g. `-full-width`. They are always attached to either the top-level or child class.

CSS rules always start with the top-level component class selector. That is followed by zero or more child class selectors or semantic tag selectors. The rule may not contain another component's class name (to avoid crossing component boundaries).

Simple examples:

```css
.search-box {
    position: relative;
    display: inline-block;
    background: #f0f0f0;
    padding: 5px 5px 20px 5px;
}

.search-box.-full-width {
    display: block;
}

.search-box > ._help-tip {
    position: absolute;
    left: 5px;
    top: 50%;
    width: 10px;
    height: 10px;
    margin-top: -5px;
}

.search-box > ._help-tip.-alert {
    background: url(alert.png) 50% 50% no-repeat;
}

.search-box > button {
    border-radius: 5px;
}
```

By the way, that looks even nicer with LESS or SCSS nesting.

Examples of disallowed syntax that might cause encapsulation or readability problems:

```css
/* NOPE: sidebar component stepping on the search box toes */
.sidebar .search-box {
    width: 100%;
}

/* NOPE: where does this even belong? */
._cancel {
    width: 10px;
    height: 10px;
}

/* NOPE: should not mix semantic element tag with child class name */
.popup li._title {
    background: #f00;
}

/* NOPE: non-semantic helper elements are OK, but should have a descriptive child class name */
.popup > div {
    padding: 5px;
}

/* NOPE: top-level class name is enough of a distinguishing factor */
article.popup {
    position: fixed;
}
```

There are also restrictions on how absolutely-positioned elements may be declared. Elements with `position: absolute` property are placed relative to their "offset parent" - either document body or a parent node with a non-static `position`. That means possibly disastrous results if, for example, a parent element mistakenly loses the `position` property: the positioned child is shifted to an unpredictable spot in the page! For that reason, we ensure that the "offset parent" of a node is always defined in the same CSS component.

```css
/* NOPE: offset parent is out of control, which means unpredictable placement */
.search-box {
    /* some styling... */
}

.search-box > ._popup {
    position: absolute;
    /* some styling... */
}

/* YEP: positioning relationship is encapsulated */
.search-box {
    position: relative;
    /* some styling... */
}

.search-box > ._popup {
    position: absolute;
    /* some styling... */
}
```

## To Do

- lint actual markup as well (at runtime?)
- document how to do e.g. code reuse and mixin styling, scenarios with DOM-based composition
- work out fencing restrictions on CSS inheritance
- document (lint?) margin usage hints (as another source of CSS side-effects)
- document (lint?) LESS/SCSS specific guidelines
