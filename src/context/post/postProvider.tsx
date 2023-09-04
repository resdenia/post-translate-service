import React, {
    useReducer,
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
    date?: string;
    id?: number;
    username?: string;
    titleES?: string;
    titleFR?: string;
    bodyES?: string;
    bodyFR?: string;
}
interface ITranslation {
    text: string;
}
interface ITranslationResponseItem {
    text: string;
    to: string;
}

interface ITranslationResponse {
    translations: ITranslationResponseItem[];
}
export enum languages {
    en = 'En',
    es = 'Es',
    fr = 'Fr',
}
export interface IInitialState {
    language: languages;
    posts: Map<number, IPost> | IPost[];
    currentPage: number;
    nextPage: number;
    totalPages: number;
    range: number[];
    postsDisplay: IPost[];
    defaultLanguage: languages;
}

export const PostProvider: FunctionComponent<IProps> = ({
    children,
}) => {
    const initialState: IInitialState = {
        posts: [],
        currentPage: 1,
        nextPage: 2,
        totalPages: 0,
        range: [1, 10],
        postsDisplay: [],
        language: languages.en,
        defaultLanguage: languages.en,
    };

    const [state, dispatch] = useReducer(
        postReducer,
        initialState,
    );

    const postsToDisplay = async (
        posts: Map<number, IPost>,
    ) => {
        const result: IPost[] = [];
        const postTranslate: ITranslation[] = [];
        for (
            let i = state.range[0];
            i <= state.range[1];
            i++
        ) {
            const post = (posts as Map<number, IPost>).get(
                i,
            );
            if (post != undefined) {
                postTranslate.push({
                    text: `__${post.id}__ ${
                        post.body
                    }PostDataSplitter${`${post.title}`}`,
                });
            }
        }

        const translatedData =
            await translationApi.translatePostAPI(
                postTranslate,
            );

        translatedData.forEach(
            (transaltedItem: ITranslationResponse) => {
                const postId =
                    transaltedItem.translations[0].text
                        .split(' ')[0]
                        .replace(/_/g, '');

                const dataFR =
                    transaltedItem.translations[0].text.split(
                        ' ',
                    );
                const dataES =
                    transaltedItem.translations[1].text.split(
                        ' ',
                    );
                dataFR.splice(0, 1);
                dataES.splice(0, 1);

                const [bodyFR, titleFR] = dataFR
                    .join(' ')
                    .split('PostDataSplitter');
                const [bodyES, titleES] = dataES
                    .join(' ')
                    .split('PostDataSplitter');
                console.log(`${bodyES}: `, titleES);
                const post = (
                    posts as Map<number, IPost>
                ).get(+postId);
                console.log(post);
                if (post != undefined) {
                    result.push({
                        ...post,
                        bodyFR,
                        titleFR,
                        bodyES,
                        titleES,
                    });
                }
            },
        );
        console.log(result);
        dispatch({
            type: SET_POSTS_TO_DISPLAY,
            payload: [...result],
        });
    };

    const getPosts = async () => {
        try {
            let posts = await postsApi.getPosts();

            if (!posts) {
                posts = postsDump;
            }

            const mappedPosts = new Map();

            posts.forEach((post: IPost, idx: number) => {
                mappedPosts.set(post.id, {
                    ...post,
                });
            });

            dispatch({
                type: SET_TOTAL_PAGES,
                payload: posts.length / 10,
            });

            dispatch({
                type: GET_POSTS,
                payload: mappedPosts,
            });
            postsToDisplay(mappedPosts);
        } catch (e) {
            console.log(e);
        }
    };

    const onPaginationHandler = async (
        pageId: number,
        direction?: string,
    ) => {
        dispatch({
            type: SET_CURRENT_PAGE,
            payload: pageId,
        });
        if (direction === 'prev') {
            dispatch({
                type: SET_RANGE,
                payload: [
                    state.range[0] - 10,
                    state.range[1] - 10,
                ],
            });
        } else if (direction === 'next') {
            dispatch({
                type: SET_RANGE,
                payload: [
                    state.range[0] + 10,
                    state.range[1] + 10,
                ],
            });
        } else if (direction === 'first') {
            dispatch({
                type: SET_RANGE,
                payload: [1, 10],
            });
        } else if (direction === 'last') {
            dispatch({
                type: SET_RANGE,
                payload: [
                    state.totalPages * 10 - 10,
                    state.totalPages * 10,
                ],
            });
        }
        console.log(state.postsDisplay);
        postsToDisplay(state.posts as Map<number, IPost>);
    };

    const toggleLanguage = async (lang: languages) => {
        dispatch({ type: SET_LANGUAGE, payload: lang });
    };

    const value = useMemo(
        () => ({
            language: state.language,
            posts: state.posts,
            currentPage: state.currentPage,
            nextPage: state.nextPage,
            totalPages: state.totalPages,
            postsDisplay: state.postsDisplay,
            getPosts,
            onPaginationHandler,
            toggleLanguage,
            postsToDisplay,
        }),
        [state],
    );

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};
