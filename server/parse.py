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

def find_classes_taken(blocks):
	quarters = ["FALL", "WINTER", "SPRING", "SUMMER"]
	year_quarter_regex = r"\b([\d]{4})\b\s(" + "|".join(quarters) + ")"
	units_regex1 = r"\b(\d)\b"
	units_regex2 = r"(\(\b(\d)\b\))"

	classes_taken = dict()
	for block in blocks:
		lines = block[4].upper().split("\n")
		lines = [line.strip() for line in lines]
		if len(lines) < 6: continue
		year_quarter_match = re.match(year_quarter_regex, lines[-2])
		units_match1 = re.match(units_regex1, lines[-3])
		units_match2 = re.match(units_regex2, lines[-3])

		if year_quarter_match and (units_match1 or units_match2): # found a taken class block
			year = int(year_quarter_match.group(1))
			quarter = year_quarter_match.group(2)
			year_to_year = str(year) + "-" + str(year+1) if quarter == "FALL" else str(year-1) + "-" + str(year)
			class_taken = lines[-6]
			if year_to_year not in classes_taken:
				classes_taken[year_to_year] = dict()
				for q in quarters:
					classes_taken[year_to_year][q] = list()
			if class_taken not in classes_taken[year_to_year][quarter]:
				# units = int(units_match1.group(1)) if units_match1 else int(units_match2.group(2))
				classes_taken[year_to_year][quarter].append(class_taken)
	return classes_taken

def sort_by_dept(classes_taken):
	classes_taken_by_dept = dict()
	for year_to_year in classes_taken:
		for quarter in classes_taken[year_to_year]:
			for class_taken in classes_taken[year_to_year][quarter]:
				dept, num = class_taken.split(" ")
				if dept not in classes_taken_by_dept:
					classes_taken_by_dept[dept] = [num]
				elif num not in classes_taken_by_dept[dept]:
					classes_taken_by_dept[dept].append(num)
	return classes_taken_by_dept

def find_classes_needed(blocks, classes_taken_by_dept):
	classes_needed = dict()
	for block_num, block in enumerate(blocks):
		lines = block[4].upper().split("\n")
		lines = [line.strip() for line in lines]
		if len(lines) < 3: continue
		try:
			index = lines.index("STILL NEEDED:") # raise ValueError if not found
			l = chr(32).join(lines[index+1:-1]).split(" ", 3) # ["1", "CLASS", "IN", "REST OF THE LIST ..."]
			num_classes_needed = int(l[0]) # raise ValueError if not valid convertable int
			classes_needed[block_num] = dict()
			classes_needed[block_num]["num_needed"] = num_classes_needed
			classes_needed_by_dept = parse_classes_needed(l[3])
			classes_needed[block_num]["classes"] = filter_classes_needed(classes_needed_by_dept, classes_taken_by_dept)
		except ValueError:
			continue
	return classes_needed

def parse_classes_needed(line):
	classes_needed = dict()
	classes = line.split(" OR ")
	curr_dept = ""
	for c in classes:
		words = c.split(" ")
		if len(words) == 1:
			if ":" in words[0]:
				nums = get_range(words[0]) 
				classes_needed[curr_dept].extend(nums)
			else:
				num = words[0].replace("@", "A")
				classes_needed[curr_dept].append(num)
		elif len(words) == 2:
			curr_dept = words[0]
			if ":" in words[1]:
				nums = get_range(words[1]) 
				classes_needed[curr_dept] = nums
			else:
				num = words[1].replace("@", "A")
				classes_needed[curr_dept] = [num]
	return classes_needed

def get_range(r):
	s, e = r.split(":")
	start, end = int(s), int(e)
	return [str(i) for i in range(start, end+1)]

def filter_classes_needed(classes_needed_by_dept, classes_taken_by_dept):
	for dept in classes_needed_by_dept:
		classes_needed_by_dept[dept] = [num for num in classes_needed_by_dept[dept] if (dept not in classes_taken_by_dept or num not in classes_taken_by_dept[dept])]
	return classes_needed_by_dept


with fitz.open("DG.pdf") as doc:
	data = dict()
	name = find("NAME", ["STUDENT"], doc[0])
	data["name"] = name.split(", ")[1] + " " + name.split(", ")[0]
	data["major"] = find("MAJOR", ["PROGRAM", "COLLEGE", "B.S."], doc[0])

	ll = [page.get_text("blocks")[1:] for page in doc] # list of lists of blocks for each page
	blocks = sum(ll, []) # flatten list
	classes_taken = find_classes_taken(blocks)
	data["classes_taken"] = classes_taken
	classes_taken_by_dept = sort_by_dept(classes_taken)
	data["classes_needed"] = find_classes_needed(blocks, classes_taken_by_dept)

	print(json.dumps(data))
	sys.stdout.flush()