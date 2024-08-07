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
  { id: 1, city_name: "Caloocan City" },
  { id: 2, city_name: "Las Piñas City" },
  { id: 3, city_name: "Makati City" },
  { id: 4, city_name: "Malabon City" },
  { id: 5, city_name: "Mandaluyong City" },
  { id: 6, city_name: "Manila" },
  { id: 7, city_name: "Marikina City" },
  { id: 8, city_name: "Muntinlupa City" },
  { id: 9, city_name: "Navotas City" },
  { id: 10, city_name: "Parañaque City" },
  { id: 11, city_name: "Pasay City" },
  { id: 12, city_name: "Pasig City" },
  { id: 13, city_name: "Quezon City" },
  { id: 14, city_name: "San Juan City" },
  { id: 15, city_name: "Taguig City" },
  { id: 16, city_name: "Valenzuela City" },
  { id: 17, city_name: "Pateros" },
];
export const PROVINCES = [{ id: 1, province_name: "Metro Manila" }];

export type Status = {
  id: number;
  status_name: string;
};

export const ORDER_STATUSES: Status[] = [
  { id: 1, status_name: "Job Requested" },
  { id: 2, status_name: "Job Accepted" },
  { id: 3, status_name: "Worker Arrived" },
  { id: 4, status_name: "Job Completed" },
  { id: 5, status_name: "Worker Reviewed" },
  { id: 6, status_name: "Employer Reviewed" },
  { id: 7, status_name: "Payment Released" },
];
