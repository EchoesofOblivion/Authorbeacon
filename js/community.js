
// Community page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize community features
    initializeCommunityFeatures();
});

function initializeCommunityFeatures() {
    // Add smooth scrolling for membership section
    const membershipLinks = document.querySelectorAll('a[href="#membership"]');
    membershipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('membership').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all feature items and membership cards
    const animatedElements = document.querySelectorAll('.feature-item, .membership-card, .chat-room-card, .guideline-item, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
}

function joinAsMember(membershipType) {
    // Show different modals or redirect based on membership type
    if (membershipType === 'reader') {
        showMembershipModal('reader');
    } else if (membershipType === 'author') {
        showMembershipModal('author');
    }
}

function showMembershipModal(type) {
    // For now, show an alert - in production this would open a proper signup modal
    const messages = {
        reader: {
            title: 'Join as Reader Member',
            content: 'Welcome to AuthorBeacon Community! Reader membership is completely free and gives you access to book discussions, author reviews, and our vibrant reading community.',
            action: 'Sign up for free and start connecting with fellow book lovers today!'
        },
        author: {
            title: 'Join as Author Member',
            content: 'Welcome to AuthorBeacon\'s Author Community! For just $9.99/month, you\'ll get access to exclusive author collaboration spaces, writing workshops, and professional development resources.',
            action: 'Start your author journey with our premium community features!'
        }
    };

    const message = messages[type];
    
    // Create and show custom modal
    const modal = createMembershipModal(message, type);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function createMembershipModal(message, type) {
    const modal = document.createElement('div');
    modal.className = 'membership-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeMembershipModal(this)"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${message.title}</h3>
                <button class="modal-close" onclick="closeMembershipModal(this)" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>${message.content}</p>
                <div class="modal-features">
                    ${type === 'reader' ? getReaderFeatures() : getAuthorFeatures()}
                </div>
                <p><strong>${message.action}</strong></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-large" onclick="proceedToSignup('${type}')">
                    <i class="fas fa-${type === 'reader' ? 'book' : 'feather-alt'}"></i>
                    ${type === 'reader' ? 'Sign Up Free' : 'Start Trial ($9.99/mo)'}
                </button>
                <button class="btn btn-outline" onclick="closeMembershipModal(this)">
                    Maybe Later
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

function getReaderFeatures() {
    return `
        <ul class="modal-feature-list">
            <li><i class="fas fa-check"></i> Join book discussion forums</li>
            <li><i class="fas fa-check"></i> Leave and read author reviews</li>
            <li><i class="fas fa-check"></i> Participate in reading groups</li>
            <li><i class="fas fa-check"></i> Access to community events</li>
        </ul>
    `;
}

function getAuthorFeatures() {
    return `
        <ul class="modal-feature-list">
            <li><i class="fas fa-crown"></i> All reader member benefits</li>
            <li><i class="fas fa-crown"></i> Private author collaboration space</li>
            <li><i class="fas fa-crown"></i> Writing workshop access</li>
            <li><i class="fas fa-crown"></i> Manuscript feedback groups</li>
            <li><i class="fas fa-crown"></i> Publishing guidance</li>
        </ul>
    `;
}

function closeMembershipModal(element) {
    const modal = element.closest('.membership-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

function proceedToSignup(type) {
    // Redirect to membership signup page
    window.location.href = `membership-signup.html?plan=${type}`;
}

// Add CSS for modals
const modalStyles = `
<style>
.membership-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.membership-modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    color: var(--text-dark);
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-light);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: var(--transition);
}

.modal-close:hover {
    background: var(--bg-light);
    color: var(--text-dark);
}

.modal-body {
    padding: 2rem;
}

.modal-feature-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
}

.modal-feature-list li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.modal-feature-list i {
    color: var(--primary-gold);
}

.modal-footer {
    padding: 1rem 2rem 2rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.modal-footer .btn {
    flex: 1;
    min-width: 150px;
}

@media (max-width: 480px) {
    .modal-content {
        width: 95%;
    }
    
    .modal-header,
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-footer {
        padding: 1rem 1.5rem 1.5rem;
        flex-direction: column;
    }
    
    .modal-footer .btn {
        width: 100%;
    }
}

.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// Inject modal styles into head
document.head.insertAdjacentHTML('beforeend', modalStyles);
