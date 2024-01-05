function verifyAndUpdateClasses(classesNeeded, allClassesByDept) {
  for (const classes of Object.values(classesNeeded)) {
    for (const [dept, classList] of Object.entries(classes["classes"])) {
      newClassList = [];
      for (const className of classList) {
        if (className.includes(":")) { // expand ranges
          const [start, end] = className.split(":");
          const startIndex = allClassesByDept[dept].indexOf(start);
          const endIndex = allClassesByDept[dept].indexOf(end);
          const expandedRange = allClassesByDept[dept].slice(startIndex, endIndex + 1);
          newClassList.push(...expandedRange);
        } else {
          if (!(allClassesByDept[dept].includes(className))) { // verify class exists
            console.log("ERROR: " + dept + " " + className + " does not exist");
            continue;
          }
          newClassList.push(className);
        }
      }
      classes["classes"][dept] = newClassList;
    }
  }
}

function makeAliasesQuery(classesTakenByDept) {
  let query = "query {";
  for (const [dept, classList] of Object.entries(classesTakenByDept)) {
    for (const className of classList) {
      const classId = (dept + className).replaceAll(" ", "");
      classKey = classId.replaceAll("&", "").replaceAll("/", "");
      query += classKey + ": course(id: \"" + classId + "\") { same_as }";
    }
  }
  query += "}";
  return query;
}

async function getAliases(classesTakenByDept, client, gql) {
  const query = makeAliasesQuery(classesTakenByDept);
  const { data } = await client.query({
    query: gql`${query}`
  }).catch((err) => {
    console.log(err);
  });
  aliases = {};
  for (const [dept, classList] of Object.entries(classesTakenByDept)) {
    for (const className of classList) {
      const classId = (dept + className).replaceAll("&", "").replaceAll("/", "");
      if (data[classId]["same_as"] != "") {
        let alias = data[classId]["same_as"].replaceAll("&", "").replaceAll("/", "").replaceAll(".", "");
        if (!(dept in aliases)) {
          aliases[dept] = {};
        }
        aliases[dept][className] = [];
        aliases[dept][className].push(...alias.split(", "));
      }
    }
  }
  console.log("aliases: ", aliases);
  return aliases;
}

function makePrereqsQuery(classesNeeded) {
  let query = "query {";
  for (const classes of Object.values(classesNeeded)) {
    for (const [dept, classList] of Object.entries(classes["classes"])) {
      for (const className of classList) {
        const classId = (dept + className).replaceAll(" ", "");
        classKey = classId.replaceAll("&", "").replaceAll("/", "");
        query += classKey + ": course(id: \"" + classId + "\") { prerequisite_tree }";
      }
    }
  }
  query += "}";
  return query;
}

async function getEligibleClasses(classesNeeded, classesTakenByDept, aliases, client, gql) {
  const query = makePrereqsQuery(classesNeeded);
  const { data } = await client.query({
    query: gql`${query}`,
  }).catch((err) => {
    console.log(err);
  });
  const eligibleClasses = structuredClone(classesNeeded);
  for (const classes of Object.values(eligibleClasses)) {
    for (const [dept, classList] of Object.entries(classes["classes"])) {
      eligibleClassList = [];
      ineligibleClassList = [];
      for (const className of classList) { 
        const classId = (dept + className).replaceAll(" ", "");
        const classKey = classId.replaceAll("&", "").replaceAll("/", "");
        const prereqTree = data[classKey]["prerequisite_tree"];
        if (prereqTree == "" || isEligible(JSON.parse(prereqTree), classesTakenByDept, aliases)) {
          eligibleClassList.push(className);
        } else {
          ineligibleClassList.push(className);
        }
      }
      if (eligibleClassList.length == 0) {
        delete classes["classes"][dept];
      } else {
        classes["classes"][dept] = eligibleClassList;
      }
      // console.log("Department", dept);
      // console.log(eligibleClassList);
      // console.log(ineligibleClassList);
    }
  }
  return eligibleClasses; 
}

function isEligible(prereqTree, classesTakenByDept, aliases) {
  if (typeof(prereqTree) == "string") {
    const prereqSplit = prereqTree.split(" ");
    if (prereqSplit[0] == "AP") {
      return true;
      // TODO: check if student has taken AP class
    } else {
      const prereqClass = (prereqSplit.length == 3) ? prereqTree.replace(" ", "") : prereqTree;
      const [dept, num] = prereqClass.split(" ");
      if (dept in classesTakenByDept) {
        if (classesTakenByDept[dept].includes(num) || (dept in aliases && num in aliases[dept] && aliases[dept][num].includes(classesTakenByDept[dept]))) {
          return true;
        } else {
          console.log(num, "not in classesTakenByDept[", dept, "] or aliases[", dept, "]");
          return false;
        }
      } else {
        console.log(dept, "not in classesTakenByDept");
        return false;
      }
    }
  }

  if ("AND" in prereqTree) {
    for (const prereq of prereqTree["AND"]) {
      if (!(isEligible(prereq, classesTakenByDept, aliases))) {
        return false;
      }
    }
    return true;
  } else if ("OR" in prereqTree) {
    for (const prereq of prereqTree["OR"]) {
      if (isEligible(prereq, classesTakenByDept, aliases)) {
        return true;
      }
    }
    return false;
  }
  console.log("ERROR: prereqTree is neither string nor AND/OR")
  return false;
}

module.exports = { 
  verifyAndUpdateClasses,
  getAliases,
  getEligibleClasses
};