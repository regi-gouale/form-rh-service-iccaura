"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QIdFormSchema } from "@/components/questions/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import { IChurch } from "@/types";
import { useStore } from "@/hooks/use-store";

const QIdForm = () => {
  const router = useRouter();

  const [churches, setChurches] = useState<IChurch[] | null>(null);

  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const res = await fetch("/api/churches");
        if (res.status !== 500) {
          const data = await res.json();
          setChurches(data);
        } else {
          return null;
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    };
    fetchChurches();
  }, []);

  const form = useForm<z.infer<typeof QIdFormSchema>>({
    resolver: zodResolver(QIdFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      church: "",
      profession: "",
      lastGradeCompleted: "",
    },
  });

  async function onSubmit(data: z.infer<typeof QIdFormSchema>) {
    try {
      const response = await fetch("/api/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          churchId: data.church,
          profession: data.profession,
          lastGradeCompleted: data.lastGradeCompleted,
        }),
      });
      if (response.ok) {
        const person = await response.json();

        useStore.setState({ personId: person.id });
        router.push(`/questions/${person.id}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'enregistrement", err);
    }
  }

  return (
    <div>
      {!churches ? (
        <Loading />
      ) : (
        <div>
          <div>
            <h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold mb-6 sm:mb-8">
              Quelques Informations
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="flex w-full justify-evenly gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-full border border-solid border-black/[.08] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                            placeholder="Prénom"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-full border border-solid border-black/[.08] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                            placeholder="Nom"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full justify-evenly gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-full border border-solid border-black/[.08] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                            placeholder="Adresse Mail"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full justify-evenly gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-full border border-solid border-black/[.08] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                            placeholder="Profession"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full justify-evenly gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <FormField
                    control={form.control}
                    name="lastGradeCompleted"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-full border border-solid border-black/[.08] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                            placeholder="Dernier diplôme obtenu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full justify-evenly gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <FormField
                    control={form.control}
                    name="church"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-full border border-solid border-black/[.08]  transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                              <SelectValue placeholder="Choisir mon église" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {churches.map((church) => (
                              <SelectItem key={church.id} value={church.id}>
                                {church.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="rounded-full border border-solid border-indigo-700/[.08] bg-indigo-700 transition-colors flex items-center justify-center hover:bg-indigo-500 font-semibold hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                  type="submit"
                >
                  Commencer le questionnaire
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default QIdForm;
