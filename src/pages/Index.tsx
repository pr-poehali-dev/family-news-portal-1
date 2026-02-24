import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/bd290618-5416-4b85-b3d8-94af306081c2/files/ce8e53bd-6cdc-457d-b809-cd518c06ae2d.jpg";
const CONCERT_IMG = "https://cdn.poehali.dev/projects/bd290618-5416-4b85-b3d8-94af306081c2/files/61bbf58c-ee6c-4ed1-9f66-044fb6931e72.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/bd290618-5416-4b85-b3d8-94af306081c2/files/3a127f87-28d7-4c75-a497-74c97a1f7894.jpg";

type Section = "home" | "news" | "concerts" | "menu" | "chat";

const news = [
  { id: 1, date: "20 февраля 2026", title: "Дедушка вернулся из путешествия!", text: "Дедушка Виктор провёл три недели в Петербурге и привёз кучу впечатлений и фотографий.", emoji: "✈️" },
  { id: 2, date: "14 февраля 2026", title: "День Влюблённых всей семьёй", text: "Собрались все вместе, пекли торт с клубникой и смотрели старые фотографии.", emoji: "❤️" },
  { id: 3, date: "2 февраля 2026", title: "Маша поступила в музыкальную школу!", text: "Наша Маша сдала вступительный экзамен на отлично — начинает учиться игре на скрипке.", emoji: "🎻" },
];

const concerts = [
  { id: 1, date: "1 марта 2026", title: "Весенний концерт", place: "Дом культуры «Звезда»", time: "18:00", desc: "Выступают Маша (скрипка) и Петя (фортепиано). Вход свободный для семьи." },
  { id: 2, date: "15 марта 2026", title: "Квартирник у бабушки", place: "Ул. Лесная, 12", time: "15:00", desc: "Уютный домашний концерт с чаем и пирогами. Все приглашены!" },
  { id: 3, date: "5 апреля 2026", title: "Городской фестиваль", place: "Парк «Центральный»", time: "12:00", desc: "Семья участвует в городском фестивале молодых талантов." },
];

const recipes = [
  { id: 1, name: "Бабушкин борщ", time: "2 ч", category: "Обед", emoji: "🍲", ingredients: ["Свёкла, морковь, капуста", "Говядина на кости", "Чеснок, лавровый лист", "Сметана для подачи"] },
  { id: 2, name: "Яблочный пирог мамы", time: "1 ч", category: "Выпечка", emoji: "🍎", ingredients: ["3 яблока, 200г муки", "100г сахара, 2 яйца", "100г масла", "Ванилин, корица"] },
  { id: 3, name: "Оливье по-нашему", time: "40 мин", category: "Салат", emoji: "🥗", ingredients: ["Отварная курица", "Картошка, морковь, огурцы", "Зелёный горошек", "Домашний майонез"] },
  { id: 4, name: "Пельмени с папой", time: "3 ч", category: "Ужин", emoji: "🥟", ingredients: ["500г свинины+говядины", "Тесто: мука, яйцо, вода", "Лук, соль, перец", "Сливочное масло"] },
];

interface Message {
  id: number;
  author: string;
  text: string;
  time: string;
  color: string;
}

const initialMessages: Message[] = [
  { id: 1, author: "Мама", text: "Всем привет! Не забудьте про концерт в воскресенье 🎵", time: "10:23", color: "#e07b6a" },
  { id: 2, author: "Папа", text: "Помню, помню! Уже записал в календарь 👍", time: "10:45", color: "#5b8dd9" },
  { id: 3, author: "Маша", text: "Ура! Я так волнуюсь, буду репетировать всю неделю 🎻", time: "11:02", color: "#7eb87e" },
];

const memberColors = ["#e07b6a", "#5b8dd9", "#7eb87e", "#c79b5e", "#9b72c8"];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [msgText, setMsgText] = useState("");
  const [author, setAuthor] = useState("Я");
  const [openRecipe, setOpenRecipe] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeSection]);

  const sendMessage = () => {
    if (!msgText.trim()) return;
    const colorIdx = Math.abs(author.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % memberColors.length;
    setMessages(prev => [...prev, {
      id: Date.now(),
      author: author || "Аноним",
      text: msgText.trim(),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      color: memberColors[colorIdx],
    }]);
    setMsgText("");
  };

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "news", label: "Новости", icon: "Newspaper" },
    { id: "concerts", label: "Концерты", icon: "Music" },
    { id: "menu", label: "Рецепты", icon: "ChefHat" },
    { id: "chat", label: "Чат", icon: "MessageCircle" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] font-montserrat">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <span className="font-cormorant text-xl font-semibold text-[var(--text)]">Наша семья</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex border-t border-[var(--border)]">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-all ${
                activeSection === item.id ? "text-[var(--primary)]" : "text-[var(--muted)]"
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in space-y-8">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden h-72 md:h-96">
              <img src={HERO_IMG} alt="Семья" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-widest">Добро пожаловать</p>
                <h1 className="font-cormorant text-4xl md:text-5xl text-white font-semibold leading-tight">Семейный портал</h1>
                <p className="text-white/80 mt-2 text-sm">Всё важное — в одном месте</p>
              </div>
            </div>

            {/* Last news */}
            <div>
              <h2 className="font-cormorant text-2xl font-semibold text-[var(--text)] mb-4">Последние новости</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {news.map(n => (
                  <div key={n.id} className="bg-white rounded-2xl p-5 border border-[var(--border)] hover:shadow-md transition-shadow">
                    <span className="text-2xl">{n.emoji}</span>
                    <p className="text-xs text-[var(--muted)] mt-2">{n.date}</p>
                    <h3 className="font-semibold text-[var(--text)] mt-1 leading-snug">{n.title}</h3>
                    <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next concert */}
            <div className="bg-[var(--primary)] rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Ближайший концерт</p>
                <h3 className="text-xl font-semibold">{concerts[0].title}</h3>
                <p className="text-white/80 text-sm mt-1">{concerts[0].date} · {concerts[0].time} · {concerts[0].place}</p>
              </div>
              <button onClick={() => setActiveSection("concerts")} className="bg-white text-[var(--primary)] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                Подробнее
              </button>
            </div>
          </div>
        )}

        {/* NEWS */}
        {activeSection === "news" && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--text)]">Новости семьи</h2>
            <div className="space-y-4">
              {news.map(n => (
                <article key={n.id} className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-md transition-shadow flex gap-5">
                  <div className="text-4xl">{n.emoji}</div>
                  <div>
                    <p className="text-xs text-[var(--muted)] mb-1">{n.date}</p>
                    <h3 className="font-semibold text-[var(--text)] text-lg">{n.title}</h3>
                    <p className="text-[var(--muted)] mt-2 text-sm leading-relaxed">{n.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="bg-[var(--surface)] rounded-2xl p-8 text-center border border-dashed border-[var(--border)]">
              <span className="text-3xl">📝</span>
              <p className="text-[var(--muted)] mt-3 text-sm">Скоро здесь появятся новые новости</p>
            </div>
          </div>
        )}

        {/* CONCERTS */}
        {activeSection === "concerts" && (
          <div className="animate-fade-in space-y-6">
            <div className="relative rounded-3xl overflow-hidden h-48">
              <img src={CONCERT_IMG} alt="Концерт" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="font-cormorant text-3xl text-white font-semibold">Концерты и выступления</h2>
              </div>
            </div>
            <div className="space-y-4">
              {concerts.map((c, i) => (
                <div key={c.id} className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-md transition-shadow flex gap-5">
                  <div className="flex flex-col items-center justify-start min-w-[52px]">
                    <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded-lg text-center leading-tight">
                      {c.date.split(" ")[0]}<br />{c.date.split(" ")[1]}
                    </span>
                    {i < concerts.length - 1 && <div className="w-0.5 flex-1 bg-[var(--border)] mt-2" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text)] text-lg">{c.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-[var(--muted)]"><Icon name="Clock" size={12} />{c.time}</span>
                      <span className="flex items-center gap-1 text-xs text-[var(--muted)]"><Icon name="MapPin" size={12} />{c.place}</span>
                    </div>
                    <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENU / RECIPES */}
        {activeSection === "menu" && (
          <div className="animate-fade-in space-y-6">
            <div className="relative rounded-3xl overflow-hidden h-48">
              <img src={FOOD_IMG} alt="Еда" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="font-cormorant text-3xl text-white font-semibold">Семейные рецепты</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recipes.map(r => (
                <div key={r.id} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    className="w-full text-left p-5 flex items-center gap-4"
                    onClick={() => setOpenRecipe(openRecipe === r.id ? null : r.id)}
                  >
                    <span className="text-3xl">{r.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[var(--text)]">{r.name}</h3>
                        <Icon name={openRecipe === r.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-[var(--muted)]" />
                      </div>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-[var(--muted)] flex items-center gap-1"><Icon name="Clock" size={11} />{r.time}</span>
                        <span className="text-xs text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">{r.category}</span>
                      </div>
                    </div>
                  </button>
                  {openRecipe === r.id && (
                    <div className="px-5 pb-5 border-t border-[var(--border)] pt-4">
                      <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">Ингредиенты</p>
                      <ul className="space-y-1">
                        {r.ingredients.map((ing, i) => (
                          <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2">
                            <span className="text-[var(--primary)] mt-0.5">•</span>{ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeSection === "chat" && (
          <div className="animate-fade-in">
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--text)] mb-6">Семейный чат</h2>
            <div className="bg-white rounded-2xl border border-[var(--border)] flex flex-col" style={{ height: "calc(100vh - 260px)", minHeight: 400 }}>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold" style={{ color: m.color }}>{m.author}</span>
                        <span className="text-xs text-[var(--muted)]">{m.time}</span>
                      </div>
                      <div className="bg-[var(--surface)] rounded-2xl rounded-tl-sm px-4 py-2.5 mt-1 text-sm text-[var(--text)] max-w-md">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="border-t border-[var(--border)] p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[var(--muted)] whitespace-nowrap">Ваше имя:</label>
                  <input
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="text-sm border border-[var(--border)] rounded-lg px-3 py-1.5 w-32 outline-none focus:border-[var(--primary)] transition-colors"
                    placeholder="Имя"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    value={msgText}
                    onChange={e => setMsgText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    className="flex-1 border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                    placeholder="Написать сообщение..."
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-[var(--primary)] text-white rounded-xl px-4 py-2.5 hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    <Icon name="Send" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
