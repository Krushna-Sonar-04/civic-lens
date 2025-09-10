import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Civic Lens</h3>
            <p className="text-sm text-muted-foreground">
              Empowering citizens to build better communities by reporting and tracking civic issues.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="/citizen/dashboard" className="text-sm hover:underline underline-offset-4">
                Citizen Dashboard
              </Link>
              <Link href="/contractor/dashboard" className="text-sm hover:underline underline-offset-4">
                Contractor Dashboard
              </Link>
               <Link href="/login" className="text-sm hover:underline underline-offset-4">
                Admin Login
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <nav className="flex flex-col gap-2">
               <Link href="#" className="text-sm hover:underline underline-offset-4">
                Help Center
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                FAQs
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Contact Us
              </Link>
               <Link href="#" className="text-sm hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:support@civiclens.gov.in" className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" />
                <span>support@civiclens.gov.in</span>
              </a>
              <a href="tel:18001234567" className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4" />
                <span>Toll-Free: 1800-123-4567</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; 2024 Civic Lens. All rights reserved. Government of India.
        </div>
      </div>
    </footer>
  );
}
