import HomeContent from "../models/HomeContent.js";

export const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching home content", error: error.message });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const { heading, bio, linkedin, github, twitter } = req.body;

    const updates = {
      heading,
      bio,
      socials: {
        linkedin,
        github,
        twitter,
      },
    };

    // If files uploaded via multer
    if (req.files) {
      if (req.files.profileImage && req.files.profileImage[0]) {
        updates.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
      }

      if (req.files.resumeFile && req.files.resumeFile[0]) {
        updates.resumeFile = `/uploads/${req.files.resumeFile[0].filename}`;
      }
    }

    const updated = await HomeContent.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });

    return res.json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating home content", error: error.message });
  }
};
