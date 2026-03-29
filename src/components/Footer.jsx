import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 px-8 mt-auto z-20 relative">
        <div className="bg-linear-to-r from-transparent via-outline-variant/20 to-transparent h-px w-full mb-8"></div>
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-lg font-bold text-[#dee5ff]">Ziuq</div>
            <div className="flex space-x-8 font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase">
                <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">Privacy Policy</a>
                <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">Terms of Service</a>
                <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">Support</a>
                <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">Contact</a>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase text-on-surface-variant opacity-50">
                ©  Ziuq . All rights reserved.
            </p>
        </div>
    </footer>
  );
};

export default Footer;
