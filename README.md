[![Build Status](https://travis-ci.org/unframework/airtight-css-lint.svg?branch=master)](https://travis-ci.org/unframework/airtight-css-lint)

# Airtight CSS

Airtight CSS is all about CSS encapsulation to reduce side-effects/interactions between displayed elements.

It's just like [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), but with one simple rule to fence-in components:

- **each DOM element should get its style from only one place**

For every element in DOM markup, there should be *one* clearly obvious stylesheet source that influences it. The developer should also be able to trust that *no other stylesheet* ends up overriding that DOM element's appearance. Another term for this is *sole-sourced CSS*.

Simple, right? It pays off surprisingly well!

Due to how CSS positioning model works, that also means being careful with how absolute positioning is declared (see further below).

This linter helps enforce that guideline in the app stylesheets. That means:

* CSS is grouped into composable components
* changes/refactors have less chance of breaking neighbouring code
* code reviews (you're doing them, right?) are less of a mind-numbing 💩 experience
* puppies frolick and kittens play

## Writing Encapsulated CSS

Just like with BEM, we always work with a concept of a component class ("block" in BEM): e.g. `search-box` or `inline-form`. Any visual component is assumed to be a self-contained independent block of screen space.

Some components may be attached to others as DOM children, but they still don't influence each other's styling, including sizing and position properties. Interplay between these visual blocks is limited to standard DOM layout flow.

Component markup might need to use child classes ("element" in BEM). They are always used under the umbrella of the top-level component class. To distinguish them, we either prefix them with a simple `_` (e.g. `_help-tip`), or the full top-level component name plus `__`: `search-box__help-tip`. Semantic element tags (e.g. `header`) may be used instead of a child class; anything except `div` and `span` falls under that rule.

Any element might also be augmented with a modifier class (like in BEM). They are always prefixed with `-`: e.g. `-full-width`. They are always attached to either the top-level or child class.

This spells out a very clear structure for any CSS rule selector:

* always start with the top-level component class selector
* then write zero or more child class selectors or semantic tag selectors

Oh, and the rule may not contain another component's class name (to avoid crossing component boundaries).

## Examples

Simple search box example, with a help tip element and button inside (looks even nicer with LESS or SCSS nesting):

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

Examples of disallowed syntax that might cause encapsulation or ambiguity problems:

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

/* NOPE: should not mix semantic element tag ("li") with child class name ("._title") */
.popup li._title {
    background: #f00;
}

/* NOPE: non-semantic helper elements are OK, but should have a descriptive child class name like "._content-wrapper" */
.popup > div {
    padding: 5px;
}

/* NOPE: using top-level class name alone (".popup") is distinct enough */
article.popup {
    position: fixed;
}
```

## Absolute Positioning Rules

There are also special restrictions on how absolutely-positioned elements may be declared.

Browsers place elements with `position: absolute` property based on their "offset parent" - either document body or a parent node with a non-static `position`. That means possibly disastrous results if, for example, a parent element mistakenly loses its `position` property: the positioned child is shifted to an unpredictable spot in the page!

For that reason, we ensure that the "offset parent" of a node is always defined in the same CSS component. That prevents unrelated CSS code from stepping on our toes.

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
