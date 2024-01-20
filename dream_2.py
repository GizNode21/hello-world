import requests

import bs4

from nltk.tokenize import sent_tokenize

from gensim.summarization import summarize

url = "http://www.gutenberg.org/files/2852/2852-h/2852-h.htm"
page = requests.get(url)
page.raise_for_status()
soup = bs4.BeautifulSoup(page.text, "lxml")
chapter_elems = soup.select("div[class=chapter]")
chapters = chapter_elems[2:]
p_elems = [element.text for element in chapters]
print("\nSummary of Hound of the Baskervilles:")
for i, p_elem in enumerate(p_elems):
    speech = []
    speech.append("".join(p_elem))
    speech = "".join(speech)
    print(f"Chapter{i + 1}\n", summarize(speech, word_count=450))

