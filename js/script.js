/* ============================================================
   script.js  —  cleaned & error-free
   ============================================================ */

/* ---------- Global form handler -----------------------------
   Kept OUTSIDE DOMContentLoaded so inline
   onsubmit="handleSubmit(event)" can find it.
   ------------------------------------------------------------ */
function handleSubmit(event) {
  event.preventDefault();
  alert('Form submitted successfully!');
  // Add custom form submission logic here (e.g., fetch API)
}

/* ---------- Everything else runs after DOM is ready -------- */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. Story cards: subtle entry animation ============ */
  document.querySelectorAll('.story-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.15}s`;

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });

  /* ===== 2. Feature cards: hover elevation ================= */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
    });
  });

  /* ===== 3. Logo track: clone for infinite flow ============ */
  const logoTrack = document.querySelector('.logo-track');
  if (logoTrack) {
    Array.from(logoTrack.children).forEach(item => {
      logoTrack.appendChild(item.cloneNode(true));
    });
  }

  /* ===== 4. Slider tracks: clone for infinite flow ========= */
  document.querySelectorAll('.slider-track').forEach(track => {
    Array.from(track.children).forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  /* ===== 5. Portfolio filter + tab opacity ================= */
  const filterButtons  = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {

      /* -- portfolio filtering -- */
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const match =
          filterValue === 'all' ||
          item.getAttribute('data-category') === filterValue;
        item.style.display = match ? 'block' : 'none';
      });

      /* -- tab opacity feedback -- */
      filterButtons.forEach(btn => (btn.style.opacity = '1'));
      e.currentTarget.style.opacity = '0.7';
      console.log(`Filtered by category: ${e.currentTarget.textContent.trim()}`);
    });
  });

  /* ===== 6. Industry buttons =============================== */
  document.querySelectorAll('.industry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(`Selected Industry: ${btn.textContent.trim()}`);
    });
  });

  /* ===== 7. Accordion bars (plus / minus) ================== */
  document.querySelectorAll('.accordion-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      const icon = bar.querySelector('.accordion-icon');
      if (!icon) return;                       // <- null guard

      if (icon.textContent === '+') {
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
      } else {
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });

  /* ===== 8. Impact cards ================================== */
  document.querySelectorAll('.impact-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      console.log(`Impact achievement card ${index + 1} clicked.`);
    });
  });

  /* ===== 9. Process cards ================================= */
  document.querySelectorAll('.process-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      console.log(`Process card ${index + 1} clicked.`);
    });
  });

  /* ===== 10. Logo cards =================================== */
  document.querySelectorAll('.logo-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      console.log(`Logo card ${index + 1} clicked.`);
    });
  });

  /* ===== 11. Mobile menu toggle ============================ */
  // const mobileMenu = document.getElementById('mobile-menu');
  // const navLinks   = document.getElementById('nav-links');

  // if (mobileMenu && navLinks) {                // <- null guard
  //   mobileMenu.addEventListener('click', () => {
  //     navLinks.classList.toggle('active');
  //   });
  // }

  /* ===== 12. FAQ accordion ================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  const dummyAnswers = [
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.",
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    "Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form."
  ];

  faqItems.forEach((item, index) => {
    const questionEl = item.querySelector('.faq-question');
    const iconEl     = item.querySelector('.faq-icon');
    if (!questionEl || !iconEl) return;        // <- null guard

    /* -- build header -- */
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('faq-header');
    headerWrapper.appendChild(questionEl);
    headerWrapper.appendChild(iconEl);

    /* -- build answer -- */
    const answerWrapper = document.createElement('div');
    answerWrapper.classList.add('faq-answer');

    const answerText = document.createElement('p');
    answerText.textContent = dummyAnswers[index] || dummyAnswers[0];
    answerWrapper.appendChild(answerText);

    /* -- reassemble -- */
    item.innerHTML = '';
    item.appendChild(headerWrapper);
    item.appendChild(answerWrapper);

    /* -- toggle behaviour -- */
    headerWrapper.addEventListener('click', () => {
      /* close other open rows */
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      /* toggle current row */
      const isOpen = item.classList.toggle('is-open');
      answerWrapper.style.maxHeight = isOpen
        ? answerWrapper.scrollHeight + 'px'
        : null;
    });
  });
});

/* ============================================================
   Tailwind config
   Must run AFTER the Tailwind CDN script. Guarded so it never
   throws a ReferenceError if Tailwind isn't present.
   ============================================================ */
