import { DocumentResponse } from '@mifiel/models';

export type Documents = Array<DocumentResponse & { file_b64?: string; localDocumentId?: string }>;

export type Signers = NonNullable<DocumentResponse['signers']>;
export type Signer = Signers[number];

export type CreateDocumentPayload = {
  title: string;
  content: string;
  callback_url: string;
  'signatories[].[name]': string;
  'signatories[].[email]': string;
  'signatories[].[tax_id]'?: string;
};

export enum FileType {
  SignedPdf = 'signed_pdf',
  SignedXml = 'signed_xml',
}

export type DownloadDocumentParams = {
  id: string;
  fileType: FileType;
};
