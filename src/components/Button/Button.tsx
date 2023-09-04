/* eslint-disable object-curly-newline */
import React, { ButtonHTMLAttributes, memo } from 'react';

import cls from './Button.module.css';

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    disabled?: boolean;
    children: React.ReactNode;
}

const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    return (
        <button
            className={cls.Button}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});

export default Button;
