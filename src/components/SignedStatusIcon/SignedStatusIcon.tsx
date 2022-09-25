import { Tooltip, useMantineTheme } from '@mantine/core';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

import { IconAligner } from './SignedStatusIcon.styled';

type Props = {
  signed?: boolean;
  size?: number;
  signerName?: string;
};

export default function SignedStatusIcon({ signed, signerName, ...rest }: Props) {
  const { colors } = useMantineTheme();

  const message = signerName
    ? `${signerName} has ${signed ? '' : 'not '} signed yet`
    : `Document has ${signed ? '' : 'not '}been signed by all the participants`;
  return (
    <Tooltip label={message} withArrow>
      <IconAligner>
        {signed ? (
          <MdCheckCircle color={colors.green[4]} {...rest} />
        ) : (
          <MdCancel color={colors.yellow[4]} {...rest} />
        )}
      </IconAligner>
    </Tooltip>
  );
}
