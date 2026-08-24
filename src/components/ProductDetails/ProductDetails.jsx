import React from 'react';
import { useLoaderData } from 'react-router';

const ProductDetails = () => {
    const data = useLoaderData()

    return (
        <div>
            this is product details
        </div>
    );
};

export default ProductDetails;