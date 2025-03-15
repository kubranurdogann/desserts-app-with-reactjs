export interface Product {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    image: {
      thumbnail: './assets/images/image-waffle-thumbnail.jpg',
      mobile: './assets/images/image-waffle-mobile.jpg',
      tablet: './assets/images/image-waffle-tablet.jpg',
      desktop: './assets/images/image-waffle-desktop.jpg',
    },
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
  },
  {
    id: 2,
    image: {
      thumbnail: './assets/images/image-creme-brulee-thumbnail.jpg',
      mobile: './assets/images/image-creme-brulee-mobile.jpg',
      tablet: './assets/images/image-creme-brulee-tablet.jpg',
      desktop: './assets/images/image-creme-brulee-desktop.jpg',
    },
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7.0,
  },
  {
    id: 3,
    image: {
      thumbnail: './assets/images/image-macaron-thumbnail.jpg',
      mobile: './assets/images/image-macaron-mobile.jpg',
      tablet: './assets/images/image-macaron-tablet.jpg',
      desktop: './assets/images/image-macaron-desktop.jpg',
    },
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
  },
  {
    id: 4,
    image: {
      thumbnail: './assets/images/image-tiramisu-thumbnail.jpg',
      mobile: './assets/images/image-tiramisu-mobile.jpg',
      tablet: './assets/images/image-tiramisu-tablet.jpg',
      desktop: './assets/images/image-tiramisu-desktop.jpg',
    },
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
  },
  {
    id: 5,
    image: {
      thumbnail: './assets/images/image-baklava-thumbnail.jpg',
      mobile: './assets/images/image-baklava-mobile.jpg',
      tablet: './assets/images/image-baklava-tablet.jpg',
      desktop: './assets/images/image-baklava-desktop.jpg',
    },
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4.0,
  },
  {
    id: 6,
    image: {
      thumbnail: './assets/images/image-panna-cotta-thumbnail.jpg',
      mobile: './assets/images/image-panna-cotta-mobile.jpg',
      tablet: './assets/images/image-panna-cotta-tablet.jpg',
      desktop: './assets/images/image-panna-cotta-desktop.jpg',
    },
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
  },
];
