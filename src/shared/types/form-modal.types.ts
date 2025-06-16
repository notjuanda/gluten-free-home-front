import type { UseFormRegister } from 'react-hook-form';

export type FormFieldType = 
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'textarea'
    | 'select'
    | 'image';

export interface FormFieldOption {
    label: string;
    value: string | number;
}

export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    required?: boolean;
    placeholder?: string;
    options?: FormFieldOption[];
    defaultValue?: any;
}

export interface FormModalProps {
    open: boolean;
    title: string;
    fields: FormField[];
    loading?: boolean;
    error?: string | null;
    fieldErrors?: Record<string, string>; 
    onClose: () => void;
    onSubmit: (e?: React.BaseSyntheticEvent) => void;
    submitText?: string;
    register: UseFormRegister<any>;
}
