import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => /^[a-zA-Z0-9-_]+$/.test(value),
        message: "Username must be URL-safe",
      },
    },
    password: {
      type: String,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    contact: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    projects: [
      {
        name: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        techStack: [
          {
            type: String,
            trim: true,
          },
        ],
        githubLink: {
          type: String,
          trim: true,
        },
        liveDemo: {
          type: String,
          trim: true,
        },
      },
    ],
    experience: [
      {
        company: {
          type: String,
          trim: true,
        },
        role: {
          type: String,
          trim: true,
        },
        duration: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserPortfolio = mongoose.model("UserPortfolio", userSchema);

export default UserPortfolio;