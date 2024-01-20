import socket

my_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
my_sock.connect(("gutenberg.org", 80))
cmd = 'GET http://www.gutenberg.org/files/2852/2852-h/2852-h.htm HTTP/1.0\r\n\r\n'.encode()
my_sock.send(cmd)
while True:
    data = my_sock.recv(512)
    if len(data) < 1:
        break
    print(data.decode().strip(), end="")

