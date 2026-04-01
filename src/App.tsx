/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Layers, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Početna', href: '#home' },
    { name: 'Usluge', href: '#services' },
    { name: 'Multibeton', href: '#multibeton' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-charcoal flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-xl">OM</span>
          </div>
          <span className={cn(
            "font-display font-extrabold text-xl tracking-tighter uppercase",
            isScrolled ? "text-brand-charcoal" : "text-white"
          )}>
            Oir Minichiterm
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-brand-ice transition-colors",
                isScrolled ? "text-brand-charcoal" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand-flame text-white px-5 py-2 text-sm font-bold rounded-sm hover:bg-brand-flame/90 transition-all"
          >
            Zatražite Ponudu
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-brand-charcoal" : "text-white"} /> : <Menu className={isScrolled ? "text-brand-charcoal" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-charcoal font-medium text-lg border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-brand-charcoal">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
          alt="Modern Interior" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-brand-ice text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
            Eksperti za HVAC sisteme
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-extrabold text-white leading-tight mb-6">
            Vrhunski Komfor <br />
            <span className="text-brand-ice">za Vaš Prostor</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            Profesionalna rešenja za ventilaciju, klimatizaciju i grejanje. 
            Preko 100.000 stambenih jedinica opremljeno našim sistemima.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-brand-flame text-white px-8 py-4 font-bold text-lg rounded-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Zatražite Ponudu <ChevronRight size={20} />
            </button>
            <button className="border border-white/30 text-white px-8 py-4 font-bold text-lg rounded-sm hover:bg-white/10 transition-colors">
              Naše Usluge
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, colorClass, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700", colorClass)} />
      <div className={cn("w-14 h-14 flex items-center justify-center rounded-sm mb-6 text-white", colorClass)}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-ice transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
      <a href="#contact" className="inline-flex items-center gap-2 font-bold text-sm text-brand-charcoal hover:gap-4 transition-all">
        Saznajte više <ArrowRight size={16} />
      </a>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Wind,
      title: "Ventilacija",
      description: "Osnovni cilj ventilacije je odsisavanje ustajalog vazduha iz prostorije uz poboljšanje kvaliteta vazduha i filtraciju.",
      colorClass: "bg-brand-ice"
    },
    {
      icon: Droplets,
      title: "Klimatizacija",
      description: "Kompletna obrada vazduha, kontrola vlažnosti i temperature za maksimalnu produktivnost i zdravlje u vašem objektu.",
      colorClass: "bg-blue-600"
    },
    {
      icon: Thermometer,
      title: "Grejanje",
      description: "Napredni sistemi grejanja koji štede energiju dok pružaju savršenu toplotu tokom najhladnijih zimskih dana.",
      colorClass: "bg-brand-flame"
    },
    {
      icon: Layers,
      title: "Multibeton",
      description: "Pioniri podnog grejanja od 1964. Poseban modularni sistem polaganja cevi u toplom stanju za vrhunsku efikasnost.",
      colorClass: "bg-emerald-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Sveobuhvatna Rešenja</h2>
          <div className="w-20 h-1.5 bg-brand-flame mx-auto mb-8" />
          <p className="text-gray-600 text-lg">
            Od projektovanja do montaže, pružamo inženjersku preciznost u svakom segmentu klimatizacije i grejanja.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MultibetonSection = () => {
  return (
    <section id="multibeton" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-flame font-bold tracking-widest uppercase text-sm mb-4 block">Tradicija od 1964.</span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8">MULTIBETON: Pionir Podnog Grejanja</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Multibeton je sinonim za kvalitet u svetu podnog grejanja. Naš poseban modularni sistem polaganja cevi u toplom stanju omogućava idealnu distribuciju toplote bez naprezanja materijala.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Modularni sistem polaganja cevi",
                "Dugovečnost i pouzdanost od 1964.",
                "Maksimalna energetska efikasnost",
                "Zdravo okruženje bez dizanja prašine"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-ice" />
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-brand-charcoal text-white px-8 py-4 font-bold rounded-sm hover:bg-brand-charcoal/90 transition-all">
              Detaljna Specifikacija
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-ice/10 rounded-full -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-flame/10 rounded-full -z-10 animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
              alt="Underfloor Heating" 
              className="rounded-sm shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 bg-white p-6 shadow-xl z-20 max-w-xs">
              <p className="text-brand-charcoal font-bold text-lg mb-1">Firma od Poverenja</p>
              <p className="text-gray-500 text-sm italic">Sertifikovani partner za nemački Multibeton sistem.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "Komercijalni Centar", category: "Ventilacija", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600", size: "large" },
    { title: "Luksuzna Vila", category: "Podno Grejanje", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600", size: "small" },
    { title: "Industrijski Pogon", category: "Klimatizacija", img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600", size: "small" },
    { title: "Stambeni Kompleks", category: "HVAC", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600", size: "medium" },
  ];

  return (
    <section id="portfolio" className="py-24 bg-brand-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Naši Projekti</h2>
            <p className="text-gray-400 text-lg">
              Pogledajte neke od naših najznačajnijih instalacija širom Srbije. Kvalitet koji traje decenijama.
            </p>
          </div>
          <button className="text-brand-ice font-bold flex items-center gap-2 group">
            Svi projekti <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[800px]">
          <div className="md:col-span-2 relative group overflow-hidden rounded-sm h-[300px] md:h-auto">
            <img src={projects[0].img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-brand-ice text-sm font-bold uppercase tracking-widest">{projects[0].category}</span>
              <h3 className="text-3xl font-display font-bold mt-2">{projects[0].title}</h3>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-6 h-[500px] md:h-auto">
            {projects.slice(1, 3).map((p, i) => (
              <div key={i} className="relative group overflow-hidden rounded-sm h-full">
                <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" alt="" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-brand-ice text-xs font-bold uppercase tracking-widest">{p.category}</span>
                  <h3 className="text-xl font-display font-bold mt-1">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const brands = [
    "HUBA CONTROL", "SCHICHEK", "JOHNSON CONTROLS", "SIEMENS", "ATLANTIC VENTILATION", "MULTIBETON"
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 border-b border-gray-100 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">Zvanični Partneri i Distribucija</p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedBrands.map((brand, i) => (
            <span 
              key={i} 
              className="text-xl md:text-2xl font-display font-black tracking-tighter text-brand-charcoal/40 hover:text-brand-ice transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    { name: "Marko Petrović", role: "Vlasnik vile", text: "Multibeton sistem je promenio način na koji doživljavamo zimu. Savršena toplota bez ikakvih problema već 10 godina." },
    { name: "Jelena Nikolić", role: "Arhitekta", text: "Oir Minichiterm je moj prvi izbor za sve HVAC projekte. Inženjerski pristup i poštovanje rokova su na najvišem nivou." },
    { name: "Dragan Stojković", role: "Menadžer objekta", text: "Ventilacija u našem industrijskom pogonu radi besprekorno. Kvalitet vazduha je drastično poboljšan." }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Quote className="mx-auto text-brand-ice mb-8" size={48} />
        <div className="relative min-h-[300px] md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <p className="text-2xl md:text-3xl font-medium text-gray-700 italic leading-relaxed mb-8">
                "{reviews[active].text}"
              </p>
              <h4 className="text-xl font-display font-bold text-brand-charcoal">{reviews[active].name}</h4>
              <p className="text-brand-ice font-medium">{reviews[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActive(i)}
              className={cn("w-3 h-3 rounded-full transition-all", active === i ? "bg-brand-flame w-8" : "bg-gray-300")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadSurvey = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: '', size: '', service: '' });

  const nextStep = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setStep(step + 1);
  };

  return (
    <section className="py-24 bg-brand-ice">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-flame" />
          
          {step <= 3 && (
            <div className="mb-10">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>Korak {step} od 3</span>
                <span>{Math.round((step/3)*100)}% završeno</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step/3)*100}%` }}
                  className="h-full bg-brand-flame rounded-full" 
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-3xl font-display font-extrabold mb-8">Za kakav objekat vam je potrebno rešenje?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Stambeni (Kuća/Stan)", "Poslovni prostor", "Industrijski objekat", "Ugostiteljski objekat"].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => nextStep('type', opt)}
                      className="p-6 border-2 border-gray-100 rounded-sm hover:border-brand-ice hover:bg-brand-ice/5 transition-all text-left font-bold text-gray-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-3xl font-display font-extrabold mb-8">Koja je približna kvadratura prostora?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Manje od 50m²", "50m² - 150m²", "150m² - 500m²", "Preko 500m²"].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => nextStep('size', opt)}
                      className="p-6 border-2 border-gray-100 rounded-sm hover:border-brand-ice hover:bg-brand-ice/5 transition-all text-left font-bold text-gray-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-3xl font-display font-extrabold mb-8">Koja usluga vas najviše zanima?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Podno grejanje (Multibeton)", "Klimatizacija", "Ventilacija", "Kompletno HVAC rešenje"].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => nextStep('service', opt)}
                      className="p-6 border-2 border-gray-100 rounded-sm hover:border-brand-ice hover:bg-brand-ice/5 transition-all text-left font-bold text-gray-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-display font-extrabold mb-4">Hvala vam!</h3>
                <p className="text-gray-600 text-lg mb-8">Naš tim će analizirati vaše podatke i kontaktirati vas sa najboljom ponudom.</p>
                <button 
                  onClick={() => setStep(1)}
                  className="bg-brand-charcoal text-white px-8 py-3 font-bold rounded-sm"
                >
                  Počni ponovo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-charcoal text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <span className="text-brand-charcoal font-bold text-xl">OM</span>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tighter uppercase">
                Oir Minichiterm
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Vaš partner za vrhunski komfor i energetsku efikasnost. Decenije iskustva u projektovanju i montaži HVAC sistema.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-ice hover:border-brand-ice transition-all cursor-pointer">
                  <div className="w-4 h-4 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-widest text-brand-ice">Usluge</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Ventilacija</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Klimatizacija</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Grejanje</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Multibeton sistemi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Servis i održavanje</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-widest text-brand-ice">Kontakt</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-brand-flame shrink-0" size={20} />
                <span className="text-gray-400">Carigradska 2, 11000 Beograd, Srbija</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-brand-flame shrink-0" size={20} />
                <div className="flex flex-col">
                  <a href="tel:0113241840" className="text-gray-400 hover:text-white transition-colors">011 324 1840</a>
                  <a href="tel:063259674" className="text-gray-400 hover:text-white transition-colors">063 259 674</a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-brand-flame shrink-0" size={20} />
                <a href="mailto:aminich@eunet.rs" className="text-gray-400 hover:text-white transition-colors">aminich@eunet.rs</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-widest text-brand-ice">Lokacija</h4>
            <div className="w-full h-48 bg-gray-800 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              {/* Placeholder for map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.225574572346!2d20.470555!3d44.816667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab0e0e0e0e0%3A0x0!2zQ2FyaWdyYWRza2EgMiwgQmVvZ3JhZA!5e0!3m2!1sen!2srs!4v1600000000000!5m2!1sen!2srs" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Oir Minichiterm. Sva prava zadržana.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Politika privatnosti</a>
            <a href="#" className="hover:text-white transition-colors">Uslovi korišćenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <MultibetonSection />
      <Portfolio />
      <Testimonials />
      <LeadSurvey />
      <Footer />
    </div>
  );
}
