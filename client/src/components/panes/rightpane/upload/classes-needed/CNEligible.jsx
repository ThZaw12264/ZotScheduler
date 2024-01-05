import React from "react";
import { Text } from "@mantine/core";
import { useStudentContext } from "../../../../../contexts/StudentContext";

function CNEligible() {
    const { studentClasses } = useStudentContext();

    const requirements = Object.entries(studentClasses["eligible"]).map(([requirement, classesEligible]) => {
        const { num_needed, classes } = classesEligible;
        const classText = num_needed === 1 ? "class" : "classes";

        return (
            <React.Fragment key={requirement}>
                <Text mt="lg" c="#0077b6">
                    <b>{requirement}</b>
                </Text>
                <Text mt={2}>
                    <b>{num_needed}</b> {classText} needed left from:
                </Text>
                {Object.entries(classes).map(([dept, classList]) => (
                    <Text key={dept} ml="lg" c="#0077b6">{dept}:
                        <Text component="span" ml="xs" c="rgb(33, 37, 41)">
                            {classList.join(", ")}
                        </Text>
                    </Text>
                ))}
            </React.Fragment>
        );
    });

    return (
        requirements
    );
}

export default CNEligible;