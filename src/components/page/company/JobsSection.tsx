import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const mockJobs = [
  { id: 1, title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time" },
  { id: 2, title: "Smart Contract Engineer", department: "Engineering", location: "Remote (EU)", type: "Full-time" },
  { id: 3, title: "Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { id: 4, title: "Developer Advocate", department: "Marketing", location: "Remote (US)", type: "Contract" },
];
export function JobsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold">Join Our Team</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          We're looking for talented people to help us build the future.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {mockJobs.map((job) => (
          <Card key={job.id} className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="mt-1">{job.department}</CardDescription>
              </div>
              <Button asChild>
                <a href="#">Apply Now</a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline">{job.location}</Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}