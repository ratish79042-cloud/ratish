import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

function Dashboard({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [profile, setProfile] = useState({ name: 'Ratish G T', role: 'Frontend Developer', intro: '' });
  const [newProject, setNewProject] = useState({ title: '', desc: '', tags: '', image: '', demoUrl: '', githubUrl: '', category: 'React' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', url: '', image: '' });
  
  // Lists fetched dynamic storage state arrays
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        onNavigate('#/login');
      } else {
        setUser(currentUser);
        fetchData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    // Profile
    const profileSnap = await getDoc(doc(db, "meta", "profile"));
    if (profileSnap.exists()) setProfile(profileSnap.data());

    // Projects
    const queryProj = await getDocs(collection(db, "projects"));
    setProjects(queryProj.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    // Certificates
    const queryCert = await getDocs(collection(db, "certificates"));
    setCerts(queryCert.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "meta", "profile"), profile);
    alert('Profile information updated successfully!');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "projects"), newProject);
    setNewProject({ title: '', desc: '', tags: '', image: '', demoUrl: '', githubUrl: '', category: 'React' });
    fetchData();
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "certificates"), newCert);
    setNewCert({ title: '', issuer: '', date: '', url: '', image: '' });
    fetchData();
  };

  const handleDelete = async (collectionName, id) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    }
  };

  if (loading) return <div className="text-center py-20 text-purple-400">Loading Session State...</div>;

  return (
    <div className="min-h-screen bg-[#0b061f] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Controls Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-purple-950 pb-6 mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Management Console</h1>
            <p className="text-purple-400/60 text-sm mt-1">Hello, Control configurations live on the client application interfaces.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('#/')} className="px-5 py-2.5 bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-900/50 rounded-xl text-sm font-medium transition-all">
              View Site
            </button>
            <button onClick={() => signOut(auth)} className="px-5 py-2.5 bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-900/50 rounded-xl text-sm font-medium transition-all">
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column A: Meta Profile Information Edit Form */}
          <div className="bg-[#130b2e]/40 border border-purple-950/60 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold text-purple-200 mb-4 border-b border-purple-950 pb-2">Profile Customizer</h3>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-xs text-purple-400 mb-1">Display Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none focus:border-purple-500 text-sm"/>
              </div>
              <div>
                <label className="block text-xs text-purple-400 mb-1">Professional Headline Title</label>
                <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="w-full bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none focus:border-purple-500 text-sm"/>
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-md shadow-purple-500/10">
                Update Text Metadata
              </button>
            </form>
          </div>

          {/* Column B & C: Production lists and Add Item subforms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Upload Manager */}
            <div className="bg-[#130b2e]/40 border border-purple-950/60 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-purple-200 mb-4 border-b border-purple-950 pb-2">Upload New Project Card</h3>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Project Name (e.g., Taskify)" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="Tags comma separated (React, Tailwind CSS)" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="Mockup Image Link Address URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm">
                  <option value="All">Category: All</option>
                  <option value="Web Apps">Web Apps</option>
                  <option value="React">React</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Personal">Personal</option>
                </select>
                <input type="text" placeholder="Live Demo Link URL" value={newProject.demoUrl} onChange={e => setNewProject({...newProject, demoUrl: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="GitHub Repository URL" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <textarea placeholder="Short descriptive summary" value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} required className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl md:col-span-2 outline-none h-20 text-sm"/>
                <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all">
                  Publish New Project Card
                </button>
              </form>

              {/* Added Items List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {projects.map(p => (
                  <div key={p.id} className="flex justify-between items-center bg-[#0b061f]/60 p-3 rounded-xl border border-purple-950/40 text-sm">
                    <span className="text-white font-medium">{p.title}</span>
                    <button onClick={() => handleDelete('projects', p.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Records Manager */}
            <div className="bg-[#130b2e]/40 border border-purple-950/60 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-purple-200 mb-4 border-b border-purple-950 pb-2">Add Qualification Certificate</h3>
              <form onSubmit={handleAddCert} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Certificate Name" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} required className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="Issuing Organization (Meta, Coursera)" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} required className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="Issued Date (e.g., May 2024)" value={newCert.date} onChange={e => setNewCert({...newCert, date: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <input type="text" placeholder="Certificate Image Link URL" value={newCert.image} onChange={e => setNewCert({...newCert, image: e.target.value})} className="bg-[#0b061f] border border-purple-950 text-white p-3 rounded-xl outline-none text-sm"/>
                <button type="submit" className="md:col-span-2 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all">
                  Register Certificate Record
                </button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {certs.map(c => (
                  <div key={c.id} className="flex justify-between items-center bg-[#0b061f]/60 p-3 rounded-xl border border-purple-950/40 text-sm">
                    <span className="text-white font-medium">{c.title} — <span className="text-purple-400 text-xs">{c.issuer}</span></span>
                    <button onClick={() => handleDelete('certificates', c.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;