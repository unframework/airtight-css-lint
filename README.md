[![Build Status](https://travis-ci.org/unframework/airtight-css-lint.svg?branch=master)](https://travis-ci.org/unframework/airtight-css-lint)

# Airtight CSS

Basic set of CSS encapsulation rules that reduce side-effects/interactions between displayed elements. It's [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) with one simple rule to fence-in components.

That means:

* CSS is grouped into composable components
* changes/refactors have less chance of breaking neighbouring code
* code reviews (you're doing them, right?) are less of a mind-numbing 💩 experience
* puppies frolick and kittens play

## Sole-Sourced CSS

Encapsulating CSS means following one cardinal rule:

- **each DOM element should get its style from only one place**

Simple, right? It pays off surprisingly well!

For every element in DOM markup, there should be one clearly obvious stylesheet source that influences it. The developer should also be able to trust that *no other stylesheet* ends up overriding that DOM element's appearance.

Examples:

```css
.neat-button {
    background: red;
}

/* NOPE */
.sidebar .neat-button {
    background: blue;
}

/* YEP */
.neat-button.-blue {
    background: blue;
}
```

...and...

```html
<!-- NOPE -->
<div class="acme-grid">
    <div class="cat acme-grid-4">Meow</div>
</div>

<!-- YEP -->
<div class="acme-grid">
    <div class="_grid-4">
        <div class="cat">Meow</div>
    </div>
</div>
```

