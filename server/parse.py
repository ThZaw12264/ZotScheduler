import sys
import json
import ast
import fitz

def find(string, stoplist, page):
	words = page.get_text("words")
	res = ""
	for i, word in enumerate(words):
		if word[4] == string:
			j = i+1
			while j < len(words) and words[j][4] not in stoplist:
				res += words[j][4] + " "
				j += 1
			break
	return res.strip()

doc = fitz.open("DegreeWorks.pdf")
# doc = fitz.open(sys.argv[1]) # open a document
out = open("output.txt", "wb") # create a text output
for page in doc: # iterate the document pages
	if page.number == 0:
		major = find("Major", ["Program", "College"], page)
		name = find("name", ["Student"], page)
	text = page.get_text().encode("utf8") # get plain text (is in UTF-8)
	out.write(text) # write text of page
	out.write(bytes((12,))) # write page delimiter (form feed 0x0C)
out.close()
data = dict()
data["name"] = name
data["major"] = major
print(json.dumps(data))
sys.stdout.flush()