import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error, info) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Error:', error);
        console.error('Info:', info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Ocorreu um erro!</h1>
                    <p>Desculpe pelo inconveniente. Estamos trabalhando para corrigir o problema.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;