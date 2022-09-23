import { Button, Center, Stack, Text, Title } from '@mantine/core';
import useGoBack from 'hooks/useGoBack';
import { useRouteError } from 'react-router-dom';

type Error = { status?: string; statusText?: string; message?: string };

export default function ErrorPage() {
  const goBack = useGoBack();
  const error = useRouteError() as Error;
  const errorMessage = error?.statusText || error?.message;

  return (
    <Center sx={{ height: '100%' }}>
      <Stack align={'center'}>
        <Title order={1}>Chale, ha ocurrido un error{error.status && `: ${error.status}`}</Title>
        {errorMessage && <Text size="lg">{errorMessage}</Text>}
        <Button onClick={goBack}>Regresar</Button>
      </Stack>
    </Center>
  );
}
