import { Button, Group, Modal, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { API_PUBLIC_BASE_URL } from 'constants/apiUrls';
import { loremLongText } from 'constants/defaults';
import useIsMobile from 'hooks/useIsMobile';
import { useState } from 'react';
import { MdAdd, MdDelete, MdEmail, MdPerson, MdTitle } from 'react-icons/md';
import { Form } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export default function CreateDocumentModal({ isOpen, onClose }: Props) {
  const isMobile = useIsMobile();
  const [participantsIndexes, setParticipantsIndexes] = useState([undefined]);

  function handleAddParticipant() {
    setParticipantsIndexes([...participantsIndexes, undefined]);
  }

  function handleOnClose() {
    setParticipantsIndexes([undefined]);
    onClose();
  }

  function removeLastParticipant() {
    if (participantsIndexes.length <= 1) return;
    setParticipantsIndexes(participantsIndexes.slice(0, -1));
  }

  return (
    <Modal
      title="Create new document"
      opened={isOpen}
      onClose={handleOnClose}
      fullScreen={isMobile}
      transition="slide-up"
      size="lg"
    >
      <Form method="post" onSubmit={handleOnClose}>
        <Stack>
          <TextInput
            name="title"
            label="Title"
            placeholder="An cool document title"
            icon={<MdTitle />}
            defaultValue="An cool title from react form"
          />
          <Textarea
            name="content"
            label="Content"
            autosize
            minRows={5}
            maxRows={10}
            defaultValue={loremLongText}
          />

          <Title order={5}>Participants</Title>
          {participantsIndexes.map((_, participantIndex) => (
            <Group grow key={participantIndex}>
              <TextInput
                name={`signatories[${participantIndex}].[name]`}
                label={`Name ${participantIndex}`}
                placeholder="John Doe"
                icon={<MdPerson />}
                defaultValue={participantIndex === 0 ? 'Giovanny Gonzalez Baltazar' : undefined}
              />
              <TextInput
                name={`signatories[${participantIndex}].[email]`}
                label="E-mail"
                type="email"
                placeholder="your-email@email.com"
                icon={<MdEmail />}
                defaultValue={participantIndex === 0 ? 'giovanny.gonzalez.19@gmail.com' : undefined}
              />
            </Group>
          ))}
          <Group position="right">
            <Button
              onClick={removeLastParticipant}
              leftIcon={<MdDelete />}
              color="red"
              disabled={participantsIndexes.length <= 1}
            >
              Delete last added participant
            </Button>
            <Button onClick={handleAddParticipant} leftIcon={<MdAdd />}>
              Add participant
            </Button>
          </Group>

          <TextInput
            name="callback_url"
            label="Callback URL"
            placeholder="https://your-domain.net/on-document-signed"
            defaultValue={`${API_PUBLIC_BASE_URL}/on-document-signed`}
          />

          <Button type="submit">Create document</Button>
        </Stack>
      </Form>
    </Modal>
  );
}
