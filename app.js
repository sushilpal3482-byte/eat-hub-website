// app.js

// 1. Live Open/Closed Status
function updateStatus() {
    const statusEl = document.getElementById('live-status');
    if (!statusEl) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60;

    let currentDaypart = null;
    let nextDaypart = null;
    let isClosed = true;

    const timeToDecimal = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h + m / 60;
    };

    const hours = siteData.hours;
    const schedule = [
        hours.morningSnacks,
        hours.lunchThali,
        hours.eveningSnacks,
        hours.dinnerThali
    ];

    for (let i = 0; i < schedule.length; i++) {
        const openTime = timeToDecimal(schedule[i].open);
        const closeTime = timeToDecimal(schedule[i].close);

        if (currentTime >= openTime && currentTime < closeTime) {
            isClosed = false;
            currentDaypart = schedule[i];
            break;
        } else if (currentTime < openTime && !nextDaypart) {
            nextDaypart = schedule[i];
        }
    }

    if (!isClosed) {
        statusEl.textContent = `Open Now — ${currentDaypart.label} till ${currentDaypart.close}`;
        statusEl.style.backgroundColor = 'var(--color-green-tint)';
        statusEl.style.color = 'var(--color-green-dark)';
    } else {
        if (nextDaypart) {
            statusEl.textContent = `Closed — Opens for ${nextDaypart.label} at ${nextDaypart.open}`;
        } else {
            statusEl.textContent = `Closed — Opens Tomorrow at ${hours.morningSnacks.open}`;
        }
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

// 2. Sunday Special Banner
function checkSundaySpecial() {
    const banner = document.getElementById('sunday-banner');
    if (!banner) return;
    
    const today = new Date().getDay(); // 0 is Sunday
    if (today === 0 && siteData.sundaySpecial.enabled) {
        banner.textContent = siteData.sundaySpecial.text;
        banner.style.display = 'block';
    }
}

// 3. Render Featured Menu (Lunch Thali)
function renderFeaturedMenu() {
    const container = document.getElementById('featured-menu');
    if (!container) return;

    const lunchData = siteData.menu.find(m => m.daypart === 'lunchThali');
    if (!lunchData) return;

    let html = '';
    lunchData.items.forEach(item => {
        const waMsg = encodeURIComponent(`Hi Eat Hub! I would like to order: ${item.name} (₹${item.price})`);
        const waLink = `https://wa.me/${siteData.restaurant.whatsappNumber}?text=${waMsg}`;

        html += `
            <div class="menu-card">
                <div class="card-compartment">
                    <div class="price-badge">₹${item.price}</div>
                </div>
                <div class="card-body">
                    <h3 class="item-name-en">${item.name}</h3>
                    <div class="item-name-hi">${item.nameHi}</div>
                    <p class="item-desc">${item.desc}</p>
                    <a href="${waLink}" target="_blank" class="btn btn-wa-order">Order on WhatsApp</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// 4. Geolocation Delivery Checker
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; 
}

function initDeliveryChecker() {
    const btn = document.getElementById('check-location-btn');
    const resultDiv = document.getElementById('location-result');
    
    if (!btn || !resultDiv) return;

    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            resultDiv.textContent = "Geolocation is not supported by your browser.";
            resultDiv.style.color = "red";
            return;
        }

        btn.textContent = "Checking...";
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const restLat = siteData.restaurant.location.lat;
                const restLng = siteData.restaurant.location.lng;

                const distance = calculateDistance(userLat, userLng, restLat, restLng);
                const { freeRadiusKm, maxRadiusKm, minCharge, maxCharge } = siteData.delivery;

                btn.textContent = "📍 Use My Current Location";

                if (distance <= freeRadiusKm) {
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Great news, you qualify for Free Delivery! 🎉`;
                    resultDiv.style.color = "var(--color-green-dark)";
                } else if (distance <= maxRadiusKm) {
                    const extraDistance = distance - freeRadiusKm;
                    const feeRange = maxCharge - minCharge;
                    const distanceRange = maxRadiusKm - freeRadiusKm;
                    const calculatedFee = minCharge + (extraDistance / distanceRange) * feeRange;
                    
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Delivery fee: ₹${Math.round(calculatedFee)}.`;
                    resultDiv.style.color = "var(--color-mustard-hover)";
                } else {
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Sorry, you are currently out of our delivery range.`;
                    resultDiv.style.color = "var(--color-maroon)";
                }
            },
            (error) => {
                btn.textContent = "📍 Use My Current Location";
                resultDiv.textContent = "Unable to retrieve your location. Please ensure location permissions are granted.";
                resultDiv.style.color = "var(--color-maroon)";
            }
        );
    });
}

// 5. Horizontal Scrolling for Offers
function initOffersScroll() {
    const track = document.getElementById('offers-track');
    const btnLeft = document.getElementById('scroll-left');
    const btnRight = document.getElementById('scroll-right');

    if (track && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        btnRight.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

// Initialize everything when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    setInterval(updateStatus, 60000);
    checkSundaySpecial();
    renderFeaturedMenu();
    initDeliveryChecker();
    initOffersScroll(); 
});
