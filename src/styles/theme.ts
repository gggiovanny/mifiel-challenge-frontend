import type { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'green',
  components: {
    Modal: {
      styles: {
        title: {
          fontWeight: 500,
        },
      },
    },
  },
};
