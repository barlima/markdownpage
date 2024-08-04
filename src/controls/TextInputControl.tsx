import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TextInputControlProps = TextFieldProps & {
  name: string;
};

export const TextInputControl: React.FC<TextInputControlProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};
