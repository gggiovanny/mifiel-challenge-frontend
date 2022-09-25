import { Button, Container, Group, List, Table, Title } from '@mantine/core';
import SignButton from 'components/SignButton';
import SignDocumentModal, { WidgetData } from 'components/SignDocumentModal';
import SignedStatusIcon from 'components/SignedStatusIcon';
import { loremLongText } from 'constants/defaults';
import { createDocumentFormData, getDocuments } from 'providers/api/documents';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { ActionFunction, useFetcher, useLoaderData } from 'react-router-dom';
import { CreateDocumentPayload, Documents, Signer } from 'types/documents';

const { Item } = List;

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

  const isCreatingDocument = fetcher.state !== 'idle';

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
                <Button
                  onClick={handleCreateDocument}
                  leftIcon={<MdAdd size={18} />}
                  color="cyan"
                  loading={isCreatingDocument}
                >
                  Create new
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map(({ id, file_file_name, created_at, signers, signed, file_b64 }) => (
              <tr key={id}>
                <td>
                  <Group position="left" noWrap>
                    <SignedStatusIcon signed={signed} size={14} />
                    {file_file_name}
                  </Group>
                </td>
                <td>
                  <List center>
                    {(signers ?? []).map(({ name, signed }) => (
                      <Item icon={<SignedStatusIcon signed={signed} size={14} signerName={name} />}>
                        {name}
                      </Item>
                    ))}
                  </List>
                </td>
                <td>{created_at}</td>
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
