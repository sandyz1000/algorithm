"""
Searching for Patterns | Set 3 (Rabin-Karp Algorithm)
Given a text txt[0..n-1] and a pattern pat[0..m-1], write a function search(char pat[], char txt[])
that prints all occurrences of pat[] in txt[]. You may assume that n > m.

Examples:
- - - - - - - - - - - - - - - - - - - - - - - - - -

    Input:  txt[] = "THIS IS A TEST TEXT"
            pat[] = "TEST"
    Output: Pattern found at index 10

    Input:  txt[] =  "AABAACAADAABAABA"
            pat[] =  "AABA"
    Output: Pattern found at index 0
            Pattern found at index 9
            Pattern found at index 12
- - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------
Explanation:
------------------------------------------

The Naive String Matching algorithm slides the pattern one by one. After each slide, it one by
one checks characters at the current shift and if all characters match then prints the match.

Like the Naive Algorithm, Rabin-Karp algorithm also slides the pattern one by one. But unlike the
Naive algorithm, Rabin Karp algorithm matches the hash value of the pattern with the hash value
of current substring of text, and if the hash values match then only it starts matching
individual characters. So Rabin Karp algorithm needs to calculate hash values for following
strings.

1) Pattern itself.
2) All the substrings of text of length m.

Since we need to efficiently calculate hash values for all the substrings of size m of text,
we must have a hash function which has following property.

Hash at the next shift must be efficiently computable from the current hash value and next
character in text or we can say hash(txt[s+1 .. s+m]) must be efficiently computable from
hash(txt[s .. s+m-1]) and txt[s+m] i.e., hash(txt[s+1 .. s+m])= rehash(txt[s+m], hash(txt[s .. s+m-1])
and rehash must be O(1) operation.

-----(rolling hash)----
The hash function suggested by Rabin and Karp calculates an integer value. The integer value for
a string is numeric value of a string. For example, if all possible characters are from 1 to 10,
the numeric value of '122' will be 122. The number of possible characters is higher than 10
(256 in general) and pattern length can be large. So the numeric values cannot be practically stored
as an integer. Therefore, the numeric value is calculated using modular arithmetic to make sure
that the hash values can be stored in an integer variable (can fit in memory words). To do rehashing,
we need to take off the most significant digit and add the new least significant digit for in hash value.
Rehashing is done using the following formula. 

hash( txt[s+1 .. s+m] ) = d ( hash( txt[s .. s+m-1]) - txt[s]*h ) + txt[s + m] ) mod q

hash( txt[s .. s+m-1] ) : Hash value at shift s.
hash( txt[s+1 .. s+m] ) : Hash value at next shift (or shift s+1)
d: Number of characters in the alphabet
q: A prime number
h: d^(m-1)

"""
# Following program is the python implementation of Rabin Karp Algorithm

# d is the number of characters in input alphabet
d = 256


# pat  -> pattern
# txt  -> text
# q    -> A prime number

def search(pat, txt, q):
    M = len(pat)
    N = len(txt)
    j = 0
    p = 0  # hash value for pattern
    t = 0  # hash value for txt
    h = 1

    # The value of h would be "pow(d, M-1)%q"
    for i in range(M - 1):
        h = (h * d) % q

    # Calculate the hash value of pattern and first window of text
    for i in range(M):
        p = (d * p + ord(pat[i])) % q
        t = (d * t + ord(txt[i])) % q

    # Slide the pattern over text one by one
    for i in range(N - M + 1):
        # Check the hash values of current window of text and pattern if the hash values match
        # then only check for characters on by one
        if p == t:
            # Check for characters one by one
            for j in range(M):
                if txt[i + j] != pat[j]:
                    break

            j += 1
            # if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if j == M:
                print("Pattern found at index " + str(i))

        # Calculate hash value for next window of text: Remove leading digit, add trailing digit
        if i < N - M:
            t = (d * (t - ord(txt[i]) * h) + ord(txt[i + M])) % q
            # We might get negative values of t, converting it to positive
            if t < 0:
                t = t + q


if __name__ == '__main__':
    txt = "GEEKS FOR GEEKS"
    pat = "GEEK"
    q = 101  # A prime number
    search(pat, txt, q)