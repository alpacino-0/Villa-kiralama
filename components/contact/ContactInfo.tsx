import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ContactInfoProps = {
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  addressTitle?: string;
  phoneTitle?: string;
  emailTitle?: string;
  workingHoursTitle?: string;
};

export default function ContactInfo({
  title = "İletişim Bilgilerimiz",
  description = "Aşağıdaki kanallardan bize doğrudan ulaşabilirsiniz.",
  address = "Sanayi Mahallesi, Teknoloji Caddesi, No: 123\n34220 Kadıköy / İstanbul",
  phone = "+90 531 621 6100",
  email = "info@innelegance.com",
  workingHours = {
    weekdays: "Pazartesi - Cuma: 09:00 - 18:00",
    saturday: "Cumartesi: 10:00 - 14:00",
    sunday: "Pazar: Kapalı"
  },
  addressTitle = "Adres",
  phoneTitle = "Telefon",
  emailTitle = "E-posta",
  workingHoursTitle = "Çalışma Saatleri"
}: ContactInfoProps) {
  return (
    <Card className="border border-border h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">{addressTitle}</h3>
          <p className="text-muted-foreground whitespace-pre-line">{address}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">{phoneTitle}</h3>
          <p className="text-muted-foreground">{phone}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">{emailTitle}</h3>
          <p className="text-muted-foreground">{email}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">{workingHoursTitle}</h3>
          <p className="text-muted-foreground">
            {workingHours.weekdays}<br />
            {workingHours.saturday}<br />
            {workingHours.sunday}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 