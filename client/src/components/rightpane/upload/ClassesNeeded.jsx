import React from 'react';
import { Paper, Title, Text, Divider } from '@mantine/core'

function ClassesNeeded({ studentClassesNeeded }) {
    const blocks = Object.entries(studentClassesNeeded).map(([block, classesNeeded]) => {
        const { num_needed, classes } = classesNeeded;
        const classText = num_needed === 1 ? "class" : "classes";

        return (
            <React.Fragment key={block}>
                <Text mt="md"><b>{num_needed}</b> {classText} required from:</Text>
                {Object.entries(classes).map(([dept, classList]) => (
                    <Text key={dept} ml="lg" c="#0077b6"><b>{dept}</b>:
                        <Text component="span" ml="xs" c="rgb(33, 37, 41)">{classList.join(", ")}</Text>
                    </Text>
                ))}
            </React.Fragment>
        );
    });

    return (
        <div className="classes-needed">
            <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD" mt="lg">
                <Title order={4}>Classes Needed</Title>
                <Divider />
                {blocks}
            </Paper>
        </div>
    );
}

export default ClassesNeeded;