import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "Ram Nepal",
    summary:
      "Experienced Nepali chef with a passion for traditional flavors and innovative culinary techniques",
    email: "ram.nepal@gmail.com",
    phone: "123-456-7890",
    homeAddress: "Kathmandu, Nepal",
    url: "linkedin.com/in/ram-nepal",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    nationality: "Nepali",
  },
  workExperiences: [
    {
      company: "ABC Restaurant",
      jobTitle: "Head Chef",
      date: "May 2020 - Present",
      descriptions: [
        "Led a diverse kitchen team to craft authentic Nepali dishes that delight customers",
        "Developed seasonal menus, aligning with sustainable local produce and unique culinary trends",
        "Managed kitchen operations, ensuring quality control and adherence to health regulations",
      ],
    },
    {
      company: "DEF Hotel",
      jobTitle: "Sous Chef",
      date: "Summer 2018 - 2020",
      descriptions: [
        "Assisted in menu planning and food preparation for high-end banquets and events",
        "Trained junior chefs, enhancing their skills and fostering a cohesive team environment",
        "Maintained kitchen efficiency, contributing to a 15% reduction in food waste",
      ],
    },
    {
      company: "Speed Wings Culinary School",
      jobTitle: "Culinary Instructor",
      date: "Summer 2017",
      descriptions: [
        "Taught traditional Nepali cooking methods to a class of 20+ aspiring chefs",
        "Organized hands-on workshops, elevating students' practical skills and creativity",
      ],
    },
  ],
  educations: [
    {
      school: "Gourmet Culinary Academy",
      degree: "Diploma in Culinary Arts",
      date: "Sep 2015 - May 2017",
      gpa: "3.8",
      descriptions: [
        "Awarded Top Chef in Culinary Showcase 2016",
        "Active participant in various culinary workshops and events",
      ],
    },
  ],
  projects: [
    {
      project: "Nepali Food Festival",
      date: "Spring 2021",
      descriptions: [
        "Organized and executed a successful food festival, showcasing Nepali cuisine to a wider audience",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "Traditional Cooking", rating: 4 },
      { skill: "Menu Planning", rating: 4 },
      { skill: "Team Leadership", rating: 3 },
      { skill: "Food Safety", rating: 3 },
      { skill: "Culinary Education", rating: 3 },
      { skill: "Customer Service", rating: 2 },
    ],
    descriptions: [
      "Tech: Modern Culinary Equipment, Recipe Development, Food Presentation",
      "Soft: Communication, Creativity, Collaboration, Detail-Oriented, Time Management",
    ],
  },
  custom: {
    descriptions: [],
  },
};


export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
