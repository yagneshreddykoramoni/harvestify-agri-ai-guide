
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}

const FeatureCard = ({ title, description, icon, linkTo }: FeatureCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg hover:border-accent">
      <CardHeader>
        <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full mb-2 text-white">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[80px]">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={linkTo}>Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
