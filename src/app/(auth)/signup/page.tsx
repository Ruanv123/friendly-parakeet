"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  image: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function signUp(data: z.infer<typeof formSchema>) {
    const { data: datal, error } = await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        image: undefined,
        role: "admin",
      },
      {
        onSuccess: () => {
          form.reset({});
          toast.success("Account created");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );

    console.log(datal);
    console.log(error);
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1>Sign up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signUp)} className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
