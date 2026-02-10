'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  MapPin,
  Zap,
  TrendingUp,
  Globe,
  MessageCircle,
  Star,
  Menu,
  X,
  ArrowLeft, // Changed from ArrowRight for RTL
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Layout,
  Stethoscope,
  Building,
  Coffee,
  ShoppingCart
} from 'lucide-react';

// WhatsApp Brand Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00CC95] to-[#00CC6C] flex items-center justify-center text-white font-bold">
            إ
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">إزدهار<span className="text-[#00CC95]"> ويب</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-[#00CC95] transition-colors font-medium">لماذا نحن؟</a>
          <a href="#portfolio" className="text-slate-600 hover:text-[#00CC95] transition-colors font-medium">أعمالنا</a>
          <a href="#packages" className="text-slate-600 hover:text-[#00CC95] transition-colors font-medium">الباقات</a>
          <a href="#testimonials" className="text-slate-600 hover:text-[#00CC95] transition-colors font-medium">النتائج</a>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors">
            دخول العملاء
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-700">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00CC95] to-[#00CC6C] flex items-center justify-center text-white font-bold">
                    إ
                  </div>
                  <span className="font-bold text-lg text-slate-800">إزدهار<span className="text-[#00CC95]"> ويب</span></span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col p-5 gap-2">
                {[
                  { href: '#features', label: 'لماذا نحن؟', delay: 0.1 },
                  { href: '#portfolio', label: 'أعمالنا', delay: 0.15 },
                  { href: '#packages', label: 'الباقات', delay: 0.2 },
                  { href: '#testimonials', label: 'النتائج', delay: 0.25 },
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay, duration: 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-xl text-slate-700 font-medium hover:bg-[#00CC95]/10 hover:text-[#00CC95] transition-all group"
                  >
                    <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#00CC95] transition-colors" />
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-5 border-t border-slate-100 bg-slate-50"
              >
                <a
                  href="https://wa.me/966XXXXXXXXX"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#00CC95] to-[#00CC6C] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#00CC95]/30"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  تواصل معنا
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [beams, setBeams] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generateBeams = () => {
      const newBeams = [];
      for (let i = 0; i < 8; i++) {
        newBeams.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 2 + Math.random() * 3,
        });
      }
      setBeams(newBeams);
    };
    generateBeams();
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Animated Grid Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(0 204 149 / 0.08)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </motion.div>

      {/* Animated Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 4,
            ease: 'linear',
          }}
          className="absolute z-10 w-[2px] h-24"
          style={{
            left: `${beam.left}%`,
            background: 'linear-gradient(to bottom, transparent, #00CC95, transparent)',
            boxShadow: '0 0 12px 3px rgba(0, 204, 149, 0.25)',
          }}
        />
      ))}

      {/* Subtle glowing orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[#00CC95]/10 text-[#00CC95] font-semibold text-sm mb-6 border border-[#00CC95]/20 backdrop-blur-sm">
            🚀 انطلق بمشروعك في 48 ساعة فقط
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            نمو أعمالك لا يحتاج ميزانيات ضخمة.. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00CC95] to-[#00CC6C]">
              احصل على نتائج احترافية بأسعار تنافسية.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            في إزدهار ويب، نحطم قاعدة "الغالي ثمنه فيه". نقدم لك خدمات تسويقية احترافية (مواقع، متاجر، وإعلانات جوجل) بجودة عالمية وأسعار تنافسية، مصممة خصيصاً لتحويل كل ريال تدفعه إلى أرباح حقيقية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/966XXXXXXXXX" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00CC95] to-[#00CC6C] text-white font-bold text-lg shadow-lg shadow-[#00CC95]/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5" />
                ابدأ نمو أعمالك الآن
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a href="#packages" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              تصفح الباقات
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-400">
            <div className="flex items-center gap-2"><CheckCircle2 className="text-[#00CC95]" size={16} /> +50 عميل في السعودية</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-[#00CC95]" size={16} /> تقييم 4.9/5</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-[#00CC95]" size={16} /> ضمان الرضا 100%</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ClientLogos = () => {
  const clients = [
    '/clients/aaa-Logo.png',
    '/clients/bajunaid.png',
    '/clients/wsenglish.png',
    '/clients/tohatsulogo.png',
    '/clients/mydoc.png',
    '/clients/eshraqgroup.png',
    '/clients/greenroasteriescoffee.png',
    '/clients/inspeedglobal.png',
    '/clients/joynt-1.png',
    '/clients/maeva-2.png',
    '/clients/maha.png',
    '/clients/mahawer.png',
    '/clients/new-rayan-clinic.png',
    '/clients/givernvalu.png',
    '/clients/purenbio.png',
    '/clients/proclipse.png',

  ];

  return (
    <section className="py-16 border-b border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-12">شركات نالت ثقتنا</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex" dir="ltr">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 items-center shrink-0 pr-20"
          >
            {clients.map((src, i) => (
              <div key={i} className="h-16 w-32 relative transition-all duration-300 hover:scale-110">
                <Image
                  src={src}
                  alt="Client Logo"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 items-center shrink-0 pr-20"
          >
            {clients.map((src, i) => (
              <div key={i} className="h-16 w-32 relative transition-all duration-300 hover:scale-110">
                <Image
                  src={src}
                  alt="Client Logo"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-[#00CC95]/10 flex items-center justify-center mb-6 group-hover:bg-[#00CC95] transition-colors duration-300">
      <Icon className="w-6 h-6 text-[#00CC95] group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">لماذا تثق بنا الشركات في الرياض وجدة؟</h2>
          <p className="text-slate-500 max-w-xl mx-auto">الوكالات التقليدية بطيئة ومكلفة. نحن نستخدم الأتمتة لتقديم نتائج متميزة بتكلفة أقل وسرعة خيالية.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Zap}
            title="تسليم سريع كالبرق"
            description="لا نقضي شهوراً في البرمجة. تقنياتنا المؤتمتة تجعل موقعك الاحترافي جاهزاً خلال أقل من 48 ساعة."
          />
          <FeatureCard
            icon={Smartphone}
            title="مصمم للجوال أولاً"
            description="95% من العملاء في السعودية يستخدمون الجوال. تصاميمنا مبنية خصيصاً لتجربة تصفح سلسة وسريعة على الهواتف."
          />
          <FeatureCard
            icon={MapPin}
            title="هيمنة محلية"
            description="نقوم بتحسين ظهورك خصيصاً في بحث خرائط جوجل في مدينتك، مما يجلب لك زواراً حقيقيين لمقرك."
          />
        </div>
      </div>
    </section>
  );
};

const PortfolioModal = ({ isOpen, onClose, url, title }: { isOpen: boolean; onClose: () => void; url: string; title: string }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-5xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium text-slate-600">{title}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <X size={20} className="text-slate-600" />
            </button>
          </div>
          {/* Iframe */}
          <iframe src={url} className="w-full h-[calc(100%-60px)]" title={title} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PortfolioItem = ({ title, category, color, url, onClick, image }: { title: string; category: string; color: string; url: string; onClick: () => void; image?: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white border border-slate-100 cursor-pointer flex-shrink-0 w-[320px]"
  >
    <div className="h-48 w-full bg-slate-100 relative overflow-hidden" dir="ltr">
      {image ? (
        <Image src={image} alt={title} fill className="object-cover" />
      ) : (
        <>
          <div className={`absolute inset-0 opacity-20 ${color}`}></div>
          <div className="absolute top-4 left-4 right-4 h-full bg-white rounded-t-lg shadow-sm p-4">
            <div className="flex gap-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
              <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
              <div className="w-full h-20 bg-slate-50 rounded mt-4"></div>
            </div>
          </div>
        </>
      )}
      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white font-bold flex items-center gap-2">معاينة مباشرة <ExternalLink size={16} /></span>
      </div>
    </div>
    <div className="p-6 text-right" dir="rtl">
      <div className="text-xs font-bold text-[#00CC95] uppercase tracking-wide mb-1">{category}</div>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00CC95] transition-colors">{title}</h3>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<{ url: string; title: string } | null>(null);

  const projects = [
    { title: 'عيادة الأسنان ماي دكتور', category: 'عيادات طبية', color: 'bg-blue-500', url: 'https://mydoctor-six.vercel.app/', image: '/portfolio/mydoc.png' },
    { title: 'عيادة نيو ريان', category: 'عيادات طبية', color: 'bg-teal-500', url: 'https://newrayan.vercel.app/', image: '/portfolio/newrayan.png' },
    { title: 'مجموعة شركات إشراق', category: 'شركات', color: 'bg-amber-600', url: 'https://eshraqgroup.com', image: '/portfolio/eshraqgroup.png' },
    { title: 'وول ستريت إنجلش', category: 'تعليم', color: 'bg-red-500', url: 'https://campaign.wallstreetenglish.edu.sa/', image: '/portfolio/wallstreetenglish.png' },
    { title: 'وول ستريت إنجلش بيزنس', category: 'تعليم', color: 'bg-red-600', url: 'https://b2b.wallstreetenglish.edu.sa/', image: '/portfolio/b2bwse.png' },
    { title: 'شركة توهاتسو', category: 'تجارة', color: 'bg-indigo-500', url: 'https://www.tohatsuarabia.com/', image: '/portfolio/tohatsu.png' },
    { title: 'شركة باجنيد', category: 'شركات', color: 'bg-yellow-600', url: 'https://bajunaid-sa.com/', image: '/portfolio/bajunaid.png' },
    { title: 'متجر المحامص الخضراء', category: 'مطاعم وكافيهات', color: 'bg-green-600', url: 'https://thegreenroasteries.com/', image: '/portfolio/greenroasteries.png' },
    { title: 'شركة الإستشارات الإستثمارية جوفرن فاليو', category: 'إستشارات', color: 'bg-purple-600', url: 'https://www.governvalu.com/', image: '/portfolio/govervalu.png' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">أحدث أعمالنا</h2>
            <p className="text-slate-500">شاهد كيف نساعد الشركات على النمو رقمياً.</p>
          </div>
          <a href="#" className="text-[#00CC95] font-bold flex items-center gap-2 hover:gap-3 transition-all">
            عرض كامل الأعمال <ArrowLeft size={18} />
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative" dir="ltr">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex flex-nowrap"
          >
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-8 pr-8 shrink-0">
                {projects.map((project, i) => (
                  <PortfolioItem
                    key={`${groupIndex}-${i}`}
                    title={project.title}
                    category={project.category}
                    color={project.color}
                    url={project.url}
                    image={project.image}
                    onClick={() => setSelectedProject({ url: project.url, title: project.title })}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <PortfolioModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        url={selectedProject?.url || ''}
        title={selectedProject?.title || ''}
      />
    </section>
  );
};

const PricingCard = ({
  title,
  price,
  description,
  features,
  recommended = false,
  delay
}: {
  title: string,
  price: string,
  description: string,
  features: string[],
  recommended?: boolean,
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.2 }}
      className={`relative rounded-3xl p-8 ${recommended
        ? 'bg-slate-900 text-white shadow-2xl scale-105 border-2 border-[#00CC95]'
        : 'bg-white text-slate-900 border border-slate-200 shadow-lg'}`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00CC95] to-[#00CC6C] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
          الأكثر طلباً
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${recommended ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <div className="flex items-baseline gap-1 mb-4 flex-row-reverse justify-end">
        {/* Currency formatting flipped for RTL usually handled by flex-row-reverse or manual order */}
        <span className="text-sm font-medium opacity-70">/مرة واحدة</span>
        <span className={`text-4xl font-extrabold mx-1 ${recommended ? 'text-[#00CC95]' : 'text-slate-900'}`}>{price}</span>
        <span className="text-sm font-medium opacity-70">ريال</span>
      </div>
      <p className={`text-sm mb-8 ${recommended ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>

      <div className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${recommended ? 'text-[#00CC95]' : 'text-[#00CC95]'}`} />
            <span className={`text-sm ${recommended ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended
        ? 'bg-gradient-to-r from-[#00CC95] to-[#00CC6C] hover:shadow-lg hover:shadow-[#00CC95]/25 text-white'
        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}>
        اختر الباقة
      </button>
    </motion.div>
  );
};

const ServiceModal = ({ isOpen, onClose, service }: { isOpen: boolean; onClose: () => void; service: any }) => {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10 text-right" dir="rtl">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
              <p className="text-slate-500 text-sm">اختر الباقة المناسبة لاحتياجاتك</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors absolute left-8">
              <X size={24} className="text-slate-500" />
            </button>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-6" dir="rtl">
            {service.tiers.map((tier: any, idx: number) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 border transition-all ${idx === 1
                  ? 'border-[#00CC95] bg-[#00CC95]/5 shadow-lg scale-105 z-10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
              >
                {idx === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00CC95] text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    الأكثر طلباً
                  </div>
                )}
                <h4 className="text-lg font-bold text-slate-900 mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-4 flex-row-reverse justify-end">
                  <span className="text-3xl font-bold text-[#00CC95]">{tier.price}</span>
                  <span className="text-xs text-slate-500">ريال</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#00CC95] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/966XXXXXXXXX?text=مرحبا، أهتم بباقة ${tier.name} لخدمة ${service.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${idx === 1
                    ? 'bg-[#00CC95] text-white hover:bg-[#00b383]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  اطلب الآن
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DetailedServices = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: 'landing',
      title: 'صفحة هبوط (Landing Page)',
      icon: Layout,
      iconColor: 'bg-blue-50 text-blue-600',
      price: '550 ريال',
      description: 'صممت خصيصاً لتحويل الزوار إلى عملاء. مثالية للحملات الإعلانية.',
      mainFeatures: ['تصميم جذاب وعصري', 'سرعة تحميل فائقة', 'ربط مع واتساب وCRM'],
      tiers: [
        {
          name: 'الأساسية',
          price: '550',
          features: ['تصميم صفحة واحدة', 'شعار الهوية', 'ربط واتساب', 'تسليم خلال 48 ساعة']
        },
        {
          name: 'المتقدمة',
          price: '850',
          features: ['كل ما في الأساسية', 'كتابة محتوى تسويقي', 'تحسين السرعة القصوى', 'ربط دومين خاص', 'تكامل مع سناب شات بيكسل']
        },
        {
          name: 'الاحترافية',
          price: '1,200',
          features: ['كل ما في المتقدمة', 'تصميم A/B Testing', 'لوحة تحكم CRM مبسطة', 'دعم فني لمدة شهر', 'تحليلات زوار متقدمة']
        }
      ]
    },
    {
      id: 'website',
      title: 'موقع تعريفي متكامل',
      icon: Globe,
      iconColor: 'bg-purple-50 text-purple-600',
      price: '999 ريال',
      description: 'واجهة رقمية احترافية لشركتك لتعزيز المصداقية والوصول.',
      mainFeatures: ['4 صفحات تعريفية', 'لوحة تحكم سهلة + محتوى', 'متوافق مع الشاشات + تعريف الموقع على جوجل بحث'],
      tiers: [
        {
          name: 'الأساسية',
          price: '999',
          features: ['4 صفحات (الرئيسية، من نحن، خدماتنا، اتصل بنا)', 'تصميم متجاوب', 'لوحة تحكم + إضافة المحتوى', 'تعريف على خرائط جوجل', 'شهادة SSL مجانية']
        },
        {
          name: 'المتقدمة',
          price: '1,300',
          features: ['6 صفحات تعريفية', 'معرض أعمال احترافي', 'مدونة أخبار الشركة', 'بريد إلكتروني رسمي (info@name.com)', 'حماية متقدمة', 'دعم فني لمدة شهر']
        },
        {
          name: 'الاحترافية',
          price: '1,700',
          features: ['عدد صفحات مفتوح', 'تعدد لغات (عربي/إنجليزي)', 'نظام حجز مواعيد', 'شات بوت آلي للرد على العملاء', 'دعم فني VIP لمدة 3 أشهر', 'تحسين SEO متقدم']
        }
      ]
    },
    {
      id: 'ecommerce',
      title: 'إنشاء متجر إلكتروني إحترافي',
      icon: ShoppingCart,
      iconColor: 'bg-orange-50 text-orange-600',
      price: '999 ريال',
      description: 'متجر إلكتروني جاهز للبيع مع إدارة سهلة للمنتجات والطلبات.',
      mainFeatures: ['تصميم عصري وسريع', 'لوحة تحكم للطلبات', 'إضافة منتجات بسهولة'],
      tiers: [
        {
          name: 'الأساسية',
          price: '999',
          features: ['تصميم متجر بسيط وأنيق', 'إضافة حتى 20 منتج', 'ربط واتساب للطلبات', 'تحميل سريع للصفحات', 'شهادة SSL مجانية', 'تسليم خلال 5 أيام']
        },
        {
          name: 'المتقدمة',
          price: '1,400',
          features: ['تصميم متجر احترافي مخصص', 'إضافة حتى 50 منتج', 'نظام إدارة الطلبات', 'بوابة دفع إلكتروني', 'ربط مع شركات الشحن', 'تقارير المبيعات', 'دعم فني أسبوع']
        },
        {
          name: 'الاحترافية',
          price: '1,700',
          features: ['تصميم VIP حسب الطلب', 'منتجات غير محدودة', 'نظام إدارة متقدم للطلبات', 'كوبونات وعروض ترويجية', 'تطبيق موبايل PWA', 'تحسين SEO للمتجر', 'دعم فني شهر كامل']
        }
      ]
    },
    {
      id: 'ads',
      title: 'إدارة حملات جوجل (Ads)',
      icon: Zap,
      iconColor: 'bg-green-50 text-green-600',
      price: '1,500 ريال / ش',
      description: 'احصل على زيارات فورية وعملاء جاهزين للشراء الآن.',
      mainFeatures: ['إدارة الحملات الإعلانية', 'تتبع النتائج (Tracking)', 'تحسين مستمر للحملات'],
      tiers: [
        {
          name: 'الأساسية',
          price: '1,500',
          features: ['إدارة حملة بحث واحدة', 'بحث الكلمات المفتاحية', 'كتابة محتواى الإعلان', 'تقرير شهري']
        },
        {
          name: 'المتقدمة',
          price: '2,500',
          features: ['إدارة 3 حملات (بحث، يوتيوب، ديسبلاي)', 'إعداد تتبع الاحالات (Conversions)', 'إعادة استهداف (Retargeting)', 'تقارير أسبوعية']
        },
        {
          name: 'الاحترافية',
          price: '4,000',
          features: ['حملات غير محدودة', 'إدارة ميزانيات ضخمة', 'تصميم بنرات إعلانية', 'فريق مخصص', 'دعم 24/7']
        }
      ]
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">خدمات احترافية مفصلة</h3>
        <p className="text-slate-500">حلول مخصصة لاحتياجاتك الدقيقة.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedService(service)}
            className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start cursor-pointer hover:border-[#00CC95]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="text-[#00CC95]" size={20} />
            </div>
            <div className={`p-4 rounded-2xl ${service.iconColor}`}>
              <service.icon className="w-8 h-8" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-slate-900">{service.title}</h4>
                <div className="text-right">
                  <span className="font-bold text-[#00CC95] block">{service.price}</span>
                  <span className="text-[10px] text-slate-400 font-normal">يبدأ من</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.mainFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00CC95]" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-[#00CC95] hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-[#00CC95] group-hover:text-white">
                <WhatsAppIcon className="w-4 h-4" /> ابدأ الآن
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="packages" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">باقات واضحة. بدون رسوم خفية.</h2>
          <p className="text-slate-500">اختر السرعة التي تريد أن ينمو بها عملك.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <PricingCard
            title="الهوية الرقمية"
            price="999"
            description="مثالية للمحلات الجديدة والحرفيين الباحثين عن تواجد سريع."
            features={[
              "توثيق نشاطي التجاري (Google My Business)",
              "صفحة هبوط سريع من صفحة واحدة",
              "ربط الصفحة بواتساب او CRM Form",
              "زر واتساب مباشر للمحادثة",
              "باركود QR لتقييمات العملاء",
              "التسليم خلال 48 ساعة"
            ]}
            delay={1}
          />
          <PricingCard
            title="النمو السريع"
            price="1,499"
            description="الخيار الأفضل للعيادات والخدمات التي تحتاج اتصالات فورية."
            recommended={true}
            features={[
              "كل مميزات باقة الهوية الرقمية",
              "موقع شركة متكامل (4 صفحات)",
              "صفحة هبوط عالية التحويل (Landing Page)",
              "إعداد حملات جوجل الإعلانية",
              "نظام تنبيهات للعملاء المحتملين (CRM)",
              "تحسين محركات البحث الأساسي (SEO)",
              "التسليم خلال 4 أيام"
            ]}
            delay={2}
          />
          <PricingCard
            title="الهيمنة المحلية"
            price="1,990"
            description="للشركات القائمة التي تريد السيطرة على قطاعها."
            features={[
              "كل مميزات باقة النمو السريع",
              "موقع شركة متكامل (6 صفحات)",
              "إعداد نظام تتبع متقدم",
              "إعداد حملات جوجل ادس",
              "سيو محلي متقدم",
              "إعداد بريد إلكتروني رسمي",
              "تجهيز حسابات التواصل الاجتماعي",
              "دعم فني ذو أولوية",
              "التسليم خلال 7 أيام"
            ]}
            delay={3}
          />
        </div>

        {/* Detailed Services Grid */}
        <DetailedServices />
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "د. أحمد الشمري",
      role: "مالك عيادة أسنان، الرياض",
      content: "كنا نعاني في جذب المراجعين للعيادة. قام فريق إزدهار ويب بإنشاء صفحة الهبوط وضبط الخرائط في 3 أيام فقط. تلقينا 15 اتصالاً في الأسبوع الأول.",
      initial: "د.أ",
      rating: 5
    },
    {
      name: "عمر السيد",
      role: "مؤسسة مقاولات، جدة",
      content: "بسيط، سريع، ورخيص. بالضبط ما كنت أحتاجه لمؤسسة المقاولات الخاصة بي. زر الواتساب يعمل بشكل ممتاز والعملاء يمدحون سهولة الوصول.",
      initial: "ع.س",
      rating: 5
    },
    {
      name: "سارة العلي",
      role: "متجر زهور، الدمام",
      content: "تصميم المتجر خرافي! المبيعات زادت بنسبة 40% بعد إطلاق الحملات الإعلانية معهم. فريق محترف ومتجاوب جداً.",
      initial: "س.ع",
      rating: 5
    },
    {
      name: "م. خالد العنزي",
      role: "مكتب استشارات هندسية",
      content: "خدمة العملاء عندهم لا يعلى عليها. أي تعديل أحتاجه يتم تنفيذه فوراً. الموقع الجديد أعطى شركتنا مظهراً احترافياً أمام العملاء.",
      initial: "م.خ",
      rating: 5
    },
    {
      name: "فهد الدوسري",
      role: "شركة نقل عفش",
      content: "جربنا شركات كثير قبلهم، لكن إزدهار ويب كانوا الأصدق والأسرع. حملات جوجل أدز جابت لنا عقود شركات كبيرة.",
      initial: "ف.د",
      rating: 4
    },
    {
      name: "نورة القحطاني",
      role: "مركز تجميل نسائي",
      content: "نظام حجز المواعيد اللي ركبوه لنا ريحنا من اتصالات كثيرة. شكراً لكم على الشغل المرتب والنظيف.",
      initial: "ن.ق",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00CC95]/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            قصص نجاح <span className="text-[#00CC95]">شركائنا</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            أكثر من 500 شركة وثقت بنا لبناء هويتهم الرقمية. نفخر بكوننا جزءاً من نجاحهم.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none"></div>

        <div className="flex" dir="ltr">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 shrink-0 pr-8"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[450px] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:border-[#00CC95]/30 transition-all shrink-0 text-right"
                dir="rtl"
              >
                <div className="flex gap-1 text-yellow-400 mb-6 justify-end">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} fill={starIdx < t.rating ? "currentColor" : "none"} className={starIdx < t.rating ? "text-yellow-400" : "text-slate-600"} size={16} />
                  ))}
                </div>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-4">"{t.content}"</p>
                <div className="text-right">
                  <div className="font-bold text-white text-lg">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 shrink-0 pr-8"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[450px] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:border-[#00CC95]/30 transition-all shrink-0 text-right"
                dir="rtl"
              >
                <div className="flex gap-1 text-yellow-400 mb-6 justify-end">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} fill={starIdx < t.rating ? "currentColor" : "none"} className={starIdx < t.rating ? "text-yellow-400" : "text-slate-600"} size={16} />
                  ))}
                </div>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-4">"{t.content}"</p>
                <div className="text-right">
                  <div className="font-bold text-white text-lg">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StickyWhatsApp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-4"
    >
      {/* AI Agent Bubble */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="bg-white p-4 rounded-2xl rounded-bl-none shadow-xl border border-slate-100 max-w-[250px] mb-2 hidden sm:block"
      >
        <p className="text-sm text-slate-700">
          <span className="font-bold text-[#00CC95]">المساعد الذكي:</span> هلا! جاهز نطلع بمشروعك أونلاين بـ 999 ريال؟
        </p>
      </motion.div>

      {/* Button */}
      <a
        href="https://wa.me/966XXXXXXXXX"
        className="group flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-all hover:-translate-y-1"
      >
        <span className="font-bold hidden group-hover:block transition-all">تواصل معنا</span>
        <WhatsAppIcon className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </a>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00CC95] to-[#00CC6C] flex items-center justify-center text-white font-bold">إ</div>
              <span className="font-bold text-xl text-white">إزدهار<span className="text-[#00CC95]"> ويب</span></span>
            </div>
            <p className="max-w-xs text-sm opacity-70">
              أتمتة النمو الرقمي للشركات السعودية. سرعة، توفير، وفعالية.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#00CC95]">إعداد خرائط جوجل</a></li>
              <li><a href="#" className="hover:text-[#00CC95]">صفحات الهبوط</a></li>
              <li><a href="#" className="hover:text-[#00CC95]">السيو المحلي (Local SEO)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">روابط هامة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-[#00CC95]">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-[#00CC95]">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex justify-center items-center text-sm opacity-50">
          <p>© 2026 إزدهار ويب. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');`}
      </style>
      <div dir="rtl" className="font-['Noto_Kufi_Arabic'] antialiased text-slate-900 bg-white selection:bg-[#00CC95] selection:text-white">
        <Navbar />
        <Hero />
        <ClientLogos />
        <Features />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Footer />
        <StickyWhatsApp />
      </div>
    </>
  );
}
