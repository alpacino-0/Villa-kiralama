'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormEvent } from "react";

type ContactFormProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export default function ContactForm({
  title = "İletişim Formu",
  description = "Aşağıdaki formu doldurarak bize ulaşabilirsiniz. En kısa sürede talebinize yanıt vereceğiz.",
  buttonText = "Mesajı Gönder"
}: ContactFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada gerçekleştirilecek
    console.log("Form gönderildi");
  };

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Adınız Soyadınız
              </label>
              <Input id="name" placeholder="Adınız Soyadınız" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-posta Adresiniz
              </label>
              <Input id="email" type="email" placeholder="ornek@mail.com" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefon Numaranız
            </label>
            <Input id="phone" type="tel" placeholder="0500 000 00 00" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Konu
            </label>
            <Input id="subject" placeholder="Mesajınızın konusu" required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Mesajınız
            </label>
            <Textarea 
              id="message" 
              placeholder="Mesajınızı buraya yazabilirsiniz..." 
              rows={5}
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              size="lg"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 