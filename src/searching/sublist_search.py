"""
Sublist Search (Search a linked list in another list)
http://www.geeksforgeeks.org/sublist-search-search-a-linked-list-in-another-list/

Given two linked lists, the task is to check whether the first list is present in 2nd list or not.

Input  : list1 =  10->20
         list2  = 5->10->20
Output : LIST FOUND

Input  : list1 =  1->2->3->4
         list2  = 1->2->1->2->3->4
Output : LIST FOUND

Input  : list1 =  1->2->3->4
         list2  = 1->2->2->1->2->3
Output : LIST NOT FOUND

--------------------------------------------
Algorithm:
--------------------------------------------
1- Take first node of second list.
2- Start matching the first list from this first node.
3- If whole lists match return true.
4- Else break and take first list to the first node again.
5- And take second list to its second node.
6- Repeat these steps until any of linked lists becomes empty.
7- If first list becomes empty then list found else not.

Time Complexity : O(m*n) where m is the number of nodes in second list and n in first.

"""

from __future__ import print_function


# Python  program to find a list in second list


class Node:
    def __init__(self, data, next_node=None):
        self.data = data
        self.next = next_node


class SublistSearch:
    def find_list(self, first, second):
        """ Returns true if first list is present in second list
        """
        ptr1, ptr2 = first, second

        # If both linked lists are empty, return true
        if first is None and second is None:
            return True

        # Else If one is empty and other is not return false
        if first is None or (first is not None and second is None):
            return False

        # Traverse the second list by picking nodes one by one
        while second is not None:
            # Initialize ptr2 with current node of second
            ptr2 = second

            # Start matching first list with second list
            while ptr1 is not None:
                # If second list becomes empty and first not then return false
                if ptr2 is None:
                    return False
                # If data part is same, go to next of both lists
                elif ptr1.data == ptr2.data:
                    ptr1 = ptr1.next
                    ptr2 = ptr2.next
                # If not equal then break the loop
                else:
                    break

            # Return true if first list gets traversed completely that means it is matched.
            if ptr1 is None:
                return True

            ptr1 = first  # Initialize ptr1 with first again
            second = second.next  # And go to next node of second list

        return False

    def print_list(self, node):
        """Function to print nodes in a given linked list"""
        while node is not None:
            print("%d " % node.data)
            node = node.next


if __name__ == '__main__':
    # Output: LIST FOUND
    # Time Complexity : O(m*n) where m is the number of nodes in second list and n in first.

    # Let us create two linked lists to test the above functions.
    # Created lists shall be
    #     a: 1->2->3->4
    #     b: 1->2->1->2->3->4

    sublist = SublistSearch()
    a = Node(1)
    a.next = Node(2)
    a.next.next = Node(3)
    a.next.next.next = Node(4)

    b = Node(1)
    b.next = Node(2)
    b.next.next = Node(1)
    b.next.next.next = Node(2)
    b.next.next.next.next = Node(3)
    b.next.next.next.next.next = Node(4)

    print("LIST FOUND" if sublist.find_list(a, b) else "LIST NOT FOUND")
