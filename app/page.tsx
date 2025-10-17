import HeroPage, {
  HomeCarousel,
  Programs,
  Stats,
  Volunteers,
} from "@/components/hero-page";

export default function Home() {
  return (
    <div>
      <HeroPage />
      <Stats />
      <Programs />
      <HomeCarousel />
      <Volunteers />
    </div>
  );
}
