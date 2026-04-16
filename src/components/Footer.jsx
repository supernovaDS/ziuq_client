import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black w-full pb-10 pt-6 px-8 mt-auto z-20 relative">
        <div className="bg-gradient-to-r from-transparent via-white/10 to-transparent h-px w-full mb-8"></div>
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-lg font-bold text-white font-headline italic">Ziuq</div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 font-body text-xs tracking-widest uppercase">
                <a className="text-[#888] hover:text-white text-center md:text-left transition-colors" href="#">Privacy Policy</a>
                <a className="text-[#888] hover:text-white text-center md:text-left transition-colors" href="#">Terms of Service</a>
                <a className="text-[#888] hover:text-white text-center md:text-left transition-colors" href="#">Support</a>
                <a className="text-[#888] hover:text-white text-center md:text-left transition-colors" href="#">Contact</a>
            </div>
            <p className="font-body text-xs tracking-widest uppercase text-[#555]">
                © Ziuq. All rights reserved.
            </p>
        </div>
    </footer>
  );
};

export default Footer;
