"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  search: z.string().trim().optional()
});

type SearchForm = z.infer<typeof formSchema>;

interface SearchProps {
  defaultValues?: SearchForm;
}

export function Search(props: SearchProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    ...props.defaultValues
  });

  const router = useRouter();

  function handleSubmit({ search }: SearchForm) {
    if (search) router.push(`/barbershops?search=${search}`);
  }

  return (
    <Form {...form}>
      <form
        className="flex items-start gap-2 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Busque por uma barbearia..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="icon"
          type="submit"
        >
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  );
}
