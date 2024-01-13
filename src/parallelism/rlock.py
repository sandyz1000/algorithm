"""
In the sample code, we introduced the Box class, which has the methods add() and
remove(), respectively, that provide us access to the execute() method so that we can
perform the action of adding or deleting an item, respectively.
Access to the execute() method is regulated by RLock():
"""

import threading
import time


class Box(object):
    lock = threading.RLock()

    def __init__(self):
        self.total_items = 0

    def execute(self, n):
        Box.lock.acquire()
        self.total_items += n
        Box.lock.release()

    def add(self):
        Box.lock.acquire()
        self.execute(1)
        Box.lock.release()

    def remove(self):
        Box.lock.acquire()
        self.execute(-1)
        Box.lock.release()


# These two functions run n in separate threads and call the Box's methods
def adder(box, items):
    """
    :param box:
    :param items:
    :return:
    """
    while items > 0:
        print ("adding 1 item in the box\n")
        box.add()
        time.sleep(5)
        items -= 1


def remover(box, items):
    while items > 0:
        print ("removing 1 item in the box")
        box.remove()
        time.sleep(5)
        items -= 1


if __name__ == "__main__":
    items = 5
    print ("putting %s items in the box " % items)
    box = Box()
    t1 = threading.Thread(target=adder, args=(box, items))
    t2 = threading.Thread(target=remover, args=(box, items))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    print ("%s items still remain in the box " % box.total_items)
