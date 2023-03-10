import React from 'react';

// effects
import PageIllustration from '../partials/PageIllustration';

// sections
import HeroHome from '../partials/home/HeroHome';

// layouts
import Header from '../partials/Header';
import Footer from '../partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-h-full mx-auto pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;