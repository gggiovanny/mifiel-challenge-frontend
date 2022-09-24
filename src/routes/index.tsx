import { Center, Container, Table, Title } from '@mantine/core';
import SignButton from 'components/SignButton';
import SignDocumentModal, { WidgetData } from 'components/SignDocumentModal';
import apiRequest from 'providers/apiRequest';
import { useState } from 'react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import { Documents, Signer } from 'types/documents';
import getSingnersString from 'utils/getSingnersString';

export const loader = () => {
  return apiRequest('/documents');
};

export default function Index() {
  const documents = useLoaderData() as Documents;

  const [openedWidgetData, setOpenedWidgetData] = useState<WidgetData | undefined>();

  function handleCloseSignModal() {
    setOpenedWidgetData(undefined);
  }

  function handleSignClick(signer: Signer, fileB64?: string) {
    setOpenedWidgetData({
      widgetId: signer.widget_id as string,
      fileB64,
    });
  }

  return (
    <>
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
            {documents.map(({ id, file_file_name, created_at, signers, signed, file_b64 }) => (
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
                  <SignButton signers={signers} fileB64={file_b64} onSignClick={handleSignClick} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {!!openedWidgetData && (
        <SignDocumentModal widgetData={openedWidgetData} onClose={handleCloseSignModal} />
      )}
    </>
  );
}
