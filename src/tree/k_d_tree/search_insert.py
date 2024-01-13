"""K Dimensional Tree | Set 1 (Search and Insert)
A K-D Tree(also called as K-Dimensional Tree) is a binary search tree where data in each node is a K-Dimensional point in space. In short, it is a space partitioning(details below) data structure for organizing points in a K-Dimensional space.

A non-leaf node in K-D tree divides the space into two parts, called as half-spaces.

Points to the left of this space are represented by the left subtree of that node and points to the right of the space are represented by the right subtree. We will soon be explaining the concept on how the space is divided and tree is formed.



For the sake of simplicity, let us understand a 2-D Tree with an example.

The root would have an x-aligned plane, the root’s children would both have y-aligned planes, the root’s grandchildren would all have x-aligned planes, and the root’s great-grandchildren would all have y-aligned planes and so on.

Generalization:
Let us number the planes as 0, 1, 2, …(K – 1). From the above example, it is quite clear that a point (node) at depth D will have A aligned plane where A is calculated as:

A = D mod K



How to determine if a point will lie in the left subtree or in right subtree?

If the root node is aligned in planeA, then the left subtree will contain all points whose coordinates in that plane are smaller than that of root node. Similarly, the right subtree will contain all points whose coordinates in that plane are greater-equal to that of root node.

Creation of a 2-D Tree:
Consider following points in a 2-D plane:
(3, 6), (17, 15), (13, 15), (6, 12), (9, 1), (2, 7), (10, 19)

Insert (3, 6): Since tree is empty, make it the root node.
Insert (17, 15): Compare it with root node point. Since root node is X-aligned, the X-coordinate value will be compared to determine if it lies in the rightsubtree or in the right subtree. This point will be Y-aligned.
Insert (13, 15): X-value of this point is greater than X-value of point in root node. So, this will lie in the right subtree of (3, 6). Again Compare Y-value of this point with the Y-value of point (17, 15) (Why?). Since, they are equal, this point will lie in the right subtree of (17, 15). This point will be X-aligned.
Insert (6, 12): X-value of this point is greater than X-value of point in root node. So, this will lie in the right subtree of (3, 6). Again Compare Y-value of this point with the Y-value of point (17, 15) (Why?). Since, 12 < 15, this point will lie in the left subtree of (17, 15). This point will be X-aligned.
Insert (9, 1):Similarly, this point will lie in the right of (6, 12).
Insert (2, 7):Similarly, this point will lie in the left of (3, 6).
Insert (10, 19): Similarly, this point will lie in the left of (13, 15).

"""
from typing import List, NamedTuple
from networkx import nx
import sys
from six.moves import xrange
# A Python program to demonstrate operations of KD tree 
INT_MAX = sys.maxsize
k = 2 

# A structure to represent node of kd tree 
class Node(object):
    def __init__(self):
        self.point = [0 for i in xrange(k)] # To store k dimensional point 
        self.left, self.right = None, None 


class KDTreeOperation(object):
    def __init__(self):
        pass
    
    # A method to create a node of K D tree 
    def newNode(self, arr):
        temp = Node() 
        for i in xrange(k): 
            temp.point[i] = arr[i]

        temp.left, temp.right = None, None
        return temp
    

    def insertRec(self, root, point, depth):
        """Inserts a new node and returns root of modified tree 
        The parameter depth is used to decide axis of comparison 
        
        Arguments:
            root {Node} -- Node
            point {int} -- list
            depth {int} -- int
        """ 
        # Tree is empty 
        if (not root): return self.newNode(point)

        # Calculate current dimension (cd) of comparison 
        cd = depth % k

        # Compare the new point with root on current dimension 'cd'  and decide the left or right subtree 
        if (point[cd] < (root.point[cd])): 
            root.left = self.insertRec(root.left, point, depth + 1)
        else:
            root.right = self.insertRec(root.right, point, depth + 1)

        return root
     
    def insert(self, root, point):
        """Function to insert a new point with given point in 
        KD Tree and return new root. It mainly uses above recursive 
        function "insertRec()"
        
        Arguments:
            root {Node} -- [description]
            point {list} -- [description]
        """ 
        return self.insertRec(root, point, 0)
     
    def copyPoint(self, p1, p2): 
        """Copies point p2 to p1
        
        Arguments:
            p1 {[type]} -- [description]
            p2 {[type]} -- [description]
        """
        p1 = [p2[i] for i in xrange(k)] 

    def delete_node_rec(self, root, point, depth):
        """Function to delete a given point 'point[]' from tree with root 
        as 'root'.  depth is current depth and passed as 0 initially. 
        Returns root of the modified tree. 
        
        Arguments:
            root {Node} -- [description]
            point {list} -- [description]
            depth {int} -- [description]
        """ 
        # Given point is not present 
        if (root is None): 
            return None
    
        # Find dimension of current node 
        cd = depth % k 
    
        # If the point to be deleted is present at root 
        if (self.arePointsSame(root.point, point)): 
            # 2.b) If right child is not NULL 
            if (root.right is not None): 
                # Find minimum of root's dimension in right subtree 
                _min = self.findMin(root.right, cd) 
    
                #Copy the minimum to root 
                self.copyPoint(root.point, _min.point) 
    
                # Recursively delete the minimum 
                root.right = self.delete_node_rec(root.right, _min.point, depth+1)
            
            elif (root.left is not None): # same as above        
                _min = self.findMin(root.left, cd) 
                self.copyPoint(root.point, _min.point) 
                root.right = self.delete_node_rec(root.left, _min.point, depth+1)
            
            else: # If node to be deleted is leaf node 
                del root
                return None
            return root 
        
    
        # 2) If current node doesn't contain point, search downward 
        if (point[cd] < root.point[cd]): 
            root.left = self.delete_node_rec(root.left, point, depth+1)
        else:
            root.right = self.delete_node_rec(root.right, point, depth+1)
        return root
     
    def delete_node(self, root, point):
        """Function to delete a given point from K D Tree with 'root'
        
        Arguments:
            root {root} -- [description]
            point {point} -- [description]
        """ 
        # Pass depth as 0 
        return self.delete_node_rec(root, point, 0)
 
    def arePointsSame(self, point1, point2):
        """A utility method to determine if two Points are same in K Dimensional space
        
        Arguments:
            point1 {list} -- [description]
            point2 {list} -- [description]
        """     
        # Compare individual pointinate values 
        for i in xrange(k):
            if (point1[i] != point2[i]): return False 

        return True
     
    def findMinRec(self, root, d,  depth):
        """Recursively finds minimum of d'th dimension in KD tree 
        The parameter depth is used to determine current axis.
        
        Arguments:
            root {Node} -- [description]
            d {int} -- [description]
            depth {int} -- [description]
        """  
        # Base cases 
        if (root is None): 
            return INT_MAX
    
        # Current dimension is computed using current depth and total dimensions (k) 
        cd = depth % k
    
        # // Compare point with root with respect to cd (Current dimension) 
        if (cd == d): 
            if (root.left is None): 
                return root.point[d]
            return min(root.point[d], self.findMinRec(root.left, d, depth + 1)) 
        
    
        # If current dimension is different then minimum can be anywhere in this subtree 
        return min(root.point[d], 
                self.findMinRec(root.left, d, depth + 1), 
                self.findMinRec(root.right, d, depth + 1)) 
    
     
    def findMin(self, root,  d): 
        """
        K Dimensional Tree | Set 2 (Find Minimum)
        We strongly recommend to refer below post as a prerequisite of this.

        K Dimensional Tree | Set 1 (Search and Insert)

        In this post find minimum is discussed. The operation is to find minimum in the given dimension. 
        This is especially needed in delete operation.

        For example, consider below KD Tree, if given dimension is x, then output should be 5 and if given 
        dimensions is y, then output should be 12.

                    (30, 40)
                /        \
                /          \
                (5, 25)     (70, 70)
            /            /
            /            /  
            (10, 12)    (50, 30)
                        /
                    /
                    (35, 45)
            
        In KD tree, points are divided dimension by dimension. For example, root divides keys by dimension 0, 
        level next to root divides by dimension 1, next level by dimension 2 if k is more then 2 (else by dimension 0), and so on.

        To find minimum we traverse nodes starting from root. If dimension of current level is same as given 
        dimension, then required minimum lies on left side if there is left child. This is same as Binary Search Tree Minimum.
        Above is simple, what to do when current level’s dimension is different. When dimension of current level is different, 
        minimum may be either in left subtree or right subtree or current node may also be minimum. So we take minimum of three 
        and return. This is different from Binary Search tree.

        A wrapper over findMinRec(). Returns minimum of d'th dimension
        """
        # Pass current level or depth as 0 
        return self.findMinRec(root, d, 0) 
    
    def deleteNodeRec(self, root, point, depth):
        """
        
        Function to delete a given point 'point[]' from tree with root 
        as 'root'.  depth is current depth and passed as 0 initially. 
        Returns root of the modified tree. 
        
        Arguments:
            root {[type]} -- [description]
            point {[type]} -- [description]
            depth {[type]} -- [description]
        """ 

        # Given point is not present 
        if (root is None): 
            return None
    
        # Find dimension of current node 
        cd = depth % k 
    
        # If the point to be deleted is present at root 
        if (self.arePointsSame(root.point, point)): 
            # 2.b) If right child is not NULL 
            if (root.right is not None): 
                # Find minimum of root's dimension in right subtree 
                min = self.findMin(root.right, cd) 
    
                # Copy the minimum to root 
                self.copyPoint(root.point, min.point) 
    
                # Recursively delete the minimum 
                root.right = self.deleteNodeRec(root.right, min.point, depth+1)
            
            elif (root.left is not None): # same as above 
                min = self.findMin(root.left, cd)
                self.copyPoint(root.point, min.point) 
                root.right = self.deleteNodeRec(root.left, min.point, depth+1) 
            
            else: # If node to be deleted is leaf node 
                del root
                return None 
            
            return root
        
    
        # 2) If current node doesn't contain point, search downward 
        if (point[cd] < root.point[cd]): 
            root.left = self.deleteNodeRec(root.left, point, depth+1)
        else:
            root.right = self.deleteNodeRec(root.right, point, depth+1) 
        return root; 
    
    def deleteNode(self, root, point):
        """ Function to delete a given point from K D Tree with 'root' """ 
        # Pass depth as 0 
        return self.deleteNodeRec(root, point, 0) 

    def searchRec(self, root, point, depth):
        """Searches a Point represented by "point[]" in the K D tree. 
        The parameter depth is used to determine current axis. 
        
        Arguments:
            root {Node} -- [description]
            point {list} -- [description]
            depth {int} -- [description]
        """
        # Base cases 
        if (root is None): return False
        if (self.arePointsSame(root.point, point)): return True

        # Current dimension is computed using current depth and total dimensions (k) 
        cd = depth % k 

        # Compare point with root with respect to cd (Current dimension) 
        if (point[cd] < root.point[cd]): 
            return self.searchRec(root.left, point, depth + 1)

        return self.searchRec(root.right, point, depth + 1)
     
    def search(self,  root,  point):
        """Searches a Point in the K D tree. It mainly uses searchRec()
        
        Arguments:
            root {Node} -- [description]
            point {list} -- [description]
        """ 
        # Pass current depth as 0 
        return self.searchRec(root, point, 0)
    

if __name__ == "__main__":
    root = Node() 
    points = [[3, 6], 
        [17, 15], [13, 15], [6, 12], 
        [9, 1], [2, 7], [10, 19]]

    n = len(points)
    kd_tree= KDTreeOperation()
    for i in xrange(n): 
	    root = kd_tree.insert(root, points[i])
    
    point1 = [10, 19] 
    print("Found" if kd_tree.search(root, point1) else "Not Found\n")

    point2 = [12, 19]
    print("Found" if (kd_tree.search(root, point2)) else "Not Found\n") 