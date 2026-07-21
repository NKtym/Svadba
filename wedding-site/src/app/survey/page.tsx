"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    attending: true,
    plusOne: false,
    plusOneName: "",
    allergies: "",
    drinkPreferences: "",

  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Пожалуйста, укажите ваше ФИО");
      return;
    }

    if (formData.attending && formData.plusOne && !formData.plusOneName.trim()) {
      setError("Пожалуйста, укажите ФИО вашего гостя");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Произошла ошибка");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Произошла ошибка при отправке");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="invitation-card rounded-2xl p-8 md:p-12 max-w-lg w-full text-center">
          <div className="ornament animate-fade-in">✦</div>
          <h2 className="text-3xl font-light text-gray-800 mt-6 animate-fade-in animate-delay-1">
            {formData.attending ? "Спасибо!" : "Жаль"}
          </h2>
          <p className="text-gray-600 mt-4 animate-fade-in animate-delay-2">
            {formData.attending
              ? "Мы рады, что вы будете с нами! Ждём вас 27 августа в ресторане «Альтецца»."
              : "Мы будем скучать по вам. Если передумаете — свяжитесь с нами!"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="btn-primary text-white px-8 py-3 rounded-full mt-8 animate-fade-in animate-delay-3"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="invitation-card rounded-2xl p-8 md:p-12 max-w-xl w-full">
        <div className="ornament text-center animate-fade-in">✦ ✦ ✦</div>
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 text-center mt-4 animate-fade-in animate-delay-1">
          Подтверждение присутствия
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="animate-fade-in animate-delay-1">
            <label className="block text-sm text-gray-600 mb-1.5">Ваше ФИО *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Иванов Иван Иванович"
              className="form-input w-full px-4 py-3 rounded-lg bg-white"
            />
          </div>

          <div className="animate-fade-in animate-delay-2">
            <label className="block text-sm text-gray-600 mb-3">Вы придёте? *</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: true })}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.attending
                    ? "bg-amber-50 border-amber-500 text-amber-800"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                Да, буду!
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: false, plusOne: false, plusOneName: "" })}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  !formData.attending
                    ? "bg-rose-50 border-rose-400 text-rose-700"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                Не смогу
              </button>
            </div>
          </div>

          {formData.attending && (
            <>
              <div className="animate-fade-in animate-delay-2">
                <label className="block text-sm text-gray-600 mb-3">Будете не один?</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, plusOne: true })}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      formData.plusOne
                        ? "bg-amber-50 border-amber-500 text-amber-800"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    Буду с гостем
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, plusOne: false, plusOneName: "" })}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      !formData.plusOne
                        ? "bg-amber-50 border-amber-500 text-amber-800"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    Приду один/одна
                  </button>
                </div>
              </div>

              {formData.plusOne && (
                <div className="animate-fade-in">
                  <label className="block text-sm text-gray-600 mb-1.5">ФИО вашего гостя *</label>
                  <input
                    type="text"
                    value={formData.plusOneName}
                    onChange={(e) => setFormData({ ...formData, plusOneName: e.target.value })}
                    placeholder="Иванова Мария Петровна"
                    className="form-input w-full px-4 py-3 rounded-lg bg-white"
                  />
                </div>
              )}

              <div className="animate-fade-in animate-delay-3">
                <label className="block text-sm text-gray-600 mb-1.5">Аллергии</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="Укажите, если есть аллергические реакции на продукты"
                  rows={2}
                  className="form-input w-full px-4 py-3 rounded-lg bg-white resize-none"
                />
              </div>

              <div className="animate-fade-in animate-delay-3">
                <label className="block text-sm text-gray-600 mb-1.5">Предпочтения по напиткам</label>
                <textarea
                  value={formData.drinkPreferences}
                  onChange={(e) => setFormData({ ...formData, drinkPreferences: e.target.value })}
                  placeholder="Вино, коктейли, безалкогольные напитки..."
                  rows={2}
                  className="form-input w-full px-4 py-3 rounded-lg bg-white resize-none"
                />
              </div>


            </>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="flex gap-3 pt-2 animate-fade-in animate-delay-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Назад
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary text-white py-3 rounded-full font-medium disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
