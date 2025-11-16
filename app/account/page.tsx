import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] pb-20">
      <Header />
      
      <section className="px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-[#2A2723] mb-8">
          My Account
        </h1>
        
        <div className="space-y-4">
          {['Profile', 'Orders', 'Addresses', 'Payment Methods', 'Preferences', 'Support'].map((item) => (
            <button
              key={item}
              className="w-full bg-[#EFE9E3] rounded-2xl p-4 text-left font-medium text-[#2A2723] hover:bg-[#D9CFC7] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
