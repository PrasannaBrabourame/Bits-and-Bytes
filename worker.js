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
        return {primes,notPrime}
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
    }
};
