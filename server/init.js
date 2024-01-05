async function getAllClasses(client, gql) {
  const { data } = await client.query({
    query: gql`
      query {
        allCourses {
          department
          number
        }
      }`
  }).catch((err) => {
    console.log(err);
  });
  var allClassesByDept = {};
  for (const course of data["allCourses"]) {
    const dept = course["department"].replaceAll(" ", "");
    const num = course["number"];
    if (!(dept in allClassesByDept)) {
      allClassesByDept[dept] = [];
    }
    allClassesByDept[dept].push(num);
  }
  sortAllClasses(allClassesByDept);
  console.log(allClassesByDept);
  return allClassesByDept;
}

function sortAllClasses(allClassesByDept) {
  var collator = new Intl.Collator([], {numeric: true});
  for (const dept of Object.keys(allClassesByDept)) {
    allClassesByDept[dept].sort((a, b) => collator.compare(a, b));
  }
}

module.exports = {
  getAllClasses
};