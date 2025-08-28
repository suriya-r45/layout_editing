// import { openWhatsAppGeneral } from '@/lib/whatsapp';
import { MessageCircle, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logoPath from '@assets/1000284180_1755240849891_1755886428742.jpg';


export default function Footer() {
  return (
    <footer className="py-8 border-t-2" data-testid="footer-main" style={{
      backgroundColor: '#ffffff',
      borderTopColor: '#E5E5E5',
      color: '#374151'
    }}>
      <div className="container mx-auto px-4" style={{backgroundColor: '#ffffff'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" style={{backgroundColor: '#ffffff'}}>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={logoPath}
                  alt="Palaniappa Jewellers Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-800">PALANIAPPA JEWELLERS</h3>
                <p className="text-xs font-light text-gray-600">Since 2025</p>
              </div>
            </div>
            <p className="text-sm font-light text-gray-600">
              Premium jewelry crafted with precision and elegance for discerning customers worldwide.
            </p>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-home">Home</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-products">Products</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-about">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-gold">Gold Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-diamond">Diamond Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-silver">Silver Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-custom">Custom Designs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a 
                href="https://wa.me/919597201554?text=Hi!%20I'm%20interested%20in%20your%20jewelry%20collection.%20Could%20you%20please%20help%20me%20with%20more%20information?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer" 
                data-testid="link-whatsapp-phone"
              >
                <FaWhatsapp className="h-4 w-4 text-green-500" />
                <span className="text-green-600">+91 959 720 1554</span>
              </a>
              <a
                href="https://instagram.com/palaniappa.bh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-500 hover:text-pink-400 transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <p className="flex items-center space-x-2" data-testid="text-email">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>jewelerypalaniappa@gmail.com</span>
              </p>
              {/* <p className="flex items-center space-x-2" data-testid="text-address">
                <MapPin className="h-4 w-4" />
                <span>123 Jewelry Street, Chennai</span>
              </p> */}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Locations</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">India</h4>
                  <p className="text-sm text-gray-600">Salem, Tamil Nadu</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">Bahrain</h4>
                  <p className="text-sm text-gray-600">Gold City, Manama</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm border-t-2 border-gray-200 text-gray-600">
          <p>&copy; 2025 Palaniappa Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
