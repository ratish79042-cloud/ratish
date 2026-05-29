import React, { useState, useEffect, useRef } from 'react';
import { API_BASE } from './config';
import { Toaster, toast } from 'sonner';
// perumal test
// ── MASTER ICON DATABASE ──
const ICON_DB = [
  { name: 'React', url: 'https://cdn.simpleicons.org/react' },
  { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Vue', url: 'https://cdn.simpleicons.org/vuedotjs' },
  { name: 'Angular', url: 'https://cdn.simpleicons.org/angular' },
  { name: 'Svelte', url: 'https://cdn.simpleicons.org/svelte' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript' },
  { name: 'HTML', url: 'https://cdn.simpleicons.org/html5' },
  { name: 'CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Bootstrap', url: 'https://cdn.simpleicons.org/bootstrap' },
  { name: 'Sass', url: 'https://cdn.simpleicons.org/sass' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Express', url: 'https://cdn.simpleicons.org/express/white' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python' },
  { name: 'Java', url: 'https://cdn.simpleicons.org/openjdk' },
  { name: 'C++', url: 'https://cdn.simpleicons.org/cplusplus' },
  { name: 'C', url: 'https://cdn.simpleicons.org/c' },
  { name: 'PHP', url: 'https://cdn.simpleicons.org/php' },
  { name: 'Ruby', url: 'https://cdn.simpleicons.org/ruby' },
  { name: 'Go', url: 'https://cdn.simpleicons.org/go' },
  { name: 'Rust', url: 'https://cdn.simpleicons.org/rust/white' },
  { name: 'Firebase', url: 'https://cdn.simpleicons.org/firebase' },
  { name: 'MongoDB', url: 'https://cdn.simpleicons.org/mongodb' },
  { name: 'MySQL', url: 'https://cdn.simpleicons.org/mysql' },
  { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Redis', url: 'https://cdn.simpleicons.org/redis' },
  { name: 'Supabase', url: 'https://cdn.simpleicons.org/supabase' },
  { name: 'Git', url: 'https://cdn.simpleicons.org/git' },
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/white' },
  { name: 'GitLab', url: 'https://cdn.simpleicons.org/gitlab' },
  { name: 'VS Code', url: 'https://cdn.simpleicons.org/visualstudiocode' },
  { name: 'Figma', url: 'https://cdn.simpleicons.org/figma' },
  { name: 'Docker', url: 'https://cdn.simpleicons.org/docker' },
  { name: 'Kubernetes', url: 'https://cdn.simpleicons.org/kubernetes' },
  { name: 'AWS', url: 'https://cdn.simpleicons.org/amazonaws' },
  { name: 'Google Cloud', url: 'https://cdn.simpleicons.org/googlecloud' },
  { name: 'Azure', url: 'https://cdn.simpleicons.org/microsoftazure' },
  { name: 'Vercel', url: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Netlify', url: 'https://cdn.simpleicons.org/netlify' },
  { name: 'Linux', url: 'https://cdn.simpleicons.org/linux/white' },
  { name: 'Ubuntu', url: 'https://cdn.simpleicons.org/ubuntu' },
  { name: 'Postman', url: 'https://cdn.simpleicons.org/postman' },
  { name: 'Vite', url: 'https://cdn.simpleicons.org/vite' },
  { name: 'Webpack', url: 'https://cdn.simpleicons.org/webpack' },
  { name: 'Redux', url: 'https://cdn.simpleicons.org/redux' },
  { name: 'GraphQL', url: 'https://cdn.simpleicons.org/graphql' },
  { name: 'Prisma', url: 'https://cdn.simpleicons.org/prisma/white' },
  { name: 'Stripe', url: 'https://cdn.simpleicons.org/stripe' },
  { name: 'Excel', url: 'https://cdn.simpleicons.org/microsoftexcel' },
  { name: 'Word', url: 'https://cdn.simpleicons.org/microsoftword' },
  { name: 'PowerPoint', url: 'https://cdn.simpleicons.org/microsoftpowerpoint' },
  { name: 'Notion', url: 'https://cdn.simpleicons.org/notion/white' },
  { name: 'Slack', url: 'https://cdn.simpleicons.org/slack' },
  { name: 'Jira', url: 'https://cdn.simpleicons.org/jira' },
  { name: 'Trello', url: 'https://cdn.simpleicons.org/trello' },
  { name: 'Android', url: 'https://cdn.simpleicons.org/android' },
  { name: 'Flutter', url: 'https://cdn.simpleicons.org/flutter' },
  { name: 'React Native', url: 'https://cdn.simpleicons.org/react' },
  { name: 'Swift', url: 'https://cdn.simpleicons.org/swift' },
  { name: 'Kotlin', url: 'https://cdn.simpleicons.org/kotlin' },
  { name: 'Three.js', url: 'https://cdn.simpleicons.org/threedotjs/white' },
  { name: 'Framer Motion', url: 'https://cdn.simpleicons.org/framer' },
  { name: 'Storybook', url: 'https://cdn.simpleicons.org/storybook' },
  { name: 'Jest', url: 'https://cdn.simpleicons.org/jest' },
  { name: 'Cypress', url: 'https://cdn.simpleicons.org/cypress/white' },
  { name: 'NPM', url: 'https://cdn.simpleicons.org/npm' },
  { name: 'Yarn', url: 'https://cdn.simpleicons.org/yarn' },
  { name: 'Canva', url: 'https://cdn.simpleicons.org/canva' },
  { name: 'Adobe XD', url: 'https://cdn.simpleicons.org/adobexd' },
  { name: 'Photoshop', url: 'https://cdn.simpleicons.org/adobephotoshop' },
  { name: 'Illustrator', url: 'https://cdn.simpleicons.org/adobeillustrator' },
];

// perumal
// ── ICON AUTOCOMPLETE COMPONENT ──
const IconInput = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowDrop(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleType = (e) => {
    const val = e.target.value;
    onChange(val);
    if (val.trim().length > 0) {
      const filtered = ICON_DB.filter(i =>
        i.name.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowDrop(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowDrop(false);
    }
  };

  const handleSelect = (item) => {
    onChange(item.url);
    setSuggestions([]);
    setShowDrop(false);
  };

  const isUrl = value && (value.startsWith('http') || value.startsWith('/'));

  return (
    <div ref={wrapRef} className="relative flex-1">
      <div className="flex items-center gap-2 bg-[#030014] border border-purple-950 rounded-lg p-2">
        <div className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden">
          {isUrl
            ? <img src={value} alt="" className="w-full h-full object-contain" onError={e => e.target.style.display = 'none'} />
            : <span className="text-base leading-none">{value || '?'}</span>
          }
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleType}
          onFocus={() => { if (suggestions.length > 0) setShowDrop(true); }}
          className="flex-1 bg-transparent text-white text-xs outline-none min-w-0"
        />
      </div>
      {showDrop && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d0625] border border-purple-800/60 rounded-xl overflow-hidden z-50 shadow-2xl shadow-purple-950/50 max-h-52 overflow-y-auto">
          {suggestions.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-950/60 transition-colors text-left"
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0 bg-[#030014] rounded-md overflow-hidden border border-purple-900/40">
                <img src={item.url} alt="" className="w-full h-full object-contain" onError={e => e.target.style.display = 'none'} />
              </div>
              <span className="text-xs text-gray-200 font-medium">{item.name}</span>
              <span className="text-[10px] text-purple-500 ml-auto">click to use</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── FILE UPLOAD PREVIEW COMPONENT ──
// Supports: image/*, .pdf, and any file type
// Shows thumbnail for images, file icon for others
// Returns base64 via onChange
const FileUploadBox = ({
  label,
  accept = '*/*',
  preview,        // base64 or url string
  fileName,       // original file name for display
  onFileChange,   // (base64, fileName, mimeType) => void
  onClear,        // () => void
  urlValue,       // controlled url fallback value
  onUrlChange,    // (val) => void
  accentColor = 'indigo', // 'indigo' | 'purple'
}) => {
  const isImage = preview && (
    preview.startsWith('data:image') ||
    (!preview.startsWith('data:') && (preview.endsWith('.png') || preview.endsWith('.jpg') || preview.endsWith('.jpeg') || preview.endsWith('.webp') || preview.endsWith('.gif') || preview.endsWith('.svg')))
  );
  const isPdf = preview && (preview.startsWith('data:application/pdf') || preview.endsWith('.pdf'));

  const borderClass = accentColor === 'purple' ? 'border-purple-900/60 hover:border-purple-500' : 'border-indigo-900/60 hover:border-indigo-500';
  const iconBg = accentColor === 'purple' ? 'bg-purple-950/60 border-purple-700/40 group-hover:bg-purple-900/60' : 'bg-indigo-950/60 border-indigo-700/40 group-hover:bg-indigo-900/60';
  const textColor = accentColor === 'purple' ? 'text-purple-400' : 'text-indigo-400';

  return (
    <div className="space-y-2">
      <label className="block text-gray-400 text-xs mb-1">{label}</label>
      <div className="flex items-start gap-3">
        {/* File Explorer Button */}
        <label className="flex-1 cursor-pointer group">
          <div className={`bg-[#030014] border ${borderClass} rounded-xl p-3 flex items-center gap-3 transition-all`}>
            <div className={`w-8 h-8 ${iconBg} border rounded-lg flex items-center justify-center text-base shrink-0 transition-all`}>
              {preview ? (isPdf ? '📄' : isImage ? '🖼️' : '📁') : '📂'}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${textColor} font-bold text-[11px] uppercase tracking-wide`}>
                {preview ? '✅ File Selected' : 'Choose from File Explorer'}
              </p>
              <p className="text-gray-600 text-[10px] mt-0.5 truncate">
                {fileName || (preview ? 'Click to change file' : `All file types supported`)}
              </p>
            </div>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={onFileChange}
            className="hidden"
          />
        </label>

        {/* Preview thumbnail */}
        {preview && (
          <div className="relative shrink-0">
            {isImage ? (
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-xl border border-indigo-700/50 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-[#0d0625] border border-indigo-700/50 rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg">
                <span className="text-2xl">{isPdf ? '📄' : '📁'}</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase px-1 text-center truncate w-full text-center">
                  {fileName ? fileName.split('.').pop().toUpperCase() : 'FILE'}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={onClear}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 hover:bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* OR: URL fallback */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-px bg-purple-900/30" />
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">or paste URL</span>
        <div className="flex-1 h-px bg-purple-900/30" />
      </div>
      <input
        type="text"
        placeholder="https://..."
        value={preview ? '' : (urlValue || '')}
        onChange={e => { if (onUrlChange) onUrlChange(e.target.value); }}
        className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white text-xs mt-1"
      />
    </div>
  );
};

// ── MAIN COMPONENT ──
function LoginAndAdmin({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [profile, setProfile] = useState({
    name: 'Ratish G T',
    role: 'Frontend Developer',
    stat1: '3+', stat2: 'Good', stat3: '20+', stat4: 'Good',
    photoFile: '', resumeFile: ''
  });
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skillsFrontend, setSkillsFrontend] = useState([]);
  const [skillsTools, setSkillsTools] = useState([]);
  const [skillsOthers, setSkillsOthers] = useState([]);

  // ── Project form state ──
  const [newProj, setNewProj] = useState({
    title: '', desc: '', tags: '', category: 'React',
    githubUrl: '', demoUrl: '', projectImage: ''
  });
  const [projImagePreview, setProjImagePreview] = useState('');
  const [projImageFileName, setProjImageFileName] = useState('');

  // ── Certificate form state ──
  const [newCert, setNewCert] = useState({
    title: '', issuer: '', date: '', skillTag: '', certImage: '', certFile: ''
  });
  const [certFilePreview, setCertFilePreview] = useState('');
  const [certFileName, setCertFileName] = useState('');
  const [certFileMime, setCertFileMime] = useState('');

  const [newSkillFE, setNewSkillFE] = useState({ name: '', icon: '' });
  const [newSkillTool, setNewSkillTool] = useState({ name: '', icon: '' });
  const [newSkillOther, setNewSkillOther] = useState({ name: '', icon: '' });

  // --- Edit states ---
  const [editingProject, setEditingProject] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editingSkillFE, setEditingSkillFE] = useState(null);
  const [editingSkillTool, setEditingSkillTool] = useState(null);
  const [editingSkillOther, setEditingSkillOther] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    // API_BASE is imported from ./config

    // Fetch profile
    fetch(`${API_BASE}/profile`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setProfile(data))
      .catch(err => console.error("Error fetching profile:", err));

    // Fetch projects
    fetch(`${API_BASE}/projects`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));

    // Fetch certs
    fetch(`${API_BASE}/certificates`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setCertificates(data))
      .catch(err => console.error("Error fetching certificates:", err));

    // Fetch FE skills
    fetch(`${API_BASE}/skills/frontend`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setSkillsFrontend(data))
      .catch(err => console.error("Error fetching frontend skills:", err));

    // Fetch Tools skills
    fetch(`${API_BASE}/skills/tools`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setSkillsTools(data))
      .catch(err => console.error("Error fetching tools skills:", err));

    // Fetch Others skills
    fetch(`${API_BASE}/skills/others`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setSkillsOthers(data))
      .catch(err => console.error("Error fetching other skills:", err));
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (resp.ok) {
        const data = await resp.json();
        localStorage.setItem('admin_token', data.access_token);
        setIsLoggedIn(true);
        setLoginError('');
        toast.success('Authorized access granted! Secure terminal unlocked.');
      } else {
        setLoginError('Invalid Username or Password');
        toast.error('Access Crypt verification failed!');
      }
    } catch (err) {
      setLoginError('Could not connect to authentication server');
      toast.error('Terminal network connection failure!');
    }
  };

  const processFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // ── Profile photo / resume upload ──
  const handleProfileFileChange = async (e, fieldType) => {
    const targetFile = e.target.files[0];
    if (!targetFile) return;
    try {
      const base64Data = await processFileToBase64(targetFile);
      const updatedProfile = { ...profile, [fieldType]: base64Data };
      setProfile(updatedProfile);

      await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(updatedProfile)
      });
      toast.success(`${fieldType === 'photoFile' ? 'Profile Avatar Photo' : 'Resume PDF'} synced to Live PostgreSQL Database!`);
    } catch (err) {
      console.error('Profile file upload error:', err);
    }
  };

  // ── Certificate file upload (image OR pdf OR any) ──
  const handleCertFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64Data = await processFileToBase64(file);
      setCertFilePreview(base64Data);
      setCertFileName(file.name);
      setCertFileMime(file.type);
      // Store in certFile for non-image; certImage for image (for thumbnail display)
      if (file.type.startsWith('image/')) {
        setNewCert(prev => ({ ...prev, certImage: base64Data, certFile: base64Data, certFileName: file.name }));
      } else {
        // PDF or other — store in certFile, keep certImage empty (or use URL)
        setNewCert(prev => ({ ...prev, certFile: base64Data, certFileName: file.name, certMime: file.type }));
      }
    } catch (err) {
      console.error('Certificate file read error:', err);
    }
  };

  const clearCertFile = () => {
    setCertFilePreview('');
    setCertFileName('');
    setCertFileMime('');
    setNewCert(prev => ({ ...prev, certImage: '', certFile: '', certFileName: '', certMime: '' }));
  };

  // ── Project image upload (any file type) ──
  const handleProjImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64Data = await processFileToBase64(file);
      setProjImagePreview(base64Data);
      setProjImageFileName(file.name);
      setNewProj(prev => ({ ...prev, projectImage: base64Data }));
    } catch (err) {
      console.error('Project image read error:', err);
    }
  };

  const clearProjImage = () => {
    setProjImagePreview('');
    setProjImageFileName('');
    setNewProj(prev => ({ ...prev, projectImage: '' }));
  };

  // ── Save profile ──
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(profile)
      });
      if (resp.ok) {
        toast.success('Identity matrix updated inside PostgreSQL database successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  // ── Create/Update project ──
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const formattedTags = typeof newProj.tags === 'string'
        ? newProj.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        : [];
      const projectPayload = { ...newProj, tags: formattedTags };

      let resp;
      if (editingProject) {
        resp = await fetch(`${API_BASE}/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(projectPayload)
        });
      } else {
        resp = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(projectPayload)
        });
      }

      if (resp.ok) {
        toast.success(editingProject ? 'Project changes saved successfully!' : 'Application card node deployed successfully!');
        setNewProj({ title: '', desc: '', tags: '', category: 'React', githubUrl: '', demoUrl: '', projectImage: '' });
        setProjImagePreview('');
        setProjImageFileName('');
        setEditingProject(null);

        // Refresh local projects list!
        const getProjResp = await fetch(`${API_BASE}/projects`);
        if (getProjResp.ok) setProjects(await getProjResp.json());
      } else {
        toast.error('Failed to deploy project.');
      }
    } catch (error) {
      console.error('Project creation error:', error);
      toast.error('Failed to complete project action.');
    }
  };

  // ── Delete project — confirm required ──
  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project card from live production server? This cannot be undone.')) {
      try {
        const resp = await fetch(`${API_BASE}/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        if (resp.ok) {
          toast.success('Project card deleted successfully.');
          setProjects(prev => prev.filter(p => p.id !== id));
        } else {
          toast.error('Failed to delete project.');
        }
      } catch (error) {
        console.error('Project delete error:', error);
      }
    }
  };

  // ── Create/Update certificate ──
  const handleCreateCertificate = async (e) => {
    e.preventDefault();
    try {
      let resp;
      if (editingCertificate) {
        resp = await fetch(`${API_BASE}/certificates/${editingCertificate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(newCert)
        });
      } else {
        resp = await fetch(`${API_BASE}/certificates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(newCert)
        });
      }
      
      if (resp.ok) {
        toast.success(editingCertificate ? 'Certificate changes saved successfully!' : 'Verification badge published to client registry!');
        setNewCert({ title: '', issuer: '', date: '', skillTag: '', certImage: '', certFile: '', certFileName: '', certMime: '' });
        setCertFilePreview('');
        setCertFileName('');
        setCertFileMime('');
        setEditingCertificate(null);
        
        // Refresh local certificates list!
        const getCertResp = await fetch(`${API_BASE}/certificates`);
        if (getCertResp.ok) setCertificates(await getCertResp.json());
      } else {
        toast.error('Failed to deploy certificate.');
      }
    } catch (error) {
      console.error('Certificate creation error:', error);
      toast.error('Failed to complete certificate action.');
    }
  };

  // ── Delete certificate — confirm required ──
  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Permanently delete this certificate from the database? This cannot be undone.')) {
      try {
        const resp = await fetch(`${API_BASE}/certificates/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        if (resp.ok) {
          toast.success('Certificate deleted successfully.');
          setCertificates(prev => prev.filter(c => c.id !== id));
        } else {
          toast.error('Failed to delete certificate.');
        }
      } catch (error) {
        console.error('Certificate delete error:', error);
      }
    }
  };

  const handleCreateSkillFE = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ ...newSkillFE, category: 'frontend' })
      });
      if (resp.ok) {
        setNewSkillFE({ name: '', icon: '' });
        const getResp = await fetch('http://127.0.0.1:8000/api/skills/frontend');
        if (getResp.ok) setSkillsFrontend(await getResp.json());
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteSkillFE = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        const resp = await fetch(`${API_BASE}/skills/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        if (resp.ok) { setSkillsFrontend(prev => prev.filter(s => s.id !== id)); toast.success('Skill deleted.'); }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateSkillTool = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ ...newSkillTool, category: 'tools' })
      });
      if (resp.ok) {
        setNewSkillTool({ name: '', icon: '' });
        const getResp = await fetch('http://127.0.0.1:8000/api/skills/tools');
        if (getResp.ok) setSkillsTools(await getResp.json());
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteSkillTool = async (id) => {
    if (window.confirm('Delete this tool?')) {
      try {
        const resp = await fetch(`${API_BASE}/skills/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        if (resp.ok) { setSkillsTools(prev => prev.filter(t => t.id !== id)); toast.success('Tool deleted.'); }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateSkillOther = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ ...newSkillOther, category: 'others' })
      });
      if (resp.ok) {
        setNewSkillOther({ name: '', icon: '' });
        const getResp = await fetch('http://127.0.0.1:8000/api/skills/others');
        if (getResp.ok) setSkillsOthers(await getResp.json());
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteSkillOther = async (id) => {
    if (window.confirm('Delete this specialization?')) {
      try {
        const resp = await fetch(`${API_BASE}/skills/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        if (resp.ok) { setSkillsOthers(prev => prev.filter(s => s.id !== id)); toast.success('Skill deleted.'); }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ── LOGIN PAGE ──
  if (!isLoggedIn) {
    return (
      <div className="bg-[#030014] text-white min-h-screen flex items-center justify-center p-6">
        <Toaster position="top-right" richColors theme="dark" />
        <div className="bg-[#0d0625]/90 border border-purple-500/30 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500" />
          <div className="text-center mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl font-black tracking-tight mt-2">Secure Terminal</h2>
            <p className="text-xs text-gray-500 mt-1">Authorized access gateways only</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-1.5">User Key</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-[#050212] border border-purple-900/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" placeholder="Enter username" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-1.5">Access Crypt</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#050212] border border-purple-900/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" placeholder="Enter security key" required />
            </div>
            {loginError && <p className="text-xs text-red-400 font-medium text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all text-sm mt-2 shadow-lg shadow-purple-600/20">
              Unlock Terminal Door
            </button>
          </form>
          <button onClick={() => onNavigate('#/')} className="w-full text-center text-[11px] text-gray-500 hover:text-white transition-colors mt-5 uppercase tracking-widest font-bold block">
            ← Back to Public Room
          </button>
        </div>
      </div>
    );
  }

  // ── ADMIN PANEL ──
  return (
    <div className="bg-[#030014] text-white min-h-screen p-6 lg:p-12 font-sans space-y-12 pb-24">
      <Toaster position="top-right" richColors theme="dark" />

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin <span className="text-purple-400">Control Panel</span></h1>
          <p className="text-xs text-gray-500 mt-1">Configure and build your system architectures live stream</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('#/')} className="bg-[#0d0625] border border-purple-900/60 hover:border-purple-500 text-gray-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
            Public Portfolio View 🌐
          </button>
          <button onClick={() => {
            localStorage.removeItem('admin_token');
            setIsLoggedIn(false);
            toast.info('Secure lockout engaged. Terminal session closed.');
          }} className="bg-rose-950/40 border border-rose-900/60 hover:bg-rose-900/60 text-rose-400 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
            Secure Lockout 🔒
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PROFILE SECTION */}
        <div className="lg:col-span-1 bg-[#0d0625]/60 border border-purple-900/40 p-6 rounded-3xl space-y-6 h-fit shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-purple-400 border-b border-purple-900/20 pb-2">👤 Live Identity Core</h3>

          <div className="flex flex-col items-center gap-3 bg-[#070314] p-4 rounded-2xl border border-purple-950">
            {profile.photoFile && (
              <img src={profile.photoFile} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-purple-500" />
            )}
            <div className="w-full text-center">
              <label className="text-[10px] font-bold uppercase tracking-wide text-purple-400 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 px-3 py-2 rounded-xl transition-all block cursor-pointer">
                📂 Choose Photo from Explorer
                <input type="file" accept="image/*" onChange={(e) => handleProfileFileChange(e, 'photoFile')} className="hidden" />
              </label>
            </div>
            <div className="w-full text-center">
              <label className="text-[10px] font-bold uppercase tracking-wide text-indigo-400 bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-800/40 px-3 py-2 rounded-xl transition-all block cursor-pointer">
                📄 Choose Resume PDF Document
                <input type="file" accept=".pdf,image/*" onChange={(e) => handleProfileFileChange(e, 'resumeFile')} className="hidden" />
              </label>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1">Developer Signature</label>
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Active Technical Title</label>
              <input type="text" value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-400 mb-1">Projects Metric</label>
                <input type="text" value={profile.stat1} onChange={e => setProfile({ ...profile, stat1: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Comm Metric</label>
                <input type="text" value={profile.stat2} onChange={e => setProfile({ ...profile, stat2: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Certifications Count</label>
                <input type="text" value={profile.stat3} onChange={e => setProfile({ ...profile, stat3: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Skills Badge Level</label>
                <input type="text" value={profile.stat4} onChange={e => setProfile({ ...profile, stat4: e.target.value })} className="w-full bg-[#070314] border border-purple-950 rounded-xl p-3 text-white" />
              </div>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all text-xs tracking-wider uppercase">
              Push Identity Vectors
            </button>
          </form>
        </div>

        {/* SKILLS MASTER BOARD */}
        <div className="lg:col-span-2 bg-[#0d0625]/60 border border-purple-900/40 p-6 rounded-3xl space-y-6 shadow-xl text-xs">
          <h3 className="text-sm font-black uppercase tracking-wider text-purple-400 border-b border-purple-900/20 pb-2 flex items-center justify-between">
            <span>⚡ Dynamic Skills Master Board</span>
            <span className="text-[10px] bg-purple-950 border border-purple-800/40 text-purple-300 font-bold px-2 py-0.5 rounded">
              Total: {skillsFrontend.length + skillsTools.length + skillsOthers.length} Nodes
            </span>
          </h3>

          {/* FRONTEND CLUSTER */}
          <div className="bg-[#070314] p-4 border border-purple-950 rounded-2xl space-y-3">
            <p className="text-purple-400 font-black uppercase text-[11px] tracking-wider">1. Frontend Core Stack List</p>
            <div className="flex flex-wrap gap-2 p-2 bg-[#030014] rounded-xl min-h-[40px] border border-purple-950/40">
              {skillsFrontend.length === 0
                ? <p className="text-gray-600 text-[11px] p-1">No frontend skills configured yet.</p>
                : skillsFrontend.map(s => (
                  <div key={s.id} className="flex items-center gap-2 bg-purple-950/40 text-purple-200 border border-purple-900/50 px-2.5 py-1 rounded-lg">
                    <div className="w-5 h-5 flex items-center justify-center overflow-hidden shrink-0">
                      {s.icon && (s.icon.startsWith('http') || s.icon.startsWith('/'))
                        ? <img src={s.icon} alt="" className="w-full h-full object-contain" />
                        : <span className="text-sm">{s.icon}</span>}
                    </div>
                    <span
                      className="cursor-pointer hover:underline hover:text-purple-300"
                      onClick={() => {
                        setEditingSkillFE(s);
                        setNewSkillFE({ name: s.name, icon: s.icon || '' });
                        toast.info(`Editing frontend skill: "${s.name}"`);
                      }}
                      title="Click to edit skill"
                    >{s.name} ✏️</span>
                    <button onClick={() => handleDeleteSkillFE(s.id)} className="text-rose-400 hover:text-rose-600 ml-1 font-bold text-xs">×</button>
                  </div>
                ))
              }
            </div>
            <form onSubmit={handleCreateSkillFE} className="flex gap-2 pt-1">
              <input type="text" placeholder="Skill Name" value={newSkillFE.name} onChange={e => setNewSkillFE({ ...newSkillFE, name: e.target.value })} className="w-36 bg-[#030014] border border-purple-950 rounded-lg p-2 text-white shrink-0" required />
              <IconInput value={newSkillFE.icon} onChange={(val) => setNewSkillFE({ ...newSkillFE, icon: val })} placeholder="Type skill name for icon..." />
              <button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-4 rounded-lg shrink-0">{editingSkillFE ? 'Save' : 'Add'}</button>
              {editingSkillFE && (
                <button type="button" onClick={() => { setEditingSkillFE(null); setNewSkillFE({ name: '', icon: '' }); toast.info('Cancelled skill edit'); }} className="bg-purple-950 text-purple-300 hover:bg-purple-900 border border-purple-800 font-bold px-2.5 rounded-lg shrink-0 text-[10px]">✕</button>
              )}
            </form>
          </div>

          {/* TOOLS CLUSTER */}
          <div className="bg-[#070314] p-4 border border-purple-950 rounded-2xl space-y-3">
            <p className="text-indigo-400 font-black uppercase text-[11px] tracking-wider">2. Deployment & Tools Stack List</p>
            <div className="flex flex-wrap gap-2 p-2 bg-[#030014] rounded-xl min-h-[40px] border border-purple-950/40">
              {skillsTools.length === 0
                ? <p className="text-gray-600 text-[11px] p-1">No deployment tools configured yet.</p>
                : skillsTools.map(t => (
                  <div key={t.id} className="flex items-center gap-2 bg-indigo-950/40 text-indigo-200 border border-indigo-900/50 px-2.5 py-1 rounded-lg">
                    <div className="w-5 h-5 flex items-center justify-center overflow-hidden shrink-0">
                      {t.icon && (t.icon.startsWith('http') || t.icon.startsWith('/'))
                        ? <img src={t.icon} alt="" className="w-full h-full object-contain" />
                        : <span className="text-sm">{t.icon}</span>}
                    </div>
                    <span
                      className="cursor-pointer hover:underline hover:text-indigo-300"
                      onClick={() => {
                        setEditingSkillTool(t);
                        setNewSkillTool({ name: t.name, icon: t.icon || '' });
                        toast.info(`Editing tool: "${t.name}"`);
                      }}
                      title="Click to edit tool"
                    >{t.name} ✏️</span>
                    <button onClick={() => handleDeleteSkillTool(t.id)} className="text-rose-400 hover:text-rose-600 ml-1 font-bold text-xs">×</button>
                  </div>
                ))
              }
            </div>
            <form onSubmit={handleCreateSkillTool} className="flex gap-2 pt-1">
              <input type="text" placeholder="Tool Name" value={newSkillTool.name} onChange={e => setNewSkillTool({ ...newSkillTool, name: e.target.value })} className="w-36 bg-[#030014] border border-purple-950 rounded-lg p-2 text-white shrink-0" required />
              <IconInput value={newSkillTool.icon} onChange={(val) => setNewSkillTool({ ...newSkillTool, icon: val })} placeholder="Type tool name for icon..." />
              <button type="submit" className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold px-4 rounded-lg shrink-0">{editingSkillTool ? 'Save' : 'Add'}</button>
              {editingSkillTool && (
                <button type="button" onClick={() => { setEditingSkillTool(null); setNewSkillTool({ name: '', icon: '' }); toast.info('Cancelled tool edit'); }} className="bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 font-bold px-2.5 rounded-lg shrink-0 text-[10px]">✕</button>
              )}
            </form>
          </div>

          {/* OTHERS CLUSTER */}
          <div className="bg-[#070314] p-4 border border-purple-950 rounded-2xl space-y-3">
            <p className="text-pink-400 font-black uppercase text-[11px] tracking-wider">3. Other Tech Specializations List</p>
            <div className="flex flex-wrap gap-2 p-2 bg-[#030014] rounded-xl min-h-[40px] border border-purple-950/40">
              {skillsOthers.length === 0
                ? <p className="text-gray-600 text-[11px] p-1">No alternate fields configured yet.</p>
                : skillsOthers.map(o => (
                  <div key={o.id} className="flex items-center gap-2 bg-pink-950/40 text-pink-200 border border-pink-900/50 px-2.5 py-1 rounded-lg">
                    <div className="w-5 h-5 flex items-center justify-center overflow-hidden shrink-0">
                      {o.icon && (o.icon.startsWith('http') || o.icon.startsWith('/'))
                        ? <img src={o.icon} alt="" className="w-full h-full object-contain" />
                        : <span className="text-sm">{o.icon}</span>}
                    </div>
                    <span
                      className="cursor-pointer hover:underline hover:text-pink-300"
                      onClick={() => {
                        setEditingSkillOther(o);
                        setNewSkillOther({ name: o.name, icon: o.icon || '' });
                        toast.info(`Editing skill: "${o.name}"`);
                      }}
                      title="Click to edit skill"
                    >{o.name} ✏️</span>
                    <button onClick={() => handleDeleteSkillOther(o.id)} className="text-rose-400 hover:text-rose-600 ml-1 font-bold text-xs">×</button>
                  </div>
                ))
              }
            </div>
            <form onSubmit={handleCreateSkillOther} className="flex gap-2 pt-1">
              <input type="text" placeholder="Skill Name" value={newSkillOther.name} onChange={e => setNewSkillOther({ ...newSkillOther, name: e.target.value })} className="w-36 bg-[#030014] border border-purple-950 rounded-lg p-2 text-white shrink-0" required />
              <IconInput value={newSkillOther.icon} onChange={(val) => setNewSkillOther({ ...newSkillOther, icon: val })} placeholder="Type skill name for icon..." />
              <button type="submit" className="bg-pink-700 hover:bg-pink-600 text-white font-bold px-4 rounded-lg shrink-0">{editingSkillOther ? 'Save' : 'Add'}</button>
              {editingSkillOther && (
                <button type="button" onClick={() => { setEditingSkillOther(null); setNewSkillOther({ name: '', icon: '' }); toast.info('Cancelled skill edit'); }} className="bg-[#1f0e2a] text-pink-300 hover:bg-[#2c133a] border border-pink-900 font-bold px-2.5 rounded-lg shrink-0 text-[10px]">✕</button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* PROJECTS & CERTIFICATES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── PROJECTS ── */}
        <div className="bg-[#0d0625]/60 border border-purple-900/40 p-6 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-purple-400 border-b border-purple-900/20 pb-2 flex items-center justify-between">
            <span>🖥️ Production Application Galaxies Manager</span>
            <span className="text-[10px] bg-purple-950 border border-purple-800/40 text-purple-300 font-bold px-2 py-0.5 rounded">{projects.length} Nodes</span>
          </h3>

          <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#070314] p-4 rounded-2xl border border-purple-950">
            <div className="md:col-span-2 text-[10px] text-purple-400 font-black uppercase tracking-wider flex items-center justify-between">
              <span>{editingProject ? `Edit App Card Node (ID: ${editingProject.id})` : 'Create New App Card Node'}</span>
              {editingProject && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setNewProj({ title: '', desc: '', tags: '', category: 'React', githubUrl: '', demoUrl: '', projectImage: '' });
                    setProjImagePreview('');
                    setProjImageFileName('');
                    toast.info('Cancelled project editing');
                  }}
                  className="text-[9px] bg-purple-950 border border-purple-800 text-purple-300 font-bold px-2 py-0.5 rounded cursor-pointer"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Project Deck Title</label>
              <input type="text" value={newProj.title} onChange={e => setNewProj({ ...newProj, title: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Target Route Category</label>
              <select value={newProj.category} onChange={e => setNewProj({ ...newProj, category: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white">
                <option value="React">React</option>
                <option value="Web Apps">Web Apps</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-1">Description Vector</label>
              <textarea rows="2" value={newProj.desc} onChange={e => setNewProj({ ...newProj, desc: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Tags (Comma Separated)</label>
              <input type="text" placeholder="React, Tailwind, Firebase" value={newProj.tags} onChange={e => setNewProj({ ...newProj, tags: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">GitHub Resource URL</label>
              <input type="text" value={newProj.githubUrl} onChange={e => setNewProj({ ...newProj, githubUrl: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Live Application URL Route</label>
              <input type="text" value={newProj.demoUrl} onChange={e => setNewProj({ ...newProj, demoUrl: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" />
            </div>

            {/* ── PROJECT IMAGE UPLOAD (File Explorer + URL) ── */}
            <div className="md:col-span-2">
              <FileUploadBox
                label="Project Preview Image / File"
                accept="*/*"
                preview={projImagePreview}
                fileName={projImageFileName}
                onFileChange={handleProjImageFileChange}
                onClear={clearProjImage}
                urlValue={projImagePreview ? '' : newProj.projectImage}
                onUrlChange={(val) => { setNewProj(prev => ({ ...prev, projectImage: val })); setProjImagePreview(val); }}
                accentColor="purple"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-wider">
                {editingProject ? 'Save Project Changes' : 'Deploy Dynamic Project Node'}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Configured Cards inside Database</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-1">
              {projects.length === 0
                ? <p className="text-gray-600 text-xs col-span-2">No data inside "projects" collection.</p>
                : projects.map(p => (
                  <div key={p.id} className="bg-[#070314] border border-purple-950 p-4 rounded-2xl flex flex-col justify-between items-start gap-3">
                    <div className="w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-900/50 font-bold px-2 py-0.5 rounded">{p.category}</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(p);
                              setNewProj({
                                title: p.title,
                                desc: p.desc,
                                tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags,
                                category: p.category,
                                githubUrl: p.githubUrl || '',
                                demoUrl: p.demoUrl || '',
                                projectImage: p.projectImage || ''
                              });
                              setProjImagePreview(p.projectImage || '');
                              setProjImageFileName('');
                              toast.info(`Editing project: "${p.title}"`);
                              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-purple-950/40 border border-purple-900/60 text-purple-400 hover:bg-purple-900/60 text-xs font-bold px-2.5 py-0.5 rounded-lg transition-colors"
                          >
                            Edit 📝
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p.id)}
                            className="bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60 text-xs font-bold px-2 py-0.5 rounded-lg transition-colors"
                          >
                            Delete ×
                          </button>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-2 truncate w-full tracking-wide">{p.title}</h4>
                      <p className="text-gray-500 text-xs line-clamp-2 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* ── CERTIFICATES ── */}
        <div className="bg-[#0d0625]/60 border border-purple-900/40 p-6 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-indigo-400 border-b border-purple-900/20 pb-2 flex items-center justify-between">
            <span>🏅 Verified Credentials Vector</span>
            <span className="text-[10px] bg-indigo-950 border border-indigo-800/40 text-indigo-300 font-bold px-2 py-0.5 rounded">{certificates.length} Badges</span>
          </h3>

          <form onSubmit={handleCreateCertificate} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#070314] p-4 rounded-2xl border border-purple-950">
            <div className="md:col-span-2 text-[10px] text-indigo-400 font-black uppercase tracking-wider flex items-center justify-between">
              <span>{editingCertificate ? `Edit Achievement Badge (ID: ${editingCertificate.id})` : 'Deploy New Achievement Badge'}</span>
              {editingCertificate && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCertificate(null);
                    setNewCert({ title: '', issuer: '', date: '', skillTag: '', certImage: '', certFile: '' });
                    setCertFilePreview('');
                    setCertFileName('');
                    setCertFileMime('');
                    toast.info('Cancelled certificate editing');
                  }}
                  className="text-[9px] bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold px-2 py-0.5 rounded cursor-pointer"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Certificate Title</label>
              <input type="text" value={newCert.title} onChange={e => setNewCert({ ...newCert, title: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Issuer Authority</label>
              <input type="text" placeholder="e.g. Meta, freeCodeCamp" value={newCert.issuer} onChange={e => setNewCert({ ...newCert, issuer: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Date Signature Timeline</label>
              <input type="text" placeholder="Issued: May 2026" value={newCert.date} onChange={e => setNewCert({ ...newCert, date: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Specialization Focus Tag</label>
              <input type="text" placeholder="e.g. Frontend Architecture" value={newCert.skillTag} onChange={e => setNewCert({ ...newCert, skillTag: e.target.value })} className="w-full bg-[#030014] border border-purple-950 rounded-xl p-3 text-white" />
            </div>

            {/* ── CERTIFICATE FILE UPLOAD (Image + PDF + Any) ── */}
            <div className="md:col-span-2">
              <FileUploadBox
                label="Certificate File (Image, PDF, or Any Format)"
                accept="*/*"
                preview={certFilePreview}
                fileName={certFileName}
                onFileChange={handleCertFileChange}
                onClear={clearCertFile}
                urlValue={certFilePreview ? '' : newCert.certImage}
                onUrlChange={(val) => { setNewCert(prev => ({ ...prev, certImage: val, certFile: '' })); setCertFilePreview(val); }}
                accentColor="indigo"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-wider">
                {editingCertificate ? 'Save Certificate Changes' : 'Verify and Store Certificate Node'}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Configured Credentials inside Database</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-1">
              {certificates.length === 0
                ? <p className="text-gray-600 text-xs col-span-2">No data inside "certificates" collection.</p>
                : certificates.map(c => {
                  // Determine the file to open: certFile first (base64 pdf/image), then certImage, then certUrl
                  const fileToOpen = c.certFile || c.certImage || c.certUrl || null;
                  const isPdfFile = c.certMime === 'application/pdf' || (c.certFile && c.certFile.startsWith('data:application/pdf'));
                  return (
                    <div key={c.id} className="bg-[#070314] border border-purple-950 p-4 rounded-2xl flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3 truncate">
                        {/* Thumbnail */}
                        <div className="w-10 h-10 shrink-0 bg-indigo-950/40 border border-indigo-900/50 rounded-lg overflow-hidden flex items-center justify-center">
                          {c.certImage && c.certImage.startsWith('data:image') ? (
                            <img src={c.certImage} alt="Badge" className="w-full h-full object-cover" />
                          ) : isPdfFile ? (
                            <span className="text-lg">📄</span>
                          ) : c.certImage ? (
                            <img src={c.certImage} alt="Badge" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                          ) : (
                            <span className="text-lg">📜</span>
                          )}
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-white tracking-tight truncate">{c.title}</h4>
                          <p className="text-[10px] text-purple-400 font-medium">{c.issuer} • {c.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCertificate(c);
                            setNewCert({
                              title: c.title,
                              issuer: c.issuer,
                              date: c.date,
                              skillTag: c.skillTag || '',
                              certImage: c.certImage || '',
                              certFile: c.certFile || '',
                              certFileName: c.certFileName || '',
                              certMime: c.certMime || ''
                            });
                            setCertFilePreview(c.certFile || c.certImage || '');
                            setCertFileName(c.certFileName || '');
                            setCertFileMime(c.certMime || '');
                            toast.info(`Editing certificate: "${c.title}"`);
                            document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-indigo-950/40 border border-indigo-900/60 text-indigo-400 hover:bg-indigo-900/60 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Edit 📝
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCertificate(c.id)}
                          className="bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60 text-xs font-bold px-2 py-1.5 rounded-lg transition-colors"
                        >
                          Delete ×
                        </button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginAndAdmin;