import { X, Phone, MapPin, CheckCircle } from 'lucide-react';

interface ProductDetailProps {
  product: {
    id: number;
    title: string;
    image: string;
    description?: string;
    category?: string;
    price?: string;
    specifications?: string[];
    features?: string[];
  };
  onClose: () => void;
  language: 'en' | 'hi';
}

export default function ProductDetail({ product, onClose, language }: ProductDetailProps) {
  const t = {
    en: {
      specifications: 'Specifications',
      features: 'Features',
      price: 'Price',
      contact: 'Contact Us',
      call: 'Call Now',
      visit: 'Visit Store',
      available: 'Available',
      inquire: 'Inquire About This Product',
    },
    hi: {
      specifications: 'विशिष्टताएं',
      features: 'विशेषताएं',
      price: 'मूल्य',
      contact: 'संपर्क करें',
      call: 'अभी कॉल करें',
      visit: 'स्टोर पर जाएं',
      available: 'उपलब्ध',
      inquire: 'इस उत्पाद के बारे में पूछताछ करें',
    },
  };

  const text = t[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-t-2xl md:rounded-l-2xl bg-gradient-to-br from-[#BDE8F5] to-[#4988C4]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.category && (
              <div className="absolute top-4 left-4 bg-[#0F2854] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-4">
              {product.title}
            </h2>

            {product.description && (
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.price && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-600">{text.price}: </span>
                <span className="text-2xl font-bold text-[#1C4D8D]">{product.price}</span>
              </div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#0F2854] mb-3">{text.specifications}</h3>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4988C4] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#0F2854] mb-3">{text.features}</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4988C4] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Section */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-[#0F2854] mb-4">{text.inquire}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:6377307050"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#0F2854] hover:to-[#1C4D8D] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {text.call}: 6377307050
                </a>
                <button
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Kapasan+Road+Narpat+Ki+Kheri+Chittorgarh', '_blank')}
                  className="flex items-center justify-center gap-2 bg-[#BDE8F5] text-[#0F2854] px-6 py-3 rounded-lg font-semibold hover:bg-[#4988C4] hover:text-white transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  {text.visit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
