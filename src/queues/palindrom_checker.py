from collections import deque


class PalindromeChecker(object):
    """Function to check if string is Palindrome or Not"""

    def is_palindrome(self, mystring):
        n = len(mystring)
        for i in range(n // 2):
            if mystring[i] != mystring[n - 1 - i]:
                return False
        return True


class PalindromeCheckerQueue(object):
    """
    Using Double ended queue
    Python program to check if the given string is palindrome or not"""

    def is_palindrome(self, a_string):
        is_valid = True
        q = deque()

        for ch in a_string:
            q.append(ch)

        while is_valid and len(q) > 1:
            front = q.popleft()
            end = q.pop()

            # Check if the first and last element is same
            if front != end:
                is_valid = False

        return is_valid


if __name__ == '__main__':
    m_string = "geeks"
    test = PalindromeChecker()
    print("%s is palindrome" % m_string if test.is_palindrome(m_string)
          else "%s not palindrome" % m_string)

    m_string = "ababa"
    test = PalindromeCheckerQueue()
    print("%s is palindrome" % m_string if test.is_palindrome(m_string)
          else "%s not palindrome" % m_string)
