import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowRight, BookA, Target, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

export default function Dashboard() {
  const { language, t } = useLanguage();
  const dashboardFeatures = translations[language].dashboard.features;

  return (
    <Layout>
      <div className="h-full flex flex-col justify-center items-center text-center max-w-3xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('dashboard.badge')}
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight mb-6">
            {t('dashboard.title')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              {t('dashboard.subtitle')}
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto text-balance">
            {t('dashboard.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12"
        >
          {dashboardFeatures.map((feature: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 mx-auto text-primary">
                {i === 0 ? <BookA className="w-6 h-6" /> : i === 1 ? <BrainCircuit className="w-6 h-6" /> : <Target className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/level/FCE" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('dashboard.startBtn')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
