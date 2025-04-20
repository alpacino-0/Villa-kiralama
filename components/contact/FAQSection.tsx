import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  faqs?: FAQItem[];
};

export default function FAQSection({
  title = "Sık Sorulan Sorular",
  faqs = [
    {
      id: "reservation-cancellation",
      question: "Rezervasyon iptali için ne kadar süre öncesinden haber vermem gerekiyor?",
      answer: "Rezervasyon iptallerinizi, konaklama tarihinden en az 7 gün önce yapmanız durumunda ödemenizin tamamı iade edilir. 3-7 gün arasında yapılan iptallerde %50 iade yapılırken, 3 günden az bir süre kala yapılan iptallerde iade yapılmamaktadır."
    },
    {
      id: "deposit-payment",
      question: "Villa kiralama sürecinde depozito ödemesi yapmalı mıyım?",
      answer: "Evet, villa kiralaması sırasında güvenlik depozitosu alınmaktadır. Bu tutar, villanın değerine ve konumuna göre değişiklik gösterebilir. Çıkış işlemleriniz tamamlandıktan ve villa kontrol edildikten sonra, herhangi bir hasar yoksa depozito tutarı tarafınıza iade edilecektir."
    },
    {
      id: "pets-policy",
      question: "Evcil hayvanımı villaya getirebilir miyim?",
      answer: "Evcil hayvan politikamız villadan villaya değişiklik göstermektedir. Evcil hayvan kabul eden villalarımız filtreleme seçeneklerinde belirtilmiştir. Rezervasyon yapmadan önce seçtiğiniz villanın evcil hayvan politikasını kontrol etmenizi öneririz."
    }
  ]
}: FAQSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-primary">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
            <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 