import { DocumentResponse } from '@mifiel/models';

export type Documents = Array<DocumentResponse & { file_b64?: string }>;

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
