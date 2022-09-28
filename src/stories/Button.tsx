import React, { MouseEventHandler } from 'react';
import './button.css';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';

interface CustomButtonProps {
  hasIcon?: boolean;
  backgroundColor?: string;
  variant?: 'contained' | 'text' | 'outlined';
  label: string;
  onClick?: any;
}

export const CustomButton = ({
  hasIcon = false,
  variant = 'contained',
  backgroundColor,
  label,
  onClick,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
    variant={variant}
      style={{ backgroundColor }}
      {...(hasIcon && { endIcon: <ShareIcon /> })}
      onClick={onClick('bottom-start')}
      {...props}
      >
      {label}
    </Button>
  );
};
