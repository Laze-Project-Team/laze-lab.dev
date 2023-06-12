import { css } from '@emotion/react';
import { Text, useMantineTheme } from '@mantine/core';
import { gsap } from 'gsap';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import HakaseIcon from '/public/icons/hakase.png';
import JosyuIcon from '/public/icons/josyu.png';
import type { ChatMessage } from '@/client/tutorial/Content/useChatMessages';

type MessageProps = {
  message: ChatMessage;
};

export const Message: FC<MessageProps> = ({ message }) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const theme = useMantineTheme();

  const isHakase = message.author === 'hakase';

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

  if (message.type !== 'text') {
    return <>unknown message</>;
  }

  return (
    <>
      <div
        ref={messageContainerRef}
        css={css`
          display: flex;
          flex-direction: column;
          align-self: ${isHakase ? 'flex-start' : 'flex-end'};
          margin-right: ${isHakase ? '120px' : 0};
          margin-left: ${isHakase ? 0 : '120px'};
          opacity: 0;

          @media screen and (width <= 1200px) {
            margin-right: ${isHakase ? '56px' : 0};
            margin-left: ${isHakase ? 0 : '56px'};
          }

          @media screen and (width <= 420px) {
            margin-right: ${isHakase ? '40px' : 0};
            margin-left: ${isHakase ? 0 : '40px'};
          }
        `}
      >
        <div
          css={css`
            width: fit-content;
            height: fit-content;
            padding: 0.5rem 1rem;
            border-radius: ${theme.radius.md};
            margin-right: ${isHakase ? 0 : '56px'};
            margin-left: ${isHakase ? '56px' : 0};
            background-color: ${isHakase
              ? theme.colors.gray[2]
              : theme.colors.blue[5]};
            border-bottom-left-radius: ${isHakase ? 0 : theme.radius.md};
            border-bottom-right-radius: ${isHakase ? theme.radius.md : 0};
            color: ${isHakase ? '#000' : '#fff'};

            @media screen and (width <= 420px) {
              margin-right: ${isHakase ? 0 : '40px'};
              margin-left: ${isHakase ? '40px' : 0};
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
            {message.text}
          </Text>
        </div>
        <div
          css={css`
            align-self: ${isHakase ? 'flex-start' : 'flex-end'};
            margin-top: -1rem;
          `}
        >
          <Image
            src={isHakase ? HakaseIcon : JosyuIcon}
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
