import { CalendarBlank, Clock } from 'phosphor-react';
import { FormActions, FormContainer, FormHeader } from './styles';
import { Button, InputText, Text, Textarea } from '@kahzita-ignite-ui/react';
import { FormError } from '../../styles';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';

const confirmScheduleFormSchema = z.object({
  name: z.string().min(3, { message: 'Insira um nome de pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  observations: z.string().nullable(),
});

type ConfirmScheduleFormProps = z.infer<typeof confirmScheduleFormSchema>;

interface ConfirmStep {
  scheduledDate: Date;
  onCancelSchedule: () => void;
}

export function ConfirmStep({ scheduledDate, onCancelSchedule }: ConfirmStep) {
  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<ConfirmScheduleFormProps>({
    resolver: zodResolver(confirmScheduleFormSchema)
  });

  const selectedDate = dayjs(scheduledDate).format('D[ de ]MMMM[ de ]YYYY');
  const selectedTime = dayjs(scheduledDate).format('HH:mm[h]');

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmSchedule(data: ConfirmScheduleFormProps) {
    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: scheduledDate,
    });

    onCancelSchedule();
  }

  return (
    <FormContainer as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text><CalendarBlank />{selectedDate}</Text>
        <Text><Clock />{selectedTime}</Text>
      </FormHeader>

      <label>
        <Text size="sm">
          Nome completo
        </Text>
        <InputText {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">
          Endereço de e-mail
        </Text>
        <InputText {...register('email')} />
        {errors.email && <FormError size="sm">{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">
          Observações
        </Text>
        <Textarea  {...register('observations')} />
      </label>

      <FormActions>
        <Button variant="tertiary" type="button" onClick={onCancelSchedule}>Cancelar</Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>Confirmar</Button>
      </FormActions>
    </FormContainer>
  );
}