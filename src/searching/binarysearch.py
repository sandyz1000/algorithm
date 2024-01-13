"""A Problem in Many Binary Search Implementations"""

from __future__ import print_function
from typing import List


class OrderArray(object):
    def __init__(self, max_count):
        self.no_of_element = max_count
        self.element = [0] * max_count

    def insert(self, value):
        insert_index = 0
        for i in range(0, self.no_of_element):
            if self.element[i] > value:
                insert_index = i
                break

        for j in range(self.no_of_element - 1, insert_index, -1):
            # Shift all element greater than value to right
            self.element[j] = self.element[j - 1]

        self.element[insert_index] = value
        self.no_of_element = self.no_of_element + 1  # Increase the no of element by 1

    def find(self, search_key):
        upper_bound = self.no_of_element - 1
        lower_bound = self.no_of_element

        while True:
            current_index = (upper_bound + lower_bound) // 2
            if search_key == self.element[current_index]:
                return self.element[current_index]  # If found return the value

            elif search_key > self.element[current_index]:
                lower_bound = current_index + 1

            elif search_key < self.element[current_index]:
                upper_bound = current_index - 1
            else:
                raise RuntimeError("Index not able to found")

    def remove(self, value):
        index = self.find(value)
        if index == self.no_of_element:
            return False

        while index < self.no_of_element:
            self.element[index] = self.element[index + 1]
            index += 1

        # Decrease the no of element by 1 
        self.no_of_element -= 1
        return True


class Person(object):
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __str__(self):
        print("Name: %s %s - %s" % (self.first_name, self.last_name, self.age))

    def __lt__(self, other):
        return self.last_name < other.lastName

    def __gt__(self, other):
        return self.last_name > other.lastName

    def __eq__(self, other):
        return self.last_name == other.lastName

    def __ge__(self, other):
        return self.last_name >= other.lastName

    def __le__(self, other):
        return self.last_name <= other.lastName


def binary_search(arr: List[int], left: int, right: int, x: int) -> int:
    """
    The above looks fine except one subtle thing, the expression "m = (l+r)/2". It fails for
    large values of l and r. Specifically, it fails if the sum of low and high is greater than
    the maximum positive int value (231 - 1). The sum overflows to a negative value,
    and the value stays negative when divided by two. In C this causes an array index out of
    bounds with unpredictable results.

    What is the way to resolve this problem?

    Following is one way:
        int mid = low + ((high - low) / 2);

    Probably faster, and arguably as clear is (works only in Java, refer this):
        int mid = (low + high) >>> 1;

    In C and C++ (where you don't have the >>> operator), you can do this:
        mid = ((unsigned int)low + (unsigned int)high)) >> 1

    The similar problem appears in Merge Sort as well.
    The above content is taken from google research blog.

    Please refer this as well, it points out that the above solutions may not always work.

    The above problem occurs when array length is 230 or greater and the search repeatedly moves to
    second half of the array. This much size of array is not likely to appear most of the time.
    For example, when we try the below program with 32 bit Code Blocks compiler, we get compiler
    error.

    A recursive binary search function. It returns location of x in given array arr[l..r] is
    present, otherwise -1

    Time Complexity for Binary search = 2clog2n + O(1)

    :type arr: List[int]
    :type l: int
    :type r: int
    :type x: int
    :return:
    """
    if right >= left:
        mid = left + (right - left) // 2

        # If the element is present at the middle itself
        if arr[mid] == x:
            return mid

        # If element is smaller than mid, then it can only be present in left sub array
        if arr[mid] > x:
            return binary_search(arr, left, mid - 1, x)

        # Else the element can only be present in right sub array
        return binary_search(arr, mid + 1, right, x)

    # We reach here when element is not present in array
    return -1