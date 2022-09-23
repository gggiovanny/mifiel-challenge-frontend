import { DocumentResponse } from '@mifiel/models';

export default (signers?: DocumentResponse['signers']) =>
  signers?.reduce((acc, signer) => (acc ? `${acc}, ${signer.name}` : `${signer.name}`), '');
