import React from 'react';
import { AdminCommentsList } from '@/modules/admin/components/comments/AdminCommentsList';

const AdminCommentsPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Moderación de Comentarios</h1>
        <AdminCommentsList />
        </div>
    );
};

export default AdminCommentsPage; 