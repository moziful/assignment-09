import Hero from "@/components/Hero";
import AvailablePets from "@/components/AvailablePets";
import WhyAdoptPets from "@/components/WhyAdoptPets";
import PetCareTips from "@/components/PetCareTips";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <AvailablePets />
      <WhyAdoptPets />
      <PetCareTips />
    </div>
  );
}
