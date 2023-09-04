import React from 'react';
import cls from './Home.module.css';
import PostList from '../../containers/PostList/PostList';
import Layout from '../../containers/Layout/Layout';

const Home = () => (
    <div className={cls.PageWrapper}>
        <Layout>
            <PostList />
        </Layout>
    </div>
);

export default Home;
