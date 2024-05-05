import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPages = () => {
    return (
        <div className='text-center'>
            <h2 className='text-3xl mb-6'>ooops </h2>
            <Link className='text-purple-700 py-2 px-6 bg-green-700'>Back to Home</Link>
        </div>
    );
};

export default ErrorPages;