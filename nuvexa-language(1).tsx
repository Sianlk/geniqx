import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const translations: Record<string, Record<string, string>> = {
  en: {
    heading: "Language Settings",
    welcome: "Welcome to Nuvexa",
  },
  fr: {
    heading: "Paramètres de langue",
    welcome: "Bienvenue sur Nuvexa",
  },
  ar: {
    heading: "إعدادات اللغة",
    welcome: "مرحبًا بك في نوفكسا",
  },
  es: {
    heading: "Configuración de idioma",
    welcome: "Bienvenido a Nuvexa",
  },
};

export default function NuvexaLanguagePage() {
  const [lang, setLang] = useState("en");

  const t = (key: string) => translations[lang]?.[key] || key;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@nuvexa.ai" userRole="global" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">{t("heading")}</h1>

        <div>
          <label htmlFor="lang" className="block text-sm">Choose Language:</label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="es">Español</option>
          </select>
        </div>

        <p className="mt-4 text-lg font-semibold">{t("welcome")}</p>
      </main>
    </div>
  );
}
