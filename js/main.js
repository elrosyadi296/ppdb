(function(){var it=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});it.forEach(function(el,i){el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)})}else it.forEach(function(el){el.classList.add('in')})})();
