import React from 'react';
import BlogArticlesList from '../components/BlogArticlesList';
import { Helmet } from 'react-helmet-async';

const BlogListPage: React.FC = () => {
    return (
        <>
        <Helmet>
            <title>Blog | Gluten Free Home</title>
            <meta name="description" content="Descubre artículos, consejos y novedades sobre vida sin gluten, recetas y salud en nuestro blog." />
            <meta property="og:title" content="Blog | Gluten Free Home" />
            <meta property="og:description" content="Descubre artículos, consejos y novedades sobre vida sin gluten, recetas y salud en nuestro blog." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
        <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <BlogArticlesList />
        </div>
        </>
    );
};

export default BlogListPage; 