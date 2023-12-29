import { Table, Skeleton } from '@mantine/core';

function Quarter({quarterName, quarterData}) {
  const renderRows = () => {
    if (Object.keys(quarterData).length === 0) {
      return (
        <>
          <Table.Tr>
            <Table.Td>
              <Skeleton height={20} radius="sm" />
            </Table.Td>
          </Table.Tr>
        </>
      );
    } else {
      return quarterData.map((classTaken) => (
        <Table.Tr key={classTaken}>
            <Table.Td>{classTaken}</Table.Td>
        </Table.Tr>
      ));
    }
  };

  return (
    <>
      <div className="quarter">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{quarterName}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{renderRows()}</Table.Tbody>
        </Table>
      </div>    
    </>
  )
}

export default Quarter