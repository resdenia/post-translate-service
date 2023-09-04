import React, {
    useReducer,
    useCallback,
    FunctionComponent,
    useMemo,
} from 'react';

import { PostContext } from './postContext';
import { postReducer } from './postReducer';
import {
    GET_POSTS,
    SET_TOTAL_PAGES,
    SET_POSTS_TO_DISPLAY,
    SET_LANGUAGE,
    SET_RANGE,
    SET_CURRENT_PAGE,
} from '../types';
import postsApi from '../../api/postAPI';
import translationApi from '../../api/translationAPI';

import { postsDump } from '../../dbposts/posts';

interface IProps {
    children: React.ReactNode;
}

export interface IPost {
    title: string;
    body: string;
    date: string;
    id: number;
    username: string;
    titleES?: string;
    titleFR?: string;
    bodyES?: string;
    bodyFR?: string;
}

export enum languages {
    en,
    es,
    fr,
}

export interface IInitialState {
    language: languages;
    posts: Map<number, IPost> | IPost[];
    currentPage: number;
    nextPage: number;
    totalPages: number;
    range: number[];
    postsDisplay: IPost[];
}

export const PostProvider: FunctionComponent<IProps> = ({
    children,
}) => {
    const initialState: IInitialState = {
        posts: [],
        currentPage: 1,
        nextPage: 2,
        totalPages: 0,
        range: [0, 9],
        postsDisplay: [],
        language: languages.en,
    };

    const [state, dispatch] = useReducer(
        postReducer,
        initialState,
    );

    const getPosts = async () => {
        try {
            let posts = await postsApi.getPosts();

            if (!posts) {
                posts = postsDump;
            }
            const postsDisplay = postsToDisplay(posts);

            const mappedPosts = new Map();
            posts.forEach((post: IPost) => {
                mappedPosts.set(post.id, post);
            });

            dispatch({
                type: SET_TOTAL_PAGES,
                payload: posts.length / 10,
            });

            dispatch({
                type: GET_POSTS,
                payload: mappedPosts,
            });
            dispatch({
                type: SET_POSTS_TO_DISPLAY,
                payload: postsDisplay,
            });
        } catch (e) {
            console.log(e);
        }
    };
    const postsToDisplay = (posts: IPost[]) => {
        return posts.splice(state.range[0], state.range[1]);
    };

    const onPaginationHandler = (pageId: number) => {
        dispatch({
            type: SET_CURRENT_PAGE,
            payload: pageId,
        });
    };

    const translatePost = async (postId: number) => {
        const post = (
            state.posts as Map<number, IPost>
        ).get(postId);
        let updatedPost = { ...post };
        if (updatedPost != undefined) {
            // TODO: Refactor
            if (!updatedPost?.bodyES) {
                //translate
                const bodyTranslated =
                    await translationApi.translatePost(
                        post!.body,
                    );
                updatedPost = {
                    ...post,
                    bodyES: bodyTranslated.translations[0]
                        .text,
                    bodyFR: bodyTranslated.translations[1]
                        .text,
                };
            }
            if (!updatedPost?.titleES) {
                //translate
                const titleTranslated =
                    await translationApi.translatePost(
                        post!.title,
                    );
                updatedPost = {
                    ...post,
                    titleES:
                        titleTranslated.translations[0]
                            .text,
                    titleFR:
                        titleTranslated.translations[1]
                            .text,
                };
            }
        }
    };

    const toggleLanguage = (lang: languages) => {
        dispatch({ type: SET_LANGUAGE, payload: lang });
    };

    const filterPost = () => {};

    const value = useMemo(
        () => ({
            posts: state.posts,
            currentPage: state.currentPage,
            nextPage: state.nextPage,
            totalPages: state.totalPages,
            postsDisplay: state.postsDisplay,
            getPosts,
            onPaginationHandler,
        }),
        [state],
    );

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};
