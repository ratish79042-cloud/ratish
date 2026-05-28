import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const Portfolio = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('home');

  // Firebase loaded flags - ஒவ்வொரு collection-க்கும் தனியா track பண்றோம்
  const [loadedFlags, setLoadedFlags] = useState({
    profile: false,
    projects: false,
    certs: false,
    frontend: false,
    tools: false,
    others: false,
  });

  const [profile, setProfile] = useState({
    name: 'Ratish G T',
    role: 'Frontend Developer',
    stat1: '3+', stat2: 'Good', stat3: '20+', stat4: 'Good',
    photoFile: '', resumeFile: ''
  });
  const [dbProjects, setDbProjects] = useState([]);
  const [dbCerts, setDbCerts] = useState([]);
  const [dbSkillsFrontend, setDbSkillsFrontend] = useState([]);
  const [dbSkillsTools, setDbSkillsTools] = useState([]);
  const [dbSkillsOthers, setDbSkillsOthers] = useState([]);

  // Static fallback data
  const localProjects = [
    { id: 'p1', title: 'Taskify - Task Manager', desc: 'A modern task management application to organize your daily tasks and boost productivity.', tags: ['React', 'Tailwind CSS', 'Firebase'], category: 'React', githubUrl: 'https://github.com/ratish79042-cloud', demoUrl: '#', image: '' },
    { id: 'p2', title: 'Melody - Music Player', desc: 'A beautiful music player with playlist, dark mode and smooth animations.', tags: ['React', 'Redux', 'Tailwind CSS'], category: 'React', githubUrl: 'https://github.com/ratish79042-cloud', demoUrl: '#', image: '' },
    { id: 'p3', title: 'Shopper - E-Commerce', desc: 'A full-featured e-commerce website with cart, checkout and payment integration.', tags: ['React', 'Tailwind CSS', 'Stripe'], category: 'Web Apps', githubUrl: 'https://github.com/ratish79042-cloud', demoUrl: '#', image: '' },
  ];
  const localCerts = [
    { id: 'c1', title: 'React Developer Certificate', issuer: 'Meta', date: 'Issued: May 2024', certImage: '', skillTag: 'Frontend Architecture' },
    { id: 'c2', title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', date: 'Issued: Feb 2024', certImage: '', skillTag: 'Data Structures & Logic' },
    { id: 'c3', title: 'Responsive Web Design Certificate', issuer: 'freeCodeCamp', date: 'Issued: Dec 2023', certImage: '', skillTag: 'CSS & UI' },
    { id: 'c4', title: 'UI/UX Design Specialization', issuer: 'Coursera', date: 'Issued: Oct 2023', certImage: '', skillTag: 'Figma & UX' },
  ];
  const localSkillsFrontend = [
    { id: 's1', name: 'React', icon: '⚛️' },
    { id: 's2', name: 'Tailwind CSS', icon: '🌊' },
    { id: 's3', name: 'JavaScript', icon: '🟨' },
    { id: 's4', name: 'HTML', icon: '🧱' },
    { id: 's5', name: 'CSS', icon: '🎨' },
  ];
  const localSkillsTools = [
    { id: 't1', name: 'Git', icon: '🔴' },
    { id: 't2', name: 'GitHub', icon: '⚫' },
    { id: 't3', name: 'VS Code', icon: '🔵' },
    { id: 't4', name: 'Figma', icon: '🎯' },
    { id: 't5', name: 'Excel', icon: '🟩' },
    { id: 't6', name: 'Word', icon: '🔷' },
  ];
  const localOtherSkills = [
    { id: 'o1', name: 'Problem Solving', icon: '💬' },
    { id: 'o2', name: 'Analytical Thinking', icon: '💡' },
    { id: 'o3', name: 'Attention to Detail', icon: '🎯' },
    { id: 'o4', name: 'Good Communication', icon: '🤝' },
    { id: 'o5', name: 'Time Management', icon: '🕐' },
    { id: 'o6', name: 'Quick Learner', icon: '🚀' },
  ];

  const markLoaded = (key) =>
    setLoadedFlags(prev => ({ ...prev, [key]: true }));

  useEffect(() => {
    // Profile
    const unsubProfile = onSnapshot(
      doc(db, 'meta', 'profile'),
      (snap) => {
        if (snap.exists()) setProfile(prev => ({ ...prev, ...snap.data() }));
        markLoaded('profile');
      },
      () => markLoaded('profile')
    );

    // Projects
    const unsubProjects = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        setDbProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded('projects');
      },
      () => markLoaded('projects')
    );

    // Certificates
    const unsubCerts = onSnapshot(
      collection(db, 'certificates'),
      (snap) => {
        setDbCerts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded('certs');
      },
      () => markLoaded('certs')
    );

    // Frontend skills
    const unsubFE = onSnapshot(
      collection(db, 'skills_frontend'),
      (snap) => {
        setDbSkillsFrontend(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded('frontend');
      },
      () => markLoaded('frontend')
    );

    // Tools
    const unsubTools = onSnapshot(
      collection(db, 'skills_tools'),
      (snap) => {
        setDbSkillsTools(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded('tools');
      },
      () => markLoaded('tools')
    );

    // Others
    const unsubOthers = onSnapshot(
      collection(db, 'skills_others'),
      (snap) => {
        setDbSkillsOthers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded('others');
      },
      () => markLoaded('others')
    );

    return () => {
      unsubProfile(); unsubProjects(); unsubCerts();
      unsubFE(); unsubTools(); unsubOthers();
    };
  }, []);

  // KEY FIX: loaded flag true ஆனப்பறமே decide பண்றோம்
  // Firebase empty => localFallback, Firebase data இருந்தா => அதை காட்டு
  // loaded false-ஆ இருக்கும்போது => localFallback (flicker தவிர்க்க)
  const displayedProjects = loadedFlags.projects
    ? (dbProjects.length > 0 ? dbProjects : localProjects)
    : localProjects;

  const displayedCerts = loadedFlags.certs
    ? (dbCerts.length > 0 ? dbCerts : localCerts)
    : localCerts;

  const displayedFrontend = loadedFlags.frontend
    ? (dbSkillsFrontend.length > 0 ? dbSkillsFrontend : localSkillsFrontend)
    : localSkillsFrontend;

  const displayedTools = loadedFlags.tools
    ? (dbSkillsTools.length > 0 ? dbSkillsTools : localSkillsTools)
    : localSkillsTools;

  const displayedOthers = loadedFlags.others
    ? (dbSkillsOthers.length > 0 ? dbSkillsOthers : localOtherSkills)
    : localOtherSkills;

  const filteredProjects = activeCategory === 'All'
    ? displayedProjects
    : displayedProjects.filter(p => p.category === activeCategory);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'];
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveNav(id.toLowerCase());
  };

  return (
    <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/80 backdrop-blur-xl border-b border-purple-900/20 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
          Portfolio
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`transition-colors ${activeNav === link.toLowerCase() ? 'text-purple-400 border-b-2 border-purple-400 pb-0.5' : 'text-gray-400 hover:text-white'}`}
            >
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate && onNavigate('#/admin')} className="text-gray-400 hover:text-white text-lg transition-colors">🌙</button>
          <button onClick={() => scrollTo('Contact')} className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all flex items-center gap-2">
            Let's Talk <span>✈️</span>
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section id="home" className="min-h-screen flex items-center pt-20 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-700/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a0e3a] border border-purple-800/40 rounded-full text-sm text-gray-300">
              👋 Hello, I'm
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              {profile.name}
            </h1>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-purple-400">{profile.role}</h2>
              <span className="w-0.5 h-8 bg-purple-400 animate-pulse ml-1" />
            </div>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
              I build modern, responsive and user-friendly websites using React and TailwindCSS. I love turning ideas into beautiful digital experiences.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button onClick={() => scrollTo('Projects')} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30">
                View My Work →
              </button>
              <a
                href={profile.resumeFile || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30"
              >
                Resume ⬇️
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { icon: '🚀', value: profile.stat1 || '3+', label: 'Projects Completed' },
                { icon: '💬', value: profile.stat2 || 'Good', label: 'Communication' },
                { icon: '🏆', value: profile.stat3 || '20+', label: 'Certifications' },
                { icon: '😊', value: profile.stat4 || 'Good', label: 'Skills' },
              ].map((s, i) => (
                <div key={i} className="bg-[#0d0625]/80 border border-purple-900/40 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{s.value}</p>
                    <p className="text-gray-500 text-[11px]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center group">
            <div className="absolute w-[440px] h-[440px] lg:w-[540px] lg:h-[540px] rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-purple-700/25 blur-3xl" />
            <div className="relative z-10 w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] rounded-full border-2 border-purple-500/40 overflow-hidden shadow-2xl shadow-purple-700/50 group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
              style={{ background: 'radial-gradient(circle at center, #3b0764 0%, #0d0625 70%)' }}>
              <img
                src={profile.photoFile || '/ratish3.png'}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ME & EDUCATION ── */}
      <section id="about" className="py-24 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-3">• ABOUT ME •</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white">A Passionate <span className="text-purple-400">Developer</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div id="education">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-950/50 border border-purple-800/40 rounded-full text-xs text-purple-300 font-bold uppercase tracking-wider mb-2">
                  🎓 Education
                </div>
                <h3 className="text-3xl font-black text-white mb-6">My <span className="text-purple-400">Education</span></h3>
              </div>
              <div className="space-y-5 text-gray-400 text-base leading-relaxed">
                <p>Hi! I'm <span className="text-white font-semibold">Ratish G T</span>, a passionate Frontend Developer based in Salem, Tamil Nadu. I specialize in building modern, responsive, and user-friendly web applications.</p>
                <p>I love working with <span className="text-purple-400 font-medium">React</span>, <span className="text-purple-400 font-medium">Tailwind CSS</span>, and <span className="text-purple-400 font-medium">Firebase</span> to create beautiful digital experiences that are both functional and visually stunning.</p>
                <p>Currently pursuing my Bachelor of Computer Science and Engineering at Gnanamani College of Technology, I'm always eager to learn new technologies and take on challenging projects.</p>
                <div className="flex gap-4 pt-2">
                  <a href="https://github.com/ratish79042-cloud" target="_blank" rel="noreferrer" className="border border-purple-700/50 hover:border-purple-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">GitHub 🐙</a>
                  <a href="https://www.linkedin.com/in/ratish-g-t-815068380/" target="_blank" rel="noreferrer" className="border border-purple-700/50 hover:border-purple-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">LinkedIn 💼</a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-purple-900/60 space-y-6">
                {[
                  { year: '2024 - 2028', title: 'Bachelor of Computer Science and Engineering', school: 'Gnanamani College of Technology', grade: 'CGPA: 8.0 / 10', status: 'Pursuing', icon: '🎓' },
                  { year: '2023 - 2024', title: 'Higher Secondary Education (HSC)', school: 'Gugai Higher Secondary School', grade: 'Percentage: 70%', status: 'Completed', icon: '🏫' },
                  { year: '2019 - 2020', title: 'Secondary School Leaving Certificate (SSLC)', school: 'Gugai Higher Secondary School', grade: 'Percentage: 79%', status: 'Completed', icon: '📖' },
                ].map((edu, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[2.85rem] top-4 w-4 h-4 bg-[#030014] border-4 border-purple-700 rounded-full group-hover:border-purple-400 transition-all" />
                    <div className="bg-[#0d0625]/60 border border-purple-900/40 p-5 rounded-2xl hover:border-purple-600/40 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-purple-950/60 border border-purple-700/30 rounded-xl flex items-center justify-center text-lg shrink-0">{edu.icon}</div>
                          <div>
                            <span className="text-[11px] font-bold text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded-lg">{edu.year}</span>
                            <h4 className="text-white font-bold text-sm mt-1.5">{edu.title}</h4>
                            <p className="text-gray-500 text-xs mt-0.5">{edu.school}</p>
                            <p className="text-purple-400 text-xs font-semibold mt-1.5">{edu.grade}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${edu.status === 'Pursuing' ? 'bg-blue-950/50 text-blue-400 border border-blue-700/30' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-700/30'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />{edu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0d0625]/40 border border-purple-900/30 p-5 rounded-2xl mt-12 flex items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-purple-400 text-4xl font-serif h-8 shrink-0 leading-none">"</span>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Education is what remains after one has forgotten what one has learned in school.
                <span className="text-purple-400 font-semibold ml-3 shrink-0 whitespace-nowrap">– Albert Einstein</span>
              </p>
            </div>
            <span className="text-3xl md:text-4xl shrink-0">🎓</span>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" className="py-24 px-6 lg:px-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              Skills & <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Technology</span>
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">My technical toolkit and professional core proficiencies engineered to deliver beautiful visual experiences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Frontend Core Card */}
            <div className="bg-gradient-to-b from-[#0e072b] to-[#050212] border border-purple-500/20 rounded-3xl p-6 shadow-2xl hover:border-purple-500/50 shadow-purple-950/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">💻</div>
                <h3 className="text-white font-extrabold text-xl tracking-wide">Frontend Core</h3>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Frameworks & Style</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {displayedFrontend.map((s) => (
                  <div key={s.id} className="bg-[#120933]/40 border border-purple-900/40 hover:border-purple-500/30 rounded-xl p-3.5 flex items-center justify-between group/item transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center shrink-0 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                        {s.icon && (s.icon.startsWith('http') || s.icon.startsWith('/'))
                          ? <img src={s.icon} alt="" className="w-full h-full object-contain" />
                          : <span className="text-2xl">{s.icon || '⚡'}</span>
                        }
                      </div>
                      <span className="text-gray-200 text-sm font-semibold group-hover/item:text-white transition-colors">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-purple-400/80 uppercase">Advanced</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Tools Card */}
            <div className="bg-gradient-to-b from-[#0e072b] to-[#050212] border border-purple-500/20 rounded-3xl p-6 shadow-2xl hover:border-purple-500/50 shadow-purple-950/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">🔧</div>
                <h3 className="text-white font-extrabold text-xl tracking-wide">Development Tools</h3>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Software & Cloud</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {displayedTools.map((t) => (
                  <div key={t.id} className="bg-[#120933]/40 border border-purple-900/40 hover:border-purple-500/30 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-[#160c40]/60 transition-all duration-300 group/tool">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover/tool:scale-110 transition-transform">
                      {t.icon && (t.icon.startsWith('http') || t.icon.startsWith('/'))
                        ? <img src={t.icon} alt="" className="w-full h-full object-contain filter drop-shadow-md" />
                        : <span className="text-2xl filter drop-shadow-md">{t.icon || '🔧'}</span>
                      }
                    </div>
                    <span className="text-gray-300 text-xs font-semibold text-center group-hover/tool:text-white">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Skills Card */}
            <div className="bg-gradient-to-b from-[#0e072b] to-[#050212] border border-purple-500/20 rounded-3xl p-6 shadow-2xl hover:border-purple-500/50 shadow-purple-950/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">👤</div>
                <h3 className="text-white font-extrabold text-xl tracking-wide">Professional Skills</h3>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Soft Skills & Focus</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {displayedOthers.map((s) => (
                  <div key={s.id} className="bg-[#120933]/30 border border-purple-900/30 hover:border-purple-500/30 rounded-xl p-3 flex items-center gap-3.5 hover:bg-[#120933]/70 transition-all">
                    <div className="w-8 h-8 bg-purple-950/40 rounded-lg flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                      {s.icon && (s.icon.startsWith('http') || s.icon.startsWith('/'))
                        ? <img src={s.icon} alt="" className="w-full h-full object-contain" />
                        : <span className="text-lg">{s.icon || '⚡'}</span>
                      }
                    </div>
                    <span className="text-gray-300 text-xs font-medium tracking-wide">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <section id="projects" className="py-24 px-6 lg:px-16 relative">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-400 text-xs font-extrabold tracking-widest uppercase">Showcase</span>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white">Featured <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Creations</span></h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-14">
            {['All', 'Web Apps', 'React', 'UI/UX', 'Personal'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 uppercase tracking-wider backdrop-blur-md ${activeCategory === cat ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105' : 'bg-[#0d0625]/60 border-purple-900/40 text-gray-400 hover:border-purple-600/60 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(p => (
              <div key={p.id} className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300 group shadow-xl hover:shadow-[0_15px_30px_rgba(147,51,234,0.15)] flex flex-col justify-between">
                <div>
                  <div className="w-full h-48 bg-[#0a041f] flex items-center justify-center relative overflow-hidden border-b border-purple-900/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0625] via-transparent to-transparent z-10 opacity-70" />
                    {p.image || p.projectImage ? (
                      <img src={p.image || p.projectImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="text-7xl opacity-25 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">📂</div>
                    )}
                    <span className="absolute bottom-3 left-4 z-20 text-[10px] bg-purple-900/80 backdrop-blur border border-purple-500/30 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider text-purple-200">{p.category}</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-white font-extrabold text-lg group-hover:text-purple-400 transition-colors tracking-wide">{p.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',')).map((t, i) => (
                        <span key={i} className="text-[10px] bg-purple-950/40 border border-purple-500/20 text-purple-300 px-3 py-1 rounded-md font-medium">{t.trim ? t.trim() : t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
                    <a href={p.demoUrl || '#'} className="text-gray-300 hover:text-purple-400 text-xs font-bold flex items-center gap-1.5 transition-colors group/link">
                      Live Link <span className="text-purple-500 group-hover/link:translate-x-1 transition-transform">🔗</span>
                    </a>
                    <a href={p.githubUrl || '#'} className="bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 hover:text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
                      Source 🐙
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a href="https://github.com/ratish79042-cloud" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/30 hover:border-purple-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              Explore Repository →
            </a>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES SECTION ── */}
      <section id="certificates" className="py-24 px-6 lg:px-16 relative">
        <div className="absolute bottom-12 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-400 text-xs font-extrabold tracking-widest uppercase">Verified</span>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Credentials & <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Badges</span></h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedCerts.map(c => (
              <div key={c.id} className="bg-gradient-to-r from-[#0d0625] to-[#050214] border border-purple-500/10 rounded-2xl p-5 flex items-center gap-5 hover:border-purple-500/40 transition-all duration-300 group shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/[0.02] rounded-bl-full pointer-events-none" />
                <div className="w-20 h-20 shrink-0 bg-[#070317] border border-purple-500/20 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
                  {c.certImage || c.image ? (
                    <img src={c.certImage || c.image} alt={c.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">📜</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="text-[9px] font-extrabold tracking-wider bg-purple-950/50 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                    {c.skillTag || 'Verified Course'}
                  </span>
                  <h4 className="text-white font-bold text-sm lg:text-base leading-snug group-hover:text-purple-300 transition-colors truncate">{c.title}</h4>
                  <div className="flex items-center gap-2 text-xs">
                    <p className="text-purple-400 font-semibold">{c.issuer}</p>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <p className="text-gray-500 font-medium">{c.date}</p>
                  </div>
                </div>
                <button
  onClick={() => {
    const fileToOpen = c.certFile || c.certImage || c.certUrl || null;
    if (fileToOpen) {
      const win = window.open();
      if (win) {
        if (fileToOpen.startsWith('data:')) {
          win.document.write(
            `<iframe src="${fileToOpen}" style="width:100%;height:100vh;border:none;"></iframe>`
          );
        } else {
          win.location.href = fileToOpen;
        }
      }
    }
  }}
  className="shrink-0 bg-[#120933]/60 border border-purple-500/20 hover:border-purple-500 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]"
>
  Verify 🔗
</button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-transparent border border-purple-700/50 hover:border-purple-500 text-gray-300 hover:text-white font-bold px-6 py-3 rounded-xl transition-all text-xs tracking-wider uppercase">
              View Achievement Gallery →
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-28 px-6 lg:px-16 relative border-t border-purple-950/30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#170c3a]/80 border border-purple-500/30 rounded-full text-[11px] text-purple-300 font-extrabold uppercase tracking-widest mb-4 shadow-sm">
              ✨ Let's Connect
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
              Let's craft something <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">legendary</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest pl-2 mb-2">Direct Contact</h3>
              <div className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-purple-500/30 transition-all duration-300 group shadow-md">
                <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-purple-400 group-hover:scale-110 group-hover:bg-purple-900/50 transition-all duration-300">📧</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Drop an Email</p>
                  <a href="mailto:ratish79042@gmail.com" className="text-white font-bold text-sm sm:text-base hover:text-purple-400 transition-colors block truncate mt-0.5">ratish79042@gmail.com</a>
                </div>
              </div>
              <div className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-purple-500/30 transition-all duration-300 group shadow-md">
                <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-purple-400 group-hover:scale-110 group-hover:bg-purple-900/50 transition-all duration-300">📞</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Call Directly</p>
                  <a href="tel:+917904209323" className="text-white font-bold text-sm sm:text-base hover:text-purple-400 transition-colors block mt-0.5">+91 79042 09323</a>
                </div>
              </div>
              <div className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-purple-500/30 transition-all duration-300 group shadow-md">
                <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-purple-400 group-hover:scale-110 transition-all duration-300">📍</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Current Location</p>
                  <p className="text-white font-bold text-sm sm:text-base mt-0.5">Salem, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest pl-2 mb-2">Digital Profiles</h3>
              <a href="https://github.com/ratish79042-cloud" target="_blank" rel="noreferrer"
                className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-purple-500/30 transition-all duration-300 group shadow-md block">
                <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-purple-400 group-hover:scale-110 group-hover:bg-purple-900/50 transition-all duration-300">🐙</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Open Source Ecosystem</p>
                  <p className="text-white font-bold text-sm sm:text-base group-hover:text-purple-400 transition-colors mt-0.5">GitHub <span className="text-gray-500 text-xs font-normal ml-2">@ratish79042-cloud</span></p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/ratish-g-t-815068380/" target="_blank" rel="noreferrer"
                className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-blue-500/30 transition-all duration-300 group shadow-md block">
                <div className="w-12 h-12 bg-blue-950/40 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-blue-400 group-hover:scale-110 transition-all duration-300">💼</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Professional Network</p>
                  <p className="text-white font-bold text-sm sm:text-base group-hover:text-blue-400 transition-colors mt-0.5">LinkedIn <span className="text-gray-500 text-xs font-normal ml-2">Ratish G T</span></p>
                </div>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"
                className="bg-gradient-to-b from-[#0d0625] to-[#040114] border border-purple-500/10 rounded-2xl p-6 flex items-center gap-5 hover:border-pink-500/30 transition-all duration-300 group shadow-md block">
                <div className="w-12 h-12 bg-pink-950/30 border border-pink-500/20 rounded-xl flex items-center justify-center text-xl shrink-0 text-pink-400 group-hover:scale-110 transition-all duration-300">📸</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Creative Timeline</p>
                  <p className="text-white font-bold text-sm sm:text-base group-hover:text-pink-400 transition-colors mt-0.5">Instagram <span className="text-gray-500 text-xs font-normal ml-2">Connect</span></p>
                </div>
              </a>
            </div>
          </div>
        </div>    

        {/* Footer */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} Ratish G T. All rights reserved.</p>
          <p>Engineered with React & Tailwind CSS</p>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;