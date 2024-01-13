"""
Design a data structure to do reservations of future jobs on a single machine under following
constraints.

1)  Every job requires exactly k time units of the machine.
2)  The machine can do only one job at a time.
3)  Time is part of the system. Future Jobs keep coming at different times. Reservation of a future
    job is done only if there is no existing reservation within k time frame (after and before)
4)  Whenever a job finishes (or its reservation time plus k becomes equal to current time), it is
    removed from system.

Example:
---------------
Let time taken by a job (or k) be = 4

At time 0: Reservation request for a job at time 2 in future comes in, reservation is done
        as machine will be available (no conflicting reservations)
Reservations {2}

At time 3: Reservation requests at times 15, 7, 20 and 3.
           Job at 7, 15 and 20 can be reserved, but at 3
           cannot be reserved as it conflicts with a
           reserved at 2.
Reservations {2, 7, 15, 20}

At time 6: Reservation requests at times 30, 17, 35 and 45
           Jobs at 30, 35 and 45 are reserved, but at 17
           cannot be reserved as it conflicts with a reserved
           at 15.
Reservations {7, 15, 30, 35, 45}.
Note that job at 2 is removed as it must be finished by 6.


Time complexity of checking for conflicts can be done in O(Logn) using Binary Search, but
insertions and deletions take O(n) time

"""
from __future__ import print_function


class Node(object):
    def __init__(self, time, left=None, right=None):
        self.time = time  # reservation time
        self.left = left
        self.right = right


def insert(root, time, k):
    """
    BST insert to process a new reservation request at a given time (future time). This function
    does reservation only if there is no existing job within k time frame of new job

    :param root: Node
    :param time: int
    :param k: int
    :return:
    """
    # If the tree is empty, return a new node
    if root is None:
        return Node(time)

    # Check if this job conflicts with existing reservations
    if (time - k < root.time) and (time + k > root.time):
        return root

    # Otherwise, recur down the tree
    if time < root.time:
        root.left = insert(root.left, time, k)
    else:
        root.right = insert(root.right, time, k)

    # return the (unchanged) node pointer
    return root


if __name__ == '__main__':
    k = 4
    root = None
    root = insert(root, 2, k)
    root = insert(root, 15, k)
    root = insert(root, 7, k)
    root = insert(root, 20, k)
    root = insert(root, 3, k)
    root = insert(root, 30, k)
    root = insert(root, 17, k)
    root = insert(root, 35, k)
    root = insert(root, 45, k)
