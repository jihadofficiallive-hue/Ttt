import { MediaItem, LiveChannel, UserProfile, AdminAnalytics } from '../types';

// High-speed open-source MP4 video streams that play reliably across browsers
export const SAMPLE_VIDEOS = {
  tearsOfSteel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  bigBuckBunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  elephantsDream: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  weAreGoingOnBullrun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  subaruOutback: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
};

export const INITIAL_MOVIES: MediaItem[] = [
  // ==================== BANGLA MOVIES (বাংলা সিনেমা) ====================
  {
    id: 'ott-bm-01',
    title: 'Toofan',
    banglaTitle: 'তুফান',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'নব্বই দশকের একজন ভয়ঙ্কর গ্যাংস্টারের উত্থান ও রক্তক্ষয়ী অপরাধ জগতের গল্প নিয়ে রায়হান রাফির পরিচালনায় মেগাস্টার শাকিব খানের অ্যাকশন ব্লকবাস্টার।',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2h 25m',
    releaseYear: 2024,
    rating: 'U/A 16+',
    imdbRating: 8.9,
    genres: ['Action', 'Crime', 'Thriller'],
    languages: ['Bengali', 'Hindi Dub'],
    director: 'Raihan Rafi',
    isTrending: true,
    isFeatured: true,
    isTop10: true,
    top10Rank: 1,
    tags: ['Bangla Blockbuster', '4K Ultra HD', 'Dolby Atmos'],
    cast: [
      { id: 'c-sk', name: 'Shakib Khan', role: 'Toofan / Ghalib', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-cc', name: 'Chanchal Chowdhury', role: 'CID Officer Ashfaq', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-mm', name: 'Mimi Chakraborty', role: 'Suchitra', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-02',
    title: 'Hawa',
    banglaTitle: 'হাওয়া',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'গভীর সমুদ্রে মাছ ধরার ট্রলারে এক রহস্যময়ী তরুণীকে উদ্ধারের পর মাঝিমাল্লাদের মধ্যে শুরু হয় ভয়, লোভ ও অতিপ্রাকৃতিক সংঘাত। মেজবাউর রহমান সুমন পরিচালিত আন্তর্জাতিকভাবে প্রশংসিত চলচ্চিত্র।',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.sintel,
    duration: '2h 11m',
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.6,
    genres: ['Mystery', 'Thriller', 'Drama'],
    languages: ['Bengali'],
    director: 'Mejbaur Rahman Sumon',
    isTrending: true,
    isTop10: true,
    top10Rank: 3,
    tags: ['Critically Acclaimed', 'Oscars Submission', 'Spatial Audio'],
    cast: [
      { id: 'c-cc2', name: 'Chanchal Chowdhury', role: 'Chan Majhi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-nt', name: 'Nazifa Tushi', role: 'Gulti', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-03',
    title: 'Surongo',
    banglaTitle: 'সুরঙ্গ',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'একজন সাধারণ যুবকের ভালোবাসার অন্ধত্ব তাকে ঠেলে দেয় ব্যাংক সুরঙ্গ কেটে ডাকাতির এক দুর্ধর্ষ অপরাধে। আফরান নিশোর অভিষেক চলচ্চিত্র।',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.elephantsDream,
    duration: '2h 15m',
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.4,
    genres: ['Crime', 'Thriller', 'Drama'],
    languages: ['Bengali'],
    director: 'Raihan Rafi',
    isTrending: true,
    isTop10: true,
    top10Rank: 5,
    tags: ['Bangla Superhit', '4K UHD'],
    cast: [
      { id: 'c-an', name: 'Afran Nisho', role: 'Masud', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-tm', name: 'Tama Mirza', role: 'Moyna', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-04',
    title: 'Priyotoma',
    banglaTitle: 'প্রিয়তমা',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'একটি আত্মত্যাগময় প্রেমকাহিনী যেখানে সমাজের বাধা ও অপরাধের বেড়াজালে একজন প্রেমিকের জীবনের সব আবেগ মিশে একাকিত্বের প্রান্তে পৌঁছায়। শাকিব খানের অল-টাইম ব্লকবাস্টার।',
    backdropUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.bigBuckBunny,
    duration: '2h 20m',
    releaseYear: 2023,
    rating: 'PG-13',
    imdbRating: 8.5,
    genres: ['Romance', 'Action', 'Drama'],
    languages: ['Bengali'],
    director: 'Himel Ashraf',
    isTrending: false,
    isTop10: true,
    top10Rank: 7,
    tags: ['All Time Blockbuster', 'Dolby Atmos'],
    cast: [
      { id: 'c-sk2', name: 'Shakib Khan', role: 'Sumon', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ip', name: 'Idhika Paul', role: 'Iti', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-05',
    title: 'Poran',
    banglaTitle: 'পরাণ',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'সত্য ঘটনা অবলম্বনে নির্মিত ত্রিভুজ প্রেমের এক ভয়ংকর পরিণতির গল্প। বিদ্যা সিনহা মিম, শরিফুল রাজ ও ইয়াশ রোহানের অনবদ্য অভিনয়।',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.weAreGoingOnBullrun,
    duration: '2h 18m',
    releaseYear: 2022,
    rating: 'U/A 16+',
    imdbRating: 8.7,
    genres: ['Romance', 'Crime', 'Thriller'],
    languages: ['Bengali'],
    director: 'Raihan Rafi',
    isTrending: true,
    tags: ['Mega Hit', 'Full HD'],
    cast: [
      { id: 'c-bsm', name: 'Bidya Sinha Mim', role: 'Ananya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-sr', name: 'Sariful Razz', role: 'Roman', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-06',
    title: 'Aynabaji',
    banglaTitle: 'আয়নাবাজি',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: 'আয়না একজন অদ্ভুত অভিনেতা যে টাকার বিনিময়ে অপরাধীদের সাজা নিজে খাটে। কিন্তু একদিন এক প্রভাবশালী ব্যবসায়ীর কেসে ফেঁসে গিয়ে তার জীবন হুমকির মুখে পড়ে।',
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.subaruOutback,
    duration: '2h 24m',
    releaseYear: 2022,
    rating: 'U/A 16+',
    imdbRating: 9.0,
    genres: ['Crime', 'Mystery', 'Thriller'],
    languages: ['Bengali'],
    director: 'Amitabh Reza Chowdhury',
    isTop10: true,
    top10Rank: 8,
    tags: ['National Award Winner', 'Classic'],
    cast: [
      { id: 'c-cc3', name: 'Chanchal Chowdhury', role: 'Sharafat Karim Ayna', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bm-07',
    title: 'Damal',
    banglaTitle: 'দামাল',
    type: 'movie',
    subCategory: 'bangla_movie',
    description: '১৯৭১ সালের স্বাধীন বাংলা ফুটবল দলের রক্তক্ষয়ী সংগ্রাম ও ফুটবল দিয়ে বিশ্ব দরবারে মুক্তিযুদ্ধের বার্তা পৌঁছে দেওয়ার অনুপ্রেরণাদায়ী ঐতিহাসিক ক্রীড়া চলচ্চিত্র।',
    backdropUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2h 22m',
    releaseYear: 2023,
    rating: 'U',
    imdbRating: 8.6,
    genres: ['Action', 'Drama', 'Sports'],
    languages: ['Bengali'],
    director: 'Raihan Rafi',
    tags: ['Historical', 'Patriotic'],
    cast: [
      { id: 'c-sa', name: 'Siam Ahmed', role: 'Durjoy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },

  // ==================== BANGLA NATOK & WEB SERIES (বাংলা নাটক ও সিরিজ) ====================
  {
    id: 'ott-bn-01',
    title: 'Bachelor Point',
    banglaTitle: 'ব্যাচেলর পয়েন্ট (সিজন ৫)',
    type: 'series',
    subCategory: 'bangla_natok',
    description: 'ঢাকার বুকে একদল অবিবাহিত তরুণ ব্যাচেলরের বন্ধুত্ব, প্রেম, হাসি-ঠাট্টা ও বাস্তব জীবনের অসাধারণ মজাদার কমেডি সিরিজ। কাজল আরেফিন অমি পরিচালিত বাংলাদেশের সর্বাধিক জনপ্রিয় মেগা কমেডি ফ্র্যাঞ্চাইজি।',
    backdropUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.bigBuckBunny,
    duration: 'Season 5 · 24 Episodes',
    seasonsCount: 5,
    releaseYear: 2024,
    rating: 'U/A 13+',
    imdbRating: 9.4,
    genres: ['Comedy', 'Drama', 'Youth'],
    languages: ['Bengali'],
    director: 'Kajal Arefin Ome',
    isTrending: true,
    isFeatured: true,
    isTop10: true,
    top10Rank: 2,
    tags: ['Viral Sensation', 'JSPL Exclusive', 'Full HD'],
    cast: [
      { id: 'c-zp', name: 'Ziaul Hoque Polash', role: 'Kabila', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ms', name: 'Mishu Sabbir', role: 'Shubro', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-mr', name: 'Marzuk Russell', role: 'Pasha Bhai', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ca', name: 'Chashi Alam', role: 'Habu Bhai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bn-02',
    title: 'Karagar',
    banglaTitle: 'কারাগার (পার্ট ১ ও ২)',
    type: 'series',
    subCategory: 'bangla_natok',
    description: 'আকাশনগর সেন্ট্রাল জেলের ৫০ বছর ধরে বন্ধ থাকা সেল নম্বর ১৪৫-এ হঠাৎ এক রহস্যময় বোবা কয়েদীর আবির্ভাব ঘটে। সে দাবি করে সে ২৫০ বছর ধরে বেঁচে আছে এবং মীর জাফরের হত্যাকারী।',
    backdropUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2 Parts · 14 Episodes',
    seasonsCount: 2,
    releaseYear: 2023,
    rating: 'TV-MA',
    imdbRating: 9.2,
    genres: ['Mystery', 'Psychological', 'Thriller'],
    languages: ['Bengali'],
    director: 'Syed Ahmed Shawki',
    isTrending: true,
    isTop10: true,
    top10Rank: 4,
    tags: ['Mind-Bending', 'Original Series'],
    cast: [
      { id: 'c-cc4', name: 'Chanchal Chowdhury', role: 'Mystery Prisoner', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ah', name: 'Afzal Hossain', role: 'Jailor Mostaque', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bn-03',
    title: 'Mohanagar',
    banglaTitle: 'মহানগর (ওসি হারুন)',
    type: 'series',
    subCategory: 'bangla_natok',
    description: 'একটি থানার ভেতরে মাত্র এক রাতে ঘটে যাওয়া তীব্র রাজনৈতিক চাপ, ক্ষমতার লড়াই আর নীতিবোধের দ্বন্দ্ব। ইন্সপেক্টর হারুনুর রশীদের চরিত্রে মোশাররফ করিমের কালজয়ী অভিনয়।',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.sintel,
    duration: 'Season 2 · 8 Episodes',
    seasonsCount: 2,
    releaseYear: 2023,
    rating: 'TV-MA',
    imdbRating: 9.3,
    genres: ['Crime', 'Thriller', 'Drama'],
    languages: ['Bengali'],
    director: 'Ashfaque Nipun',
    isTrending: true,
    isTop10: true,
    top10Rank: 6,
    tags: ['Top Ranked', '4K UHD'],
    cast: [
      { id: 'c-mk', name: 'Mosharraf Karim', role: 'OC Harun', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bn-04',
    title: 'Female 4',
    banglaTitle: 'ফিমেল ৪ (নাটক)',
    type: 'movie',
    subCategory: 'bangla_natok',
    description: 'ব্যাটপার ইতাশ ও কালা রফিকদের এলাকা দখল, স্থানীয় রাজনীতির মারপ্যাঁচ এবং নতুন মেয়ের আগমন নিয়ে এলাকার ছেলেদের মধ্যে হাস্যকর বিশৃঙ্খলা। ঈদের ধামাকা কমেডি টেলিফিল্ম।',
    backdropUrl: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.subaruOutback,
    duration: '1h 18m',
    releaseYear: 2024,
    rating: 'U/A 13+',
    imdbRating: 8.8,
    genres: ['Comedy', 'Drama'],
    languages: ['Bengali'],
    director: 'Kajal Arefin Ome',
    isTrending: true,
    tags: ['Eid Special', 'Superhit Natok'],
    cast: [
      { id: 'c-zp2', name: 'Ziaul Hoque Polash', role: 'Dakat Shahid', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-mr2', name: 'Marzuk Russell', role: 'Pasha', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bn-05',
    title: 'Hotel Relax',
    banglaTitle: 'হোটেল রিল্যাক্স',
    type: 'series',
    subCategory: 'bangla_natok',
    description: 'ঢাকার একটি অদ্ভুত হোটেলে বিভিন্ন চরিত্র হঠাৎ এক জায়গায় মিলিত হয়। সেখানে শুরু হয় একদল ডাকাত ও পুলিশের মধ্যকার পাগলাটে পরিস্থিতি।',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.elephantsDream,
    duration: 'Season 1 · 6 Episodes',
    seasonsCount: 1,
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.3,
    genres: ['Comedy', 'Crime', 'Thriller'],
    languages: ['Bengali'],
    director: 'Kajal Arefin Ome',
    tags: ['Record Viewership'],
    cast: [
      { id: 'c-pm', name: 'Pori Moni', role: 'Special Guest', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-zp3', name: 'Ziaul Hoque Polash', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-bn-06',
    title: 'Buker Moddhe Agun',
    banglaTitle: 'বুকের মধ্যে আগুন',
    type: 'series',
    subCategory: 'bangla_natok',
    description: 'নব্বই দশকের এক জনপ্রিয় চিত্রনায়কের রহস্যজনক মৃত্যুর রহস্য উদঘাটনে নামে এক দক্ষ পুলিশ অফিসার। অপূর্ব ও ইয়াশ রোহানের তুমুল আলোচিত থ্রিলার সিরিজ।',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.weAreGoingOnBullrun,
    duration: 'Season 1 · 8 Episodes',
    seasonsCount: 1,
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.5,
    genres: ['Mystery', 'Investigation', 'Drama'],
    languages: ['Bengali'],
    director: 'Taneem Rahman Angshu',
    tags: ['Thriller', 'Exclusive'],
    cast: [
      { id: 'c-zfa', name: 'Ziaul Faruq Apurba', role: 'ASP Golam Mamun', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },

  // ==================== HINDI MOVIES (হিন্দি সুপারহিট সিনেমা) ====================
  {
    id: 'ott-hm-01',
    title: 'Jawan',
    banglaTitle: 'জওয়ান',
    type: 'movie',
    subCategory: 'hindi_movie',
    description: 'একজন সাবেক কমান্ডো ও তার প্রমীলা স্কোয়াড সমাজের দুর্নীতিগ্রস্ত রাজনৈতিক ও ব্যবসায়িক চক্রের বিরুদ্ধে রুখে দাঁড়িয়ে ন্যায়বিচার প্রতিষ্ঠা করতে ঝাঁপিয়ে পড়ে। শাহরুখ খানের সর্বকালের রেকর্ডব্রেকিং মেগা-অ্যাকশন সিনেমা।',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2h 49m',
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.2,
    genres: ['Action', 'Thriller', 'Drama'],
    languages: ['Hindi', 'Bengali Dub'],
    director: 'Atlee',
    isTrending: true,
    isTop10: true,
    top10Rank: 9,
    tags: ['All-Time Record Blockbuster', '4K Ultra HD', 'Dolby Atmos'],
    cast: [
      { id: 'c-srk', name: 'Shah Rukh Khan', role: 'Vikram Rathore / Azad', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ny', name: 'Nayanthara', role: 'Narmada Rai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-vjs', name: 'Vijay Sethupathi', role: 'Kaleeswaran', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-hm-02',
    title: '12th Fail',
    banglaTitle: '১২থ ফেইল',
    type: 'movie',
    subCategory: 'hindi_movie',
    description: 'চম্বলের চরম দরিদ্র পরিবার থেকে আসা মনোজ শর্মার বারবার ব্যর্থতা ও লড়াই পেরিয়ে আইপিএস অফিসার হওয়ার অবিশ্বাস্য সত্য অনুপ্রেরণাদায়ী কাহিনী। বিধু বিনোদ চোপড়ার মাস্টারপিস।',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.sintel,
    duration: '2h 27m',
    releaseYear: 2023,
    rating: 'U',
    imdbRating: 9.1,
    genres: ['Biography', 'Drama'],
    languages: ['Hindi', 'Bengali Dub'],
    director: 'Vidhu Vinod Chopra',
    isTrending: true,
    isTop10: true,
    top10Rank: 10,
    tags: ['Masterpiece', 'National Award'],
    cast: [
      { id: 'c-vm', name: 'Vikrant Massey', role: 'Manoj Kumar Sharma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ms2', name: 'Medha Shankar', role: 'Shraddha Joshi', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-hm-03',
    title: 'Animal',
    banglaTitle: 'এনিম্যাল',
    type: 'movie',
    subCategory: 'hindi_movie',
    description: 'বাবার প্রতি এক ছেলের পাগলাটে ভালোবাসা তাকে এক নিষ্ঠুর রক্তাক্ত অপরাধ সাম্রাজ্যের অধিপতিতে পরিণত করে। রণবীর কাপুরের অবিস্মরণীয় পারফরম্যান্স।',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.weAreGoingOnBullrun,
    duration: '3h 24m',
    releaseYear: 2023,
    rating: 'A / 18+',
    imdbRating: 8.1,
    genres: ['Action', 'Crime', 'Drama'],
    languages: ['Hindi'],
    director: 'Sandeep Reddy Vanga',
    isTrending: true,
    tags: ['Mega Blockbuster', 'Uncut Version'],
    cast: [
      { id: 'c-rk', name: 'Ranbir Kapoor', role: 'Ranvijay Singh', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-ak', name: 'Anil Kapoor', role: 'Balbir Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-hm-04',
    title: 'Stree 2',
    banglaTitle: 'স্ত্রী ২ (সরকাটে কা আতঙ্ক)',
    type: 'movie',
    subCategory: 'hindi_movie',
    description: 'চান্দেরী শহরে এবার নেমে এসেছে মাথা কাটা দৈত্য সরকাটার ভয়াবহ অভিশাপ। তাকে রুখতে ভিকি, তার বন্ধুরা এবং রহস্যময়ী স্ত্রী আবারো একজোট হয়।',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.bigBuckBunny,
    duration: '2h 29m',
    releaseYear: 2024,
    rating: 'U/A 13+',
    imdbRating: 8.3,
    genres: ['Comedy', 'Horror'],
    languages: ['Hindi'],
    director: 'Amar Kaushik',
    isTrending: true,
    tags: ['All Time Comedy Hit', '4K UHD'],
    cast: [
      { id: 'c-rr', name: 'Rajkummar Rao', role: 'Vicky', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-skp', name: 'Shraddha Kapoor', role: 'The Mystery Woman', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'ott-hm-05',
    title: 'Pathaan',
    banglaTitle: 'পাঠান',
    type: 'movie',
    subCategory: 'hindi_movie',
    description: 'ভারতের বিরুদ্ধে জীবাণু অস্ত্র হামলার চক্রান্ত রুখতে ভারতীয় গোয়েন্দা সংস্থা র-এর নির্বাসিত ফিল্ড এজেন্ট পাঠানের রক্তক্ষয়ী মিশন। শাহরুখ খান ও জন আব্রাহামের অ্যাকশন মহাযুদ্ধ।',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2h 26m',
    releaseYear: 2023,
    rating: 'U/A 16+',
    imdbRating: 8.0,
    genres: ['Action', 'Thriller'],
    languages: ['Hindi', 'Bengali Dub'],
    director: 'Siddharth Anand',
    tags: ['Spy Universe', '4K UHD'],
    cast: [
      { id: 'c-srk2', name: 'Shah Rukh Khan', role: 'Pathaan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c-dp', name: 'Deepika Padukone', role: 'Rubina Mohsin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ]
  }
];

// ==================== BANGLADESHI 24/7 LIVE TV CHANNELS ====================
export const INITIAL_LIVE_CHANNELS: LiveChannel[] = [
  // 1. T Sports (টি স্পোর্টস)
  {
    id: 'bd-ch-tsports',
    name: 'T Sports Live HD',
    banglaName: 'টি স্পোর্টস লাইভ',
    country: 'Bangladesh',
    category: 'Sports',
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.tearsOfSteel,
    resolution: '1080p 60fps',
    viewersCount: 524000,
    isLive: true,
    language: 'Bangla / English',
    currentProgram: {
      id: 'epg-ts-1',
      title: 'বাংলাদেশ বনাম ভারত ক্রিকেট সিরিজ: লাইভ টেস্ট ম্যাচ',
      timeSlot: '14:30 - 18:30',
      startTime: '14:30',
      endTime: '18:30',
      progressPercent: 75,
      description: 'টাইগারদের টানটান উত্তেজনার লাইভ সম্প্রচার, আল্ট্রা স্লো-মোশন রিপ্লে এবং বাংলা কমেন্ট্রি প্যানেল।'
    },
    upcomingPrograms: [
      {
        id: 'epg-ts-2',
        title: 'ম্যাচ হাইলাইটস ও বিশেষজ্ঞদের বিশ্লেষণ',
        timeSlot: '18:30 - 19:30',
        startTime: '18:30',
        endTime: '19:30',
        progressPercent: 0,
        description: 'দিনের সেরা উইকেট ও বাউন্ডারির চুলচেরা বিশ্লেষণ।'
      }
    ]
  },

  // 2. Somoy TV (সময় টিভি)
  {
    id: 'bd-ch-somoy',
    name: 'Somoy TV 24/7',
    banglaName: 'সময় টিভি লাইভ',
    country: 'Bangladesh',
    category: 'News',
    logoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.weAreGoingOnBullrun,
    resolution: '1080p Full HD',
    viewersCount: 412000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-som-1',
      title: 'সময় সংবাদ: দেশজুড়ে তাজা খবর ও লাইভ আপডেট',
      timeSlot: '15:00 - 16:00',
      startTime: '15:00',
      endTime: '16:00',
      progressPercent: 52,
      description: 'ঢাকা ও দেশের প্রতিটি জেলার ব্রেকিং নিউজ, সমসাময়িক রাজনীতি এবং অর্থনৈতিক বিশ্লেষণ।'
    },
    upcomingPrograms: [
      {
        id: 'epg-som-2',
        title: 'সম্পাদকীয় টক শো: তারুণ্যের বাংলাদেশ',
        timeSlot: '16:00 - 17:00',
        startTime: '16:00',
        endTime: '17:00',
        progressPercent: 0,
        description: 'বিশিষ্ট বুদ্ধিজীবী ও বিশেষজ্ঞদের সরাসরি আলোচনা।'
      }
    ]
  },

  // 3. Jamuna TV (যমুনা টেলিভিশন)
  {
    id: 'bd-ch-jamuna',
    name: 'Jamuna Television',
    banglaName: 'যমুনা টিভি ২৪ ঘণ্টা',
    country: 'Bangladesh',
    category: 'News',
    logoUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.sintel,
    resolution: '1080p Full HD',
    viewersCount: 345000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-jam-1',
      title: 'ইনভেস্টিগেটিভ ৩৬০°: ক্রাইম সিন সরাসরি',
      timeSlot: '15:15 - 16:30',
      startTime: '15:15',
      endTime: '16:30',
      progressPercent: 40,
      description: 'দুর্নীতি ও জনস্বার্থ বিষয়ক বিশেষ অনুসন্ধানী প্রতিবেদন।'
    },
    upcomingPrograms: [
      {
        id: 'epg-jam-2',
        title: 'যমুনা সন্ধ্যা সংবাদ',
        timeSlot: '16:30 - 17:30',
        startTime: '16:30',
        endTime: '17:30',
        progressPercent: 0,
        description: 'আন্তর্জাতিক ও জাতীয় খবরের সমাহার।'
      }
    ]
  },

  // 4. Channel i (চ্যানেল আই)
  {
    id: 'bd-ch-channel-i',
    name: 'Channel i HD',
    banglaName: 'চ্যানেল আই লাইভ',
    country: 'Bangladesh',
    category: 'Entertainment',
    logoUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.subaruOutback,
    resolution: '1080p 50fps',
    viewersCount: 265000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-chi-1',
      title: 'হৃদয়ে মাটি ও মানুষ: শাইখ সিরাজের বিশেষ পর্ব',
      timeSlot: '15:00 - 16:15',
      startTime: '15:00',
      endTime: '16:15',
      progressPercent: 60,
      description: 'কৃষি অর্থনীতি, সফল খামারি ও উদ্ভাবনী চাষাবাদের অনুপ্রেরণাদায়ী প্রামাণ্যচিত্র।'
    },
    upcomingPrograms: [
      {
        id: 'epg-chi-2',
        title: 'সোনালী দিনের বাংলা ক্লাসিক সিনেমা',
        timeSlot: '16:15 - 19:00',
        startTime: '16:15',
        endTime: '19:00',
        progressPercent: 0,
        description: 'জনপ্রিয় ক্লাসিক বাংলা চলচ্চিত্রের বিশেষ প্রদর্শনী।'
      }
    ]
  },

  // 5. NTV (এনটিভি)
  {
    id: 'bd-ch-ntv',
    name: 'NTV Bangladesh',
    banglaName: 'এনটিভি বিনোদন',
    country: 'Bangladesh',
    category: 'Entertainment',
    logoUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.elephantsDream,
    resolution: '1080p HD',
    viewersCount: 238000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-ntv-1',
      title: 'মেগা ধারাবাহিক নাটক: পারিবারিক কলহ ও ভালোবাসা',
      timeSlot: '15:30 - 17:00',
      startTime: '15:30',
      endTime: '17:00',
      progressPercent: 45,
      description: 'জনপ্রিয় তারকাদের অভিনয়ে জমজমাট পারিবারিক ড্রামা সিরিয়াল।'
    },
    upcomingPrograms: [
      {
        id: 'epg-ntv-2',
        title: 'এনটিভি মিউজিক নাইট আনলিমিটেড',
        timeSlot: '17:00 - 18:30',
        startTime: '17:00',
        endTime: '18:30',
        progressPercent: 0,
        description: 'দেশের শীর্ষ শিল্পীদের লাইভ গানের আসর।'
      }
    ]
  },

  // 6. Deepto TV (দীপ্ত টিভি)
  {
    id: 'bd-ch-deepto',
    name: 'Deepto TV',
    banglaName: 'দীপ্ত টিভি এইচডি',
    country: 'Bangladesh',
    category: 'Entertainment',
    logoUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.bigBuckBunny,
    resolution: '1080p HD',
    viewersCount: 205000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-dep-1',
      title: 'সুলতান সুলেমান (বাংলা ডাবিং মেগা সিরিয়াল)',
      timeSlot: '14:45 - 16:45',
      startTime: '14:45',
      endTime: '16:45',
      progressPercent: 65,
      description: 'অটোমান সাম্রাজ্যের ঐতিহাসিক ষড়যন্ত্র ও প্রেমকাহিনীর বাংলা ডাবিং।'
    },
    upcomingPrograms: [
      {
        id: 'epg-dep-2',
        title: 'দীপ্ত সন্ধ্যার তাজা নাটক',
        timeSlot: '16:45 - 18:00',
        startTime: '16:45',
        endTime: '18:00',
        progressPercent: 0,
        description: 'তারকা জুটির মিষ্টি প্রেমের রোমান্টিক কমেডি নাটক।'
      }
    ]
  },

  // 7. Maasranga Television (মাছরাঙা টেলিভিশন)
  {
    id: 'bd-ch-maasranga',
    name: 'Maasranga TV',
    banglaName: 'মাছরাঙা টেলিভিশন',
    country: 'Bangladesh',
    category: 'Entertainment',
    logoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.tearsOfSteel,
    resolution: '1080p HD',
    viewersCount: 182000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-msr-1',
      title: 'মাছরাঙা স্পেশাল টেলিফিল্ম: বৃষ্টির দিনে প্রেম',
      timeSlot: '15:00 - 17:15',
      startTime: '15:00',
      endTime: '17:15',
      progressPercent: 50,
      description: 'অপূর্ব ও মেহজাবীনের রোমান্টিক টেলিফিল্ম।'
    },
    upcomingPrograms: [
      {
        id: 'epg-msr-2',
        title: 'স্পোর্টস কর্নার: বাংলাদেশ দলের আপডেট',
        timeSlot: '17:15 - 18:00',
        startTime: '17:15',
        endTime: '18:00',
        progressPercent: 0,
        description: 'ক্রিকেট দলের অনুশীলন ও ড্রেসিংরুম থেকে সরাসরি।'
      }
    ]
  },

  // 8. Ekattor TV (একাত্তর টিভি)
  {
    id: 'bd-ch-ekattor',
    name: 'Ekattor TV 71',
    banglaName: 'একাত্তর টিভি লাইভ',
    country: 'Bangladesh',
    category: 'News',
    logoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.sintel,
    resolution: '1080p HD',
    viewersCount: 198000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-eka-1',
      title: 'একাত্তর জার্নাল: বিশেষ টক শো ও রাজনৈতিক চুলচেরা বিশ্লেষণ',
      timeSlot: '15:00 - 16:30',
      startTime: '15:00',
      endTime: '16:30',
      progressPercent: 45,
      description: 'জাতীয় রাজনীতি, কূটনীতি ও সমসাময়িক বিষয়ের গভীর পর্যালোচনা।'
    },
    upcomingPrograms: [
      {
        id: 'epg-eka-2',
        title: 'একাত্তর সন্ধ্যা সংবাদ',
        timeSlot: '16:30 - 17:30',
        startTime: '16:30',
        endTime: '17:30',
        progressPercent: 0,
        description: 'দিনভর ঘটে যাওয়া প্রধান সংবাদের বিস্তারিত।'
      }
    ]
  },

  // 9. BTV World (বাংলাদেশ টেলিভিশন)
  {
    id: 'bd-ch-btv',
    name: 'BTV National',
    banglaName: 'বিটিভি জাতীয় সম্প্রচার',
    country: 'Bangladesh',
    category: 'News',
    logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.weAreGoingOnBullrun,
    resolution: '1080p HD',
    viewersCount: 155000,
    isLive: true,
    language: 'Bangla',
    currentProgram: {
      id: 'epg-btv-1',
      title: 'বিটিভি জাতীয় সংবাদ ও সংসদ বুলেটিন',
      timeSlot: '15:00 - 16:00',
      startTime: '15:00',
      endTime: '16:00',
      progressPercent: 55,
      description: 'রাষ্ট্রীয় গুরুত্বপূর্ণ ঘটনাবলী, উন্নয়ন চিত্র ও আবহাওয়া বার্তা।'
    },
    upcomingPrograms: [
      {
        id: 'epg-btv-2',
        title: 'ঐতিহ্য ও সংস্কৃতির বর্ণচ্ছটা',
        timeSlot: '16:00 - 17:00',
        startTime: '16:00',
        endTime: '17:00',
        progressPercent: 0,
        description: 'লোকসংগীত ও লোকনৃত্য পরিবেশনা।'
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-google-8891',
  name: 'Alex Mercer',
  email: 'alex.mercer@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  provider: 'google',
  planTier: 'Premium 4K Ultra',
  autoPlayNext: true,
  streamQuality: 'Auto',
  downloadQuality: 'High (1080p)',
  parentalLock: false,
  createdAt: '2025-01-15'
};

export const INITIAL_ANALYTICS: AdminAnalytics = {
  activeUsersNow: 421890,
  totalSubscribers: 1854200,
  liveBandwidthGbps: 342.6,
  totalStreams: 148,
  peakConcurrent: 914000,
  todayViews: 3412900
};
