import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact PRG Property Group | Miami Real Estate Brokerage",
  description: "Start the conversation. Connect with our elite team for off-market inquiries, portfolio consultations, or private showings in Miami, Midtown, and Key Biscayne.",
};

export default function ContactPage() {
  return <ContactClient />;
}
