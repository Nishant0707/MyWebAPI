import Contact from "../models/Contact.js";
import ContactInfo from "../models/ContactInfo.js";

// USER sends message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (!phone.match(/^\+\d{1,3}\d{10}$/)) {
      return res
        .status(400)
        .json({ message: "Phone must include +countrycode & 10 digits" });
    }

    const msg = await Contact.create({ name, email, phone, subject, message });

    res.json({ message: "Message sent successfully", data: msg });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN — view all messages
export const getMessages = async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
};

// ADMIN — delete message
export const deleteMessage = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// ADMIN — get contact info
export const getContactInfo = async (req, res) => {
  const info = await ContactInfo.findOne();
  res.json(info);
};

// ADMIN — update contact info
export const updateContactInfo = async (req, res) => {
  const { email, phone, address } = req.body;

  let info = await ContactInfo.findOne();
  if (!info) {
    info = await ContactInfo.create({ email, phone, address });
  } else {
    info.email = email;
    info.phone = phone;
    info.address = address;
    await info.save();
  }

  res.json(info);
};
