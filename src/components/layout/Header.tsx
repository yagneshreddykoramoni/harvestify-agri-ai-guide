
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <Leaf className="h-6 w-6" />
          <span className="font-bold text-xl">Harvestify</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-accent-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/crop" className="text-white hover:text-accent-foreground transition-colors">
                Crop
              </Link>
            </li>
            <li>
              <Link to="/fertilizer" className="text-white hover:text-accent-foreground transition-colors">
                Fertilizer
              </Link>
            </li>
            <li>
              <Link to="/disease" className="text-white hover:text-accent-foreground transition-colors">
                Disease
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
