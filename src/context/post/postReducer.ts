import {
    GET_POSTS,
    FILTER_POST,
    SET_POSTS_TO_DISPLAY,
    SET_TOTAL_PAGES,
    SET_LANGUAGE,
    SET_RANGE,
    SET_CURRENT_PAGE
} from '../types';
import { IInitialState, IPost, languages } from './postProvider'

type Action =
    | { type: 'GET_POSTS', payload: Map<number, IPost> }
    | { type: 'FILTER_POST', payload: IPost[] }
    | { type: 'SET_TOTAL_PAGES', payload: number }
    | { type: 'SET_POSTS_TO_DISPLAY', payload: IPost[] }
    | { type: 'SET_LANGUAGE', payload: languages }
    | { type: 'SET_CURRENT_PAGE', payload: number }
    | { type: 'SET_RANGE', payload: number[] }

export const postReducer = (state: IInitialState, action: Action) => {

    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case FILTER_POST:
            return {
                ...state,
                posts: [...action.payload]
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            }
        case SET_POSTS_TO_DISPLAY:
            {

                return {
                    ...state,
                    postsDisplay: [...action.payload]
                }
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_RANGE:
            return {
                ...state,
                range: [...action.payload]
            }
        default:
            return state;
    }
};
