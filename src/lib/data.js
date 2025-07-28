
export const getDiscoverData = async (t, language = 'fr') => {
  try {
    const response = await fetch('/data/discover.json');
    const data = await response.json();
    
    // Transform data based on current language
    const transformItems = (items) => {
      return items.map(item => ({
        name: item.name[language] || item.name.fr,
        type: item.type[language] || item.type.fr,
        details: item.details ? (item.details[language] || item.details.fr) : undefined,
        distance: item.distance[language] || item.distance.fr,
        mapLink: item.mapLink,
        img: item.img
      }));
    };

    return {
      restaurants: transformItems(data.restaurants),
      activites: transformItems(data.activities),
      commerces: transformItems(data.shops),
      transports: transformItems(data.transport)
    };
  } catch (error) {
    console.error('Error loading discover data:', error);
    // Fallback to original hardcoded data if JSON fails
    return getFallbackData(t);
  }
};

export const getLogoUrl = () => {
    return '/assets/images/logo.png';
};
