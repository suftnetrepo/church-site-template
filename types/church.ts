export type Slider = {
  _id?: string;
  title: string;
  message: string;
  status: boolean;
  imageOnly: boolean;
  secure_url: string;
  public_id?: string;
};

export type ChurchContact = {
  _id?: string;
  title: string;
  first_name: string;
  last_name: string;
  phone?: string;
  status?: boolean;
};

export type ChurchSettings = {
  name: string;
  mobile: string;
  email?: string;
  currency?: string;
  bank_name?: string;
  sort_code?: string;
  account_number?: string;
  address?: {
    addressLine1?: string;
    town?: string;
    postcode?: string;
    completeAddress?: string;
  };
  sliders: Slider[];
  pastor_section?: {
    title?: string;
    description: string;
    first_name: string;
    last_name: string;
    public_id?: string;
    secure_url?: string;
  };
  contacts?: ChurchContact[];
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
};

export type RegularService = {
  _id?: string;
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  remote?: boolean;
  remote_link?: string;
};

export type FellowshipGroup = {
  _id?: string;
  name: string;
  addressLine1?: string;
  completeAddress?: string;
  town?: string;
  county?: string;
  country?: string;
  postcode?: string;
  mobile?: string;
  status?: boolean;
  location?: { type: 'Point'; coordinates: [number, number] };
};

export type ChurchEvent = {
  _id?: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  secure_url?: string;
  public_id?: string;
  addressLine1?: string;
  completeAddress?: string;
  town?: string;
  county?: string;
  country?: string;
  postcode?: string;
  status?: boolean;
  can_register?: boolean;
  location?: { type: 'Point'; coordinates: [number, number] };
};
