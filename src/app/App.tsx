import { useState } from 'react';
import StepCarousel from './components/StepCarousel';
import { Phone, MapPin, Clock, CheckCircle, Languages, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import UserRegister from './components/UserRegister';
import OwnerDashboard from './components/OwnerDashboard';
import ChatBox from './components/ChatBox';
import UserInfo from './components/UserInfo';
import OwnerSetupGuide from './components/OwnerSetupGuide';
import ProductDetail from './components/ProductDetail';

function AppContent() {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);
  const [showChatWithOwner, setShowChatWithOwner] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Owner ID - This would be set up during initial setup
  const OWNER_ID = '9219b519-a122-464a-8671-9dcd5a1e7387'; // In production, this would be a real owner account ID

  const translations = {
    en: {
      title: 'Vaibhav Sanitary',
      subtitle: 'Your Complete House-Building Partner',
      userLogin: 'User Login',
      ownerLogin: 'Owner Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      chatWithOwner: 'Chat with Owner',
      welcome: 'Welcome to Vaibhav Sanitary',
      welcomeText: 'Your trusted destination for sanitary ware, plumbing materials, construction supplies, tiles, lighting, hardware, steel, POP materials, glass & contractor support — all under one roof.',
      visitStore: 'Visit our store on Kapasan Road,Narpat Ki Kheri, Chittorgarh',
      tagline: 'From Foundation to Finish — Everything Under One Roof.',
      whyChoose: 'Why Choose Vaibhav Sanitary',
      aboutUs: 'About Us',
      aboutText: 'At Vaibhav Sanitary, we believe building your dream home should be simple and stress-free. That\'s why we supply every material required — from the first brick to the final finishing along with expert guidance & contractor support so you never have to search anywhere else.',
      contactUs: 'Contact Us',
      location: 'Location',
      callWhatsapp: 'Call / WhatsApp',
      timings: 'Timings',
      footerTagline: 'Build Your Dream Home with Vaibhav Sanitary.',
      
      // Steps
      foundation: 'Foundation & Structure',
      foundationDesc: 'Strong materials for a safe and durable base.',
      wallsRoof: 'Walls & Roof Construction',
      wallsRoofDesc: 'Reliable support at every stage.',
      plaster: 'Plaster & POP Base Work',
      plasterDesc: 'Perfect walls & ceilings start here.',
      tiles: 'Tiles & Flooring Work',
      tilesDesc: 'Beautiful finishing your home deserves.',
      electrical: 'Electrical & Lighting Setup',
      electricalDesc: 'Safe, bright & efficient lighting.',
      sanitary: 'Bathroom & Sanitary Fittings',
      sanitaryDesc: 'Premium quality & long-lasting performance.',
      painting: 'Painting & Home Decoration',
      paintingDesc: 'Add beauty & style to your dream home.',
      glass: 'Windows, Doors & Glass Work',
      glassDesc: 'Elegant finishing touches.',
      
      // Benefits
      benefit1: 'One-stop solution for all building needs',
      benefit2: 'Quality-assured materials',
      benefit3: 'Trusted contractor contacts',
      benefit4: 'Best pricing',
      benefit5: 'Friendly customer guidance',
    },
    hi: {
      title: 'वैभव सैनिटरी',
      subtitle: 'आपका पूर्ण घर-निर्माण साथी',
      userLogin: 'उपयोगकर्ता लॉगिन',
      ownerLogin: 'मालिक लॉगिन',
      register: 'रजिस्टर',
      logout: 'लॉगआउट',
      dashboard: 'डैशबोर्ड',
      chatWithOwner: 'मालिक से चैट करें',
      welcome: 'वैभव सैनिटरी में आपका स्वागत है',
      welcomeText: 'सैनिटरी वेयर, प्लंबिंग सामग्री, निर्माण आपूर्ति, टाइल्स, लाइटिंग, हार्डवेयर, स्टील, POP सामग्री, ग्लास और ठेकेदार सहायता के लिए आपका विश्वसनीय गंतव्य — सब कुछ एक छत के नीचे।',
      visitStore: 'कपासन रोड, नरपत की खेड़ी, चित्तौड़गढ़ पर हमारे स्टोर पर जाएं',
      tagline: 'नींव से फिनिशिंग तक — सब कुछ एक छत के नीचे।',
      whyChoose: 'वैभव सैनिटरी क्यों चुनें',
      aboutUs: 'हमारे बारे में',
      aboutText: 'वैभव सैनिटरी में, हम मानते हैं कि आपका ड्रीम होम बनाना सरल और तनाव मुक्त होना चाहिए। इसीलिए हम हर आवश्यक सामग्री की आपूर्ति करते हैं — पहली ईंट से लेकर अंतिम फिनिशिंग तक विशेषज्ञ मार्गदर्शन और ठेकेदार सहायता के साथ ताकि आपको कहीं और खोजने की आवश्यकता न हो।',
      contactUs: 'संपर्क करें',
      location: 'स्थान',
      callWhatsapp: 'कॉल / व्हाट्सएप',
      timings: 'समय',
      footerTagline: 'वैभव सैनिटरी के साथ अपना सपनों का घर बनाएं।',
      
      // Steps
      foundation: 'नींव और संरचना',
      foundationDesc: 'सुरक्षित और टिकाऊ आधार के लिए मजबूत सामग्री।',
      wallsRoof: 'दीवारें और छत निर्माण',
      wallsRoofDesc: 'हर चरण में विश्वसनीय सहायता।',
      plaster: 'प्लास्टर और POP बेस वर्क',
      plasterDesc: 'परफेक्ट दीवारें और छत यहाँ से शुरू होती हैं।',
      tiles: 'टाइल्स और फ्लोरिंग वर्क',
      tilesDesc: 'आपके घर की सुंदर फिनिशिंग।',
      electrical: 'बिजली और लाइटिंग सेटअप',
      electricalDesc: 'सुरक्षित, उज्ज्वल और कुशल प्रकाश।',
      sanitary: 'बाथरूम और सैनिटरी फिटिंग',
      sanitaryDesc: 'प्रीमियम गुणवत्ता और लंबे समय तक चलने वाला प्रदर्शन।',
      painting: 'पेंटिंग और होम डेकोरेशन',
      paintingDesc: 'अपने सपनों के घर में सुंदरता और शैली जोड़ें।',
      glass: 'खिड़कियां, दरवाजे और ग्लास वर्क',
      glassDesc: 'सुरुचिपूर्ण फिनिशिंग टच।',
      
      // Benefits
      benefit1: 'सभी निर्माण आवश्यकताओं के लिए न-स्टॉप समाधान',
      benefit2: 'गुणवत्ता-आश्वासित सामग्री',
      benefit3: 'विश्वसनीय ठेकेदार संपर्क',
      benefit4: 'सर्वोत्तम मूल्य निर्धारण',
      benefit5: 'मैत्रीपूर्ण ग्राहक मार्गदर्शन',
    }
  };

  const t = translations[language];

  const foundationItems = [
    {
      id: 1,
      title: language === 'en' ? 'Bricks' : 'ईंटें',
      image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400',
      description: language === 'en' ? 'Premium quality bricks for strong and durable construction. Available in various sizes and grades to meet all building requirements.' : 'मजबूत और टिकाऊ निर्माण के लिए प्रीमियम गुणवत्ता ईंटें। सभी निर्माण आवश्यकताओं को पूरा करने के लिए विभिन्न आकारों और ग्रेड में उपलब्ध।',
      category: language === 'en' ? 'Foundation & Structure' : 'नींव और संरचना',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en' 
        ? ['Standard size: 9" x 4.5" x 3"', 'High compressive strength', 'Weather resistant', 'Available in red and fly ash variants']
        : ['मानक आकार: 9" x 4.5" x 3"', 'उच्च संपीड़न शक्ति', 'मौसम प्रतिरोधी', 'लाल और फ्लाई ऐश वेरिएंट में उपलब्ध'],
      features: language === 'en'
        ? ['Premium quality assurance', 'Long-lasting durability', 'Uniform size and shape', 'Suitable for all construction types']
        : ['प्रीमियम गुणवत्ता आश्वासन', 'लंबे समय तक चलने वाली स्थायित्व', 'समान आकार और आकृति', 'सभी निर्माण प्रकारों के लिए उपयुक्त'],
    },
    {
      id: 2,
      title: language === 'en' ? 'Sand (Reti)' : 'रेत (रेती)',
      image: 'https://images.unsplash.com/photo-1508629253015-1e64d83e92e1?w=400',
      description: language === 'en' ? 'High-grade construction sand (Reti) for concrete mixing, plastering, and foundation work. Clean, washed, and ready to use.' : 'कंक्रीट मिक्सिंग, प्लास्टरिंग और नींव के काम के लिए उच्च श्रेणी निर्माण रेत (रेती)। साफ, धुली हुई और उपयोग के लिए तैयार।',
      category: language === 'en' ? 'Foundation & Structure' : 'नींव और संरचना',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en'
        ? ['Fine grade quality', 'Free from impurities', 'Properly sieved', 'Available in bulk quantities']
        : ['फाइन ग्रेड गुणवत्ता', 'अशुद्धियों से मुक्त', 'ठीक से छनी हुई', 'थोक मात्रा में उपलब्ध'],
      features: language === 'en'
        ? ['Consistent grain size', 'Ideal for concrete work', 'Cost-effective', 'Home delivery available']
        : ['समान अनाज का आकार', 'कंक्रीट काम के लिए आदर्श', 'लागत प्रभावी', 'घर डिलीवरी उपलब्ध'],
    },
    {
      id: 3,
      title: language === 'en' ? 'Stone Material' : 'पत्थर सामग्री',
      image: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400',
      description: language === 'en' ? 'Durable stone material for foundation and base construction. Strong and weather-resistant for long-lasting structures.' : 'नींव और आधार निर्माण के लिए टिकाऊ पत्थर सामग्री। लंबे समय तक चलने वाली संरचनाओं के लिए मजबूत और मौसम प्रतिरोधी।',
      category: language === 'en' ? 'Foundation & Structure' : 'नींव और संरचना',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en'
        ? ['Various sizes available', 'Natural stone', 'High strength', 'Weather resistant']
        : ['विभिन्न आकार उपलब्ध', 'प्राकृतिक पत्थर', 'उच्च शक्ति', 'मौसम प्रतिरोधी'],
      features: language === 'en'
        ? ['Durable and long-lasting', 'Natural appearance', 'Suitable for foundation', 'Bulk supply available']
        : ['टिकाऊ और लंबे समय तक चलने वाला', 'प्राकृतिक उपस्थिति', 'नींव के लिए उपयुक्त', 'थोक आपूर्ति उपलब्ध'],
    },
    {
      id: 4,
      title: language === 'en' ? 'Steel Rods (Saria)' : 'स्टील रॉड (सरिया)',
      image: 'https://images.unsplash.com/photo-1582540730843-f4418d96ccbe?w=400',
      description: language === 'en' ? 'Strong reinforcement steel rods (Saria) for concrete structures. Available in various diameters and lengths for all construction needs.' : 'कंक्रीट संरचनाओं के लिए मजबूत रीइन्फोर्समेंट स्टील रॉड (सरिया)। सभी निर्माण आवश्यकताओं के लिए विभिन्न व्यास और लंबाई में उपलब्ध।',
      category: language === 'en' ? 'Foundation & Structure' : 'नींव और संरचना',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en'
        ? ['Various diameters: 6mm to 32mm', 'Standard lengths available', 'IS 1786 certified', 'High tensile strength']
        : ['विभिन्न व्यास: 6mm से 32mm', 'मानक लंबाई उपलब्ध', 'IS 1786 प्रमाणित', 'उच्च तन्य शक्ति'],
      features: language === 'en'
        ? ['Rust-resistant coating', 'Bendable and weldable', 'Quality assured', 'Cut to size available']
        : ['जंग प्रतिरोधी कोटिंग', 'मोड़ने योग्य और वेल्ड करने योग्य', 'गुणवत्ता आश्वासित', 'आकार में कट उपलब्ध'],
    },
    {
      id: 5,
      title: language === 'en' ? 'Hardware Items' : 'हार्डवेयर आइटम',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
      description: language === 'en' ? 'Complete range of construction hardware items including nails, screws, bolts, nuts, and all essential building supplies.' : 'नाखून, स्क्रू, बोल्ट, नट और सभी आवश्यक निर्माण आपूर्ति सहित निर्माण हार्डवेयर आइटमों की पूर्ण श्रृंखला।',
      category: language === 'en' ? 'Foundation & Structure' : 'नींव और संरचना',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en'
        ? ['Wide variety of sizes', 'Galvanized and stainless options', 'Quality brands available', 'Bulk quantities']
        : ['विभिन्न आकारों की विस्तृत श्रृंखला', 'गैल्वनाइज्ड और स्टेनलेस विकल्प', 'गुणवत्ता ब्रांड उपलब्ध', 'थोक मात्रा'],
      features: language === 'en'
        ? ['One-stop shop', 'Competitive pricing', 'All construction needs', 'Expert guidance available']
        : ['एक-स्टॉप शॉप', 'प्रतिस्पर्धी मूल्य निर्धारण', 'सभी निर्माण आवश्यकताएं', 'विशेषज्ञ मार्गदर्शन उपलब्ध'],
    },
  ];

  const wallsRoofItems = [
    {
      id: 1,
      title: language === 'en' ? 'Bricks & Blocks' : 'ईंटें और ब्लॉक',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
      description: language === 'en' ? 'For wall construction' : 'दीवार निर्माण के लिए',
    },
    {
      id: 2,
      title: language === 'en' ? 'Steel Reinforcement' : 'स्टील रीइन्ोर्समेंट',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400',
      description: language === 'en' ? 'Roof support materials' : 'छत समर्थन सामग्री',
    },
    {
      id: 3,
      title: language === 'en' ? 'Construction Hardware' : 'निर्माण हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      description: language === 'en' ? 'Essential tools & supplies' : 'आवश्यक उपकरण और आपूर्ति',
    },
    {
      id: 4,
      title: language === 'en' ? 'Contractor Support' : 'ठेकेदार सहायता',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      description: language === 'en' ? 'Skilled contractor contacts' : 'कुशल ठेकेदार संपर्क',
    },
  ];

  const plasterItems = [
    {
      id: 1,
      title: language === 'en' ? 'POP Material' : 'POP सामग्री',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
      description: language === 'en' ? 'Quality plaster of paris' : 'गुणवत्ता प्लास्टर ऑफ पेरिस',
    },
    {
      id: 2,
      title: language === 'en' ? 'Finishing Hardware' : 'फिनिशिंग हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      description: language === 'en' ? 'Tools for perfect finish' : 'परफेक्ट फिनिश के लिए उपकरण',
    },
    {
      id: 3,
      title: language === 'en' ? 'POP Contractor' : 'POP ठेकेदार',
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400',
      description: language === 'en' ? 'Expert POP contractors' : 'विशेषज्ञ POP ठेकेदार',
    },
  ];

  const tilesItems = [
    {
      id: 1,
      title: language === 'en' ? 'Ceramic Tiles' : 'सिरेमिक टाइल्स',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400',
      description: language === 'en' ? 'Multiple designs available' : 'कई डिज़ाइन उपलब्ध',
    },
    {
      id: 2,
      title: language === 'en' ? 'Vitrified Tiles' : 'विट्रिफाइड टाइल्स',
      image: 'https://images.unsplash.com/photo-1595814432314-90095f342694?w=400',
      description: language === 'en' ? 'Premium tile collection' : 'प्रीमियम टाइल ंग्रह',
    },
    {
      id: 3,
      title: language === 'en' ? 'Stone Flooring' : 'पत्थर फ्लोरिंग',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400',
      description: language === 'en' ? 'Natural stone options' : 'प्राकृतिक पत्थर विकल्प',
    },
    {
      id: 4,
      title: language === 'en' ? 'Tile Contractor' : 'टाइल ठेकेदार',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400',
      description: language === 'en' ? 'Professional tile layers' : 'पेशेवर टाइल लेयर',
    },
  ];

  const electricalItems = [
    {
      id: 1,
      title: language === 'en' ? 'LED Lights' : 'LED लाइट्स',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
      description: language === 'en' ? 'Energy-efficient lighting' : 'ऊर्जा-कुशल प्रकाश',
    },
    {
      id: 2,
      title: language === 'en' ? 'Chandeliers' : 'झूमर',
      image: 'https://images.unsplash.com/photo-1567225591450-2c0209f85b12?w=400',
      description: language === 'en' ? 'Elegant ceiling lights' : 'सुरुचिपूर्ण छत की रोशनी',
    },
    {
      id: 3,
      title: language === 'en' ? 'Electrical Hardware' : 'बिजली हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400',
      description: language === 'en' ? 'Switches, wires & more' : 'स्विच, तार और अधिक',
    },
    {
      id: 4,
      title: language === 'en' ? 'Installation Support' : 'इंस्टॉलेशन सहायता',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
      description: language === 'en' ? 'Electrician contacts' : 'इलेक्ट्रीशियन संपर्क',
    },
  ];

  const sanitaryItems = [
    {
      id: 1,
      title: language === 'en' ? 'Taps & Mixers' : 'नल और मिक्सर',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
      description: language === 'en' ? 'Premium quality taps and mixers in modern designs. Available in various finishes including chrome, gold, and matte black. Water-efficient and durable.' : 'आधुनिक डिज़ाइन में प्रीमियम गुणवत्ता नल और मिक्सर। क्रोम, गोल्ड और मैट ब्लैक सहित विभिन्न फिनिश में उपलब्ध। पानी कुशल और टिकाऊ।',
      category: language === 'en' ? 'Bathroom & Sanitary' : 'बाथरूम और सैनिटरी',
      price: language === 'en' ? 'Contact for Price' : 'मूल्य के लिए संपर्क करें',
      specifications: language === 'en'
        ? ['Single and double lever options', 'Water-saving technology', 'Corrosion resistant', 'Easy installation']
        : ['सिंगल और डबल लीवर विकल्प', 'पानी बचाने वाली तकनीक', 'जंग प्रतिरोधी', 'आसान इंस्टॉलेशन'],
      features: language === 'en'
        ? ['Modern designs', 'Long warranty', 'Energy efficient', 'Professional installation support']
        : ['आधुनिक डिज़ाइन', 'लंबी वारंटी', 'ऊर्जा कुशल', 'पेशेवर इंस्टॉलेशन सहायता'],
    },
    {
      id: 2,
      title: language === 'en' ? 'Showers' : 'शावर',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
      description: language === 'en' ? 'Rain & hand showers' : 'रेन और हंड शावर',
    },
    {
      id: 3,
      title: language === 'en' ? 'Toilets & Basins' : 'टॉयलेट और बेसिन',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
      description: language === 'en' ? 'Designer sanitary ware' : 'डिज़ाइनर सैनिटरी वेयर',
    },
    {
      id: 4,
      title: language === 'en' ? 'Plumbing Pipes' : 'प्लंबिंग पाइप',
      image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400',
      description: language === 'en' ? 'CPVC & PVC pipes' : 'CPVC और PVC पाइप',
    },
    {
      id: 5,
      title: language === 'en' ? 'Drainage Items' : 'ड्रेनेज आइटम',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
      description: language === 'en' ? 'Complete drainage system' : 'पूर्ण ड्रेनेज सिस्टम',
    },
  ];

  const paintingItems = [
    {
      id: 1,
      title: language === 'en' ? 'Wall Paints' : 'वॉल पेंट',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      description: language === 'en' ? 'All colors available' : 'सभी रंग उपलब्ध',
    },
    {
      id: 2,
      title: language === 'en' ? 'Premium Paints' : 'प्रीमियम पेंट',
      image: 'https://images.unsplash.com/photo-1572363241899-409f46ba62f5?w=400',
      description: language === 'en' ? 'Weather-resistant finish' : 'मौसम प्रतिरोधी फिनिश',
    },
    {
      id: 3,
      title: language === 'en' ? 'Painting Hardware' : 'पेंटिंग हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
      description: language === 'en' ? 'Brushes, rollers & tools' : 'ब्रश, रोलर और उपकरण',
    },
    {
      id: 4,
      title: language === 'en' ? 'Accessories' : 'सहायक उपकरण',
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
      description: language === 'en' ? 'Putty, primer & more' : 'पुट्टी, प्राइमर और अधिक',
    },
  ];

  const glassItems = [
    {
      id: 1,
      title: language === 'en' ? 'Window Glass' : 'विंडो ग्लास',
      image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400',
      description: language === 'en' ? 'Clear & tinted options' : 'क्लियर और टिंटेड विकल्प',
    },
    {
      id: 2,
      title: language === 'en' ? 'Door Glass' : 'डोर ग्लास',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400',
      description: language === 'en' ? 'Tempered safety glass' : 'टेम्पर्ड सेफ्टी ग्लास',
    },
    {
      id: 3,
      title: language === 'en' ? 'Glass Fittings' : 'ग्लास फिटिंग',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
      description: language === 'en' ? 'Hardware for glass work' : 'ग्लास वर्क के लिए हार्डवेयर',
    },
    {
      id: 4,
      title: language === 'en' ? 'Glass Contractors' : 'ग्लास ठेकेदार',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400',
      description: language === 'en' ? 'Expert glass installers' : 'विशेषज्ञ ग्लास इंस्टॉलर',
    },
  ];

  const benefits = [
    t.benefit1,
    t.benefit2,
    t.benefit3,
    t.benefit4,
    t.benefit5,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BDE8F5] to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0F2854] to-[#1C4D8D] text-white py-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                🏠 {t.title}
              </h1>
              <p className="text-[#BDE8F5] text-sm md:text-base">
                {t.subtitle}
              </p>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {!user ? (
                <>
                  <button
                    onClick={() => setShowUserLogin(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#BDE8F5] text-[#0F2854] rounded-lg hover:bg-white transition-all text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    {t.userLogin}
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white text-[#0F2854] rounded-lg hover:bg-[#BDE8F5] transition-all text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    {t.register}
                  </button>
                  <button
                    onClick={() => setShowOwnerLogin(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#4988C4] text-white rounded-lg hover:bg-[#1C4D8D] transition-all text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {t.ownerLogin}
                  </button>
                </>
              ) : (
                <>
                  {user.role === 'owner' && (
                    <button
                      onClick={() => setShowOwnerDashboard(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#4988C4] text-white rounded-lg hover:bg-[#1C4D8D] transition-all text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {t.dashboard}
                    </button>
                  )}
                  {user.role === 'user' && (
                    <button
                      onClick={() => setShowChatWithOwner(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#4988C4] text-white rounded-lg hover:bg-[#1C4D8D] transition-all text-sm"
                    >
                      {t.chatWithOwner}
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                  >
                    {t.logout}
                  </button>
                </>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-4 py-2 bg-[#4988C4] hover:bg-[#BDE8F5] hover:text-[#0F2854] rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Languages className="w-5 h-5" />
              <span className="font-semibold">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <div>
                  <div>6377307050</div>
                  <div>9462656996</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <div>9:00 AM – 7:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#BDE8F5] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F2854] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {t.welcome}
          </h2>
          <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto text-[#BDE8F5]">
            {t.welcomeText}
          </p>
          <div className="flex items-center justify-center gap-2 text-[#BDE8F5]">
            <MapPin className="w-5 h-5" />
            <p>{t.visitStore}</p>
          </div>
          <div className="mt-8">
            <p className="text-2xl font-semibold italic">
              "{t.tagline}"
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Foundation & Structure */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.foundation}
            </h2>
            <p className="text-gray-600">📌 {t.foundationDesc}</p>
          </div>
          <StepCarousel items={foundationItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Walls & Roof */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.wallsRoof}
            </h2>
            <p className="text-gray-600">📌 {t.wallsRoofDesc}</p>
          </div>
          <StepCarousel items={wallsRoofItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Plaster & POP */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.plaster}
            </h2>
            <p className="text-gray-600">📌 {t.plasterDesc}</p>
          </div>
          <StepCarousel items={plasterItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Tiles & Flooring */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.tiles}
            </h2>
            <p className="text-gray-600">📌 {t.tilesDesc}</p>
          </div>
          <StepCarousel items={tilesItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Electrical & Lighting */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.electrical}
            </h2>
            <p className="text-gray-600">📌 {t.electricalDesc}</p>
          </div>
          <StepCarousel items={electricalItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Sanitary Fittings */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.sanitary}
            </h2>
            <p className="text-gray-600">📌 {t.sanitaryDesc}</p>
          </div>
          <StepCarousel items={sanitaryItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Painting */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.painting}
            </h2>
            <p className="text-gray-600">📌 {t.paintingDesc}</p>
          </div>
          <StepCarousel items={paintingItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Glass Work */}
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.glass}
            </h2>
            <p className="text-gray-600">📌 {t.glassDesc}</p>
          </div>
          <StepCarousel items={glassItems} onProductClick={setSelectedProduct} />
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-[#BDE8F5]">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-8 text-center">
            ⭐ {t.whyChoose}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#BDE8F5] to-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-[#4988C4]"
              >
                <CheckCircle className="w-6 h-6 text-[#1C4D8D] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="mb-16 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white rounded-2xl shadow-xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center">🧩 {t.aboutUs}</h2>
          <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-[#BDE8F5]">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-8 text-center">
            📞 {t.contactUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Kapasan+Road+Narpat+Ki+Kheri+Chittorgarh', '_blank')}
              title="Click to open in Google Maps"
            >
              <div className="bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-[#0F2854]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t.location}</h3>
              <p className="text-gray-600 hover:text-blue-600 transition-colors">
                Kapasan Road, Narpat Ki Kheri, Chittorgarh
              </p>
              <p className="text-xs text-blue-500 mt-1">Click to view on map</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-[#0F2854]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t.callWhatsapp}
              </h3>
              <div className="text-gray-600 space-y-1">
                <a 
                  href="tel:6377307050"
                  className="block hover:text-blue-600 transition-colors cursor-pointer"
                >
                  6377307050
                </a>
                <a 
                  href="tel:9462656996"
                  className="block hover:text-blue-600 transition-colors cursor-pointer"
                >
                  9462656996
                </a>
              </div>
              <p className="text-xs text-blue-500 mt-1">Click to call</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-[#0F2854]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t.timings}</h3>
              <p className="text-gray-600">9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0F2854] to-[#1C4D8D] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">
            🏠 {t.title} — {t.subtitle}
          </p>
          <p className="text-[#BDE8F5] text-sm">
            "{t.footerTagline}"
          </p>
          <p className="text-gray-400 text-xs mt-4">
            © {new Date().getFullYear()} {t.title}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showUserLogin && <Login onClose={() => setShowUserLogin(false)} language={language} type="user" />}
      {showOwnerLogin && <Login onClose={() => setShowOwnerLogin(false)} language={language} type="owner" />}
      {showRegister && <UserRegister onClose={() => setShowRegister(false)} language={language} />}
      {showOwnerDashboard && user?.role === 'owner' && <OwnerDashboard onClose={() => setShowOwnerDashboard(false)} language={language} />}
      {showChatWithOwner && user?.role === 'user' && <ChatBox recipientId={OWNER_ID} recipientName={language === 'en' ? 'Vaibhav Sanitary Owner' : 'वैभव सैनिटरी मालिक'} onClose={() => setShowChatWithOwner(false)} language={language} />}
      
      {/* User Info Badge */}
      <UserInfo />
      
      {/* Owner Setup Guide (shows once for new owners) */}
      <OwnerSetupGuide />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          language={language}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}