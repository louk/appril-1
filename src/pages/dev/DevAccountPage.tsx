import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingSettings } from "@/components/page/dev/account/BillingSettings";
import { OrganizationProfile } from "@/components/page/dev/account/OrganizationProfile";
import { Invoices } from "@/components/page/dev/account/Invoices";
export function DevAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your organization, billing, and view invoices.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <OrganizationProfile />
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <BillingSettings />
        </TabsContent>
        <TabsContent value="invoices" className="mt-6">
          <Invoices />
        </TabsContent>
      </Tabs>
    </div>
  );
}