import { AuthForm } from '@/components/auth-form';
import { Flag } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Flag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Civic Lens</span>
            </Link>
          <p className="text-muted-foreground">Welcome! Please login or create an account.</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
