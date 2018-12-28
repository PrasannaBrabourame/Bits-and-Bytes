self.onmessage = function (e) {
    checkPrime = num => {
        var prime = 1;
        for (let b = 2; b < num; b++) {
            if (num % b == 0) {
                prime = 0;
                break;
            }
        }
        if (prime)
            return 1;
        else
            return 0;
    }
    primeArry = max => {
        const primeArry = new Array(max).fill(true)
        for (let i = 2; i < Math.sqrt(max); i++) {
            if (primeArry[i]) {
                for (let j = Math.pow(i, 2); j < max; j += i) {
                    primeArry[j] = false
                }
            }
        }
        return primeArry.reduce((primes, isPrime, i) => {
            if (isPrime && i > 1) {
                primes.push(i)
            }

            return primes
        }, [])
    }
    if (e.data.type === "sumOfPrimes") {
        const max = primeArry(Number(e.data.value));
        const sumvalue = max.reduce((a, b) => a + b);
        self.postMessage({ value: sumvalue, type: e.data.type })
    } else if (e.data.type === "sumOfConsecutives") {
        var i = 2;
        var sum = 2;
        var max_sum = 0;
        while (sum < Number(e.data.value)) {
            if (checkPrime(i))
                sum += i;
            if (checkPrime(sum)) {
                if (sum > max_sum)
                    max_sum = sum - 2;
            }
            i++;
        }
        self.postMessage({ value: max_sum, type: e.data.type })
    }
};