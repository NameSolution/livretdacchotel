// Établissement fictif A — boutique-hôtel urbain (Lyon). Toutes les données sont de démonstration.
// Les champs optionnels absents sont simplement masqués par l'interface.

const img = (name, alt, position = '50% 50%') => ({ base: `/images/verriere/${name}`, alt, position });

export default {
  id: 'verriere',
  demo: true,
  name: 'Maison Verrière',
  city: 'Lyon',
  descriptor: { fr: 'Boutique-hôtel · Lyon 2e', en: 'Boutique hotel · Lyon' },
  theme: { accent: '#40584C', paper: '#F7F6F2', ink: '#222724', display: 'crisp' },
  languages: ['fr', 'en', 'es', 'it', 'de', 'pt', 'pl'],
  defaultLang: 'fr',

  images: {
    hero: img('hero', { fr: 'Chambre lumineuse aux grandes baies vitrées ouvertes sur la ville', en: 'Bright room with large windows overlooking the city' }, '60% 50%'),
    room: img('room', { fr: 'Détail d’une chambre : lampe de chevet et linge blanc sur fond bleu nuit', en: 'Room detail: bedside lamp and white linen against a midnight blue wall' }),
    breakfast: img('breakfast', { fr: 'Table de petit-déjeuner vue du dessus', en: 'Breakfast table seen from above' }),
    restaurant: img('restaurant', { fr: 'Salle de restaurant aux tables en bois et chaises sombres', en: 'Restaurant dining room with wooden tables and dark chairs' }, '50% 60%'),
    terrace: img('terrace', { fr: 'Terrasse couverte au crépuscule', en: 'Covered terrace at dusk' }),
    bar: img('bar', { fr: 'Comptoir d’un bar éclairé de lumières chaudes', en: 'A bar counter lit with warm lights' }),
    brunch: img('brunch', { fr: 'Brunch partagé, vue du dessus', en: 'Shared brunch seen from above' }),
    market: img('market', { fr: 'Étal de fruits et légumes colorés', en: 'Stall of colourful fruit and vegetables' }),
    bakery: img('bakery', { fr: 'Vitrine de boulangerie remplie de pains', en: 'Bakery shelves full of bread' }),
    cafe: img('cafe', { fr: 'Salle de café avec plantes et tables en bois', en: 'Café with plants and wooden tables' }),
  },
  // Photographie affichée dans la colonne latérale sur grand écran, par page.
  aside: { home: 'hero', wifi: 'room', breakfast: 'breakfast', info: 'room', discover: 'cafe', contact: 'terrace' },

  welcome: {
    title: { fr: 'Bienvenue à la *Maison Verrière*', en: 'Welcome to *Maison Verrière*' },
    message: {
      fr: 'Un pied-à-terre lumineux au cœur de Lyon. Tout votre séjour est ici.',
      en: 'A bright pied-à-terre in the heart of Lyon. Your whole stay is here.',
    },
    signature: { fr: 'Camille et toute l’équipe', en: 'Camille and the whole team' },
  },

  // Ordre et visibilité des blocs de l'accueil.
  home: { sections: ['essentials', 'services', 'nearby', 'index'], featured: ['halles', 'pivoine', 'cep'] },

  weather: { lat: 45.7578, lon: 4.832, place: 'Lyon' },

  wifi: {
    ssid: 'Verriere-Guest',
    password: 'Soie-Pierre-42',
    security: 'WPA',
    note: { fr: 'Un seul réseau pour tout l’hôtel, jusqu’à 5 appareils par chambre.', en: 'One network for the whole hotel, up to 5 devices per room.' },
  },

  stay: { checkIn: '15:00', checkOut: '11:00' },

  breakfast: {
    image: 'breakfast',
    title: { fr: 'Petit-déjeuner *à la française*', en: 'A *French-style* breakfast' },
    intro: {
      fr: 'Un buffet simple et généreux, composé avec des producteurs et artisans de la région lyonnaise.',
      en: 'A simple, generous buffet put together with producers and bakers from around Lyon.',
    },
    hours: [
      { days: { fr: 'Lundi – vendredi', en: 'Monday – Friday' }, weekdays: [1, 2, 3, 4, 5], from: '07:00', to: '10:30' },
      { days: { fr: 'Samedi – dimanche', en: 'Saturday – Sunday' }, weekdays: [0, 6], from: '07:30', to: '11:00' },
    ],
    price: { adult: '19 €', child: '9 €', note: { fr: 'Gratuit pour les moins de 6 ans. Inclus dans les tarifs « petit-déjeuner compris ».', en: 'Free under 6. Included in “breakfast included” rates.' } },
    place: { fr: 'Salle des Verrières — rez-de-chaussée, accès depuis le hall', en: 'Salle des Verrières — ground floor, from the lobby' },
    buffet: [
      { fr: 'Viennoiseries et pains de la boulangerie voisine', en: 'Pastries and breads from the bakery next door' },
      { fr: 'Fromages et charcuteries de la région', en: 'Regional cheeses and cured meats' },
      { fr: 'Fruits de saison, yaourts, céréales', en: 'Seasonal fruit, yoghurts, cereals' },
      { fr: 'Œufs préparés à la demande', en: 'Eggs cooked to order' },
      { fr: 'Café, thés et jus pressés', en: 'Coffee, teas and pressed juices' },
    ],
    notes: [
      { fr: 'Options végétariennes et sans gluten : signalez-le au personnel de salle.', en: 'Vegetarian and gluten-free options: just tell the dining room team.' },
      { fr: 'Petit-déjeuner en chambre possible, à demander à la réception la veille (supplément).', en: 'Breakfast in your room is available — ask reception the day before (extra charge).' },
    ],
  },

  contact: {
    phone: '04 65 71 00 42',
    ext: '9',
    email: 'bonjour@maison-verriere.example',
    hours: { fr: 'Réception ouverte 24 h/24', en: 'Reception open 24/7' },
    always: true,
    address: { fr: 'Lyon 2e — adresse fictive de démonstration', en: 'Lyon 2nd — fictional demo address' },
    languages: ['Français', 'English', 'Español', 'Italiano'],
  },

  services: [
    { id: 'restaurant', title: { fr: 'Le Comptoir Verrière', en: 'Le Comptoir Verrière' }, hours: { fr: '12 h – 14 h · 19 h – 22 h', en: '12–2 pm · 7–10 pm' }, detail: { fr: 'Bistrot de l’hôtel · fermé le dimanche soir', en: 'Hotel bistro · closed Sunday evening' } },
    { id: 'bar', title: { fr: 'Bar & terrasse', en: 'Bar & terrace' }, hours: { fr: '17 h – minuit', en: '5 pm – midnight' }, detail: { fr: 'Cocktails, vins au verre, planches à partager', en: 'Cocktails, wines by the glass, sharing boards' } },
    { id: 'luggage', title: { fr: 'Bagagerie', en: 'Luggage room' }, hours: { fr: 'Jusqu’à 20 h', en: 'Until 8 pm' }, detail: { fr: 'Gratuite, le jour du départ', en: 'Free, on departure day' } },
  ],

  info: {
    groups: [
      {
        id: 'stay',
        title: { fr: 'Votre séjour', en: 'Your stay' },
        items: [
          { id: 'checkin', title: { fr: 'Arrivée', en: 'Check-in' }, summary: { fr: 'À partir de 15 h', en: 'From 3 pm' }, body: { fr: 'Votre chambre est prête à partir de 15 h. Vous arrivez plus tôt ? Nous gardons volontiers vos bagages et vous prévenons dès que la chambre est libre.', en: 'Your room is ready from 3 pm. Arriving earlier? We’re happy to keep your bags and let you know as soon as the room is free.' } },
          { id: 'checkout', title: { fr: 'Départ', en: 'Check-out' }, summary: { fr: 'Avant 11 h', en: 'By 11 am' }, body: { fr: 'Merci de libérer la chambre avant 11 h et de déposer votre clé à la réception ou dans la boîte du hall. Un départ plus tardif est parfois possible : demandez à la réception.', en: 'Please vacate the room by 11 am and leave your key at reception or in the lobby box. A later departure is sometimes possible — ask at reception.' } },
          { id: 'luggage', title: { fr: 'Bagagerie', en: 'Luggage storage' }, summary: { fr: 'Gratuite, jusqu’à 20 h', en: 'Free, until 8 pm' }, body: { fr: 'Un local fermé derrière la réception accueille vos bagages avant l’arrivée et après le départ. Une étiquette numérotée vous est remise.', en: 'A locked room behind reception holds your bags before check-in and after check-out. You’ll get a numbered tag.' } },
          { id: 'reception', title: { fr: 'Réception', en: 'Reception' }, summary: { fr: '24 h/24 · poste 9', en: '24/7 · ext. 9' }, body: { fr: 'Depuis le téléphone de votre chambre, composez le 9. Réservation de taxi, conseils d’itinéraires, demande de réveil : l’équipe vous répond à toute heure.', en: 'From your room phone, dial 9. Taxi bookings, route advice, wake-up calls: the team answers at any hour.' } },
        ],
      },
      {
        id: 'room',
        title: { fr: 'Chambre & équipements', en: 'Room & equipment' },
        items: [
          { id: 'climate', title: { fr: 'Climatisation et chauffage', en: 'Air conditioning & heating' }, summary: { fr: 'Télécommande sur la table de chevet', en: 'Remote on the bedside table' }, body: { fr: 'Pour de meilleurs résultats, gardez les fenêtres fermées pendant l’utilisation. Nous conseillons 22 °C. Si la chambre ne vous convient pas, appelez la réception.', en: 'For best results keep windows closed while it’s running. We suggest 22 °C. If the room isn’t comfortable, call reception.' } },
          {
            id: 'equipment',
            title: { fr: 'Équipements', en: 'In-room equipment' },
            summary: { fr: 'Coffre-fort, bouilloire, sèche-cheveux', en: 'Safe, kettle, hairdryer' },
            bullets: [
              { fr: 'Coffre-fort dans la penderie', en: 'Safe in the wardrobe' },
              { fr: 'Bouilloire, thés et cafés offerts', en: 'Kettle, complimentary tea and coffee' },
              { fr: 'Sèche-cheveux ; fer à repasser sur demande', en: 'Hairdryer; iron on request' },
              { fr: 'Double vitrage et rideaux occultants', en: 'Double glazing and blackout curtains' },
            ],
          },
          { id: 'pets', title: { fr: 'Animaux', en: 'Pets' }, summary: { fr: 'Acceptés jusqu’à 8 kg', en: 'Welcome up to 8 kg' }, body: { fr: 'Supplément de 12 € par nuit. Gamelle et panier sur demande. Les animaux ne sont pas admis en salle de petit-déjeuner.', en: 'Extra charge of €12 per night. Bowl and bed on request. Pets are not allowed in the breakfast room.' } },
          { id: 'housekeeping', title: { fr: 'Ménage', en: 'Housekeeping' }, summary: { fr: 'Chaque jour entre 10 h et 16 h', en: 'Daily, between 10 am and 4 pm' }, body: { fr: 'Pour ne pas être dérangé, accrochez la pancarte à la poignée. Pour un séjour plus sobre, vous pouvez aussi demander un ménage tous les deux jours à la réception.', en: 'To avoid being disturbed, hang the sign on the door handle. For a lighter-footprint stay, ask reception for cleaning every other day.' } },
        ],
      },
      {
        id: 'access',
        title: { fr: 'Parking & accès', en: 'Parking & access' },
        items: [
          { id: 'parking', title: { fr: 'Parking', en: 'Parking' }, summary: { fr: 'Parking public à 150 m', en: 'Public car park 150 m away' }, body: { fr: 'Parking souterrain à 150 m, à tarif préférentiel (21 € / 24 h) sur présentation du ticket validé à la réception. Dépose-bagages devant l’hôtel pendant 15 minutes.', en: 'Underground car park 150 m away with a preferential rate (€21 / 24 h) when you show your ticket validated at reception. 15-minute luggage drop-off in front of the hotel.' } },
          { id: 'bikes', title: { fr: 'Vélos', en: 'Bicycles' }, summary: { fr: 'Abri sécurisé dans la cour', en: 'Secure shelter in the courtyard' }, body: { fr: 'Un abri fermé est à votre disposition dans la cour. Demandez le code à la réception.', en: 'A locked shelter is available in the courtyard. Ask reception for the code.' } },
          { id: 'arrival', title: { fr: 'Venir à l’hôtel', en: 'Getting here' }, summary: { fr: 'Métro Bellecour à 4 min à pied', en: 'Bellecour metro, 4 min on foot' }, body: { fr: 'Depuis la gare Part-Dieu : métro B puis A jusqu’à Bellecour (environ 15 minutes). Depuis l’aéroport Saint-Exupéry : Rhônexpress jusqu’à Part-Dieu, puis le métro.', en: 'From Part-Dieu station: metro B then A to Bellecour (about 15 minutes). From Saint-Exupéry airport: Rhônexpress to Part-Dieu, then the metro.' } },
        ],
      },
      {
        id: 'services',
        title: { fr: 'Services de l’hôtel', en: 'Hotel services' },
        items: [
          { id: 'restaurant', title: { fr: 'Le Comptoir Verrière', en: 'Le Comptoir Verrière' }, summary: { fr: '12 h – 14 h · 19 h – 22 h', en: '12–2 pm · 7–10 pm' }, body: { fr: 'Le bistrot de l’hôtel propose une cuisine de saison. Fermé le dimanche soir. Menu du jour affiché à l’entrée de la salle.', en: 'The hotel bistro serves seasonal cooking. Closed on Sunday evenings. Daily menu posted at the dining room entrance.' } },
          { id: 'bar', title: { fr: 'Bar & terrasse', en: 'Bar & terrace' }, summary: { fr: '17 h – minuit', en: '5 pm – midnight' }, body: { fr: 'Ouvert à tous les clients. La terrasse ferme à 22 h par respect pour le voisinage.', en: 'Open to all guests. The terrace closes at 10 pm out of respect for the neighbours.' } },
          { id: 'laundry', title: { fr: 'Blanchisserie', en: 'Laundry' }, summary: { fr: 'Dépôt avant 9 h, retour sous 24 h', en: 'Drop off before 9 am, back within 24 h' }, body: { fr: 'Déposez votre linge à la réception avant 9 h. Tarifs à l’unité disponibles sur demande.', en: 'Leave your laundry at reception before 9 am. Per-item prices available on request.' } },
        ],
      },
      {
        id: 'rules',
        title: { fr: 'Règlement intérieur', en: 'House rules' },
        items: [
          { id: 'quiet', title: { fr: 'Calme', en: 'Quiet hours' }, summary: { fr: '22 h – 7 h', en: '10 pm – 7 am' }, body: { fr: 'Nous vous remercions de respecter le repos des autres clients, notamment dans les couloirs et la cour.', en: 'Please respect other guests’ rest, especially in the corridors and the courtyard.' } },
          { id: 'smoking', title: { fr: 'Non-fumeur', en: 'Non-smoking' }, summary: { fr: 'Dans tout l’hôtel', en: 'Throughout the hotel' }, body: { fr: 'Il est interdit de fumer et de vapoter dans les chambres et les espaces communs. Un coin fumeur est aménagé dans la cour.', en: 'Smoking and vaping are not allowed in rooms and shared areas. A smoking corner is set up in the courtyard.' } },
          { id: 'visitors', title: { fr: 'Visiteurs', en: 'Visitors' }, summary: { fr: 'Dans les espaces communs uniquement', en: 'Shared areas only' }, body: { fr: 'Les visiteurs sont les bienvenus au bar et au restaurant. L’accès aux chambres est réservé aux clients.', en: 'Visitors are welcome at the bar and restaurant. Rooms are for registered guests only.' } },
        ],
      },
      {
        id: 'useful',
        title: { fr: 'Infos utiles & urgences', en: 'Useful info & emergencies' },
        emergency: true,
        items: [
          { id: 'fire', title: { fr: 'Consignes incendie', en: 'Fire safety' }, summary: { fr: 'Plan derrière la porte de la chambre', en: 'Plan behind your room door' }, body: { fr: 'En cas d’alarme, quittez la chambre en refermant la porte et rejoignez l’escalier le plus proche. N’utilisez pas l’ascenseur.', en: 'If the alarm sounds, leave the room, close the door and head for the nearest stairs. Do not use the lift.' } },
          { id: 'doctor', title: { fr: 'Besoin d’un médecin ?', en: 'Need a doctor?' }, summary: { fr: 'La réception peut appeler un médecin', en: 'Reception can call a doctor' }, body: { fr: 'À toute heure, l’équipe vous aide à joindre un médecin de garde. En cas d’urgence vitale, appelez directement le 15 ou le 112.', en: 'At any hour the team can help you reach an on-call doctor. In a life-threatening emergency call 15 or 112 directly.' } },
        ],
      },
    ],
  },

  discover: {
    places: [
      // Restaurants
      { id: 'comptoir', cat: 'restaurants', image: 'restaurant', name: 'Le Comptoir Verrière', type: { fr: 'Bistrot lyonnais', en: 'Lyonnais bistro' }, onsite: true, description: { fr: 'Cuisine de saison à l’heure du déjeuner et du dîner, dans la salle ou sur la terrasse.', en: 'Seasonal cooking at lunch and dinner, in the dining room or on the terrace.' }, hours: { fr: '12 h – 14 h · 19 h – 22 h', en: '12–2 pm · 7–10 pm' } },
      { id: 'pivoine', cat: 'restaurants', image: 'brunch', name: 'Pivoine Café', type: { fr: 'Brunch & café', en: 'Brunch & café' }, distance: { mode: 'walk', min: 3 }, description: { fr: 'Brunch toute la matinée, pâtisseries maison et café de torréfacteur.', en: 'Brunch all morning, house pastries and roaster coffee.' } },
      { id: 'odette', cat: 'restaurants', name: 'Bouchon Chez Odette', type: { fr: 'Bouchon lyonnais', en: 'Lyonnais bouchon' }, distance: { mode: 'walk', min: 8 }, description: { fr: 'Cuisine lyonnaise traditionnelle, ambiance conviviale. Réservation conseillée le soir.', en: 'Traditional Lyonnais cooking in a convivial setting. Booking recommended in the evening.' } },
      { id: 'cep', cat: 'restaurants', image: 'bar', name: 'Le Cep', type: { fr: 'Bar à vins', en: 'Wine bar' }, distance: { mode: 'walk', min: 5 }, description: { fr: 'Vins de la vallée du Rhône au verre et assiettes à partager.', en: 'Rhône valley wines by the glass and plates to share.' }, hours: { fr: 'Dès 17 h, fermé le dimanche', en: 'From 5 pm, closed Sunday' } },
      // À découvrir (lieux réels, distances indicatives)
      { id: 'vieux-lyon', cat: 'sights', name: 'Vieux Lyon', type: { fr: 'Quartier historique', en: 'Historic district' }, distance: { mode: 'walk', min: 15, approx: true }, mapsQuery: 'Vieux Lyon, Lyon', description: { fr: 'Quartier Renaissance classé à l’UNESCO : ruelles pavées, cours intérieures et traboules.', en: 'UNESCO-listed Renaissance district: cobbled lanes, courtyards and traboules.' } },
      { id: 'fourviere', cat: 'sights', name: 'Basilique Notre-Dame de Fourvière', type: { fr: 'Monument & panorama', en: 'Landmark & viewpoint' }, distance: { mode: 'walk', min: 30, approx: true }, mapsQuery: 'Basilique Notre-Dame de Fourvière, Lyon', description: { fr: 'La basilique domine la ville ; le parvis offre l’un des plus beaux panoramas de Lyon. Montée en funiculaire depuis Vieux Lyon.', en: 'The basilica overlooks the city; its forecourt has one of Lyon’s best views. Take the funicular up from Vieux Lyon.' } },
      { id: 'halles', cat: 'sights', image: 'market', name: 'Halles de Lyon Paul Bocuse', type: { fr: 'Marché couvert', en: 'Covered market' }, distance: { mode: 'transit', min: 15, approx: true }, mapsQuery: 'Les Halles de Lyon Paul Bocuse', description: { fr: 'Le grand marché gourmand de la ville : produits, comptoirs de dégustation et spécialités lyonnaises.', en: 'The city’s food market: produce, tasting counters and Lyonnais specialities.' } },
      { id: 'tete-or', cat: 'sights', name: 'Parc de la Tête d’Or', type: { fr: 'Parc urbain', en: 'City park' }, distance: { mode: 'transit', min: 20, approx: true }, mapsQuery: 'Parc de la Tête d’Or, Lyon', description: { fr: 'Grand parc avec lac, jardin botanique et zoo, en accès libre.', en: 'Large park with a lake, botanical garden and zoo, free to enter.' } },
      // Transports
      { id: 'bellecour', cat: 'transport', name: 'Métro Bellecour', type: { fr: 'Métro — lignes A et D', en: 'Metro — lines A and D' }, distance: { mode: 'walk', min: 4, approx: true }, mapsQuery: 'Station Bellecour, Lyon', description: { fr: 'Accès direct à Perrache (A) et à Vieux Lyon (D).', en: 'Direct to Perrache (A) and Vieux Lyon (D).' } },
      { id: 'part-dieu', cat: 'transport', name: 'Gare de Lyon Part-Dieu', type: { fr: 'Gare TGV & TER', en: 'High-speed & regional trains' }, distance: { mode: 'transit', min: 15, approx: true }, mapsQuery: 'Gare de Lyon Part-Dieu', description: { fr: 'Métro B puis A, environ 15 minutes.', en: 'Metro B then A, about 15 minutes.' } },
      { id: 'airport', cat: 'transport', name: 'Aéroport Lyon-Saint-Exupéry', type: { fr: 'Rhônexpress', en: 'Rhônexpress' }, mapsQuery: 'Aéroport Lyon-Saint-Exupéry', description: { fr: 'Le tram express relie Part-Dieu à l’aéroport en une trentaine de minutes.', en: 'The express tram links Part-Dieu to the airport in about thirty minutes.' } },
      { id: 'taxi', cat: 'transport', name: { fr: 'Taxis', en: 'Taxis' }, type: { fr: 'Sur demande', en: 'On request' }, description: { fr: 'La réception réserve votre taxi à toute heure.', en: 'Reception books your taxi at any hour.' } },
      // Commerces & services (fictifs)
      { id: 'ble-sel', cat: 'services', image: 'bakery', name: 'Boulangerie Blé & Sel', type: { fr: 'Boulangerie', en: 'Bakery' }, distance: { mode: 'walk', min: 2 }, description: { fr: 'La boulangerie voisine, dont les pains et viennoiseries sont servis au petit-déjeuner.', en: 'The bakery next door — its breads and pastries are served at breakfast.' }, hours: { fr: '6 h 30 – 19 h 30, fermé le lundi', en: '6:30 am – 7:30 pm, closed Monday' } },
      { id: 'epicerie', cat: 'services', name: 'Épicerie Saint-Paul', type: { fr: 'Épicerie de proximité', en: 'Local grocery' }, distance: { mode: 'walk', min: 3 }, description: { fr: 'Produits frais, boissons et dépannage, ouvert tard.', en: 'Fresh produce, drinks and essentials, open late.' }, hours: { fr: '8 h – 22 h, tous les jours', en: '8 am – 10 pm, daily' } },
      { id: 'pharmacie', cat: 'services', name: { fr: 'Pharmacie de garde', en: 'On-duty pharmacy' }, type: { fr: 'Santé', en: 'Health' }, phone: '3237', description: { fr: 'Le 3237 indique la pharmacie de garde la plus proche, à toute heure.', en: 'Dial 3237 to find the nearest on-duty pharmacy at any hour (France).' } },
    ],
  },
};
