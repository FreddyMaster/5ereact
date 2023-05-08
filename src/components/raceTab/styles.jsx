import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    root: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      borderRadius: theme.radius.sm,
    },
  
    item: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      border: `${rem(1)} solid transparent`,
      position: 'relative',
      zIndex: 0,
      transition: 'transform 150ms ease',
      marginBottom: `${rem(16)}`, // Add margin to create gaps between items
  
      '&[data-active]': {
        transform: 'scale(1.03)',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: theme.shadows.md,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
        borderRadius: theme.radius.md,
        zIndex: 1,
      },
    },
  
    chevron: {
      '&[data-rotate]': {
        transform: 'rotate(-90deg)',
      },
    },
  }));
  
  export default useStyles;
  