import PageWrapper from "@/components/layout/PageWrapper";
import LandingSearch from "./landing-page/components/LandingSearch";
import Destinations from "./landing-page/components/Destinations";
import PopularVenues from "./landing-page/components/PopularVenues";
export default function LandingPage() {
  return (
    <>
      <div className="relative h-96 w-full md:h-125">
        <img
          src="https://images.unsplash.com/photo-1532915905335-03659fc83ff9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Holidaze background cover image of a white villa with blue skies"
          className="h-full w-full object-center object-none md:object-cover "
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-24">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-6">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-primary">
                Find your perfect venue <br />
              </h1>
            </div>
            <LandingSearch />
          </div>
        </div>
      </div>
      <PageWrapper>
        <hr className="mt-12 border-t border-grey-200" />
        <PopularVenues />
        <hr className="mt-12 border-t border-grey-200" />
        <section>
          <p className="font-serif text-center text-3xl font-bold tracking-tight text-primary mt-6">
            Holidaze
          </p>
          <p className=" text-center font-sans text-xl text-foreground mt-3">
            Whether you're planning a weekend escape, a family holiday, or a
            dream retreat — Holidaze connects you with unique venues for
            comfort, character and unforgettable experiences. Browse hundreds of
            locations across the world and book the stay you've always wanted.
          </p>
        </section>
        <hr className="mt-12 border-t border-grey-200" />
        <Destinations />
        <hr className="mt-12 border-t border-grey-200" />
      </PageWrapper>
    </>
  );
}
