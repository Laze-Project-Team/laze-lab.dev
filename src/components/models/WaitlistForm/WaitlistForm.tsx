import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

// type waitlistFormValue = {
//   email: string;
// };

export const PresentialWaitlistForm: FC = () => {
  const [t] = useTranslation('index');

  return (
    <Stack direction="column" alignItems="center" gap={1}>
      <p>{t('hero_section.waitlist.title')}</p>
      <form>
        <Stack direction="row" gap={2}>
          <TextField
            label={t('hero_section.waitlist.input_label')}
            size="small"
            sx={{ width: '400px' }}
          />
          <Button type="submit" variant="contained">
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
