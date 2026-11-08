/**
 * Project catalogue for html/project-details.html (?id=<key>).
 * To add a project, add an entry here — no new HTML page required.
 */
window.PROJECTS = {
  commercial: {
    pageTitle: "Commercial Project Details",
    breadcrumb: "Commercial Tower · South Dania, Dhaka.",
    status: "Under Construction · On Schedule",
    category: "Commercial Development",
    title: "SARKER Tower",
    subtitle: "Premium Office Space",
    address: "South Dania, Dhaka, Bangladesh",
    pills: [
      { icon: "currency", label: "25 Floors" },
      { icon: "clock", label: "In Progress" },
    ],
    specs: [
      ["Building Type", "Office Tower"],
      ["Total Floors", "25"],
      ["Total Area", "150000 sqft"],
      ["Parking Spaces", "400+"],
      ["Completion Date", "Q4 2025"],
      ["Budget", "Premium"],
    ],
    disclaimer: "Images are artist's impressions.",
    images: [
      { src: "/assests/commerial/VATARA 100 FEET/01.jpg", title: "Tower Facade", tag: "Exterior · Front" },
      { src: "/assests/commerial/VATARA 100 FEET/01.jpg", title: "Evening View", tag: "Exterior · Night" },
      { src: "/assests/commerial/VATARA 100 FEET/01.jpg", title: "Entrance Lobby", tag: "Interior · Lobby" },
      { src: "/assests/commerial/VATARA 100 FEET/01.jpg", title: "Office Spaces", tag: "Interior · Office" },
    ],
  },

  interior: {
    pageTitle: "Interior Project Details",
    breadcrumb: "Interior Design · Badda, Dhaka-1212.",
    status: "Completed · 2024",
    category: "Interior Design",
    title: "GRASP Office Interior",
    subtitle: "Modern & Professional",
    address: "Badda, Dhaka-1212, Bangladesh",
    pills: [
      { icon: "grid", label: "Contemporary" },
      { icon: "clock", label: "Completed" },
    ],
    specs: [
      ["Style", "Modern Minimalist"],
      ["Area", "2500 sqft"],
      ["Rooms", "05 Spaces"],
      ["Completion", "March 2024"],
      ["Client", "GRASP Inc."],
    ],
    disclaimer: "Images are subject to copyright.",
    images: [
      { src: "/assests/interior/badda/01.jpg", title: "Main Office Space", tag: "Interior · Office" },
      { src: "/assests/interior/badda/02.jpg", title: "Reception & Meeting Area", tag: "Interior · Reception" },
      { src: "/assests/interior/badda/03.jpg", title: "Workspace Design", tag: "Interior · Workspace" },
    ],
  },

  residential: {
    pageTitle: "Residential Project Details",
    breadcrumb: "Luxury Residence · South Dania, Dhaka.",
    status: "Completed · Delivered",
    category: "Luxury Residential",
    title: "SARKER Residence",
    subtitle: "Premium Living",
    address: "South Dania, Dhaka, Bangladesh",
    pills: [
      { icon: "star", label: "Luxury" },
      { icon: "clock", label: "Ready" },
    ],
    specs: [
      ["Property Type", "Luxury Apartment"],
      ["Area", "5000 sqft"],
      ["Bedrooms", "04"],
      ["Bathrooms", "04"],
      ["Completion", "Dec 2023"],
      ["Floor", "Penthouse"],
    ],
    disclaimer: "Images are of the completed property.",
    images: [
      { src: "/assests/resendential/SARKER REALSTATE/01.jpg", title: "Exterior View", tag: "Exterior · Front" },
      { src: "/assests/resendential/SARKER REALSTATE/02.jpg", title: "Side Elevation", tag: "Exterior · Side" },
      { src: "/assests/resendential/SARKER REALSTATE/Swimming pool.jpeg", title: "Swimming Pool Amenity", tag: "Amenity · Pool" },
      { src: "/assests/resendential/SHATATA TOWER/002.jpg", title: "Landscape View", tag: "Exterior · Landscape" },
      { src: "/assests/resendential/SHATATA TOWER/Dakkhin Khan_corel_1.jpg", title: "Evening Ambience", tag: "View · Night" },
      { src: "/assests/resendential/SOLMAID RESIDENCE/01.jpg", title: "Modern Interior", tag: "Interior · Living" },
      { src: "/assests/resendential/SOLMAID RESIDENCE/02.jpg", title: "Master Suite", tag: "Interior · Bedroom" },
    ],
  },
};
