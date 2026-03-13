import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Elite Property Management Miami | Key Biscayne & Design District | PRG",
  description: "Maximize your real estate ROI. PRG Property Group offers elite property management, tenant screening, and short-term rental optimization in Miami.",
};

export default function PropertyManagementPage() {
  return (
    <main className="bg-[var(--color-primary-bg)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-[var(--color-primary-text)] mb-6">
            Elite Property <br />
            <span className="italic text-[var(--color-accent-gold)]">Management</span>
          </h1>
          <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto">
            From luxury long-term leases in Key Biscayne to high-yield Airbnb optimization in Wynwood & Midtown. We handle everything with absolute discretion and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] w-full">
            <Image 
              src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury kitchen in Miami Design District property managed by PRG"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-6">Comprehensive Tenant Screening & Leasing</h2>
            <p className="font-sans text-lg text-gray-600 mb-6 leading-relaxed">
              Securing the right tenant is the foundation of a profitable real estate portfolio. Our rigorous vetting process ensures that your luxury property in Coral Gables or Key Biscayne is occupied by highly qualified, responsible individuals.
            </p>
            <ul className="space-y-4 font-sans text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                Extensive financial background checks
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                White-glove lease structuring and negotiations
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                Seamless move-in coordination and condition audits
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-6">Short-Term Rental & Airbnb Optimization</h2>
            <p className="font-sans text-lg text-gray-600 mb-6 leading-relaxed">
              Maximize your yield in high-demand zones like Miami Midtown and the Design District. We transform vacant investment properties into fully-managed, 5-star hospitality experiences.
            </p>
            <ul className="space-y-4 font-sans text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                Dynamic pricing algorithms to maximize nightly rates
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                24/7 guest communication and concierge services
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[var(--color-accent-gold)] rounded-full"></span>
                Elite cleaning, maintenance, and staging coordination
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] w-full order-1 md:order-2">
            <Image 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
              alt="Modern living room for Midtown Miami short term rental"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
