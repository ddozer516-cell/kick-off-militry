document.addEventListener("DOMContentLoaded", () => {
  
  // 1) تشغيل الأصوات التفاعلية (Hover & Click)
  const hoverSound = document.getElementById("hover-sound");
  const clickSound = document.getElementById("click-sound");
  const navSound = document.getElementById("nav-sound");
  
  if(hoverSound) hoverSound.volume = 0.15;
  if(clickSound) clickSound.volume = 0.35;
  if(navSound) navSound.volume = 0.5;

  const interactiveElements = document.querySelectorAll('.sound-trigger, .btn-gradient:not(.nav-link-sound), .nav-item, .field-card, .faq-item');
  
  interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      if(hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      }
    });

    element.addEventListener("click", () => {
      if(clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }
    });
  });

  // صوت مخصص عند الانتقال لصفحة الحجز مع تأخير بسيط للسماح للصوت بالعمل
  const navLinks = document.querySelectorAll('.nav-link-sound');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      if(navSound) {
        navSound.currentTime = 0;
        navSound.play().catch(() => {});
      }
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400); // تأخير 400 مللي ثانية لسماع صوت الانتقال
    });
  });

  // 2) أنيميشن عداد الأرقام التلقائي (Statistics Counter)
  const counters = document.querySelectorAll('.counter');
  
  const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + speed);
      setTimeout(() => startCounter(counter), 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  const statsSection = document.getElementById('stats');
  if(statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        counters.forEach(counter => startCounter(counter));
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  // 3) الأسئلة الشائعة
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
});
