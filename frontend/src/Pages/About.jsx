
import AboutCTA from './../components/about/AboutCTA';
import Team from './../components/about/Team';
import AboutStats from './../components/about/AboutStats';
import WhyLearnWithUs from './../components/about/WhyLearnWithUs';
import Mission from './../components/about/Mission';
import AboutHero from './../components/about/AboutHero';


const About = () => {
  return (
    <main className="bg-[#020817]">
      <AboutHero />
      <Mission />
      <WhyLearnWithUs />
      <AboutStats />
      <Team />
      <AboutCTA />
    </main>
  );
};

export default About;
