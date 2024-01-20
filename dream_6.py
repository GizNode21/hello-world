import urllib.request, urllib.parse, urllib.error

import ssl

import bs4

from nltk.tokenize import sent_tokenize

from gensim.summarization import summarize

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "http://www.gutenberg.org/files/2852/2852-h/2852-h.htm"
html = urllib.request.urlopen(url, context=ctx)
soup = bs4.BeautifulSoup(html, "html5lib")
chapter_elems = soup.select("div[class=chapter]")
chapters = chapter_elems[2:]
p_elems = [element.text for element in chapters]
for i, p_elem in enumerate(p_elems):
    speech = []
    speech.append(p_elem)
    speech = "".join(speech)
    print(f"Chapter {i + 1}:")
    print(summarize(speech, word_count=450))
