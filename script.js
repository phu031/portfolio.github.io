
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");
const progressBar = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

document.getElementById("year").textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Mở menu");
        menuBtn.textContent = "☰";
    });
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
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

document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
    revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");

function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;

    backToTop.classList.toggle("show", scrollTop > 400);

    let currentSection = "home";

    sections.forEach((section) => {
        if (scrollTop >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateScrollEffects, {
    passive: true
});

updateScrollEffects();

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Vui lòng điền đầy đủ thông tin.";
        return;
    }

    const subject = encodeURIComponent(`Lời nhắn từ ${name}`);
    const body = encodeURIComponent(
        `Họ tên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`
    );

    formStatus.textContent =
        "Đang mở ứng dụng email để bạn gửi lời nhắn...";

    window.location.href =
        `mailto:hoangphu31206@gamil.com?subject=${subject}&body=${body}`;
});
