self.onmessage = function (e) {
    primeArry = max => {
        const notPrime = new Uint8Array(max);
        const primes = [];
        notPrime[0] = notPrime[1] = 1;
        for (let i = 2; i < max; i++) {
            if (notPrime[i] === 0) {
                primes.push(i);
                for (let j = 2 * i; j < max; j += i) {
                    notPrime[j] = 1;
                }
            }
        }
        return { primes, notPrime }
    }
    if (e.data.type === "sumOfPrimes") {
        const max = primeArry(Number(e.data.value));
        const sumvalue = max.primes.reduce((a, b) => a + b);
        self.postMessage({ value: sumvalue, type: e.data.type })
    } else if (e.data.type === "sumOfConsecutives") {
        const max = primeArry(Number(e.data.value));
        let maxSum = 0;
        let maxRun = -1;
        for (let i = 0; i < max.primes.length; i++) {

            let sum = 0;
            for (let j = i; j < max.primes.length; j++) {
                sum += max.primes[j];
                if (sum > e.data.value)
                    break;
                if (!max.notPrime[sum] && sum > maxSum && j - i > maxRun) {
                    maxRun = j - i;
                    maxSum = sum;
                }
            }
        }

        self.postMessage({ value: maxSum, type: e.data.type })
    } else if (e.data.type === "parenthesis") {
        const str = e.data.value;
        if (str.length <= 1)
            self.postMessage({ value: false, type: e.data.type })

        let matchingOpeningBracket, ch
        let stack = []

        let openingBrackets = ['[', '{', '(']
        let closingBrackets = [']', '}', ')']

        for (let i = 0; i < str.length; i++) {
            ch = str[i]

            if (closingBrackets.indexOf(ch) > -1) {
                matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(ch)]
                if (stack.length == 0 || (stack.pop() != matchingOpeningBracket)) {
                    self.postMessage({ value: false, type: e.data.type })
                }
            } else {
                stack.push(ch)
            }
        }
        self.postMessage({ value: (stack.length == 0), type: e.data.type })

    } else if (e.data.type === "reverseString") {
        const str = e.data.value;
        self.postMessage({ value: str.split('').reverse().join(''), type: e.data.type })
    } else if (e.data.type === "perfectSquares") {
        const str = e.data.value[0];
        let result = [];
        for (let i = e.data.value[0]; i <= e.data.value[1]; i++) {
            if (i === 0) {
                result.push(i)
            }
            else if (i % Math.sqrt(i) === 0) {
                result.push(i)
            }
        }
        self.postMessage({ value: result.toString(), type: e.data.type })
    } else if (e.data.type === "camelCase") {
        const text = e.data.value;

        if (text === null || text === undefined) {
            self.postMessage({ value: text, type: e.data.type })
        }
        var result = "";
        var upper = 0;
        var numeric = undefined;
        var string = String(text);
        for (var i = 0; i < string.length; i++) {
            var ch = string[i];
            var chLower = ch.toLowerCase();
            if (ch !== chLower) {
                var prev = result[result.length - 1];
                if (upper > 1 && result.length > 1) {
                    result = result.slice(0, result.length - 2) + prev;
                }
                if (result.length && prev !== "-" &&
                    prev !== " " && prev !== "\t" && prev !== "\r" && prev !== "\n"
                ) {
                    result += "-";
                }
                result += chLower;
                upper++;
                numeric = false;
            } else if (
                ch === "0" || ch === "1" || ch === "2" || ch === "3" ||
                ch === "4" || ch === "5" || ch === "6" || ch === "7" ||
                ch === "8" || ch === "9"
            ) {
                if (numeric === false && result[result.length - 1] !== "-") {
                    result += "-";
                }
                result += ch;
                upper = 0;
                numeric = true;
            } else if (numeric && result[result.length - 1] !== "-") {
                result += "-" + ch;
                upper = 0;
                numeric = false;
            } else {
                result += ch;
                upper = 0;
                numeric = false;
            }
        }
        if (upper > 1 && result.length > 1) {
            result = result.slice(0, result.length - 2) + result[result.length - 1];
        }
        self.postMessage({ value: result, type: e.data.type })
    }else if(e.data.type ==="currencyFormat"){
        let x = e.data.value;
        let result = x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
        self.postMessage({ value: result, type: e.data.type })
    }
};
