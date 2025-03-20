import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Wand2, Palette, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted py-20 md:py-32">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Design Your Dream Home with <span className="text-primary">AI</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Create stunning interior designs with our AI-powered platform. Drag
            and drop furniture, get smart suggestions, and visualize your space
            in real-time 3D.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/design">
                Start Designing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium">3D Room Editor</h3>
              <p className="mt-2 text-muted-foreground">
                Design your space in immersive 3D with our easy-to-use
                drag-and-drop interface.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium">AI Suggestions</h3>
              <p className="mt-2 text-muted-foreground">
                Get intelligent furniture arrangement and style recommendations
                based on your room dimensions.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium">
                Real-time Collaboration
              </h3>
              <p className="mt-2 text-muted-foreground">
                Work on designs with friends or interior designers in real-time
                with live updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your space?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of homeowners who have designed their dream spaces
            with our platform.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/design">
              Start Your Design <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
