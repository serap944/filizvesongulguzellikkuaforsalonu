 // MENÜ
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.linklerim');
    
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      const icon = this.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // BANNER SLIDER
    let currentSlide = 0;
    const slides = document.querySelectorAll('.kutu1');
    const totalSlides = slides.length;
    
    function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      currentSlide = (n + totalSlides) % totalSlides;
      slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // Slider'ı 5 saniyede bir değiştir
    setInterval(nextSlide, 5000);
    
    // KUAFÖR CAROUSEL
    let currentPosition = 0;
    const carousel = document.querySelector('.donenkup');
    const carouselItems = document.querySelectorAll('.kutu1-carousel');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let itemWidth = carouselItems[0].offsetWidth + 15; // Genişlik + gap
    let visibleItems = 4;
    const totalItems = carouselItems.length;
    let autoSlideInterval;

    // İndikatörleri oluştur
    for (let i = 0; i <= totalItems - visibleItems; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        currentPosition = i;
        updateCarousel();
        resetAutoSlide();
      });
      indicatorsContainer.appendChild(indicator);
    }

    // Görünen öğe sayısını belirle (responsive için)
    function updateVisibleItems() {
      if (window.innerWidth >= 1200) {
        visibleItems = 4;
      } else if (window.innerWidth >= 900) {
        visibleItems = 3;
      } else if (window.innerWidth >= 600) {
        visibleItems = 2;
      } else {
        visibleItems = 1;
      }
      
      // İndikatörleri güncelle
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i <= totalItems - visibleItems; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentPosition) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
          currentPosition = i;
          updateCarousel();
          resetAutoSlide();
        });
        indicatorsContainer.appendChild(indicator);
      }
    }

    // İlk çalıştırmada görünen öğe sayısını belirle
    updateVisibleItems();
    
    document.getElementById('sag').addEventListener('click', function() {
      if (currentPosition < totalItems - visibleItems) {
        currentPosition++;
        updateCarousel();
        resetAutoSlide();
      }
    });
    
    document.getElementById('sol').addEventListener('click', function() {
      if (currentPosition > 0) {
        currentPosition--;
        updateCarousel();
        resetAutoSlide();
      }
    });
    
    function updateCarousel() {
      itemWidth = carouselItems[0].offsetWidth + 15;
      carousel.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
      
      // İndikatörleri güncelle
      document.querySelectorAll('.indicator').forEach((indicator, index) => {
        if (index === currentPosition) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Otomatik slayt geçişi
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        if (currentPosition < totalItems - visibleItems) {
          currentPosition++;
        } else {
          currentPosition = 0;
        }
        updateCarousel();
      }, 4000);
    }
    
    // Otomatik slaytı sıfırla
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    // Sayfa yüklendiğinde otomatik geçişi başlat
    window.onload = function() {
      startAutoSlide();
    };
    
    // Responsive için pencere boyutu değiştiğinde carousel'i güncelle
    window.addEventListener('resize', function() {
      updateVisibleItems();
      itemWidth = carouselItems[0].offsetWidth + 15;
      updateCarousel();
    });

    // Dokunmatik kaydırma için
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Sola kaydırma - sonraki slayt
        if (currentPosition < totalItems - visibleItems) {
          currentPosition++;
          updateCarousel();
          resetAutoSlide();
        }
      }
      
      if (touchEndX > touchStartX + swipeThreshold) {
        // Sağa kaydırma - önceki slayt
        if (currentPosition > 0) {
          currentPosition--;
          updateCarousel();
          resetAutoSlide();
        }
      }
    }