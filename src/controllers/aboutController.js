// src/controllers/aboutController.js
import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        title: "About Nishant",
        subtitle: "Software Engineer & Lifelong Learner",
        bio: "Nishant is a passionate Software Engineer...",
        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "Chakra UI",
          "MongoDB",
          "Express",
        ],
        experience: [
          {
            duration: "Jan 2021 – Present",
            role: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            points: [
              "Led development of client-facing dashboard using React.",
              "Architected scalable backend with Node.js.",
              "Mentored junior developers.",
            ],
          },
          {
            duration: "Jun 2018 – Dec 2020",
            role: "Frontend Developer",
            company: "Innovate Co.",
            points: [
              "Built responsive UI for enterprise apps.",
              "Worked closely with designers.",
              "Optimized performance and loading.",
            ],
          },
        ],
        education: [
          {
            year: "2015 – 2019",
            degree: "B.Tech CSE",
            university: "AKTU University",
          },
        ],
        interests: ["Photography", "Hiking", "Cooking"],
      });
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const data = req.body;

    const updated = await About.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    });

    res.json({
      message: "About page updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
