import DestinationCard from "./DestinationCard";

const destinations = [
  {
    city: "Rome",
    image: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    city: "Paris",
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    city: "New York",
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    city: "Tokyo",
    image: "https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    city: "Barcelona",
    image: "https://images.unsplash.com/photo-1661030190121-d39a68523b55?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    city: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

];

export default function TopDestinations() {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-bold text-primary">
        Top Destinations
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {destinations.map((destination) => (
          <DestinationCard key={destination.city} destination={destination} />
        ))}
      </div>
    </section>
  );
}
