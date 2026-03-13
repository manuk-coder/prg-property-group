import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About | Luxury Real Estate Brokers Miami | PRG Property Group",
  description: "Meet Elena Rodriguez and the PRG Property Group team. We represent the pinnacle of luxury real estate advisory in Miami, Key Biscayne, and the Design District.",
};

export default function AboutPage() {
  return <AboutClient />;
}
