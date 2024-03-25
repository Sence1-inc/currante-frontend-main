export const JOB_SUB_TYPES = [
  {
    job_type: "cleaner",
    job_subtypes: [
      { name: "general cleaning", unit: "per sqm" },
      { name: "post-construction cleaning", unit: "per sqm" },
    ],
  },
  {
    job_type: "plumber",
    job_subtypes: [
      { name: "general repairs", unit: "per day" },
      { name: "inspection", unit: "per day" },
    ],
  },
  {
    job_type: "carpenter",
    job_subtypes: [
      { name: "general repairs", unit: "per day" },
      { name: "inspection", unit: "per day" },
    ],
  },
];

export const JOB_TYPES = ["cleaner", "plumber", "carpenter"];
