
# Python program implementation of recursion binary search


class RecurseBinarySearch:
    def __init__(self, max_size):
        self.__v = [0] * max_size
        self.no_of_element = 0

    def insert(self, key):
        index = 0
        while self.__v[index] > key:
            index += 1

        # Shift all element to one position right
        for i in range(self.no_of_element - 1, index, -1):
            self.__v[i] = self.__v[i - 1]

        self.__v[index] = key
        self.no_of_element += 1

    def display(self):
        for i in range(0, self.no_of_element):
            print(self.__v[i])

    def find(self, key):
        return self.recurse_find(key, 0, self.no_of_element - 1)

    def recurse_find(self, key, lowerbound, upperbound):
        mid = (upperbound + lowerbound) // 2
        if self.__v[mid] == key:
            return mid

        if key > self.__v[mid]:
            return self.recurse_find(key, mid + 1, upperbound)

        if key < self.__v[mid]:
            return self.recurse_find(key, lowerbound, mid - 1)


if __name__ == "__main__":
    binary_search = RecurseBinarySearch()
    binary_search.insert(27)
    binary_search.insert(30)
    binary_search.insert(90)
    binary_search.insert(13)
    binary_search.insert(10)
    binary_search.insert(5)
    binary_search.insert(50)
    binary_search.insert(63)
    binary_search.insert(77)

    print(binary_search.find(27))
