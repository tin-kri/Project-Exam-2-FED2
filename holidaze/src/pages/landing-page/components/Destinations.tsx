import DestinationCard from "./DestinationCard";

const destinations = [
  {
    city: "Rome",
    image:
      "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "Historic architecture in Rome, Italy",
    description:
      "Walk through ancient streets and discover timeless history at every turn",
  },
  {
    city: "Paris",
    image:
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "City view of Paris, France",
    description:
      "Lose yourself in romantic streets filled with culture art and Parisian charm",
  },
  {
    city: "New York",
    image:
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "New York City skyline and skyscrapers",
    description: "Feel the energy of a city that never slows down or sleeps",
  },
  {
    city: "Tokyo",
    image:
      "https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "Modern cityscape in Tokyo, Japan",
    description:
      "Step into a world where tradition and the future meet beautifully",
  },
  {
    city: "Barcelona",
    image:
      "https://images.unsplash.com/photo-1661030190121-d39a68523b55?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "Architecture and city views in Barcelona, Spain",
    description:
      "Soak up Mediterranean sunshine between charming streets and architecture",
  },
  {
    city: "London",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    alt: "Tower Bridge over the River Thames in London",
    description:
      "Discover iconic sights and hidden corners in this endlessly exciting city",
  },
];

export default function Destinations() {
  return (
    <section className="mt-12 ">
      <h2 className="font-serif text-2xl font-bold text-primary">
        Top Destinations
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  ">
        {destinations.map((destination) => (
          <DestinationCard key={destination.city} destination={destination} />
        ))}
      </div>
    </section>
  );
}
