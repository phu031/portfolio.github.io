
// ==============================
// 1. MOBILE MENU
// ==============================
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Đóng menu" : "Mở menu"
        );
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Mở menu");
        });
    });

    document.addEventListener("click", event => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedMenuButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            navMenu.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
}


// ==============================
// 2. DARK MODE / LIGHT MODE
// ==============================
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

function updateThemeIcon() {
    if (!themeIcon) return;

    themeIcon.textContent = body.classList.contains("light-mode")
        ? "☾"
        : "☀";
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
    } else {
        body.classList.remove("light-mode");
    }

    updateThemeIcon();
}

applySavedTheme();

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        const currentTheme = body.classList.contains("light-mode")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);
        updateThemeIcon();
    });
}


// ==============================
// 3. PROJECT FILTER
// ==============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectRows = document.querySelectorAll(".project-row");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Bỏ trạng thái active ở các nút khác
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Đánh dấu nút đang được chọn
        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        // Lọc các dòng trong bảng dự án
        projectRows.forEach(row => {
            const category = row.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                row.classList.remove("hidden");
            } else {
                row.classList.add("hidden");
            }
        });
    });
});


// ==============================
// 4. SCROLL REVEAL
// ==============================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// ==============================
// 5. SCROLL PROGRESS
// ==============================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();


// ==============================
// 6. BACK TO TOP
// ==============================
const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", updateBackToTop);
updateBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ==============================
// 7. CURRENT YEAR
// ==============================
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==============================
// 8. ACTIVE NAVIGATION
// ==============================
const pageSections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    const currentPosition = window.scrollY + 150;

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            currentPosition >= sectionTop &&
            currentPosition < sectionBottom
        ) {
            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


// ==============================
// 9. CONTACT FORM
// ==============================
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        // Kiểm tra dữ liệu
        if (!name || !email || !message) {
            if (formNote) {
                formNote.textContent = "Vui lòng nhập đầy đủ thông tin.";
            }
            return;
        }

        // Kiểm tra định dạng email cơ bản
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            if (formNote) {
                formNote.textContent = "Địa chỉ email chưa hợp lệ.";
            }
            return;
        }

        // Tạo nội dung email
        const receiver = "hoangphu31206@gmail.com";
        const subject = encodeURIComponent(
            `Portfolio - Tin nhắn từ ${name}`
        );

        const emailBody = encodeURIComponent(
            `Họ và tên: ${name}\n` +
            `Email: ${email}\n\n` +
            `Nội dung:\n${message}`
        );

        const mailtoLink =
            `mailto:${receiver}?subject=${subject}&body=${emailBody}`;

        if (formNote) {
            formNote.textContent =
                "Đang mở ứng dụng email của bạn...";
        }

        // Mở ứng dụng email mặc định
        window.location.href = mailtoLink;
    });
}
