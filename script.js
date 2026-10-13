/* =========================================
   ФАЙЛ: script.js
   Назначение: Плавность и логика Telegram
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. МОБИЛЬНОЕ МЕНЮ ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // === 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ===
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => scrollObserver.observe(el));

    // === 3. АККОРДЕОН ДЛЯ ВОПРОСОВ ===
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.icon');
            
            // Закрываем остальные
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.maxHeight = '0px';
                    ans.classList.remove('open');
                    ans.previousElementSibling.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            // Открываем кликнутый
            if (!answer.classList.contains('open')) {
                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 50 + "px";
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.classList.remove('open');
                answer.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // === 4. УЛУЧШЕННАЯ ИНТЕГРАЦИЯ С TELEGRAM ===
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Твой ник в Telegram
            const TELEGRAM_USERNAME = 'Tamir_mathteacher'; // <-- Замени, если нужно
            
            // Получаем данные
            const name = document.getElementById('parentName').value.trim();
            const phone = document.getElementById('parentPhone').value.trim();
            const grade = document.getElementById('childGrade').value;
            
            // НОВЫЙ, ЕСТЕСТВЕННЫЙ ТЕКСТ СООБЩЕНИЯ ОТ ИМЕНИ РОДИТЕЛЯ
            const message = `Здравствуйте, Тамир! Меня зовут ${name}.\n\nЯ хочу записать своего ребенка на диагностику по математике (сейчас учится ${grade}).\n\nМой контактный номер: ${phone}.\n\nПодскажите, пожалуйста, в какие дни у вас есть свободные места?`;
            
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
            
            // Меняем стиль кнопки перед переходом
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submit-text');
            const originalText = submitText.innerText;
            const originalBg = submitBtn.style.backgroundColor;
            
            submitText.innerText = 'Открываем приложение...';
            submitBtn.style.backgroundColor = '#0088cc'; // Цвет ТГ
            
            setTimeout(() => {
                window.open(telegramUrl, '_blank');
                
                // Сбрасываем форму
                submitText.innerText = originalText;
                submitBtn.style.backgroundColor = originalBg;
                contactForm.reset();
            }, 600);
        });
    }
});