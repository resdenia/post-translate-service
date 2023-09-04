import React, { memo, useContext } from 'react';
import cls from './Header.module.css';
import { PostContext } from '../../context/post/postContext';
import { languages } from '../../context/post/postProvider';
import Button from '../../components/Button/Button';

const Header = memo(() => {
    const { toggleLanguage, language } =
        useContext(PostContext);

    const toggleLanguageHandler = (lang: languages) => {
        toggleLanguage(lang);
    };

    return (
        <div className={cls.Header}>
            <div className={cls.logo}>
                <h1 className={cls.title}>My Posts</h1>
            </div>

            <div className={cls.languageController}>
                <Button
                    disabled={language === languages.en}
                    onClick={() => {
                        toggleLanguageHandler(languages.en);
                    }}
                >
                    En
                </Button>
                |
                <Button
                    disabled={language === languages.es}
                    onClick={() => {
                        toggleLanguageHandler(languages.es);
                    }}
                >
                    Es
                </Button>
                |
                <Button
                    disabled={language === languages.fr}
                    onClick={() => {
                        toggleLanguageHandler(languages.fr);
                    }}
                >
                    Fr
                </Button>
            </div>
        </div>
    );
});

export default Header;
