import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LeafIcon } from "lucide-react";
import Image from "next/image";
import greenerFuture from "../../public/grow-a-greener-future.jpg";
import interactiveMap from "../../public/interactive-map.jpg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <LeafIcon className="h-6 w-6" />
          <span className="sr-only">iPlanted</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/map" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Plant a Tree
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Explore
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Community
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Plant a Tree, Grow a Greener Future
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    iPlanted is a digital platform that empowers you to plant trees, track your environmental impact,
                    and connect with a community dedicated to sustainability.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/map"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Plant a Tree
                  </Link>
                </div>
              </div>
              <Image
                src={greenerFuture}
                width={550}
                height={550}
                alt="Greener Future"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYGBgYHBwYJCgkKCQ0MCwsMDRQODw4PDhQfExYTExYTHxshGxkbIRsxJiIiJjE4Ly0vOEQ9PURWUVZwcJYBBgYGBgYGBgcHBgkKCQoJDQwLCwwNFA4PDg8OFB8TFhMTFhMfGyEbGRshGzEmIiImMTgvLS84RD09RFZRVnBwlv/CABEIAAUABQMBEQACEQEDEQH/xAAUAAEAAAAAAAAAAAAAAAAAAAAG/9oACAEBAAAAAAH/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/9oACAECEAAAABf/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/9oACAEDEAAAAEf/xAAcEAACAgIDAAAAAAAAAAAAAAACAwQFASEAETH/2gAIAQEAAT8AgWl04HRoFocEI7iwWFDphF6XWuf/xAAbEQACAgMBAAAAAAAAAAAAAAABAwIEABESE//aAAgBAgEBPwC3Yj3FjVehYNgGRHOf/8QAGhEAAgIDAAAAAAAAAAAAAAAAAgMBEgARgf/aAAgBAwEBPwBJEoaLKsR3ef/Z"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-2xl"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Onboarding</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Started in 3 Easy Steps</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Joining the iPlanted community is simple. Sign up, select a tree to plant, and start tracking your
                  environmental impact.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Sign Up</h3>
                  <p className="text-muted-foreground">
                    Create your free iPlanted account and start your journey to a greener future.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Pick a Location</h3>
                  <p className="text-muted-foreground">
                    Interact with the map to find the perfect spot to mark your planting location.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Track Your Impact</h3>
                  <p className="text-muted-foreground">
                    Monitor the positive impact you're making on the environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Interactive Map</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
                  Discover Planting Opportunities Worldwide
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our interactive map to find the perfect spot to plant a tree and contribute to global
                  reforestation efforts.
                </p>
                <Link
                  href="/map"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Explore the Map
                </Link>
              </div>
              <Image
                src={interactiveMap}
                width="550"
                height="310"
                quality={80}
                placeholder="blur"
                alt="Interactive Map"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-2xl"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Tree Catalog</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover the Perfect Tree for Your Environment
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our extensive catalog of tree species and learn about their unique environmental benefits and
                  care requirements.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Oak Tree</h3>
                  <p className="text-muted-foreground">
                    Oak trees are known for their long lifespan, ability to absorb carbon dioxide, and provide shade and
                    habitat for wildlife.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Maple Tree</h3>
                  <p className="text-muted-foreground">
                    Maple trees are renowned for their vibrant fall foliage and their ability to improve air quality and
                    provide shade.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Birch Tree</h3>
                  <p className="text-muted-foreground">
                    Birch trees are known for their distinctive white bark and their ability to thrive in a variety of
                    climates, making them a great choice for reforestation efforts.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the iPlanted Community</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with like-minded individuals who share your passion for environmental conservation and
                sustainability.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Join Now</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to stay updated on our latest initiatives and events.{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 iPlanted. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}

// function LeafIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
//       <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
//     </svg>
//   )
// }
