import { Button, Input, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

// type waitlistFormValue = {
//   email: string;
// };

export const PresentialWaitlistForm: FC = () => {
  const [t] = useTranslation('index');

  return (
    <Stack dir="column" align="center" spacing={8}>
      <p>{t('hero_section.waitlist.title')}</p>
      <form>
        <Stack dir="row" spacing={2}>
          <Input.Wrapper label={t('hero_section.waitlist.input_label')}>
            <Input size="small" sx={{ width: '400px' }} />
          </Input.Wrapper>
          <Button type="submit" variant="filled">
            {t('hero_section.waitlist.submit')}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export const WaitlistForm: FC = () => {
  return <PresentialWaitlistForm />;
};
