import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our logo maker",
    features: ["Basic logo customization", "Limited icon selection", "Standard export quality", "Basic color options"],
  },
  {
    name: "Pro",
    price: "$19",
    description: "Unlock all features and create unlimited logos",
    features: [
      "Advanced logo customization",
      "Premium icon library",
      "High-resolution exports",
      "Multiple file formats",
      "Remove background",
      "Custom color palettes",
      "Priority support",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">Choose the perfect plan for your needs</p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold">{plan.price}</div>
              {plan.name === "Pro" && <div className="text-sm text-muted-foreground">per month</div>}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{plan.name === "Free" ? "Get Started" : "Upgrade to Pro"}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

