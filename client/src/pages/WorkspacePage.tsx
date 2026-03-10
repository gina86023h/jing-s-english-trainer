import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useExercise, useEvaluateTranslation } from "@/hooks/use-exercises";
import { useLanguage } from "@/hooks/useLanguage";
import { ScoreIndicator } from "@/components/ScoreIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Loader2, Sparkles, CheckCircle2, 
  Lightbulb, AlertCircle, Quote 
} from "lucide-react";
import type { EvaluationResponse } from "@shared/schema";

export default function WorkspacePage() {
  const [, params] = useRoute("/exercise/:id");
  const exerciseId = parseInt(params?.id || "0", 10);
  const { t } = useLanguage();
  
  const { data: exercise, isLoading } = useExercise(exerciseId);
  const evaluateMutation = useEvaluateTranslation();
  
  const [translation, setTranslation] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);

  const handleSubmit = async () => {
    if (!translation.trim()) return;
    
    try {
      const result = await evaluateMutation.mutateAsync({
        exerciseId,
        userTranslation: translation.trim(),
      });
      setEvaluation(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!exercise) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-800">{t('workspace.exerciseNotFound')}</h2>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">{t('workspace.returnHome')}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-20">
        <Link 
          href={`/level/${exercise.level}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('workspace.backTo').replace('{level}', exercise.level)}
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-indigo-400" />
          <div className="flex items-start gap-4">
            <Quote className="w-8 h-8 text-primary/20 shrink-0 rotate-180 mt-1" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t('workspace.translateToEnglish')}
              </p>
              <h2 className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed text-balance">
                {exercise.chineseText}
              </h2>
            </div>
          </div>
          
          {exercise.hints && (
            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3 text-amber-800">
              <Lightbulb className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <span className="font-bold block mb-1">{t('workspace.hint')}</span>
                {exercise.hints}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="translation" className="sr-only">{t('workspace.yourTranslation')}</label>
          <div className="relative">
            <textarea
              id="translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={evaluateMutation.isPending || !!evaluation}
              placeholder={t('workspace.placeholder')}
              className="w-full min-h-[160px] p-6 text-lg bg-white rounded-3xl border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-y disabled:opacity-75 disabled:bg-slate-50 disabled:cursor-not-allowed shadow-sm"
            />
            <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400">
              {t('workspace.submitHint')}
            </div>
          </div>

          {!evaluation && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={evaluateMutation.isPending || !translation.trim()}
                className="px-8 py-3.5 rounded-2xl font-bold text-white bg-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none disabled:shadow-none transition-all duration-200 flex items-center gap-2"
              >
                {evaluateMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('workspace.evaluating')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t('workspace.evaluateBtn')}
                  </>
                )}
              </button>
            </div>
          )}
          
          {evaluateMutation.isError && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium text-sm">{t('workspace.failedEval')}</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 md:p-10 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-slate-100 pb-8 mb-8">
                  <ScoreIndicator score={evaluation.score} />
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                      {evaluation.score >= 85 ? t('workspace.excellentWork') : evaluation.score >= 60 ? t('workspace.goodEffort') : t('workspace.keepPracticing')}
                    </h3>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                      {evaluation.feedback}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      {t('workspace.improvements')}
                    </h4>
                    {evaluation.improvements.length > 0 ? (
                      <ul className="space-y-3">
                        {evaluation.improvements.map((imp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            <span className="text-sm leading-relaxed">{imp}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{t('workspace.perfect')}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {t('workspace.reference')}
                    </h4>
                    <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl h-full">
                      <p className="text-emerald-900 font-medium leading-relaxed">
                        {exercise.referenceEnglish}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
                  <button
                    onClick={() => {
                      setEvaluation(null);
                      setTranslation("");
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors duration-200"
                  >
                    {t('workspace.tryAgain')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
