/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import cls from './PostItem.module.css';
import Like from '../../components/Like/Like';
import Card from '../../components/Card/Card';

interface PostItemProps {
    title: string;
    body: string;
    status?: boolean;
}

const PostItem = memo((props: PostItemProps) => {
    const { status, title, body } = props;

    return (
        <div className={cls.PostItem}>
            <Like status={status} />
            <Card title={title} body={body} />
        </div>
    );
});

export default PostItem;
