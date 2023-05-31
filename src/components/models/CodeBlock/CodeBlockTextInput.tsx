import { TextInput } from '@mantine/core';
import type { ChangeEventHandler, FC } from 'react';
import { useState } from 'react';

type presentialCodeBlockTextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PresentialCodeBlockTextInput: FC<
  presentialCodeBlockTextInputProps
> = ({ value, onChange }) => {
  return (
    <TextInput
      styles={{
        input: {
          lineHeight: '1.2rem',
          padding: '0',
          width: `${value.length}ch`,
          minWidth: '8px',
          height: '1.2rem',
          minHeight: '1.2rem',
          fontSize: '16px',
          color: 'orange',
          fontFamily: 'Consolas, Arial, sans-serif !important',
          transition: '0.2s',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          textAlign: 'center',
          ':hover': {
            backgroundColor: '#e3e4e6',
          },
        },
      }}
      value={value}
      onChange={onChange}
      variant="unstyled"
    />
  );
};

type codeBlockTextInputProps = {
  defaultValue: string;
};

export const CodeBlockTextInput: FC<codeBlockTextInputProps> = ({
  defaultValue,
}) => {
  const [valueState, setValueState] = useState(defaultValue);

  return (
    <PresentialCodeBlockTextInput
      value={valueState}
      onChange={(e): void => {
        setValueState(e.currentTarget.value);
      }}
    />
  );
};
