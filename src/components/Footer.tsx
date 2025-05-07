import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} Adhan Timing - Tunisia</p>
      </div>
    </footer>
  );
};

export default Footer;