"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(context) {
          console.log(context);
          toast.success("Succesfuly logged in");
          router.push("/dashboard");
        },
        onError(error) {
          console.log(error);
          toast.error("Something went wrong");
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full p-2">
          <div>
            {/* <img src="/" alt="asdads" /> */}
            <span>Untiitled UI</span>
          </div>

          <div>
            <h1>Log in</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
              <div className="flex items-center justify-between">
                <div className="items-center flex gap-1">
                  <Checkbox />
                  <Label>Remember for 30 days</Label>
                </div>

                <Link href={"#"}>Forgot password</Link>
              </div>

              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>
          </Form>

          <span className="">
            Don&apos;t have an account? <Link href={"/signup"}>Sign up</Link>
          </span>
        </div>
      </div>

      <div className="flex-1 hidden lg:block"></div>
    </div>
  );
}
