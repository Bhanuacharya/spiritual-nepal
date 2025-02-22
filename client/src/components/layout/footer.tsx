import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#082032] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nepal Spirit</h3>
            <p className="text-gray-300">
              Discover the spiritual heart of Nepal through ancient temples, 
              monasteries, and sacred sites.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations">
                  <a className="hover:text-[#FF4C29]">Destinations</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-[#FF4C29]">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: info@nepalspirit.com<br />
              Phone: +977 1234567890
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Nepal Spirit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
