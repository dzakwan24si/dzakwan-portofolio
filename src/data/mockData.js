const socials = {
  github: "https://github.com/dzakwan24si",
  linkedin: "https://linkedin.com/in/m-dzakwan-syafiq",
  email: "mdzakwanpku03@gmail.com",
  instagram: "https://instagram.com/dzakwan"
};

const EN = {
  profile: {
    name: "M. Dzakwan Syafiq",
    role: "Undergraduate Student • Full Stack Developer",
    photo: "/images/profile1.png",
    about: "I'm a fifth-semester Information Systems student at Politeknik Caltex Riau with a strong foundation in backend web development and system analysis. I am proficient in building robust applications using PHP frameworks (Laravel), React, and MySQL. I combine technical problem-solving skills with a strong track record of leadership and teamwork in large-scale organizational events, aiming to build scalable tech solutions.",
    stats: [
      { label: "GPA", value: "3.73" },
      { label: "PROJECTS", value: "4+" },
      { label: "AWARDS", value: "2" },
    ],
    currently: [
      { icon: "code", title: "Building", subtitle: "Full Stack Applications" },
      { icon: "test", title: "Exploring", subtitle: "Explainable AI (XAI)" },
      { icon: "learn", title: "Leading", subtitle: "Campus Organizations" },
    ],
    traits: ["Problem Solver", "Leader", "Detail-Oriented"]
  },
  projects: [
    {
      id: 1,
      title: "Kucek.in CRM & Admin Dashboard",
      tech: ["React.js", "Tailwind CSS", "Vite"],
      image: "/images/Slide 1 (1).png",
      description: "Developed a modern, SaaS-style Customer Relationship Management (CRM) and admin dashboard tailored for laundry business operations. Implemented dynamic routing and lazy loading.",
    },
    {
      id: 2,
      title: "Explainable AI Deep Audio Learning",
      tech: ["Python", "Laravel", "Deep Learning"],
      image: "/images/new_inventaris.png",
      description: "Designing a multitask deep audio learning framework utilizing XAI for transparent feature interpretation. Engineered a custom web-based data collection portal using Laravel.",
    },
    {
      id: 3,
      title: "Sistem Informasi Inventaris & Aset Desa",
      tech: ["Laravel", "MySQL", "Bootstrap"],
      image: "/images/LPKasir.png",
      description: "Developed a comprehensive web-based platform to assist village officials in managing digital assets with full CRUD functionalities and automated stock management.",
    },
    {
      id: 4,
      title: "TemanJasa — Gig Economy App",
      tech: ["Figma", "UI/UX", "Prototyping"],
      image: "/images/galeri2.jpg",
      description: "Designed a mobile application UI/UX aimed at connecting student service providers with local MSMEs. Engineered a streamlined service-matching interface.",
    }
  ],
  archive: [
    {
      id: "01",
      title: "Kucek.in CRM & Admin Dashboard",
      description: "Developed a modern, SaaS-style Customer Relationship Management (CRM) and admin dashboard tailored for laundry business operations. Implemented dynamic routing for seamless order tracking and utilized lazy loading techniques to optimize Single Page Application (SPA) performance.",
      category: "REACT & TAILWIND",
      tech: ["react", "tailwindcss", "javascript"]
    },
    {
      id: "02",
      title: "Explainable AI Multitask Deep Audio Learning",
      description: "Designing a multitask deep audio learning framework to model emotional fatigue and cognitive load. Engineered a custom web-based data collection portal using Laravel to gather bilingual audio datasets, architecting the pipeline for audio chunking and feature extraction.",
      category: "PYTHON & LARAVEL",
      tech: ["python", "laravel", "php"]
    },
    {
      id: "03",
      title: "Sistem Informasi Inventaris & Aset Desa",
      description: "Developed a comprehensive web-based platform to assist village officials in managing digital assets and inventory. Implemented full CRUD functionalities, automated stock management, and dynamic reporting features.",
      category: "LARAVEL & MYSQL",
      tech: ["laravel", "php", "mysql", "html5"]
    },
    {
      id: "04",
      title: "TemanJasa — Gig Economy App",
      description: "Designed a mobile application UI/UX aimed at connecting student service providers with local MSMEs. Conducted comprehensive user research to identify pain points and engineered a streamlined service-matching interface.",
      category: "UI/UX DESIGN",
      tech: ["figma"]
    }
  ],
  capabilities: {
    subtitle: "MY CAPABILITIES",
    title: "What I Can Do",
    description: "I combine technical development skills with networking knowledge to build reliable web applications and manage IT infrastructures.",
    techIcons: [
      "html5", "css3", "javascript", "typescript", "react", "next.js",
      "tailwindcss", "php", "laravel", "mysql", "postgresql", "supabase",
      "python", "machine learning", "figma", "behance", "github", "vercel"
    ],
    cards: [
      {
        id: "01",
        title: "WEB & BACKEND\nDEVELOPMENT",
        icon: "code",
        description: "Building robust, database-driven applications and dynamic frontends. Proficient in crafting scalable system architectures and optimizing performance.",
        skills: ["PHP", "Laravel", "CodeIgniter", "React.js", "MySQL", "Tailwind CSS", "Bootstrap"]
      },
      {
        id: "02",
        title: "IT NETWORK &\nOPERATIONS",
        icon: "design",
        description: "Managing computer network infrastructures, performing hardware/software troubleshooting, and configuring routers for enterprise and field operations.",
        skills: ["Networking", "Troubleshooting", "Router Configuration", "Crimping", "IT Support"]
      }
    ]
  },
  trainings: [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      organization: "First Resources Academy",
      date: "Aug 2026 - Present",
      description: "Developing and maintaining dynamic web applications utilizing both frontend and backend technologies (Laravel, React, MySQL). Collaborating with the development team to design scalable architecture and optimize system performance for internal academy operations.",
      links: [],
      image: "/images/galeri2.jpg"
    },
    {
      id: 2,
      title: "IT Support Intern",
      organization: "Dinas Komunikasi Informatika dan Statistika Provinsi Riau",
      date: "Jan - Jun 2023",
      description: "Maintained computer networks and performed basic hardware/software troubleshooting. Assisted the networking division in preparing meeting rooms, supporting devices, and checking internal network connections.",
      links: [],
      image: "/images/galeri8.jpg"
    },
    {
      id: 3,
      title: "Head Volunteer",
      organization: "Bimbingan Teknis Bersama Badan Gizi Nasional (PT. Kreen Indonesia)",
      date: "2025",
      description: "Led a volunteer team for a national event in the Riau region, acting as the main liaison between committees, participants, and external organizers.",
      links: [],
      image: "/images/galeri3.jpg"
    },
    {
      id: 4,
      title: "Logistics & Equipment Team",
      organization: "Cisco Conference",
      date: "2026",
      description: "Managed technical equipment, networking setups, and logistical preparations for a campus-wide technology conference.",
      links: [],
      image: "/images/galeri1.jpg"
    },
    {
      id: 5,
      title: "Academic Administration (BAAK)",
      organization: "Wisuda PCR (2025)",
      date: "2025",
      description: "Managed graduate administration data and coordinated with academic departments for document preparation.",
      links: [],
      image: "/images/galeri5.jpg"
    },
    {
      id: 6,
      title: "Task Division",
      organization: "Informative Study Orientation / ISO PCR (2025)",
      date: "2025",
      description: "Designed and implemented various forms of assignments for new students. Ensured that the assigned tasks had educational purposes, built character, and supported an understanding of university life.",
      links: [],
      image: "/images/IMG_6499.jpg"
    },
    {
      id: 7,
      title: "Tim Sumatera Career Center (SCC)",
      organization: "Sumatera Career Center",
      date: "Mar - Nov 2025",
      description: "Assisted in organizing events that bridge students with the professional world. Coordinated with the team to manage the technical and administrative needs of the activities and welcomed visiting companies.",
      links: [],
      image: "/images/galeri8.jpg"
    }
  ],
  trainingsHeader: {
    subtitle: "GROWTH & EXPERIENCE",
    title: "Experiences & Trainings",
    description: "A collection of trainings, workshops, and experiences that shaped my technical and collaborative skills."
  },
  recognition: {
    subtitle: "RECOGNITION",
    title: "Honors and Awards",
    description: "A collection of academic and professional recognitions that reflect my dedication to excellence and continuous improvement.",
    list: [
      { id: 1, title: "Silver Medal - GINECO 2024", icon: "academic", link: "/files/Silver Awardees Certificate.pdf" },
      { id: 2, title: "Best Video - GINECO 2024", icon: "trophy", link: "/files/Best Video Certificate.pdf" },
      { id: 3, title: "KKNI Level II Certification in Computer & Network Engineering", icon: "academic", link: "/files/Sertifikat LSP.pdf" }
    ],
    gallery: [
      { id: 1, title: "Medali GINECO", image: "/images/galeri1.jpg" },
      { id: 2, title: "Dokumentasi", image: "/images/galeri2.jpg" },
      { id: 3, title: "Dokumentasi", image: "/images/galeri3.jpg" },
      { id: 4, title: "Dokumentasi", image: "/images/IMG_6499.jpg" },
      { id: 5, title: "Dokumentasi", image: "/images/galeri5.jpg" },
      { id: 6, title: "Dokumentasi", image: "/images/galeri8.jpg" }
    ]
  },
  header: {
    nav: ["PROJECTS", "SERVICES", "ABOUT", "AWARDS", "EXPERIENCE"],
    hireMe: "Hire Me"
  },
  footer: {
    getInTouch: "GET IN TOUCH",
    letsWork: "LET'S\nWORK\nTOGETHER",
    lookingFor: "Looking for the next problem worth solving.",
    openTo: "I'm open to opportunities where I can contribute to software testing, web development, IT operations, and digital workflows.",
    download: "DOWNLOAD RESUME \u2192",
    sendMessage: "SEND ME A MESSAGE \u2192"
  },
  general: {
    viewProject: "View Project",
    viewMoreProjects: "View More Projects",
    viewAllExperience: "VIEW ALL EXPERIENCE \u2192"
  }
};

const ID = {
  profile: {
    name: "M. Dzakwan Syafiq",
    role: "Mahasiswa S1 Terapan • Full Stack Developer",
    photo: "/images/profile1.png",
    about: "Saya adalah mahasiswa semester lima Program Studi Sistem Informasi di Politeknik Caltex Riau dengan landasan kuat di bidang pengembangan web backend dan analisis sistem. Saya mahir dalam membangun aplikasi yang tangguh menggunakan framework PHP (Laravel), React, dan MySQL. Saya memadukan kemampuan pemecahan masalah teknis dengan rekam jejak kepemimpinan dan kerja sama tim yang kuat di acara-acara organisasi skala besar, dengan tujuan untuk membangun solusi teknologi yang dapat dikembangkan secara berkelanjutan.",
    stats: [
      { label: "IPK", value: "3.73" },
      { label: "PROYEK", value: "7+" },
      { label: "PENGHARGAAN", value: "4" },
    ],
    currently: [
      { icon: "code", title: "Membangun", subtitle: "Aplikasi Full Stack" },
      { icon: "test", title: "Mengeksplorasi", subtitle: "Explainable AI (XAI)" },
      { icon: "learn", title: "Memimpin", subtitle: "Organisasi Kampus" },
    ],
    traits: ["Pemecah Masalah", "Pemimpin", "Berorientasi Detail"]
  },
  projects: [
    {
      id: 1,
      title: "Kucek.in CRM & Admin Dashboard",
      tech: ["React.js", "Tailwind CSS", "Vite"],
      image: "/images/Slide 1 (1).png",
      description: "Mengembangkan aplikasi Customer Relationship Management (CRM) dan dashboard admin modern bergaya SaaS yang disesuaikan untuk operasional bisnis laundry. Mengimplementasikan dynamic routing dan lazy loading.",
    },
    {
      id: 2,
      title: "Explainable AI Deep Audio Learning",
      tech: ["Python", "Laravel", "Deep Learning"],
      image: "/images/new_inventaris.png",
      description: "Merancang kerangka kerja pembelajaran audio mendalam multitask menggunakan XAI untuk interpretasi fitur yang transparan. Merekayasa portal pengumpulan data berbasis web kustom menggunakan Laravel.",
    },
    {
      id: 3,
      title: "Sistem Informasi Inventaris & Aset Desa",
      tech: ["Laravel", "MySQL", "Bootstrap"],
      image: "/images/LPKasir.png",
      description: "Mengembangkan platform berbasis web komprehensif untuk membantu aparat desa mengelola aset digital dengan fungsionalitas CRUD penuh dan manajemen stok otomatis.",
    },
    {
      id: 4,
      title: "TemanJasa — Aplikasi Gig Economy",
      tech: ["Figma", "UI/UX", "Prototyping"],
      image: "/images/galeri2.jpg",
      description: "Merancang UI/UX aplikasi mobile yang bertujuan untuk menghubungkan penyedia jasa mahasiswa dengan UMKM lokal. Merekayasa antarmuka pencocokan layanan yang efisien.",
    }
  ],
  archive: [
    {
      id: "01",
      title: "Kucek.in CRM & Admin Dashboard",
      description: "Mengembangkan Customer Relationship Management (CRM) dan dashboard admin modern bergaya SaaS yang disesuaikan untuk operasional bisnis laundry. Mengimplementasikan dynamic routing untuk pelacakan pesanan yang mulus dan memanfaatkan teknik lazy loading untuk mengoptimalkan kinerja Single Page Application (SPA).",
      category: "REACT & TAILWIND",
      tech: ["react", "tailwindcss", "javascript"]
    },
    {
      id: "02",
      title: "Explainable AI Multitask Deep Audio Learning",
      description: "Merancang kerangka kerja pembelajaran audio mendalam multitask untuk memodelkan kelelahan emosional dan beban kognitif. Merekayasa portal pengumpulan data berbasis web menggunakan Laravel untuk mengumpulkan dataset audio bilingual, merancang alur kerja untuk pemotongan audio dan ekstraksi fitur.",
      category: "PYTHON & LARAVEL",
      tech: ["python", "laravel", "php"]
    },
    {
      id: "03",
      title: "Sistem Informasi Inventaris & Aset Desa",
      description: "Mengembangkan platform berbasis web komprehensif untuk membantu aparat desa mengelola aset digital dan inventaris. Mengimplementasikan fungsionalitas CRUD penuh, manajemen stok otomatis, dan fitur pelaporan dinamis.",
      category: "LARAVEL & MYSQL",
      tech: ["laravel", "php", "mysql", "html5"]
    },
    {
      id: "04",
      title: "TemanJasa — Aplikasi Gig Economy",
      description: "Merancang UI/UX aplikasi mobile yang bertujuan untuk menghubungkan penyedia jasa mahasiswa dengan UMKM lokal. Melakukan riset pengguna komprehensif untuk mengidentifikasi kelemahan dan merekayasa antarmuka pencocokan layanan yang efisien.",
      category: "DESAIN UI/UX",
      tech: ["figma"]
    }
  ],
  capabilities: {
    subtitle: "KEMAMPUAN SAYA",
    title: "Apa Yang Bisa Saya Lakukan",
    description: "Saya memadukan kemampuan pengembangan teknis dengan pengetahuan jaringan komputer untuk membangun aplikasi web yang andal dan mengelola infrastruktur TI.",
    techIcons: [
      "html5", "css3", "javascript", "typescript", "react", "next.js",
      "tailwindcss", "php", "laravel", "mysql", "postgresql", "supabase",
      "python", "machine learning", "figma", "behance", "github", "vercel"
    ],
    cards: [
      {
        id: "01",
        title: "PENGEMBANGAN\nWEB & BACKEND",
        icon: "code",
        description: "Membangun aplikasi tangguh berbasis basis data dan frontend yang dinamis. Mahir dalam merancang arsitektur sistem yang dapat diskalakan dan mengoptimalkan kinerja.",
        skills: ["PHP", "Laravel", "CodeIgniter", "React.js", "MySQL", "Tailwind CSS", "Bootstrap"]
      },
      {
        id: "02",
        title: "JARINGAN TI &\nOPERASIONAL",
        icon: "design",
        description: "Mengelola infrastruktur jaringan komputer, melakukan pemecahan masalah perangkat keras/lunak, dan mengonfigurasi router untuk operasi perusahaan dan lapangan.",
        skills: ["Networking", "Troubleshooting", "Konfigurasi Router", "Crimping", "IT Support"]
      }
    ]
  },
  trainings: [
    {
      id: 1,
      title: "Full Stack Developer (Magang)",
      organization: "First Resources Academy",
      date: "Agu 2026 - Sekarang",
      description: "Mengembangkan dan memelihara aplikasi web dinamis menggunakan teknologi frontend dan backend (Laravel, React, MySQL). Berkolaborasi dengan tim pengembang untuk merancang arsitektur yang skalabel dan mengoptimalkan kinerja sistem untuk operasional internal akademi.",
      links: [],
      image: "/images/galeri2.jpg"
    },
    {
      id: 2,
      title: "IT Support (Magang)",
      organization: "Dinas Komunikasi Informatika dan Statistika Provinsi Riau",
      date: "Jan - Jun 2023",
      description: "Memelihara jaringan komputer dan melakukan pemecahan masalah perangkat keras/lunak dasar. Membantu divisi jaringan dalam menyiapkan ruang rapat, mendukung perangkat, dan memeriksa koneksi jaringan internal.",
      links: [],
      image: "/images/galeri8.jpg"
    },
    {
      id: 3,
      title: "Ketua Sukarelawan",
      organization: "Bimbingan Teknis Bersama Badan Gizi Nasional (PT. Kreen Indonesia)",
      date: "2025",
      description: "Memimpin tim sukarelawan untuk acara nasional di wilayah Riau, bertindak sebagai penghubung utama antara panitia, peserta, dan penyelenggara eksternal.",
      links: [],
      image: "/images/galeri3.jpg"
    },
    {
      id: 4,
      title: "Tim Logistik & Peralatan",
      organization: "Cisco Conference",
      date: "2026",
      description: "Mengelola peralatan teknis, pengaturan jaringan, dan persiapan logistik untuk konferensi teknologi tingkat kampus.",
      links: [],
      image: "/images/galeri1.jpg"
    },
    {
      id: 5,
      title: "Administrasi Akademik (BAAK)",
      organization: "Wisuda PCR (2025)",
      date: "2025",
      description: "Mengelola data administrasi kelulusan dan berkoordinasi dengan departemen akademik untuk persiapan dokumen.",
      links: [],
      image: "/images/galeri5.jpg"
    },
    {
      id: 6,
      title: "Divisi Tugas",
      organization: "Orientasi Studi Informatif / ISO PCR (2025)",
      date: "2025",
      description: "Merancang dan mengimplementasikan berbagai bentuk tugas untuk mahasiswa baru. Memastikan tugas yang diberikan memiliki tujuan pendidikan, membangun karakter, dan mendukung pemahaman tentang kehidupan universitas.",
      links: [],
      image: "/images/IMG_6499.jpg"
    },
    {
      id: 7,
      title: "Tim Sumatera Career Center (SCC)",
      organization: "Sumatera Career Center",
      date: "Mar - Nov 2025",
      description: "Membantu dalam mengorganisir acara yang menjembatani mahasiswa dengan dunia profesional. Berkoordinasi dengan tim untuk mengelola kebutuhan teknis dan administratif dari kegiatan serta menyambut perusahaan tamu.",
      links: [],
      image: "/images/galeri8.jpg"
    }
  ],
  trainingsHeader: {
    subtitle: "PERTUMBUHAN & PENGALAMAN",
    title: "Pengalaman & Pelatihan",
    description: "Kumpulan pelatihan, workshop, dan pengalaman yang membentuk keterampilan teknis dan kolaboratif saya."
  },
  recognition: {
    subtitle: "PENGHARGAAN",
    title: "Prestasi dan Penghargaan",
    description: "Kumpulan penghargaan akademik dan profesional yang mencerminkan dedikasi saya terhadap keunggulan dan perbaikan terus-menerus.",
    list: [
      { id: 1, title: "Medali Perak - GINECO 2024", icon: "academic", link: "/files/Silver Awardees Certificate.pdf" },
      { id: 2, title: "Video Terbaik - GINECO 2024", icon: "trophy", link: "/files/Best Video Certificate.pdf" },
      { id: 3, title: "Sertifikasi KKNI Level II Teknik Komputer Jaringan", icon: "academic", link: "/files/Sertifikat LSP.pdf" }
    ],
    gallery: [
      { id: 1, title: "Medali GINECO", image: "/images/galeri1.jpg" },
      { id: 2, title: "Dokumentasi", image: "/images/galeri2.jpg" },
      { id: 3, title: "Dokumentasi", image: "/images/galeri3.jpg" },
      { id: 4, title: "Dokumentasi", image: "/images/IMG_6499.jpg" },
      { id: 5, title: "Dokumentasi", image: "/images/galeri5.jpg" },
      { id: 6, title: "Dokumentasi", image: "/images/galeri8.jpg" }
    ]
  },
  header: {
    nav: ["PROYEK", "LAYANAN", "TENTANG", "PENGHARGAAN", "PENGALAMAN"],
    hireMe: "Rekrut Saya"
  },
  footer: {
    getInTouch: "HUBUNGI SAYA",
    letsWork: "MARI\nBEKERJA\nBERSAMA",
    lookingFor: "Mencari tantangan berikutnya yang pantas dipecahkan.",
    openTo: "Saya terbuka terhadap peluang di mana saya dapat berkontribusi pada pengujian perangkat lunak, pengembangan web, operasional TI, dan alur kerja digital.",
    download: "UNDUH CV \u2192",
    sendMessage: "KIRIM PESAN \u2192"
  },
  general: {
    viewProject: "Lihat Proyek",
    viewMoreProjects: "Lihat Semua Proyek",
    viewAllExperience: "LIHAT SEMUA PENGALAMAN \u2192"
  }
};

export const mockData = { EN, ID, socials };
