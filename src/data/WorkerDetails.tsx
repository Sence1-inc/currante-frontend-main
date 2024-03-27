export const JOB_SUB_TYPES = [
  {
    job_type: "Cleaning",
    job_subtypes: [
      { name: "general cleaning", unit: "per sqm" },
      { name: "post-construction cleaning", unit: "per sqm" },
    ],
  },
  {
    job_type: "Plumbing",
    job_subtypes: [
      { name: "general repairs", unit: "per day" },
      { name: "inspection", unit: "per day" },
    ],
  },
  {
    job_type: "Carpentry",
    job_subtypes: [
      { name: "general repairs", unit: "per day" },
      { name: "inspection", unit: "per day" },
    ],
  },
];

export const JOB_TYPES = ["Cleaning", "Plumbing", "Carpentry"];
