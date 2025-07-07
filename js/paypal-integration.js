
// PayPal Integration for AuthorBeacon Community Memberships
class PayPalIntegration {
    constructor() {
        this.clientId = 'YOUR_PAYPAL_CLIENT_ID'; // Replace with your actual PayPal client ID
        this.isTestMode = true; // Set to false for production
        this.init();
    }

    init() {
        // Load PayPal SDK
        this.loadPayPalSDK();
    }

    loadPayPalSDK() {
        const script = document.createElement('script');
        const environment = this.isTestMode ? 'sandbox' : 'production';
        script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD&intent=subscription`;
        script.onload = () => {
            console.log('PayPal SDK loaded successfully');
        };
        document.head.appendChild(script);
    }

    createSubscription(planId, subscriberInfo) {
        return paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                    'plan_id': planId,
                    'subscriber': {
                        'name': {
                            'given_name': subscriberInfo.firstName,
                            'surname': subscriberInfo.lastName
                        },
                        'email_address': subscriberInfo.email
                    }
                });
            },
            onApprove: function(data, actions) {
                console.log('Subscription approved:', data.subscriptionID);
                // Handle successful subscription
                window.location.href = `community-dashboard.html?subscription=${data.subscriptionID}`;
            },
            onError: function(err) {
                console.error('PayPal error:', err);
                alert('Payment failed. Please try again.');
            },
            onCancel: function(data) {
                console.log('Payment cancelled:', data);
                alert('Payment was cancelled.');
            }
        });
    }

    // Plan IDs for different membership tiers
    getPlans() {
        return {
            reader: null, // Free membership
            author: 'P-YOUR-AUTHOR-PLAN-ID' // Replace with your actual plan ID
        };
    }
}

// Initialize PayPal integration
const paypalIntegration = new PayPalIntegration();
