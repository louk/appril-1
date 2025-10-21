import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/api-client";
import { User } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  email: z.string().email("Please enter a valid email.").optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;
export function Profile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api<User>('/api/users/me');
        form.reset({
          name: user.profile.name,
          email: user.email,
        });
      } catch (error) {
        toast.error("Failed to fetch profile data.");
      }
    };
    fetchUser();
  }, [form]);
  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    try {
      await api('/api/users/me', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };
  const { name, email } = form.watch();
  const avatarUrl = `https://i.pravatar.cc/150?u=${email || 'default'}`;
  if (form.formState.isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">Change Avatar</Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}