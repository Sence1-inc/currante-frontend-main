export interface Address {
  province: string;
  city: string;
  barangay: string;
  street: string;
}

export interface JobSubType {
  worker_job_subtype_id?: number | null;
  job_subtype_id: number | null;
  job_type: string;
  job_type_id: number | null;
  job_name: string;
  unit: string;
  job_unit_price: number;
  active_flg: boolean | number;
}

export interface WorkerJobSubtype {
  worker_id: number | null;
  job_subtype: JobSubType;
  job_unit_price: number | null;
}

export interface Order {
  id: number | null;
  otp?: string;
  worker_id: number | null;
  worker_user_id: number | null;
  employer_id: number | null;
  employer_user_id: number | null;
  employer_address: string;
  worker_name: string;
  employer_name: string;
  worker_job_subtype: WorkerJobSubtype;
  quantity: number | null;
  total: number | null;
  status: string;
  job_order_code: string;
  created_at: string;
  job_order_start_date: string;
  worker_arrived_date: string;
  job_order_completed_date: string;
  payment_approval_date: string;
}

export interface Category {
  id: number | null;
  name: string;
}

export interface CategoryRating {
  category: Category;
  rating: number | null;
}

export interface Review {
  id: number | null;
  overall_rating: number | null;
  review_for: string;
  feedback: string;
  order: Order;
  category_rating: CategoryRating[];
}

export interface UserPhoto {
  profile_photo: string;
  id_photo: string;
}

export interface Area {
  id: number | null;
  area_name: string;
}

export interface Address {
  province: string;
  city: string;
  barangay: string;
  street: string;
  house_building_unit: string;
}

export interface User {
  logged_in_as: string;
  id: number | null;
  id_photo: string;
  identification_photo?: string;
  is_identification_verified?: boolean;
  covers: string[];
  worker_id?: number | null;
  employer_id?: number | null;
  email: string;
  uuid: string;
  role: {
    role_name: string;
    role_details: string;
  };
  description: string;
  overall_rating: number | null;
  orders: Order[];
  areas: Area[];
  job_subtypes: JobSubType[];
  schedule: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  birthday: string;
  gender: string;
  phone_number: string;
  user_photos?: UserPhoto[];
  addresses: Address[];
  notifications: Notification[];
  reviews: Review[];
}

export type Worker = {
  id: number | null;
  transportation_cost: number | null;
  work_details: string;
  profile: User;
};

export type Employer = {
  id: number | null;
  profile: User;
};

export type JobType = {
  id: number | null;
  job_type_name: string;
  job_subtypes: { id: number; job_name: string; unit: string }[];
  image?: any;
};

export type Notification = {
  id?: number | null;
  user_id: number | null;
  message: string;
  is_read?: boolean;
};
