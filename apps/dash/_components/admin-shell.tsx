"use client";

import {
  Bell,
  ChevronDown,
  FileText,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Хянах самбар", icon: LayoutDashboard, active: true },
  { label: "Мэдээ", icon: FileText },
  { label: "Үйл ажиллагаа", icon: FolderKanban },
  { label: "Нүүр хуудас", icon: Globe2 },
  { label: "Хэрэглэгчид", icon: Users },
];

export function AdminShell() {
  return (
    <div className="min-h-screen flex bg-white text-[#1d2b44]">
      {/* Sidebar */}
      <aside className="w-[254px] border-r border-[#e3e8ef] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-black relative overflow-hidden">
            <span className="absolute left-2 top-2 w-7 h-2 bg-yellow-400 rotate-[-15deg]" />
            <span className="absolute left-2 top-4 w-7 h-2 bg-blue-600 rotate-[-15deg]" />
            <span className="absolute left-2 top-6 w-7 h-2 bg-pink-500 rotate-[-15deg]" />
          </div>

          <div>
            <h1 className="font-serif text-xl font-bold">БСОН</h1>
            <p className="text-xs text-[#6d7d96]">Админ удирдлага</p>
          </div>
        </div>

        <p className="text-[11px] tracking-widest text-blue-700 font-bold mb-3">
          ҮНДСЭН ЦЭС
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`
                w-full h-11 flex items-center gap-3 px-3 rounded-lg text-sm
                ${
                  item.active
                    ? "bg-[#eef4fb] text-[#245da5] font-semibold"
                    : "text-[#66758d] hover:bg-gray-50"
                }
                `}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button className="w-full flex items-center gap-3 h-11 px-3 text-[#66758d]">
            <Settings size={19} />
            Тохиргоо
          </button>

          <div className="mt-5 border rounded-lg p-3 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#eef4fb] text-blue-600 flex items-center justify-center">
              ?
            </div>

            <div>
              <p className="text-xs font-bold">Тусламж хэрэгтэй юу?</p>
              <p className="text-[11px] text-gray-500">
                Системийн заавар харах
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}

      <div className="flex-1">
        <header className="h-[75px] border-b flex items-center justify-between px-10">
          <div className="text-sm text-gray-400">
            БСОН Админ /<b className="text-[#1d2b44] ml-2">Хянах самбар</b>
          </div>

          <div className="flex items-center gap-5">
            <Search size={19} className="text-gray-500" />
            <Bell size={19} className="text-gray-500" />

            <div className="border-l pl-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#245da5] text-white flex items-center justify-center">
                Б
              </div>
              Бат-Эрдэнэ
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <main className="p-10">
          <p className="text-xs tracking-widest text-blue-700 font-bold">
            МЭДЭЭЛЛИЙН ТӨВ
          </p>

          <h1 className="font-serif text-4xl mt-3">
            Сайн байна уу, Бат-Эрдэнэ
          </h1>

          <p className="text-gray-500 mt-3">
            БСОН-ийн цахим орчныг эндээс хялбар удирдана.
          </p>

          <button className="mt-6 bg-[#245da5] text-white px-5 py-3 rounded-lg">
            + Шинэ контент үүсгэх
          </button>
        </main>
      </div>
    </div>
  );
}
