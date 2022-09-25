import { Button, Center, List, Stack, Text, Title } from '@mantine/core';
import useGoBack from 'hooks/useGoBack';
import { ResponseError } from 'providers/api/apiRequest';
import { useRouteError } from 'react-router-dom';

type ErrorPageError = {
  status?: string;
  statusText?: string;
  message?: string;
} & Partial<ResponseError>;

const { Item } = List;

export default function ErrorPage() {
  const goBack = useGoBack();
  const error = useRouteError() as ErrorPageError;
  const message = error?.statusText || error?.message;
  const status = error.status || error.statusCode;
  const messages = error.messages;

  return (
    <Center sx={{ height: '100%' }}>
      <Stack align={'center'}>
        <Title order={1}>Chale, ha ocurrido un error{status && `: ${status}`}</Title>
        {messages && (
          <List>
            {messages.map((message, index) => (
              <Item key={`error-message-${index}`}>{message}</Item>
            ))}
          </List>
        )}
        {message && !messages && <Text size="lg">{message.toString()}</Text>}
        <Button onClick={goBack}>Regresar</Button>
      </Stack>
    </Center>
  );
}
