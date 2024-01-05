import { Paper, Title, Divider, TextInput, NumberInput, Group } from '@mantine/core';
import { useStudentContext } from '../../../../contexts/StudentContext';
import classes from './Profile.module.css';

function Profile() {
  const { studentProfile, setStudentProfile } = useStudentContext();

  return (
    <>
      <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD">
        <Title order={4} className={classes.title}>Profile</Title>
        <Divider />
        <Group grow mt="xs">
          <TextInput
            type="text"
            label="Student Name"
            value={studentProfile["name"]}
            onChange={(e) => setStudentProfile({ ...studentProfile, name: e.target.value })}
            classNames={{ label: classes.label }}
          ></TextInput>
  
          <TextInput
            type="text"
            label="Major"
            value={studentProfile["major"]}
            onChange={(e) => setStudentProfile({ ...studentProfile, major: e.target.value })}
            classNames={{ label: classes.label }}
          ></TextInput>
  
          <TextInput
            type="text"
            label="Specialization"
            value={studentProfile["specialization"]}
            onChange={(e) => setStudentProfile({ ...studentProfile, specialization: e.target.value })}
            classNames={{ label: classes.label }}
          ></TextInput>
  
          <NumberInput
            type="number"
            label="GPA"
            value={studentProfile["gpa"]}
            clampBehavior="strict"
            min={0}
            max={4}
            decimalScale={3}
            rightSection={<></>}
            onChange={(e) => setStudentProfile({ ...studentProfile, gpa: e })}
            classNames={{ label: classes.label }}
          ></NumberInput>
        </Group>
      </Paper>
    </>
  )
}

export default Profile