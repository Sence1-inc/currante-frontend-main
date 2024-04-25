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

export const LOGGED_IN_USER = 3;
export const WORKER_ID = 5;

export const CITIES = [
  { id: 1, city_name: "Caloocan" },
  { id: 2, city_name: "Las Piñas" },
  { id: 3, city_name: "Makati" },
  { id: 4, city_name: "Malabon" },
  { id: 5, city_name: "Mandaluyong" },
  { id: 6, city_name: "Manila" },
  { id: 7, city_name: "Marikina" },
  { id: 8, city_name: "Muntinlupa" },
  { id: 9, city_name: "Navotas" },
  { id: 10, city_name: "Parañaque" },
  { id: 11, city_name: "Pasay" },
  { id: 12, city_name: "Pasig" },
  { id: 13, city_name: "Quezon City" },
  { id: 14, city_name: "San Juan" },
  { id: 15, city_name: "Taguig" },
  { id: 16, city_name: "Valenzuela" },
  { id: 17, city_name: "Pateros" },
];
export const PROVINCES = [{ id: 1, province_name: "Metro Manila" }];
