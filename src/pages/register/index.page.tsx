import { Button, Heading, InputText, MultiStep, Text } from '@kahzita-ignite-ui/react';
import { Container, Form, FormHelperText, Header } from './styles';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '../../lib/axios';
import { AxiosError } from 'axios';
import { NextSeo } from 'next-seo';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'O usuário precisa ser pelo menos 2 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Usuário deve conter letras ou hífens' })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(2, { message: 'O nome precisa ser pelo menos 2 letras' })
});

type RegisterFormaData = z.infer<typeof registerFormSchema>;
export default function Register() {
  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormaData>({
    resolver: zodResolver(registerFormSchema)
  });

  const router = useRouter();

  async function handleRegister(data: RegisterFormaData) {
    try {
      await api.post('users', {
        name: data.name,
        username: data.username,
      });

      await router.push('/register/connect-calendar');
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router.query?.username]);

  return (
    <>
      <NextSeo title="Crie uma conta | Ignite Call" />

      <Container>
        <Header>
          <Heading as="h2">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <InputText prefix="ignite.com/" placeholder="seu-usuario" {...register('username')} />
            {errors.username && <FormHelperText size="sm">{errors.username.message}</FormHelperText>}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <InputText placeholder="Seu nome" {...register('name')} />
            {errors.name && <FormHelperText size="sm">{errors.name.message}</FormHelperText>}
          </label>

          <Button type="submit" disabled={isSubmitting}>Próximo Passo <ArrowRight /></Button>
        </Form>
      </Container>
    </>
  );
}