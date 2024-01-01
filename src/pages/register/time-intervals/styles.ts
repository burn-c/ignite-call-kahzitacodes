import { Card, Text, styled } from '@kahzita-ignite-ui/react';

export const IntervalCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4'
});

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
});

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
});

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
});

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(50%) saturate(0%)',
  }
});

export const FormError = styled(Text, {
  color: '#F75A68',
});