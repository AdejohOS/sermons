export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  username: string | null;
}

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  fileUrl: string | undefined;
  about: string | null;
  category: Category;
  author: Author;
  location: Location;
  favourites: Favourite[];
  dateDelivered: Date;
}

export interface RelatedSermon {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  category: Category;
  author: Author;
  dateDelivered: Date;
}
export interface FavouriteSermon {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
}

export interface Author {
  id: string;
  name: string;
  imageUrl: string | null;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string | null;
}
export interface Location {
  id: string;
  name: string;
  address: string | null;
  imageUrl: string | null;
}

export interface Favourite {
  userId: string;
}

export interface Comment {
  id: string;
  description: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;

  userId: string | null;
  sermonId: string | null;
}
