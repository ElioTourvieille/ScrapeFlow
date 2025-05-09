import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for does not exist.
        </p>
        <Button variant="outline" className="bg-primary" asChild>
          <Link href="/" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back to the home page
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
