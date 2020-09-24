const con = new RegExp(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/);
const vow = new RegExp(/[a,e,i,o,u,y]/);

const basic = new RegExp(con.source + "*" + "|" + vow.source, "i");

function concat(wordA, wordB) {
  let [woot] = basic.exec(wordA);
  if (woot !== null && wordA != null && wordB != null) {
    let result = wordB.replace(basic, woot, `$2`);
    return result;
  }
}

export default concat;
