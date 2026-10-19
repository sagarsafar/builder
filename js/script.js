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

  document.addEventListener("DOMContentLoaded", () => {
            const counters = document.querySelectorAll(".card-value");

            const animateCounter = (el) => {
                const target = parseFloat(el.getAttribute("data-target"));
                const prefix = el.getAttribute("data-prefix") || "";
                const suffix = el.getAttribute("data-suffix") || "";
                const decimals = parseInt(el.getAttribute("data-decimals")) || 0;
                
                const duration = 1500; // Animation duration in ms
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Ease-out quad function for smoother slowing effect near the end
                    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = (easeOutProgress * target).toFixed(decimals);

                    el.innerText = `${prefix}${parseFloat(currentValue).toLocaleString()}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                };

                requestAnimationFrame(updateCount);
            };

            // Trigger animation on scroll when section enters viewport
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetCard = entry.target.querySelector(".card-value");
                        if (targetCard && !targetCard.classList.contains("animated")) {
                            targetCard.classList.add("animated");
                            animateCounter(targetCard);
                        }
                    }
                });
            }, { threshold: 0.2 });

            document.querySelectorAll(".impact-card").forEach(card => observer.observe(card));
        });


        document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const header = item.querySelector('.faq-header');
        const answer = item.querySelector('.faq-answer');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all open items (One by one open)
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('active');
                const otherHeader = otherItem.querySelector('.faq-header');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                
                if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            // If clicked item was not active before, open it
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});