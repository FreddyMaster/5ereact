import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    margin: `${rem(5)}`,
    zIndex: 0,
    width: '150px',
    boxSizing: 'border-box',
  },
}));

export default useStyles;
