"use client";

import { useRouter } from "next/navigation";

export default function DresscodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
      <div className="relative rounded-2xl max-w-3xl w-full text-center overflow-hidden">
        <img src="/wedding-bg.jpg" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(255,255,255,0.50)" }} />
        <div className="relative p-8 md:p-12">
          <p className="text-sm tracking-[0.3em] uppercase text-amber-700 animate-fade-in">
            Памятка гостю
          </p>

          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mt-6 animate-fade-in animate-delay-1">
            Дресс-код
          </h2>

          <p className="text-lg text-amber-700 tracking-[0.2em] uppercase mt-2 animate-fade-in animate-delay-1">
            пастельные тона
          </p>

          <p className="text-gray-600 leading-relaxed mt-4 animate-fade-in animate-delay-2">
            Для нас главное ваше присутствие, но мы будем рады,
            если вы будете придерживаться этого дресс-кода.
          </p>

          <div className="mt-6 animate-fade-in animate-delay-3">
            <img
              src="/dresscode.jpg"
              alt="Дресс-код: пастельные тона"
              className="w-full rounded-xl"
            />
          </div>

          <button
            onClick={() => router.push("/survey")}
            className="btn-primary text-white px-10 py-4 rounded-full text-lg font-medium tracking-wide mt-8 animate-fade-in animate-delay-4"
          >
            Ознакомлен
          </button>
        </div>
      </div>
    </div>
  );
}
