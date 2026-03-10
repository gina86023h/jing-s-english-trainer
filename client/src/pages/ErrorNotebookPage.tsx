import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { Trash2, AlertCircle } from 'lucide-react';

interface ErrorEntry {
  id: number;
  exerciseId: number;
  chineseText: string;
  userTranslation: string;
  correctTranslation: string;
  score: number;
  feedback: string;
  savedAt?: string;
}

export default function ErrorNotebookPage() {
  const { t } = useLanguage();
  const { data: errors = [], isLoading, refetch } = useQuery<ErrorEntry[]>({
    queryKey: ['/api/error-book'],
    enabled: true,
  });

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/error-book/${id}`, { method: 'DELETE' });
      refetch();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            {t('errorNotebookPage.title')}
          </h1>
          <p className="text-slate-500">{t('errorNotebookPage.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="text-slate-500">{t('common.loading')}</div>
          </div>
        ) : errors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center border border-slate-200"
          >
            <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">{t('errorNotebookPage.noErrors')}</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {errors.map((error, idx) => (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Chinese Source */}
                  <div className="mb-4 pb-4 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Original Chinese
                    </p>
                    <p className="text-slate-800 font-medium">{error.chineseText}</p>
                  </div>

                  {/* Grid Layout for Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Your Translation */}
                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-2">
                        {t('errorNotebookPage.yourTranslation')}
                      </p>
                      <p className="text-slate-700 leading-relaxed">{error.userTranslation}</p>
                      <p className="text-sm text-rose-600 font-semibold mt-2">
                        Score: {error.score}
                      </p>
                    </div>

                    {/* Correct Translation */}
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">
                        {t('errorNotebookPage.correctTranslation')}
                      </p>
                      <p className="text-slate-700 leading-relaxed">{error.correctTranslation}</p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-4">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">
                      {t('errorNotebookPage.feedback')}
                    </p>
                    <p className="text-slate-700 leading-relaxed">{error.feedback}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      {t('errorNotebookPage.saved')}: {error.savedAt ? new Date(error.savedAt).toLocaleDateString() : 'N/A'}
                    </p>
                    <button
                      onClick={() => handleDelete(error.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title={t('errorNotebookPage.delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
