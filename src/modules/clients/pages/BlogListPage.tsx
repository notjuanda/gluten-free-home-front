import React from 'react';
import BlogArticlesList from '../components/BlogArticlesList';

const BlogListPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <BlogArticlesList />
        </div>
    );
};

export default BlogListPage; 