import { Signers } from 'types/documents';

export default (signers?: Signers) =>
  signers?.reduce((acc, signer) => (acc ? `${acc}, ${signer.name}` : `${signer.name}`), '');
