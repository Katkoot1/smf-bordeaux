// Configuration EmailJS - Seulement si nécessaire
function initEmailJS() {
    // Vérifier si EmailJS est disponible et si on a un formulaire de contact
    if (typeof emailjs !== 'undefined' && document.getElementById('contact-form')) {
        emailjs.init({
            publicKey: "R8lXCtn2Vc6Dy3A0D",
        });
    }
}

// Initialisation générale du site
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScrollEffects();
    initStatsCounter();
});

// Menu hamburger pour mobile - Version robuste
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) {
        console.log('Éléments navbar non trouvés');
        return;
    }

    console.log('Initialisation du menu mobile');

    // Toggle du menu principal
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
        
        // Animation du hamburger
        animateHamburger(true);
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restaurer le scroll
        
        // Reset hamburger animation
        animateHamburger(false);
    }

    function animateHamburger(isActive) {
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (isActive) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    }

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Gestion des dropdowns en mobile
    initMobileDropdowns();
}

// Gestion des dropdowns spécifiques au mobile
function initMobileDropdowns() {
    // Vérifier si on est sur mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (!dropdownToggle || !dropdownMenu) return;

        // Gestion du clic sur mobile et desktop
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class
            const isActive = dropdown.classList.contains('active');
            
            // Fermer les autres dropdowns avec animation
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                    
                    // Délai pour laisser l'animation se terminer
                    setTimeout(() => {
                        const otherLinks = otherDropdown.querySelectorAll('.dropdown-link');
                        otherLinks.forEach(link => {
                            link.style.transitionDelay = '0s';
                        });
                    }, 100);
                }
            });
            
            // Toggle le dropdown actuel
            if (isActive) {
                dropdown.classList.remove('active');
            } else {
                dropdown.classList.add('active');
                
                // Animer les liens avec délai progressif
                if (isMobile()) {
                    setTimeout(() => {
                        const links = dropdown.querySelectorAll('.dropdown-link');
                        links.forEach((link, index) => {
                            link.style.transitionDelay = `${0.1 + index * 0.05}s`;
                        });
                    }, 50);
                }
            }
            
            // Feedback tactile pour mobile
            if (navigator.vibrate && isMobile()) {
                navigator.vibrate(50);
            }
        });

        // Gestion du touch sur mobile pour feedback visuel
        dropdownToggle.addEventListener('touchstart', function(e) {
            if (isMobile()) {
                this.style.transform = 'scale(0.95)';
            }
        });

        dropdownToggle.addEventListener('touchend', function(e) {
            if (isMobile()) {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // Fermer les dropdowns si on clique ailleurs
    document.addEventListener('click', function(e) {
        const clickedInsideDropdown = e.target.closest('.dropdown');
        if (!clickedInsideDropdown) {
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    
                    // Reset transition delays
                    setTimeout(() => {
                        const links = dropdown.querySelectorAll('.dropdown-link');
                        links.forEach(link => {
                            link.style.transitionDelay = '0s';
                        });
                    }, 400);
                }
            });
        }
    });

    // Fermer les dropdowns avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Réinitialiser les dropdowns lors du redimensionnement
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                
                // Reset styles
                const links = dropdown.querySelectorAll('.dropdown-link');
                links.forEach(link => {
                    link.style.transitionDelay = '0s';
                });
            });
        }
    });

    // Debug logging pour diagnostic
    console.log(`Dropdown mobile initialisé pour ${dropdowns.length} dropdown(s)`);
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.log('Formulaire de contact non trouvé sur cette page');
        return;
    }

    // Vérifier si EmailJS est disponible
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS non disponible');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Animation de chargement
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Préparation des données du formulaire
        const formData = new FormData(this);
        const templateParams = {
            to_email: 'smfbordeaux@gmail.com',
            from_name: formData.get('user_name'),
            from_email: formData.get('user_email'),
            phone: formData.get('user_phone') || 'Non fourni',
            age_group: formData.get('age_group'),
            message: formData.get('message') || 'Aucun message spécifique.',
            reply_to: formData.get('user_email')
        };
        
        // Envoi EmailJS
        emailjs.send('service_addb2pg', 'template_39nzsbp', templateParams)
            .then(function(response) {
                console.log('✅ Email envoyé avec succès!', response.status, response.text);
                submitBtn.textContent = '✅ Message envoyé !';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, function(error) {
                console.log('❌ Erreur d\'envoi:', error);
                submitBtn.textContent = '❌ Erreur d\'envoi';
                submitBtn.style.background = '#dc3545';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
}

// Smooth scroll pour les liens d'ancrage
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('value-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observer les cartes d'activités
    document.querySelectorAll('.activity-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer les éléments de valeurs
    document.querySelectorAll('.value-item').forEach(item => {
        observer.observe(item);
    });

    // Observer spécial pour la section valeurs
    const valuesSection = document.querySelector('.values');
    if (valuesSection) {
        const valuesObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
        
        valuesObserver.observe(valuesSection);
    }
}

// Effets de scroll sur le header
function initHeaderScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Effet parallax sur la section héros - DÉSACTIVÉ pour stabilité
/*
document.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroSection.style.backgroundPosition = `center ${rate}px`;
    }
});
*/

// Animation des compteurs de statistiques
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statNumbers = statsSection.querySelectorAll('.stat-number');
    const statItems = statsSection.querySelectorAll('.stat-item');
    let hasAnimated = false;

    const animateCounter = (element, target) => {
        const duration = 2000; // 2 secondes
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                
                // Ajouter le "+" pour les valeurs qui en ont besoin
                if (target === 50 || target === 3000 || target === 500 || target === 30) {
                    element.textContent = Math.floor(current) + '+';
                } else {
                    element.textContent = Math.floor(current);
                }
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animer l'apparition de la section
                statsSection.classList.add('animate');
                
                // Animer l'apparition des éléments individuels
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
                
                // Démarrer l'animation des compteurs avec un délai
                setTimeout(() => {
                    statNumbers.forEach((statNumber, index) => {
                        setTimeout(() => {
                            const target = parseInt(statNumber.getAttribute('data-target'));
                            animateCounter(statNumber, target);
                        }, index * 200); // 200ms de délai entre chaque compteur
                    });
                }, 500); // Attendre que l'animation d'apparition soit terminée
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(statsSection);
} 