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

$(function () {

  /* =========================================================
     0. AOS INIT
     ========================================================= */
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: false, mirror: true });
  }

  var $grid   = $('#portfolioGrid');
  var $items  = $grid.find('.portfolio-item');
  var $empty  = $('.portfolio-empty');

  /* make items keyboard focusable */
  $items.attr({ tabindex: 0, role: 'button' });


  /* =========================================================
     1. FILTERING WITH STAGGERED ANIMATION
     ========================================================= */
  var filterTimer = null;

  function applyFilter(filter) {
    clearTimeout(filterTimer);

    /* phase 1 — fade everything out */
    $items.addClass('is-hiding');

    /* phase 2 — after fade-out, swap visibility and stagger back in */
    filterTimer = setTimeout(function () {

      var visible = [];

      $items.each(function () {
        var $el   = $(this);
        var match = (filter === 'all') || ($el.data('category') === filter);

        if (match) {
          $el.removeClass('is-hidden');
          visible.push(this);
        } else {
          $el.addClass('is-hidden').removeClass('is-hiding');
        }
      });

      /* toggle empty state */
      $empty.toggle(visible.length === 0);

      /* phase 3 — reveal one by one */
      visible.forEach(function (el, i) {
        setTimeout(function () {
          void el.offsetHeight;              /* force reflow so transition runs */
          $(el).removeClass('is-hiding');
        }, i * 55);
      });

    }, 260);
  }

  $('.filter-btn').on('click', function () {
    var $btn = $(this);
    if ($btn.hasClass('active')) return;

    $('.filter-btn').removeClass('active').attr('aria-pressed', 'false');
    $btn.addClass('active').attr('aria-pressed', 'true');

    applyFilter($btn.data('filter'));
  });


  /* =========================================================
     2. LIGHTBOX — SLIDING IMAGE POPUP
     ========================================================= */
  var $lb       = $('#pfLightbox');
  var $track    = $('#pfTrack');
  var $caption  = $('#pfCaption');
  var $counter  = $('#pfCounter');

  var slides    = [];
  var current   = 0;
  var isOpen    = false;
  var $lastItem = null;

  /* collect only the currently visible (filtered) items */
  function getVisibleItems() {
    return $grid.find('.portfolio-item').not('.is-hidden').toArray();
  }

  /* build the sliding track */
  function buildSlides(list) {
    slides = list.map(function (el) {
      var $img = $(el).find('img').first();
      return {
        src: $img.attr('src') || '',
        alt: $img.attr('alt') || 'Project preview'
      };
    });

    $track.html(slides.map(function (s) {
      return '<div class="pf-slide"><img src="' + s.src + '" alt="' + s.alt + '"></div>';
    }).join(''));

    $lb.toggleClass('pf-single', slides.length < 2);
  }

  /* slide to index */
  function goTo(index, animate) {
    if (!slides.length) return;

    current = (index + slides.length) % slides.length;

    if (animate === false) {
      $track.css('transition', 'none');
    }

    $track.css('transform', 'translateX(' + (-current * 100) + '%)');

    if (animate === false) {
      void $track[0].offsetHeight;
      $track.css('transition', '');
    }

    $caption.text(slides[current].alt);
    $counter.text((current + 1) + ' / ' + slides.length);
  }

  /* open */
  function openLightbox($item) {
    var list = getVisibleItems();
    var idx  = list.indexOf($item[0]);
    if (idx < 0) idx = 0;

    buildSlides(list);
    goTo(idx, false);

    $lb.addClass('is-open');
    $('body').addClass('pf-no-scroll');
    isOpen = true;

    setTimeout(function () {
      $lb.find('.pf-lb-close').trigger('focus');
    }, 80);
  }

  /* close */
  function closeLightbox() {
    if (!isOpen) return;
    isOpen = false;

    $lb.removeClass('is-open');
    $('body').removeClass('pf-no-scroll');

    if ($lastItem) {
      $lastItem.trigger('focus');
      $lastItem = null;
    }
  }

  /* ---- events ---- */

  /* open on click */
  $grid.on('click', '.portfolio-item', function () {
    $lastItem = $(this);
    openLightbox($(this));
  });

  /* open with keyboard */
  $grid.on('keydown', '.portfolio-item', function (e) {
    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      $lastItem = $(this);
      openLightbox($(this));
    }
  });

  /* controls */
  $lb.on('click', '.pf-lb-close', function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  $lb.on('click', '.pf-lb-prev', function (e) {
    e.stopPropagation();
    goTo(current - 1, true);
  });

  $lb.on('click', '.pf-lb-next', function (e) {
    e.stopPropagation();
    goTo(current + 1, true);
  });

  /* click on the dark backdrop closes */
  $lb.on('click', function (e) {
    if (e.target === this) closeLightbox();
  });

  /* keyboard navigation */
  $(document).on('keydown', function (e) {
    if (!isOpen) return;

    if (e.key === 'Escape' || e.keyCode === 27) {
      closeLightbox();
    } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
      e.preventDefault();
      goTo(current - 1, true);
    } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
      e.preventDefault();
      goTo(current + 1, true);
    }
  });

  /* swipe support (mobile) */
  var touchStartX = null;

  $lb.on('touchstart', function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });

  $lb.on('touchend', function (e) {
    if (touchStartX === null) return;

    var dx = e.originalEvent.changedTouches[0].clientX - touchStartX;

    if (Math.abs(dx) > 50) {
      goTo(current + (dx < 0 ? 1 : -1), true);
    }
    touchStartX = null;
  });

});