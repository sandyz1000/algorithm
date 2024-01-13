/* """
Sieve of Eratosthenes
Given a number n, print all primes smaller than or equal to n. It is also given that n is a small
number.

For example, if n is 10, the output should be "2, 3, 5, 7". If n is 20, the output should be
"2, 3, 5, 7, 11, 13, 17, 19".

The sieve of Eratosthenes is one of the most efficient ways to find all primes smaller than n
when n is smaller than 10 million or so

Following is the algorithm to find all the prime numbers less than or equal to a given integer n
by Eratosthenes’ method:

1.  Create a list of consecutive integers from 2 to n: (2, 3, 4, …, n).
2.  Initially, let p equal 2, the first prime number.
3.  Starting from p, count up in increments of p and mark each of these numbers greater than p
    itself in the list. These numbers will be 2p, 3p, 4p, etc.; note that some of them may have
    already been marked.
4.  Find the first number greater than p in the list that is not marked. If there was no such
    number, stop. Otherwise, let p now equal this number (which is the next prime), and repeat from
    step 3.

When the algorithm terminates, all the numbers in the list that are not marked are prime.

# Create a boolean array "prime[0..n]" and initialize
#  all entries it as true. A value in prime[i] will
# finally be false if i is Not a prime, else true.
 */

function sieveOfEratosthenes(n: number): void {
    const prime: boolean[] = Array(n + 1).fill(true);
    let p = 2;

    while (p * p <= n) {
        // If prime[p] is not changed, then it is a prime
        if (prime[p]) {
            // Update all multiples of p
            for (let i = p * 2; i <= n; i += p) {
                prime[i] = false;
            }
        }
        p++;
    }

    // Print all prime numbers
    console.log("Following are the prime numbers smaller than or equal to", n);
    for (let p = 2; p < n; p++) {
        if (prime[p]) {
            console.log(p);
        }
    }
}

if (require.main === module) {
    // Driver program
    const limit = 30;
    sieveOfEratosthenes(limit);
}
