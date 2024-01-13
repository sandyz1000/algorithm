
class Word:
    def __init__(self, input_str=""):
        self.work_str = input_str
        self.size = len(input_str)

    def anagram(self, length):
        if length == 1:
            return
        
        for i in range(length):
            self.anagram(length - 1)
            if length == 2:
                print(self.work_str)  # If length of the str is 2
            self.rotate(length)  # Rotate the word

    def rotate(self, index):
        pointer = self.size - index
        temp = self.work_str[pointer]
        wordList = list(self.work_str)
        j = 0
        for j in range(pointer + 1, self.size):
            wordList[j - 1] = wordList[j]  # String object is immutable

        wordList[j] = temp
        self.work_str = "".join(wordList)


if __name__ == "__main__":
    word = Word("cats")
    word.anagram(4)
