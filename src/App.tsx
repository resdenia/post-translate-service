import React, {
    Suspense,
    useContext,
    useEffect,
} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import { HomePageAsync } from './pages/Home/Home.async';
import NotFound from './pages/NotFound';
import { PostContext } from './context/post/postContext';

function App() {
    const { getPosts, posts } = useContext(PostContext);

    useEffect(() => {
        if (posts.length === 0) {
            getPosts();
        }
    }, [getPosts, posts]);

    return (
        <Suspense fallback={<div>loading</div>}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePageAsync />}
                    />
                    <Route
                        path="/*"
                        element={<NotFound />}
                    />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
