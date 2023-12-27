import { Button, InputText } from '@kahzita-ignite-ui/react';
import { Form, FormHelperText } from './styles';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(2, { message: 'Usuário precisa ser pelo menos 2 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Usuário deve conter letras ou hífens' })
    .transform((value) => value.toLowerCase())
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    mode: 'onChange'
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <InputText
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button type="submit" disabled={isSubmitting}>Reservar usuário <ArrowRight /></Button>
      </Form>
      {errors.username &&
        <FormHelperText size="sm">
          {errors.username.message}
        </FormHelperText>
      }
    </>
  );
}