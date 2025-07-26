export const getDiscoverData = (t) => {
  return {
    restaurants: [
      { 
        name: t.recommandations.resto1_name, 
        type: t.recommandations.french_cuisine, 
        distance: `0 ${t.recommandations.walk_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.resto1_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
      },
      { 
        name: t.recommandations.resto2_name, 
        type: t.recommandations.traditional_brasserie, 
        distance: `5 ${t.recommandations.walk_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.resto2_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      { 
        name: t.recommandations.resto3_name, 
        type: t.recommandations.regional_cuisine, 
        distance: `8 ${t.recommandations.walk_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.resto3_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
    ],
    activites: [
      { 
        name: t.recommandations.activite1_name, 
        type: t.recommandations.spiritual, 
        distance: `10 ${t.recommandations.walk_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.activite1_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1588463943336-3a78931557e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      { 
        name: t.recommandations.activite2_name, 
        type: t.recommandations.historical, 
        distance: `15 ${t.recommandations.walk_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.activite2_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      { 
        name: t.recommandations.activite3_name, 
        type: t.recommandations.nature_panorama, 
        distance: `20 ${t.recommandations.car_distance}`, 
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.recommandations.activite3_name + ", Lourdes")}`,
        img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
    ]
  };
};

export const getLogoUrl = () => {
    return 'https://images.unsplash.com/photo-1641715873543-4f9e220115f2';
};