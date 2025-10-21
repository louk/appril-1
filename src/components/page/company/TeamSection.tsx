import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";
const mockTeam = [
  { id: 1, name: "Alice Johnson", role: "Co-Founder & CEO", imageUrl: "https://i.pravatar.cc/250?u=alice" },
  { id: 2, name: "Bob Williams", role: "Co-Founder & CTO", imageUrl: "https://i.pravatar.cc/250?u=bob" },
  { id: 3, name: "Charlie Brown", role: "Lead Protocol Engineer", imageUrl: "https://i.pravatar.cc/250?u=charlie" },
  { id: 4, name: "Diana Miller", role: "Head of Product", imageUrl: "https://i.pravatar.cc/250?u=diana" },
];
export function TeamSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold">Meet the Team</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          The passionate individuals building the future of app ownership.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockTeam.map((member) => (
          <Card key={member.id} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="items-center">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}