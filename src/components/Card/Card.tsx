/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import cls from './Card.module.css';

interface CardProps {
    title: string;
    body: string;
}

const Card = memo((props: CardProps) => {
    const { title, body } = props;

    return (
        <div className={cls.Card}>
            <h3 className={cls.title}> {title}</h3>
            <p className={cls.description}>{body}</p>
        </div>
    );
});

export default Card;
