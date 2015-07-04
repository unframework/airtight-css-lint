var t = require('tap');
var checkCSS = require('../');

function run(css) {
    var results = [];

    checkCSS(css, function (line, col, msg) {
        results.push([ line, col, msg ]);
    });

    return results;
}

t.same(run(' '), [], 'empty CSS');
