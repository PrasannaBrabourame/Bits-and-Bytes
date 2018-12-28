self.onmessage = function (e) {
    checkPrime = function (num) {
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
    sieve = max => {
        // Make array of length max and fill with true
        const sieve = new Array(max).fill(true)
      
        // Iterate from 2 until square root of max
        for (let i = 2; i < Math.sqrt(max); i++) {
          // If the number is labelled a prime then we can start at i^2 and mark every multiple of i
          // from there as NOT a prime
          if (sieve[i]) {
            for (let j = Math.pow(i, 2); j < max; j += i) {
              sieve[j] = false
            }
          }
        }
      
        // Now we can reduce our sieve to only the Prime indexes that are true
        return sieve.reduce((primes, isPrime, i) => {
          if (isPrime && i > 1) {
            primes.push(i)
          }
      
          return primes
        }, [])
      }
    if (e.data.type === "sumOfPrimes") {
            const max = sieve(Number(e.data.value));
            const sumvalue = max.reduce((a,b)=>a+b);
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