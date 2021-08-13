const { DateTime } = require("luxon");

var now = DateTime.now({ zone: "GMT" })
var midnight = DateTime.utc(now.c.year, now.c.month, now.c.day, 0, 0, 0);
console.log(midnight.ts)