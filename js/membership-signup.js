
// Membership Signup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.select-plan');
    const signupForm = document.getElementById('signupForm');
    const membershipForm = document.getElementById('membershipForm');
    const paypalContainer = document.getElementById('paypal-button-container');
    const freeSignupBtn = document.getElementById('freeSignupBtn');
    
    let selectedPlan = null;

    // Plan selection handlers
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedPlan = this.dataset.plan;
            showSignupForm(selectedPlan);
        });
    });

    function showSignupForm(plan) {
        signupForm.style.display = 'block';
        signupForm.scrollIntoView({ behavior: 'smooth' });
        
        // Show appropriate payment method
        if (plan === 'reader') {
            paypalContainer.style.display = 'none';
            freeSignupBtn.style.display = 'block';
        } else if (plan === 'author') {
            paypalContainer.style.display = 'block';
            freeSignupBtn.style.display = 'none';
            initializePayPalButton();
        }
    }

    function initializePayPalButton() {
        // Clear any existing PayPal buttons
        paypalContainer.innerHTML = '<p class="payment-info">Complete your payment with PayPal:</p>';
        
        // Wait for PayPal SDK to load
        const checkPayPal = setInterval(() => {
            if (typeof paypal !== 'undefined') {
                clearInterval(checkPayPal);
                renderPayPalButton();
            }
        }, 100);
    }

    function renderPayPalButton() {
        const subscriberInfo = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value
        };

        const plans = paypalIntegration.getPlans();
        const button = paypalIntegration.createSubscription(plans.author, subscriberInfo);
        
        button.render('#paypal-button-container');
    }

    // Free membership signup
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedPlan === 'reader') {
            const formData = new FormData(membershipForm);
            const userData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                username: formData.get('username'),
                membershipType: 'reader',
                signupDate: new Date().toISOString()
            };
            
            // Store user data (in production, send to your backend)
            localStorage.setItem('userMembership', JSON.stringify(userData));
            
            // Redirect to community dashboard
            window.location.href = 'community-dashboard.html?membership=reader';
        }
    });

    // Form validation
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearError);
    });

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        if (!value) {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    function showError(input, message) {
        clearError({ target: input });
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.classList.add('error');
    }

    function clearError(e) {
        const input = e.target;
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
