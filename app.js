// --- STORE HOURS & DELIVERY LOGIC ---
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

    const schedule = [
        siteData.hours.morningSnacks,
        siteData.hours.lunchThali,
        siteData.hours.eveningSnacks,
        siteData.hours.dinnerThali
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
            statusEl.textContent = `Closed — Opens Tomorrow at ${siteData.hours.morningSnacks.open}`;
        }
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

function checkSundaySpecial() {
    const banner = document.getElementById('sunday-banner');
    if (!banner) return;
    const today = new Date().getDay(); 
    if (today === 0 && siteData.sundaySpecial.enabled) {
        banner.textContent = siteData.sundaySpecial.text;
        banner.style.display = 'block';
    }
}

// --- FEATURED MENU (INDEX PAGE) ---
function renderFeaturedMenu() {
    const container = document.getElementById('featured-menu');
    if (!container) return;

    const lunchData = siteData.menu.find(m => m.daypart === 'lunchThali');
    if (!lunchData) return;

    let html = '';
    lunchData.items.forEach(item => {
        html += `
            <div class="menu-card">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-photo">` : ''}
                <div class="card-compartment">
                    <div class="price-badge">₹${item.price}</div>
                </div>
                <div class="card-body">
                    <h3 class="item-name-en">${item.name}</h3>
                    <div class="item-name-hi">${item.nameHi}</div>
                    <p class="item-desc">${item.desc}</p>
                    <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price}, 'Lunch Thali')" class="btn-wa-order">Add to Cart</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// --- NEW CART LOGIC ---
let cart = [];

function addToCart(name, price, category) {
    let existing = cart.find(i => i.name === name);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({name, price, category, qty: 1});
    }
    updateCartUI();
    showToast(`Added ${name} to cart!`);
}

function updateCartUI() {
    const cartBtn = document.getElementById('floating-cart');
    if(!cartBtn) return;
    
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach(item => {
        totalQty += item.qty;
        totalPrice += item.price * item.qty;
    });

    if(totalQty > 0) {
        cartBtn.style.display = 'flex';
        document.getElementById('cart-qty').innerText = totalQty;
        document.getElementById('cart-total').innerText = '₹' + totalPrice;
    } else {
        cartBtn.style.display = 'none';
        closeCartModal();
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

function openCartModal() {
    renderCartItems();
    document.getElementById('cart-modal').style.display = 'flex';
}

function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function changeCartQty(index, delta) {
    cart[index].qty += delta;
    if(cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
    if(cart.length > 0) {
        renderCartItems();
    } else {
        closeCartModal();
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;
    
    let html = '';
    let total = 0;
    let hasSnacks = false;

    cart.forEach((item, index) => {
        if(item.category === 'Morning Snacks' || item.category === 'Evening Snacks') hasSnacks = true;
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 1.1rem;">${item.name}</h4>
                    <span style="color: #666; font-size: 0.9rem;">₹${item.price} x ${item.qty} = ₹${itemTotal}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button onclick="changeCartQty(${index}, -1)" style="padding: 4px 12px; border-radius: 6px; border: 1px solid #ddd; background: white; cursor: pointer; font-weight:bold;">-</button>
                    <span style="font-weight: bold; font-size: 1.1rem; width: 16px; text-align: center;">${item.qty}</span>
                    <button onclick="changeCartQty(${index}, 1)" style="padding: 4px 12px; border-radius: 6px; border: 1px solid #ddd; background: white; cursor: pointer; font-weight:bold;">+</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    document.getElementById('cart-modal-total').innerText = '₹' + total;

    const warning = document.getElementById('cart-warning');
    if (hasSnacks && total < 200) {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }
}

function checkoutCart() {
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let hasSnacks = cart.some(item => item.category === 'Morning Snacks' || item.category === 'Evening Snacks');

    if(hasSnacks && totalPrice < 200) {
        alert("Minimum order amount is ₹200 when ordering Snacks. Please add more items to your cart!");
        return;
    }

    let message = "Hi Eat Hub! I would like to place an order:\n\n";
    cart.forEach(item => {
        message += `▪ ${item.qty}x ${item.name} (₹${item.price} each) = ₹${item.price * item.qty}\n`;
    });
    message += `\n*Total: ₹${totalPrice}*\n\nPlease confirm my order.`;

    window.open(`https://wa.me/${siteData.restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// --- BULK ORDER LOGIC (STILL WORKS SEPARATELY FOR PARTIES) ---
let flatMenu = [];
let bulkOrderState = [];

function initBulkMenu() {
    flatMenu = [];
    siteData.menu.forEach(category => {
        category.items.forEach(item => {
            if (!flatMenu.find(i => i.name === item.name)) flatMenu.push(item);
        });
    });
}
function openBulkModal() {
    if (flatMenu.length === 0) initBulkMenu();
    bulkOrderState = [{ itemName: flatMenu[0].name, qty: 10 }];
    renderBulkRows();
    document.getElementById('bulk-modal').style.display = 'flex';
}
function closeBulkModal() { document.getElementById('bulk-modal').style.display = 'none'; }
function renderBulkRows() {
    const container = document.getElementById('bulk-rows-container');
    let html = '';
    let total = 0;
    bulkOrderState.forEach((row, index) => {
        const selectedItem = flatMenu.find(i => i.name === row.itemName);
        total += selectedItem ? selectedItem.price * row.qty : 0;
        html += `
            <div class="bulk-row">
                <select class="bulk-select" onchange="updateBulkItem(${index}, this.value)">
                    ${flatMenu.map(item => `<option value="${item.name}" ${item.name === row.itemName ? 'selected' : ''}>${item.name} (₹${item.price})</option>`).join('')}
                </select>
                <input type="number" class="bulk-qty" min="1" value="${row.qty}" onchange="updateBulkQty(${index}, this.value)">
                <button class="bulk-remove" onclick="removeBulkRow(${index})">×</button>
            </div>`;
    });
    container.innerHTML = html;
    document.getElementById('bulk-total-price').textContent = `₹${total}`;
}
function addBulkRow() { bulkOrderState.push({ itemName: flatMenu[0].name, qty: 5 }); renderBulkRows(); }
function removeBulkRow(index) { bulkOrderState.splice(index, 1); renderBulkRows(); }
function updateBulkItem(index, value) { bulkOrderState[index].itemName = value; renderBulkRows(); }
function updateBulkQty(index, value) { bulkOrderState[index].qty = parseInt(value) || 1; renderBulkRows(); }
function sendBulkOrder() {
    if (bulkOrderState.length === 0) { alert("Please add at least one item."); return; }
    let message = "Hi Eat Hub! I would like to place a Bulk Order for a party/event:\n\n";
    let total = 0;
    bulkOrderState.forEach(row => {
        const item = flatMenu.find(i => i.name === row.itemName);
        if (item) {
            message += `▪ ${row.qty}x ${item.name} (₹${item.price} each) = ₹${item.price * row.qty}\n`;
            total += item.price * row.qty;
        }
    });
    message += `\n*Estimated Total: ₹${total}*\n\nPlease confirm availability for this bulk order.`;
    window.open(`https://wa.me/${siteData.restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    closeBulkModal();
}

// --- GPS DELIVERY CHECKER ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); 
}

function initDeliveryChecker() {
    const btn = document.getElementById('check-location-btn');
    const resultDiv = document.getElementById('location-result');
    if (!btn || !resultDiv) return;
    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            resultDiv.textContent = "Geolocation is not supported by your browser."; resultDiv.style.color = "red"; return;
        }
        btn.textContent = "Checking...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const distance = calculateDistance(position.coords.latitude, position.coords.longitude, siteData.restaurant.location.lat, siteData.restaurant.location.lng);
                const { freeRadiusKm, maxRadiusKm, minCharge, maxCharge } = siteData.delivery;
                btn.textContent = "📍 Use My Current Location";
                if (distance <= freeRadiusKm) {
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Great news, Free Delivery! 🎉`; resultDiv.style.color = "var(--color-green-dark)";
                } else if (distance <= maxRadiusKm) {
                    const extra = distance - freeRadiusKm;
                    const calculatedFee = minCharge + (extra / (maxRadiusKm - freeRadiusKm)) * (maxCharge - minCharge);
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Delivery fee: ₹${Math.round(calculatedFee)}.`; resultDiv.style.color = "var(--color-mustard-hover)";
                } else {
                    resultDiv.textContent = `You are ${distance.toFixed(1)} km away. Sorry, you are out of delivery range.`; resultDiv.style.color = "var(--color-maroon)";
                }
            },
            (error) => {
                btn.textContent = "📍 Use My Current Location";
                resultDiv.textContent = "Unable to retrieve your location. Please ensure location permissions are granted."; resultDiv.style.color = "var(--color-maroon)";
            }
        );
    });
}

function initOffersScroll() {
    const track = document.getElementById('offers-track');
    const btnLeft = document.getElementById('scroll-left');
    const btnRight = document.getElementById('scroll-right');
    if (track && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => { track.scrollBy({ left: -300, behavior: 'smooth' }); });
        btnRight.addEventListener('click', () => { track.scrollBy({ left: 300, behavior: 'smooth' }); });
    }
}

// --- HERO SLIDER LOGIC ---
let slideIndex = 1;
let slideTimer;

function initSlider() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        showSlides(slideIndex);
        slideTimer = setInterval(autoSlide, 5000); // Auto change every 5 seconds
    }
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Safety check in case elements aren't present
    if (slides.length === 0) return; 

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    // Hide all slides and deactivate all dots
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show active slide and dot
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(autoSlide, 5000);
}

// --- INITIALIZATION ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    updateStatus(); 
    setInterval(updateStatus, 60000);
    checkSundaySpecial(); 
    renderFeaturedMenu(); 
    initDeliveryChecker(); 
    initOffersScroll(); 
    initSlider(); // Added slider initialization
});

// --- DARK MODE LOGIC ---
function initDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggleBtn) return;

    // Check if the user previously chose dark mode
    const savedTheme = localStorage.getItem('eatHubTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.textContent = '☀️'; // Show sun icon when in dark mode
    }

    // Toggle function
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('eatHubTheme', 'dark'); // Save preference
            icon.textContent = '☀️';
        } else {
            localStorage.setItem('eatHubTheme', 'light'); // Save preference
            icon.textContent = '🌙';
        }
    });
}

// Ensure initDarkMode runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});
