import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * Reusable BasicInput component tailored for the Appifylab design system.
 * Wraps MUI TextField with custom styling.
 */
const BasicInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '48px',
          borderRadius: '6px',
          backgroundColor: 'var(--bg2)',
          '& fieldset': { 
            borderColor: 'var(--bcolor2)',
            transition: 'border-color 0.2s ease-in-out',
          },
          '&:hover fieldset': {
            borderColor: 'var(--color5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--color5)',
            borderWidth: '1px',
          },
        },
        '& .MuiInputBase-input': { 
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--color2)',
          '&::placeholder': {
            color: 'var(--color4)',
            opacity: 1,
          }
        },
        ...props.sx
      }}
    />
  );
};

export default BasicInput;
