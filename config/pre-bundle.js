"use strict"
var fs = require('fs');

const otscript = `
class Cheat { };

class World { };

class DataFile { };

class Convar { };

class UserCMD { };

class UI { };

class Entity { };

class Exploit { };

class View { };

class Event { };

class GrenadePrediction { };

class Autostop { };

class Material { };

class Ragebot { };

class AntiAim { };

class Input { };

class Trace { };

class Render { };

class Globals { };

class Local { };

export { Cheat, World, GrenadePrediction, Autostop, DataFile, Convar, UserCMD, UI, Entity, Exploit, View, Material, Ragebot, AntiAim, Input, Local, Trace, Render, Globals };`;

if (!fs.existsSync("./dist/intermediates")) {
    fs.mkdirSync("./dist/intermediates");
}

fs.writeFile("./dist/intermediates/onetap.js", otscript, { flag: 'w+' }, function (err) {
    if (err) {
        throw (err);
    }
});