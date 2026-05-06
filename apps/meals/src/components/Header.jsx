export default function Header() {
  return (
    <header className="h-[70px] md:h-[80px] flex-shrink-0 flex items-center justify-center relative z-20 bg-white/40 backdrop-blur-xl border-b border-white/50 shadow-sm">
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="text-brand-main">Cook</span> Shook
      </h1>
    </header>
  );
}
