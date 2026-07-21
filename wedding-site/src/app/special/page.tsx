"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SpecialPage() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
      <div className="invitation-card rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6">
          <Image
            src="/wedding-bg.jpg"
            alt="Павел и Мария"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="ornament animate-fade-in">✦ ✦ ✦</div>

        <p className="text-sm tracking-[0.3em] uppercase text-amber-700 mt-6 animate-fade-in animate-delay-1">
          Приглашение на свадьбу
        </p>

        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mt-4 animate-fade-in animate-delay-1">
          Павел
        </h1>
        <p className="text-2xl text-amber-600 my-2 animate-fade-in animate-delay-1">&</p>
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 animate-fade-in animate-delay-1">
          Мария
        </h1>

        <div className="ornament text-lg my-6 animate-fade-in animate-delay-2">✦</div>

        <p className="text-gray-600 leading-relaxed animate-fade-in animate-delay-2">
          Мы рады сообщить, что наш союз будет скреплён узами брака,
          и хотим разделить этот важный день с самыми близкими людьми.
          Приглашаем вас на торжество в честь нашей свадьбы!
        </p>

        <div className="mt-8 space-y-3 animate-fade-in animate-delay-3">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <a
              href="https://yandex.ru/maps/org/otdel_zags_krasnogvardeyskogo_rayona/1120034982/?ll=30.408250%2C59.949154&z=17.14"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-amber-900 transition-colors"
            >
              ЗАГС Красногвардейского района
            </a>
          </div>
          <p className="text-sm text-gray-500">Большеохтинский просп., 11, корп. 1, Санкт-Петербург</p>

          <div className="flex items-center justify-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>27 августа 2026 года</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Начало бракосочетания в 12:40</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>Дресс-код: пастельные тона</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-6 p-4 bg-amber-50/50 rounded-lg animate-fade-in">
            <p className="text-gray-600 text-sm leading-relaxed">
              Будем рады видеть вас на бракосочетании! Просим прибыть в ЗАГС
              за 20 минут до начала — к 12:20. После церемонии
              у нас запланирована прогулка по Санкт-Петербургу на лимузине.
              Далее в 16:00 приглашаем на банкет и welcome в ресторан «Альтецца».
              Просим вас подтвердить присутствие, чтобы мы могли всё подготовить.
            </p>
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-6 text-amber-700 text-sm underline underline-offset-4 hover:text-amber-900 transition-colors"
        >
          {showDetails ? "Свернуть" : "Подробнее о торжестве"}
        </button>

        <div className="mt-10 animate-fade-in animate-delay-4">
          <button
            onClick={() => router.push("/survey")}
            className="btn-primary text-white px-10 py-4 rounded-full text-lg font-medium tracking-wide"
          >
            Я приду
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-8 animate-fade-in animate-delay-4">
          Пожалуйста, подтвердите присутствие до 15 августа 2026
        </p>
      </div>
    </div>
  );
}
