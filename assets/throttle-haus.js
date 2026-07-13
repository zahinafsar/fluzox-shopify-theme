(function () {
  function revealAll() {
    document.querySelectorAll('.th-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function loadGsap() {
    return new Promise(function (resolve, reject) {
      if (window.gsap && window.ScrollTrigger) return resolve();
      var s1 = document.createElement('script');
      s1.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
      s1.onerror = reject;
      s1.onload = function () {
        var s2 = document.createElement('script');
        s2.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
        s2.onload = resolve;
        s2.onerror = reject;
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    });
  }

  function initAnimations() {
    if (!window.gsap) return;
    var gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Hero entry
    var hero = document.querySelector('.th-hero');
    if (hero) {
      var bg = hero.querySelector('.th-hero__bg');
      var heading = hero.querySelector('.th-hero__heading');
      var cta = hero.querySelector('.th-hero__cta');
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (bg) tl.fromTo(bg, { scale: 1.18 }, { scale: 1.05, duration: 1.6 }, 0);
      if (heading) tl.fromTo(heading, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.15);
      if (cta) tl.fromTo(cta, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.4);
    }

    // Story section reveal
    var stories = document.querySelectorAll('.th-story__card');
    stories.forEach(function (el) {
      var heading = el.querySelector('.th-story__heading');
      var body = el.querySelector('.th-story__body');
      var btn = el.querySelector('.th-pill');
      var targets = [heading, body, btn].filter(Boolean);
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );
    });

    // Generic reveal nodes
    var reveals = document.querySelectorAll('.th-reveal');
    reveals.forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onStart: function () { el.classList.add('is-visible'); },
      });
    });

    // Product card stagger on collection / product grid
    var grids = document.querySelectorAll('.product-grid, .product-list, [data-product-grid]');
    grids.forEach(function (grid) {
      var cards = grid.querySelectorAll('.product-card, .card, .product-grid__item');
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 85%' },
        }
      );
    });
  }

  function boot() {
    loadGsap().then(initAnimations).catch(revealAll);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot);
  }
})();
