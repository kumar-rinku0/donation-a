import { LucideRectangleVertical } from "lucide-react";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <AboutBrightBiginning />
      <OurStory />
    </div>
  );
};

const AboutBrightBiginning = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8 p-8 text-center">
      <h2 className="text-4xl lg:text-6xl font-bold lg:w-2/3 text-gray-700">
        About Bright Beginnings
      </h2>
      <p className="lg:w-2/3 text-gray-400">
        To provide quality education, healthcare, and community support to
        underprivileged children, creating opportunities for brighter futures.
      </p>
      <div className="lg:w-1/2 flex flex-wrap justify-around items-center gap-8">
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-2xl text-red-300 font-bold">2015</h3>
          <p>Founded</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-2xl  text-red-300 font-bold">50,000+</h3>
          <p>Children Helped</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-2xl  text-red-300 font-bold">2,500+</h3>
          <p>Volunteers</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-2xl  text-red-300 font-bold">25+</h3>
          <p>Programs</p>
        </div>
      </div>
    </div>
  );
};

const OurStory = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-4 lg:p-0 lg:w-2/3 min-h-[40vh] text-gray-400">
        <h2 className="flex items-center py-4 text-xl">
          <LucideRectangleVertical fill="red" color="red" />
          <span className="font-bold text-gray-600">Our Story</span>
        </h2>
        <div>
          <p>
            Founded in 2015 by a group of passionate educators and healthcare
            professionals, Bright Beginnings emerged from a simple belief: every
            child deserves access to quality education and healthcare,
            regardless of their circumstances.
          </p>
          <p>
            What started as a small community initiative has grown into a
            comprehensive organization serving over 50,000 children across 200+
            communities. Our holistic approach addresses not just immediate
            needs, but works to create sustainable, long-term solutions that
            empower entire communities.
          </p>
          <p>
            Today, we continue to expand our reach while maintaining our
            commitment to quality, transparency, and measurable impact. Every
            program we develop is built on extensive community input and
            designed to create lasting positive change.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
