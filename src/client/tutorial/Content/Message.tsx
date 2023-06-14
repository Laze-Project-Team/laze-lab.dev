import { css } from '@emotion/react';
import { Text, useMantineTheme } from '@mantine/core';
import { gsap } from 'gsap';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import HakaseIcon from '/public/icons/hakase.png';
import JosyuIcon from '/public/icons/josyu.png';
import type { Story } from '@/client/tutorial/Content/storySchema';

type MessageProps = {
  story: Story;
};

export const Message: FC<MessageProps> = ({ story }) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const theme = useMantineTheme();

  const isAssistant = story.from === 'assistant';

  useEffect(() => {
    if (messageContainerRef.current === null) return;

    if (animated) return;
    setAnimated(true);

    gsap.to(messageContainerRef.current, {
      opacity: 1,
      duration: 0.1,
      delay: 0.1,
    });
  }, [animated, messageContainerRef]);

  if (story.type !== 'text') {
    return <>unknown message</>;
  }

  return (
    <>
      <div
        ref={messageContainerRef}
        css={css`
          display: flex;
          flex-direction: column;
          align-self: ${isAssistant ? 'flex-start' : 'flex-end'};
          margin-right: ${isAssistant ? '120px' : 0};
          margin-left: ${isAssistant ? 0 : '120px'};
          opacity: 0;

          @media screen and (width <= 1200px) {
            margin-right: ${isAssistant ? '56px' : 0};
            margin-left: ${isAssistant ? 0 : '56px'};
          }

          @media screen and (width <= 420px) {
            margin-right: ${isAssistant ? '40px' : 0};
            margin-left: ${isAssistant ? 0 : '40px'};
          }
        `}
      >
        <div
          css={css`
            width: fit-content;
            height: fit-content;
            padding: 0.5rem 1rem;
            border-radius: ${theme.radius.md};
            margin-right: ${isAssistant ? 0 : '56px'};
            margin-left: ${isAssistant ? '56px' : 0};
            background-color: ${isAssistant
              ? theme.colors.gray[2]
              : theme.colors.blue[5]};
            border-bottom-left-radius: ${isAssistant ? 0 : theme.radius.md};
            border-bottom-right-radius: ${isAssistant ? theme.radius.md : 0};
            color: ${isAssistant ? '#000' : '#fff'};

            @media screen and (width <= 420px) {
              margin-right: ${isAssistant ? 0 : '40px'};
              margin-left: ${isAssistant ? '40px' : 0};
            }
          `}
        >
          <Text
            size="sm"
            css={css`
              @media screen and (width <= 420px) {
                font-size: 0.75rem;
              }
            `}
          >
            {story.content}
          </Text>
        </div>
        <div
          css={css`
            align-self: ${isAssistant ? 'flex-start' : 'flex-end'};
            margin-top: -1rem;
          `}
        >
          <Image
            src={isAssistant ? HakaseIcon : JosyuIcon}
            alt=""
            width={48}
            height={48}
            css={css`
              border-radius: 50%;
              clip-path: circle(50%);

              @media screen and (width <= 420px) {
                width: 32px;
                height: 32px;
              }
            `}
          />
        </div>
      </div>
    </>
  );
};
