import SearchBar from "../features/venues/components/SearchBar";

import PageWrapper from "@/components/layout/PageWrapper";

export default function LandingPage() {


  return (
    <>
      <div className="relative h-96 w-full  md:h-125">
        <img
          src="https://images.unsplash.com/photo-1532915905335-03659fc83ff9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Holidaze background cover image of a white villa with blue skies"
          className="h-full w-full object-center object-cover"
        />

        <div className="absolute inset-0 bg-sky-200/20 mix-blend-darken" />

        <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-24">
          <div className="w-full max-w-3xl">
            <SearchBar  />
          </div>
        </div>
      </div>
      <PageWrapper>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">
          Find your next stay
          {/* <span className="font-serif text-3xl font-bold tracking-tight text-primary">
          Holidaze</span> */}
        </h1>
        <p className=" font-sans text-xl  text-grey-600 mt-2">
          Discover holiday venues <br /> handpicked for a unforgettable stay
        </p>
      </PageWrapper>
    </>
  );
}
