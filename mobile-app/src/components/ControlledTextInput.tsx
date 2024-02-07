import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';

const ControlledTextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: UseControllerProps<T> & TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextInput
          {...textInputProps}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

export default ControlledTextInput;
