import sys
import json
import ast
import fitz
import re

quarters = ["FALL", "WINTER", "SPRING", "SUMMER"]

def find(stringlist, stoplist, blocks):
	res = []
	for block in blocks:
		words = block[4].upper().split()
		for i, word in enumerate(words):
			if word in stringlist:
				j = i+1
				while j < len(words) and words[j] not in stoplist:
					res.append(words[j])
					j += 1
				return " ".join(res)
	
def find_student_info(blocks):
	name = find(["NAME"], [], blocks)
	name = name.split(", ")[1] + " " + name.split(", ")[0]
	major = find(["MAJOR"], ["PROGRAM", "COLLEGE", "SPECIALIZATION"], blocks)
	specialization = find(["SPECIALIZATION", "CONCENTRATION", "EMPHASIS"], [], blocks)
	gpa = find(["GPA"], [], blocks)
	return [name, major, specialization, gpa]

def match_class_taken(lines):
	year_quarter_regex = r"\b([\d]{4})\b\s(" + "|".join(quarters) + ")"
	units_regex1 = r"\b(\d)\b"
	units_regex2 = r"(\(\b(\d)\b\))"
	year_quarter_match = re.match(year_quarter_regex, lines[-2])
	units_match = re.match(units_regex1, lines[-3]) or re.match(units_regex2, lines[-3])
	return [year_quarter_match, units_match]

def find_classes_taken(blocks):
	classes_taken = dict()
	classes_taken_by_dept = dict()
	for block in blocks:
		lines = block[4].upper().split("\n")
		lines = [line.strip() for line in lines]
		if len(lines) < 6: continue

		year_quarter_match, units_match = match_class_taken(lines)
		if year_quarter_match and units_match: # found a taken class block
			year = int(year_quarter_match.group(1))
			quarter = year_quarter_match.group(2)
			year_to_year = str(year) + "-" + str(year+1) if quarter == "FALL" else str(year-1) + "-" + str(year)
			class_taken = lines[-6]
			dept, num = class_taken.split()

			if year_to_year not in classes_taken:
				classes_taken[year_to_year] = dict()
				for q in quarters:
					classes_taken[year_to_year][q] = dict()

			add_class_taken(classes_taken[year_to_year][quarter], dept, num)
			add_class_taken(classes_taken_by_dept, dept, num)
			
	return [classes_taken, classes_taken_by_dept]

def add_class_taken(d, dept, num):
	if dept not in d:
		d[dept] = [num]
	elif num not in d[dept]:
		d[dept].append(num)

def find_classes_needed(blocks, ct_by_dept):
	cn_dict = dict()
	cn_by_dept_dict = dict()
	curr_requirement = ""
	unknown_req_count = 1 # for requirements that don't have a name (if exists)
	for block in blocks:
		lines = block[4].upper().split("\n")
		lines = [line.strip() for line in lines]
		if len(lines) == 7 and match_class_taken(lines): # found a requirement block with at least one taken class
			curr_requirement = lines[0]
		if len(lines) < 3: 
			continue

		try:
			index = lines.index("STILL NEEDED:") # raise ValueError if not found
			l = chr(32).join(lines[index+1:-1]).split(" ", 3) # ["1", "CLASS", "IN", "REST OF THE LIST ..."]
			num_classes_needed = int(l[0]) # raise ValueError if not valid convertable int
			cn_by_dept = parse_classes_needed(l[3])
			# cn_by_dept = filter_classes_needed(cn_by_dept, ct_by_dept)

			if index == 1: 
				curr_requirement = lines[0]
			if curr_requirement in cn_dict:
				curr_requirement = "UNKNOWN REQUIREMENT " + str(unknown_req_count)
				na_requirement_count += 1
			cn_dict[curr_requirement] = dict()
			cn_dict[curr_requirement]["num_needed"] = num_classes_needed
			cn_dict[curr_requirement]["classes"] = cn_by_dept

			cn_by_dept_dict.update(cn_by_dept)
		except ValueError:
			continue
	return [cn_dict, cn_by_dept_dict]

def parse_classes_needed(line):
	classes_needed = dict()
	classes = line.split(" OR ")
	curr_dept = ""
	for c in classes:
		words = c.split(" ")
		if len(words) == 1:
			num = words[0].replace("@", "A")
			classes_needed[curr_dept].append(num)
		elif len(words) == 2:
			curr_dept = words[0]
			num = words[1].replace("@", "A")
			classes_needed[curr_dept] = [num]
	return classes_needed

def get_range(r):
	s, e = r.split(":")
	start, end = int(s), int(e)
	return [str(i) for i in range(start, end+1)]

# NO LONGER NEEDED
# def filter_classes_needed(classes_needed_by_dept, classes_taken_by_dept):
# 	for dept in classes_needed_by_dept:
# 		classes_needed_by_dept[dept] = [num for num in classes_needed_by_dept[dept] if (dept not in classes_taken_by_dept or num not in classes_taken_by_dept[dept])]
# 	return classes_needed_by_dept


with fitz.open("DG.pdf") as doc:
	ll = [page.get_text("blocks")[1:] for page in doc] # list of lists of blocks for each page
	blocks = sum(ll, []) # flatten list
	# for block in blocks:
	# 	print("open")
	# 	print(block[4])
	# 	print("close")
	name, major, specialization, gpa = find_student_info(blocks)
	classes_taken, classes_taken_by_dept = find_classes_taken(blocks)
	classes_needed, classes_needed_by_dept = find_classes_needed(blocks, classes_taken_by_dept)

	data = dict()
	data["name"] = name
	data["major"] = major
	data["specialization"] = specialization
	data["gpa"] = gpa
	data["classes_taken"] = classes_taken
	data["classes_taken_by_dept"] = classes_taken_by_dept
	data["classes_needed"] = classes_needed
	data['classes_needed_by_dept'] = classes_needed_by_dept

	print(json.dumps(data))
	sys.stdout.flush()