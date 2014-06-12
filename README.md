
# Airtight CSS

Check CSS (manual or LESS/SASS output) for opinionated naming and structure rules for maintainability.

The method is to apply same well-known code encapsulation rules to DOM+CSS runtime structure as would be traditionally enforced on normal frontend/backend code. CSS style definitions are guided to follow a component pattern to reduce unwanted/unpredictable interactions between displayed elements.

As a result:

* style is constrained into more reusable, composable modules for faster development
* style modifications/refactors have less chance of introducing visual regressions

Inspirations:

* [BEM naming conventions](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
* [Atomic design](http://bradfrostweb.com/blog/post/atomic-web-design/)
