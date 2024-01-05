import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { useStudentContext } from '../../../../contexts/StudentContext';
import classes from './DegreeWorksUploader.module.css';

function DegreeWorksUploader() {
  const { setStudentProfile, setStudentClasses, setParsingStatus } = useStudentContext();

  const theme = useMantineTheme();
  const openRef = useRef(null);

  const handleUpload = async (file) => {
    setParsingStatus("parsing");

    const formData = new FormData();
    formData.append("file", file);

    try {
      fetch("/api/parse", {
        method: "POST",
        body: formData,
      }).then(
        response => response.json()
      ).then(
        data => {
          console.log(data);
          setStudentProfile({
            name: data["name"],
            major: data["major"],
            specialization: data["specialization"],
            gpa: data["gpa"]
          });
          setStudentClasses({
            taken: data["classes_taken"],
            takenByDept: data["classes_taken_by_dept"],
            needed: data["classes_needed"],
            neededByDept: data["classes_needed_by_dept"],
            eligible: data["classes_eligible"]
          });
          setParsingStatus("success");
        }
      );
    } catch (error) {
      console.error(error);
      setParsingStatus("fail");
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(file) => {handleUpload(file[0])}}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.pdf]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="md">
              <Dropzone.Accept>Drop file here</Dropzone.Accept>
              <Dropzone.Reject>Must be a PDF with 30MB or less</Dropzone.Reject>
              <Dropzone.Idle>Upload DegreeWorks</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag and drop your DegreeWorks PDF file here to upload. Must be 30MB or less.
            </Text>
          </div>
        </Dropzone>

        <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
          Select file
        </Button>
      </div>
    </>
  );
};

export default DegreeWorksUploader;