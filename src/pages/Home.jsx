import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="kinetic-grid min-h-screen selection:bg-primary selection:text-on-primary font-body overflow-x-hidden pt-4 pb-12 bg-surface">
      <main className="relative z-10 w-full animate-in fade-in duration-1000">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-10 py-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left mb-16 md:mb-0">
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Est. MMXXIV</span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-on-surface">
              The Intellectual <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-secondary">Arena</span>{" "}
              of the <br /> Modern Age.
            </h1>
            <p className="text-on-surface-variant text-xl max-w-lg mb-10 leading-relaxed font-light">
              Where ancient wisdom meets kinetic intelligence. Test your limits in the ultimate forum of human knowledge.
            </p>
            <div className="flex space-x-6">
              <Link
                to={user ? "/dashboard" : "/auth"}
                className="bg-linear-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-full font-bold text-sm tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_10px_40px_rgba(196,154,255,0.4)] block text-center"
              >
                Begin Your Odyssey
              </Link>
              <Link
                to="/quizzes"
                className="px-10 py-4 rounded-full font-bold text-sm tracking-[0.15em] uppercase border border-outline-variant/40 bg-white/5 hover:bg-white/10 transition-all text-on-surface block text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative flex justify-center items-center">
            {/* Background Column Outlines */}
            <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
              <div className="w-px h-full bg-linear-to-b from-primary to-transparent"></div>
              <div className="w-px h-full bg-linear-to-b from-secondary to-transparent"></div>
              <div className="w-px h-full bg-linear-to-b from-tertiary to-transparent"></div>
            </div>
            {/* Hero Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-secondary/20 blur-3xl opacity-50"></div>
              <img
                alt="Roman Statue Hero"
                className="w-full max-w-md relative rounded-2xl grayscale contrast-125 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbQ5CSMTN2JE2S-hMOh2g88V751jX0XPzIGetQm8dnsRp2us11ZP_qeCPDSoZ0ZnCs8XulJplbieXBAErUPmvwnzEykOBUqA84q6Djnaxt2nqB-IuPRvBTqZeOShZG-9qAEDHZliyZlrqpbFo_sKw8jjSoY86in4MyZmW63pukueawM8EEMfyLM6ECtrv6ZORikqYiPA5C8jSpsKWs_tCbh4Q23GykArGEjXyVbmSRiHSjv3c3b9Fn9G8p327iXTlJfnU0S13pqxc"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 border-t border-outline-variant/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-xl mb-6 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">The Ziuq Advantage</h2>
              <p className="text-on-surface-variant text-lg">Harness the power of the ziuq with our state-of-the-art  framework.</p>
            </div>
            <div className="text-secondary font-black text-6xl opacity-10 hidden md:block">01 — 03</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:bg-surface-bright transition-colors duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Adaptive sets</h3>
              <p className="text-on-surface-variant leading-relaxed">Our engine evolves with your intellect, tailoring challenges to your specific cognitive resonance.</p>
            </div>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:bg-surface-bright transition-colors duration-500 group mt-12 md:mt-0">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-3xl">monitoring</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Deep Insights</h3>
              <p className="text-on-surface-variant leading-relaxed">Go beyond the score. Understand the synaptic pathways of your decision-making process.</p>
            </div>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:bg-surface-bright transition-colors duration-500 group mt-12 md:mt-0">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-3xl">language</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Rankings</h3>
              <p className="text-on-surface-variant leading-relaxed">Compete in the Digital Coliseum. Measure your standing against the greatest minds across the globe.</p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-24">
            <div className="md:w-1/2 relative order-2 md:order-1 flex justify-center">
              <div className="absolute -left-10 md:-left-20 top-0 text-7xl md:text-9xl font-black text-outline/5 select-none leading-none">VIRTUS<br />SAPIENTIA</div>
              <img
                alt="Classical Bust"
                className="w-full max-w-sm rounded-3xl shadow-2xl relative z-10 border border-white/5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxHteNUWZQ86DuZ4KW1XTiIeqaOK2djlmbalEPf99QRXcedMx1SCy75ZK_oozKNj1b3j8rwTVLDBorreTw2xesiGeSAfvooxMrwZ0gKpQd_0m5B9fPUpgeCFoPyWNRCMpkwfVliCnOm2MeO5dXoAMRRR9AUEwMuznYBrA9puYiqimJPiIZ2g_YHNumvTI3uaOO5RTh05y4HVqleTFWwtRxHsp9rhJRzDK6QdAsAPNYR9qnOm4M5KnmI6jwyVfjgzQ60uRHm8q4u6o"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2 text-center md:text-left">
              <h2 className="text-5xl font-bold mb-8">Our Philosophy</h2>
              <div className="space-y-6 text-on-surface-variant text-xl leading-relaxed italic">
                <p>"The pursuit of knowledge is not a destination, but a state of being. Like the Stoics of old, we believe in the rigorous refinement of the mind as the highest form of virtue."</p>
                <p className="not-italic text-sm uppercase tracking-widest text-primary font-bold">— Marcus Aurelius Modernus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Enter the Arena</h2>
            <p className="text-on-surface-variant">Select your domain of mastery</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group cursor-pointer relative overflow-hidden rounded-4xl h-125">
              <img
                alt="Philosophy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdsHgBJGbkLNkHP0_0PU7BBW7uIesVpwGsTYtuziv45-oE02BLaaSM5w1roOPFdT5Ryr4p9g37JH6st6EFJoxqrZKSuOW1JIIDZWkzzj55V1zflH4A2um_IA4AMrjObP6uogJfgC_ZinyUNXT_iZNV4USycZ4yjzp9rERUQFlScqzMtPBX5si7D4P8JKJS8TaksIBbmMSR2d7J26iO-8qsxNTIBiHIjqwrpJf25ZetHjfObCZkQItECDrl3NmEbrCCLSrmp5u3oJc"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h4 className="text-3xl font-bold mb-2">Philosophy</h4>
                <p className="text-on-surface-variant mb-6">Metaphysics, Ethics, and Logic.</p>
                <Link to="/quizzes" className="text-secondary flex items-center gap-2 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                  Enter Category <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="group cursor-pointer relative overflow-hidden rounded-4xl h-125">
              <img
                alt="Economics"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-biN9CiIuJH8Se4c3hsEtS980qQGk3WincIA3vaaqJ8548iKH5UGX07jG96Xy6iI6rVeOAOyAjhbULA1EUQ1u8EMGPYdz_4ycA0FBhg2C6c3uRJZCj1bjM5zqLCViJL4XHv0NXIBO23dPwpKuueKlk0YFXAHoTYPCwlfcZQnii5Ate5AkyQ-qYKn0PllhbjKhXtkmsDteG5ULS5ApC0Bh1UPfZVR7AxZjC5x12_hg9Brd0OBFPTxQO3802BXw4CPuBhFJ42Qj5Ng"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h4 className="text-3xl font-bold mb-2">Economics</h4>
                <p className="text-on-surface-variant mb-6">Game Theory and Global Markets.</p>
                <Link to="/quizzes" className="text-primary flex items-center gap-2 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                  Enter Category <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="group cursor-pointer relative overflow-hidden rounded-4xl h-125">
              <img
                alt="Science"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbR4WxTRdcteXvyKHnxNhyq13CPmmNdRVFX5-KN2coNHAvvqtb4RAaIJjUkmeCbeo45m0_J2ua6cC3q29HcszIsRQdT-t0oWZOYCBf__HLGHAcTuark0PdxrWl_b_2suM_kJw89lrVSpX-QeMI6FZU34CLLEidbDlmw7ciy3UVrfXR83JQYX5CVrcSqp02qj3zYud0CP_DdM5iK2oGI7Cx4QMUQIQpqkjpkQZkjLpxlrqcomzTRjV5fwdZD3Akmh5C295_B96qOf4"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h4 className="text-3xl font-bold mb-2">Science</h4>
                <p className="text-on-surface-variant mb-6">Quantum Realms and Astrophysics.</p>
                <Link to="/quizzes" className="text-tertiary flex items-center gap-2 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                  Enter Category <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
