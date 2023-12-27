import { Card, Text, styled } from '@kahzita-ignite-ui/react';

export const Form = styled(Card, {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$4',
  marginTop: '$4',
  padding: '$4',

  '@media(min-width: 600px)': {
    gridTemplateColumns: '1fr auto',
  },
});

export const FormHelperText = styled(Text, {
  marginTop: '$1',
  color: '#DB4437 !important',
});