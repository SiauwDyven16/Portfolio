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

    const creatorEl = document.getElementById('project-creator');
    if (creatorEl) creatorEl.textContent = project.creator || '';

    // Render overview — supports both single <p> and multi-paragraph containers
    const overviewEl = document.getElementById('project-overview');
    if (overviewEl) {
        if (overviewEl.tagName === 'P') {
            // Single <p> element — join paragraphs with a space
            overviewEl.textContent = Array.isArray(project.overview)
                ? project.overview.join(' ')
                : project.overview;
        } else {
            // Container <div> — render each paragraph as a <p> tag
            overviewEl.innerHTML = project.overview.map(p => `<p>${p}</p>`).join('');
        }
    }

    // Render mockup images — inject into #project-mockup
    const mockupContainer = document.getElementById('project-mockup');
    if (mockupContainer) {
        const mockups = project.mockup || [];
        mockupContainer.innerHTML = '';
        mockups.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${project.title} Mockup ${index + 1}`;
            img.className = 'bg-white w-[200px] aspect-square rounded-xl object-cover object-center border border-border-default md:w-full md:aspect-none';
            mockupContainer.appendChild(img);
        });
    }

    // Render screen images — inject into #project-screen
    const screenContainer = document.getElementById('project-screen');
    if (screenContainer) {
        const screens = project.screen || [];
        screenContainer.innerHTML = '';
        screens.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${project.title} Screen ${index + 1}`;
            img.className = 'bg-white w-full rounded-lg object-contain object-center';
            screenContainer.appendChild(img);
        });
    }

    // --- 4. Render navigasi Previous / Next project ---
    const currentIndex = projects.findIndex(p => p.id === projectId);

    const prevProject = projects[currentIndex - 1] || null;
    const nextProject = projects[currentIndex + 1] || null;

    const prevLink = document.getElementById('nav-prev');
    const nextLink = document.getElementById('nav-next');

    if (prevLink) {
        if (prevProject) {
            prevLink.querySelector('a').href = `project-detail.html?id=${prevProject.id}`;
            prevLink.querySelector('a').textContent = prevProject.title;
        } else {
            prevLink.classList.add('opacity-30', 'pointer-events-none');
            prevLink.querySelector('a').textContent = '—';
        }
    }

    if (nextLink) {
        if (nextProject) {
            nextLink.querySelector('a').href = `project-detail.html?id=${nextProject.id}`;
            nextLink.querySelector('a').textContent = nextProject.title;
        } else {
            nextLink.classList.add('opacity-30', 'pointer-events-none');
            nextLink.querySelector('a').textContent = '—';
        }
    }
});
