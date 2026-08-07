const siteData = {
  restaurant: {
    name: "Eat Hub",
    tagline: "Fresh & Tasty",
    legacyText: "Since 2003 · Formerly Prayagraj Hotel",
    whatsappNumber: "919737786796", 
    address: "Prayagraj Hotel, 526J+C2 Khadoli, Dadra and Nagar Haveli and Daman and Diu",
    googleMapsLink: "https://maps.app.goo.gl/U4zJzJzJzJzJzJzJz", 
    location: { lat: 20.16108374112911, lng: 73.03006390271933 },
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
      note: "Minimum order ₹200. Bulk orders accepted for Samosa, Cutlets, and Bhajiya.",
      items: [
        { name: "Jalebi (100g)", nameHi: "जलेबी", price: 25, desc: "Hot, crispy, and sweet.", image: "images/JALEBI.jpeg" },
        { name: "Vada Pav (2 pcs)", nameHi: "वड़ा पाव", price: 20, desc: "Classic street-style Vada Pav.", image: "images/VADA%20PAV.jpeg" },
        { name: "Samosa (1 pc)", nameHi: "समोसा", price: 10, desc: "Crispy potato pastry.", image: "images/SAMOSA-PAV.jpeg" },
        { name: "Samosa Pav", nameHi: "समोसा पाव", price: 15, desc: "Crispy samosa served inside a soft bread roll with chutneys.", image: "images/SAMOSA-PAV.jpeg" },
        { name: "Bhajiya", nameHi: "भजिया", price: 30, desc: "Crispy assorted fritters, perfect with tea.", image: "images/BHAJIYA.jpeg" },
        { name: "Samosa Bucket (7 pcs)", nameHi: "समोसा बकेट", price: 60, desc: "Perfect for sharing.", image: "images/SAMOSA%20BUCKET.png" },
        { name: "Cutlet (1 pc)", nameHi: "कटलेट", price: 15, desc: "Crispy vegetable cutlet.", image: "images/BREAD%20CUTLET.jpeg" }
      ]
    },
    {
      category: "Lunch Thali",
      daypart: "lunchThali",
      items: [
        { name: "Regular Thali", nameHi: "रेगुलर थाली", price: 149, desc: "Rice, Dal, Sabji, 4 Roti, Curd, Salad, Pickle.", image: "images/VEG%20THALI.jpeg" },
        { name: "Paneer Thali", nameHi: "पनीर थाली", price: 169, desc: "Rice, Dal, Paneer Sabji, 4 Roti, Curd, Salad, Pickle.", image: "images/PANEER.jpeg" },
        { name: "Chole Thali", nameHi: "छोले थाली", price: 159, desc: "Rice, Dal, Chole, 4 Roti, Curd, Salad, Pickle.", image: "images/CHOLE-CHAWAL%20BOWL.jpeg" }
      ]
    },
    {
      category: "Special Bowls (500g)",
      daypart: "allDay",
      items: [
        { name: "Dal-Rice Bowl", nameHi: "दाल-चावल बाउल", price: 59, desc: "Comforting Dal and Jeera Rice.", image: "images/DAL-RICE%20BOWL.jpeg" },
        { name: "Chole-Chawal Bowl", nameHi: "छोले-चावल बाउल", price: 69, desc: "Punjabi Chole served over Rice.", image: "images/CHOLE-CHAWAL%20BOWL.jpeg" },
        { name: "Paneer-Rice Bowl", nameHi: "पनीर-चावल बाउल", price: 79, desc: "Paneer gravy served over Rice.", image: "images/PANEER.jpeg" }
      ]
    },
    {
      category: "Parathas",
      daypart: "allDay",
      items: [
        { name: "Aloo Paratha", nameHi: "आलू पराठा", price: 51, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" },
        { name: "Pyaaz Paratha", nameHi: "प्याज़ पराठा", price: 59, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" },
        { name: "Sattu Paratha", nameHi: "सत्तू पराठा", price: 69, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" }
      ]
    },
    {
      category: "Evening Snacks",
      daypart: "eveningSnacks",
      items: [
        { name: "Samosa Pav", nameHi: "समोसा पाव", price: 15, desc: "Crispy samosa served inside a soft bread roll with chutneys.", image: "images/SAMOSA-PAV.jpeg" },
        { name: "Bhajiya", nameHi: "भजिया", price: 30, desc: "Crispy assorted fritters, perfect with tea.", image: "images/BHAJIYA.jpeg" },
        { name: "Samosa Bucket (7 pcs)", nameHi: "समोसा बकेट", price: 60, desc: "Crispy hot samosas for evening tea.", image: "images/SAMOSA%20BUCKET.png" },
        { name: "Aloo Paratha", nameHi: "आलू पराठा", price: 51, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" },
        { name: "Pyaaz Paratha", nameHi: "प्याज़ पराठा", price: 59, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" },
        { name: "Sattu Paratha", nameHi: "सत्तू पराठा", price: 69, desc: "Served with green chutney and raita.", image: "images/ALOO%20PARATHA.jpeg" }
      ]
    },
    {
      category: "Dinner Thali",
      daypart: "dinnerThali",
      items: [
        { name: "Regular Thali", nameHi: "रेगुलर थाली", price: 149, desc: "Rice, Dal, Sabji, 4 Roti, Curd, Salad, Pickle.", image: "images/VEG%20THALI.jpeg" },
        { name: "Paneer Thali", nameHi: "पनीर थाली", price: 169, desc: "Rice, Dal, Paneer Sabji, 4 Roti, Curd, Salad, Pickle.", image: "images/PANEER.jpeg" },
        { name: "Chole Thali", nameHi: "छोले थाली", price: 159, desc: "Rice, Dal, Chole, 4 Roti, Curd, Salad, Pickle.", image: "images/CHOLE-CHAWAL%20BOWL.jpeg" }
      ]
    },
    {
      category: "Beverages & Add-ons",
      daypart: "allDay",
      items: [
        { name: "Water Bottle (1 L)", nameHi: "पानी की बोतल", price: 20, desc: "Chilled packaged drinking water." },
        { name: "Curd", nameHi: "दही", price: 20, desc: "Fresh bowl of plain curd.", image: "images/CURD.jpeg" },
        { name: "Chaas", nameHi: "छाछ", price: 20, desc: "Refreshing spiced buttermilk.", image: "images/AMUL%20MASTI.jpeg" },
        { name: "Lassi", nameHi: "लस्सी", price: 25, desc: "Sweet, thick yogurt drink.", image: "images/AMUL%20LASSI.jpeg" },
        { name: "Coke / Thums Up (250ml)", nameHi: "कोल्ड ड्रिंक", price: 20, desc: "Chilled soft drink.", image: "images/COKE%20250ML.jpeg" },
        { name: "Coke / Thums Up (1.25 L)", nameHi: "कोल्ड ड्रिंक", price: 50, desc: "Family size soft drink.", image: "images/THUMBS-UP%20250ML.jpeg" },
        { name: "Coke / Thums Up (2.25 L)", nameHi: "कोल्ड ड्रिंक", price: 100, desc: "Party size soft drink.", image: "images/THUMBS-UP%20250ML.jpeg" }
      ]
    }
  ]
};
