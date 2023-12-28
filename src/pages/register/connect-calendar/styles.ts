import { Card, Text, styled } from '@kahzita-ignite-ui/react';

export const ConnectCard = styled(Card, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
});

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  borderRadius: '$md',
  padding: '$4 $6',

  [`${Text}`]: {
    fontWeight: '$medium',
  },
});

export const AuthError = styled(Text, {
  color: '#F75A68',
  marginBottom: '$1',
});