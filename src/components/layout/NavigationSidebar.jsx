// src/components/layout/NavigationSidebar.jsx
import { Home, Film, BookOpen, Edit3 } from "lucide-react";

const NavigationSidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "movies", label: "Movies", icon: Film },
    { id: "journal", label: "Journal", icon: Edit3 },
    { id: "books", label: "Books", icon: BookOpen },
  ];

  return (
    <div className="w-full lg:w-60 flex flex-col h-full">
      {/* Header - Compact on mobile */}
      <div className="p-4 lg:p-6 border-b border-slate-200">
        <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          My Bento
        </h1>
        <p className="text-slate-600 text-sm hidden lg:block">
          Personal Dashboard
        </p>
      </div>

      {/* Navigation - Horizontal on mobile, vertical on desktop */}
      <nav className="flex-1 p-4">
        <div className="flex lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 overflow-x-auto lg:overflow-x-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                  activeSection === item.id
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline lg:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Section - Hidden on mobile */}
      <div className="hidden lg:block p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          <span>Your Profile</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
