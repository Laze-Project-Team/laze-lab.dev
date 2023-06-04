import { TextInput } from '@mantine/core';
import type { ChangeEventHandler, FC } from 'react';
import { useEffect, useState } from 'react';

import { useAstArray } from '@/components/pages/Playground/ASTArrayContext';

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
          borderRadius: '2px',
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
  astPath: (string | number)[];
  defaultValue: string;
  draggable: boolean;
  keyDict?: {
    $key: string;
    $value: string;
  };
  keyName: string;
  record?: boolean;
};

export const CodeBlockTextInput: FC<codeBlockTextInputProps> = ({
  astPath,
  defaultValue,
  draggable,
  keyDict,
  keyName,
  record,
}) => {
  const [valueState, setValueState] = useState(defaultValue);
  const { updateAstArray } = useAstArray();

  useEffect(() => {
    setValueState(defaultValue);
  }, [defaultValue]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = record
    ? (e): void => {
        setValueState(e.currentTarget.value);
        const newAstPath = [...astPath];
        newAstPath.pop();
        updateAstArray(
          newAstPath,
          'edit',
          keyName,
          e.currentTarget.value,
          keyDict,
        );
      }
    : (e): void => {
        setValueState(e.currentTarget.value);
        updateAstArray(
          astPath,
          'edit',
          keyName,
          e.currentTarget.value,
          keyDict,
        );
      };

  return (
    <PresentialCodeBlockTextInput
      value={valueState}
      onChange={draggable ? changeHandler : () => null}
    />
  );
};

CodeBlockTextInput.defaultProps = { record: false };
