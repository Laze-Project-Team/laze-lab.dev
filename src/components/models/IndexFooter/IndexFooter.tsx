import { css } from '@emotion/react';
import { grey } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { DiscordIcon } from '@/components/ui/DiscordIcon';
import { LazeLogo } from '@/components/ui/LazeLogo';
import { QiitaIcon } from '@/components/ui/QiitaIcon';
import { StyledLink } from '@/components/ui/StyledLink';

import { FooterLinkList } from './FooterLinkList';

const footerIconStyle = css`
  display: inline-flex;
  width: 1.4rem;
  height: 1.4rem;
  color: ${grey['400']};
  transition: color 0.2s;

  &:hover {
    color: ${grey['200']};
  }
`;

export const PresentialIndexFooter: FC = () => {
  const [t] = useTranslation(['layout', 'common']);

  return (
    <>
      <footer
        css={css`
          width: 100vw;
          padding: 2rem 0;
          margin: 0 auto;
          background-color: var(--color-darkgray);
          color: ${grey['400']};
        `}
      >
        <Container maxWidth="md">
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              gap: 2rem;
            `}
          >
            <div>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  line-height: 3.5rem;
                `}
              >
                <LazeLogo
                  size={40}
                  option="logo_gray"
                  css={css`
                    top: 0.25rem;
                    display: inline-block;
                  `}
                />
                <span
                  css={css`
                    margin-left: 0.5rem;
                    color: whitesmoke;
                    font-size: 3rem;
                  `}
                >
                  Laze
                </span>
              </div>
              <p
                css={css`
                  color: whitesmoke;
                  font-size: 0.9rem;
                `}
              >
                {t('common:motto')}
              </p>
              <div
                css={css`
                  display: flex;
                  margin-top: 1rem;
                  gap: 0 0.25rem;
                `}
              >
                <StyledLink
                  href="https://github.com/Laze-Project-Team"
                  title="GitHub"
                  disableIcon
                >
                  <GitHubIcon css={footerIconStyle} />
                </StyledLink>
                <StyledLink
                  href="https://twitter.com/LazeProjectTeam"
                  title="Twitter"
                  disableIcon
                >
                  <TwitterIcon css={footerIconStyle} />
                </StyledLink>
                <StyledLink
                  href="https://discord.gg/K3prMrmS7e"
                  title="Discord"
                  disableIcon
                >
                  <DiscordIcon css={footerIconStyle} />
                </StyledLink>
                <StyledLink
                  href="https://qiita.com/tags/laze"
                  title="Qiita"
                  disableIcon
                >
                  <QiitaIcon css={footerIconStyle} />
                </StyledLink>
              </div>
              <div>
                <p
                  css={css`
                    margin-top: 0.25rem;
                    font-size: 0.8rem;
                  `}
                >
                  {t('common:copyright')}
                </p>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
              `}
            >
              <FooterLinkList
                title={t('footer.Guides')}
                links={[
                  { title: t('footer.guides.Terms'), href: '/' },
                  { title: t('footer.guides.Guideline'), href: '/guideline' },
                  { title: t('footer.guides.Privacy'), href: '/privacy' },
                  { title: t('footer.guides.License'), href: '/license' },
                ]}
              />
              <FooterLinkList
                title={t('footer.Sitemap')}
                links={[
                  { title: t('footer.sitemap.Home'), href: '/' },
                  { title: t('footer.sitemap.Editor'), href: '/guideline' },
                  { title: t('footer.sitemap.Docs'), href: '/privacy' },
                  { title: t('footer.sitemap.Compete'), href: '/license' },
                ]}
              />
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export const IndexFooter: FC = () => {
  return <PresentialIndexFooter />;
};
