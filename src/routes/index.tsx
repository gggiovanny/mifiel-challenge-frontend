import { Button, Center, Container, Table, Title } from '@mantine/core';
import { DocumentResponse } from '@mifiel/models';
import { MIFIEL_BASE_URL } from 'constants/apiUrls';
import apiRequest from 'providers/apiRequest';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import getSingnersString from 'utils/getSingnersString';

type Documents = Array<DocumentResponse & { file_b64?: string }>;

export const loader = () => {
  return apiRequest('/documents');
};

export default function Index() {
  const documents = useLoaderData() as Documents;

  return (
    <Container>
      <Title order={1}>Documents</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Participants</th>
            <th>Created at</th>
            <th>
              <Center>Signed</Center>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {documents.map(({ id, file_file_name, created_at, signers, signed, file }) => (
            <tr key={id}>
              <td>{file_file_name}</td>
              <td>{getSingnersString(signers)}</td>
              <td>{created_at}</td>
              <td>
                <Center>
                  {signed ? (
                    <MdCheckCircle color="green" size={20} />
                  ) : (
                    <MdCancel color="red" size={20} />
                  )}
                </Center>
              </td>
              <td>
                <Button
                  component="a"
                  href={file ? new URL(file, MIFIEL_BASE_URL).toString() : ''}
                  target="_blank"
                >
                  View document
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
