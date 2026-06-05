/**
 * project-detail.js
 * ===================
 * Script ini membaca parameter `?id=...` dari URL,
 * mencari data project yang cocok dari projects.js,
 * lalu merender semua konten halaman detail secara otomatis.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Ambil ID project dari URL parameter ---
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // Jika tidak ada ID, redirect ke halaman utama
    if (!projectId) {
        window.location.href = 'index.html';
        return;
    }

    // --- 2. Cari data project dari array 'projects' di projects.js ---
    const project = projects.find(p => p.id === projectId);

    // Jika ID tidak ditemukan, redirect ke halaman utama
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    // --- 3. Render data ke halaman ---

    // Update judul tab browser
    document.title = `${project.title} - Dyven Siauw`;

    // Render headline title (1 baris)
    const titleEl = document.getElementById('project-title');
    titleEl.textContent = project.title;

    // Fungsi untuk menyesuaikan ukuran (scale) jika title terlalu panjang
    const adjustTitleSize = () => {
        titleEl.style.transform = 'none';
        const containerWidth = titleEl.parentElement.offsetWidth;
        const textWidth = titleEl.scrollWidth;

        if (textWidth > containerWidth) {
            const scale = containerWidth / textWidth;
            titleEl.style.transformOrigin = 'left center';
            titleEl.style.transform = `scale(${scale})`;
        }
    };

    // Jalankan penyesuaian saat halaman dimuat dan saat di-resize
    setTimeout(adjustTitleSize, 50); // delay kecil untuk memastikan font termuat
    window.addEventListener('resize', adjustTitleSize);

    // Render meta info
    document.getElementById('project-role').textContent = project.role;
    document.getElementById('project-year').textContent = project.year;
    document.getElementById('project-client').textContent = project.client;

    // Render live link
    const liveLink = document.getElementById('project-live-link');
    if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.textContent = 'View Live Site';
    } else {
        liveLink.textContent = 'Not Available';
        liveLink.classList.add('opacity-50', 'cursor-not-allowed');
        liveLink.removeAttribute('href');
    }

    // Render cover image
    const coverImg = document.getElementById('project-cover');
    coverImg.src = project.coverImage;
    coverImg.alt = `${project.title} Cover`;
    // Terapkan warna background cover
    // coverImg.className = `bg-border-default h-60 w-full rounded-lg object-cover object-center md:h-120 ${project.coverBg}`;

    // Render paragraf overview
    const overviewContainer = document.getElementById('project-overview');
    overviewContainer.innerHTML = project.overview.map(p => `<p>${p}</p>`).join('');

    // Render gallery
    const galleryContainer = document.getElementById('project-gallery');
    project.gallery.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${project.title} Showcase ${index + 1}`;
        // Gambar ke-3 dan seterusnya akan full-width di desktop
        const isWide = index >= 2;
        img.className = `bg-border-default h-60 w-full rounded-lg object-cover object-center md:h-100 ${isWide ? 'md:col-span-2' : ''}`;
        galleryContainer.appendChild(img);
    });

    // --- 4. Render navigasi Previous / Next project ---
    const currentIndex = projects.findIndex(p => p.id === projectId);

    const prevProject = projects[currentIndex - 1] || null;
    const nextProject = projects[currentIndex + 1] || null;

    const prevLink = document.getElementById('nav-prev');
    const nextLink = document.getElementById('nav-next');

    if (prevProject) {
        prevLink.querySelector('a').href = `project-detail.html?id=${prevProject.id}`;
        prevLink.querySelector('a').textContent = prevProject.title;
    } else {
        prevLink.classList.add('opacity-30', 'pointer-events-none');
        prevLink.querySelector('a').textContent = '—';
    }

    if (nextProject) {
        nextLink.querySelector('a').href = `project-detail.html?id=${nextProject.id}`;
        nextLink.querySelector('a').textContent = nextProject.title;
    } else {
        nextLink.classList.add('opacity-30', 'pointer-events-none');
        nextLink.querySelector('a').textContent = '—';
    }
});
