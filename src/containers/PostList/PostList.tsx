/* eslint-disable object-curly-newline */
import React, { memo, useContext } from 'react';
import cls from './PostList.module.css';
import { PostContext } from '../../context/post/postContext';
import PostItem from '../PostItem/PostItem';
import { IPost } from '../../context/post/postProvider';
import Pagination from '../Pagination/Pagination';

const PostList = memo(() => {
    const { postsDisplay } = useContext(PostContext);

    const renderPosts = () =>
        postsDisplay.map((post: IPost) => (
            <PostItem key={post.id} {...post} />
        ));

    return (
        <div className={cls.PostList}>
            <h2 className={cls.subTitle}>Post List</h2>
            <div className={cls.PostListWrapper}>
                {postsDisplay.length > 0 && renderPosts()}
            </div>
            <Pagination />
        </div>
    );
});

export default PostList;
