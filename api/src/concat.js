"use strict";
exports.__esModule = true;
var con = new RegExp(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/);
var vow = new RegExp(/[a,e,i,o,u,y]/);
var basic = new RegExp(con.source + "*|" + vow.source, "i");
var manyWord = new RegExp("(" + con.source + "*" + vow.source + "+)+", "i");
// Function that takes two words and concatenates them
// Matches the words to the right pattern then concatenates
function concat(wordA, wordB) {
    var woot = basic.exec(wordA)[0];
    if (woot !== null && wordA !== null && wordB !== null) {
        var result = wordB.replace(basic, woot);
        return result;
    }
}
function manyWordConcat(words) {
    var word = words.shift();
    if (words && !words[0]) {
        // base case, if that is the last word then return it
        return word;
    }
    var woot = manyWord.exec(word)[0];
    return woot + manyWordConcat(words);
}
// If the word is matched exp from the beginning of the word
function match(word, exp) {
    var res = exp.exec(word)[0];
    return res === word.substring(0, res.length) &&
        res.length != 0;
}
var _ = {
    concat: concat,
    manyWordConcat: manyWordConcat
};
exports["default"] = _;
//# sourceMappingURL=concat.js.map