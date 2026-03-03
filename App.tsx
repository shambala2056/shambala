/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Globe, BarChart3, Users, Shield, MapPin, 
  ArrowRight, Clock, CheckCircle2, AlertTriangle, Lightbulb,
  Calendar, Menu, X, ChevronRight,
  Sun, Train, Building2, TreePine, Sprout, Compass, Pickaxe
} from 'lucide-react';

const AdvantageCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-10 group"
  >
    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-primary transition-colors">{title}</h3>
    <div className="space-y-4">
      {desc.split('\n').map((line, i) => (
        <div key={i} className="text-slate-400 text-sm leading-relaxed flex items-start gap-3 group/item">
          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-primary/40 group-hover/item:bg-brand-primary transition-colors shrink-0" />
          <span className="group-hover/item:text-slate-200 transition-colors">{line.replace(/^- /, '')}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProcessStep = ({ n, t, d, active = false, onClick }: { n: string, t: string, d: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-10 rounded-[2.5rem] border transition-all duration-500 text-left w-full h-full ${active ? 'bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-brand-surface border-white/5 hover:border-brand-primary/50'}`}
  >
    <div className={`text-xs font-bold mb-6 tracking-widest transition-colors ${active ? 'text-white/60' : 'text-slate-500'}`}>{n}</div>
    <h4 className={`text-xl font-bold mb-3 transition-colors ${active ? 'text-white' : 'text-white'}`}>{t}</h4>
    <p className={`text-sm leading-relaxed transition-colors ${active ? 'text-white/90' : 'text-slate-400'}`}>{d}</p>
  </button>
);

const PROGRAM_DATA = [
  {
    day: "1 дэх өдөр",
    date: "4-р сарын 4",
    title: "Бодлого, Стратеги ба Нээлт",
    focus: "ESG стандарт.",
    events: [
      { time: "09:00 - 10:00", name: "Нээлтийн ажиллагаа", desc: "Дорноговь аймгийн \"Тогтвортой бодлого - Тасралтгүй хөгжил\"" },
      { time: "10:00 - 12:00", name: "Нэгдсэн хуралдаан I", desc: "Бүсчилсэн хөгжил ба Хөрөнгө оруулалтын орчин (3 бүс, 5 тойрог төлөвлөлт)" },
      { time: "12:00 - 13:30", name: "Үдийн завсарлага", desc: "Сүлжээ тогтоох (Networking lunch)" },
      { time: "13:30 - 15:30", name: "Панел хэлэлцүүлэг", desc: "ESG ба Тогтвортой хөгжлийн нөлөө: Байгаль орчин, Нийгэм, Засаглал" },
      { time: "15:30 - 17:30", name: "Төсөл танилцуулга", desc: "\"Бэлэн 50+ төсөл\" – Хөрөнгө оруулалтын платформын нээлт" },
      { time: "19:00 - 21:00", name: "Чөлөөт уулзалт, Networking", desc: "Сүлжээ тогтоох, чөлөөт уулзалт" },
    ]
  },
  {
    day: "2 дахь өдөр",
    date: "4-р сарын 5",
    title: "Тэргүүлэх салбарууд ба B2B Уулзалтууд",
    focus: "Сэргээгдэх эрчим хүч, Логистик, Чөлөөт бүс, Хөдөө аж ахуй.",
    events: [
      { time: "09:30 - 11:30", name: "Салбар хуралдаан II", desc: "Сэргээгдэх эрчим хүч ба Аж үйлдвэр: Нар, салхины эрчим хүч, Аж үйлдвэрийн кластер" },
      { time: "11:30 - 13:00", name: "Салбар хуралдаан III", desc: "Логистикийн зангилаа: Замын-Үүд, Ханги боомт, Тээвэр логистикийн нэгдсэн систем" },
      { time: "13:00 - 14:30", name: "Үдийн завсарлага", desc: "Сайншанд хотын \"Smart City\" танилцуулга" },
      { time: "14:30 - 17:00", name: "B2B Matchmaking", desc: "Хөрөнгө оруулагчид ба Дотоодын ААН-үүдийн нүүр тулсан уулзалтууд (100+ уулзалт)" },
      { time: "17:00 - 20:00", name: "SIF awards Gala Dinner", desc: "Шагнал гардуулах ёслол" },
    ]
  },
  {
    day: "3 дахь өдөр",
    date: "4-р сарын 6",
    title: "Гарын үсэг зурах ба Хаалт",
    focus: "Санамж бичиг, гэрээнд гарын үсэг зурах, үр дүн.",
    events: [
      { time: "09:00 - 11:00", name: "Гарын үсэг зурах", desc: "Санамж бичигт гарын үсэг зурах, гэрээнд гарын үсэг зурах" },
      { time: "11:00 - 13:00", name: "Хаалтын хэлэлцүүлэг", desc: "Форумын үр дүн, дүгнэлт" },
      { time: "13:00 - 15:00", name: "Networking", desc: "Чөлөөт уулзалт, сүлжээ тогтоох" },
    ]
  }
];

const PROJECTS_DATA = [
  { n: "Сайншандын салхин парк", s: "Сэргээгдэх эрчим хүч", l: "Сайншанд", c: "120 сая ам.доллар", p: "2017-2018" },
  { n: "Солар Поуер Монголиа нарны станц", s: "Сэргээгдэх эрчим хүч", l: "Эрдэнэ", c: "40-45 сая ам.доллар", p: "2021-2022" },
  { n: "Дезерт Солар Пауэр Вуан", s: "Сэргээгдэх эрчим хүч", l: "Сайншанд", c: "45.4 сая ам.доллар", p: "2019-2020" },
  { n: "Наран тээг нарны станц", s: "Сэргээгдэх эрчим хүч", l: "Замын-Үүд", c: "25 сая ам.доллар", p: "2017-2018" },
  { n: "Тэнгэр Солар нарны станц", s: "Сэргээгдэх эрчим хүч", l: "Эрдэнэ", c: "30 сая ам.доллар", p: "2024-2025" },
  { n: "Сайншанд салхин парк - II шат", s: "Сэргээгдэх эрчим хүч", l: "Сайншанд", c: "80 сая ам.доллар", p: "2025-2027" },
  { n: "Ногоон устөрөгчийн туршилтын төсөл", s: "Сэргээгдэх эрчим хүч", l: "Замын-Үүд", c: "15 сая ам.доллар", p: "2026-2028" },
  { n: "Эрдэнэ сум - Нарны цахилгаан станц 20МВт", s: "Сэргээгдэх эрчим хүч", l: "Эрдэнэ", c: "35 сая ам.доллар", p: "2025-2026" },
  { n: "Говийн салхи - Салхин цахилгаан станц", s: "Сэргээгдэх эрчим хүч", l: "Сайншанд", c: "95 сая ам.доллар", p: "2026-2028" },
  { n: "Газрын тос боловсруулах үйлдвэр", s: "Хүнд үйлдвэрлэл", l: "Алтанширээ", c: "1.7 тэрбум ам.доллар", p: "2018-" },
  { n: "Сайншанд аж үйлдвэрийн парк", s: "Хүнд үйлдвэрлэл", l: "Сайншанд", c: "9.4 тэрбум ам.доллар", p: "2013-" },
  { n: "Алтанширээт аж үйлдвэрийн парк", s: "Уул уурхай", l: "Алтанширээ", c: "1.1 их наяд төгрөг", p: "2021-2030" },
  { n: "Цагаан Суваргын зэс, молибденийн үйлдвэр", s: "Уул уурхай", l: "Мандах", c: "1.031 тэрбум ам.доллар", p: "2001-2026" },
  { n: "Зөөвч-Овоо ураны төсөл", s: "Уул уурхай", l: "Улаанбадрах", c: "1.6 тэрбум ам.доллар", p: "2024-2028" },
  { n: "Алтанширээт үйлдвэрлэл, технологийн парк", s: "Үйлдвэрлэл", l: "Алтанширээ", c: "1.1 их наяд төгрөг", p: "2019-2030" },
  { n: "Тэрбум мод төсөл", s: "Хүрээлэн буй орчин", l: "Нийт сумдад", c: "-", p: "2022-2030" },
  { n: "Хог хаягдал дахин боловсруулах үйлдвэр", s: "Хүрээлэн буй орчин", l: "Сайншанд", c: "5.2 тэрбум төгрөг", p: "2024-2026" },
  { n: "Цөлжилттэй тэмцэх 'Ногоон хэрэм' зурвас", s: "Хүрээлэн буй орчин", l: "Өмнөд сумдад", c: "3.5 тэрбум төгрөг", p: "2022-2030" },
  { n: "Ус дахин ашиглах, цэвэрлэх байгууламж", s: "Хүрээлэн буй орчин", l: "Алтанширээ", c: "12.8 тэрбум төгрөг", p: "2025-2027" },
  { n: "Агаарын чанарын хяналтын ухаалаг систем", s: "Хүрээлэн буй орчин", l: "Сайншанд", c: "450 сая төгрөг", p: "2024-2025" },
  { n: "Сайншанд хотын ногоон бүс - Ухаалаг усалгаа", s: "Хүрээлэн буй орчин", l: "Сайншанд", c: "1.2 тэрбум төгрөг", p: "2025-2026" },
  { n: "Говийн экосистемийг нөхөн сэргээх төсөл", s: "Хүрээлэн буй орчин", l: "Говийн сумдад", c: "4.8 тэрбум төгрөг", p: "2024-2030" },
  { n: "Замын-Үүд Агро-парк", s: "Газар тариалан", l: "Замын-Үүд", c: "2.8 тэрбум төгрөг", p: "2019-2025" },
  { n: "Шинэ хөдөө төсөл", s: "Хөдөө аж ахуй", l: "Нийт сумдад", c: "4.5 тэрбум төгрөг", p: "2020-2024" },
  { n: "Говийн брэнд - Мах, сүү боловсруулах", s: "Хөдөө аж ахуй", l: "Сайншанд", c: "1.5 тэрбум төгрөг", p: "2017-" },
  { n: "Замын-Үүд боомтын өргөтгөл", s: "Тээвэр логистик", l: "Замын-Үүд", c: "230 сая ам.доллар", p: "2021-2024" },
  { n: "Ханги-Мандал төмөр зам", s: "Тээвэр логистик", l: "Ханги", c: "400 сая ам.доллар", p: "2022-2023" },
  { n: "Сайншанд тээвэр логистикийн төв", s: "Тээвэр логистик", l: "Сайншанд", c: "45 сая ам.доллар", p: "2024-2026" },
  { n: "Ногоон санхүүжилтийн сан", s: "Банк санхүү", l: "Аймгийн хэмжээнд", c: "50 тэрбум төгрөг", p: "2024-" },
  { n: "Орон нутгийн хөгжлийн хөрөнгө оруулалтын сан", s: "Банк санхүү", l: "Аймгийн хэмжээнд", c: "20 тэрбум төгрөг", p: "2025-" },
  { n: "Шамбалын орон цогцолборын өргөтгөл", s: "Аялал жуулчлал", l: "Хамрын хийд", c: "1.2 тэрбум төгрөг", p: "2022-" },
  { n: "Цайны зам олон улсын маршрут", s: "Аялал жуулчлал", l: "Замын-Үүд, Сайншанд", c: "850 сая төгрөг", p: "2024-2026" },
  { n: "Эко бие засах газар төсөл", s: "Аялал жуулчлал", l: "Аялал жуулчлалын цэгүүд", c: "400к ам.доллар", p: "2023-2025" },
  { n: "Байгаль, соёлын өвийг хамгаалах UNESCO", s: "Аялал жуулчлал", l: "Зарим сумдад", c: "6.4 тэрбум төгрөг", p: "2024-2030" },
  { n: "Ханбаянзүрх хайрхны хатуу хучилттай зам", s: "Аялал жуулчлал, дэд бүтэц", l: "Сайншанд", c: "-", p: "2024-2026" },
];

const DRIVER_IMAGES: Record<string, string> = {
  "Сэргээгдэх эрчим хүч": "https://i.postimg.cc/6qHd0nZF/DSIF-pd-P10.jpg",
  "Логистикийн зангилаа": "https://i.postimg.cc/6QzfMkC7/DSIF-pd-P14.jpg",
  "Чөлөөт бүс": "https://i.postimg.cc/8k0npS29/DSIF-pd-P12.jpg",
  "Аж үйлдвэрлэлийн кластер": "https://i.postimg.cc/8k0npS29/DSIF-pd-P12.jpg",
  "Аялал жуулчлал": "https://i.postimg.cc/xdsFXJpV/DSIF-pd-P13.jpg", 
  "Хөдөө аж ахуй": "https://i.postimg.cc/8k0npS29/DSIF-pd-P12.jpg",
  "Боловсрол, хүний нөөц": "https://i.postimg.cc/438NnybL/DSIF-pd-P8.jpg",
  "Нийгмийн дэд бүтэц ба хүрээлэн буй орчин": "https://i.postimg.cc/8k0npS29/DSIF-pd-P12.jpg"
};

export default function App() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string>("Логистикийн зангилаа");
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsRegistrationModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = selectedSector 
    ? PROJECTS_DATA.filter(p => p.s.includes(selectedSector) || selectedSector.includes(p.s))
    : [];

  return (
    <div className="bg-brand-dark text-slate-200 min-h-screen font-sans selection:bg-brand-primary/30">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#purpose" className="hover:text-brand-primary transition-colors">Зорилго</a>
            <a href="#advantages" className="hover:text-brand-primary transition-colors">Давуу тал</a>
            <a href="#sectors" className="hover:text-brand-primary transition-colors">Салбарууд</a>
            <a href="#process" className="hover:text-brand-primary transition-colors">Хөтөлбөр</a>
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="px-8 py-3 bg-brand-primary text-white rounded-full hover:bg-green-600 transition-all shadow-lg shadow-brand-primary/20"
            >
              Бүртгүүлэх
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-8 flex flex-col gap-6 lg:hidden"
            >
              <a href="#purpose" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Зорилго</a>
              <a href="#advantages" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Давуу тал</a>
              <a href="#sectors" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Салбарууд</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest">Хөтөлбөр</a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsRegistrationModalOpen(true);
                }}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl"
              >
                Бүртгүүлэх
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION (REVERTED TO OLD DESIGN) --- */}
      <section className="relative h-[100svh] min-h-[500px] md:min-h-[700px] flex flex-col justify-start pt-32 md:pt-40 px-4 md:px-12 lg:px-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://i.postimg.cc/XvKtBybJ/fff.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Original Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-yellow-900/40 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/40 via-yellow-600/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Top text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/90 font-light tracking-wide mb-8 text-sm md:text-base uppercase"
          >
            ДОРНОГОВЬ, САЙНШАНД 2026.04.04-06
          </motion.div>

          {/* Logo and Title (Old Design) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-[85%] sm:w-full max-w-md md:max-w-2xl lg:max-w-4xl"
          >
            <img 
              src="https://i.postimg.cc/25FV5qp6/DSIF-mng.png" 
              alt="Ногоон Хөгжил Тогтвортой Хөрөнгө Оруулалт Форум 2026" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-12 left-0 w-full px-4 md:px-12 lg:px-24 z-10"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6 md:gap-12 text-white/80 text-sm md:text-base font-light tracking-wider uppercase">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              ХАМТЫН АЖИЛЛАГАА
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
              ХӨРӨНГӨ ОРУУЛАЛТ
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              ХӨГЖИЛ ДЭВШИЛ
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- PURPOSE SECTION --- */}
      <section id="purpose" className="py-40 bg-brand-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-[150px] rounded-full -mr-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl mb-32">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">ЗОРИЛГО</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-[0.9] tracking-tighter mb-16">
              ТОГТВОРТОЙ БОДЛОГО <br />
              <span className="text-brand-secondary">ТАСРАЛТГҮЙ ХӨГЖИЛ</span>
            </h3>
            <p className="text-2xl md:text-3xl text-slate-400 leading-relaxed font-light">
              
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: "100+", t: "Хөрөнгө оруулагч", d: "Дорноговь аймгийн стратегийн давуу талыг олон улсад сурталчлах" },
              { n: "100+", t: "B2B уулзалт", d: "Хөрөнгө оруулалтын төслүүд, багцуудыг танилцуулах" },
              { n: "30+", t: "Санамж бичиг", d: "Төр, хувийн хэвшил, хөрөнгө оруулагчдыг холбох" },
              { n: "500+", t: "Оролцогч", d: "Ногоон шилжилт, SDG зорилтуудыг хэрэгжүүлэх" }
            ].map((s, i) => (
              <div key={i} className="glass-card p-12 group">
                <div className="text-6xl font-bold text-white group-hover:text-brand-primary transition-colors mb-6">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">{s.t}</div>
                <p className="text-base text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GROWTH DRIVERS --- */}
      <section className="py-40 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-12">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">Хөгжлийн хөдөлгүүр</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-tight">Тогтвортой өсөлт хөгжлийн хөдөлгүүр</h3>
            </div>
            <div className="w-32 h-[2px] bg-brand-primary mb-6"></div>
          </div>

          <div className="mb-24 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none"></div>
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedDriver}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={DRIVER_IMAGES[selectedDriver] || "https://i.postimg.cc/8k0npS29/DSIF-pd-P12.jpg"} 
                alt={selectedDriver} 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Сэргээгдэх эрчим хүч", "Логистикийн зангилаа", "Чөлөөт бүс", "Аж үйлдвэрлэлийн кластер",
              "Аялал жуулчлал", "Хөдөө аж ахуй", "Боловсрол, хүний нөөц", "Нийгмийн дэд бүтэц ба хүрээлэн буй орчин"
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedDriver(item)}
                className={`p-10 text-left border rounded-3xl flex flex-col gap-10 group transition-all duration-500 ${selectedDriver === item ? 'bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-brand-surface border-white/5 hover:border-brand-primary/50'}`}
              >
                <div className={`text-5xl font-bold transition-colors ${selectedDriver === item ? 'text-white/40' : 'text-white/5 group-hover:text-brand-primary/20'}`}>0{i + 1}</div>
                <div className={`text-base font-bold uppercase tracking-widest leading-tight ${selectedDriver === item ? 'text-white' : 'text-slate-300'}`}>{item}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- STRATEGY & ADVANTAGES --- */}
      <section id="advantages" className="py-40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-32">
            <div className="lg:w-1/3">
              <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">Стратеги</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-12 leading-[0.9]">Бүс нутгийн <br />давуу талууд</h3>
              <p className="text-slate-400 mb-16 leading-relaxed text-xl font-light">Дорноговь аймаг нь дэд бүтэц, байгалийн нөөц болон гео-байршлын хувьд Монгол улсын эдийн засгийн гол зангилаа юм.</p>
              
              <div className="p-10 bg-brand-primary/5 border-l-8 border-brand-primary rounded-r-[2.5rem]">
                <h4 className="font-bold text-brand-primary mb-4 tracking-[0.3em] uppercase text-xs">Эдийн засгийн зангилаа</h4>
                <p className="text-base text-slate-300 leading-relaxed">Улсын нийт экспортын ачаа эргэлтийн 87% нь манай аймгийн боомтуудаар дамжин өнгөрдөг.</p>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
              <AdvantageCard 
                icon={<MapPin size={32} />} 
                title="Гео-байршил ба тээвэр" 
                desc={`Замын-Үүд боомт (18.3м тонн ачаа)
Ханги боомт (23.4 сая тн)
Замын-Үүд чөлөөт бүс (900 га)
Транс-Монголын төмөр зам (10.3 сая тонн)`} 
              />
              <AdvantageCard 
                icon={<BarChart3 size={32} />} 
                title="Байгалийн нөөц" 
                desc={`Ашиглалтын 231 хайгуулын 136 тусгай зөвшөөрөл
Түгээмэл тархацтай ашигт малтмалын 17 тусгай зөвшөөрөл бүхий арвин бааз`} 
              />
              <AdvantageCard 
                icon={<Globe size={32} />} 
                title="Аялал жуулчлал" 
                desc={`Хил орчмын аялал жуулчлал
Шашин соёл
Палеонтологийн олдвор
Тусгай сонирхлын аялал жуулчлалын онцгой бүс`} 
              />
              <AdvantageCard 
                icon={<Leaf size={32} />} 
                title="ХАА ба байгаль орчин" 
                desc={`240 хоршоо бүхий мал аж ахуй
Мах хүнсний дотоод хангамж
3,290 га өвөлжөө хаваржаа
Уур амьсгалын дасан зохицох ногоон бодлого`} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- POLICY & CONCEPT --- */}
      <section className="py-40 bg-brand-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">Бодлого</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">Үзэл баримтлал</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                n: "01", t: "Тогтвортой хөгжлийн зорилтууд", 
                d: "7-Цэвэр эрчим хүч, 8-Эдийн засгийн өсөлт, 9-Инноваци, дэд бүтэц, 13-Уур амьсгалын өөрчлөлт, 17-Түншлэл." 
              },
              { 
                n: "02", t: "Үндэсний бодлого", 
                d: "Алсын хараа 2050, Шинэ сэргэлтийн бодлого, Боомт, Аж үйлдвэр, Хот хөдөөгийн сэргэлт, Ногоон хөгжил." 
              },
              { 
                n: "03", t: "Бүсчилсэн хөгжил", 
                d: "Уул уурхай, аж үйлдвэр, Сэргээгдэх эрчим хүч, Хил орчмын худалдаа, Ногоон хөгжлийн сэргэлт." 
              },
              { 
                n: "04", t: "Аймгийн 2026-2030 үндсэн чиглэл", 
                d: "Үйлдвэрлэл, технологийн парк, Эрчим хүч, дэд бүтэц, Хүний хөгжил, Ногоон хөгжил." 
              },
              { 
                n: "05", t: "Засаг даргын 2024-2028 хөтөлбөр", 
                d: "Дундаж давхарга, Аж үйлдвэрийн суурь, Нийгмийн үйлчилгээ, Хөрөнгө оруулалтын орчин." 
              },
              { 
                n: "06", t: "Хөрөнгө оруулалтын бодит орчин", 
                d: "Хилийн боомт + Чөлөөт бүс, 900 га аж үйлдвэрийн бүс, Стратегийн үйлдвэрүүд." 
              }
            ].map((p, i) => (
              <div key={i} className="p-12 bg-brand-surface border border-white/5 rounded-[3rem] hover:border-brand-primary/50 transition-all duration-500 group">
                <div className="text-xs font-bold text-brand-primary mb-10 tracking-[0.4em]">{p.n}</div>
                <h4 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-primary transition-colors leading-tight">{p.t}</h4>
                <p className="text-slate-400 text-base leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRIORITY SECTORS --- */}
      <section id="sectors" className="py-40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">Салбарууд</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">Тэргүүлэх чиглэлүүд</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-24">
            {[
              { t: "Сэргээгдэх эрчим хүч", i: <Sun size={23} strokeWidth={1.1} /> },
              { t: "Тээвэр логистик", i: <Train size={23} strokeWidth={1.1} /> },
              { t: "Банк санхүү", i: <Building2 size={23} strokeWidth={1.1} /> },
              { t: "Хүрээлэн буй орчин", i: <TreePine size={23} strokeWidth={1.1} /> },
              { t: "Хөдөө аж ахуй газар тариалан", i: <Sprout size={23} strokeWidth={1.1} /> },
              { t: "Аялал жуулчлал", i: <Compass size={23} strokeWidth={1.1} /> },
              { t: "Уул уурхай", i: <Pickaxe size={23} strokeWidth={1.1} /> },
            ].map((s, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedSector(selectedSector === s.t ? null : s.t)}
                className={`p-12 rounded-[2.5rem] border transition-all duration-500 text-center group ${
                  selectedSector === s.t 
                    ? 'bg-brand-primary border-brand-primary shadow-2xl shadow-brand-primary/40 scale-105' 
                    : 'bg-brand-dark/50 border-white/5 hover:border-brand-primary/50'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 ${
                  selectedSector === s.t ? 'bg-white text-brand-primary' : 'bg-brand-primary/10 text-brand-primary'
                }`}>
                  {s.i}
                </div>
                <div className={`text-[11px] font-bold uppercase tracking-[0.25em] leading-tight ${
                  selectedSector === s.t ? 'text-white' : 'text-slate-400'
                }`}>{s.t}</div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedSector && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="glass-card p-16 border-brand-primary/50 shadow-2xl shadow-brand-primary/10"
              >
                <div className="flex justify-between items-center mb-16">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tighter flex items-center gap-6">
                    <div className="w-4 h-12 bg-brand-primary rounded-full" />
                    {selectedSector} - Төслүүд
                  </h3>
                  <button 
                    onClick={() => setSelectedSector(null)}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-8 text-xs uppercase tracking-[0.3em] text-brand-primary font-bold">Төслийн нэр</th>
                        <th className="py-8 text-xs uppercase tracking-[0.3em] text-brand-primary font-bold">Байршил</th>
                        <th className="py-8 text-xs uppercase tracking-[0.3em] text-brand-primary font-bold text-right">Өртөг</th>
                        <th className="py-8 text-xs uppercase tracking-[0.3em] text-brand-primary font-bold text-right">Хугацаа</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-8 font-bold text-white text-lg group-hover:text-brand-primary transition-colors">{project.n}</td>
                          <td className="py-8 text-base text-slate-400 font-light">{project.l}</td>
                          <td className="py-8 text-base font-bold text-brand-secondary text-right">{project.c}</td>
                          <td className="py-8 text-base text-slate-500 text-right font-light">{project.p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- FORUM PROGRAM --- */}
      <section id="process" className="py-40 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">Хөтөлбөр</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">Форумын хөтөлбөр</h3>
            <p className="mt-8 text-slate-400 text-lg font-light tracking-widest uppercase">2026.04.04 - 06</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {PROGRAM_DATA.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`px-10 py-6 rounded-3xl border transition-all duration-500 text-left min-w-[240px] ${
                  selectedDay === idx 
                    ? 'bg-brand-primary border-brand-primary shadow-2xl shadow-brand-primary/30 scale-105' 
                    : 'bg-brand-surface border-white/5 hover:border-brand-primary/50'
                }`}
              >
                <div className={`text-xs font-bold mb-2 tracking-widest uppercase ${selectedDay === idx ? 'text-white/70' : 'text-slate-500'}`}>
                  {day.day}
                </div>
                <div className={`text-xl font-bold ${selectedDay === idx ? 'text-white' : 'text-white'}`}>
                  {day.date}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-12 md:p-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-1">
                  <div className="inline-block px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg text-xs font-bold uppercase tracking-widest mb-6">
                    Фокус
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-8 leading-tight">
                    {PROGRAM_DATA[selectedDay].title}
                  </h4>
                  <p className="text-slate-400 text-lg leading-relaxed font-light italic">
                    {PROGRAM_DATA[selectedDay].focus}
                  </p>
                </div>

                <div className="lg:col-span-2 space-y-12">
                  {PROGRAM_DATA[selectedDay].events.map((event, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                      <div className="md:w-32 shrink-0">
                        <div className="text-brand-primary font-mono text-lg font-bold tracking-tighter">
                          {event.time}
                        </div>
                      </div>
                      <div className="flex-1 pb-10 border-b border-white/5 group-last:border-0 group-last:pb-0">
                        <h5 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                          {event.name}
                        </h5>
                        <p className="text-slate-400 leading-relaxed font-light">
                          {event.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- RISKS & OPPORTUNITIES --- */}
      <section className="py-40 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="p-16 rounded-[4rem] bg-red-500/5 border border-red-500/20">
              <h3 className="text-4xl font-bold mb-12 flex items-center gap-6 text-red-500 uppercase tracking-tighter leading-none">
                <AlertTriangle size={40} /> Эрсдэл
              </h3>
              <ul className="space-y-10">
                {[
                  "Түүхий эдийн үнийн хэлбэлзэл", 
                  "Дэд бүтцийн саатал, санхүүжилтийн хоцрогдол", 
                  "Бодлого, зохицуулалтын өөрчлөлт",
                  "Байгаль, нийгмийн нөлөөллийн эрсдэл"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-8 text-slate-300 text-xl font-light">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-16 rounded-[4rem] bg-brand-primary/5 border border-brand-primary/20">
              <h3 className="text-4xl font-bold mb-12 flex items-center gap-6 text-brand-primary uppercase tracking-tighter leading-none">
                <Lightbulb size={40} /> Боломж
              </h3>
              <ul className="space-y-10">
                {[
                  "Сэргээгдэх эрчим хүчний экспорт", 
                  "Логистикийн зангилаа, боомт хөгжүүлэх", 
                  "Үйлдвэрлэлийн нэмүү өртөг шингээх",
                  "Аялал жуулчлал, соёлын хөгжил"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-8 text-slate-300 text-xl font-light">
                    <div className="w-4 h-4 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- ESG IMPACT --- */}
      <section className="py-40 bg-brand-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-8">ESG</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">Тогтвортой хөгжлийн нөлөө</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-16 group">
              <div className="text-brand-primary mb-12 font-bold tracking-[0.4em] text-xs">ENVIRONMENT</div>
              <h4 className="text-3xl font-bold mb-8 text-white group-hover:text-brand-primary transition-colors leading-none">Байгаль орчин</h4>
              <p className="text-lg leading-relaxed text-slate-400 font-light">Сэргээгдэх эрчим хүч, уур амьсгалын дасан зохицол, байгалийн нөөцийг хариуцлагатай ашиглах.</p>
            </div>
            
            <div className="glass-card p-16 group">
              <div className="text-brand-secondary mb-12 font-bold tracking-[0.4em] text-xs">SOCIAL</div>
              <h4 className="text-3xl font-bold mb-8 text-white group-hover:text-brand-secondary transition-colors leading-none">Нийгэм</h4>
              <p className="text-lg leading-relaxed text-slate-400 font-light">Ажлын байр нэмэгдүүлэх, орон нутгийн иргэдийн оролцоо, боловсрол болон эрүүл мэндийн дэмжлэг.</p>
            </div>

            <div className="glass-card p-16 group">
              <div className="text-white/30 mb-12 font-bold tracking-[0.4em] text-xs">GOVERNANCE</div>
              <h4 className="text-3xl font-bold mb-8 text-white group-hover:text-white transition-colors leading-none">Засаглал</h4>
              <p className="text-lg leading-relaxed text-slate-400 font-light">Ил тод байдал, авлигаас ангид байх, хариуцлагатай бизнес эрхлэлт, хууль дээдлэх ёс.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 bg-brand-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
            <div className="md:col-span-2">
              <img src="https://i.postimg.cc/25FV5qp6/DSIF-mng.png" className="h-16 w-auto mb-12" alt="Logo" />
              <p className="text-slate-500 max-w-md leading-relaxed text-lg font-light">
                ДОРНОГОВЬ АЙМГИЙН "НОГООН ХӨГЖИЛ - ТОГТВОРТОЙ ХӨРӨНГӨ ОРУУЛАЛТ 2026" ОЛОН УЛСЫН ФОРУМ.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] mb-12 text-xs">ХОЛБООС</h4>
              <ul className="space-y-6 text-sm text-slate-500 font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-brand-primary transition-colors">БИДНИЙ ТУХАЙ</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">ТӨСЛҮҮД</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">МЭДЭЭ МЭДЭЭЛЭЛ</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">ХОЛБОО БАРИХ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] mb-12 text-xs">ХОЛБОО БАРИХ</h4>
              <ul className="space-y-6 text-base text-slate-500 font-light">
                <li>info@dornogovi.gov.mn</li>
                <li>+976 7044 1234</li>
                <li>ДОРНОГОВЬ АЙМАГ, САЙНШАНД СУМ</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
              © 2026 ДОРНОГОВЬ АЙМГИЙН ЗДТГ БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-slate-600 hover:text-brand-primary transition-all hover:scale-125"><Globe size={24} /></a>
              <a href="#" className="text-slate-600 hover:text-brand-primary transition-all hover:scale-125"><Users size={24} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SCROLL TO TOP --- */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-primary/40 hover:bg-green-600 transition-all"
          >
            <ArrowRight className="-rotate-90" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- REGISTRATION MODAL --- */}
      <AnimatePresence>
        {isRegistrationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsRegistrationModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Амжилттай бүртгэгдлээ!</h3>
                  <p className="text-slate-400 text-lg">
                    Бид тантай тун удахгүй холбогдох болно.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-sm font-bold text-brand-primary tracking-[0.5em] uppercase mb-4">Бүртгэл</h2>
                    <h3 className="text-3xl font-bold text-white tracking-tighter uppercase leading-none">Форумд оролцох</h3>
                  </div>

                  <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Овог, Нэр *</label>
                        <input required type="text" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="Таны нэр" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Утасны дугаар *</label>
                        <input required type="tel" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="9911XXXX" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">И-мэйл хаяг *</label>
                      <input required type="email" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="example@domain.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Байгууллагын нэр</label>
                      <input type="text" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="Байгууллага / Компани" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Сонирхож буй салбар</label>
                      <select className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors appearance-none">
                        <option value="">Сонгох...</option>
                        <option value="energy">Сэргээгдэх эрчим хүч</option>
                        <option value="logistics">Тээвэр логистик</option>
                        <option value="finance">Банк санхүү</option>
                        <option value="environment">Хүрээлэн буй орчин</option>
                        <option value="agriculture">Хөдөө аж ахуй газар тариалан</option>
                        <option value="tourism">Аялал жуулчлал</option>
                        <option value="mining">Уул уурхай</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-green-600 transition-colors mt-8 shadow-lg shadow-brand-primary/20">
                      Бүртгэл илгээх
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
