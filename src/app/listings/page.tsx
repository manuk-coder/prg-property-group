import { Metadata } from 'next';
import ListingsClient from './ListingsClient';

export const metadata: Metadata = {
  title: "Exclusive Luxury Listings | Key Biscayne & Design District | PRG",
  description: "Explore our curated portfolio of premier properties across South Florida's most coveted neighborhoods, including Key Biscayne, Midtown, and the Design District.",
};

export default function ListingsPage() {
  return <ListingsClient />;
}
