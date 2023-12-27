import { Paper, Title, Divider, TextInput } from '@mantine/core';

function Profile({studentName, studentMajor, setStudentName, setStudentMajor}) {
    return (
        <>
            <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD" w="50%">
                <Title order={4}>Profile</Title>
                <Divider pb="xs"/>
                <TextInput
                    type="text"
                    label="Student Name"
                    value={studentName}
                    onChange={(e) => {setStudentName(e.target.value)}}
                    pb="xs"
                ></TextInput>
                <TextInput
                    type="text"
                    label="Major"
                    value={studentMajor}
                    onChange={(e) => {setStudentMajor(e.target.value)}}
                ></TextInput>
            </Paper>
        </>
    )
}

export default Profile