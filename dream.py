import requests

import bs4

from nltk.tokenize import sent_tokenize

from gensim.summarization import summarize

url = "http://www.analytictech.com/mb021/mlk.htm"
page = requests.get(url)
page.raise_for_status()
soup = bs4.BeautifulSoup(page.text, "lxml")
p_elems = [element.text for element in soup.find_all("p")]

speech = "".join(p_elems) # Use a space to join the paragraph elements

print("\nSummary of I Have a Dream Speech:")
print(summarize(speech, word_count=450))
