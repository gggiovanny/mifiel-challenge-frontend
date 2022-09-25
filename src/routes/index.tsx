import { Button, Center, Container, Table, Title } from '@mantine/core';
import SignButton from 'components/SignButton';
import SignDocumentModal, { WidgetData } from 'components/SignDocumentModal';
import { loremLongText } from 'constants/defaults';
import { createDocumentFormData, getDocuments } from 'providers/api/documents';
import { useState } from 'react';
import { MdAdd, MdCancel, MdCheckCircle } from 'react-icons/md';
import { ActionFunction, useFetcher, useLoaderData } from 'react-router-dom';
import { CreateDocumentPayload, Documents, Signer } from 'types/documents';
import getSingnersString from 'utils/getSingnersString';

export const loader = getDocuments;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newDocument = Object.fromEntries(formData);
  return createDocumentFormData(newDocument as CreateDocumentPayload);
};

export default function Index() {
  const documents = useLoaderData() as Documents;
  const fetcher = useFetcher();

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

  function handleCreateDocument() {
    const payload = new FormData();
    payload.append('title', 'My cool document from react');
    payload.append('content', loremLongText);
    payload.append('callback_url', 'https://xddd/on-document-signed');
    payload.append('signatories[0].[name]', 'Giovanny González Baltazar');
    payload.append('signatories[0].[email]', 'giovanny.gonzalez.19@gmail.com');
    fetcher.submit(payload, { method: 'post' });
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
              <th>
                <Button onClick={handleCreateDocument} leftIcon={<MdAdd size={18} />} color="cyan">
                  Create new
                </Button>
              </th>
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
                      <MdCancel color="gray" size={20} />
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
