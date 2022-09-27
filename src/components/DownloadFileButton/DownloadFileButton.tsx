import { Button, Menu } from '@mantine/core';
import { getDownloadDocumentLink } from 'providers/api/documents';
import { GrDocumentDownload, GrDocumentPdf } from 'react-icons/gr';
import { FileType } from 'types/documents';

const { Dropdown, Item, Label, Target } = Menu;

type Props = {
  id?: string;
};

export default function DownloadFileButton({ id }: Props) {
  if (!id) {
    return <Button disabled>Download</Button>;
  }

  return (
    <Menu withArrow>
      <Target>
        <Button>Download</Button>
      </Target>
      <Dropdown>
        <Label>Choose a file type</Label>
        <Item
          icon={<GrDocumentPdf />}
          component="a"
          href={getDownloadDocumentLink(id, FileType.SignedPdf)}
        >
          PDF
        </Item>
        <Item
          icon={<GrDocumentDownload />}
          component="a"
          href={getDownloadDocumentLink(id, FileType.SignedXml)}
        >
          XML
        </Item>
      </Dropdown>
    </Menu>
  );
}
