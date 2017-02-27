var t = require('tap');
var checkCSS = require('../');

function run(css) {
    var results = [];

    checkCSS(css, function (line, col, msg) {
        results.push([ line, col, msg ]);
    });

    return results;
}

t.same(run(' '), [], 'empty');
t.same(run('testtag {}'), [], 'global tag');
t.same(run('.top-level-class {}'), [], 'top-level class');

t.same(run('.-dangling-top-modifier {}'), [[1, 1, 'cannot recognize top-level selector match']], 'dangling top-level modifier');

// child element direct child references
t.same(run('.top-level ._child > h1 {}'), [], 'allow child classes to directly refer to element tags');
t.same(run('.top-level ._child > div {}'), [[1, 1, 'do not use non-semantic tag name: "div"']], 'child classes can\'t directly refer to non-semantic element tags');
