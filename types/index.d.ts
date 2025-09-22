export interface ActionRes<T> {
  success: boolean,
  message: string;
  submitted: boolean;
  errors?: {
    [K in keyof T]?: string[]
  };
  inputs?: T 
}

  interface GetHashOutput {
  status: number;
  status_message: string;
  output: {
    session_id: string;
    hash_key: string;
    error?: string;
  };
}

interface LoginOutput {
  status: number;
  status_message: string;
  output: {
    error?: string;
  };
}

interface CarItem {
  car_id: number;
  custom_id: string;
  car_status: number;
  vin: string;
  kind_id: number;
  manufacturer_id: number;
  model_id: number;
  deactivation_reason?: string;
}

interface ListOfCarsOutput {
  status: number;
  status_message: string;
  output: {
    list_of_cars: CarItem[];
    error?: string;
  };
}

export interface Photo {
  photo_id: number,
  alt: string,
  main: number,
  client_photo_id: string,
  filename: string
}

export type SautoCar = {
  address: string;
  airbag: number;
  aircondition: number;
  attractive_offer: number;
  availability: number;
  beds: number;
  body_id: number;
  battery_capacity: number;
  capacity: number;
  car_id: number;
  car_status: number;
  cebia_coupon: string;
  cebia_smart_code_url: string;
  certified_id: number;
  client_url: string;
  color: number;
  color_tone: number;
  color_type: number;
  condition: number;
  crashed: number;
  custom_id: string;
  custom_label: string;
  custom_label2: string;
  custom_label3: string;
  custom_label4: string;
  deactivation_reason: string;
  deal_type: 'sale' | 'rent' | string;
  delivery_date: string;
  district: number;
  disused_date: string;
  door: number;
  dph: number;
  drive: number;
  electric_mileage: number;
  engine_power: number;
  engine_volume: number;
  environmental_tax: number;
  euro: number;
  fuel: number;
  first_owner: number;
  gas_mileage: number;
  gearbox: number;
  gearbox_auto_type: number;
  gearbox_level: number;
  guarantee_date: string;
  handicapped: number;
  iframe_height: number;
  iframe_small_url: string;
  iframe_url: string;
  kind_id: number;
  load_capacity: number;
  made_date: string;
  manufacturer_id: number;
  model_id: number;
  motohodiny: number;
  note: string;
  operating_lease_intended_for: any[]; // tipuj, pokud víš obsah
  payment: number;
  payment_count: number;
  perex: string;
  price: number;
  price_leasing: number;
  price_notice: string;
  priority_ordering: number;
  range: number;
  run_date: string;
  seatplace: number;
  service_book: number;
  sign_note: string;
  state_id: number;
  stk_date: string;
  tachometr: number;
  tachometr_unit: number;
  total_views: number;
  tunning: number;
  type_info: string;
  url: string;
  vat_deductable: number;
  video_filename: string;
  vin: string;
  weight: number;
  cebia_report: string;
  cr: string;
};

export type SanityCar = {
photos: string[],
  title: string;
  id: number;
  discount: number | null;
}


export interface CarWithPhotos extends SautoCar, SanityCar {}

export type Car = {
  _id: string; // Sanity document ID
  _type: 'vehicle';
  title: string;
  slug: string;
  service_book: 'Ano' | 'Ne';
  availability: '1' | '2' | '3'; // Datum, Skladem, Na objednávku
  aircondition: '1' | '2' | '3' | '4' | '5' | '6'; // Bez klimatizace, Manuální, Automatická, etc.
  vin: string;
  tachometr_unit: 'km' | 'mil';
  mileage: number;
  runDate: string; // Format: rrrr-mm
  condition: 'Nové' | 'Ojeté' | 'Havarované' | 'Předváděcí' | 'Veterán';
  body_id: string;
  color: 'Bílá' | 'Žlutá' | 'Oranžová' | 'Červená' | 'Vínová' | 'Růžová' | 'Fialová' | 'Modrá' | 'Zelená' | 'Hnědá' | 'Šedá' | 'Černá' | 'Béžová' | 'Stříbrná' | 'Zlatá' | 'Jiná' | 'Bronzová';
  color_tone: 'Světlá' | 'Tmavá';
  color_type: 'Základní' | 'Metalíza' | 'Fólie' | 'Pastelová' | 'Perleťová';
  airbag: '1' | '2' | '4' | '6' | '7' | '8' | '9' | '10' | '12' | '14';
  door: '1' | '2' | '3' | '4' | '5' | '6';
  euro: '1' | '2' | '3' | '4' | '5' | '6';
  capacity: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  handicapped: boolean;
  tunning: boolean;
  fuel: 'Benzín' | 'Nafta' | 'LPG + benzín' | 'Elektro' | 'Hybridní' | 'CNG + benzín' | 'Ethanol' | 'Jiné' | 'Vodík';
  engine_volume: number;
  engine_power: number;
  gearbox: 'Manuální' | 'Poloautomatická' | 'Automatická';
  gearbox_auto_type: 'automatická' | 'dvouspojková (DSG)' | 'hydrodynamická' | 'variátor (CVT)';
  gearbox_level: '3 stupňová a méně' | '4 stupňová' | '5 stupňová' | '6 stupňová' | '7 stupňová' | '8 stupňová a více';
  state: 'Česká republika' | 'Slovenská republika' | 'Francie' | 'Itálie' | 'Německo' | 'Rakousko' | 'Švýcarsko' | 'Holandsko' | 'Lucembursko' | 'Jiná' | 'Belgie' | 'Španělsko' | 'Dánsko' | 'Nedohledatelný původ' | 'USA' | 'Švédsko' | 'Polsko';
  stk_date: string; // Format: rrrr-mm
  environmental_tax: boolean;
  equipment: string[];
  price: number;
  dph: boolean;
  kind_id: string;
  manufacturer_id: string;
  model_id: string;
  made_date: string; // Format: rrrr-mm
  beds: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  first_owner: 'Ano' | 'Ne';
  operating_lease_services: 'Servis' | 'Zimní pneumatiky' | 'GAP';
  operating_lease_intended_for: 'Firma' | 'OSVČ' | 'Fyzická osoba';
  seatplace: 'do 16 sedadel' | '17–29 sedadel' | '30–39 sedadel' | '40–49 sedadel' | '50 a více sedadel';
  title_en: string;
  slug_en: string;
  service_book_en: 'Yes' | 'No';
  availability_en: 'Date' | 'In stock' | 'On order';
  aircondition_en: 'No air conditioning' | 'Manual' | 'Automatic' | 'Dual-zone automatic' | 'Three-zone automatic' | 'Four-zone automatic';
  vin_en: string;
  tachometr_unit_en: 'km' | 'miles';
  mileage_en: number;
  runDate_en: string;
  condition_en: 'New' | 'Used' | 'Damaged' | 'Demonstration' | 'Veteran';
  body_id_en: string;
  color_en: 'White' | 'Yellow' | 'Orange' | 'Red' | 'Wine' | 'Pink' | 'Purple' | 'Blue' | 'Green' | 'Brown' | 'Grey' | 'Black' | 'Beige' | 'Silver' | 'Gold' | 'Other' | 'Bronze';
  color_tone_en: 'Light' | 'Dark';
  color_type_en: 'Basic' | 'Metallic' | 'Foil' | 'Pastel' | 'Pearl';
  airbag_en: '1' | '2' | '4' | '6' | '7' | '8' | '9' | '10' | '12' | '14';
  door_en: '1' | '2' | '3' | '4' | '5' | '6';
  euro_en: '1' | '2' | '3' | '4' | '5' | '6';
  capacity_en: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  handicapped_en: boolean;
  tunning_en: boolean;
  fuel_en: 'Petrol' | 'Diesel' | 'LPG + petrol' | 'Electric' | 'Hybrid' | 'CNG + petrol' | 'Ethanol' | 'Other' | 'Hydrogen';
  engine_volume_en: number;
  engine_power_en: number;
  gearbox_en: 'Manual' | 'Semi-automatic' | 'Automatic';
  gearbox_auto_type_en: 'automatic' | 'dual-clutch (DSG)' | 'hydrodynamic' | 'variator (CVT)';
  gearbox_level_en: '3 gears or less' | '4 gears' | '5 gears' | '6 gears' | '7 gears' | '8 gears or more';
  state_en: 'Czech Republic' | 'Slovakia' | 'France' | 'Italy' | 'Germany' | 'Austria' | 'Switzerland' | 'Netherlands' | 'Luxembourg' | 'Other' | 'Belgium' | 'Spain' | 'Denmark' | 'Unknown origin' | 'USA' | 'Sweden' | 'Poland';
  stk_date_en: string;
  environmental_tax_en: boolean;
  equipment_en: string[];
  price_en: number;
  dph_en: boolean;
  kind_id_en: string;
  manufacturer_id_en: string;
  model_id_en: string;
  made_date_en: string;
  beds_en: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  first_owner_en: 'Yes' | 'No';
  operating_lease_services_en: 'Service' | 'Winter tires' | 'GAP';
  operating_lease_intended_for_en: 'Company' | 'Self-employed' | 'Individual';
  seatplace_en: 'up to 16 seats' | '17–29 seats' | '30–39 seats' | '40–49 seats' | '50 or more seats';
  images: Array<string>;
};

export type HeaderCarousel = {
  _id: string; // Sanity document ID
  _type: 'headerCarousel';
  items: Array<{
    textCs: string;
    textEn: string;
    media: string; // URL to image or MP4 video
    link: string; // URL link for the carousel item
  }>;
};

export type About = {
  _id: string; // Sanity document ID
  _type: 'aboutCarousel';
  items: Array<{
    isImage: boolean; // True for image, false for video
    media: string; // URL to image or MP4 video
  }>;
};

export interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
  }


  export interface Review{
    author_name: string;
    author_url: string;
    text: string;
    ajText: string;
    rating: number;
  }

  export type Reviews = Review[]

 export type TranslatedItem<IDKey extends string> = {
  [key in IDKey]: number;
} & {
  cz: string;
  en: string;
};