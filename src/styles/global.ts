import { globalCss } from '@kahzita-ignite-ui/react';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    fontFamily: 'Roboto',
    '-webkit-font-smoothing': 'antialiased',
  },
});
