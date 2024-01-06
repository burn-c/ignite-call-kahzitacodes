import { Heading, Text, styled } from '@kahzita-ignite-ui/react';

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
});

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
    fontWeight: '$bold',
  },

  [`${Text}`]: {
    color: '$gray200'
  },
});

export const FormError = styled(Text, {
  color: '#F75A68',
});