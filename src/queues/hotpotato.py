# coding=utf-8
"""Simulation: Hot Potato"""

from __future__ import print_function


class Queue:
    """
    Implementing a Queue in Python
    It is again appropriate to create a new class for the implementation of the abstract data
    type queue. As before, we will use the power and simplicity of the list collection to build
    the internal representation of the queue.

    We need to decide which end of the list to use as the rear and which to use as the front. The
    implementation shown in Listing 1 assumes that the rear is at position 0 in the list. This
    allows us to use the insert function on lists to add new elements to the rear of the queue.
    The pop operation can be used to remove the front element (the last element of the list).
    Recall that this also means that enqueue will be O(n) and dequeue will be O(1). """

    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.items == []

    def enqueue(self, item):
        self.items.insert(0, item)

    def dequeue(self):
        return self.items.pop()

    def size(self):
        return len(self.items)


class HotPotato(object):
    """
    One of the typical applications for showing a queue in action is to simulate a real situation
    that requires data to be managed in a FIFO manner. To begin, let’s consider the children’s
    game Hot Potato. In this game (see Figure 2) children line up in a circle and pass an item
    from neighbor to neighbor as fast as they can. At a certain point in the game, the action is
    stopped and the child who has the item (the potato) is removed from the circle. Play
    continues until only one child is left.

            Brad -> Bill -> David
             ^                 |
             |                 v
            Kent <- Jane <- Susan

            (After 5 pass Brad is eliminated)

    This game is a modern-day equivalent of the famous Josephus problem. Based on a legend about
    the famous first-century historian Flavius Josephus, the story is told that in the Jewish
    revolt against Rome, Josephus and 39 of his comrades held out against the Romans in a cave.
    With defeat imminent, they decided that they would rather die than be slaves to the Romans.
    They arranged themselves in a circle. One man was designated as number one, and proceeding
    clockwise they killed every seventh man. Josephus, according to the legend, was among other
    things an accomplished mathematician. He instantly figured out where he ought to sit in order
    to be the last to go. When the time came, instead of killing himself, he joined the Roman
    side. You can find many different versions of this story. Some count every third man and some
    allow the last man to escape on a horse. In any case, the idea is the same.

    We will implement a general simulation of Hot Potato. Our program will input a list of names
    and a constant, call it “num,” to be used for counting. It will return the name of the last
    person remaining after repetitive counting by num. What happens at that point is up to you.

    To simulate the circle, we will use a queue (see Figure 3). Assume that the child holding the
    potato will be at the front of the queue. Upon passing the potato, the simulation will simply
    dequeue and then immediately enqueue that child, putting her at the end of the line. She will
    then wait until all the others have been at the front before it will be her turn again. After
    num dequeue/enqueue operations, the child at the front will be removed permanently and
    another cycle will begin. This process will continue until only one name remains (the size of
    the queue is 1).

        --------------------------------------------------
    rear -> Brad -> Kent -> Jane -> Susan -> David -> Bill ---> front
     |   --------------------------------------------------       |
    Enqueue    <--------- Go to rear - - - - - - - - - - -     Dequeue


    Note that in this example the value of the counting constant is greater than the number of
    names in the list. This is not a problem since the queue acts like a circle and counting
    continues back at the beginning until the value is reached. Also, notice that the list is
    loaded into the queue such that the first name on the list will be at the front of the queue.
    Bill in this case is the first item in the list and therefore moves to the front of the
    queue. A variation of this implementation, described in the exercises, allows for a random
    counter. """
    def __init__(self, namelist, num):
        self.simqueue = Queue()
        self.namelist = namelist
        self.num = num
        for name in self.namelist:
            self.simqueue.enqueue(name)

    def evaluate(self):
        while self.simqueue.size() > 1:
            for index in range(self.num):
                self.simqueue.enqueue(self.simqueue.dequeue())

            print("Killed %s" % self.simqueue.dequeue())

        return self.simqueue.dequeue()


if __name__ == '__main__':
    hot_potato = HotPotato(["Bill", "David", "Susan", "Jane", "Kent", "Brad"], 7)
    print(hot_potato.evaluate())
