import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const mockBlogPosts = [
  {
    id: 1,
    title: "Announcing Appril: The Future of App Memberships",
    excerpt: "We're excited to launch a new platform that empowers both users and developers by bringing true ownership to in-app purchases.",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800",
    tags: ["Product", "Launch"],
  },
  {
    id: 2,
    title: "Why Web3 is the Key to a Fairer App Economy",
    excerpt: "Discover how NFT-based subscriptions can create new revenue streams for developers and provide more value for users.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800",
    tags: ["Dev", "Community"],
  },
  {
    id: 3,
    title: "Our Q3 2024 Product Roadmap",
    excerpt: "A look at the exciting new features coming to Appril, including multi-chain support and enhanced developer analytics.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
    tags: ["Updates"],
  },
];
export function BlogSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold">From the Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Our latest news, updates, and stories from the Appril team.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map((post) => (
          <Link to="#" key={post.id} className="block group">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="mt-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-primary font-medium">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}