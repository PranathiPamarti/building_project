import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  category?: string;
  price?: string;
  specifications?: string[];
  features?: string[];
}

interface StepCarouselProps {
  items: StepItem[];
  onProductClick?: (product: StepItem) => void;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] hover:from-[#0F2854] hover:to-[#1C4D8D] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] hover:from-[#0F2854] hover:to-[#1C4D8D] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

export default function StepCarousel({ items, onProductClick }: StepCarouselProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-12">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2">
            <div 
              onClick={() => onProductClick?.(item)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-[#4988C4] group"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2854]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 bg-gradient-to-br from-white to-[#BDE8F5]/20">
                <h3 className="text-lg font-semibold text-[#0F2854] group-hover:text-[#1C4D8D] transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1 group-hover:text-[#4988C4] transition-colors">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
