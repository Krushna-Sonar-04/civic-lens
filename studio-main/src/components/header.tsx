import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Flag className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Civic Lens</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/login">Login / Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
