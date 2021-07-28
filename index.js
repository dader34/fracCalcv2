let states = ["whole","frac","mixed"]
let left = ""
let right = ""
let fstat = ""
let sstat = ""
let oper = undefined
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const ask = () =>{
  readline.question('Whats the problem?', ans => {
    console.log(solve(ans))
    readline.close();
  });
}
const solve = (ans) =>{
  //operator logic
  
  if(ans.includes("+")){
    oper = "+" 
  }
  if(ans.includes("-")){
    oper = "-"
  }
  if(ans.includes("/")){
    oper = "/"
  }
  if(ans.includes("*")){
    oper = "*"
  }
  if(!(ans.includes(oper))){
    return "no operator"
  }
  left = ans.substring(0,ans.indexOf(oper))
  right = ans.substring(ans.indexOf(oper)+1,ans.length)
  //test for whole, frac, mixed
  if(left.includes("_" && "/")){
    fstat = states[2]
  }else if(left.includes("/") && !(left.includes("_"))){
    fstat = states[1]
  }else if(!(left.includes("_") && "/")){
    fstat = states[0]
  }
  //tests for right
    if(right.includes("_" && "/")){
    sstat = states[2]
  }else if(right.includes("/") && !(right.includes("_"))){
    sstat = states[1]
  }else if(!(right.includes("_") && "/")){
    sstat = states[0]
  }
  //cases for every combo of mixed and whole and frac
  if(fstat == "whole" && sstat == "whole"){
    let final = Number.parseInt(left.replace(" ",""))
    let final2 = Number.parseInt(right.replace(" ",""))
    switch(oper){
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
  
}