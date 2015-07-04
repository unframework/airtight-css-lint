/*
 * Copyright (c) 2015 Nick Matantsev
 * Licensed under the BSD license.
 */

'use strict';

var fs = require('fs');
var airtightCssLint = require('../');

module.exports = function (grunt) {
    grunt.registerMultiTask('airtightcss', 'Lint CSS for airtightness', function () {
        var hasErrors = false;

        this.filesSrc.forEach(function(file) {
            var css = fs.readFileSync(file, 'utf8');

            airtightCssLint(css, function (line, column, msg) {
                var logMessage = '[' + file + ':' + line + ':' + column + '] ' + msg;

                grunt.log.error(logMessage);
                hasErrors = true;
            });
        });

        if (hasErrors) {
            return false;
        }

        grunt.log.ok(this.filesSrc.length + ' files checked for airtightness.');
    });
};