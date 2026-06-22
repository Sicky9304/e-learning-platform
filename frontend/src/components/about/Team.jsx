import { useEffect, useState } from 'react';
import { getMentors } from '../../api/MentorApi';
import MentorCard from './mentorsCard/MentorCard';


const Team = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await getMentors();

      setMentors(response.data.mentors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">Meet Our Mentors</h2>

        <p className="text-center text-gray-400 mt-4">
          Learn from experienced industry professionals.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
