var util    = require('util');

var npmlog  = require('npmlog');
  
var _level     = 'debug';
  
exports = module.exports = function(level) {

  if (level) _level = level;
  npmlog.level = _level;
  
  npmlog.addLevel('debug',     100, { fg: 'green'  }, "DEBUG    ");
  npmlog.addLevel('info',      200, { fg: 'green'  }, "INFO     ");
  npmlog.addLevel('notice',    300, { fg: 'yellow' }, "NOTICE   ");
  npmlog.addLevel('warning',   400, { fg: 'yellow' }, "WARNING  ");
  npmlog.addLevel('error',     500, { fg: 'red'    }, "ERROR    ");
  npmlog.addLevel('critical',  600, { fg: 'red'    }, "CRITICAL ");
  npmlog.addLevel('alert',     700, { fg: 'red'    }, "ALERT    ");
  npmlog.addLevel('emergency', 800, { fg: 'red'    }, "EMERGENCY");
 
 
  var logwrapper =  function() {}
    
  logwrapper.debug      = function() { delegate('debug', arguments); }
  logwrapper.info       = function() { delegate('info', arguments); }
  logwrapper.notice     = function() { delegate('notice', arguments); }
  logwrapper.warning    = function() { delegate('warning', arguments); }
  logwrapper.error      = function() { delegate('error', arguments); }
  logwrapper.critical   = function() { delegate('critical', arguments); }
  logwrapper.alert      = function() { delegate('alert', arguments); }
  logwrapper.emergency  = function() { delegate('emergency', arguments); }
  
  return logwrapper;
}

function delegate(method, _args) {

  var args = Array.prototype.slice.call(_args);

  if (args.length === 1) {
    npmlog.log(method, '', currDate() + util.inspect(args[0], { showHidden: true, depth: null }));
  }
  
  if (args.length > 1) {
    var caption = args.shift();
        caption = currDate() + caption;
    var format  = args.shift();
    args.unshift(format);
    args.unshift(caption);    
    args.unshift(method);
    npmlog.log.apply(null, args);
  }
  
}
// 20 Jul 13:31:29
function currDate() {
  var now = new Date();
  // return "[" + now.format("ddd, mmm dd yy, HH:MM:SS Z") + "]"; // 
  return " - " + now.toUTCString() + " - "; // 
}