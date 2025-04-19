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
};

export default function ContactInfo({
  title = "İletişim Bilgilerimiz",
  description = "Aşağıdaki kanallardan bize doğrudan ulaşabilirsiniz.",
  address = "Sanayi Mahallesi, Teknoloji Caddesi, No: 123\n34220 Kadıköy / İstanbul",
  phone = "+90 212 123 45 67",
  email = "info@villakiralamaturkiye.com",
  workingHours = {
    weekdays: "Pazartesi - Cuma: 09:00 - 18:00",
    saturday: "Cumartesi: 10:00 - 14:00",
    sunday: "Pazar: Kapalı"
  }
}: ContactInfoProps) {
  return (
    <Card className="border border-border h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Adres</h3>
          <p className="text-muted-foreground whitespace-pre-line">{address}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">Telefon</h3>
          <p className="text-muted-foreground">{phone}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">E-posta</h3>
          <p className="text-muted-foreground">{email}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">Çalışma Saatleri</h3>
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