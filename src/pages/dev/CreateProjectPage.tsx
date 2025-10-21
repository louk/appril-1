import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { api } from "@/lib/api-client";
import { App } from "@shared/types";
const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters."),
  bundleId: z.string().regex(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i, "Invalid bundle ID format.").optional().or(z.literal('')),
  category: z.string().min(1, "Please select a category."),
  appStoreUrl: z.string().url().optional().or(z.literal('')),
  playStoreUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().max(500, "Description must be 500 characters or less.").optional(),
});
type ProjectFormValues = z.infer<typeof projectSchema>;
const categories = ["Photo & Video", "Finance", "Developer Tools", "Music", "Health & Fitness", "Productivity", "Travel", "Lifestyle", "AI", "Web3"];
export function CreateProjectPage() {
  const navigate = useNavigate();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      bundleId: "",
      category: "",
      appStoreUrl: "",
      playStoreUrl: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<ProjectFormValues> = async (values) => {
    const payload: Partial<App> = {
      name: values.name,
      category: values.category,
      description: values.description,
      // This would be the logged-in developer's ID in a real app
      developerId: "dev-1", 
      storeLinks: {
        ios: values.appStoreUrl,
        android: values.playStoreUrl,
      },
    };
    try {
      await api('/api/apps', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success("Project created successfully!");
      navigate("/dev/projects");
    } catch (error) {
      toast.error("Failed to create project.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link to="/dev/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>Provide the details for your new application project.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pixel Alchemy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bundleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bundle ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="com.company.appname" {...field} />
                      </FormControl>
                      <FormDescription>Your iOS or Android bundle identifier.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="appStoreUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Store URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://apps.apple.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="playStoreUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Play Store URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://play.google.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief description of your app." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Logo / Icon</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or GIF (max. 800x800px)</p>
                      </div>
                      <Input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </FormControl>
              </FormItem>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate("/dev/projects")}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}