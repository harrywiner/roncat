const con = new RegExp(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/);
const vow = new RegExp(/[a,e,i,o,u,y]/);

const basic = new RegExp(con.source + "*|" + vow.source, "i");

const manyWord = new RegExp(`(${con.source}*${vow.source}+)+`, `i`)

// Function that takes two words and concatenates them
// Matches the words to the right pattern then concatenates
function concat(wordA: string, wordB: string) {
  let [woot] = basic.exec(wordA);
  if (woot !== null && wordA !== null && wordB !== null) {
    let result = wordB.replace(basic, woot);
    return result;
  }
}

function manyWordConcat(words: [string]) {
  let word = words.shift()
  if (words && !words[0]) {
    // base case, if that is the last word then return it
    return word
  }
  let woots = manyWord.exec(word)
  if (!woots) {
    return word + manyWordConcat(words)
  }
  return woots[0] + manyWordConcat(words)
}

// If the word is matched exp from the beginning of the word
// function match(word: string, exp: RegExp) {
//   let res = exp.exec(word)[0]
//   return res === word.substring(0, res.length) &&
//     res.length !== 0
// }

const _ = {
  concat,
  manyWordConcat
}
export default _;

