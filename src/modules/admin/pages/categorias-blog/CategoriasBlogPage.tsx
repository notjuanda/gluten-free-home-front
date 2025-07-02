import { useState } from 'react';
import { FiPlus, FiTag, FiFolder } from 'react-icons/fi';
import TagsList from '../../components/tags/TagsList';
import BlogCategoriesList from '../../components/blog-categories/BlogCategoriesList';
import CreateTagModal from '../../components/tags/CreateTagModal';
import CreateBlogCategoryModal from '../../components/blog-categories/CreateBlogCategoryModal';

type TabType = 'tags' | 'categories';

export default function CategoriasBlogPage() {
    const [activeTab, setActiveTab] = useState<TabType>('tags');
    const [tagModalOpen, setTagModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger(t => t + 1);
    };

    return (
        <div className="min-h-[80vh] from-primary/5 via-background to-primary/10 px-2 sm:px-0">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border/40 px-6 py-5 rounded-b-2xl shadow-md mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Gestión de Blog
                    </h1>
                    <button 
                        onClick={() => activeTab === 'tags' ? setTagModalOpen(true) : setCategoryModalOpen(true)} 
                        className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span className="hidden sm:inline">
                            {activeTab === 'tags' ? 'Agregar Tag' : 'Agregar Categoría'}
                        </span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-muted rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('tags')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                            activeTab === 'tags'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <FiTag className="w-4 h-4" />
                        <span className="hidden sm:inline">Tags</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                            activeTab === 'categories'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <FiFolder className="w-4 h-4" />
                        <span className="hidden sm:inline">Categorías</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in">
                {activeTab === 'tags' ? (
                    <TagsList refreshTrigger={refreshTrigger} />
                ) : (
                    <BlogCategoriesList refreshTrigger={refreshTrigger} />
                )}
            </div>

            {/* Modals */}
            <CreateTagModal 
                open={tagModalOpen} 
                onClose={() => setTagModalOpen(false)} 
                onCreated={handleRefresh} 
            />
            <CreateBlogCategoryModal 
                open={categoryModalOpen} 
                onClose={() => setCategoryModalOpen(false)} 
                onCreated={handleRefresh} 
            />
        </div>
    );
} 