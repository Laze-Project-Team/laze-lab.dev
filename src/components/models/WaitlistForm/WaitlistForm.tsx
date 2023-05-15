import { Button, Flex, Input, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

// type waitlistFormValue = {
//   email: string;
// };

export const PresentialWaitlistForm: FC = () => {
  const [t] = useTranslation('index');

  return (
    <Stack align="center" spacing={8}>
      <p>{t('hero_section.waitlist.title')}</p>
      <form>
        <Flex gap={16}>
          <Input
            sx={{ width: '400px' }}
            placeholder={t('hero_section.waitlist.input_label')}
            name="email"
            type="email"
            required
          />
          <Button type="submit" variant="filled">
            {t('hero_section.waitlist.submit')}
          </Button>
        </Flex>
      </form>
    </Stack>
  );
};

export const WaitlistForm: FC = () => {
  return <PresentialWaitlistForm />;
};
