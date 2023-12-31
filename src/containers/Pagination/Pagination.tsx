import React, {
    memo,
    useCallback,
    useContext,
} from 'react';
import Button from '../../components/Button/Button';
import cls from './Pagination.module.css';
import { PostContext } from '../../context/post/postContext';

interface PaginationProps {
    className?: string;
}
const Pagination = memo((props: PaginationProps) => {
    const { currentPage, totalPages, onPaginationHandler } =
        useContext(PostContext);

    return (
        <div className={cls.Pagination}>
            <div className={cls.firstPage}>
                Page:
                <Button
                    disabled={currentPage === 1}
                    onClick={() => {
                        onPaginationHandler(0, 'first');
                    }}
                >
                    1
                </Button>
            </div>
            <div className={cls.prevPage}>
                <Button
                    disabled={currentPage - 1 === 0}
                    onClick={() => {
                        onPaginationHandler(
                            currentPage - 1,
                            'prev',
                        );
                    }}
                >
                    Previous
                </Button>
            </div>
            <div className={cls.currentPage}>
                Current:
                {currentPage}
            </div>
            <div className={cls.nextPage}>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        onPaginationHandler(
                            currentPage + 1,
                            'next',
                        );
                    }}
                >
                    Next
                </Button>
            </div>
            <div className={cls.lastPage}>
                Page:
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        onPaginationHandler(
                            totalPages,
                            'last',
                        );
                    }}
                >
                    {totalPages}
                </Button>
            </div>
        </div>
    );
});
export default Pagination;
