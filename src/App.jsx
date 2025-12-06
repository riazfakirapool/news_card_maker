import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Type, Calendar, Image as ImageIcon, LayoutTemplate, Hash, Globe, Quote, Loader2, Edit, ArrowLeft, CheckCircle, Palette, MonitorPlay, Layers, Zap } from 'lucide-react';

const NewsCardGenerator = () => {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('gallery');
  const [selectedDesignId, setSelectedDesignId] = useState(1);
  
  // Editable Data State (Shared across all designs)
  const [date, setDate] = useState('০৫ ডিসেম্বর ২০২৫');
  const [headlineLine1, setHeadlineLine1] = useState('বিশ্ববাজারে জ্বালানি তেলের');
  const [headlineLine2, setHeadlineLine2] = useState('বড় দরপতন, কমলো দাম');
  const [reporter, setReporter] = useState('নিজস্ব প্রতিবেদক');
  const [category, setCategory] = useState('ব্রেকিং নিউজ');
  const [footerText, setFooterText] = useState('www.dailynews.com');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const cardRef = useRef(null);

  // --- HTML2CANVAS LOADER ---
  useEffect(() => {
    // Check if html2canvas is already loaded
    if (window.html2canvas) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { 
        if(document.body.contains(script)) {
            document.body.removeChild(script); 
        }
    };
  }, []);

  // --- HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    setTimeout(async () => {
      try {
        if (window.html2canvas) {
          const canvas = await window.html2canvas(cardRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
          });
          const link = document.createElement('a');
          link.download = `news-card-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        } else {
          alert("ডাউনলোড টুল লোড হয়নি। দয়া করে পেজটি রিফ্রেশ করুন।");
        }
      } catch (error) {
        console.error("Download failed:", error);
      } finally {
        setIsDownloading(false);
      }
    }, 100);
  };

  const selectDesignAndEdit = (id) => {
    setSelectedDesignId(id);
    setCurrentView('editor');
    window.scrollTo(0, 0);
  };

  // --- DESIGN LIST ---
  const designs = [
    { 
        id: 1, 
        name: 'ক্লাসিক পত্রিকা', 
        desc: 'সাদা ব্যাকগ্রাউন্ড, মার্জিত লুক', 
        icon: <LayoutTemplate size={24} className="text-red-600" />,
        gradient: 'from-slate-50 to-white'
    },
    { 
        id: 2, 
        name: 'ব্রেকিং নিউজ', 
        desc: 'ডার্ক থিম, টিভি স্ক্রিন স্টাইল', 
        icon: <MonitorPlay size={24} className="text-yellow-400" />,
        gradient: 'from-slate-900 to-black'
    },
    { 
        id: 3, 
        name: 'সোশ্যাল ভাইব', 
        desc: 'ইনস্টাগ্রাম বা রিলস স্টাইল', 
        icon: <Layers size={24} className="text-purple-500" />,
        gradient: 'from-indigo-600 to-purple-700'
    },
    { 
        id: 4, 
        name: 'উক্তি / কোট', 
        desc: 'ব্যক্তিত্বদের উক্তি শেয়ার করার জন্য', 
        icon: <Quote size={24} className="text-emerald-500" />,
        gradient: 'from-emerald-50 to-teal-100'
    },
    { 
        id: 5, 
        name: 'ম্যাগাজিন প্রো', 
        desc: 'নীল ও আধুনিক কর্পোরেট ডিজাইন', 
        icon: <Palette size={24} className="text-blue-500" />,
        gradient: 'from-blue-50 to-white'
    },
    { 
        id: 6, 
        name: 'বোল্ড অ্যাকশন', 
        desc: 'খেলাধুলা বা শক্তিশালী খবরের জন্য', 
        icon: <Zap size={24} className="text-orange-500" />,
        gradient: 'from-orange-900 to-black'
    },
  ];

  // --- RENDERERS FOR DIFFERENT DESIGNS ---

  // Design 1: Classic Newspaper (Updated)
  const RenderDesign1 = () => (
    <div className="w-full h-full bg-white relative flex flex-col font-bengali shadow-inner">
      <div className="relative w-full h-[55%] bg-slate-100 overflow-hidden group">
        {selectedImage ? (
            <img src={selectedImage} alt="News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300"><ImageIcon size={48}/></div>
        )}
        <div className="absolute top-0 left-0 bg-[#D9232D] text-white py-2 px-6 text-sm font-bold shadow-md z-10 rounded-br-lg">{category}</div>
      </div>
      <div className="w-full h-[45%] bg-white flex flex-col px-8 py-6 relative">
        <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold mb-4 border-l-[4px] border-[#D9232D] pl-3">
          <span className="text-slate-800">{date}</span>
          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
          <span className="uppercase tracking-wider text-[#D9232D] font-bold">{reporter}</span>
        </div>
        <div className="flex flex-col gap-1 mb-auto">
          <h1 className="text-[#1a1a1a] text-[30px] font-bold leading-[1.15] tracking-tight">{headlineLine1}</h1>
          <h1 className="text-[#D9232D] text-[30px] font-bold leading-[1.15] tracking-tight">{headlineLine2}</h1>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="h-8 flex items-center opacity-90">
              {selectedLogo ? <img src={selectedLogo} alt="Logo" className="h-full object-contain" /> : <div className="font-bold text-xl text-slate-800 tracking-tighter uppercase">Daily<span className="text-[#D9232D]">Star</span></div>}
          </div>
          <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              {footerText}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2.5 bg-[#D9232D]"></div>
      </div>
    </div>
  );

  // Design 2: Breaking News (Updated)
  const RenderDesign2 = () => (
    <div className="w-full h-full bg-[#111] relative flex flex-col font-bengali text-white overflow-hidden">
      <div className="h-[14%] flex justify-between items-center px-6 bg-gradient-to-r from-[#222] to-[#333] border-b-4 border-[#ff0000] shadow-2xl z-20 relative">
        <div className="flex items-center gap-3">
            <div className="bg-[#ff0000] px-4 py-1.5 font-black text-xs rounded-sm shadow-[0_0_10px_rgba(255,0,0,0.6)] animate-pulse tracking-widest uppercase text-white">LIVE</div>
            <span className="text-[11px] text-gray-400 font-mono border-l border-gray-600 pl-3">{date}</span>
        </div>
        <div className="h-7 filter drop-shadow-lg">{selectedLogo ? <img src={selectedLogo} alt="Logo" className="h-full object-contain brightness-0 invert" /> : <span className="font-black text-2xl text-white italic tracking-tighter">BREAKING</span>}</div>
      </div>
      
      <div className="h-[52%] relative bg-black group">
         {selectedImage ? <img src={selectedImage} alt="News" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" /> : <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700"><ImageIcon size={48}/></div>}
         <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
         <div className="absolute bottom-4 right-4 bg-yellow-500 text-black px-4 py-1 font-bold text-sm transform -skew-x-12 shadow-lg">
             {category}
         </div>
      </div>
      
      <div className="h-[34%] px-8 py-4 flex flex-col justify-center relative z-10">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="space-y-1 relative z-10">
            <h1 className="text-white text-[32px] font-bold leading-tight drop-shadow-md">{headlineLine1}</h1>
            <h1 className="text-[#fbbf24] text-[34px] font-bold leading-tight drop-shadow-md underline decoration-red-600 decoration-4 underline-offset-4">{headlineLine2}</h1>
         </div>
         <div className="mt-auto flex items-center justify-between border-t border-gray-800 pt-3">
             <div className="flex items-center gap-2 text-xs text-gray-400">
                 <Globe size={12}/> {footerText}
             </div>
             <span className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">{reporter}</span>
         </div>
      </div>
    </div>
  );

  // Design 3: Social Vibe (Updated)
  const RenderDesign3 = () => (
    <div className="w-full h-full relative font-bengali bg-slate-900 overflow-hidden">
       {selectedImage ? (
           <img src={selectedImage} alt="News" className="w-full h-full object-cover" />
       ) : (
           <div className="w-full h-full flex items-center justify-center bg-indigo-900 text-indigo-300"><ImageIcon size={48}/></div>
       )}
       
       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent mix-blend-overlay"></div>
       
       <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center z-20">
           <span className="bg-white/20 backdrop-blur-xl text-white px-5 py-2 rounded-full text-xs font-bold border border-white/20 shadow-lg flex items-center gap-2">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> {category}
           </span>
           <div className="h-8 drop-shadow-lg">{selectedLogo && <img src={selectedLogo} alt="Logo" className="h-full object-contain brightness-0 invert" />}</div>
       </div>

       <div className="absolute bottom-0 left-0 w-full p-10 pb-12 z-20">
           <div className="w-20 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
           <h1 className="text-white text-[36px] font-bold leading-[1.1] mb-2 drop-shadow-xl">{headlineLine1}</h1>
           <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-[36px] font-bold leading-[1.1] mb-8 drop-shadow-xl">{headlineLine2}</h1>
           
           <div className="flex items-center justify-between text-white/80 text-sm font-medium border-t border-white/10 pt-5">
               <span className="flex items-center gap-2"><Calendar size={14} className="text-pink-400"/> {date}</span>
               <span className="bg-white/10 px-3 py-1 rounded text-xs">{footerText}</span>
           </div>
       </div>
    </div>
  );

  // Design 4: Quote (Updated)
  const RenderDesign4 = () => (
    <div className="w-full h-full bg-[#f8fafc] relative flex flex-col items-center justify-center p-10 font-bengali text-center border-[24px] border-white shadow-inner">
        <div className="absolute inset-0 border-[1px] border-slate-200 m-[20px] pointer-events-none"></div>
        <div className="absolute top-12 right-12 text-emerald-100/80 transform rotate-12"><Quote size={120} /></div>
        
        <div className="w-52 h-52 rounded-full p-1.5 bg-gradient-to-br from-emerald-400 to-teal-600 shadow-2xl mb-8 relative z-10">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                {selectedImage ? <img src={selectedImage} alt="News" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><ImageIcon size={32}/></div>}
            </div>
        </div>

        <div className="relative z-10 w-full max-w-[420px]">
            <h1 className="text-slate-800 text-[28px] font-bold leading-snug drop-shadow-sm italic">
                <span className="text-emerald-500 text-5xl font-serif leading-none align-top mr-1">“</span>
                {headlineLine1} {headlineLine2}
                <span className="text-emerald-500 text-5xl font-serif leading-none align-bottom ml-1">”</span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 my-6">
                 <div className="h-px w-12 bg-emerald-300"></div>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                 <div className="h-px w-12 bg-emerald-300"></div>
            </div>
            
            <p className="text-emerald-800 font-bold text-xl tracking-tight uppercase">{reporter}</p>
            <p className="text-slate-400 text-xs mt-1 font-medium">{date}</p>
        </div>

        <div className="absolute bottom-8 w-full flex flex-col items-center gap-2">
             <span className="text-[10px] text-slate-400 tracking-[0.3em] uppercase font-bold">{footerText}</span>
        </div>
    </div>
  );

  // Design 5: Magazine Pro (Updated)
  const RenderDesign5 = () => (
    <div className="w-full h-full bg-white relative flex flex-col font-bengali">
       <div className="h-[62%] p-5 pb-0 bg-slate-50">
           <div className="w-full h-full rounded-t-3xl overflow-hidden relative shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
               {selectedImage ? <img src={selectedImage} alt="News" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200"><ImageIcon size={48}/></div>}
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-xs text-blue-700 shadow-sm border border-white/50">
                   {date}
               </div>
           </div>
       </div>
       <div className="h-[38%] px-10 py-8 bg-white relative z-10">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>
           
           <div className="flex justify-between items-start mb-5">
               <span className="text-white bg-blue-600 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                   {category}
               </span>
               {selectedLogo && <img src={selectedLogo} alt="Logo" className="h-5 object-contain" />}
           </div>
           
           <div className="space-y-2">
               <h1 className="text-slate-900 text-[34px] font-bold leading-[1.1] tracking-tight">{headlineLine1}</h1>
               <h1 className="text-slate-500 text-[28px] font-normal leading-[1.1]">{headlineLine2}</h1>
           </div>
           
           <div className="absolute bottom-6 right-10 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
               {footerText}
           </div>
       </div>
    </div>
  );

  // Design 6: Bold Action (NEW!)
  const RenderDesign6 = () => (
    <div className="w-full h-full bg-slate-900 relative flex flex-col font-bengali overflow-hidden border-4 border-orange-500">
       {/* Slanted Background */}
       <div className="absolute inset-0 bg-slate-900 transform -skew-y-0">
           {selectedImage ? (
             <div className="w-full h-full opacity-60 mix-blend-luminosity">
               <img src={selectedImage} alt="News" className="w-full h-full object-cover" />
             </div>
           ) : (
             <div className="w-full h-full bg-slate-800 flex items-center justify-center"><ImageIcon className="text-slate-600" size={64}/></div>
           )}
           <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-slate-900/90"></div>
       </div>

       {/* Content Container */}
       <div className="relative z-10 h-full flex flex-col p-8 justify-center">
           
           {/* Top Bar */}
           <div className="flex justify-between items-start mb-auto">
                <div className="bg-orange-500 text-black font-black text-lg px-4 py-1 transform -skew-x-12 uppercase">
                    {category}
                </div>
                <div className="h-8 filter drop-shadow">{selectedLogo && <img src={selectedLogo} alt="Logo" className="h-full object-contain brightness-0 invert" />}</div>
           </div>

           {/* Main Text */}
           <div className="space-y-1 my-8">
               <div className="bg-white/10 backdrop-blur-sm border-l-8 border-orange-500 pl-6 py-2">
                   <h1 className="text-white text-[38px] font-black leading-none uppercase italic tracking-tighter drop-shadow-lg">
                       {headlineLine1}
                   </h1>
                   <h1 className="text-orange-500 text-[42px] font-black leading-none uppercase italic tracking-tighter drop-shadow-lg">
                       {headlineLine2}
                   </h1>
               </div>
           </div>

           {/* Footer Info */}
           <div className="mt-auto flex items-end justify-between border-t border-white/20 pt-4">
               <div>
                   <p className="text-orange-400 font-bold text-sm uppercase tracking-wider">{reporter}</p>
                   <p className="text-slate-400 text-xs font-mono">{date}</p>
               </div>
               <div className="text-right">
                   <p className="text-white font-bold text-xs tracking-[0.2em] uppercase">{footerText}</p>
               </div>
           </div>
           
           {/* Decorative Element */}
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* --- HEADER --- */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-2.5 rounded-xl shadow-lg shadow-red-200"><LayoutTemplate size={22}/></div>
            <div>
                <h1 className="text-xl font-bold font-bengali text-slate-800 leading-none">নিউজ কার্ড প্রো</h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">প্রিমিয়াম ডিজাইন স্টুডিও</p>
            </div>
        </div>
        {currentView === 'editor' && (
            <button onClick={() => setCurrentView('gallery')} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-white hover:bg-slate-800 transition-all bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm">
                <ArrowLeft size={16}/> টেম্পলেট গ্যালারি
            </button>
        )}
      </div>

      <div className="container mx-auto py-10 px-4 md:px-8">
        
        {/* --- VIEW 1: GALLERY / DASHBOARD --- */}
        {currentView === 'gallery' && (
            <div className="max-w-7xl mx-auto animate-fade-in pb-10">
                <div className="text-center mb-12 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold font-bengali text-slate-800">আপনার পছন্দের ডিজাইন বেছে নিন</h2>
                    <p className="text-slate-500 font-bengali text-lg max-w-2xl mx-auto">নিচের প্রিমিয়াম টেম্পলেটগুলো থেকে যেকোনো একটি সিলেক্ট করুন এবং নিজের মতো করে সাজিয়ে নিন</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {designs.map((design) => (
                        <div key={design.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-100 group flex flex-col h-full">
                            <div className={`h-56 w-full flex items-center justify-center bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
                                <div className="z-10 bg-white/30 backdrop-blur-md p-4 rounded-full shadow-lg transform group-hover:scale-110 transition duration-500">
                                    {design.icon}
                                </div>
                                {design.id === selectedDesignId && <div className="absolute top-4 right-4 bg-white text-green-600 rounded-full p-1 shadow-md"><CheckCircle size={24}/></div>}
                            </div>
                            
                            <div className="p-7 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-bengali text-slate-800 mb-1">{design.name}</h3>
                                <p className="text-sm text-slate-500 font-bengali mb-6">{design.desc}</p>
                                
                                <button 
                                    onClick={() => selectDesignAndEdit(design.id)}
                                    className="mt-auto w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all shadow-lg group-hover:shadow-red-200"
                                >
                                    <Edit size={18} /> এডিট শুরু করুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- VIEW 2: EDITOR --- */}
        {currentView === 'editor' && (
            // Updated Flex Container with 'justify-center' and 'items-start' for proper alignment
            <div className="flex flex-col xl:flex-row gap-10 justify-center items-start animate-fade-in-up pb-20 max-w-7xl mx-auto">
                
                {/* Editor Panel */}
                <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl w-full max-w-[500px] xl:w-[450px] space-y-6 h-fit xl:sticky xl:top-24 mx-auto xl:mx-0">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                        <Edit className="text-red-500" size={20}/>
                        <h2 className="text-lg font-bold font-bengali text-slate-700">কাস্টমাইজেশন প্যানেল</h2>
                    </div>

                    {/* Logo & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">লোগো</label>
                            <label className="flex items-center justify-center w-full p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-red-500 hover:bg-white transition h-11 shadow-sm group">
                                <Upload size={16} className="mr-2 text-slate-500 group-hover:text-red-500" />
                                <span className="text-xs text-slate-600 font-medium group-hover:text-red-500">আপলোড</span>
                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                            </label>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ক্যাটাগরি</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs h-11 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-bengali outline-none transition"/>
                        </div>
                    </div>

                    {/* Headlines */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider"><Type size={14}/> হেডলাইন</label>
                        <textarea rows={2} value={headlineLine1} onChange={(e) => setHeadlineLine1(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-bengali resize-none outline-none transition shadow-inner" placeholder="১ম লাইন"/>
                        <textarea rows={2} value={headlineLine2} onChange={(e) => setHeadlineLine2(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-bengali resize-none outline-none transition shadow-inner" placeholder="২য় লাইন (হাইলাইট)"/>
                    </div>

                    {/* Meta Data */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">তারিখ</label>
                            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-bengali outline-none focus:border-red-500 transition"/>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">প্রতিবেদক</label>
                            <input type="text" value={reporter} onChange={(e) => setReporter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-bengali outline-none focus:border-red-500 transition"/>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                         <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ফুটার / ওয়েবসাইট</label>
                         <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-red-500 transition"/>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2 pt-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">নিউজ ফটো</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-red-300 transition cursor-pointer relative group bg-slate-50/50">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:text-red-500 transition">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition">
                                     <ImageIcon size={24} />
                                </div>
                                <span className="text-xs font-bengali font-medium">ছবি আপলোড করতে ক্লিক করুন</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleDownload} disabled={isDownloading} className={`w-full py-4 rounded-xl font-bold shadow-lg shadow-red-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 font-bengali text-sm text-white mt-2 ${isDownloading ? 'bg-slate-400 cursor-wait' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500'}`}>
                        {isDownloading ? <><Loader2 size={18} className="animate-spin" /> প্রোসেসিং হচ্ছে...</> : <><Download size={18} /> ডাউনলোড করুন (HD)</>}
                    </button>
                </div>

                {/* Live Preview Panel - Centered */}
                <div className="flex flex-col items-center justify-start min-h-[600px] w-full xl:w-auto">
                    <div className="bg-white px-5 py-2 rounded-full shadow-sm mb-6 text-xs text-slate-500 font-bengali border border-slate-200 flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        লাইভ প্রিভিউ: <span className="font-bold text-slate-800">{designs.find(d => d.id === selectedDesignId)?.name}</span>
                    </div>
                    
                    <div className="p-8 bg-slate-200/50 rounded-[2rem] border border-slate-300/50 backdrop-blur-sm shadow-xl">
                        <div ref={cardRef} className="w-[500px] h-[500px] shadow-2xl overflow-hidden bg-white ring-1 ring-black/5 rounded-sm">
                            {selectedDesignId === 1 && <RenderDesign1 />}
                            {selectedDesignId === 2 && <RenderDesign2 />}
                            {selectedDesignId === 3 && <RenderDesign3 />}
                            {selectedDesignId === 4 && <RenderDesign4 />}
                            {selectedDesignId === 5 && <RenderDesign5 />}
                            {selectedDesignId === 6 && <RenderDesign6 />}
                        </div>
                    </div>
                    
                    <p className="mt-8 text-xs text-slate-400 font-bengali text-center">© ২০২৫ সিম্পাটা ডিজাইন স্টুডিও • বেস্ট কোয়ালিটির জন্য পিসি ব্যবহার করুন</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsCardGenerator;
