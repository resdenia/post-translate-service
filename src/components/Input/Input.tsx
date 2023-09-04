/* eslint-disable object-curly-newline */
import React, { InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.css';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={cls.Input}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}`}
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                {...otherProps}
            />
        </div>
    );
});

export default Input;
