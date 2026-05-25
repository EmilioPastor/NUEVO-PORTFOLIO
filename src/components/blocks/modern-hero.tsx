import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: { text: string; url: string };
  reviews?: {
    count: number;
    avatars: { src: string; alt: string }[];
  };
}

export function Hero7({
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  reviews = {
    count: 200,
    avatars: [
      { src: "https://www.shadcnblocks.com/images/block/avatar-1.webp", alt: "Avatar 1" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-2.webp", alt: "Avatar 2" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-3.webp", alt: "Avatar 3" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-4.webp", alt: "Avatar 4" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-5.webp", alt: "Avatar 5" },
    ],
  },
}: Hero7Props) {
  return (
    <section className="py-32">
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1
            className="font-serif italic tracking-tightish text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}
          >
            {heading}
          </h1>
          <p className="text-balance text-base leading-[1.7] text-muted md:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <a href={button.url}>{button.text}</a>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border border-line">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          <div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-5 fill-rust text-rust" />
              ))}
            </div>
            <p className="text-left font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const demoData: Required<Hero7Props> = {
  heading: "A Collection of Components Built With Shadcn & Tailwind",
  description:
    "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button: {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  reviews: {
    count: 200,
    avatars: [
      { src: "https://www.shadcnblocks.com/images/block/avatar-1.webp", alt: "Avatar 1" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-2.webp", alt: "Avatar 2" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-3.webp", alt: "Avatar 3" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-4.webp", alt: "Avatar 4" },
      { src: "https://www.shadcnblocks.com/images/block/avatar-5.webp", alt: "Avatar 5" },
    ],
  },
};

export function Hero7Demo() {
  return <Hero7 {...demoData} />;
}
