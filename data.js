// data.js
const siteData = {
  restaurant: {
    name: "Eat Hub",
    tagline: "Fresh & Tasty",
    legacyText: "Since 2003 · Formerly Prayagraj Hotel",
    whatsappNumber: "919737786796", // Formatted with country code for wa.me links
    address: "Prayagraj Hotel, 526J+C2 Khadoli, Dadra and Nagar Haveli and Daman and Diu",
    googleMapsLink: "https://maps.app.goo.gl/U4zJzJzJzJzJzJzJz", // Update with your exact Maps share link
    location: { lat: 20.2741, lng: 73.0083 }, // Coordinates for Khadoli to run the Haversine delivery check
    rating: 4.8,
    ratingCount: 124
  },
  
  hours: {
    morningSnacks: { label: "Morning Snacks", open: "08:00", close: "11:30" },
    lunchThali:  { label: "Lunch Thali", open: "12:00", close: "15:30" },
    eveningSnacks: { label: "Evening Snacks", open: "16:00", close: "19:00" },
    dinnerThali: { label: "Dinner Thali", open: "19:30", close: "22:30" }
  },
  
  delivery: { 
    freeRadiusKm: 5, 
    maxRadiusKm: 7, 
    minCharge: 10, 
    maxCharge: 20 
  },
  
  sundaySpecial: { 
    enabled: true, 
    text: "Sunday Special: Garma-Garam Chole Bhature available today!" 
  },
  
  zones: [
    { name: "Khadoli", note: "Industrial Area — Free Delivery" },
    { name: "Khanvel", note: "Residential — Delivery Fee applies over 5km" },
    { name: "Rakholi", note: "Mixed Zone — Check distance for delivery fee" }
  ],
  
  menu: [
    {
      category: "Morning Snacks",
      daypart: "morningSnacks",
      items: [
        { name: "Samosa (2 pcs)", nameHi: "समोसा", price: 30, desc: "Crispy potato-filled pastry served with green chutney." },
        { name: "Aloo Paratha", nameHi: "आलू पराठा", price: 50, desc: "Stuffed whole wheat flatbread, served with fresh curd." },
        { name: "Sattu Paratha", nameHi: "सत्तू पराठा", price: 55, desc: "Traditional roasted gram flour stuffed paratha." }
      ]
    },
    {
      category: "Lunch Thali",
      daypart: "lunchThali",
      items: [
        { name: "Regular Thali", nameHi: "रेगुलर थाली", price: 149, desc: "Dal Tadka, Seasonal Sabzi, 4 Roti, Jeera Rice, Salad, Pickle." },
        { name: "Paneer Thali", nameHi: "पनीर थाली", price: 179, desc: "Paneer Butter Masala, Dal, 4 Roti, Rice, Salad, Sweet." },
        { name: "Chole Thali", nameHi: "छोले थाली", price: 149, desc: "Punjabi Chole, 4 Roti, Rice, Salad, Pickle." }
      ]
    },
    {
      category: "Dinner Thali",
      daypart: "dinnerThali",
      items: [
        { name: "Ghar Ki Thali", nameHi: "घर की थाली", price: 139, desc: "Homestyle Dal, Aloo Sabzi, 4 Roti, Rice." }
      ]
    }
  ]
};
