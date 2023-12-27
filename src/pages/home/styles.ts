import { styled, Heading, Text } from '@kahzita-ignite-ui/react';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$20',
  height: '100vh',
  width: '100%',

  padding: '$8',
  overflow: 'hidden',

  '@media(min-width: 600px)': {
    maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
    flexDirection: 'row',
    marginLeft: 'auto',
    padding: '0 0 0 $8',
  },

});

export const HeroContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  [`> ${Heading}`]: {
    fontSize: '$5xl',
    fontWeight: '$bold',
    '@media(min-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    color: '$gray200'
  },

  '@media(min-width: 600px)': {
    maxWidth: '480px',
  },
});

export const HeroImage = styled('div', {
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    paddingRight: '$8',
  },
});