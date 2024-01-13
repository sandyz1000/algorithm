"""
Recursive function to do substring search

Given a text txt[] and a pattern pat[], write a recursive function
"contains(char pat[], char txt[])" that returns true if pat[] is present in txt[], otherwise false.

---------------------------------------------------
Examples:
---------------------------------------------------

1) Input:   txt[] =  "THIS IS A TEST TEXT"
            pat[] = "TEST"
  Output:  true


2) Input:  txt[] =  "geeksforgeeks"
           pat[] = "quiz"
  Output:  false;

---------------------------------------------------
Algorithm:
---------------------------------------------------
contains(tex[], pat[])
1) If current character is last character of text, but pat has more characters, -> return false.
2) Else If current character is last character of pattern, then -> return true
3) Else If current characters of pat and text match, then -> return contains(text + 1, pat + 1)
4) Else If current characters of pat and text don't match -> return contains(text + 1, pat)
"""


# Recursive Python program to find if a given pattern is present in a text

def exactMatch(text, pat):
    if text == "" and pat != "":
        return False

    # Else If last character of pattern reaches
    if pat == "":
        return True
    if text[0] == pat[0]:
        return exactMatch(text[1:], pat[1:])

    return False


def contains(text, pat):
    """This function returns true if 'text' contain 'pat'"""
    # If last character of text reaches
    if text == "":
        return False

    # If current characters of pat and text match
    if text[0] == pat[0]:
        return exactMatch(text, pat)

    # If current characters of pat and tex don't match
    return contains(text[1:], pat)


if __name__ == '__main__':
    # Output: 1, 0, 1
    print(contains("geeksforgeeks", "geeks"))
    print(contains("geeksforgeeks", "geeksquiz"))
    print(contains("geeksquizgeeks", "quiz"))
