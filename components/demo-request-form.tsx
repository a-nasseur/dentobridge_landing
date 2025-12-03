"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";

// Package type
export type PackageType = "starter" | "pro" | "entreprise" | "unknown";

interface DemoRequestFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: PackageType;
}

// Form validation schema
const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  prenom: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  telephone: z.string().regex(/^\d{10}$/, {
    message: "Le numéro de téléphone doit contenir exactement 10 chiffres",
  }),
  email: z
    .union([
      z.string().email({ message: "Adresse email invalide" }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  forfait: z.enum(["starter", "pro", "entreprise", "unknown"], {
    required_error: "Veuillez sélectionner un forfait",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DemoRequestForm({
  isOpen,
  onOpenChange,
  defaultPackage = "unknown",
}: DemoRequestFormProps) {
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
      forfait: defaultPackage,
    },
  });

  // Update form when defaultPackage changes
  useEffect(() => {
    form.setValue("forfait", defaultPackage);
  }, [defaultPackage, form]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: Backend integration - Send data to API
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setIsSuccess(true);

      // Reset form and close after delay
      setTimeout(() => {
        form.reset({
          nom: "",
          prenom: "",
          telephone: "",
          email: "",
          forfait: defaultPackage,
        });
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      // TODO: Show error message to user
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
        forfait: defaultPackage,
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
          <SheetTitle className="text-xl font-bold">
            Demander une démonstration
          </SheetTitle>
          <SheetDescription className="text-sm">
            Remplissez le formulaire ci-dessous et nous vous contacterons
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
              Demande envoyée avec succès !
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Nous vous contacterons dans les plus brefs délais.
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

              {/* Email field (optional) */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email{" "}
                      <span className="text-muted-foreground">
                        (facultatif)
                      </span>
                    </FormLabel>
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

              {/* Forfait field */}
              <FormField
                control={form.control}
                name="forfait"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forfait intéressé</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez un forfait" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="starter">
                          Starter (~50 Commandes/Mois)
                        </SelectItem>
                        <SelectItem value="pro">
                          Pro (~150 Commandes/Mois)
                        </SelectItem>
                        <SelectItem value="entreprise">
                          Entreprise (~300 Commandes/Mois)
                        </SelectItem>
                        <SelectItem value="unknown">
                          Je ne sais pas encore
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                  "Envoyer ma demande"
                )}
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
