'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GeoProvider, useGeo } from '@/lib/geo-context';

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track WhatsApp button clicks — fires both client Pixel + server CAPI
const trackWhatsAppClick = () => {
  const eventId = crypto.randomUUID();

  // Client-side Pixel event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Contact',
      content_category: 'Lead',
    }, { eventID: eventId });
  }

  // Google Analytics event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'WhatsApp Contact Button',
      value: 1,
    });
  }

  // Server-side CAPI event
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: 'Contact',
      event_id: eventId,
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1] || null,
      fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1] || null,
    }),
  }).catch((err) => console.error('CAPI tracking error:', err));
};

// Reusable Google Analytics event tracker
const trackGAEvent = (eventName: string, params?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params || {});
  }
};

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
  ShoppingCart,
  DollarSign,
  BarChart3,
  Rocket,
  Cpu,
  Headphones,
  Users
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
  const { config } = useGeo();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/ezdihar.png" alt="إزدهار ويب" width={140} height={40} className="h-10 w-auto" />

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:transition-colors font-medium" style={{ ['--tw-text-opacity' as string]: 1 }} onMouseEnter={(e) => (e.currentTarget.style.color = config.accentColor)} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>لماذا نحن؟</a>
          <a href="#portfolio" className="text-slate-600 hover:transition-colors font-medium" onMouseEnter={(e) => (e.currentTarget.style.color = config.accentColor)} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>أعمالنا</a>
          <a href="#testimonials" className="text-slate-600 hover:transition-colors font-medium" onMouseEnter={(e) => (e.currentTarget.style.color = config.accentColor)} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>النتائج</a>
          <a href={`https://wa.me/${config.whatsappNumber}`} onClick={trackWhatsAppClick} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 hover:-translate-y-0.5 transition-all">
            <WhatsAppIcon className="w-5 h-5" />
            ابدأ الآن فقط ب {config.price} {config.currency}
          </a>
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
                <div className="flex items-center">
                  <Image src="/ezdihar.png" alt="إزدهار ويب" width={120} height={36} className="h-9 w-auto" />
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
                  { href: '#testimonials', label: 'النتائج', delay: 0.2 },
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
                  href={`https://wa.me/${config.whatsappNumber}`}
                  onClick={trackWhatsAppClick}
                  className="flex items-center justify-center gap-2 w-full text-white py-4 rounded-xl font-bold shadow-lg"
                  style={{ background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColorDark})`, boxShadow: `0 10px 15px -3px rgba(${config.accentRgb}, 0.3)` }}
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

const ServiceCard = ({ number, title, items, sidebarColor, sidebarIcon, sidebarLabel, badge, delay }: {
  number: string; title: string; items: { bold: string; text: string }[]; sidebarColor: string; sidebarIcon: React.ReactNode; sidebarLabel: string; badge?: string; delay: number;
}) => (
  <motion.div
    initial={{ opacity: 1, y: 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4 }}
    className="bg-white border border-slate-100 flex relative min-h-[200px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
  >
    <div className={`w-[100px] flex flex-col items-center justify-center text-white p-4 pt-8 text-center font-bold text-xs relative ${sidebarColor}`}>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-9 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold z-10 border-[3px] border-white shadow-md text-sm">
        {number}
      </div>
      {sidebarIcon}
      <span className="mt-2">{sidebarLabel}</span>
    </div>
    <div className="p-5 flex-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        {badge && (
          <span className="text-[10px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap" style={{ backgroundColor: `rgba(${useGeo().config.accentRgb}, 0.1)`, color: useGeo().config.accentColor }}>{badge}</span>
        )}
      </div>
      <ul className="text-[13px] space-y-2 text-slate-600 list-disc mr-5 leading-relaxed">
        {items.map((item, i) => (
          <li key={i}><span className="font-bold text-slate-800">{item.bold}</span> {item.text}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Hero = () => {
  const { config } = useGeo();
  const [beams, setBeams] = useState<Array<{ id: number; left: number; delay: number; duration: number; repeatDelay: number }>>([]);

  useEffect(() => {
    const generateBeams = () => {
      const newBeams = [];
      for (let i = 0; i < 3; i++) {
        newBeams.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 2 + Math.random() * 3,
          repeatDelay: 2 + Math.random() * 4,
        });
      }
      setBeams(newBeams);
    };
    generateBeams();
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
      {/* Animated Grid Background */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='${encodeURIComponent(config.accentColor)}14'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
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
            repeatDelay: beam.repeatDelay,
            ease: 'linear',
          }}
          className="absolute z-10 w-[2px] h-24"
          style={{
            left: `${beam.left}%`,
            background: `linear-gradient(to bottom, transparent, ${config.accentColor}, transparent)`,
            boxShadow: `0 0 12px 3px rgba(${config.accentRgb}, 0.25)`,
          }}
        />
      ))}

      {/* Subtle glowing orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-emerald-100/40 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-teal-100/30 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1 px-3 rounded-full text-sm mb-6 backdrop-blur-sm font-semibold" style={{ backgroundColor: `rgba(${config.accentRgb}, 0.1)`, color: config.accentColor, borderColor: `rgba(${config.accentRgb}, 0.2)`, borderWidth: '1px' }}>
            🚀 باقة النمو الرقمي المتكاملة
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            نمو أعمالك لا يحتاج ميزانيات ضخمة.. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${config.accentColor}, ${config.accentColorDark})` }}>
              احصل على نتائج احترافية بأسعار تنافسية.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            في إزدهار ويب، نحطم قاعدة &quot;الغالي ثمنه فيه&quot;. نقدم لك خدمات تسويقية احترافية بجودة عالمية وأسعار تنافسية، مصممة خصيصاً لتحويل {config.heroSubtext}.
          </p>
        </motion.div>

        {/* Growth Strategy Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 text-white rounded-full py-3 px-6 md:px-8 flex flex-col md:flex-row justify-between items-center mb-10 shadow-lg gap-3"
          id="packages"
        >
          <h2 className="text-lg md:text-xl font-bold tracking-wide">باقة استراتيجية النمو</h2>
          <div className="text-white rounded-full py-1.5 px-6 border-2 border-white font-extrabold text-sm" style={{ backgroundColor: config.accentColor }}>
            فقط <span className="text-xl">{config.price}</span> {config.currency} / شهرياً
          </div>
          <h2 className="text-lg md:text-xl font-bold hidden md:block">Growth Strategy Package</h2>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-8 mb-14">
          <ServiceCard
            number="1"
            title="الهوية والعلامة التجارية"
            sidebarColor="bg-slate-800"
            sidebarIcon={<svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            sidebarLabel="الهوية"
            items={[
              { bold: "خطة تسويقية:", text: "استراتيجية تسويقية شاملة مخصصة لنشاطك التجاري وأهدافك." },
              { bold: "العلامة التجارية الاحترافية:", text: "تصميم الشعار، بطاقات العمل، والأوراق الرسمية." },
              { bold: "ملف الشركة (Profile):", text: "تصميم ومحتوى الملف التعريفي الاحترافي." },
            ]}
            delay={0.1}
          />

          <ServiceCard
            number="2"
            title="تصميم موقع إلكتروني وصفحة هبوط بيعية"
            sidebarColor="bg-indigo-600"
            sidebarIcon={<Layout className="w-10 h-10 opacity-90" />}
            sidebarLabel="المواقع"
            items={[
              { bold: "موقع إلكتروني سريع:", text: "موقع حديث وفائق السرعة مع صفحات ومنتجات غير محدودة." },
              { bold: "صفحة هبوط بيعية:", text: "صفحة مخصصة لتحويل الزيارات إلى عملاء محتملين فوراً." },
              { bold: "استضافة مجانية مدى الحياة:", text: "نوفر خادماً مداراً لموقعك بدون فواتير شهرية." },
            ]}
            delay={0.15}
          />

          <ServiceCard
            number="3"
            title="إدارة وسائل التواصل الاجتماعي"
            sidebarColor="bg-[#00CC95]"
            sidebarIcon={<svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
            sidebarLabel="التواصل"
            badge="١٥ منتجاً شهرياً"
            items={[
              { bold: "خطة المحتوى:", text: "خطة محتوى شهرية متكاملة تتوافق مع أهدافك التسويقية." },
              { bold: "6 منشورات جرافيك:", text: "للتوعية بالعلامة التجارية والتعليم." },
              { bold: "6 قصص (Stories) تفاعلية:", text: "لزيادة التفاعل والمبيعات." },
              { bold: "3 فيديوهات ريلز سينمائية:", text: "محتوى فيديو للوصول إلى أقصى انتشار." },
              { bold: "إدارة كاملة للحسابات:", text: "نشر يومي وجدولة احترافية وتفاعل استراتيجي." },
            ]}
            delay={0.2}
          />

          <ServiceCard
            number="4"
            title="تصدر نتائج البحث في جوجل و مواقع الذكاء الإصطناعي"
            sidebarColor="bg-amber-500"
            sidebarIcon={<span className="text-4xl font-bold opacity-90">G</span>}
            sidebarLabel="البحث"
            items={[
              { bold: "خطة تحسين البحث:", text: "تحليل المنافسين واستراتيجية تصدر نتائج البحث في مجالك." },
              { bold: "ملف جوجل التجاري (GMB):", text: "إعداد كامل وتحسين شهري لتصدر نتائج الخرائط." },
              { bold: "أرشفة البحث:", text: "الربط مع Google Search Console لضمان ظهور موقعك." },
            ]}
            delay={0.3}
          />

          <ServiceCard
            number="5"
            title="التسويق عبر الأداء (إدارة الحملات الإعلانية المدفوعة)"
            sidebarColor="bg-rose-500"
            sidebarIcon={<svg className="w-10 h-10 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            sidebarLabel="الإعلانات"
            items={[
              { bold: "إدارة منصات متعددة:", text: "سناب شات، إنستغرام، وفيسبوك." },
              { bold: "إدارة إعلانات البحث:", text: "حملات Google Ads لاستهداف الباحثين عن خدماتك." },
              { bold: "استهداف متقدم:", text: "حسب المدينة، الحي، العمر، والاهتمامات." },
              { bold: "كتابة محتوى محلي:", text: `صياغة إعلانية ${config.adCopyDialect}.` },
            ]}
            delay={0.4}
          />
        </div>

        {/* AI & Automation Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 text-white rounded-full py-3 px-6 md:px-8 flex flex-col md:flex-row justify-between items-center mb-10 shadow-lg gap-3"
        >
          <h2 className="text-xl font-bold tracking-wide">الذكاء الاصطناعي والمستقبل</h2>
          <div className="px-8 font-bold text-sm tracking-widest opacity-30 italic hidden md:block">ركن الابتكار</div>
          <h2 className="text-xl font-bold hidden md:block">AI & Automation</h2>
        </motion.div>

        {/* AI Card */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-white flex relative min-h-[200px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all mb-12"
          style={{ borderColor: `rgba(${config.accentRgb}, 0.2)`, borderWidth: '1px' }}
        >
          <div className="w-[100px] flex flex-col items-center justify-center text-white p-4 pt-8 text-center font-bold text-xs relative" style={{ background: `linear-gradient(to bottom, ${config.accentColor}, ${config.accentColorDark})` }}>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-9 text-white rounded-full flex items-center justify-center font-bold z-10 border-[3px] border-white shadow-md text-sm" style={{ backgroundColor: config.accentColor }}>6</div>
            <svg className="w-10 h-10 mb-2 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            الابتكار
          </div>
          <div className="p-6 flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                الذكاء الاصطناعي لنمو الأعمال
              </h3>
              <ul className="text-[14px] space-y-3 text-slate-600 list-disc mr-5 leading-relaxed">
                <li><span className="font-bold text-slate-800">عميل ذكاء اصطناعي للموقع 24/7:</span> شات بوت ذكي للرد على العملاء وجمع البيانات فوراً.</li>
                <li><span className="font-bold text-slate-800">التكامل مع واتساب:</span> أزرار &quot;انقر للدردشة&quot; عبر كامل حضورك الرقمي.</li>
              </ul>
            </div>
            <div className="flex-1 border-t md:border-t-0 md:border-r border-slate-100 pt-4 md:pt-0 md:pr-8">
              <div className="p-4 rounded-xl" style={{ backgroundColor: `rgba(${config.accentRgb}, 0.1)` }}>
                <h4 className="font-bold text-slate-900 text-sm mb-2">نظام تتبع الحملات</h4>
                <p className="text-slate-700 text-[13px] leading-relaxed">
                  <span className="font-bold text-slate-900">تقارير أسبوعية:</span> تقارير مفصلة أسبوعية لتتبع أداء حملاتك والنقرات والنتائج والنمو بشكل مستمر.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 mb-8 inline-block shadow-xl">
            <p className="text-lg md:text-xl font-bold mb-1">كل هذا بـ <span className="text-3xl font-extrabold" style={{ color: config.accentColor }}>{config.price}</span> {config.currency} فقط / شهرياً</p>
            <p className="text-slate-400 text-sm">بدون عقود طويلة • إلغاء في أي وقت • نتائج من الشهر الأول</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a href={`https://wa.me/${config.whatsappNumber}`} onClick={trackWhatsAppClick} className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 relative overflow-hidden group" style={{ background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColorDark})`, boxShadow: `0 10px 15px -3px rgba(${config.accentRgb}, 0.3)` }}>
              <span className="relative z-10 flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5" />
                ابدأ نمو أعمالك الآن
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              شاهد أعمالنا
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-400">
            <div className="flex items-center gap-2"><CheckCircle2 style={{ color: config.accentColor }} size={16} /> {config.clientCount}</div>
            <div className="flex items-center gap-2"><CheckCircle2 style={{ color: config.accentColor }} size={16} /> تقييم 4.9/5</div>
            <div className="flex items-center gap-2"><CheckCircle2 style={{ color: config.accentColor }} size={16} /> ضمان الرضا 100%</div>
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
                  loading="lazy"
                  sizes="128px"
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
                  loading="lazy"
                  sizes="128px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; title: string; description: string }) => {
  const { config } = useGeo();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300" style={{ backgroundColor: `rgba(${config.accentRgb}, 0.1)` }}>
        <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: config.accentColor }} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const { config } = useGeo();
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">لماذا نحن خيارك الأمثل للنمو؟</h2>
          <p className="text-slate-500 max-w-xl mx-auto">الوكالات التقليدية بطيئة ومكلفة. نحن نستخدم الأتمتة لتقديم نتائج متميزة بتكلفة أقل وسرعة خيالية.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
          <FeatureCard
            icon={DollarSign}
            title="التكلفة الاقتصادية الذكية"
            description={`جودة احترافية بسعر لا يُنافس. صممنا باقاتنا لتناسب الشركات الناشئة والمتوسطة في ${config.name} والخليج، لتصل إلى جمهورك وتنافس الكبار دون الحاجة لميزانيات ضخمة.`}
          />
          <FeatureCard
            icon={TrendingUp} // Using TrendingUp as BarChart/Revenue alternative or could use BarChart3
            title="التركيز المطلق على العائد (Revenue)"
            description="مبيعات أكثر، وليس مجرد تصميم. كل صفحة نهبط عليها وكل إعلان نطلقه هدفه واحد فقط: زيادة عدد عملائك ورفع حجم مبيعاتك من اليوم الأول."
          />
          <FeatureCard
            icon={Rocket}
            title="سرعة التنفيذ والدقة"
            description="انطلق إلى السوق في وقت قياسي. نحن نعلم أن الوقت هو المال. نلتزم بتسليم المتاجر والمواقع وحملات Google Ads بسرعة فائقة مع الحفاظ على أدق التفاصيل التقنية."
          />
          <FeatureCard
            icon={Users}
            title={`خبرة في السوق الخليجي`}
            description={`نفهم جمهورك المحلي. لدينا خبرة عميقة في سلوك المستهلك في ${config.name} والخليج، مما يضمن أن تكون تصاميمنا وحملاتنا متوافقة مع ذوق واهتمامات عملائك المستهدفين.`}
          />
          <FeatureCard
            icon={Cpu}
            title="تقنيات حديثة لأداء فائق"
            description="مواقع سريعة، ذكية، وقابلة للتوسع. لا نستخدم القوالب الجاهزة والبطيئة؛ بل نعتمد على أحدث التقنيات (مثل Next.js و Python) لضمان سرعة فائقة لموقعك، مما يحسن من تجربة المستخدم ويرفع ترتيبك في محركات البحث تلقائياً."
          />
          <FeatureCard
            icon={Headphones}
            title="دعم فني وتطوير مستمر"
            description="لسنا مجرد منفذين، نحن شركاء نجاح. علاقتنا معك لا تنتهي بتسليم المشروع. نوفر لك دعماً فنياً مستمراً وتحديثات دورية تضمن بقاء منصتك الرقمية تعمل بكفاءة 100%، مع تقديم استشارات دورية لتحسين الأداء وزيادة المبيعات."
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

const PortfolioItem = ({ title, category, color, onClick, image }: { title: string; category: string; color: string; onClick: () => void; image?: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white border border-slate-100 cursor-pointer flex-shrink-0 w-[320px]"
  >
    <div className="h-48 w-full bg-slate-100 relative overflow-hidden" dir="ltr">
      {image ? (
        <Image src={image} alt={title} fill className="object-cover" loading="lazy" sizes="320px" />
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
      <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: useGeo().config.accentColor }}>{category}</div>
      <h3 className="text-lg font-bold text-slate-900 transition-colors">{title}</h3>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const { config } = useGeo();
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
    { title: 'متجر زولار', category: 'الأزياء والملابس العصرية', color: 'bg-purple-600', url: 'https://www.zolar.ma/', image: '/portfolio/zolar.png' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">أحدث أعمالنا</h2>
            <p className="text-slate-500">شاهد كيف نساعد الشركات على النمو رقمياً.</p>
          </div>
          <a href="#" className="font-bold flex items-center gap-2 hover:gap-3 transition-all" style={{ color: config.accentColor }}>
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
                    image={project.image}
                    onClick={() => {
                      setSelectedProject({ url: project.url, title: project.title });
                      trackGAEvent('portfolio_click', { event_category: 'engagement', event_label: project.title });
                    }}
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

const Testimonials = () => {
  const { config } = useGeo();
  const testimonials = config.testimonials;

  return (
    <section id="testimonials" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at top right, rgba(${config.accentRgb}, 0.1), transparent, transparent)` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            قصص نجاح <span style={{ color: config.accentColor }}>شركائنا</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {config.clientCount.replace('+', 'أكثر من ')} وثقوا بنا لبناء هويتهم الرقمية. نفخر بكوننا جزءاً من نجاحهم.
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
                className={`w-[350px] md:w-[450px] bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 transition-all shrink-0 text-right`}
                style={{ ['--hover-border' as string]: `rgba(${config.accentRgb}, 0.3)` }}
                dir="rtl"
              >
                <div className="flex gap-1 text-yellow-400 mb-6 justify-end">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} fill={starIdx < t.rating ? "currentColor" : "none"} className={starIdx < t.rating ? "text-yellow-400" : "text-slate-600"} size={16} />
                  ))}
                </div>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-4">&quot;{t.content}&quot;</p>
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
                <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-4">&quot;{t.content}&quot;</p>
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

const ChatWidget = () => {
  const { config } = useGeo();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (content: string) => {
    const showCTA = content.includes('[SHOW_WHATSAPP_CTA]');
    const cleanContent = content.replace('[SHOW_WHATSAPP_CTA]', '').trim();

    return (
      <>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{cleanContent}</p>
        {showCTA && (
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-xl font-bold text-sm hover:bg-[#20bd5a] transition-colors shadow-md"
          >
            <WhatsAppIcon className="w-5 h-5" />
            تواصل معنا عبر الواتساب
          </a>
        )}
      </>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white" style={{ borderWidth: '2px', borderColor: config.accentColor }}>
                  <Image src="/aiagent.png" alt="Karim AI" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-sm">كريم - مساعد المبيعات</div>
                  <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    متصل الآن
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" dir="rtl">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="bg-white p-3 rounded-2xl rounded-tr-sm shadow-sm border border-slate-100 max-w-[85%]">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    أهلاً وسهلاً! أنا كريم من فريق إزدهار ويب 👋
                    <br /><br />
                    كيف أقدر أساعدك اليوم؟ سواء تبي تعرف عن باقة النمو أو عندك أي استفسار.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['ايش باقة النمو؟', 'كم السعر؟', 'ايش الخدمات؟'].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => {
                            setInput('');
                            const newMsgs = [{ role: 'user' as const, content: q }];
                            setMessages(newMsgs);
                            setIsLoading(true);
                            fetch('/api/chat', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ messages: newMsgs }),
                            })
                              .then(r => r.json())
                              .then(d => setMessages([...newMsgs, { role: 'assistant', content: d.reply }]))
                              .catch(() => setMessages([...newMsgs, { role: 'assistant', content: 'عذراً، حدث خطأ.' }]))
                              .finally(() => setIsLoading(false));
                          }, 0);
                        }}
                        className="text-xs bg-[#00CC95]/10 text-[#00CC95] px-3 py-1.5 rounded-full font-bold hover:bg-[#00CC95]/20 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] ${msg.role === 'user' ? 'mr-auto text-white rounded-2xl rounded-tl-sm p-3 shadow-sm' : 'bg-white rounded-2xl rounded-tr-sm p-3 shadow-sm border border-slate-100'}`}
                  style={msg.role === 'user' ? { backgroundColor: config.accentColor } : undefined}
                >
                  {msg.role === 'assistant' ? renderMessage(msg.content) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="bg-white rounded-2xl rounded-tr-sm p-3 shadow-sm border border-slate-100 max-w-[85%]">
                  <div className="flex gap-1.5 items-center py-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-100 bg-white shrink-0" dir="rtl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب سؤالك..."
                  className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00CC95] focus:ring-1 focus:ring-[#00CC95]/20 transition-colors text-right"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#00CC95] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  style={{ backgroundColor: config.accentColor }}
                >
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button + Bubble */}
      {
        !isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => { setIsOpen(true); setShowBubble(false); }}
            className="bg-white p-3 rounded-2xl rounded-br-none shadow-xl border border-slate-100 max-w-[220px] cursor-pointer hover:shadow-2xl transition-shadow hidden sm:block"
          >
            <p className="text-sm text-slate-700">
              <span className="font-bold text-[#00CC95]">كريم:</span> هلا! تبي تعرف كيف ننمي مشروعك؟ 🚀
            </p>
          </motion.div>
        )
      }

      <button
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); if (!isOpen) trackGAEvent('chat_open', { event_category: 'engagement', event_label: 'AI Chat Widget' }); }}
        className="relative text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center"
        style={{ background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColorDark})`, boxShadow: `0 10px 15px -3px rgba(${config.accentRgb}, 0.3)` }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image src="/aiagent.png" alt="Chat" width={56} height={56} className="w-full h-full object-cover" />
          </div>
        )}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </button>
    </div >
  );
};

const Footer = () => {
  const { config } = useGeo();
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image src="/ezdihar.png" alt="إزدهار ويب" width={140} height={40} className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="max-w-xs text-sm opacity-70">
              {config.footerTagline}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#packages" className="hover:text-[#00CC95]">باقة استراتيجية النمو</a></li>
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

function AppContent() {
  const { config } = useGeo();

  // Track section views via IntersectionObserver
  useEffect(() => {
    const sections = ['packages', 'features', 'portfolio', 'testimonials'];
    const observed = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observed.has(entry.target.id)) {
            observed.add(entry.target.id);
            trackGAEvent('section_view', {
              event_category: 'scroll',
              event_label: entry.target.id,
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');`}
      </style>
      <div dir="rtl" className="font-['Noto_Kufi_Arabic'] antialiased text-slate-900 bg-white selection:text-white" style={{ ['--selection-bg' as string]: config.accentColor }}>
        <Navbar />
        <Hero />
        <ClientLogos />
        <Features />
        <Portfolio />
        <Testimonials />
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}

export default function App() {
  return (
    <GeoProvider>
      <AppContent />
    </GeoProvider>
  );
}
