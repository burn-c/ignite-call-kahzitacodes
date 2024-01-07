import { Avatar, Button, Heading, MultiStep, Text, Textarea } from '@kahzita-ignite-ui/react';
import { Container, Header } from '../styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HelperText, ProfileCard } from './styles';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api';
import { NextSeo } from 'next-seo';

const updateProfileFormSchema = z.object({
  bio: z.string(),
});

type UpdateProfileFormaData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm<UpdateProfileFormaData>({
    resolver: zodResolver(updateProfileFormSchema)
  });

  const session = useSession();
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileFormaData) {
    await api.put('/users/profile', {
      bio: data.bio
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="h2">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileCard as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar src={session.data?.user.image} alt={session.data?.user.name} />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <Textarea placeholder="Seu nome" {...register('bio')} />
            <HelperText size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </HelperText>
          </label>

          <Button type="submit" disabled={isSubmitting}>Finalizar</Button>
        </ProfileCard>
      </Container>
    </>
  );
}

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