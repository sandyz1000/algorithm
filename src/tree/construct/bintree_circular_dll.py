"""
Convert a Binary Search Tree to a Circular Doubly Link List
http://www.geeksforgeeks.org/convert-a-binary-tree-to-a-circular-doubly-link-list/

Given a Binary Tree, convert it to a Circular Doubly Linked List (In-Place).

->  The left and right pointers in nodes are to be used as previous and next pointers respectively
    in converted Circular Linked List.
->  The order of nodes in List must be same as Inorder of the given Binary Tree.
->  The first node of Inorder traversal must be head node of the Circular List.


"""


# Python Program to convert a Binary Tree to a Circular Doubly Linked List
class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def concatenate(left_list, right_list):
    """A function that appends rightList at the end of leftList.
    """
    # If either of the list is empty then return the other list
    if left_list is None:
        return right_list

    if right_list is None:
        return left_list

    leftLast = left_list.left  # Store the last Node of left List
    rightLast = right_list.left  # Store the last Node of right List

    # Connect the last node of Left List with the first Node of the right List
    leftLast.right = right_list
    right_list.left = leftLast

    # Left of first node points to the last node in the list
    left_list.left = rightLast

    # Right of last node refers to the first node of the List
    rightLast.right = left_list
    return left_list


def btree_to_clist(root):
    """
    ----------------------------------
    Explanation:
    ----------------------------------

    The idea can be described using below steps.
    1) Write a general purpose function that concatenates two given circular doubly lists.
    2) Now traverse the given tree\n
        a) Recursively convert left subtree to a circular DLL. Let the converted list be leftList.\n
        b) Recursively convert right subtree to a circular DLL. Let the converted list be rightList.\n
        c) Make a circular linked list of root of the tree, make left and right of root to point to
        itself.\n
        d) Concatenate leftList with list of single root node.\n
        e) Concatenate the list produced in step above (d) with rightList.\n

    Note that the above code traverses tree in Postorder fashion. We can traverse in inorder fashion
    also. We can first concatenate left subtree and root, then recur for right subtree and
    concatenate the result with left-root concatenation.

    How to Concatenate two circular DLLs?

    ->  Get the last node of the left list. Retrieving the last node is an O(1) operation, since the
        prev pointer of the head points to the last node of the list.
    ->  Connect it with the first node of the right list
    ->  Get the last node of the second list
    ->  Connect it with the head of the list.


    Function converts a tree to a circular Linked List and then returns the head of the Linked List

    :param root: Node
    :return:
    """
    if root is None:
        return None

    # Recursively convert left and right subtrees
    left = btree_to_clist(root.left)
    right = btree_to_clist(root.right)

    # Make a circular linked list of single node (or root). To do so, make the right and left
    # pointers of this node point to itself
    root.left = root.right = root

    # Step 1 (concatenate the left list with the list with single node, i.e., current node)
    # Step 2 (concatenate the returned list with the right List)
    return concatenate(concatenate(left, root), right)


def displayCList(head):
    """Display Circular Link List"""
    print("Circular Linked List is :\n")
    print(head.data)
    itr = head.right
    while head != itr:
        print(itr.data)
        itr = itr.right


if __name__ == '__main__':
    # Circular Linked List is: 25 12 30 10 36 15

    root = Node(10)
    root.left = Node(12)
    root.right = Node(15)
    root.left.left = Node(25)
    root.left.right = Node(30)
    root.right.left = Node(36)

    head = btree_to_clist(root)
    displayCList(head)