"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "uz" | "en" | "ru";

const translations = {
  uz: {
    nav: {
      services: "Xizmatlar",
      projects: "Loyihalar",
      team: "Jamoa",
      reviews: "Fikrlar",
      contact: "Aloqa",
      cta: "Boshlash",
    },
    hero: {
      badge: "Yangi loyihalar uchun ochiq · 2026",
      line1: "Biz quramiz",
      line2: "sizning biznesingiz",
      line3: "uchun.",
      subtitle: "Devnex — bu g'oyangizni dizayn, kod va sun'iy intellekt bilan birlashtiruvchi IT jamoa. CRM, ERP, Mobile, Web va Cloud yechimlar yaratamiz.",
      cta1: "Loyihani muhokama qilish",
      cta2: "Ishlarimizni ko'rish",
    },
    services: {
      label: "xizmatlar",
      title: "Nima qilishimiz",
      subtitle: "Biznes muammolaringizni hal qiluvchi kompleks IT yechimlar — bitta jamoa, barcha texnologiyalar.",
      crm: {
        title: "CRM Tizimlari",
        desc: "Mijozlar bilan munosabatlarni avtomatlashtirish. Sotuv, xizmat va marketing jarayonlarini birlashtirish.",
      },
      erp: {
        title: "ERP Yechimlar",
        desc: "Moliya, ombor, HR va ishlab chiqarishni bitta platformada boshqarish.",
      },
      mobile: {
        title: "Mobile Ilovalar",
        desc: "iOS va Android uchun native va cross-platform (Flutter, React Native) ilovalar. Tezkor, chiroyli va store-larga tayyor.",
      },
      web: {
        title: "Web Platformalar",
        desc: "Landing page'lardan murakkab SaaS platformalargacha. SEO, tezlik va konversiyaga e'tibor.",
      },
      devops: {
        title: "DevOps & Cloud",
        desc: "CI/CD, Docker, Kubernetes va monitoring. AWS, GCP yoki o'z serveringizda — masshtablanadigan infratuzilma.",
      },
      backend: {
        title: "Backend & API",
        desc: "Mikroservislar, REST/GraphQL API, real-time tizimlar va ma'lumotlar bazasi optimizatsiyasi.",
      },
    },
    tech: {
      label: "texnologiyalar",
      title: "Ishlatadigan texnologiyalar",
      subtitle: "Zamonaviy va ishonchli stack bilan quramiz.",
    },
    projects: {
      label: "loyihalar",
      title: "So'nggi ishlarimiz",
      subtitle: "Real loyihalar, haqiqiy natijalar.",
      view: "Ko'rish →",
    },
    reviews: {
      label: "fikrlar",
      title: "Mijozlarimiz nima deydi",
      subtitle: "Hamkorlarimizning biz haqida fikrlari.",
    },
    contact: {
      label: "aloqa",
      title: "Loyihangizni biz bilan boshlang",
      subtitle: "Bepul 30-daqiqalik konsultatsiya. G'oyangizni tinglaymiz, kerakli stack va taxminiy muddatni aytamiz.",
      email: "Email",
      phone: "Telefon",
      address: "Manzil",
      addressVal: "Toshkent, O'zbekiston",
      formTitle: "Loyihaga zayafka qoldirish",
      formSub: "24 soat ichida javob qaytaramiz.",
      name: "Ismingiz",
      namePh: "Aziz Karimov",
      company: "Kompaniya",
      companyPh: "Acme Inc.",
      emailPh: "you@company.com",
      phonePh: "+998 __ ___ __ __",
      service: "Xizmat turi",
      budget: "Byudjet",
      budgetPh: "Tanlang",
      budgets: ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"],
      message: "Loyiha haqida",
      messagePh: "Loyihangizni qisqacha tushuntiring...",
      send: "Zayafka yuborish →",
      services: ["CRM", "ERP", "Mobile", "Web", "Backend", "DevOps"],
    },
    footer: {
      tagline: "Biznesingiz uchun aqlli IT yechimlar.",
      rights: "Barcha huquqlar himoyalangan.",
    },
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      team: "Team",
      reviews: "Reviews",
      contact: "Contact",
      cta: "Start a project",
    },
    hero: {
      badge: "Open for new projects · 2026",
      line1: "We build",
      line2: "for your",
      line3: "business.",
      subtitle: "Devnex is an IT team combining design, code, and AI. We deliver CRM, ERP, Mobile, Web, and Cloud solutions.",
      cta1: "Discuss a project",
      cta2: "View our work",
    },
    services: {
      label: "services",
      title: "What we do",
      subtitle: "End-to-end IT solutions that solve real business problems — one team, all technologies.",
      crm: { title: "CRM Systems", desc: "Automate customer relationships. Unify sales, service, and marketing workflows." },
      erp: { title: "ERP Solutions", desc: "Manage finance, warehouse, HR, and production in one platform." },
      mobile: { title: "Mobile Apps", desc: "Native and cross-platform iOS & Android apps with Flutter and React Native. Fast, beautiful, store-ready." },
      web: { title: "Web Platforms", desc: "From landing pages to complex SaaS platforms. Focus on SEO, performance, and conversion." },
      devops: { title: "DevOps & Cloud", desc: "CI/CD, Docker, Kubernetes, monitoring. AWS, GCP, or your own server — scalable infrastructure." },
      backend: { title: "Backend & API", desc: "Microservices, REST/GraphQL APIs, real-time systems, and database optimization." },
    },
    tech: { label: "technologies", title: "Our tech stack", subtitle: "We build with modern, proven technologies." },
    projects: { label: "projects", title: "Recent work", subtitle: "Real projects, real results.", view: "View →" },
    reviews: { label: "reviews", title: "What clients say", subtitle: "Feedback from our partners." },
    contact: {
      label: "contact",
      title: "Start your project with us",
      subtitle: "Free 30-minute consultation. We'll listen to your idea, recommend the stack and estimate the timeline.",
      email: "Email", phone: "Phone", address: "Address", addressVal: "Tashkent, Uzbekistan",
      formTitle: "Leave a request",
      formSub: "We respond within 24 hours.",
      name: "Your name", namePh: "John Smith", company: "Company", companyPh: "Acme Inc.",
      emailPh: "you@company.com", phonePh: "+998 __ ___ __ __",
      service: "Service type", budget: "Budget", budgetPh: "Select",
      budgets: ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"],
      message: "About the project", messagePh: "Briefly describe your project...",
      send: "Send request →",
      services: ["CRM", "ERP", "Mobile", "Web", "Backend", "DevOps"],
    },
    footer: { tagline: "Smart IT solutions for your business.", rights: "All rights reserved." },
  },
  ru: {
    nav: {
      services: "Услуги",
      projects: "Проекты",
      team: "Команда",
      reviews: "Отзывы",
      contact: "Контакт",
      cta: "Начать проект",
    },
    hero: {
      badge: "Открыты для новых проектов · 2026",
      line1: "Мы создаём",
      line2: "для вашего",
      line3: "бизнеса.",
      subtitle: "Devnex — IT-команда, объединяющая дизайн, код и AI. Разрабатываем CRM, ERP, мобильные, веб и облачные решения.",
      cta1: "Обсудить проект",
      cta2: "Посмотреть работы",
    },
    services: {
      label: "услуги",
      title: "Что мы делаем",
      subtitle: "Комплексные IT-решения для реальных бизнес-задач — одна команда, все технологии.",
      crm: { title: "CRM системы", desc: "Автоматизация работы с клиентами. Объединение продаж, сервиса и маркетинга." },
      erp: { title: "ERP решения", desc: "Управление финансами, складом, HR и производством в одной платформе." },
      mobile: { title: "Мобильные приложения", desc: "Нативные и кросс-платформенные iOS и Android приложения на Flutter и React Native." },
      web: { title: "Веб-платформы", desc: "От лендингов до сложных SaaS-платформ. Фокус на SEO, скорость и конверсию." },
      devops: { title: "DevOps & Cloud", desc: "CI/CD, Docker, Kubernetes, мониторинг. AWS, GCP или ваш сервер — масштабируемая инфраструктура." },
      backend: { title: "Backend & API", desc: "Микросервисы, REST/GraphQL API, системы реального времени и оптимизация БД." },
    },
    tech: { label: "технологии", title: "Наш стек технологий", subtitle: "Строим на современных и надёжных технологиях." },
    projects: { label: "проекты", title: "Последние работы", subtitle: "Реальные проекты, реальные результаты.", view: "Смотреть →" },
    reviews: { label: "отзывы", title: "Что говорят клиенты", subtitle: "Отзывы наших партнёров." },
    contact: {
      label: "контакт",
      title: "Начните проект с нами",
      subtitle: "Бесплатная 30-минутная консультация. Выслушаем идею, порекомендуем стек и оценим сроки.",
      email: "Email", phone: "Телефон", address: "Адрес", addressVal: "Ташкент, Узбекистан",
      formTitle: "Оставить заявку",
      formSub: "Ответим в течение 24 часов.",
      name: "Ваше имя", namePh: "Иван Иванов", company: "Компания", companyPh: "Acme Inc.",
      emailPh: "you@company.com", phonePh: "+998 __ ___ __ __",
      service: "Тип услуги", budget: "Бюджет", budgetPh: "Выбрать",
      budgets: ["$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"],
      message: "О проекте", messagePh: "Опишите ваш проект кратко...",
      send: "Отправить заявку →",
      services: ["CRM", "ERP", "Mobile", "Web", "Backend", "DevOps"],
    },
    footer: { tagline: "Умные IT-решения для вашего бизнеса.", rights: "Все права защищены." },
  },
};

type Translations = typeof translations.uz;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "uz",
  setLang: () => {},
  t: translations.uz,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
