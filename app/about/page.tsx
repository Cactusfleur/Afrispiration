import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Palette, Award, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: "Cultural Pride",
            description: "Celebrating the rich heritage and diverse traditions that shape African design excellence.",
        },
        {
            icon: Users,
            title: "Community First",
            description: "Building bridges between designers across Africa and the diaspora to foster collaboration.",
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Amplifying African voices and creativity on the world stage through meaningful connections.",
        },
        {
            icon: Palette,
            title: "Creative Excellence",
            description: "Showcasing the highest standards of design innovation and artistic expression.",
        },
    ]

    const stats = [
        { number: "500+", label: "Talented Designers" },
        { number: "50+", label: "Countries Represented" },
        { number: "100+", label: "Creative Events" },
        { number: "10K+", label: "Community Members" },
    ]

    const team = [
        {
            name: "Amara Okafor",
            role: "Founder & Creative Director",
            location: "Lagos, Nigeria",
            bio: "Passionate about connecting African designers globally and celebrating our creative heritage.",
        },
        {
            name: "Kwame Asante",
            role: "Community Manager",
            location: "Accra, Ghana",
            bio: "Building bridges between designers and fostering meaningful collaborations across the continent.",
        },
        {
            name: "Zara Mbeki",
            role: "Events Coordinator",
            location: "Cape Town, South Africa",
            bio: "Curating inspiring events that showcase African design talent and cultural innovation.",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-secondary to-muted">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="mb-6">
                            About Afrispiration
                        </Badge>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
                            Celebrating African Design Excellence
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-8">
                            We are a vibrant community platform dedicated to showcasing the incredible talent, creativity, and
                            cultural richness of African designers across the continent and diaspora.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/submit">
                                <Button size="lg">
                                    <Users className="mr-2 h-5 w-5" />
                                    Join Our Community
                                </Button>
                            </Link>
                            <Link href="/designers">
                                <Button variant="outline" size="lg">
                                    <Palette className="mr-2 h-5 w-5" />
                                    Explore Designers
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Target className="h-6 w-6 text-primary" />
                                <Badge variant="outline">Our Mission</Badge>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">
                                Empowering African Creativity Worldwide
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Afrispiration was born from a vision to create a unified platform where African designers can showcase
                                their work, connect with peers, and access opportunities that celebrate their unique perspectives and
                                cultural heritage.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We believe that African design has the power to inspire global conversations about creativity,
                                innovation, and cultural expression. Our platform serves as a bridge connecting talent across borders
                                and generations.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                                    <h3 className="font-serif text-2xl font-bold mb-2">Excellence</h3>
                                    <p className="text-muted-foreground">Celebrating the highest standards of African design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">
                            Our Values
                        </Badge>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">What Drives Us Forward</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Our core values shape everything we do, from how we build our community to how we celebrate African design
                            excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">
                            Our Impact
                        </Badge>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">Growing Together</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-muted-foreground font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Team Section */}
            {/* <section className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">
                            Our Team
                        </Badge>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">
                            Meet the People Behind Afrispiration
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Passionate individuals dedicated to celebrating and elevating African design talent worldwide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-center mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium text-center mb-2">{member.role}</p>
                                    <p className="text-sm text-muted-foreground text-center mb-4 flex items-center justify-center gap-1">
                                        <Globe className="h-4 w-4" />
                                        {member.location}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed text-center">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Join Our Community?</h2>
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
                        Whether you're a designer looking to showcase your work or someone passionate about African creativity,
                        there's a place for you in our growing community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/submit">
                            <Button size="lg" variant="secondary">
                                <Users className="mr-2 h-5 w-5" />
                                Join as Designer
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
