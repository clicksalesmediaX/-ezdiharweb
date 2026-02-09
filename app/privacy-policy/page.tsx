'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Eye, FileText, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: FileText,
            title: 'مقدمة',
            content: `مرحباً بكم في سياسة الخصوصية الخاصة بـ إزدهار ويب، وهي علامة تجارية مملوكة ومدارة من قبل ClickSalesMedia LLC، ومقرها في ند الشبا، دبي، الإمارات العربية المتحدة. نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية.`
        },
        {
            icon: Eye,
            title: 'المعلومات التي نجمعها',
            content: `نقوم بجمع المعلومات التالية:
• معلومات الاتصال: الاسم، رقم الهاتف، البريد الإلكتروني
• معلومات الشركة: اسم الشركة، النشاط التجاري
• بيانات الاستخدام: كيفية تفاعلك مع موقعنا وخدماتنا
• معلومات تقنية: عنوان IP، نوع المتصفح، الجهاز المستخدم`
        },
        {
            icon: Shield,
            title: 'كيف نستخدم معلوماتك',
            content: `نستخدم المعلومات التي نجمعها للأغراض التالية:
• تقديم خدماتنا وتحسينها
• التواصل معك بشأن مشاريعك واستفساراتك
• إرسال تحديثات وعروض ترويجية (بموافقتك)
• تحليل أداء موقعنا وتحسين تجربة المستخدم
• الامتثال للمتطلبات القانونية`
        },
        {
            icon: Lock,
            title: 'حماية البيانات',
            content: `نتخذ إجراءات أمنية صارمة لحماية معلوماتك:
• تشفير SSL لجميع البيانات المنقولة
• تخزين آمن للبيانات في خوادم محمية
• وصول محدود للموظفين المخولين فقط
• مراجعات أمنية دورية وتحديثات مستمرة`
        },
        {
            icon: Users,
            title: 'مشاركة المعلومات',
            content: `لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
• مع مزودي الخدمات الموثوقين الذين يساعدوننا في تقديم خدماتنا
• عند الضرورة للامتثال للقوانين أو الأوامر القضائية
• لحماية حقوقنا أو سلامة المستخدمين`
        },
        {
            icon: Globe,
            title: 'حقوقك',
            content: `لديك الحقوق التالية فيما يتعلق ببياناتك:
• الوصول إلى بياناتك الشخصية
• تصحيح أي معلومات غير دقيقة
• طلب حذف بياناتك
• الاعتراض على معالجة بياناتك
• سحب موافقتك في أي وقت`
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00CC95] to-[#00CC6C] flex items-center justify-center text-white font-bold">
                            إ
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">إزدهار<span className="text-[#00CC95]"> ويب</span></span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-600 hover:text-[#00CC95] transition-colors font-medium text-sm"
                    >
                        <ArrowRight className="w-4 h-4" />
                        الصفحة الرئيسية
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-slate-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00CC95]/20 mb-6">
                            <Shield className="w-8 h-8 text-[#00CC95]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الخصوصية</h1>
                        <p className="text-slate-400 text-lg">
                            نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-sm p-8 md:p-12 mb-8"
                >
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        آخر تحديث: فبراير 2026
                    </p>

                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="border-b border-slate-100 pb-8 last:border-0"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#00CC95]/10 flex items-center justify-center shrink-0">
                                        <section.icon className="w-6 h-6 text-[#00CC95]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 pt-2">{section.title}</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line pr-16">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Company Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-slate-900 text-white rounded-3xl p-8 md:p-12"
                >
                    <h3 className="text-xl font-bold mb-4">معلومات الشركة</h3>
                    <div className="text-slate-400 space-y-2">
                        <p><strong className="text-white">الشركة:</strong> ClickSalesMedia LLC</p>
                        <p><strong className="text-white">العنوان:</strong> ند الشبا، دبي، الإمارات العربية المتحدة</p>
                        <p><strong className="text-white">العلامة التجارية:</strong> إزدهار ويب</p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-800">
                        <p className="text-slate-400 mb-4">
                            للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا عبر:
                        </p>
                        <a
                            href="https://wa.me/966XXXXXXXXX"
                            className="inline-flex items-center gap-2 bg-[#00CC95] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#00b383] transition-colors"
                        >
                            تواصل معنا عبر واتساب
                        </a>
                    </div>
                </motion.div>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#00CC95] transition-colors font-medium"
                    >
                        <ArrowRight className="w-4 h-4" />
                        العودة إلى الصفحة الرئيسية
                    </Link>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-8">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
                    <p>© 2026 إزدهار ويب - ClickSalesMedia LLC. جميع الحقوق محفوظة.</p>
                </div>
            </footer>
        </div>
    );
}
