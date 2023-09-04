import React, {
    ErrorInfo,
    ReactNode,
    Suspense,
} from 'react';

interface ErrorBoundaryPropsInterface {
    children: ReactNode;
}

interface ErrorBoundaryStateInterface {
    hasError: boolean;
}

/**
 * Error boundary is React component that catch JavaScript
 * errors anywhere in their child component tree, log those errors,
 * and display a fallback UI instead of the component tree that crashed.
 * Error boundaries catch errors during rendering, in lifecycle methods,
 * and in constructors of the whole tree below them.
 */
class ErrorBoundary extends React.Component<
    ErrorBoundaryPropsInterface,
    ErrorBoundaryStateInterface
> {
    constructor(props: ErrorBoundaryPropsInterface) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            // You can render any custom fallback UI
            return <Suspense fallback="">Error</Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;
