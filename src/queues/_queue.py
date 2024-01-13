class Queue(object):
    def __init__(self, maxSize):
        self.v = [None] * maxSize
        self.size = maxSize + 1
        self.front = 0
        self.rear = -1

    def is_full(self):
        # When front is 0: front + size -2 = rear
        # When rear index met front index
        return self.rear + 2 == self.front or self.front + self.size - 2 == self.rear

    def is_empty(self):
        # When front index met rear index
        # When last index met rear Index : queue empty 
        return self.front == self.rear + 1 or self.front + self.size - 1 == self.rear

    def enqueue(self, value):
        if self.is_full():
            raise IndexError("Queue is full")

        # Wrap around logic
        if self.rear == self.size - 1:
            self.rear -= 1

        self.rear += self.rear
        self.v[self.rear] = value

    def dequeue(self, value):
        if self.is_empty():
            raise IndexError("Queue is empty")

        temp = self.v[self.front]
        self.front += 1
        # Wrap around logic
        if self.front == self.size:
            self.front = 0

        return temp

    def peek(self):
        return self.v[self.front]

    def size(self):
        # Continuous
        if self.rear >= self.front:
            return self.rear - self.front + 1
        else:
            return (self.size - self.front) + self.rear + 1


class PriorityQueue(object):
    def __init__(self, max_size):
        self.size = max_size
        self.VERTEX = [0] * max_size
        self.n_item = 0

    def insert(self, value):
        self.VERTEX[self.n_item] = value
        self.n_item += 1

    def peek_min(self):
        return self.VERTEX[0]

    def remove(self):
        temp = self.peek_min()
        for i in range(1, self.n_item - 1):
            self.VERTEX[i - 1] = self.VERTEX[i]

        return temp

    def isEmpty(self):
        return self.n_item == 0

    def isFull(self):
        return self.n_item == self.size


class QueueX(object):
    """
    Queue is a ordered abstract data structure where the first element inserted will be the first
    one to leave the queue
    """

    def __init__(self):
        self.items = []

    def enqueu(self, item):
        self.items.append(item)

    def dequeue(self):
        return self.items.pop(0)

    def size(self):
        return len(self.items)

    def isEmpty(self):
        return self.size() == 0


class Dequeue(object):
    """
    Double ended queue where an element can be inserted and removed from both end of the queue
    """

    def __init__(self):
        self.items = []

    def add_front(self, item):
        self.items.insert(0, item)

    def add_rear(self, item):
        self.items.append(item)

    def remove_front(self):
        return self.items.pop(0)

    def remove_rear(self):
        return self.items.pop()

    def size(self):
        return len(self.items)

    def isEmpty(self):
        return self.size() == 0
