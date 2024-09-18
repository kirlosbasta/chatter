// Desc: Landing page component
import CallToAction from './CallToAction';
import Features from './Features';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import Testimonial from './Testimonials';

function LandingPage() {
  return (
    <div className=" ">
      <Header />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default LandingPage;
