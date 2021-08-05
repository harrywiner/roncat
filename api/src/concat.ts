const con = new RegExp(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/);
const vow = new RegExp(/[a,e,i,o,u,y]/);

const basic = new RegExp(con.source + "*|" + vow.source, "i");

// Function that takes two words and concatenates them
// Matches the words to the right pattern then concatenates
function concat(wordA: string, wordB: string) {
  let [woot] = basic.exec(wordA);
  if (woot !== null && wordA !== null && wordB !== null) {
    let result = wordB.replace(basic, woot);
    return result;
  }
}

// If the word is matched exp from the beginning of the word
function match(word: string, exp: RegExp) {
  let res = exp.exec(word)[0]
  return res === word.substring(0, res.length) &&
    res.length != 0
}

const _ = {
  concat,
}
export default _;

