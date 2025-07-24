// Configuration des véhicules disponibles
const vehicles = [
  {
    id: 1,
    name: "Dacia Sandero",
    price: 250,
    image: "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero/sandero-bji/sandero-bji-ph1/edito-2560-x-1440/dacia-sandero-bji-ph1-001.jpg",
    features: ["5 portes", "Climatisation", "5 places", "Manuelle"],
    available: true,
    category: "Economique"
  },
  {
    id: 2,
    name: "Renault Clio",
    price: 300,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["5 portes", "Climatisation", "5 places", "Manuelle"],
    available: true,
    category: "Compacte"
  },
  {
    id: 3,
    name: "Peugeot 208",
    price: 320,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["5 portes", "Climatisation", "5 places", "Automatique"],
    available: true,
    category: "Compacte"
  },
  {
    id: 4,
    name: "Hyundai Tucson",
    price: 450,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["5 portes", "Climatisation", "5 places", "4x4", "Automatique"],
    available: true,
    category: "SUV"
  },
  {
    id: 5,
    name: "Mercedes Classe C",
    price: 800,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["4 portes", "Climatisation", "5 places", "Automatique", "Premium"],
    available: true,
    category: "Luxe"
  }
];

// Offres spéciales
const specialOffers = [
  {
    title: "Offre Spéciale Été",
    description: "Réduction de 20% sur toutes les locations de plus de 7 jours",
    validUntil: "2023-09-30",
    code: "ETE2023"
  },
  {
    title: "Location Longue Durée",
    description: "Tarifs préférentiels pour les locations mensuelles",
    validUntil: "2023-12-31",
    code: "LONG2023"
  },
  {
    title: "Première Location",
    description: "10% de réduction pour votre première réservation",
    validUntil: "2023-12-31",
    code: "BIENVENUE"
  }
];

document.addEventListener("DOMContentLoaded", function() {
  // Initialisation
  initLoader();
  initCurrentYear();
  initDarkMode();
  initScrollToTop();
  initMobileMenu();
  initScrollProgress();
  initVehicleListing();
  initReservationForm();
  initTestimonials();
  initFAQ();
  initAnimations();
  initContactForm();
  initNewsletter();
});

// Gestion du loader
function initLoader() {
  window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    setTimeout(function() {
      loader.style.opacity = "0";
      setTimeout(function() {
        loader.style.display = "none";
      }, 500);
    }, 1000);
  });
}

// Année courante dans le footer
function initCurrentYear() {
  document.getElementById("annee").textContent = new Date().getFullYear();
}

// Mode sombre
function initDarkMode() {
  const darkModeToggle = document.getElementById("toggle-dark");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  
  // Vérifier les préférences système
  if (prefersDarkScheme.matches) {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Basculer manuellement
  darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    }
  });
  
  // Vérifier le stockage local
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (currentTheme === "light") {
    document.body.classList.remove("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Bouton retour en haut
function initScrollToTop() {
  const btnTop = document.getElementById("btn-top");
  
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      btnTop.style.display = "flex";
    } else {
      btnTop.style.display = "none";
    }
  });
  
  btnTop.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Menu mobile
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  
  mobileMenuBtn.addEventListener("click", function() {
    mainNav.classList.toggle("active");
    this.innerHTML = mainNav.classList.contains("active") ? 
      '<i class="fas fa-times"></i>' : 
      '<i class="fas fa-bars"></i>';
  });
  
  // Fermer le menu lorsqu'un lien est cliqué
  document.querySelectorAll("#main-nav a").forEach(link => {
    link.addEventListener("click", function() {
      mainNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// Barre de progression du défilement
function initScrollProgress() {
  window.addEventListener("scroll", function() {
    const scrollProgress = document.getElementById("scroll-progress");
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollTotal) * 100;
    scrollProgress.style.width = scrollPercentage + "%";
  });
}

// Liste des véhicules disponibles
function initVehicleListing() {
  const vehiclesGrid = document.querySelector(".vehicles-grid");
  const vehicleSelect = document.getElementById("voiture");
  
  // Vider les conteneurs
  vehiclesGrid.innerHTML = "";
  vehicleSelect.innerHTML = '<option value="">-- Sélectionnez un véhicule --</option>';
  
  // Ajouter chaque véhicule
  vehicles.forEach(vehicle => {
    if (vehicle.available) {
      // Ajouter à la grille
      const vehicleCard = document.createElement("div");
      vehicleCard.className = "vehicle-card fade-in";
      vehicleCard.innerHTML = `
        <div class="vehicle-image">
          <img src="${vehicle.image}" alt="${vehicle.name}">
        </div>
        <div class="vehicle-details">
          <h3 class="vehicle-title">${vehicle.name}</h3>
          <div class="vehicle-features">
            ${vehicle.features.map(feature => `
              <div class="vehicle-feature">
                <i class="fas fa-check"></i> ${feature}
              </div>
            `).join("")}
          </div>
          <div class="vehicle-price">
            ${vehicle.price} DH <span>/ jour</span>
          </div>
          <div class="vehicle-actions">
            <button class="btn btn-outline-primary" onclick="scrollToReservation('${vehicle.name}')">
              <i class="fas fa-calendar-alt"></i> Réserver
            </button>
            <button class="btn btn-primary" onclick="showVehicleDetails(${vehicle.id})">
              <i class="fas fa-info-circle"></i> Détails
            </button>
          </div>
        </div>
      `;
      vehiclesGrid.appendChild(vehicleCard);
      
      // Ajouter au select
      const option = document.createElement("option");
      option.value = vehicle.name;
      option.textContent = `${vehicle.name} - ${vehicle.price} DH/jour`;
      vehicleSelect.appendChild(option);
    }
  });
}

// Formulaire de réservation
function initReservationForm() {
  const form = document.getElementById("form-reservation");
  const messageDiv = document.getElementById("reservation-message");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = {
      name: document.getElementById("nom").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      vehicle: document.getElementById("voiture").value,
      startDate: document.getElementById("date-debut").value,
      endDate: document.getElementById("date-fin").value,
      location: document.getElementById("lieu").value,
      message: document.getElementById("message").value.trim()
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.vehicle || 
        !formData.startDate || !formData.endDate || !formData.location) {
      showMessage("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }
    
    // Calculer le nombre de jours
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    if (diffDays <= 0) {
      showMessage("La date de fin doit être après la date de début", "error");
      return;
    }
    
    // Trouver le véhicule sélectionné
    const selectedVehicle = vehicles.find(v => v.name === formData.vehicle);
    if (!selectedVehicle) {
      showMessage("Véhicule non trouvé", "error");
      return;
    }
    
    // Calculer le prix total
    const totalPrice = selectedVehicle.price * diffDays;
    
    // Afficher le message de confirmation
    showMessage(`
      Merci ${formData.name}, votre demande de réservation pour une ${formData.vehicle} 
      du ${formatDate(formData.startDate)} au ${formatDate(formData.endDate)} 
      (${diffDays} jours) a été envoyée. Prix total: ${totalPrice} DH. 
      Nous vous contacterons sous peu pour confirmer.
    `, "success");
    
    // Réinitialiser le formulaire
    form.reset();
    
    // Envoyer les données (simulation)
    setTimeout(() => {
      console.log("Réservation envoyée:", formData);
    }, 1000);
  });
  
  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `reservation-message ${type}`;
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "reservation-message";
    }, 10000);
  }
  
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
}

// Témoignages
function initTestimonials() {
  // Animation au survol
  document.querySelectorAll(".testimonial-card").forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0)";
    });
  });
}

// FAQ
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", function() {
      const item = this.parentElement;
      item.classList.toggle("active");
      
      // Fermer les autres éléments
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
}

// Animations
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll(".fade-in").forEach(element => {
    observer.observe(element);
  });
}

// Formulaire de contact
function initContactForm() {
  const form = document.getElementById("form-contact");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById("contact-nom").value.trim(),
      email: document.getElementById("contact-email").value.trim(),
      phone: document.getElementById("contact-phone").value.trim(),
      subject: document.getElementById("contact-sujet").value,
      message: document.getElementById("contact-message").value.trim()
    };
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Envoyer le message (simulation)
    console.log("Message de contact envoyé:", formData);
    alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.");
    form.reset();
  });
}

// Newsletter
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector("input").value.trim();
    
    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }
    
    // Enregistrer l'email (simulation)
    console.log("Inscription à la newsletter:", email);
    alert("Merci pour votre inscription à notre newsletter !");
    this.querySelector("input").value = "";
  });
}

// Fonctions globales
function scrollToReservation(vehicleName) {
  const reservationSection = document.getElementById("reservation");
  reservationSection.scrollIntoView({ behavior: "smooth" });
  
  // Sélectionner le véhicule dans le formulaire
  if (vehicleName) {
    setTimeout(() => {
      const vehicleSelect = document.getElementById("voiture");
      vehicleSelect.value = vehicleName;
    }, 500);
  }
}

function showVehicleDetails(vehicleId) {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;
  
  // Créer une modal avec les détails du véhicule
  const modalHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close"><i class="fas fa-times"></i></button>
        <h2>${vehicle.name}</h2>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${vehicle.image}" alt="${vehicle.name}">
          </div>
          <div class="modal-info">
            <p><strong>Catégorie:</strong> ${vehicle.category}</p>
            <p><strong>Prix:</strong> ${vehicle.price} DH/jour</p>
            <p><strong>Disponibilité:</strong> ${vehicle.available ? "Disponible" : "Indisponible"}</p>
            <h4>Caractéristiques:</h4>
            <ul>
              ${vehicle.features.map(feature => `<li>${feature}</li>`).join("")}
            </ul>
            <button class="btn btn-primary" onclick="scrollToReservation('${vehicle.name}')">
              <i class="fas fa-calendar-alt"></i> Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Ajouter la modal au document
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  
  // Gérer la fermeture de la modal
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  
  modalOverlay.addEventListener("click", function(e) {
    if (e.target === this || e.target.closest(".modal-close")) {
      this.remove();
    }
  });
  
  // Fermer avec la touche ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modalOverlay) {
      modalOverlay.remove();
    }
  });
}

// Initialiser les dates dans le formulaire de réservation
function initDateInputs() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById("date-debut").min = today;
  
  document.getElementById("date-debut").addEventListener("change", function() {
    document.getElementById("date-fin").min = this.value;
  });
}

// Appeler cette fonction dans DOMContentLoaded
initDateInputs();