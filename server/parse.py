import sys
import json
import ast
import fitz
import re

def find(string, stoplist, page):
	words = page.get_text("words")
	res = ""
	for i, word in enumerate(words):
		if word[4].upper() == string:
			j = i+1
			while j < len(words) and words[j][4].upper() not in stoplist:
				res += words[j][4] + " "
				j += 1
			break
	return res.strip()

doc = fitz.open("DegreeWorks.pdf")
# doc = fitz.open(sys.argv[1]) # open a document
out = open("output.txt", "wb") # create a text output

for page in doc: # iterate the document pages
	if page.number == 0:
		major = find("MAJOR", ["PROGRAM", "COLLEGE"], page)
		name = find("NAME", ["STUDENT"], page)
	text = page.get_text().encode("utf-8") # get plain text (could also omit "utf-8")
	out.write(text) # write text of page
	out.write(bytes((12,))) # write page delimiter (form feed 0x0C)
	
	# words = page.get_text("words") # list of words on page
	# for word in words:
	# 	out.write(word[4].encode("utf-8")) # write word encoding UTF-8
	# 	out.write(bytes((10,))) # write line delimiter (LF 0x0A)
out.close()

quarters = ["FALL", "WINTER", "SPRING", "SUMMER"]

quarter_regex = r"^([\d]{4})\s(" + "|".join(quarters) + ")"
units_regex1 = r"\b(\d)\b"
units_regex2 = r"(\(\b(\d)\b\))"

classes_taken = dict()
with open("output.txt", "r") as file:
	lines = file.readlines()
	for i, line in enumerate(lines):
		quarter_match = re.match(quarter_regex, line, re.IGNORECASE)

		if quarter_match: # check if line is a quarter
			units_match1 = re.match(units_regex1, lines[i-1])
			units_match2 = re.match(units_regex2, lines[i-1])

			if units_match1 or units_match2: # check if line before has valid units
				year = int(quarter_match.group(1))
				quarter = quarter_match.group(2)
				year_to_year = str(year) + "-" + str(year+1) if quarter == "FALL" else str(year-1) + "-" + str(year)
				class_taken = lines[i-4].strip()
				if year_to_year not in classes_taken:
					classes_taken[year_to_year] = dict()
					for q in quarters:
						classes_taken[year_to_year][q] = list()
				if class_taken not in classes_taken[year_to_year][quarter]:
					# units = int(units_match1.group(1)) if units_match1 else int(units_match2.group(2))
					classes_taken[year_to_year][quarter].append(class_taken)

data = dict()
data["name"] = name.split(", ")[1] + " " + name.split(", ")[0]
data["major"] = major
data["classes_taken"] = classes_taken
print(json.dumps(data))
sys.stdout.flush()