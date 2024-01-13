from __future__ import print_function

import operator


class Node(object):
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class _Stack(object):
    pass


class ParseTree:
    opers = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': operator.truediv}

    def __init__(self):
        self._stack = []

    @staticmethod
    def is_operator(token):
        return token in ['*', '/', '+', '-', '^']

    def build_parse_tree(self, _string):
        e_node = Node('')
        self._stack.append(e_node)
        current_node = e_node
        curr_index = 0
        while curr_index < len(_string):
            _char = _string[curr_index]
            curr_index += 1

            if isinstance(_char, str) and _char.strip() == "":
                continue
            elif isinstance(_char, str) and _char.isdigit():
                _char += _string[curr_index]
                curr_index += 1

            if _char == '(':
                current_node.left = Node('')
                self._stack.append(current_node)
                current_node = current_node.left

            elif _char == ')':
                current_node = self._stack.pop()

            elif not ParseTree.is_operator(_char):
                current_node.value = int(_char)
                current_node = self._stack.pop()

            elif ParseTree.is_operator(_char):
                current_node.value = _char
                current_node.right = Node('')
                self._stack.append(current_node)
                current_node = current_node.right
            else:
                raise ValueError()

        return current_node

    def evaluate(self, tree):
        if tree is None:
            return None

        left_child = self.evaluate(tree.left)
        right_child = self.evaluate(tree.right)

        if left_child and right_child:
            fn = ParseTree.opers[tree.value]
            return fn(left_child, right_child)
        else:
            return tree.value


if __name__ == '__main__':
    parse_tree = ParseTree()
    tree = parse_tree.build_parse_tree("( ( 10 + 5 ) * 3 )")  # 10 5 + 3 *
    print(parse_tree.evaluate(tree))