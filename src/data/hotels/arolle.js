// Établissement fictif B — chalet-hôtel de montagne (Chamonix). Toutes les données sont de démonstration.
// Même schéma que verriere.js : seules les valeurs changent.

const img = (name, alt, position = '50% 50%') => ({ base: `/images/arolle/${name}`, alt, position });

export default {
  id: 'arolle',
  demo: true,
  name: 'Chalet-Hôtel L’Arolle',
  city: 'Chamonix',
  descriptor: { fr: 'Chalet-hôtel · Chamonix-Mont-Blanc', en: 'Chalet hotel · Chamonix-Mont-Blanc' },
  theme: { accent: '#8A4B2D', paper: '#F6F1E9', ink: '#2A211B', display: 'soft' },
  languages: ['fr', 'en', 'es', 'it', 'de', 'pt', 'pl'],
  defaultLang: 'fr',

  images: {
    hero: img('hero', { fr: 'Chalet illuminé au bord d’un lac gelé, sous la neige', en: 'Lit chalet beside a frozen lake, under snow' }, '50% 55%'),
    room: img('room', { fr: 'Lit installé sur un balcon face à une vallée de montagne', en: 'Bed on a deck facing a mountain valley' }, '50% 60%'),
    breakfast: img('breakfast', { fr: 'Pancakes aux fruits rouges sur une table en bois', en: 'Berry pancakes on a wooden table' }),
    restaurant: img('restaurant', { fr: 'Table dressée pour un dîner', en: 'Table set for dinner' }),
    bar: img('bar', { fr: 'Bar chaleureux aux lumières tamisées', en: 'Warm bar with dimmed lights' }),
    hike: img('hike', { fr: 'Randonneurs sur un sentier de montagne', en: 'Hikers on a mountain trail' }, '60% 50%'),
    ski: img('ski', { fr: 'Skieurs sur un large domaine enneigé', en: 'Skiers on a wide snowy slope' }),
    viewpoint: img('viewpoint', { fr: 'Randonneur face à une mer de nuages', en: 'Hiker facing a sea of clouds' }),
    sunset: img('sunset', { fr: 'Sommets au coucher du soleil au-dessus des nuages', en: 'Peaks at sunset above the clouds' }),
    cabin: img('cabin', { fr: 'Cabane en bois dans la forêt', en: 'Wooden cabin in the forest' }),
    shuttle: img('shuttle', { fr: 'Autocar illuminé face aux montagnes enneigées', en: 'Lit coach facing snowy mountains' }),
  },
  aside: { home: 'hero', wifi: 'sunset', breakfast: 'breakfast', info: 'room', discover: 'viewpoint', contact: 'cabin' },

  welcome: {
    title: { fr: 'Bienvenue au *Chalet-Hôtel L’Arolle*', en: 'Welcome to *Chalet-Hôtel L’Arolle*' },
    message: {
      fr: 'Ici, le rythme est celui de la montagne. Tout votre séjour est ici.',
      en: 'Here, life moves at the pace of the mountain. Your whole stay is here.',
    },
    signature: { fr: 'Jérémie et l’équipe', en: 'Jérémie and the team' },
  },

  // Autre ordre que l'hôtel A : la sélection du coin passe avant les services.
  home: { sections: ['essentials', 'nearby', 'services', 'index'], featured: ['balcons', 'ski', 'refuge'] },

  weather: { lat: 45.9237, lon: 6.8694, place: 'Chamonix' },

  wifi: {
    ssid: 'Arolle-Chalet',
    password: 'Edelweiss-1035',
    security: 'WPA',
    note: { fr: 'Le signal est plus faible dans le local à skis et le sauna.', en: 'The signal is weaker in the ski room and the sauna.' },
  },

  stay: { checkIn: '16:00', checkOut: '10:30' },

  breakfast: {
    image: 'breakfast',
    title: { fr: 'Le petit-déjeuner *du chalet*', en: 'The *chalet* breakfast' },
    intro: {
      fr: 'Un vrai petit-déjeuner de montagne, pour tenir jusqu’au déjeuner sur les pistes ou les sentiers.',
      en: 'A proper mountain breakfast, to keep you going until lunch on the slopes or trails.',
    },
    hours: [{ days: { fr: 'Tous les jours', en: 'Every day' }, weekdays: [0, 1, 2, 3, 4, 5, 6], from: '07:30', to: '10:00' }],
    price: { adult: '22 €', child: '11 €', note: { fr: 'Gratuit pour les moins de 4 ans.', en: 'Free under 4.' } },
    place: { fr: 'Salle du Poêle — rez-de-chaussée, à côté du salon', en: 'Salle du Poêle — ground floor, next to the lounge' },
    buffet: [
      { fr: 'Tomme de Savoie et charcuteries de la vallée', en: 'Tomme de Savoie and cured meats from the valley' },
      { fr: 'Pain de campagne, miel de montagne, confitures maison', en: 'Country bread, mountain honey, house jams' },
      { fr: 'Pancakes, œufs à la demande', en: 'Pancakes, eggs cooked to order' },
      { fr: 'Müesli, fruits secs, fruits frais', en: 'Muesli, dried and fresh fruit' },
      { fr: 'Café, thés, chocolat chaud', en: 'Coffee, teas, hot chocolate' },
    ],
    notes: [
      { fr: 'Panier randonneur à commander à la réception avant 20 h la veille.', en: 'Hiker’s packed lunch: order at reception before 8 pm the evening before.' },
      { fr: 'Options sans lactose et sans gluten : signalez-le à l’équipe.', en: 'Lactose-free and gluten-free options: let the team know.' },
    ],
  },

  contact: {
    phone: '04 65 71 00 87',
    ext: '0',
    email: 'accueil@arolle-chamonix.example',
    hours: { fr: 'Réception de 7 h à 22 h · veilleur de nuit sur appel', en: 'Reception 7 am – 10 pm · night porter on call' },
    shortHours: { fr: '7 h – 22 h', en: '7 am – 10 pm' },
    address: { fr: 'Chamonix-Mont-Blanc — adresse fictive de démonstration', en: 'Chamonix-Mont-Blanc — fictional demo address' },
    languages: ['Français', 'English', 'Deutsch'],
  },

  services: [
    { id: 'restaurant', title: { fr: 'Le Poêle', en: 'Le Poêle' }, hours: { fr: '19 h – 21 h 30', en: '7 – 9:30 pm' }, detail: { fr: 'Cuisine savoyarde · fermé le lundi', en: 'Savoyard cooking · closed Monday' } },
    { id: 'spa', title: { fr: 'Sauna & détente', en: 'Sauna & relaxation' }, hours: { fr: '16 h – 20 h', en: '4 – 8 pm' }, detail: { fr: 'Sur réservation à la réception, 45 min', en: 'Booked at reception, 45 min' } },
    { id: 'ski-room', title: { fr: 'Local à skis', en: 'Ski room' }, hours: { fr: 'Accès libre, 24 h/24', en: 'Open access, 24/7' }, detail: { fr: 'Chauffé, avec sèche-chaussures', en: 'Heated, with boot dryers' } },
  ],

  info: {
    groups: [
      {
        id: 'stay',
        title: { fr: 'Votre séjour', en: 'Your stay' },
        items: [
          { id: 'checkin', title: { fr: 'Arrivée', en: 'Check-in' }, summary: { fr: 'À partir de 16 h', en: 'From 4 pm' }, body: { fr: 'Les chambres sont prêtes à partir de 16 h. Arrivée plus matinale après une nuit de route ? Le salon et le local à skis sont à votre disposition, et la réception garde vos bagages.', en: 'Rooms are ready from 4 pm. Arriving early after a night on the road? The lounge and ski room are yours to use, and reception will keep your bags.' } },
          { id: 'checkout', title: { fr: 'Départ', en: 'Check-out' }, summary: { fr: 'Avant 10 h 30', en: 'By 10:30 am' }, body: { fr: 'Merci de libérer la chambre avant 10 h 30. Vos skis et vos bagages peuvent rester en consigne jusqu’à 18 h si vous profitez encore de la vallée.', en: 'Please vacate the room by 10:30 am. Your skis and bags can stay in storage until 6 pm if you’re making the most of the valley.' } },
          { id: 'luggage', title: { fr: 'Bagagerie', en: 'Luggage storage' }, summary: { fr: 'Gratuite, jusqu’à 18 h', en: 'Free, until 6 pm' }, body: { fr: 'Local fermé près de la réception, y compris pour le matériel de sport.', en: 'Locked room near reception, including for sports equipment.' } },
          { id: 'reception', title: { fr: 'Réception', en: 'Reception' }, summary: { fr: '7 h – 22 h · poste 0', en: '7 am – 10 pm · ext. 0' }, body: { fr: 'Composez le 0 depuis votre chambre. En dehors des heures d’ouverture, un veilleur de nuit peut être appelé pour toute urgence.', en: 'Dial 0 from your room. Outside opening hours a night porter can be called for any emergency.' } },
        ],
      },
      {
        id: 'room',
        title: { fr: 'Chambre & équipements', en: 'Room & equipment' },
        items: [
          { id: 'climate', title: { fr: 'Chauffage', en: 'Heating' }, summary: { fr: 'Plancher chauffant, réglable', en: 'Underfloor heating, adjustable' }, body: { fr: 'Le thermostat se règle au mur, près de la porte. En cas de grand froid, évitez d’ouvrir les fenêtres trop longtemps : le chauffage reprend vite.', en: 'The thermostat is on the wall by the door. In very cold weather avoid leaving windows open for long — the heating recovers quickly.' } },
          {
            id: 'equipment',
            title: { fr: 'Équipements', en: 'In-room equipment' },
            summary: { fr: 'Peignoir, bouilloire, coffre-fort', en: 'Bathrobe, kettle, safe' },
            bullets: [
              { fr: 'Peignoirs et chaussons', en: 'Bathrobes and slippers' },
              { fr: 'Bouilloire, thés et infusions', en: 'Kettle, tea and herbal infusions' },
              { fr: 'Coffre-fort dans le placard', en: 'Safe in the wardrobe' },
              { fr: 'Sèche-cheveux', en: 'Hairdryer' },
            ],
          },
          { id: 'ski-room', title: { fr: 'Local à skis', en: 'Ski room' }, summary: { fr: 'Chauffé, ouvert 24 h/24', en: 'Heated, open 24/7' }, body: { fr: 'Rangez skis et chaussures dans votre casier numéroté. Les sèche-chaussures fonctionnent toute la nuit.', en: 'Store skis and boots in your numbered locker. Boot dryers run all night.' } },
          { id: 'pets', title: { fr: 'Animaux', en: 'Pets' }, summary: { fr: 'Chiens acceptés', en: 'Dogs welcome' }, body: { fr: 'Supplément de 15 € par nuit. Les chiens ne sont pas admis au restaurant ni dans la salle de petit-déjeuner.', en: 'Extra charge of €15 per night. Dogs are not allowed in the restaurant or breakfast room.' } },
        ],
      },
      {
        id: 'access',
        title: { fr: 'Parking & accès', en: 'Parking & access' },
        items: [
          { id: 'parking', title: { fr: 'Parking', en: 'Parking' }, summary: { fr: 'Gratuit devant le chalet', en: 'Free in front of the chalet' }, body: { fr: 'Une quinzaine de places devant le chalet, sans réservation. En hiver, prévoyez des chaînes ou des pneus neige : la réception peut vous conseiller.', en: 'About fifteen spaces in front of the chalet, no booking needed. In winter carry chains or snow tyres — reception can advise.' } },
          { id: 'valley-card', title: { fr: 'Carte d’hôte', en: 'Guest card' }, summary: { fr: 'Remise à l’arrivée', en: 'Handed over on arrival' }, body: { fr: 'La carte d’hôte donne accès aux transports publics de la vallée. Demandez-la à la réception si elle ne vous a pas été remise.', en: 'The guest card gives access to the valley’s public transport. Ask reception if it wasn’t handed to you.' } },
          { id: 'arrival', title: { fr: 'Venir à l’hôtel', en: 'Getting here' }, summary: { fr: 'Gare de Chamonix à 10 min', en: 'Chamonix station, 10 min away' }, body: { fr: 'Depuis la gare de Chamonix-Mont-Blanc, comptez 10 minutes à pied ou une courte course de bus. Depuis l’aéroport de Genève, comptez environ 1 h 15 par la route.', en: 'From Chamonix-Mont-Blanc station allow 10 minutes on foot or a short bus ride. From Geneva airport allow about 1 h 15 by road.' } },
        ],
      },
      {
        id: 'services',
        title: { fr: 'Services de l’hôtel', en: 'Hotel services' },
        items: [
          { id: 'restaurant', title: { fr: 'Le Poêle', en: 'Le Poêle' }, summary: { fr: '19 h – 21 h 30 · fermé le lundi', en: '7 – 9:30 pm · closed Monday' }, body: { fr: 'Cuisine savoyarde de saison, servie autour du poêle. Réservez votre table à la réception avant 17 h.', en: 'Seasonal Savoyard cooking, served around the stove. Book your table at reception before 5 pm.' } },
          { id: 'spa', title: { fr: 'Sauna & détente', en: 'Sauna & relaxation' }, summary: { fr: '16 h – 20 h', en: '4 – 8 pm' }, body: { fr: 'Sauna et salon de détente. Créneaux de 45 minutes à réserver à la réception ; peignoir fourni.', en: 'Sauna and relaxation lounge. 45-minute slots, booked at reception; bathrobe provided.' } },
          { id: 'bar', title: { fr: 'Bar du salon', en: 'Lounge bar' }, summary: { fr: '17 h – 23 h', en: '5 – 11 pm' }, body: { fr: 'Vins de Savoie, bières locales et chocolat chaud près de la cheminée.', en: 'Savoie wines, local beers and hot chocolate by the fireplace.' } },
        ],
      },
      {
        id: 'rules',
        title: { fr: 'Règlement intérieur', en: 'House rules' },
        items: [
          { id: 'quiet', title: { fr: 'Calme', en: 'Quiet hours' }, summary: { fr: '22 h – 7 h', en: '10 pm – 7 am' }, body: { fr: 'Le chalet est en bois : les bruits y voyagent. Merci de parler bas dans les couloirs le soir.', en: 'The chalet is built of wood, so sound travels. Please keep your voice down in the corridors in the evening.' } },
          { id: 'boots', title: { fr: 'Chaussures de ski', en: 'Ski boots' }, summary: { fr: 'À laisser dans le local', en: 'Leave them in the ski room' }, body: { fr: 'Pour garder les chambres et les parquets au sec, les chaussures de ski et de randonnée restent au local à skis.', en: 'To keep rooms and floors dry, ski and hiking boots stay in the ski room.' } },
          { id: 'smoking', title: { fr: 'Non-fumeur', en: 'Non-smoking' }, summary: { fr: 'Dans tout le chalet', en: 'Throughout the chalet' }, body: { fr: 'Il est interdit de fumer à l’intérieur ; un espace est prévu sur la terrasse.', en: 'Smoking is not allowed indoors; there is an area on the terrace.' } },
        ],
      },
      {
        id: 'useful',
        title: { fr: 'Infos utiles & urgences', en: 'Useful info & emergencies' },
        emergency: true,
        items: [
          { id: 'mountain', title: { fr: 'Sécurité en montagne', en: 'Mountain safety' }, summary: { fr: 'Informez la réception de votre itinéraire', en: 'Tell reception your route' }, body: { fr: 'Avant toute sortie, consultez le bulletin météo et d’avalanche affiché dans le hall, et indiquez votre itinéraire à la réception. En cas d’accident en montagne, appelez le 112.', en: 'Before heading out, check the weather and avalanche bulletin posted in the lobby and tell reception your route. In a mountain accident call 112.' } },
          { id: 'fire', title: { fr: 'Consignes incendie', en: 'Fire safety' }, summary: { fr: 'Plan derrière la porte de la chambre', en: 'Plan behind your room door' }, body: { fr: 'En cas d’alarme, quittez la chambre, refermez la porte et rejoignez la sortie la plus proche. Le point de rassemblement est sur le parking.', en: 'If the alarm sounds, leave the room, close the door and use the nearest exit. The assembly point is in the car park.' } },
        ],
      },
    ],
  },

  discover: {
    places: [
      // Restaurants
      { id: 'poele', cat: 'restaurants', image: 'restaurant', name: 'Le Poêle', type: { fr: 'Cuisine savoyarde', en: 'Savoyard cooking' }, onsite: true, description: { fr: 'Cuisine savoyarde de saison, servie autour du poêle.', en: 'Seasonal Savoyard cooking, served around the stove.' }, hours: { fr: '19 h – 21 h 30, fermé le lundi', en: '7 – 9:30 pm, closed Monday' } },
      { id: 'alpage', cat: 'restaurants', image: 'bar', name: 'L’Alpage', type: { fr: 'Bar & planches', en: 'Bar & sharing boards' }, distance: { mode: 'walk', min: 6 }, description: { fr: 'Fromages et charcuteries à partager, bières locales, ambiance après-ski.', en: 'Cheese and charcuterie to share, local beers, après-ski mood.' } },
      { id: 'refuge', cat: 'restaurants', image: 'cabin', name: 'Refuge de la Combe', type: { fr: 'Refuge d’altitude', en: 'Mountain hut' }, distance: { mode: 'walk', min: 90, approx: true }, description: { fr: 'Déjeuner montagnard au bout d’un sentier. Réservation conseillée par la réception.', en: 'Mountain lunch at the end of a trail. Booking recommended — reception can help.' } },
      // À découvrir
      { id: 'aiguille', cat: 'sights', name: 'Aiguille du Midi', type: { fr: 'Téléphérique & panorama', en: 'Cable car & viewpoint' }, distance: { mode: 'transit', min: 15, approx: true }, mapsQuery: 'Téléphérique de l’Aiguille du Midi, Chamonix', description: { fr: 'Le téléphérique monte à près de 3 800 m face au Mont-Blanc. Réservez à l’avance en haute saison et prévoyez des vêtements chauds.', en: 'The cable car climbs to nearly 3,800 m facing Mont Blanc. Book ahead in high season and bring warm clothes.' } },
      { id: 'montenvers', cat: 'sights', name: 'Montenvers – Mer de Glace', type: { fr: 'Train à crémaillère', en: 'Rack railway' }, distance: { mode: 'transit', min: 15, approx: true }, mapsQuery: 'Gare du Montenvers, Chamonix', description: { fr: 'Un train à crémaillère rejoint le belvédère sur la Mer de Glace, plus grand glacier de France.', en: 'A rack railway climbs to the viewpoint over the Mer de Glace, France’s largest glacier.' } },
      { id: 'balcons', cat: 'sights', image: 'hike', name: 'Randonnées en balcon', type: { fr: 'Randonnée', en: 'Hiking' }, description: { fr: 'Des sentiers panoramiques accessibles de la vallée. Demandez à la réception la carte et les conditions du jour.', en: 'Panoramic trails reachable from the valley. Ask reception for the map and the day’s conditions.' } },
      { id: 'ski', cat: 'sights', image: 'ski', name: { fr: 'Ski & ski de fond', en: 'Skiing & cross-country' }, type: { fr: 'Hiver', en: 'Winter' }, distance: { mode: 'transit', min: 10, approx: true }, description: { fr: 'Plusieurs domaines skiables sont reliés à la vallée par les navettes. Le local à skis du chalet est ouvert 24 h/24.', en: 'Several ski areas are linked to the valley by shuttle. The chalet’s ski room is open 24/7.' } },
      // Transports
      { id: 'gare', cat: 'transport', name: 'Gare de Chamonix-Mont-Blanc', type: { fr: 'Gare SNCF', en: 'Railway station' }, distance: { mode: 'walk', min: 10, approx: true }, mapsQuery: 'Gare de Chamonix-Mont-Blanc', description: { fr: 'Trains vers Saint-Gervais et la Suisse.', en: 'Trains to Saint-Gervais and Switzerland.' } },
      { id: 'navettes', cat: 'transport', image: 'shuttle', name: { fr: 'Navettes de la vallée', en: 'Valley shuttles' }, type: { fr: 'Bus', en: 'Bus' }, description: { fr: 'Les bus de la vallée desservent les remontées et les départs de sentiers. Votre carte d’hôte vous y donne accès.', en: 'Valley buses serve the lifts and trailheads. Your guest card gives you access.' } },
      { id: 'geneve', cat: 'transport', name: 'Aéroport de Genève', type: { fr: 'Transferts', en: 'Transfers' }, mapsQuery: 'Aéroport de Genève', description: { fr: 'Environ 1 h 15 par la route. La réception peut vous aider à organiser un transfert.', en: 'About 1 h 15 by road. Reception can help arrange a transfer.' } },
      // Commerces & services
      { id: 'location', cat: 'services', name: 'Cimes Location', type: { fr: 'Location de matériel', en: 'Gear rental' }, distance: { mode: 'walk', min: 5 }, description: { fr: 'Skis, raquettes et bâtons, réservables à l’avance.', en: 'Skis, snowshoes and poles, bookable ahead.' } },
      { id: 'epicerie', cat: 'services', name: 'Épicerie du Pont', type: { fr: 'Épicerie & fromagerie', en: 'Grocery & cheese shop' }, distance: { mode: 'walk', min: 4 }, description: { fr: 'Fromages de Savoie, pain et provisions pour le pique-nique.', en: 'Savoie cheeses, bread and picnic supplies.' }, hours: { fr: '8 h – 19 h 30', en: '8 am – 7:30 pm' } },
      { id: 'pharmacie', cat: 'services', name: { fr: 'Pharmacie de garde', en: 'On-duty pharmacy' }, type: { fr: 'Santé', en: 'Health' }, phone: '3237', description: { fr: 'Le 3237 indique la pharmacie de garde la plus proche, à toute heure.', en: 'Dial 3237 to find the nearest on-duty pharmacy at any hour (France).' } },
    ],
  },
};
