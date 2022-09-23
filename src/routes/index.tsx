import { Code, Container, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const data = await fetch('http://localhost:3001/documents').then(res => res.json());
  return data;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <Container>
      <Title order={1}>Hola Mundo</Title>
      <Code>{JSON.stringify(data)}</Code>
    </Container>
  );
}
