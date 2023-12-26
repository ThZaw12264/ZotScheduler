import { useEffect, useState } from 'react';
import { Paper, Title, Divider, TextInput } from '@mantine/core';

function Profile({data}) {
    const [name, setName] = useState("");   
    const [major, setMajor] = useState("");

    useEffect(() => {
        setName(data["name"] || "");
        setMajor(data["major"] || "");
    }, [data]);
     
    return (
        <>
            <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD" w="50%">
                <Title order={4}>Profile</Title>
                <Divider pb="xs"/>
                <TextInput
                    type="text"
                    label="Student Name"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                    pb="xs"
                ></TextInput>
                <TextInput
                    type="text"
                    label="Major"
                    value={major}
                    onChange={(e) => {setMajor(e.target.value)}}
                ></TextInput>
            </Paper>
        </>
    )
}

export default Profile