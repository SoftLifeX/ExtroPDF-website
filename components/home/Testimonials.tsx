import { Card } from "../ui/card";

const Testimonials = () => {
  const userTestimonials = [
    {
      id: 1,
      name: "Faith Chidera",
      position: "Senior Software Engineer",
      message:
        "As a senior developer, I appreciate the platform's scalability and robust performance. It simplifies complex workflows and helps us deliver faster.",
    },
    {
      id: 2,
      name: "Desire Kunle",
      position: "HR Executive",
      message:
        "The platform has been a game-changer in managing recruitment and employee engagement. It's intuitive and saves me hours every day.",
    },
    {
      id: 3,
      name: "King Tochi",
      position: "Software Engineer",
      message:
        "From clean UI to strong backend integrations, this tool supports our engineering efforts brilliantly. It enhances both productivity and collaboration.",
    },
    {
      id: 4,
      name: "Omkar Torne",
      position: "Digital Marketing Executive",
      message:
        "The analytics and campaign management features are top-notch. It's made tracking performance and optimizing campaigns easier than ever.",
    },
    {
      id: 5,
      name: "Martin J. James",
      position: "Graphic Designer",
      message:
        "Designing has never been smoother. The platform's speed and precision tools let me focus on creativity without getting bogged down.",
    },
    {
      id: 6,
      name: "Vanica Sharmon",
      position: "Software Engineer",
      message:
        "It's reliable, efficient, and easy to navigate. This tool streamlines system operations and cuts down the manual workload significantly.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
        What Our Users Say
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userTestimonials.map(({ id, name, position, message }) => (
          <Card key={id} className="p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div>
                <h4 className="font-medium">{name}</h4>
                <p className="text-sm text-muted-foreground">{position}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              "{message}"
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
