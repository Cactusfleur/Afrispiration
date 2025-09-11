export interface Designer {
  id: string
  name: string
  bio?: string
  location?: string
  website_url?: string
  instagram_url?: string
  email?: string
  phone?: string
  image_url?: string
  specialties?: string[]
  years_experience?: number
  price_range?: string
  sustainability_rating?: number
  featured: boolean
  status: "active" | "inactive" | "pending"
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  author_name: string
  author_bio?: string
  author_image_url?: string
  tags?: string[]
  featured: boolean
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  short_description?: string
  event_date: string
  end_date?: string
  location: string
  venue_name?: string
  address?: string
  ticket_url?: string
  price_info?: string
  featured_image_url?: string
  organizer_name?: string
  organizer_contact?: string
  capacity?: number
  tags?: string[]
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}
