import { useState } from 'react';
import { Paper, Title, Divider, Group } from '@mantine/core'
import ClassesNeededTabs from './ClassesNeededTabs';
import CNAll from './CNAll';
import CNEligible from './CNEligible';
import CNEligibleOffered from './CNEligibleOffered';

function ClassesNeeded() {
    const [tab, setTab] = useState("All");

    return (
        <div className="classes-needed">
            <Paper shadow="xs" radius="md" withBorder p="lg" bg="#FDFDFD" mt="lg">
                <Group>
                    <Title order={4}>Classes Needed</Title>
                    <ClassesNeededTabs setTab={setTab}/>
                </Group>
                <Divider />
                {tab === "All" && <CNAll />}
                {tab === "Eligible" && <CNEligible />}
                {tab === "Eligible & Offered" && <CNEligibleOffered />}
            </Paper>
        </div>
    );
}

export default ClassesNeeded;