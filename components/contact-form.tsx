"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Form validation schema
const formSchema = z
  .object({
    nom: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    }),
    prenom: z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères",
    }),
    telephone: z.string().regex(/^\d{10}$/, {
      message: "Le numéro de téléphone doit contenir exactement 10 chiffres",
    }),
    email: z.string().email({
      message: "Adresse email invalide",
    }),
    sujet: z.enum(
      ["general", "support", "partenariat", "reclamation", "autre"],
      {
        required_error: "Veuillez sélectionner un sujet",
      }
    ),
    sujetPersonnalise: z.string().optional(),
    message: z.string().min(10, {
      message: "Le message doit contenir au moins 10 caractères",
    }),
  })
  .refine(
    (data) => {
      // If "autre" is selected, sujetPersonnalise must be filled
      if (data.sujet === "autre") {
        return data.sujetPersonnalise && data.sujetPersonnalise.length >= 3;
      }
      return true;
    },
    {
      message: "Veuillez préciser le sujet (min 3 caractères)",
      path: ["sujetPersonnalise"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm({
  isOpen,
  onOpenChange,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      sujet: undefined,
      sujetPersonnalise: "",
      message: "",
    },
  });

  // Watch the sujet field to show/hide custom subject input
  const sujetValue = form.watch("sujet");
  const isSujetAutre = sujetValue === "autre";

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    console.log("Data", data);

    try {
      const result = await sendContactEmail({
        nom: data.nom,
        prenom: data.prenom,
        telephone: data.telephone,
        email: data.email,
        sujet: data.sujet,
        sujetPersonnalise: data.sujetPersonnalise,
        message: data.message,
      });

      console.log("Result", result);

      if (result.success) {
        // Show success toast
        toast.success("Message envoyé avec succès !", {
          description: "Nous vous répondrons dans les plus brefs délais.",
        });

        // Show success state
        setIsSuccess(true);

        // Reset form and close after delay
        setTimeout(() => {
          form.reset({
            nom: "",
            prenom: "",
            telephone: "",
            email: "",
            sujet: undefined,
            sujetPersonnalise: "",
            message: "",
          });
          setIsSuccess(false);
          onOpenChange(false);
        }, 2000);
      } else {
        // Show error toast
        toast.error("Erreur lors de l'envoi", {
          description:
            result.error || "Une erreur s'est produite. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error toast
      toast.error("Erreur lors de l'envoi", {
        description:
          "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when sheet closes
  const handleOpenChange = (open: boolean) => {
    if (!open && !isSubmitting) {
      form.reset({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        sujet: undefined,
        sujetPersonnalise: "",
        message: "",
      });
      setIsSuccess(false);
    }
    onOpenChange(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-w-2xl rounded-t-3xl border-t-0 px-6 pb-8 pt-2"
      >
        {/* Handle bar */}
        <div className="mb-6 flex justify-center">
          <div className="h-1.5 w-12 rounded-full bg-muted" />
        </div>

        <SheetHeader className="text-center">
          <SheetTitle className="text-xl font-bold">Nous contacter</SheetTitle>
          <SheetDescription className="text-sm">
            Remplissez le formulaire ci-dessous et nous vous répondrons
            rapidement
          </SheetDescription>
        </SheetHeader>

        {/* Success state */}
        {isSuccess ? (
          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Message envoyé avec succès !
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        ) : (
          /* Form */
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              {/* Row for Nom & Prenom on desktop */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Nom field */}
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre nom"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Prenom field */}
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre prénom"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row for Telephone & Email on desktop */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Telephone field */}
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0612345678"
                          {...field}
                          disabled={isSubmitting}
                          maxLength={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre.email@exemple.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sujet field */}
              <FormField
                control={form.control}
                name="sujet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sujet</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">
                          Question générale
                        </SelectItem>
                        <SelectItem value="support">
                          Support technique
                        </SelectItem>
                        <SelectItem value="partenariat">
                          Demande de partenariat
                        </SelectItem>
                        <SelectItem value="reclamation">Réclamation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional custom subject field */}
              {isSujetAutre && (
                <FormField
                  control={form.control}
                  name="sujetPersonnalise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Précisez le sujet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre sujet personnalisé"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Message field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre demande..."
                        className="min-h-[120px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
