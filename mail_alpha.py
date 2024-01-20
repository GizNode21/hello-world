from string import punctuation

file = open(input("Enter a file:"))

alpha_count = {}

for line in file:
    """letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
               "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Z", "a",
               "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
               "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]"""
    line = line.strip().replace(" ", "").translate(line.maketrans("", "", punctuation))
    for letter in line:
        if not letter in alpha_count:
            alpha_count[letter] = 1
        else:
            alpha_count[letter] += 1

print(alpha_count)
file.close()

letter_count = []

total = 0

for value in alpha_count.values():
    total += value

for key, value in alpha_count.items():
    letter_count.append((round((value / total) * 100, 2), key))

letter_count.sort(reverse=True)

letter_count.pop()

for k, v in letter_count:
    print(str(k) + "%", v)
