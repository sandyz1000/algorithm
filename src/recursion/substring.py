# Recursive Python program to check if a string is subsequence of another string


def is_sub_sequence(string1, string2, m, n):
    """
    Returns true if str1[] is a subsequence of str2[]. m is length of str1 and n
    is length of str2
    :param string1:
    :param string2:
    :param m:
    :param n:
    :return:
    """
    # Base Cases
    if m == 0:
        return True
    if n == 0:
        return False

    # If last characters of two strings are matching
    if string1[m - 1] == string2[n - 1]:
        return is_sub_sequence(string1, string2, m - 1, n - 1)

    # If last characters are not matching
    return is_sub_sequence(string1, string2, m, n - 1)


def rec_mc(coin_value_list, change):
    minCoins = change
    if change in coin_value_list:
        return 1
    else:
        for i in [c for c in coin_value_list if c <= change]:
            numCoins = 1 + rec_mc(coin_value_list, change - i)
            if numCoins < minCoins:
                minCoins = numCoins
    return minCoins


def recDC(coin_value_list, change, known_results):
    minCoins = change
    if change in coin_value_list:
        known_results[change] = 1
        return 1
    elif known_results[change] > 0:
        return known_results[change]
    else:
        for i in [c for c in coin_value_list if c <= change]:
            numCoins = 1 + recDC(coin_value_list, change - i,
                                 known_results)
            if numCoins < minCoins:
                minCoins = numCoins
                known_results[change] = minCoins
    return minCoins


if __name__ == '__main__':
    string1 = "gksrek"
    string2 = "geeksforgeeks"
    m = len(string1)
    n = len(string2)
    print("Yes" if is_sub_sequence(string1, string2, m, n) else "No")

    print(recDC([1, 5, 10, 25], 63, [0] * 64))
    print(rec_mc([1, 5, 10, 25], 63))
