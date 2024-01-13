"""
Find the Missing Number

You are given a list of n-1 integers and these integers are in the range of 1 to n. There are no
duplicates in list. One of the integers is missing in the list. Write an efficient code to find the
missing integer.

----------------------------
Example:
----------------------------
I/P    [1, 2, 4, ,6, 3, 7, 8]
O/P    5

"""
import typing


def get_missing_no_method1(A: typing.List[int]):
    """
    METHOD 1(Use sum formula)

    Algorithm:
    1. Get the sum of numbers  total = n*(n+1)/2
    2  Subtract all the numbers from sum and you will get the missing number.

    Time Complexity: O(n)

    There can be overflow if n is large. In order to avoid Integer Overflow, we can pick one number
    from known numbers and subtract one number from given numbers. This way we wont have Integer
    Overflow ever.
    """
    n = len(A)
    total = (n + 1) * (n + 2) // 2
    sum_of_A = sum(A)
    return total - sum_of_A


def get_missing_no_method2(arr: typing.List[int]):
    """
    METHOD 2(Use XOR)

    1) XOR all the array elements, let the result of XOR be X1.
    2) XOR all numbers from 1 to n, let XOR be X2.
    3) XOR of X1 and X2 gives the missing number.
    Time Complexity: O(n)

    getMissingNo takes list as argument
    """
    n = len(arr)
    x1 = arr[0]  # For xor of all the elements in array
    x2 = 1  # For xor of all the elements from 1 to n+1
    for i in range(n):
        x1 ^= arr[i]
    for i in range(n + 2):
        x2 ^= i
    return x1 ^ x2


if __name__ == '__main__':
    A = [1, 2, 4, 5, 6]
    print("Method-1", get_missing_no_method1(A))
    print("Method-2", get_missing_no_method2(A))