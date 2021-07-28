let states = ["whole","frac","mixed"]
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question('Whats the problem?', ans => {
  console.log(solve(ans))
  readline.close();
});
const solve = (ans) =>{
  //operator logic
  let oper = ""
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
  return oper
}