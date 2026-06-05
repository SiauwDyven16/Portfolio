/**
 * projects.js
 * ============
 * File ini adalah "database" dari semua project Anda.
 * Untuk menambah project baru, cukup tambahkan objek baru ke dalam array `projects` di bawah.
 *
 * PANDUAN FIELD:
 * - id          : (string) ID unik project, digunakan di URL. Gunakan huruf kecil dan tanda hubung. Contoh: 'radiocast-app'
 * - title       : (string) Nama project.
 * - coverImage  : (string) Path ke gambar cover project.
 * - coverBg     : (string) Warna background cover jika gambar belum ada. Contoh: 'bg-black', 'bg-white'
 * - role        : (string) Peran Anda di project ini.
 * - year        : (string) Tahun project.
 * - client      : (string) Nama klien atau perusahaan.
 * - liveUrl     : (string | null) URL ke live site. Isi 'null' jika tidak ada.
 * - overview    : (string[]) Array paragraph untuk bagian Overview.
 * - gallery     : (string[]) Array path gambar untuk galeri showcase. Bisa lebih dari 3.
 */

const projects = [
    {
        id: 'radiocast',
        title: 'RadioCast',
        coverImage: '../assets/images/Radiocast/Radiocast-Cover.webp',
        coverBg: 'bg-white',
        role: 'UI/UX Designer',
        year: '2026',
        client: 'SBXone',
        liveUrl: null,
        overview: [
            'Radiocast adalah sebuah aplikasi pemutar radio streaming yang dirancang untuk memberikan pengalaman mendengarkan radio yang modern dan intuitif.',
            'Project ini berfokus pada kemudahan navigasi dan tampilan yang bersih, memungkinkan pengguna untuk menemukan dan mendengarkan stasiun radio favorit mereka dengan cepat.',
        ],
        gallery: ['../assets/images/Radiocast/Radiocast-Home.webp', '../assets/images/Radiocast/Radiocast-onboard.jpg', '../assets/images/Radiocast/Radiocast-home.jpg'],
    },
    {
        id: 'xpandable',
        title: 'Xpandable',
        coverImage: '../assets/images/Xpandable-Cover.jpg',
        coverBg: 'bg-black',
        role: 'UI/UX Designer & Front-end Developer',
        year: '2026',
        client: 'SBXone',
        liveUrl: null,
        overview: [
            'Xpandable adalah platform yang dirancang untuk membantu UMKM mengembangkan kehadiran digital mereka dengan tools yang mudah digunakan.',
            'Saya bertanggung jawab atas keseluruhan desain UI/UX dari penelitian pengguna hingga pembuatan prototype interaktif di Figma.',
        ],
        gallery: ['../assets/images/Xpandable-Cover.jpg'],
    },
    {
        id: 'thinker',
        title: 'Thinker',
        coverImage: '../assets/images/Thinker-Cover.jpg',
        coverBg: 'bg-white',
        role: 'UI/UX Designer',
        year: '2026',
        client: 'SBXone',
        liveUrl: null,
        overview: [
            'Thinker adalah aplikasi journaling dan manajemen ide yang membantu pengguna mengorganisir pikiran mereka secara visual.',
            'Desain berfokus pada pengalaman menulis yang tenang dan bebas gangguan, dengan fitur kategorisasi dan tagging yang intuitif.',
        ],
        gallery: ['../assets/images/Thinker-Cover.jpg'],
    },
    {
        id: 'gjf',
        title: 'Global Journalist Federation',
        coverImage: '../assets/images/GJF-Cover.jpg',
        coverBg: 'bg-white',
        role: 'UI/UX Designer',
        year: '2026',
        client: 'SBXone',
        liveUrl: null,
        overview: [
            'GJF adalah sebuah platform yang menghubungkan para freelancer dengan klien potensial di Indonesia.',
            'Project ini menekankan pada kemudahan proses onboarding bagi freelancer baru dan sistem pencarian yang cerdas untuk klien.',
        ],
        gallery: ['../assets/images/GJF-Cover.jpg'],
    },
];
