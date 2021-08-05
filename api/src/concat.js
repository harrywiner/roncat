"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var con = new RegExp(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/);
var vow = new RegExp(/[a,e,i,o,u,y]/);
var basic = new RegExp(con.source + "*|" + vow.source, "i");
// Function that takes two words and concatenates them
// Matches the words to the right pattern then concatenates
function concat(wordA, wordB) {
    var woot = basic.exec(wordA)[0];
    if (woot !== null && wordA !== null && wordB !== null) {
        var result = wordB.replace(basic, woot);
        return result;
    }
}
// If the word is matched exp from the beginning of the word
function match(word, exp) {
    var res = exp.exec(word)[0];
    return res === word.substring(0, res.length) &&
        res.length != 0;
}
var _ = {
    concat: concat,
};
exports.default = _;
//# sourceMappingURL=concat.js.map