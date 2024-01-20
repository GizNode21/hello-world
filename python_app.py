import os, sys
from PyDictionary import PyDictionary

#from urllib import request
#import goslate

#proxy_handler = request.ProxyHandler({"http" : "http://proxy-domain.name:8080"})
#proxy_opener = request.build_opener(request.HTTPHandler(proxy_handler),
                                    #request.HTTPSHandler(proxy_handler))
def main():
    # have a python dictionary that has a key/value pair that represents a word and its a definition
    dictionary = PyDictionary()
    while True:
        word = input("Enter a word:")
        if word == "QUIT":
            sys.exit()
        """while True:
        word = input("Enter a word: ")
        # collect input from the user, input is a word
        if word == "":
            break
        # check if word is in the dictionary
        if word in word_dictionary:
            print(word, ":", word_dictionary[word]) # print the definition"""
        print(dictionary.meaning(word))
        print(dictionary.synonym(word))
        print(dictionary.antonym(word))
        translation = os.popen("dict -d fd-eng-fra " + word).read()
        #gs = goslate.Goslate()
        #print(gs.translate(word, "es"))
        print(translation)
main()