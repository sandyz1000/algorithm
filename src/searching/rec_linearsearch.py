"""
Recursive program to linearly search an element in a given array

Given an unsorted array and an element x, search x in given array. Write recursive C code for this.
If element is not present, return -1.

The idea is to compare x with first element in arr[]. If element is found at first position,
return it. Else recur for remaining array and x.

"""


# Recursive function to search x in arr[l..r]
def rec_search(arr, l, r, x):
    if r < l:
        return -1
    if arr[l] == x:
        return l
    return rec_search(arr, l + 1, r, x)


if __name__ == '__main__':
    # Output: Element 3 is present at index 4
    arr = [12, 34, 54, 2, 3]
    n = len(arr)
    x = 3
    index = rec_search(arr, 0, n - 1, x)
    if index != -1:
        print("Element", x, "is present at index %d" % index)
    else:
        print("Element %d is not present" % x)