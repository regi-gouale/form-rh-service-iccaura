"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QIdFormSchema } from "@/components/questions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { v4 as uuid4 } from "uuid";


const churches = [
  { value: "ICC Au-RA", label: "ICC Au-RA" },
  { value: "ICC Paris", label: "ICC Paris" },
  { value: "ICC Lyon", label: "ICC Lyon" },
  { value: "ICC Marseille", label: "ICC Marseille" },
];

const QIdForm = () => {
  const router = useRouter();
  const memoizedChurches = useMemo(() => churches, []);

  const form = useForm<z.infer<typeof QIdFormSchema>>({
    resolver: zodResolver(QIdFormSchema),
    defaultValues: {
      qFirstName: "",
      qLastName: "",
      qEmail: "",
      qChurch: "",
    },
  });

  function onSubmit(data: z.infer<typeof QIdFormSchema>) {
    const id = uuid4();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push(`/questions/${id}`);
  }
  return (
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
                name="qFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
                        placeholder="Mon Prénom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
                        placeholder="Mon Nom"
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
                name="qEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
                        placeholder="Mon adresse email"
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
                name="qChurch"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black">
                          <SelectValue placeholder="Choisir mon église" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memoizedChurches.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[0.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
              type="submit"
            >
              Je commence
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QIdForm;


