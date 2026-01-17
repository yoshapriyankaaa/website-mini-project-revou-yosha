// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Welcome message with user name
function setUserName() {
    const userName = prompt('Please enter your name:');
    if (userName && userName.trim() !== '') {
        document.getElementById('userName').textContent = userName;
        localStorage.setItem('webditoUserName', userName);
    }
}

// Check if user name is stored
window.addEventListener('load', () => {
    const storedName = localStorage.getItem('webditoUserName');
    if (storedName) {
        document.getElementById('userName').textContent = storedName;
    } else {
        setUserName();
    }
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

// Error display elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        nameInput.style.borderColor = '#e74c3c';
        return false;
    } else if (nameValue.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        nameInput.style.borderColor = '#e74c3c';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        nameError.textContent = 'Name can only contain letters and spaces';
        nameInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        nameError.textContent = '';
        nameInput.style.borderColor = '#27ae60';
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = '#27ae60';
        return true;
    }
}

function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^[\d\s\+\-\(\)]+$/;
    
    if (phoneValue === '') {
        phoneError.textContent = 'Phone number is required';
        phoneInput.style.borderColor = '#e74c3c';
        return false;
    } else if (!phonePattern.test(phoneValue)) {
        phoneError.textContent = 'Please enter a valid phone number';
        phoneInput.style.borderColor = '#e74c3c';
        return false;
    } else if (phoneValue.replace(/\D/g, '').length < 10) {
        phoneError.textContent = 'Phone number must be at least 10 digits';
        phoneInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        phoneError.textContent = '';
        phoneInput.style.borderColor = '#27ae60';
        return true;
    }
}

function validateMessage() {
    const messageValue = messageInput.value.trim();
    
    if (messageValue === '') {
        messageError.textContent = 'Message is required';
        messageInput.style.borderColor = '#e74c3c';
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = '#27ae60';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
messageInput.addEventListener('blur', validateMessage);

// Clear error on input
nameInput.addEventListener('input', () => {
    if (nameError.textContent) {
        nameInput.style.borderColor = '#e0e0e0';
        nameError.textContent = '';
    }
});

emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        emailInput.style.borderColor = '#e0e0e0';
        emailError.textContent = '';
    }
});

phoneInput.addEventListener('input', () => {
    if (phoneError.textContent) {
        phoneInput.style.borderColor = '#e0e0e0';
        phoneError.textContent = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageError.textContent) {
        messageInput.style.borderColor = '#e0e0e0';
        messageError.textContent = '';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    
    // If all fields are valid, display the submission result
    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        // Get form values
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const messageValue = messageInput.value.trim();
        
        // Display submission result
        document.getElementById('resultName').textContent = nameValue;
        document.getElementById('resultEmail').textContent = emailValue;
        document.getElementById('resultPhone').textContent = phoneValue;
        document.getElementById('resultMessage').textContent = messageValue;
        
        // Show result section
        const submissionResult = document.getElementById('submissionResult');
        submissionResult.style.display = 'block';
        
        // Scroll to result
        submissionResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        contactForm.reset();
        
        // Reset border colors
        nameInput.style.borderColor = '#e0e0e0';
        emailInput.style.borderColor = '#e0e0e0';
        phoneInput.style.borderColor = '#e0e0e0';
        messageInput.style.borderColor = '#e0e0e0';
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error:not(:empty)');
        if (firstError) {
            firstError.previousElementSibling.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
});

// Close submission result
function closeResult() {
    document.getElementById('submissionResult').style.display = 'none';
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hq-card, .portfolio-item, .value-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});