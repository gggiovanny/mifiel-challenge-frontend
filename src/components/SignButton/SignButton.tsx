import { Button, Menu } from '@mantine/core';
import { MdPerson } from 'react-icons/md';
import { Signer, Signers } from 'types/documents';

const { Dropdown, Item, Label, Target } = Menu;

type Props = {
  signers?: Signers;
  fileB64?: string;
  onSignClick: (signer: Signer, fileB64?: string) => void;
};

export default function SignButton({ signers = [], fileB64, onSignClick }: Props) {
  const createOnClickHandler = (signer: Signer) => () => {
    onSignClick(signer, fileB64);
  };

  return (
    <Menu>
      <Target>
        <Button>Sign</Button>
      </Target>

      <Dropdown>
        <Label>Choose a participant: </Label>
        {signers.map(signer => (
          <Item key={signer.email} icon={<MdPerson />} onClick={createOnClickHandler(signer)}>
            {signer.name}
          </Item>
        ))}
      </Dropdown>
    </Menu>
  );
}
