import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useStudentContext } from '../contexts/StudentContext';

function ParsingNotification() {
    const { parsingStatus } = useStudentContext();

    const xIcon = <IconX style={{ width: "rem(20)", height: "rem(20)" }} />;
    const checkIcon = <IconCheck style={{ width: "rem(20)", height: "rem(20)" }} />;

    useEffect(() => {   
        if (parsingStatus === "success") {
            showNotification({
                title: 'Success',
                message: 'File parsed successfully!',
                color: 'teal',
                icon: checkIcon,
            })
        } else if (parsingStatus === "fail") {
            showNotification({
                title: 'Error',
                message: 'File parse failed! Please make sure your PDF follows our expected structure.',
                color: 'red',
                icon: xIcon,
            })
        } else if (parsingStatus === "parsing") {
            showNotification({
                title: 'Please wait',
                message: 'Parsing selected file...',
                loading: true,
            })
        }
    }, [parsingStatus])
}

export default ParsingNotification;