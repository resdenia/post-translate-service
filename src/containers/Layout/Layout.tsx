/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import cls from './Layout.module.css';
import Header from '../Header/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
    return (
        <div className={cls.Layout}>
            <Header />
            {children}
        </div>
    );
});

export default Layout;
