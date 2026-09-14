/* ==========================================================================
   AADIKAILASH.IN — INTERACTIVE CONTROLLER (MAIN.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY HEADER & SCROLL BEHAVIOR
  const mainHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. PACKAGES FILTER TABS
  const filterTabs = document.querySelectorAll('.filter-tab');
  const packageCards = document.querySelectorAll('.package-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      packageCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. INTERACTIVE DAY-BY-DAY ITINERARY TABS
  const dayNavBtns = document.querySelectorAll('.day-nav-btn');
  const itineraryCards = document.querySelectorAll('.itinerary-day-card');

  dayNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayNavBtns.forEach(b => b.classList.remove('active'));
      itineraryCards.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetDay = btn.getAttribute('data-day');
      const targetCard = document.getElementById(`dayCard-${targetDay}`);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  // 5. INTERACTIVE YATRA COST CALCULATOR
  const calcPackage = document.getElementById('calcPackage');
  const calcMonth = document.getElementById('calcMonth');
  const calcTravellers = document.getElementById('calcTravellers');
  const travellersVal = document.getElementById('travellersVal');
  const calcVehicleBtns = document.querySelectorAll('.calc-vehicle-btn');
  const totalAmountEl = document.getElementById('totalAmount');
  const perPersonEl = document.getElementById('perPerson');
  const btnBookWhatsapp = document.getElementById('btnBookWhatsapp');

  let selectedVehicle = '4x4 Bolero Camper';

  // Base Prices per person
  const packagePrices = {
    'dharchula-5d': 28500,
    'kathgodam-7d': 38500,
    'heli-3d': 72000,
    'darma-8d': 46000
  };

  calcVehicleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcVehicleBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedVehicle = btn.getAttribute('data-vehicle');
      updateCalculator();
    });
  });

  function updateCalculator() {
    if (!calcPackage || !totalAmountEl) return;

    const pkgKey = calcPackage.value;
    const basePerPerson = packagePrices[pkgKey] || 38500;
    const count = parseInt(calcTravellers.value, 10);

    if (travellersVal) travellersVal.textContent = count;

    // Vehicle premium
    let vehicleSurcharge = 0;
    if (selectedVehicle === 'Scorpio / Cruiser (Luxury 4x4)') {
      vehicleSurcharge = 3500;
    } else if (selectedVehicle === 'Helicopter VIP Transfer') {
      vehicleSurcharge = pkgKey === 'heli-3d' ? 0 : 25000;
    }

    // Group discount
    let discount = 1;
    if (count >= 10) {
      discount = 0.88; // 12% off for big group
    } else if (count >= 6) {
      discount = 0.92; // 8% off
    } else if (count >= 4) {
      discount = 0.95; // 5% off
    }

    const finalPerPerson = Math.round((basePerPerson + vehicleSurcharge) * discount);
    const grandTotal = finalPerPerson * count;

    totalAmountEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    perPersonEl.textContent = `₹${finalPerPerson.toLocaleString('en-IN')} / person (Incl. All Permits, 4x4, Homestay & Meals)`;

    // Update WhatsApp direct message link
    const pkgName = calcPackage.options[calcPackage.selectedIndex].text;
    const month = calcMonth.value;
    const message = encodeURIComponent(
      `Namaste! I want to plan the Adi Kailash & Om Parvat Yatra with aadikailash.in.\n\n` +
      `📌 Package: ${pkgName}\n` +
      `📅 Travel Month: ${month}\n` +
      `👥 Yatris: ${count} person(s)\n` +
      `🚙 Vehicle: ${selectedVehicle}\n` +
      `💰 Est. Budget: ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
      `Please share the detailed day-wise itinerary and booking availability.`
    );
    if (btnBookWhatsapp) {
      btnBookWhatsapp.href = `https://wa.me/918057696762?text=${message}`;
    }
  }

  if (calcPackage) calcPackage.addEventListener('change', updateCalculator);
  if (calcMonth) calcMonth.addEventListener('change', updateCalculator);
  if (calcTravellers) calcTravellers.addEventListener('input', updateCalculator);

  // Initial calculation
  updateCalculator();

  // 6. FAQ ACCORDIONS
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. LIGHTBOX GALLERY
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxModal.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 8. BOOKING MODAL
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.btn-open-booking');
  const modalPackageSelect = document.getElementById('modalPackageSelect');
  const bookingForm = document.getElementById('yatraBookingForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prePkg = btn.getAttribute('data-package-name');
      if (prePkg && modalPackageSelect) {
        modalPackageSelect.value = prePkg;
      }
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBookingModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const pkg = modalPackageSelect ? modalPackageSelect.value : 'Adi Kailash Standard';
      const month = document.getElementById('modalMonth').value;
      const persons = document.getElementById('modalPersons').value;

      const waMsg = encodeURIComponent(
        `Har Har Mahadev! New Booking Inquiry from aadikailash.in:\n\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        `🏔️ Package: ${pkg}\n` +
        `📅 Month: ${month}\n` +
        `👥 Persons: ${persons}\n\n` +
        `Please confirm slot availability and assist with Inner Line Permit.`
      );

      // Redirect to WhatsApp
      window.open(`https://wa.me/918057696762?text=${waMsg}`, '_blank');
      closeBookingModal();
      alert('Thank you! Your inquiry has been forwarded to our Pithoragarh Expedition Desk on WhatsApp. Our expert will contact you within 30 minutes.');
    });
  }

  // 9. QUICK STRIP FORM
  const quickSearchBtn = document.getElementById('quickSearchBtn');
  if (quickSearchBtn) {
    quickSearchBtn.addEventListener('click', () => {
      const startCity = document.getElementById('quickCity').value;
      const month = document.getElementById('quickMonth').value;
      const travellers = document.getElementById('quickTravellers').value;
      const mode = document.getElementById('quickMode').value;

      const quickMsg = encodeURIComponent(
        `Namaste! Quick inquiry from aadikailash.in:\n` +
        `• Starting City: ${startCity}\n` +
        `• Month: ${month}\n` +
        `• Mode: ${mode}\n` +
        `• Yatris: ${travellers}\n\n` +
        `Kindly share available departure dates and quotes.`
      );
      window.open(`https://wa.me/918057696762?text=${quickMsg}`, '_blank');
    });
  }
});
