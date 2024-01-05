import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({children}) {
    const [studentProfile, setStudentProfile] = useState({
      name: "",
      major: "",
      specialization: "",
      gpa: ""
    });

    const [studentClasses, setStudentClasses] = useState({
      taken: {},
      takenByDept: {},
      needed: {},
      neededByDept: {},
      eligible: {}
    });

    const [parsingStatus, setParsingStatus] = useState();
    
    return (
      <StudentContext.Provider value={{studentProfile, setStudentProfile, studentClasses, setStudentClasses, parsingStatus, setParsingStatus}}>
        {children}
      </StudentContext.Provider>
    )
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
}