import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap } from 'lucide-react';

interface ProgressData {
  id: number;
  exerciseId: number;
  score: number;
  userTranslation: string;
  completedAt?: string;
}

export default function ProgressPage() {
  const { t } = useLanguage();
  const { data: progressData = [], isLoading } = useQuery<ProgressData[]>({
    queryKey: ['/api/progress'],
    enabled: true,
  });

  const totalExercises = progressData.length;
  const averageScore = totalExercises > 0
    ? Math.round(progressData.reduce((sum, p) => sum + p.score, 0) / totalExercises)
    : 0;
  const excellentCount = progressData.filter(p => p.score >= 85).length;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            {t('progressPage.title')}
          </h1>
          <p className="text-slate-500">{t('progressPage.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="text-slate-500">{t('common.loading')}</div>
          </div>
        ) : totalExercises === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center border border-slate-200"
          >
            <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">{t('progressPage.noProgress')}</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{t('progressPage.totalExercises')}</p>
                    <p className="text-4xl font-bold text-slate-900">{totalExercises}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{t('progressPage.averageScore')}</p>
                    <p className="text-4xl font-bold text-slate-900">{averageScore}</p>
                  </div>
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Excellent (≥85)</p>
                    <p className="text-4xl font-bold text-slate-900">{excellentCount}</p>
                  </div>
                  <Zap className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </motion.div>

            {/* Progress History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Practice History</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {progressData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {item.userTranslation}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`inline-block px-3 py-1 rounded-lg font-bold text-sm ${
                          item.score >= 85 ? 'bg-emerald-100 text-emerald-700' :
                          item.score >= 60 ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {item.score}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}
