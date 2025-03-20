import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; //TabsContent
import { Badge } from "@/components/ui/badge";
import { Heart, Share, Eye, Search, Filter } from "lucide-react";

// Sample gallery data
const galleryItems = [
  {
    id: 1,
    title: "Modern Living Room",
    description:
      "A minimalist living room with clean lines and neutral colors.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 124,
    views: 1240,
    tags: ["Modern", "Living Room", "Minimalist"],
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "Cozy Bedroom Retreat",
    description:
      "A warm and inviting bedroom with soft textures and warm lighting.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 98,
    views: 876,
    tags: ["Bedroom", "Cozy", "Warm"],
    author: "John Smith",
  },
  {
    id: 3,
    title: "Scandinavian Kitchen",
    description:
      "A bright and airy kitchen with wooden accents and clean design.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 156,
    views: 1567,
    tags: ["Kitchen", "Scandinavian", "Bright"],
    author: "Emma Johnson",
  },
  {
    id: 4,
    title: "Industrial Office Space",
    description:
      "A productive workspace with industrial elements and modern technology.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 87,
    views: 932,
    tags: ["Office", "Industrial", "Workspace"],
    author: "Michael Brown",
  },
  {
    id: 5,
    title: "Bohemian Dining Room",
    description:
      "An eclectic dining space with vibrant colors and mixed patterns.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 112,
    views: 1089,
    tags: ["Dining Room", "Bohemian", "Colorful"],
    author: "Sophia Garcia",
  },
  {
    id: 6,
    title: "Minimalist Bathroom",
    description: "A clean and serene bathroom with spa-like features.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 76,
    views: 845,
    tags: ["Bathroom", "Minimalist", "Spa"],
    author: "David Wilson",
  },
];

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = galleryItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Design Gallery</h1>
          <p className="text-muted-foreground">
            Explore designs created by our community for inspiration
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full gap-2 md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search designs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Designs</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{item.title}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="mb-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 pt-3">
              <div className="flex w-full items-center justify-between text-sm">
                <span className="text-muted-foreground">By {item.author}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.likes}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
