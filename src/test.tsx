import React from 'react';

interface Props {
    name: string;
}

const MyComponent: React.FC<Props> = ({ name }) => {
    return (
        <div>
            <h1>Hello, {name}!</h1>
        </div>
    );
};

export default MyComponent;