from __future__ import print_function, absolute_import


class Stack:
    def __init__(self, max_size=100):
        self.size = max_size
        self.v = [None] * max_size
        self.top = -1

    def push(self, value):
        self.top += 1
        self.v[self.top] = value

    def pop(self):
        temp = self.v[self.top]
        self.v[self.top] = None
        self.top -= 1
        return temp

    def peek(self):
        return self.v[self.top]

    def isEmpty(self):
        return True if self.top <= -1 else False


def infix_to_postfix(infixexpr):
    prec = {"*": 3, "/": 3, "+": 2, "-": 2, "(": 1}
    op_stack = Stack()
    postfix_list = []
    token_list = infixexpr.split()

    for token in token_list:
        if token in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" or token in "0123456789":
            postfix_list.append(token)

        elif token == '(':
            op_stack.push(token)

        elif token == ')':
            top_token = op_stack.pop()
            while top_token != '(':
                postfix_list.append(top_token)
                top_token = op_stack.pop()

        else:  # If token is a operator
            while (not op_stack.isEmpty()) and (prec[op_stack.peek()] >= prec[token]):
                postfix_list.append(op_stack.pop())
            op_stack.push(token)

    while not op_stack.isEmpty():
        postfix_list.append(op_stack.pop())

    return " ".join(postfix_list)


def postfix_eval(postfixExpr):
    operandStack = Stack()
    tokenList = postfixExpr.split()

    for token in tokenList:
        if token in "0123456789":
            operandStack.push(int(token))
        else:
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = doMath(token, operand1, operand2)
            operandStack.push(result)
    return operandStack.pop()


def doMath(op, op1, op2):
    if op == "*":
        return op1 * op2
    elif op == "/":
        return op1 / op2
    elif op == "+":
        return op1 + op2
    else:
        return op1 - op2


if __name__ == '__main__':
    print(infix_to_postfix("A * B + C * D"))
    print(infix_to_postfix("( A + B ) * C - ( D - E ) * ( F + G )"))

    print(postfix_eval('7 8 + 3 2 + /'))
