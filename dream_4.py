import urllib.request

url =  "http://www.gutenberg.org/files/2852/2852-h/2852-h.htm"
fhand = urllib.request.urlopen(url)

for line in fhand:
    print(line.decode().strip())