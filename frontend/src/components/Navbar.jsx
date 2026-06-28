import { Mail, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onSync }) {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Mail size={28} />
          <div>
            <h1 className="text-xl font-bold">
              AI Email Automation
            </h1>
            <p className="text-sm text-slate-300">
              Smart Customer Support Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 font-medium">

    <Link
        to="/"
        className="hover:text-blue-400 transition"
    >
        Dashboard
    </Link>

    <Link
        to="/analytics"
        className="hover:text-blue-400 transition"
    >
        Analytics
    </Link>
    <Link
    to="/knowledge"
    className="hover:text-blue-400 transition"
>
    Knowledge Base
</Link>

</div>

        {/* Sync Button */}
        <button
        onClick={onSync}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"

        >
          <RefreshCw size={18} />
          Sync Gmail
        </button>

       

      </div>
    </nav>
  );
}

export default Navbar;