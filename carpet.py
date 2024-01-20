X_REPEAT = 6 # How many times to tessellate horizontally.
Y_REPEAT = 4 # How many times to tessellate vertically.

for i in range(Y_REPEAT):
    print(r'_ \ \ \_/__' * X_REPEAT)
    print(r' \ \ \__/ _' * X_REPEAT)
    print(r'\ \ \____/ ' * X_REPEAT)
    print(r'/ / / __ \_' * X_REPEAT)
    print(r'_/ / / _ \_' * X_REPEAT)