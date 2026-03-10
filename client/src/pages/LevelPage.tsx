import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useExercises } from "@/hooks/use-exercises";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Loader2 } from "lucide-react";

export default function LevelPage() {
  const [, params] = useRoute("/level/:level");
  const level = params?.level || "KET";
  const { t } = useLanguage();
  
  const { data: exercises, isLoading, error } = useExercises(level);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
          {level} {t('levelPage.title')}
        </h1>
        <p className="text-slate-500">
          {t('levelPage.selectExercise')}
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive p-6 rounded-2xl border border-destructive/20 text-center">
          <p className="font-semibold">{t('levelPage.loadingError')}</p>
          <p className="text-sm opacity-80 mt-1">{t('levelPage.tryRefresh')}</p>
        </div>
      )}

      {!isLoading && !error && exercises?.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">{t('levelPage.noExercises')}</h3>
          <p className="text-slate-500">{t('levelPage.comingSoon').replace('{level}', level)}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {exercises?.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link 
              href={`/exercise/${exercise.id}`}
              className="block group h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-primary transition-colors duration-300" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold tracking-wide">
                  Exercise {index + 1}
                </span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <p className="text-slate-800 font-medium line-clamp-3 leading-relaxed">
                "{exercise.chineseText}"
              </p>
              
              {exercise.hints && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 line-clamp-1">
                    <span className="font-semibold text-slate-700">{t('levelPage.hint')}</span> {exercise.hints}
                  </p>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
