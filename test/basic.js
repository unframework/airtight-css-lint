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
