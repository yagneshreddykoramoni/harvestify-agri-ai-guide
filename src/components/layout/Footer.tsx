
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">Harvestify</h3>
            <p className="text-sm">AI-Powered Agricultural Assistant</p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Harvestify. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
