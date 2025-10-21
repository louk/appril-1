import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogSection } from "@/components/page/company/BlogSection";
import { TeamSection } from "@/components/page/company/TeamSection";
import { JobsSection } from "@/components/page/company/JobsSection";
const pageContent: Record<string, { title: string; component: React.ReactNode }> = {
  blog: {
    title: "Blog",
    component: <BlogSection />,
  },
  jobs: {
    title: "Careers",
    component: <JobsSection />,
  },
  team: {
    title: "Our Team",
    component: <TeamSection />,
  },
  audits: {
    title: "Security Audits",
    component: (
      <Card>
        <CardHeader><CardTitle className="text-4xl font-display">Security Audits</CardTitle></CardHeader>
        <CardContent><p>Our security audit reports and badges will be displayed here.</p></CardContent>
      </Card>
    ),
  },
  contact: {
    title: "Contact Us",
    component: (
      <Card>
        <CardHeader><CardTitle className="text-4xl font-display">Contact Us</CardTitle></CardHeader>
        <CardContent><p>Get in touch with us through our contact form or social media.</p></CardContent>
      </Card>
    ),
  },
  affiliates: {
    title: "Affiliate Program",
    component: (
      <Card>
        <CardHeader><CardTitle className="text-4xl font-display">Affiliate Program</CardTitle></CardHeader>
        <CardContent><p>Information about our affiliate program will be available here.</p></CardContent>
      </Card>
    ),
  },
  terms: {
    title: "Terms of Service",
    component: (
      <Card>
        <CardHeader><CardTitle className="text-4xl font-display">Terms of Service</CardTitle></CardHeader>
        <CardContent><p>Our terms of service document.</p></CardContent>
      </Card>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    component: (
      <Card>
        <CardHeader><CardTitle className="text-4xl font-display">Privacy Policy</CardTitle></CardHeader>
        <CardContent><p>Our privacy policy document.</p></CardContent>
      </Card>
    ),
  },
};
export function CompanyPage() {
  const { page } = useParams();
  const content = page ? pageContent[page] : null;
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {content ? (
          content.component
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold">Page Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The page you are looking for does not exist.
            </p>
            <Link to="/" className="mt-6 inline-block text-primary hover:underline">
              Go back to Home
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}