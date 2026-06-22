const WhyChooseUs = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto bg-[#08152f] rounded-2xl p-12">
        <h2 className="text-4xl font-bold text-center text-white">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <div>
            <h3 className="text-2xl font-semibold text-white">Expert Mentors</h3>

            <p className="text-gray-400 mt-3">Learn from industry professionals.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Practical Projects</h3>

            <p className="text-gray-400 mt-3">Build portfolio-ready projects.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Career Support</h3>

            <p className="text-gray-400 mt-3">Resume and interview guidance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
