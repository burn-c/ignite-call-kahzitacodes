import { Card, Text, styled } from '@kahzita-ignite-ui/react';

export const FormContainer = styled(Card, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    [`${Text}`]: {
      marginBottom: '$2'
    },
  },

  textarea: {
    width: '100%',
  }
});

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4 ',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      height: '$5',
      width: '$5',
    },
  },
});

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
});