let states = ["whole", "frac", "mixed"]
let left = ""
let right = ""
let fstat = ""
let sstat = ""
let rnum = ""
let rdenom = ""
let lnum = ""
let ldenom = ""
let farr
let rfinal
let oper = undefined
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const ask = () => {
  readline.question('Whats the problem?\n', ans => {
    console.log(solve(ans))
    readline.close();
  });
}
ask()
const solve = (ans) => {
  //operator logic

  if (ans.includes("+")) {
    oper = "+"
  }
  else if (ans.includes("-")) {
    oper = "-"
  }
  else if (ans.includes("*")) {
    oper = "*"
  }
  else {
    oper = "/"
  }
  if (!(ans.includes(oper))) {
    return "no operator"
  }
  left = ans.substring(0, ans.indexOf(oper))
  right = ans.substring(ans.indexOf(oper) + 1, ans.length)
  //test for whole, frac, mixed
  if (left.includes("_") && "/") {
    fstat = states[2]
  } else if (left.includes("/") && !(left.includes("_"))) {
    fstat = states[1]
  } else if (!(left.includes("_") && "/")) {
    fstat = states[0]
  }
  //tests for right
  if (right.includes("_") && "/") {
    sstat = states[2]
  } else if (right.includes("/") && !(right.includes("_"))) {
    sstat = states[1]
  } else if (!(right.includes("_") && "/")) {
    sstat = states[0]
  }
  //cases for every combo of mixed and whole and frac
  if (fstat == "whole" && sstat == "whole") {
    let final = Number.parseInt(left.replace(" ", ""))
    let final2 = Number.parseInt(right.replace(" ", ""))
    switch (oper) {
      case "+":
        return final + final2
        break;
      case "-":
        return final - final2
        break;
      case "*":
        return final * final2
        break;
      case "/":
        return final / final2
        break;
    }
  }
  if (fstat == "whole" && sstat == "frac") {
    let leftstr = left.replace(" ", "")
    let rightstr = right.replace(" ", "")
    rnum = Number.parseInt(rightstr.substring(0, rightstr.indexOf("/")))
    rdenom = Number.parseInt(rightstr.substring(rightstr.indexOf("/") + 1, rightstr.length))
    switch (oper) {
      case "+":
        lnum = Number.parseInt(leftstr)
        ldenom = 1
        rfinal = reduce(rnum, rdenom)
        farr = rfinal.split(", ")
        rnum = Number.parseInt(farr[0])
        rdenom = Number.parseInt(farr[1])
        if (rdenom == 1) {
          return lnum + rnum
        }
        return lnum + " " + rnum + "/" + rdenom

      case "-":
        lnum = Number.parseInt(leftstr)
        ldenom = 1
        rfinal = reduce(rnum, rdenom)
        farr = rfinal.split(", ")
        rnum = Number.parseInt(farr[0])
        rdenom = Number.parseInt(farr[1])
        if (rdenom == 1) {
          return lnum - rnum
        }
        // return `${(lnum * rdenom) - (ldenom * rnum)}/${(ldenom * rdenom)}`
        return fractomixed((lnum * rdenom) - (ldenom * rnum),(ldenom * rdenom))
    } 
  }
}
const reduce = (x, y) => {
  let d;
  d = gcd(x, y);

  x = parseInt(x / d);
  y = parseInt(y / d);

  return `${x}, ${y}`
}

const gcd = (a, b) => {
  if (b == 0)
    return a;
  return gcd(b, a % b);

}

const fractomixed = (numer, denom) => {
  let numer2 = numer.toString()
  if(numer2.includes("-")){
    numer2 = numer2.replace("-","")
    numer = Number.parseInt(numer2)
    let times = Math.floor(numer/denom)
    let remainder = numer % denom
    return `-${times} ${remainder}/${denom}`
  }
  else{
    let times = Math.floor(numer/denom)
    let remainder = numer % denom
  }
  return `${times} ${remainder}/${denom}`
}