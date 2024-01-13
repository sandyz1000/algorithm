# Recursive merge sort

class MergeX:
    def __init__(self, max_size):
        self.collections = [0] * max_size
        self.max_size = max_size
        self.size = 0

    def insert(self, key):
        if self.is_full():
            return

        self.collections[self.size - 1] = key
        self.size += 1

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.max_size

    def sort(self):
        workSpace = [0] * self.max_size
        self.recMergeSort(workSpace, 0, self.size - 1)

    def recMergeSort(self, work_space, lower_bound, upper_bound):
        if lower_bound == upper_bound:
            return

        mid = (lower_bound + upper_bound) // 2
        self.recMergeSort(work_space, lower_bound, mid)
        self.recMergeSort(work_space, mid + 1, upper_bound)

        self.merge(work_space, lower_bound, mid, upper_bound)

    def merge(self, work_space, lower_bound, mid, upper_bound):
        j = 0
        lower_ptr = lower_bound
        higher_ptr = mid + 1
        no_of_element = upper_bound - lower_bound + 1
        while lower_ptr <= mid and higher_ptr <= upper_bound:
            if self.collections[lower_ptr] < self.collections[higher_ptr]:
                work_space[j] = self.collections[lower_ptr]
                j += 1
                lower_ptr += 1
            else:
                work_space[j] = self.collections[higher_ptr]
                j += 1
                higher_ptr += 1

        # If the left sub arr is already sorted
        while lower_ptr <= mid:
            work_space[j] = self.collections[lower_ptr]
            j += 1
            lower_ptr += 1

        while higher_ptr <= upper_bound:
            work_space[j] = self.collections[higher_ptr]
            j += 1
            higher_ptr += 1

        for i in range(no_of_element):
            self.collections[lower_bound + i] = work_space[i]


if __name__ == "__main__":
    arr = MergeX(20)
    arr.insert(64)
    arr.insert(21)
    arr.insert(33)
    arr.insert(70)
    arr.insert(12)
    arr.insert(85)
    arr.insert(44)
    arr.insert(3)
    arr.insert(99)
    arr.insert(0)
    arr.insert(108)
    arr.insert(36)
    arr.sort()
    print(arr.collections)  # Display merge sorting
