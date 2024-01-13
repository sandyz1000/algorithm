import sys


def traingle(n):
    if n == 1:  # Base condition is required for any recursion pgm
        return 1

    return n + traingle(n - 1)


class StackX:
    def __init__(self, max_size):
        self.v = [0] * max_size
        self.top = -1
        self.max_size = max_size

    def push(self, item):
        self.top += 1
        self.v[self.top] = item

    def pop(self):
        item = self.v[self.top]
        self.top -= 1
        return item

    def is_empty(self):
        return self.top == -1

    def peek(self):
        return self.v[self.top]  # Top is the last inserted item in the arr


class StackTraingle():
    """Implement recursive algorithm with stack"""

    def __init__(self):
        self.stackX = StackX()

    def traingle(self, n):
        newN = 0
        while n > 0:
            self.stackX.push(n)
            n -= 1
        while not self.stackX.is_empty():
            newN += self.stackX.pop()

        return newN


if __name__ == "__main__":
    # Fix exception
    while True:
        # argv = raw_input("Enter the no in pythagorean series: ")
        # print traingle(int(argv))

        stack = StackTraingle()
        print(stack.traingle(sys.argv[1]))
