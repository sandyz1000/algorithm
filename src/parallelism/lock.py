"""
Definition:
The operation of a lock is simple; when a thread wants to access a portion of shared memory,
it must necessarily acquire a lock on that portion prior to using it. In addition to this,
after completing its operation, the thread must release the lock that was previously obtained so
that a portion of the shared memory is available for any other threads that want to use it. In
this way, it is evident that the impossibility of incurring races is critical as the need of the
lock for the thread requires that at a given instant, only a given thread can use this part of
the shared memory. Despite their simplicity, the use of a lock works. However, in practice,
we can see how this approach can often lead the execution to a bad situation of deadlock.
A deadlock occurs due to the acquisition of a lock from different threads; it is impossible to
proceed with the execution of operations since the various locks between them block access to the
resources.

"""
import threading

shared_resource_with_lock = 0
shared_resource_with_no_lock = 0
COUNT = 100000
shared_resource_lock = threading.Lock()


def increment_with_lock():
    """
    LOCK MANAGEMENT
    :return:
    """
    global shared_resource_with_lock
    for i in range(COUNT):
        shared_resource_lock.acquire()
        shared_resource_with_lock += 1
        shared_resource_lock.release()


def decrement_with_lock():
    global shared_resource_with_lock
    for i in range(COUNT):
        shared_resource_lock.acquire()
        shared_resource_with_lock -= 1
        shared_resource_lock.release()


def increment_without_lock():
    """
    NO LOCK MANAGEMENT
    :return:
    """
    global shared_resource_with_no_lock
    for i in range(COUNT):
        shared_resource_with_no_lock += 1


def decrement_without_lock():
    global shared_resource_with_no_lock
    for i in range(COUNT):
        shared_resource_with_no_lock -= 1


if __name__ == "__main__":
    t1 = threading.Thread(target=increment_with_lock)
    t2 = threading.Thread(target=decrement_with_lock)
    t3 = threading.Thread(target=increment_without_lock)
    t4 = threading.Thread(target=decrement_without_lock)
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    print ("the value of shared variable with lock management is %s" % shared_resource_with_lock)
    print ("the value of shared variable with race condition is %s" % shared_resource_with_no_lock)
