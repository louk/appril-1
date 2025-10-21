import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";
import { Product, App } from "@shared/types";
import { useEffect, useState } from "react";
const productSchema = z.object({
  projectId: z.string().min(1, "Please select a project."),
  name: z.string().min(2, "Product name must be at least 2 characters."),
  duration: z.string().min(1, "Please select a duration."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  isUnlimited: z.boolean().default(true),
  supply: z.coerce.number().min(1, "Supply must be at least 1.").optional(),
  benefits: z.array(z.object({ value: z.string().min(1, "Benefit cannot be empty.") })).min(1, "At least one benefit is required."),
}).refine(data => data.isUnlimited || (data.supply !== undefined && data.supply > 0), {
  message: "Supply must be provided if not unlimited.",
  path: ["supply"],
});
type ProductFormValues = z.infer<typeof productSchema>;
const durationMap: Record<string, number> = {
  "30d": 30,
  "90d": 90,
  "1y": 365,
  "lifetime": -1,
};
export function CreateProductPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<App[]>([]);
  useEffect(() => {
    api<{ items: App[] }>('/api/apps')
      .then(data => setProjects(data.items))
      .catch(() => toast.error("Failed to load projects."));
  }, []);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      projectId: "",
      name: "",
      duration: "",
      price: undefined,
      isUnlimited: true,
      supply: undefined,
      benefits: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits",
  });
  const isUnlimited = form.watch("isUnlimited");
  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    const payload: Partial<Product> = {
      appId: values.projectId,
      name: values.name,
      durationDays: durationMap[values.duration],
      price: {
        amount: values.price,
        currency: "USD",
      },
      supply: {
        cap: values.isUnlimited ? null : values.supply || 0,
        remaining: values.isUnlimited ? null : values.supply || 0,
      },
      benefits: values.benefits.map(b => b.value),
    };
    try {
      await api('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success("Product created successfully!");
      navigate("/dev/products");
    } catch (error) {
      toast.error("Failed to create product.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link to="/dev/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Product</CardTitle>
              <CardDescription>Define a new membership or subscription for one of your projects.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pro Monthly" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30d">30 Days</SelectItem>
                          <SelectItem value="90d">90 Days</SelectItem>
                          <SelectItem value="1y">1 Year</SelectItem>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="9.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="isUnlimited"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Unlimited Supply</FormLabel>
                          <FormDescription>This product can be sold infinitely.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {!isUnlimited && (
                    <FormField
                      control={form.control}
                      name="supply"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supply Cap</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <div>
                <FormLabel>Benefits</FormLabel>
                <FormDescription className="mb-2">List the perks users get with this product.</FormDescription>
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`benefits.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2 mb-2">
                            <Input {...field} placeholder={`Benefit #${index + 1}`} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Benefit
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate("/dev/products")}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}