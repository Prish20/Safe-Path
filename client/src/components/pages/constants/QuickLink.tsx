import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

type TShortcut = {
  image: string | LucideIcon;
  title: string;
  description: string;
  route: string;
};

const QuickLink: React.FC<TShortcut> = ({ image, title, description, route }) => {
  return (
    <Link to={route} className="block">
      <article
        className={`rounded-lg bg-green-500/10 hover:bg-emerald-500/50
          p-6 h-full
          text-center text-white 
          hover:scale-105 transition-all ease-in-out duration-300
          shadow-lg hover:shadow-emerald-500/50`}
      >
        <div className="mx-auto w-16 sm:w-20 mb-4 transition-all duration-300 ease-in-out hover:scale-110">
          {typeof image === 'string' ? (
            <img src={image} alt={title} className="w-full h-full object-contain" />
          ) : (
            React.createElement(image, { size: 32, className: "text-green-500" })
          )}
        </div>
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </article>
    </Link>
  );
};

export default QuickLink;
