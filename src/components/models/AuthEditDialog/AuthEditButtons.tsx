import { css } from '@emotion/react';
import { Avatar, List } from '@mantine/core';
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
                {authDatas.map((authData) => {
                  const method = providers.find(
                    (provider) => provider.id === authData.providerId,
                  )?.method;

                  return (
                    <List.Item
                      key={authData.uid}
                      icon={
                        authData.photoURL && <Avatar src={authData.photoURL} />
                      }
                      css={css`
                        display: flex;
                      `}
                    >
                      <div>
                        <p>{authData.displayName}</p>
                        <p>{authData.email}</p>
                      </div>
                      <div
                        css={css`
                          margin-left: auto;
                        `}
                      >
                        <AuthUnlinkButton
                          message={t('auth.unlink_confirmation', {
                            method: method ?? '???',
                          })}
                          providerId={authData.providerId}
                          disabled={providerData.length === 1}
                        />
                      </div>
                    </List.Item>
                  );
                })}
              </List>
            ) : (
              <div
                css={css`
                  padding: 16px;
                `}
              >
                <AuthEditButton
                  method={provider.method}
                  key={provider.id}
                  fullWidth
                >
                  {t('auth.auth_with', { method: provider.method })}
                </AuthEditButton>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
