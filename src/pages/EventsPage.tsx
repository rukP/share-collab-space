
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock events data
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Summer Exhibition Opening",
    description: "The annual showcase of student work from across all RCA departments",
    location: "Kensington Campus",
    date: "2023-07-15",
    time: "18:00 - 21:00",
    attendees: 120,
    category: "Exhibition"
  },
  {
    id: 2,
    title: "Digital Design Workshop",
    description: "Learn advanced techniques in digital prototyping and interaction design",
    location: "Virtual Event",
    date: "2023-06-22",
    time: "14:00 - 16:00",
    attendees: 45,
    category: "Workshop"
  },
  {
    id: 3,
    title: "Industry Meet & Greet",
    description: "Connect with industry professionals and potential employers",
    location: "Battersea Campus",
    date: "2023-07-08",
    time: "16:00 - 19:00",
    attendees: 85,
    category: "Networking"
  },
  {
    id: 4,
    title: "Fine Art Open Studios",
    description: "Tour the studios of MA Fine Art students and see works in progress",
    location: "Battersea Campus",
    date: "2023-06-30",
    time: "11:00 - 16:00",
    attendees: 60,
    category: "Open Studios"
  }
];

const getCategoryColor = (category: string) => {
  switch(category) {
    case "Exhibition": return "bg-accent text-white";
    case "Workshop": return "bg-primary text-white";
    case "Networking": return "bg-emerald-500 text-white";
    case "Open Studios": return "bg-amber-500 text-white";
    default: return "bg-secondary text-white";
  }
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gradient">Upcoming Events</h2>
          <Button className="rounded-full">
            <CalendarClock className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <Card key={event.id} className="overflow-hidden card-hover border border-white/10">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <CalendarClock className="w-4 h-4 mr-1" />
                  {event.date} | {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />
                  {event.attendees} attending
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 bg-card/50 pt-3">
                <Button className="w-full rounded-full">
                  Register <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
