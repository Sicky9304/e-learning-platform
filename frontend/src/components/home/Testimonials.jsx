import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'DevVer R',
    role: 'Business Course',
    review:
      'This platform helped me switch my career within 6 months. The structured lessons and practical projects made learning simple and effective.',
  },
  {
    name: 'Tony Chester',
    role: 'Photography Course',
    review:
      "The best online learning experience I've ever had. Clear content, supportive mentors, and real-world skills.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-[#052c73]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-white">What Our Students Say</h2>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-[#143d82] rounded-xl p-10">
              <FaQuoteLeft className="text-gray-400 mx-auto text-xl" />

              <p className="text-gray-300 text-center mt-8 leading-8">"{item.review}"</p>

              <div className="flex flex-col items-center mt-8">
                <img
                  src={`https://i.pravatar.cc/100?img=${index + 10}`}
                  alt={item.name}
                  className="w-14 h-14 rounded-full"
                />

                <h4 className="text-white font-semibold mt-3">{item.name}</h4>

                <p className="text-gray-400 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
