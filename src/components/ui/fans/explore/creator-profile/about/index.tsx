import React from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

const aboutData = {
  avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "Jhon G.",
  handle: "@jhon",
  role: "Digital Artist",
  stats: [
    { label: "Members", value: "12,765" },
    { label: "Paid members", value: "12,765" },
    { label: "Total posts", value: "12,765" },
  ],
  description: `This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion. Each detail reflects the artist's intention, blending light and shadow to create a balanced and immersive visual experience. The artwork invites viewers to pause, interpret, and connect with the story behind the canvas, making it a timeless piece suitable for both modern and classic spaces.
  
  The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion. Each detail reflects the artist's intention, blending light and shadow to create a balanced and immersive visual experience. The artwork invites viewers to pause, interpret, and connect with the story behind the canvas, making it a timeless piece suitable for both modern and classic spaces.
  
  This painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion. Each detail reflects the artist's intention, blending light and shadow to create a balanced and immersive visual experience. The artwork invites viewers to pause, interpret, and connect with the story behind the canvas, making it a timeless piece suitable for both modern and classic spaces.
  
  The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion. Each detail reflects the artist's intention, blending light and shadow to create a balanced and immersive visual experience. The artwork invites viewers to pause, interpret, and connect with the story behind the canvas, making it a timeless piece suitable for both modern and classic spaces.`,
};

const About = () => {
  return (
    <div className="flex flex-col items-center  mx-auto py-8 px-4 bg-[#15131A]">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative size-32 md:size-40 mb-4">
          <Image
            src={aboutData.avatarUrl}
            alt={aboutData.name}
            fill
            className="rounded-full object-cover border-4 border-cardBg shadow-xl"
          />
        </div>
        <div className="flex items-center gap-1.5 mb-1">
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
            {aboutData.name}
          </h2>
          <BadgeCheck className="size-6 text-[#99a0fd] fill-[#99a0fd]/20" />
        </div>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          {aboutData.handle} • {aboutData.role}
        </p>
      </div>

      {/* Stats Card */}
      <div className="w-full bg-cardBg border border-[#99A1C666] rounded-2xl md:rounded-3xl p-6 md:p-8 mb-10 flex justify-between items-center overflow-hidden">
        {aboutData.stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-lg md:text-xl font-bold text-primary mb-1">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-medium">
                {stat.label}
              </span>
            </div>
            {index < aboutData.stats.length - 1 && (
              <div className="h-8 w-[1px] bg-[#99A1C666] shrink-0 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="text-gray-300 text-[15px] md:text-base leading-[1.8] font-light whitespace-pre-line text-justify md:text-left">
          {aboutData.description}
        </p>
      </div>
    </div>
  );
};

export default About;
