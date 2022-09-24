import { DocumentResponse } from '@mifiel/models';

export type Documents = Array<DocumentResponse & { file_b64?: string }>;

export type Signers = NonNullable<DocumentResponse['signers']>;
export type Signer = Signers[number];
