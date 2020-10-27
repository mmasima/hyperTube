var  _  = require('lodash')

let playvid = {}

playvid.doextension = function(string){
    let extension = string.match(/.*(\..+?)$/);
    return extension[1].toLowerCase();
}
 

module.exports = playvid;