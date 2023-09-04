/* eslint-disable object-curly-newline */
import React, {
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import cls from './PostList.module.css';
import { PostContext } from '../../context/post/postContext';
import PostItem from '../PostItem/PostItem';
import { IPost } from '../../context/post/postProvider';
import Pagination from '../Pagination/Pagination';
import { languages } from '../../context/post/postProvider';

enum TitleT {
    titleES = 'titleES',
    titleFR = 'titleFR',
}

enum BodyT {
    bodyES = 'bodyES',
    bodyFR = 'bodyFR',
}

const PostList = memo(() => {
    const [prefixTitle, setPrefixTitle] = useState<TitleT>(
        TitleT.titleES,
    );
    const [prefixBody, setPrefixBody] = useState<BodyT>(
        BodyT.bodyES,
    );

    const { postsDisplay, language } =
        useContext(PostContext);

    useEffect(() => {
        if (language === languages.es) {
            setPrefixTitle(TitleT.titleES);
            setPrefixBody(BodyT.bodyES);
        } else if (language === languages.fr) {
            setPrefixTitle(TitleT.titleFR);
            setPrefixBody(BodyT.bodyFR);
        }
    }, [language]);

    const renderPosts = () =>
        postsDisplay.map((post: IPost) => (
            <PostItem
                key={post.id}
                title={`${
                    language === languages.en
                        ? post.title
                        : post[`${prefixTitle}`]
                } `}
                body={`${
                    language === languages.en
                        ? post.body
                        : post[`${prefixBody}`]
                } `}
            />
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
