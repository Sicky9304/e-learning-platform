import MissionVisual from "./MissionVisual";

const Mission = () => {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="h-[400px] rounded-2xl bg-[#08152f]">
          <MissionVisual/>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white">Our Mission</h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            We believe learning should be practical, affordable, and accessible for everyone.
          </p>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Our courses are designed to help learners gain industry-ready skills.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
