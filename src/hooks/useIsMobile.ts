import { useMediaQuery } from '@mantine/hooks';

export default function () {
  return useMediaQuery(`(max-width: 768px)`);
}
