import urllib.request, urllib.parse, urllib.error

import ssl

import bs4

from nltk.tokenize import sent_tokenize

from gensim.summarization import summarize

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
url =  "https://www.microsoft.com/en-us/servicesagreement/default.aspx"
fhand = urllib.request.urlopen(url, context=ctx)
soup = bs4.BeautifulSoup(fhand, "html5lib")
p_elems = [element.text for element in soup.find_all("p")]

speech = "".join(p_elems)

print("\nSummary of Service Agreement:\n")
print(summarize(speech, word_count=450))