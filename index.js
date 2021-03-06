let states = ["whole", "frac", "mixed"]
let left = ""
let right = ""
let fstat = ""
let sstat = ""
let rnum = ""
let rdenom = ""
let lnum = ""
let ldenom = ""
let lfinal = 0
let lwhole = 0
let impr = 0
let rnum2 = 0
let rdeno2 = 0
let rwhole = 0
let rightstr = 0
let leftstr = 0
let indices = [];
let idx = 0
let farr = 0
let rfinal = 0
let oper = undefined
let allvars = [left,right,fstat,sstat,rnum,rdenom,lnum,ldenom,lfinal,lwhole,impr,rnum2,rdeno2,rwhole,rightstr,leftstr,idx,farr,rfinal,oper]
const solve = (ans) => {
    //operator logic
    allvars.forEach((a)=>{
      a = 0
    })
    indices = []
    if (ans.includes("+")) {
        oper = "+"
        idx = ans.indexOf(oper)
    } else if (ans.includes(" - ") && ans.indexOf(" - ") >= 1) {
        oper = "-"
        idx = ans.indexOf(oper)
    } else if (ans.includes("*")) {
        oper = "*"
        idx = ans.indexOf(oper)
    } else if (ans.includes(" / ")) {
        oper = "/"
        idx = ans.indexOf(" / ")
    }
    if (!(ans.includes(oper))) {
        return "no operator"
    }
    left = ans.substring(0, idx)
    right = ans.substring(idx + 1, ans.length)
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
    if ((oper == "/" && fstat == "whole") && (sstat == "frac" || "mixed")) {
        for (let i = 0; i < ans.length; i++) {
            if (ans.substring(i, i + 3) === " / ") indices.push(i);
        }

        idx = indices[0] + 1
    } else if ((oper == "/") && (fstat == "mixed" || "frac") && (sstat == "whole")) {
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] === " / ") indices.push(i);
        }
        idx = indices[1]
    } else if (oper == "/" && fstat == "mixed" && sstat == "mixed") {
        for (let i = 0; i < ans.length; i++) {
            if (ans.substring(i, i + 3) === " / ") indices.push(i);
        }
        idx = indices[0] + 1
    } else if (oper == "/" && fstat == "mixed" && sstat == "whole") {
        for (let i = 0; i < ans.length; i++) {
            if (ans.substring(i, i + 3) === " / ") indices.push(i);
        }
        idx = indices[0] + 1
    }else if (oper == "/") {
        idx = ans.indexOf(" / ") + 1
    }
    left = ans.substring(0, idx)
    right = ans.substring(idx + 1, ans.length)
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
                return (final + final2).toString()
                break;
            case "-":
                return (final - final2).toString()
                break;
            case "*":
                return (final * final2).toString()
                break;
            case "/":
                return fractomixed(final,final2)
                break;
        }
    }
    if (fstat == "whole" && sstat == "frac") {
        leftstr = left.replace(" ", "")
        rightstr = right.replace(" ", "")
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
                return fractomixed((lnum * rdenom) - (ldenom * rnum), (ldenom * rdenom))

            case "*":
                lnum = Number.parseInt(leftstr)
                ldenom = 1
                rfinal = reduce(rnum, rdenom)
                farr = rfinal.split(", ")
                rnum = Number.parseInt(farr[0])
                rdenom = Number.parseInt(farr[1])
                if (rdenom == 1) {
                    return lnum * rnum
                }
                return fractomixed(lnum * rnum, ldenom * rdenom)
            case "/":
                lnum = Number.parseInt(leftstr)
                ldenom = 1
                rfinal = reduce(rnum, rdenom)
                farr = rfinal.split(", ")
                rnum = Number.parseInt(farr[0])
                rdenom = Number.parseInt(farr[1])
                if (rdenom == 1) {
                    return lnum / rnum
                }
                return fractomixed(lnum * rdenom, ldenom * rnum)
        }
    }
    if (fstat == "whole" && sstat == "mixed") {
        leftstr = left.replace(" ", "")
        rightstr = right.replace(" ", "")
        lnum = Number.parseInt(leftstr)
        ldenom = 1
        rwhole = Number.parseInt(rightstr.substring(0, rightstr.indexOf("_")))
        rnum = Number.parseInt(rightstr.substring(rightstr.indexOf("_") + 1, rightstr.indexOf("/")))
        rdenom = Number.parseInt(rightstr.substring(rightstr.indexOf("/") + 1, rightstr.length))
        switch (oper) {
            case "+":
                rnum2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(0, mixedtofrac(rwhole, rnum, rdenom).indexOf("/")))
                rdeno2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(mixedtofrac(rwhole, rnum, rdenom).indexOf("/") + 1, mixedtofrac(rwhole, rnum, rdenom).length))
                return (fractomixed((lnum * rdeno2) + (ldenom * rnum2), ldenom * rdeno2))

            case "-":
                rnum2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(0, mixedtofrac(rwhole, rnum, rdenom).indexOf("/")))
                rdeno2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(mixedtofrac(rwhole, rnum, rdenom).indexOf("/") + 1, mixedtofrac(rwhole, rnum, rdenom).length))
                return (fractomixed((lnum * rdeno2) - (ldenom * rnum2), ldenom * rdeno2))

            case "*":
                rnum2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(0, mixedtofrac(rwhole, rnum, rdenom).indexOf("/")))
                rdeno2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(mixedtofrac(rwhole, rnum, rdenom).indexOf("/") + 1, mixedtofrac(rwhole, rnum, rdenom).length))
                return (fractomixed((lnum * rnum2), ldenom * rdeno2))

            case "/":
                rnum2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(0, mixedtofrac(rwhole, rnum, rdenom).indexOf("/")))
                rdeno2 = Number.parseInt(mixedtofrac(rwhole, rnum, rdenom).substring(mixedtofrac(rwhole, rnum, rdenom).indexOf("/") + 1, mixedtofrac(rwhole, rnum, rdenom).length))
                return (fractomixed((lnum * rdeno2), ldenom * rnum2))
        }
    }
    if (fstat == "frac" && sstat == "whole") {
        leftstr = left.replace(" ", "")
        rightstr = right.replace(" ", "")
        lnum = Number.parseInt(leftstr.substring(0, leftstr.indexOf("/")))
        ldenom = Number.parseInt(leftstr.substring(leftstr.indexOf("/") + 1, leftstr.length))
        switch (oper) {
            case "+":
                rnum = Number.parseInt(rightstr)
                rdenom = 1
                lfinal = reduce(lnum, ldenom)
                farr = lfinal.split(", ")
                lnum = Number.parseInt(farr[0])
                ldenom = Number.parseInt(farr[1])
                if (ldenom == 1) {
                    return rnum + lnum
                }
                return rnum + " " + lnum + "/" + ldenom

            case "-":
                rnum = Number.parseInt(rightstr)
                rdenom = 1
                lfinal = reduce(lnum, ldenom)
                farr = lfinal.split(", ")
                lnum = Number.parseInt(farr[0])
                ldenom = Number.parseInt(farr[1])
                if (ldenom == 1) {
                    return lnum - rnum
                }
                return fractomixed((lnum * rdenom) - (ldenom * rnum), (ldenom * rdenom))

            case "*":
                rnum = Number.parseInt(rightstr)
                rdenom = 1
                lfinal = reduce(lnum, ldenom)
                farr = lfinal.split(", ")
                lnum = Number.parseInt(farr[0])
                ldenom = Number.parseInt(farr[1])
                if (ldenom == 1) {
                    return rnum * lnum
                }
                return fractomixed(rnum * lnum, rdenom * ldenom)

            case "/":
                rnum = Number.parseInt(rightstr)
                rdenom = 1
                lfinal = reduce(lnum, ldenom)
                farr = lfinal.split(", ")
                lnum = Number.parseInt(farr[0])
                ldenom = Number.parseInt(farr[1])
                if (ldenom == 1) {
                    return rnum + "/" + lnum
                }
                return fractomixed(rdenom * lnum, rnum * ldenom)
        }
    }
    if (fstat == "frac" && sstat == "mixed") {
        lnum = Number.parseInt(left.substring(0, left.indexOf("/")))
        ldenom = Number.parseInt(left.substring(left.indexOf("/") + 1, left.length))
        rwhole = Number.parseInt(right.substring(0, right.indexOf("_")))
        rnum = Number.parseInt(right.substring(right.indexOf("_") + 1, right.indexOf("/")))
        rdenom = right.substring(right.indexOf("/") + 1, right.length)
        switch (oper) {
            case "+":
                impr = mixedtofrac(rwhole, rnum, rdenom).split("/")
                rnum = Number.parseInt(impr[0])
                rdenom = Number.parseInt(impr[1])
                return fractomixed((lnum * rdenom) + (rnum * ldenom), ldenom * rdenom)

            case "-":
                impr = mixedtofrac(rwhole, rnum, rdenom).split("/")
                rnum = Number.parseInt(impr[0])
                rdenom = Number.parseInt(impr[1])
                return fractomixed((lnum * rdenom) - (rnum * ldenom), ldenom * rdenom)
                //todo//
            case "*":
                impr = mixedtofrac(rwhole, rnum, rdenom).split("/")
                rnum = Number.parseInt(impr[0])
                rdenom = Number.parseInt(impr[1])
                return fractomixed((lnum * rnum), ldenom * rdenom)

            case "/":
                impr = mixedtofrac(rwhole, rnum, rdenom).split("/")
                rnum = Number.parseInt(impr[0])
                rdenom = Number.parseInt(impr[1])
                return fractomixed(lnum * rdenom, ldenom * rnum)
        } //end todo//
    }
    if (fstat == "frac" && sstat == "frac") {
        lnum = Number.parseInt(left.substring(0, left.indexOf("/")))
        ldenom = Number.parseInt(left.substring(left.indexOf("/") + 1, left.length))
        rnum = Number.parseInt(right.substring(0, right.indexOf("/")))
        rdenom = Number.parseInt(right.substring(right.indexOf("/") + 1, right.length))
        switch (oper) {
            case "+":
                return fractomixed((lnum * rdenom) + (ldenom * rnum), ldenom * rdenom)

            case "-":
                return fractomixed((lnum * rdenom) - (ldenom * rnum), ldenom * rdenom)

            case "*":
                return fractomixed(lnum * rnum, ldenom * rdenom)

            case "/":
                return fractomixed(lnum * rdenom, ldenom * rnum)
        }
    }
    if (fstat == "mixed" && sstat == "mixed") {
        lwhole = Number.parseInt(left.substring(0, left.indexOf("_")))
        lnum = Number.parseInt(left.substring(left.indexOf("_") + 1, left.indexOf("/")))
        ldenom = Number.parseInt(left.substring(left.indexOf("/") + 1, left.length))
        rwhole = Number.parseInt(right.substring(0, right.indexOf("_")))
        rwhole = Number.parseInt(right.substring(0, right.indexOf("_")))
        rnum = Number.parseInt(right.substring(right.indexOf("_") + 1, right.indexOf("/")))
        rdenom = Number.parseInt(right.substring(right.indexOf("/") + 1, right.length))
        let reducedl = mixedtofrac(lwhole, lnum, ldenom).split("/")
        let reducedr = mixedtofrac(rwhole, rnum, rdenom).split("/")
        lnum = reducedl[0]
        ldenom = reducedl[1]
        rnum = reducedr[0]
        rdenom = reducedr[1]
        switch (oper) {
            case "+":
                return fractomixed((lnum * rdenom) + (ldenom * rnum), ldenom * rdenom)

            case "-":
                return fractomixed((lnum * rdenom) - (ldenom * rnum), ldenom * rdenom)

            case "*":
                return fractomixed(lnum * rnum, ldenom * rdenom)

            case "/":
                return fractomixed(lnum * rdenom, ldenom * rnum)
        }
    }
    if (fstat == "mixed" && sstat == "whole") {
        lwhole = Number.parseInt(left.substring(0, left.indexOf("_")))
        lnum = Number.parseInt(left.substring(left.indexOf("_") + 1, left.indexOf("/")))
        ldenom = Number.parseInt(left.substring(left.indexOf("/") + 1, left.length))
        rnum = Number.parseInt(right.substring(0, right.length))
        rdenom = 1
        impr = mixedtofrac(lwhole, lnum, ldenom).split("/")
        lnum = Number.parseInt(impr[0])
        ldenom = Number.parseInt(impr[1])
        switch (oper) {
            case "+":
                return fractomixed((lnum * rdenom) + (ldenom * rnum), ldenom * rdenom)

            case "-":
                return fractomixed((lnum * rdenom) - (ldenom * rnum), ldenom * rdenom)

            case "*":
                return fractomixed(lnum * rnum, ldenom * rdenom)

            case "/":
                return fractomixed(lnum * rdenom, ldenom * rnum)
        }
    }
    if (fstat == "mixed" && sstat == "frac") {
        lwhole = Number.parseInt(left.substring(0, left.indexOf("_")))
        lnum = Number.parseInt(left.substring(left.indexOf("_") + 1, left.indexOf("/")))
        ldenom = Number.parseInt(left.substring(left.indexOf("/") + 1, left.length))
        rnum = Number.parseInt(right.substring(0, right.indexOf("/")))
        rdenom = Number.parseInt(right.substring(right.indexOf("/") + 1, right.length))
        impr = mixedtofrac(lwhole, lnum, ldenom).split("/")
        lnum = Number.parseInt(impr[0])
        ldenom = Number.parseInt(impr[1])
        switch (oper) {
            case "+":
                return fractomixed((lnum * rdenom) + (ldenom * rnum), ldenom * rdenom)

            case "-":
                return fractomixed((lnum * rdenom) - (ldenom * rnum), ldenom * rdenom)

            case "*":
                return fractomixed(lnum * rnum, ldenom * rdenom)

            case "/":
                return fractomixed(lnum * rdenom, ldenom * rnum)
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
const mixedtofrac = (whole, num, denom) => {
    let impr = whole * denom + num
    return `${impr}/${denom}`
}
const fractomixed = (numer, denom) => {
    let numer2 = numer.toString()
    let deno2 = numer.toString()
    if (numer2.includes("-")) {
        if (deno2.indexOf("-") >= 0 || numer2.indexOf("-") >= 0) {
            numer2 = numer2.replace("-", "")
            numer = Number.parseInt(numer2)
            let times = Math.floor(numer / denom)
            let remainder = numer % denom
            if (remainder == 0) {
                return times.toString()
            }
            if (times == 0 || times < 0) {
                let red = reduce(remainder, denom).split(", ")
                let redn = red[0]
                let redd = red[1]
                return `-${redn.replace("-","")}/${redd.replace("-","")}`
            }
            let redu = reduce(remainder, denom).split(", ")
            let redun = redu[0]
            let redud = redu[1]
            return `-${times} ${redun.replace("-","")}/${redud.replace("-","")}`
        }

    }
    let times = Math.floor(numer / denom)
    let remainder = numer % denom
    if (remainder == 0) {
        return times.toString()
    }
    if (times < 1) {
        let red = reduce(remainder, denom).split(", ")
        let redn = red[0]
        let redd = red[1]
        return `${redn}/${redd}`.replace("-", "")
    }
    let red = reduce(remainder, denom).split(", ")
    let redn = red[0]
    let redd = red[1]
    return `${times} ${redn}/${redd}`
}
const test = () =>{

console.log(solve("1 - 1")) 
console.log(solve("1 + 1")) 
console.log(solve("1 * 1")) 
console.log(solve("1 / 1")) 
console.log(solve("1/2 - 1" )) 
console.log(solve("1/2 + 1" )) 
console.log(solve("1/2 * 1" )) 
console.log(solve("1/2 / 1" )) 
console.log(solve("1_2/3 + 1" ))
console.log(solve("1_2/3 - 1" ))
console.log(solve("1_2/3 * 1" ))
console.log(solve("1_2/3 / 1" ))
console.log(solve("1 + 1/2" ))
console.log(solve("1 - 1/2" ))
console.log(solve("1 * 1/2" ))
console.log(solve("1 / 1/2")) 
console.log(solve("1/2 + 1/2")) 
console.log(solve("1/2 - 1/2")) 
console.log(solve("1/2 * 1/2" ))
console.log(solve("1/2 / 1/2")) 
console.log(solve("1_2/3 + 1/3"))
console.log(solve("1_2/3 - 1/3" ))
console.log(solve("1_2/3 * 1/3" ))
console.log(solve("1_2/3 / 1/3"))
console.log(solve("1 + 1_2/3" ))
console.log(solve("1 - 1_2/3" ))
console.log(solve("1 * 1_2/3" ))
console.log(solve("1 / 1_2/3"))
console.log(solve("1/2 + 1_2/3" )) 
console.log(solve("1/2 - 1_2/3" ))
console.log(solve("1/2 * 1_2/3" ))
console.log(solve("1/2 / 1_2/3" ))
console.log(solve("2_4/5 + 1_2/3" ))
console.log(solve("2_4/5 - 1_2/3" ))
console.log(solve("2_4/5 * 1_2/3" ))
console.log(solve("2_4/5 / 1_2/3" ))
}
