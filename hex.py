# Set up the constants.
X_REPEAT = 19 # How many times to tessellate horizontally.
Y_REPEAT = 12 # How many times to tessellate vertically.

for y in range(Y_REPEAT):
    # Display the top half of the hexagon:
    for x in range(X_REPEAT):
        print(r'/ \_', end='')
    print()
    
    # Display the bottom half of the hexagon:
    for x in range(X_REPEAT):
        print(r'\_/ ', end='')
    print()
