import urllib.request, urllib.parse, urllib.error

import ssl

import bs4

from nltk.tokenize import sent_tokenize

from gensim.summarization import summarize

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
url =  "http://www.analytictech.com/mb021/mlk.htm"
fhand = urllib.request.urlopen(url, context=ctx)
soup = bs4.BeautifulSoup(fhand.text, "html5lib")
p_elems = [element.text for element in soup.find_all("p")]

speech = "".join(p_elems)

print("\nSummary of I Have A Dream Speech\n")
print(summarize(speech, word_count=450))