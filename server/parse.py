import sys
import json
import ast
import fitz

doc = fitz.open(sys.argv[1]) # open a document
out = open("output.txt", "wb") # create a text output
for page in doc: # iterate the document pages
	if page.number == 0:
		words = page.get_text("words")
		major = ""
		for i, word in enumerate(words):
			if word[4] == "Major":
				for j in range(i+1, min(i+10, len(words))):
					if words[j][4] in ["Program", "College"]:
						break
					major += words[j][4] + " "
				break
		major = major.strip()
	text = page.get_text().encode("utf8") # get plain text (is in UTF-8)
	out.write(text) # write text of page
	out.write(bytes((12,))) # write page delimiter (form feed 0x0C)
out.close()
print(major)
sys.stdout.flush()