import { FieldError } from 'react-hook-form';
import React, { ReactNode } from 'react';

interface FormFieldProps {
  children: ReactNode;
  errorName: FieldError | undefined;
  errorMessage: string | undefined;
}

export function FormField({ children, errorName, errorMessage }: FormFieldProps) {
  return (
    <div className="w-full h-16">
      {children}
      {errorName && (
        <span className="text-red-500 dark:text-red-300 text-xs p-0 px-2 m-0">{errorMessage}</span>
      )}
    </div>
  );
}
