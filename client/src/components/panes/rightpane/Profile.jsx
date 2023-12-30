import { Paper, Title, Divider, TextInput, Group } from '@mantine/core';

function Profile({studentName, studentMajor, setStudentName, setStudentMajor}) {
    return (
        <>
            <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD" w="50%">
                <Title order={4}>Profile</Title>
                <Divider />
                <Group mt="xs">
                    <TextInput
                        type="text"
                        label="Student Name"
                        value={studentName}
                        onChange={(e) => {setStudentName(e.target.value)}}
                    ></TextInput>
                    <TextInput
                        type="text"
                        label="Major"
                        value={studentMajor}
                        onChange={(e) => {setStudentMajor(e.target.value)}}
                    ></TextInput>
                </Group>
            </Paper>
        </>
    )
}

export default Profile