import { Table } from '@mantine/core';

const data = [
  {
    class: "ICS53"
  },
  {
    class: "ICS31"
  },
  {
    class: "CS121"
  }
]  

function Quarter({quarter}) {
  const rows = data.map((row) => (
    <Table.Tr key={row.class}>
        <Table.Td>{row.class}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="quarter">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{quarter}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>    
    </>
  )
}

export default Quarter