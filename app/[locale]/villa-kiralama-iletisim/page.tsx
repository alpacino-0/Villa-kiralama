import type { Metadata } from "next";
import ContactForm from "@/components/villa-kiralama/ContactForm";
import ContactInfo from "@/components/villa-kiralama/ContactInfo";
import FAQSection from "@/components/villa-kiralama/FAQSection";

export const metadata: Metadata = {
  title: "Villa Kiralama İletişim | Türkiye'nin En İyi Villa Kiralama Platformu",
  description: "Villa kiralama platformumuz aracılığıyla bizimle iletişime geçin. Sorularınızı yanıtlamak ve size yardımcı olmak için buradayız.",
};

export default function VillaKiralamaIletisim() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">Bizimle İletişime Geçin</h1>
        <p className="text-muted-foreground mb-10 text-lg">
          Villa kiralama sürecinizde herhangi bir sorunuz mu var? Bize yazın, en kısa sürede size dönüş yapalım.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>

        <div className="mt-12 rounded-lg overflow-hidden h-[400px] border border-border">
          <iframe 
            title="Villa Kiralama Merkez Ofis Konumu"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.278134989809!2d29.031862!3d41.015908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzU3LjMiTiAyOcKwMDEnNTQuNyJF!5e0!3m2!1str!2str!4v1654241542016!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <FAQSection />
      </div>
    </div>
  );
}

