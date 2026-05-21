import Hero from "@/components/Hero";
import AvailablePets from "@/components/AvailablePets";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <AvailablePets />
    </div>
  );
}
