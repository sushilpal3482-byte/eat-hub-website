// data.js
const siteData = {
  restaurant: {
    name: "Eat Hub",
    tagline: "Fresh & Tasty",
    legacyText: "Since 2003 · Formerly Prayagraj Hotel",
    whatsappNumber: "919737786796", 
    address: "Prayagraj Hotel, 526J+C2 Khadoli, Dadra and Nagar Haveli and Daman and Diu",
    googleMapsLink: "https://maps.app.goo.gl/U4zJzJzJzJzJzJzJz", 
    location: { lat: 20.2741, lng: 73.0083 }, // Update these coordinates for exact GPS precision
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
    text: "Sunday Special: Order any 2 Thalis and get a complimentary Chaas!" 
  },
  
  zones: [
    { name: "Khadoli", note: "Industrial Area — Free Delivery" },
    { name: "Khanvel", note: "Residential — Distance Fee over 5km" },
    { name: "Rakholi", note: "Mixed Zone — Check distance for fee" }
  ],
  
  menu: [
    {
      category: "Morning Snacks",
      daypart: "morningSnacks",
      note: "Minimum order ₹200. Bulk orders accepted for Samosa and Cutlets.",
      items: [
        { name: "Jalebi (100g)", nameHi: "जलेबी", price: 25, desc: "Hot, crispy, and sweet." },
        { name: "Vada Pav (2 pcs)", nameHi: "वड़ा पाव", price: 20, desc: "Classic street-style Vada Pav." },
        { name: "Samosa (1 pc)", nameHi: "समोसा", price: 10, desc: "Crispy potato pastry." },
        { name: "Samosa Bucket (7 pcs)", nameHi: "समोसा बकेट", price: 60, desc: "Perfect for sharing." },
        { name: "Cutlet (1 pc)", nameHi: "कटलेट", price: 15, desc: "Crispy vegetable cutlet." }
      ]
    },
    {
      category: "Lunch Thali",
      daypart: "lunchThali",
      items: [
        { name: "Regular Thali", nameHi: "रेगुलर थाली", price: 149, desc: "Rice, Dal, Sabji, 4 Roti, Curd, Salad, Pickle." },
        { name: "Paneer Thali", nameHi: "पनीर थाली", price: 169, desc: "Rice, Dal, Paneer Sabji, 4 Roti, Curd, Salad, Pickle." },
        { name: "Chole Thali", nameHi: "छोले थाली", price: 159, desc: "Rice, Dal, Chole, 4 Roti, Curd, Salad, Pickle." }
      ]
    },
    {
      category: "Special Bowls (500g)",
      daypart: "allDay",
      items: [
        { name: "Dal-Rice Bowl", nameHi: "दाल-चावल बाउल", price: 59, desc: "Comforting Dal and Jeera Rice." },
        { name: "Chole-Chawal Bowl", nameHi: "छोले-चावल बाउल", price: 69, desc: "Punjabi Chole served over Rice." },
        { name: "Paneer-Rice Bowl", nameHi: "पनीर-चावल बाउल", price: 79, desc: "Paneer gravy served over Rice." }
      ]
    },
    {
      category: "Parathas",
      daypart: "allDay",
      items: [
        { name: "Aloo Paratha", nameHi: "आलू पराठा", price: 51, desc: "Served with green chutney and raita." },
        { name: "Pyaaz Paratha", nameHi: "प्याज़ पराठा", price: 59, desc: "Served with green chutney and raita." },
        { name: "Sattu Paratha", nameHi: "सत्तू पराठा", price: 69, desc: "Served with green chutney and raita." }
      ]
    },
    {
      category: "Evening Snacks",
      daypart: "eveningSnacks",
      items: [
        { name: "Samosa Bucket (7 pcs)", nameHi: "समोसा बकेट", price: 60, desc: "Crispy hot samosas for evening tea." },
        { name: "Aloo Paratha", nameHi: "आलू पराठा", price: 51, desc: "Served with green chutney and raita." },
        { name: "Pyaaz Paratha", nameHi: "प्याज़ पराठा", price: 59, desc: "Served with green chutney and raita." },
        { name: "Sattu Paratha", nameHi: "सत्तू पराठा", price: 69, desc: "Served with green chutney and raita." }
      ]
    },
    {
      category: "Dinner Thali",
      daypart: "dinnerThali",
      items: [
        { name: "Regular Thali", nameHi: "रेगुलर थाली", price: 149, desc: "Rice, Dal, Sabji, 4 Roti, Curd, Salad, Pickle." },
        { name: "Paneer Thali", nameHi: "पनीर थाली", price: 169, desc: "Rice, Dal, Paneer Sabji, 4 Roti, Curd, Salad, Pickle." },
        { name: "Chole Thali", nameHi: "छोले थाली", price: 159, desc: "Rice, Dal, Chole, 4 Roti, Curd, Salad, Pickle." }
      ]
    },
    {
      category: "Beverages & Add-ons",
      daypart: "allDay",
      items: [
        { name: "Water Bottle (1 L)", nameHi: "पानी की बोतल", price: 20, desc: "Chilled packaged drinking water." },
        { name: "Curd", nameHi: "दही", price: 20, desc: "Fresh bowl of plain curd." },
        { name: "Chaas", nameHi: "छाछ", price: 20, desc: "Refreshing spiced buttermilk." },
        { name: "Lassi", nameHi: "लस्सी", price: 25, desc: "Sweet, thick yogurt drink." },
        { name: "Coke / Thums Up (250ml)", nameHi: "कोल्ड ड्रिंक", price: 20, desc: "Chilled soft drink." },
        { name: "Coke / Thums Up (1.25 L)", nameHi: "कोल्ड ड्रिंक", price: 50, desc: "Family size soft drink." },
        { name: "Coke / Thums Up (2.25 L)", nameHi: "कोल्ड ड्रिंक", price: 100, desc: "Party size soft drink." }
      ]
    }
  ]
};
