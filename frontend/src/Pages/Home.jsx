
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedCourses from '../components/home/FeaturedCourses';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTA from '../components/home/CTA';
import TopCategories from '../components/home/TopCategories';
import NewCourses from '../components/home/NewCourses';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <main className="bg-[#020817]">
      <Hero />
      <Stats />
      <FeaturedCourses />
      <TopCategories />
      <NewCourses />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Home;
