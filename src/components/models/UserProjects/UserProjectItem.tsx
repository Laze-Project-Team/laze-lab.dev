import { css } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import type { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

import type { presentialUserProjectsProps } from '@/components/models/UserProjects/UserProjects';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { useProjectManager } from '@/lib/firebase/project';
import { replaceWithElement } from '@/lib/utils/replaceWithElement';
import type { projectMeta as projectMetaType } from '@/typings/database';

export type userProjectItemProps = {
  projectId: string;
  syncUserData: presentialUserProjectsProps['syncUserData'];
};

export type presentialUserItemProps = {
  projectId: string;
  projectMeta: SWRResponse<projectMetaType>;
  isConfirmOpen: boolean;
  isDeleted: boolean;
  handleDeleteClick: () => void;
  handleConfirm: () => Promise<void>;
  handleReject: () => void;
};

const itemAnimationCss = (isDeleted: boolean) => css`
  transform-origin: top;
  ${isDeleted
    ? css`
        animation: shrinking 0.2s ease-out forwards;
        overflow-y: hidden;
      `
    : css`
        animation: growing 0.2s ease-out forwards;
      `};

  @keyframes growing {
    from {
      transform: scaleY(0);
    }

    to {
      transform: scaleY(1);
    }
  }

  @keyframes shrinking {
    from {
      height: calc(24px + 1rem);
    }

    to {
      height: 0;
    }
  }
`;

export const PresentialUserProjectItem: FC<presentialUserItemProps> = ({
  projectId,
  projectMeta,
  isConfirmOpen,
  isDeleted,
  handleDeleteClick,
  handleConfirm,
  handleReject,
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Dialog
        open={isConfirmOpen}
        onClose={handleReject}
        aria-labelledby="delete-project-confirmation-dialog-title"
        aria-describedby="delete-project-confirmation-dialog-description"
      >
        <DialogTitle id="delete-project-confirmation-dialog-title">
          {t('profile.projects.delete_confirm_title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-project-confirmation-dialog-description">
            {replaceWithElement(
              t('profile.projects.delete_confirm_description'),
              '{{project}}',
              <span
                css={css`
                  font-weight: bold;
                `}
              >
                {projectMeta.data?.config.name ?? '???'}
              </span>,
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject}>
            {t('profile.projects.delete_cancel')}
          </Button>
          <Button onClick={handleConfirm} autoFocus color="error">
            {t('profile.projects.delete_confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      <div css={itemAnimationCss(isDeleted)}>
        <ListItem
          css={css`
            padding: '0.5rem 1rem';
          `}
        >
          <ListItemText
            primary={
              projectMeta.data ? (
                <DefaultLink href={`/projects/${projectId}`}>
                  {projectMeta.data.config.name}
                </DefaultLink>
              ) : (
                ' '
              )
            }
            secondary={projectMeta.data?.config.description}
            secondaryTypographyProps={{
              sx: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              },
            }}
          />

          <Tooltip title={t('profile.projects.delete')}>
            <IconButton
              aria-label={t('profile.projects.delete')}
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>

        <Divider />
      </div>
    </>
  );
};

export const UserProjectItem: FC<userProjectItemProps> = ({
  projectId,
  syncUserData,
  ...props
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { deleteProject } = useProjectManager();
  const { fetchProjectMeta } = useProjectManager();

  const projectMeta = useSWRImmutable(`projectData/${projectId}`, () =>
    fetchProjectMeta(projectId),
  );

  const handleDeleteClick = useCallback(() => {
    setIsConfirmOpen(true);
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsConfirmOpen(false);
    setIsDeleted(true);
    setTimeout(
      () =>
        syncUserData((userData) => ({
          ...userData,
          projects: userData.projects.filter((id) => id !== projectId),
        })),
      200,
    );

    await deleteProject(projectId);
  }, [deleteProject, projectId, syncUserData]);

  const handleReject = useCallback(() => {
    setIsConfirmOpen(false);
  }, []);

  return (
    <PresentialUserProjectItem
      projectId={projectId}
      projectMeta={projectMeta}
      isConfirmOpen={isConfirmOpen}
      isDeleted={isDeleted}
      handleDeleteClick={handleDeleteClick}
      handleConfirm={handleConfirm}
      handleReject={handleReject}
      {...props}
    />
  );
};
