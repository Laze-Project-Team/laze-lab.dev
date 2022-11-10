import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { UserInfo } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { authMethod } from '@/components/hooks/useAuth';

import { AuthEditButton } from './AuthEditButton';
import { AuthUnlinkButton } from './AuthUnlinkButton';

export type providerId = 'google.com' | 'twitter.com' | 'github.com';

export type providerType = {
  id: providerId;
  method: authMethod;
};

export const providers: providerType[] = [
  {
    id: 'google.com',
    method: 'Google',
  },
  {
    id: 'twitter.com',
    method: 'Twitter',
  },
  {
    id: 'github.com',
    method: 'GitHub',
  },
];

export type authEditButtonsProps = {
  providerData: UserInfo[];
};

export const AuthEditButtons: FC<authEditButtonsProps> = ({ providerData }) => {
  const [t] = useTranslation('profile');

  return (
    <>
      {providers.map((provider) => {
        const authDatas = providerData.filter(
          (data) => data.providerId === provider.id,
        );

        return (
          <div key={provider.id}>
            <h3>{provider.method}</h3>
            {authDatas.length > 0 ? (
              <List>
                {authDatas.map((authData) => (
                  <ListItem
                    key={authData.uid}
                    secondaryAction={
                      <AuthUnlinkButton
                        providerId={authData.providerId}
                        disabled={providerData.length === 1}
                      />
                    }
                  >
                    {authData.photoURL && (
                      <ListItemAvatar>
                        <Avatar src={authData.photoURL} />
                      </ListItemAvatar>
                    )}
                    <div>
                      <ListItemText
                        primary={authData.displayName}
                        secondary={authData.email}
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box p={2}>
                <AuthEditButton
                  method={provider.method}
                  key={provider.id}
                  fullWidth
                >
                  {t('auth.auth_with', { method: provider.method })}
                </AuthEditButton>
              </Box>
            )}
          </div>
        );
      })}
    </>
  );
};
