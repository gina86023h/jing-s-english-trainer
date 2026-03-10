import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, GraduationCap, Layers, Sparkles, Languages, Globe, BarChart3, BookMarked } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/hooks/useLanguage";

const LEVELS = [
  { id: "KET", name: "Key (KET)", desc: "A2 Level" },
  { id: "PET", name: "Preliminary (PET)", desc: "B1 Level" },
  { id: "FCE", name: "First (FCE)", desc: "B2 Level" },
  { id: "CAE", name: "Advanced (CAE)", desc: "C1 Level" },
  { id: "CPE", name: "Proficiency (CPE)", desc: "C2 Level" },
  { id: "IELTS", name: "IELTS Academic", desc: "All bands" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex-shrink-0 fixed inset-y-0 z-10 hidden md:flex md:flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Languages className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-slate-900 tracking-tight">{t('appName')}</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">{t('sidebar.tagline')}</p>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-6">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('sidebar.proficiencyLevels')}
            </p>
            <nav className="space-y-1">
              {LEVELS.map((level) => {
                const isActive = location === `/level/${level.id}`;
                return (
                  <Link 
                    key={level.id} 
                    href={`/level/${level.id}`}
                    className={clsx(
                      "flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-primary text-white shadow-md shadow-primary/25" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <div>
                      <div className={clsx(
                        "font-semibold text-sm", 
                        isActive ? "text-white" : "text-slate-700 group-hover:text-primary transition-colors"
                      )}>
                        {level.name}
                      </div>
                      <div className={clsx(
                        "text-xs mt-0.5",
                        isActive ? "text-primary-foreground/80" : "text-slate-400"
                      )}>
                        {level.desc}
                      </div>
                    </div>
                    {isActive && <Sparkles className="w-4 h-4 text-primary-foreground" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mb-6">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Learning Tools
            </p>
            <nav className="space-y-1">
              {[
                { path: '/progress', icon: BarChart3, label: t('sidebar.progress') },
                { path: '/error-notebook', icon: BookMarked, label: t('sidebar.errorNotebook') },
              ].map((item) => {
                const isActive = location === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 font-semibold mb-1">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>{t('sidebar.keepPracticing')}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('sidebar.message')}
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-2 bg-slate-100 rounded-xl p-1">
            {(['en', 'zh'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={clsx(
                  "flex-1 py-2 rounded-lg font-semibold text-sm transition-all duration-200",
                  language === lang
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-primary" />
            <h1 className="font-display font-bold text-lg text-slate-900">{t('appName')}</h1>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {(['en', 'zh'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={clsx(
                  "px-2 py-1 rounded text-xs font-semibold transition-all",
                  language === lang
                    ? "bg-primary text-white"
                    : "text-slate-600"
                )}
              >
                {lang === 'en' ? 'EN' : '中'}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
