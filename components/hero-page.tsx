import React from "react";
import { Button } from "./ui/button";
import { Book, Heart, Star, Users } from "lucide-react";

import Carousel from "@/components/carousel";
import { FiCode, FiLayout } from "react-icons/fi";

const HeroPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="md:w-1/2 text-4xl md:text-6xl text-center">
        Creating Brighter Futures for Children
      </h1>
      <p className="text-sm md:text-lg text-center">
        Join us in transforming lives through education, healthcare, and
        community development programs that give every child the chance to
        succeed.
      </p>
      <div className="flex gap-2 justify-center">
        <Button variant="destructive">Make A Diffrence Today</Button>
        <Button>Learn More</Button>
      </div>
    </div>
  );
};

export const Stats = () => {
  return (
    <div className="h-40 flex gap-4 flex-wrap justify-around">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl">50,000+</h3>
        <p>Children Helped</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl">200+</h3>
        <p>Communities Served</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl">2,500+</h3>
        <p>Active Volunteers</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl">25+</h3>
        <p>Programs Running</p>
      </div>
    </div>
  );
};

export const Programs = () => {
  const programs = [
    {
      icon: Book,
      title: "Education Excellence",
      description:
        "Providing quality education, school supplies, and scholarships to children in underserved communities.",
      beneficiaries: "15,000+",
      quote: "95% school enrollment rate in target areas",
    },
    {
      icon: Heart,
      title: "Healthcare Access",
      description:
        "Mobile health clinics, vaccination drives, and nutrition programs ensuring healthy childhoods.",
      beneficiaries: "25,000+",
      quote: "40% reduction in child malnutrition",
    },
    {
      icon: Users,
      title: "Community Development",
      description:
        "Building safe spaces, clean water systems, and supporting families to create thriving communities.",
      beneficiaries: "10,000+",
      quote: "200+ communities transformed",
    },
  ];
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="text-center">
        <h2 className="text-2xl">What We Do</h2>
        <p>
          Our comprehensive programs address the critical needs of children in
          underserved communities
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {programs.map((program) => (
          <div key={program.title} className="p-2 max-w-sm flex flex-col gap-2">
            <program.icon className="size-10" />
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <div className="flex justify-between">
              <span>Beneficiaries</span>
              <span>{program.beneficiaries}</span>
            </div>
            <q className="text-center">{program.quote}</q>
          </div>
        ))}
      </div>
      <div className="self-center">
        <Button variant="destructive">Learn More About Our Programs</Button>
      </div>
    </div>
  );
};

export const HomeCarousel = () => {
  const items = [
    {
      title: "Education Excellence",
      description:
        "Providing quality education to children in underserved communities",
      id: 1,
      icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&h=600&fit=crop&crop=center",
    },
    {
      title: "Reaching Rural Communities",
      description: "Bringing educational opportunities to village schools",
      id: 2,
      icon: <FiCode className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?w=1200&h=600&fit=crop&crop=center",
    },
    {
      title: "Individual Growth",
      description: "Supporting each child's unique learning journey",
      id: 3,
      icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&h=600&fit=crop&crop=center",
    },
    {
      title: "Healthcare & Wellbeing",
      description: "Providing medical care and emotional support to children",
      id: 4,
      icon: <FiCode className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/photo-1616408621653-6755190009a3?w=1200&h=600&fit=crop&crop=center",
    },
    {
      title: "Community Unity",
      description: "Building stronger communities through collaboration",
      id: 5,
      icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=1200&h=600&fit=crop&crop=center",
    },
    {
      title: "Knowledge Sharing",
      description:
        "Creating opportunities for community learning and development",
      id: 6,
      icon: <FiCode className="h-[16px] w-[16px] text-white" />,
      img: "https://images.unsplash.com/photo-1681011130080-46e470a7c96f?w=1200&h=600&fit=crop&crop=center",
    },
  ];
  return (
    <div className="p-4">
      <div className="hidden xl:h-[60vh] xl:flex relative justify-center items-center">
        <Carousel
          items={items}
          baseWidth={1200}
          autoplay
          autoplayDelay={2000}
          loop
          pauseOnHover
        />
      </div>
    </div>
  );
};

export const Volunteers = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center gap-8">
      <div>Ready to Make a Difference?</div>
      <div>
        Join thousands of supporters who believe every child deserves a bright
        future. Your contribution, no matter the size, creates lasting impact in
        communities worldwide.
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button variant="destructive">
          <span>
            <Heart />
          </span>
          <span>Start Your Impact</span>
        </Button>
        <Button>
          <span>Become A Volunteer</span>
          <span>
            <Users />
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>
            <Star />
          </span>
          <span>Charity Navigator 4-Star Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <Heart />
          </span>
          <span>100% Transparency Promise</span>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
