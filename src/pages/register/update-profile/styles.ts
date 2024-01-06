import { Card, Text, styled } from '@kahzita-ignite-ui/react';

export const ProfileCard = styled(Card, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  [`${Text}`]: {
    marginBottom: '$2'
  },

  textarea: {
    width: '100%',
  }
});

export const HelperText = styled(Text, {
  color: '$gray200',
});
