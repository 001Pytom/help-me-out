"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "@/lib/utils/auth-helpers";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = mode === "login" ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { email: "", password: "", confirmPassword: "", name: "" },
  });

  const onSubmit = async (
    data: z.infer<typeof loginSchema | typeof signupSchema>
  ) => {
    setLoading(true);
    try {
      if (mode === "login") {
        await login(data.email, data.password);
        router.push("/"); // redirect to main app
        // console.log(data);
      } else {
        const signupData = data as z.infer<typeof signupSchema>;
        await signup(signupData.email, signupData.password, signupData.name);
        router.push("/auth/verify-email"); // show verify email screen
      }
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Something went wrong");
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-work-sans font-medium text-sm text-black"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
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
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === "signup" && (
          <>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* // Display name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-primary rounded-lg py-4 text-white font-medium text-lg"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : mode === "login" ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </Button>

        {/* forgot password */}
        <Link
          href="/auth/forgot-password"
          className="flex justify-end text-sm text-blue-600 italics hover:text-blue-800 "
        >
          Forgot password?
        </Link>
        {/* forgot password */}

        <p className="text-end font-medium text-sm text-black italic">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="underline italic text-blue-600 hover:text-blue-800 "
            onClick={() => {
              const newMode = mode === "login" ? "signup" : "login";
              setMode(newMode);

              form.reset(
                newMode === "login"
                  ? { email: "", password: "" }
                  : { email: "", password: "", confirmPassword: "", name: "" }
              );
            }}
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
