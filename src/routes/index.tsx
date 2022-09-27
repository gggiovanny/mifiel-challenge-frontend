import { Button, Center, Container, Group, List, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateDocumentModal from 'components/CreateDocumentModal';
import DownloadFileButton from 'components/DownloadFileButton';
import SignButton from 'components/SignButton';
import SignDocumentModal, { WidgetData } from 'components/SignDocumentModal';
import SignedStatusIcon from 'components/SignedStatusIcon';
import { createDocumentFormData, getDocuments } from 'providers/api/documents';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { ActionFunction, useLoaderData } from 'react-router-dom';
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
  const [openedWidgetData, setOpenedWidgetData] = useState<WidgetData | undefined>();
  const [isOpenCreationModal, { open: openCreationModal, close: closeCreationModal }] =
    useDisclosure(false);

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
    openCreationModal();
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
                <Button onClick={handleCreateDocument} leftIcon={<MdAdd size={18} />} color="cyan">
                  Create new
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map(
              ({ id, file_file_name, created_at, signers, signed, file_b64, localDocumentId }) => (
                <tr key={id}>
                  <td>
                    <Group position="left" noWrap>
                      <SignedStatusIcon signed={signed} size={14} />
                      {file_file_name}
                    </Group>
                  </td>
                  <td>
                    <List center>
                      {(signers ?? []).map(({ name, signed, id }) => (
                        <Item
                          key={id}
                          icon={<SignedStatusIcon signed={signed} size={14} signerName={name} />}
                        >
                          {name}
                        </Item>
                      ))}
                    </List>
                  </td>
                  <td>{created_at}</td>
                  <td>
                    {signed ? (
                      <DownloadFileButton id={localDocumentId || id} />
                    ) : (
                      <SignButton
                        signers={signers}
                        fileB64={file_b64}
                        onSignClick={handleSignClick}
                      />
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        {!documents.length && (
          <Center>
            <Text>
              There are no documents yet. You can create a new one with the Create New button
            </Text>
          </Center>
        )}
      </Container>
      {!!openedWidgetData && (
        <SignDocumentModal widgetData={openedWidgetData} onClose={handleCloseSignModal} />
      )}
      <CreateDocumentModal isOpen={isOpenCreationModal} onClose={closeCreationModal} />
    </>
  );
}
