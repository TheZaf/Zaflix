export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm bg-black text-white/70">
      <p>Copyright © 2026 Zaflix ⚡. A Build by Zaf.</p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/TheZaf" className="hover:text-white transition-all">Contact Zaf</a>
        <div className="h-8 w-px bg-white/20"></div>
        <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
        <div className="h-8 w-px bg-white/20"></div>
        <a href="#" className="hover:text-white transition-all">Trademark Policy</a>
      </div>
    </footer>
  )
}

