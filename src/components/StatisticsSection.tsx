
import { Users, FileImage, Award, Clock } from "lucide-react";

export const StatisticsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/50 to-background relative overflow-hidden">
      {/* Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Growing Creative Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and alumni sharing their work
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-8 rounded-2xl text-center card-hover">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
              <Users className="text-primary w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2 text-gradient">2,500+</div>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center card-hover">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
              <FileImage className="text-primary w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2 text-gradient">4,200+</div>
            <p className="text-muted-foreground">Projects Shared</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center card-hover">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
              <Award className="text-primary w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2 text-gradient">120+</div>
            <p className="text-muted-foreground">Featured Projects</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center card-hover">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
              <Clock className="text-primary w-8 h-8" />
            </div>
            <div className="text-4xl font-bold mb-2 text-gradient">5 Years</div>
            <p className="text-muted-foreground">Supporting Creativity</p>
          </div>
        </div>
      </div>
    </section>
  );
};
