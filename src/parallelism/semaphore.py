"""
Also, in the threading module, the operation of a semaphore is based on the two functions
acquire() and release(), as explained:

    1) Whenever a thread wants to access a resource that is associated with a semaphore,
    it must invoke the acquire() operation, which decreases the internal variable of
    the semaphore and allows access to the resource if the value of this variable appears
    to be non-negative. If the value is negative, the thread would be suspended and the
    release of the resource by another thread will be placed on hold.

    2) Whenever a thread has finished using the data or shared resource, it must release
    the resource through the release() operation. In this way, the internal variable
    of the semaphore is incremented, and the first waiting thread in the semaphore's
    queue will have access to the shared resource.

Although at first glance the mechanism of semaphores does not present obvious problems,
it works properly only if the wait and signal operations are performed in atomic blocks. If not,
or if one of the two operations is stopped, this could arise unpleasant situations.

Suppose that two threads execute simultaneously, the operation waits on a semaphore,
whose internal variable has the value 1. Also assume that after the first thread has
the semaphore decremented from 1 to 0, the control goes to the second thread, which
decrements the semaphore from 0 to -1 and waits as the negative value of the internal variable.
At this point, with the control that returns to the first thread, the semaphore has a negative
value and therefore, the first thread also waits.

Therefore, despite the semaphore having access to a thread, the fact that the wait operation
was not performed in atomic terms has led to a solution of the stall.

"""
import threading
import time
import random

# The optional argument gives the initial value for the internal counter; it defaults to 1.
# If the value given is less than 0, ValueError is raised.
semaphore = threading.Semaphore(0)


def consumer():
    print ("consumer is waiting.")
    semaphore.acquire()  # Acquire a semaphore
    # The consumer have access to the shared resource
    print ("Consumer notify : consumed item number %s " % item)


def producer():
    """
    # Release a semaphore, incrementing the internal counter by one.
    # When it is zero on entry and another thread is waiting for it
    # to become larger than zero again, wake up that thread.
    :return:
    """
    global item
    time.sleep(2)
    item = random.randint(0, 1000)  # create a random item
    print ("Producer notify : produced item number %s" % item)
    semaphore.release()

if __name__ == '__main__':
    for i in range(0, 5):
        t1 = threading.Thread(target=producer)
        t2 = threading.Thread(target=consumer)
        t1.start()
        t2.start()
        t1.join()
        t2.join()
    print ("program terminated")
