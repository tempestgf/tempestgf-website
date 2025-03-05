import Link from "next/link";
import { Home, User, Briefcase, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Home className="w-6 h-6" />
        <span className="text-xl font-bold">Tempestgf</span>
      </div>
      <div className="flex space-x-6">
        <Link 
          href="/about" 
          className="flex items-center space-x-1 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <User className="w-5 h-5" />
          <span>Sobre mí</span>
        </Link>
        <Link 
          href="/projects" 
          className="flex items-center space-x-1 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <Briefcase className="w-5 h-5" />
          <span>Proyectos</span>
        </Link>
        <Link 
          href="/contact" 
          className="flex items-center space-x-1 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <Mail className="w-5 h-5" />
          <span>Contacto</span>
        </Link>
      </div>
    </nav>
  );
}
