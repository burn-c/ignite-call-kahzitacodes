import { Card, Heading, Text, styled } from '@kahzita-ignite-ui/react';

export const Container = styled('main', {
  maxWidth: '572px',
  margin: '$20 auto $4',
  padding: '0 $4',
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
});

export const Header = styled('div', {
  padding: '0 $6',

  [`${Heading}`]: {
    lineHeight: '$base',
  },

  [`${Text}`]: {
    color: '$gray200',
    marginBottom: '$6'
  }
});

export const Form = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',
  },
});

export const FormHelperText = styled(Text, {
  marginTop: '$1',
  color: '#DB4437 !important',
});