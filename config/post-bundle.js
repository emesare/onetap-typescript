"use strict"
var fs = require('fs');

function fixBuild(filename, replacements) {
    fs.readFile(filename, 'utf-8', function (err, data) {
        var regex;

        if (err) {
            throw (err);
        } else {
            console.log("Fixing duktape api namespaces...");
            for (let index = 0; index < replacements.length; index++) {
                const element = replacements[index];
                regex = new RegExp("  var " + element);
                data = data.replace(regex, "  var pre_" + element);
            }
        }

        fs.writeFile(filename, data, 'utf-8', function (err) {
            if (err) {
                throw (err);
            }
        });
    });
}

fixBuild(process.argv.slice(2)[0], ["Cheat", "World", "Autostop", "GrenadePrediction", "Event", "DataFile", "Convar", "UserCMD", "UI", "Entity", "Exploit", "View", "Material", "Ragebot", "AntiAim", "Input", "Local", "Trace", "Render", "Globals"]);