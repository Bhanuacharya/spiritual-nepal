import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-[#FF4C29]">
                  Nepal Spirit
                </span>
              </a>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/destinations">
              <Button variant="ghost">Destinations</Button>
            </Link>
            <Link href="/contact">
              <Button>Contact</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
