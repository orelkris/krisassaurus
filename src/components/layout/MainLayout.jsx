const MainLayout = ({ leftSidebar, children, rightSidebar }) => {
  return (
    <div className="h-screen bg-slate-50 overflow-hidden">
      {/* MOBILE LAYOUT - Stack vertically */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Top: Navigation Sidebar */}
        {leftSidebar && (
          <div className="bg-white shadow-sm border-b border-slate-200 flex-shrink-0">
            {leftSidebar}
          </div>
        )}

        {/* Middle: Right Sidebar (Stats/Actions) */}
        {rightSidebar && (
          <div className="bg-white shadow-sm border-b border-slate-200 flex-shrink-0">
            {rightSidebar}
          </div>
        )}

        {/* Bottom: Main Content - Scrollable */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>

      {/* DESKTOP LAYOUT - Side by side with full height */}
      <div className="hidden lg:flex h-full">
        {/* LEFT PANEL - Full height */}
        {leftSidebar && (
          <div className="flex-shrink-0 bg-white shadow-sm border-r border-slate-200 h-full overflow-y-auto">
            {leftSidebar}
          </div>
        )}

        {/* MAIN CONTENT - Full height, scrollable */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>

        {/* RIGHT PANEL - Full height */}
        {rightSidebar && (
          <div className="flex-shrink-0 bg-white shadow-sm border-l border-slate-200 h-full overflow-y-auto">
            {rightSidebar}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
