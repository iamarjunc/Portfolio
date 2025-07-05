document.addEventListener('DOMContentLoaded', () => {

    console.log("Portfolio script loaded. Initializing...");

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });
    }

    // --- Mouse Follower Glow & Click Effect ---
    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', e => {
        glow.style.left = `${e.pageX}px`;
        glow.style.top = `${e.pageY}px`;
    });
    document.addEventListener('mousedown', () => glow.classList.add('clicked'));
    document.addEventListener('mouseup', () => glow.classList.remove('clicked'));

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Typing Effect ---
    const subtitleElement = document.getElementById('hero-subtitle');
    const roles = ["AI and Data Engineer", "Full Stack Developer", "Artist", "Fitness Enthusiast"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function typeEffect() {
        if (!subtitleElement) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            subtitleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeEffect, isDeleting ? 75 : 150);
    }
    typeEffect();


    // --- DYNAMIC PROJECT CARD & MODAL LOGIC ---
    const projectData = [
        {
            title: "E-commerce Website",
            description: "A fully-functional e-commerce platform with user auth, product listings, and PayPal integration.",
            image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
            challenge: "To build a robust, scalable online store from scratch, handling everything from user authentication to secure payment processing. The primary challenge was ensuring a seamless user experience across the entire shopping journey.",
            solution: "Developed a full-stack application using React for a dynamic, responsive frontend and Django REST Framework for a secure backend. Implemented JWT for user authentication and integrated PayPal's API for reliable payment transactions. The system features product catalogs, a shopping cart, and an order management system.",
            tech: ["React", "Django", "PostgreSQL", "PayPal API", "JWT"],
            liveLink: "https://e-k-art.vercel.app/home/",
            githubLink: "https://github.com/iamarjunc/eKArt"
        },
        {
            title: "Stock Prediction Portal",
            description: "A platform using Django REST and React to predict stock trends with LSTM models and JWT auth.",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
            challenge: "The goal was to create a user-friendly platform that could provide stock trend predictions. The main technical hurdle was to process time-series financial data and apply a machine learning model to generate accurate forecasts.",
            solution: "An LSTM (Long Short-Term Memory) neural network was trained on historical stock data to predict future price movements. The model was served via a Django REST API, which was consumed by a React frontend. JWT authentication secures user access to the prediction data.",
            tech: ["React", "Django REST", "LSTM", "TensorFlow", "Pandas", "JWT"],
            liveLink: null,
            githubLink: "https://github.com/iamarjunc/stock-prediction-portal"
        },
        {
            title: "SAP Integration System",
            description: "A multi-tenant DRF project enabling client-specific data handling, secured with JWT authentication.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            challenge: "Clients needed a cost-effective way to interact with their SAP B1 data without purchasing expensive licenses for every user. The system had to be multi-tenant, ensuring each client's data was completely isolated and secure.",
            solution: "A multi-tenant architecture was designed using Django and Django REST Framework. Each client is treated as a separate tenant with a dedicated schema in the PostgreSQL database. This isolates data effectively while allowing for a single, maintainable codebase. JWT provides secure, role-based access for each client's users.",
            tech: ["Django REST", "Multitenancy", "PostgreSQL", "JWT", "SAP B1 SDK"],
            liveLink: null,
            githubLink: null
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    const modal = document.getElementById('project-modal');

    function generateProjectCards() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        projectData.forEach((project, index) => {
            const techStackHTML = project.tech.map(t => `<span>${t}</span>`).join('');
            const liveLinkHTML = project.liveLink ? `<a href="${project.liveLink}" class="btn-secondary" target="_blank">Live Demo</a>` : '';
            const githubLinkHTML = project.githubLink ? `<a href="${project.githubLink}" class="btn-secondary" target="_blank">GitHub</a>` : '';

            const cardHTML = `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">${techStackHTML}</div>
                    <div class="project-links">
                        <a href="#" class="btn-secondary project-details-btn" data-project-id="${index}">Details</a>
                        ${liveLinkHTML}
                        ${githubLinkHTML}
                    </div>
                </div>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    function setupModal() {
        if (!modal || !projectsGrid) return;
        const modalCloseBtn = modal.querySelector('.modal-close');

        projectsGrid.addEventListener('click', (e) => {
            if (e.target.matches('.project-details-btn')) {
                e.preventDefault();
                e.stopPropagation(); // Good practice to prevent other events
                
                console.log("Details button clicked. Event listener is working."); // DEBUG MESSAGE

                const projectId = e.target.dataset.projectId;
                const data = projectData[projectId];

                modal.querySelector('#modal-img').src = data.image;
                modal.querySelector('#modal-title').textContent = data.title;
                modal.querySelector('#modal-challenge').textContent = data.challenge;
                modal.querySelector('#modal-solution').textContent = data.solution;
                
                const techStackContainer = modal.querySelector('#modal-tech-stack');
                techStackContainer.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

                const linksContainer = modal.querySelector('#modal-links');
                const liveLinkHTML = data.liveLink ? `<a href="${data.liveLink}" class="btn-secondary" target="_blank">Live Demo</a>` : '';
                const githubLinkHTML = data.githubLink ? `<a href="${data.githubLink}" class="btn-secondary" target="_blank">GitHub</a>` : '';
                linksContainer.innerHTML = liveLinkHTML + githubLinkHTML;

                modal.style.display = 'flex';
                document.body.classList.add('modal-open');
                setTimeout(() => modal.classList.add('visible'), 10);
            }
        });

        const closeModal = () => {
            modal.classList.remove('visible');
            document.body.classList.remove('modal-open');
            setTimeout(() => modal.style.display = 'none', 300);
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === "Escape" && modal.classList.contains('visible')) closeModal(); });
    }

    // --- MOBILE NAVIGATION LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if(mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('mobile-nav-active');
        });

        mobileNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('mobile-nav-active');
            });
        });
    }

    // --- Intersection Observer for Fade-in Animations & Active Nav ---
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const itemsToAnimate = entry.target.querySelectorAll('.skill-category, .job, .project-card, .art-life-card, .testimonial-card');
                itemsToAnimate.forEach((item, index) => {
                    item.style.animationDelay = `${index * 100}ms`;
                });

                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => link.classList.remove('active'));
                const correspondingLinks = document.querySelectorAll(`.nav-link[href="#${id}"]`);
                correspondingLinks.forEach(link => link.classList.add('active'));
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- Initializations ---
    generateProjectCards();
    setupModal();
});
