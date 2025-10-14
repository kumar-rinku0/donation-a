import HeroPage, {
  HomeCarousel,
  Programs,
  Stats,
} from "@/components/hero-page";

export default function Home() {
  return (
    <div>
      <HeroPage />
      <Stats />
      <Programs />
      <HomeCarousel />
    </div>
  );
}
