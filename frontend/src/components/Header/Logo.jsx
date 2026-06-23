import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        alt="Logo"
        className="h-10 w-10"
      />

      <div>
        <h2 className="text-lg font-bold text-white">
          E-Learn
        </h2>

        <p className="text-xs text-gray-400">
          Learn • Build • Grow
        </p>
      </div>
    </Link>
  );
};

export default Logo;
