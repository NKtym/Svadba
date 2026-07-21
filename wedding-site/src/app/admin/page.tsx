"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ResponseEntry {
  id: number;
  fullName: string;
  attending: boolean;
  plusOne: boolean;
  plusOneName: string | null;
  allergies: string | null;
  drinkPreferences: string | null;

  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [responses, setResponses] = useState<ResponseEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setAuthError(data.error || "Ошибка авторизации");
        return;
      }

      setAuthed(true);
    } catch {
      setAuthError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) {
      fetch("/api/admin/list")
        .then((r) => r.json())
        .then((data) => setResponses(data))
        .catch(() => {});
    }
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="invitation-card rounded-2xl p-8 max-w-sm w-full">
          <h2 className="text-xl font-light text-gray-800 text-center">Админ-панель</h2>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Логин</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="form-input w-full px-4 py-3 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input w-full px-4 py-3 rounded-lg bg-white"
              />
            </div>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white py-3 rounded-full font-medium disabled:opacity-50"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const attending = responses.filter((r) => r.attending);
  const notAttending = responses.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + 1 + (r.plusOne ? 1 : 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="invitation-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-light text-gray-800">Ответы гостей</h2>
            <button
              onClick={() => router.push("/")}
              className="text-sm text-amber-700 hover:text-amber-900 underline"
            >
              На главную
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-light text-green-700">{attending.length}</p>
              <p className="text-sm text-green-600 mt-1">Придут</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-light text-rose-600">{notAttending.length}</p>
              <p className="text-sm text-rose-500 mt-1">Не придут</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-light text-amber-700">{totalGuests}</p>
              <p className="text-sm text-amber-600 mt-1">Всего гостей</p>
            </div>
          </div>

          {responses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Пока нет ответов</p>
          ) : (
            <div className="space-y-4">
              {responses.map((r) => (
                <div
                  key={r.id}
                  className={`border rounded-lg p-4 ${
                    r.attending ? "border-green-200 bg-green-50/30" : "border-rose-200 bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{r.fullName}</p>
                      <p className={`text-sm ${r.attending ? "text-green-600" : "text-rose-500"}`}>
                        {r.attending ? "✓ Придёт" : "✗ Не придёт"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  {r.attending && (
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      {r.plusOne && r.plusOneName && (
                        <p>Гость: <span className="font-medium">{r.plusOneName}</span></p>
                      )}
                      {r.allergies && <p>Аллергии: {r.allergies}</p>}
                      {r.drinkPreferences && <p>Напитки: {r.drinkPreferences}</p>}

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
