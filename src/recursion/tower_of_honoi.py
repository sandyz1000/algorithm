"""
https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/

Program for Tower of Hanoi

Tower of Hanoi is a mathematical puzzle where we have three rods and n disks. The objective of the 
puzzle is to move the entire stack to another rod, obeying the following simple rules:
1) Only one disk can be moved at a time.
2) Each move consists of taking the upper disk from one of the stacks and placing it on top of another 
stack i.e. a disk can only be moved if it is the uppermost disk on a stack.
3) No disk may be placed on top of a smaller disk.



"""
import time


def moveTower(height, from_pole, inter_pole, to_pole):
    if height >= 1:
        moveTower(height - 1, from_pole, to_pole, inter_pole)
        moveDisk(from_pole, to_pole, height)
        moveTower(height - 1, to_pole, inter_pole, from_pole)


def moveDisk(fp, tp, height):
    print("moving disk of dia", height, "from", fp, "to", tp)


if __name__ == '__main__':
    start_time = time.time() * 1000
    moveTower(4, "A", "B", "C")
    end_time = time.time() * 1000
    print("Function took %s time" % (end_time - start_time))
