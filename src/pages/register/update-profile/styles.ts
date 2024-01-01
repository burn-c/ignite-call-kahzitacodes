import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api';
import { Card, Text, styled } from '@kahzita-ignite-ui/react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session
    }
  };
};