export const questions = [
  {
    question: "What activities or topics make you lose track of time?",
    description:
      "Think about what naturally draws your attention and excitement. It could be anything from gaming to solving puzzles to helping others.",
    type: "text",
    key: "passion",
  },
  {
    question:
      "What's a problem or challenge you've personally experienced or observed?",
    description:
      "This could be something that frustrates you, a difficulty you've faced, or an issue you see others struggling with.",
    type: "text",
    key: "challenge",
  },
  {
    question:
      "If you could create something to make the world better, what would it be?",
    description:
      "Don't worry about feasibility - dream big! What kind of positive change would you like to see?",
    type: "text",
    key: "impact",
  },
  {
    question: "How many people are in your hackathon team?",
    description: "This helps us divide tasks appropriately for your team size.",
    type: "number",
    key: "teamSize",
  },
  {
    question: "What's your hackathon timeframe?",
    description: "We'll scope the project to fit your available time.",
    type: "select",
    options: ["24 hours", "48 hours", "72 hours"],
    key: "timeframe",
  },
  {
    question: "What technologies is your team comfortable with?",
    description:
      "Select all that apply - this helps us suggest appropriate technical solutions.",
    type: "multiselect",
    options: [
      "React",
      "Node.js",
      "Python",
      "Machine Learning",
      "Mobile Dev",
      "UI/UX",
      "AR/VR",
      "Data Science",
    ],
    key: "experience",
  },
];
