import { Helmet } from "react-helmet-async";
import { memo, useMemo, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Galaxy from "@/components/Galaxy";

// Project images
import projectGeopulse from "@/assets/project-geopulse.jpg";
import projectWalleRobot from "@/assets/project-walle-robot.png";
import projectRestaurant from "@/assets/project-restaurant.jpg";
const projectPortfolio = "/portfolio-platform.png";

const projectsData = [
    {
        title: "GeoPulse",
        subtitle: "Smart Mapping & Heritage Navigation",
        description: "A modern mapping platform similar to Google Maps, enhanced with heritage-aware search. GeoPulse allows users to find cities using both current and historic names, supports multiple languages, and delivers a highly interactive interface for a superior navigation experience.",
        features: [
            "Search cities using old and current names",
            "Multi-language support for global and regional users",
            "Unique and interactive UI beyond traditional maps",
            "Fast and intelligent search results",
        ],
        image: projectGeopulse,
    },
    {
        title: "Autonomous Wall-E Inspired Robot",
        subtitle: "Self-Driving Intelligent Robot",
        description: "An autonomous mobile robot designed to move, think, and react independently without remote control. Built using ESP32, it leverages sensors and smart algorithms to detect obstacles, make decisions, and navigate autonomously while showcasing expressive OLED animations inspired by Wall-E.",
        features: [
            "Fully autonomous navigation",
            "ESP32 microcontroller as the main processing unit",
            "OLED display with animated expressive eyes",
            "Front steering with rear-wheel drive",
            "Ultrasonic sensor + servo scanning for obstacle detection",
            "Live tracking and control via Blynk app",
        ],
        image: projectWalleRobot,
    },
    {
        title: "Restaurant Website",
        subtitle: "Responsive Restaurant Landing Page",
        description: "A fully designed and coded-from-scratch restaurant website built using pure HTML and CSS. The project features a clean modern UI, structured layout, and interactive elements, created as part of an early full-stack learning journey.",
        features: [
            "Restaurant landing page with structured layout",
            "Menu sections with images and descriptions",
            "Styled buttons with hover effects",
            "Footer contact form",
            "Custom theme colors and Google Fonts",
        ],
        image: projectRestaurant,
    },
    {
        title: "AI-Based Portfolio Creation Platform",
        subtitle: "Intelligent Portfolio Builder",
        description: "An intelligent portfolio creation platform where users simply enter a prompt, and the system automatically generates a complete professional portfolio website. Users can customize sections and publish instantly on the same platform without any coding knowledge.",
        features: [
            "Prompt-based portfolio generation",
            "One-click publishing",
            "Auto-generated content and sections",
            "Multiple professional templates",
            "Responsive and mobile-friendly design",
            "No coding required",
        ],
        image: projectPortfolio,
    },
];

const ProjectCard = memo(({ project, index }: { project: typeof projectsData[0]; index: number }) => {
    return (
        <div
            className="glass-card rounded-2xl border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group overflow-hidden animate-fade-up"
            style={{
                animationDelay: `${index * 100}ms`,
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
            }}
        >
            {/* Project Image with Category Badge */}
            <div className="relative w-full h-48 md:h-56 overflow-hidden" style={{ contain: 'strict' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/80 text-primary-foreground rounded-full backdrop-blur-sm">
                        {project.subtitle}
                    </span>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                    {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {project.description}
                </p>
                <div>
                    <h4 className="text-sm font-semibold text-primary mb-3">Key Features</h4>
                    <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-start gap-3 text-muted-foreground text-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
    const [galaxyActive, setGalaxyActive] = useState(false);
    const galaxyContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setGalaxyActive(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (galaxyContainerRef.current) {
            observer.observe(galaxyContainerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Helmet>
                <title>Projects | DexLora Innovations</title>
                <meta
                    name="description"
                    content="Explore the innovative projects built by DexLora Innovations - from smart mapping platforms to autonomous robots and responsive websites."
                />
            </Helmet>

            <Navbar />

            <main className="min-h-screen bg-background pt-16 relative overflow-x-hidden">
                {/* Hero Section */}
                <section className="section-padding py-20 md:py-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                            <div className="animate-fade-up" style={{ willChange: 'transform, opacity' }}>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                                    OUR
                                    <br />
                                    <span className="gradient-text">PROJECTS</span>
                                </h1>
                                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
                            </div>

                            <div className="animate-fade-up-delay-1" style={{ willChange: 'transform, opacity' }}>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    Discover our portfolio of innovative solutions spanning mapping platforms,
                                    autonomous robotics, and web development. Each project showcases our commitment
                                    to creativity, technical excellence, and delivering impactful digital experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="section-padding py-16 md:py-24 relative" ref={galaxyContainerRef}>
                    {/* Galaxy Animation - Behind Project Cards */}
                    <div
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            zIndex: 0, contain: 'strict', transform: 'translateZ(0)'
                        }}
                    >
                        {galaxyActive && (
                            <Galaxy
                                mouseRepulsion={false}
                                mouseInteraction={false}
                                density={0.8}
                                glowIntensity={0.3}
                                saturation={0.6}
                                hueShift={240}
                                speed={0.5}
                            />
                        )}
                    </div>

                    <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1, contain: 'layout' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projectsData.map((project, index) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Projects;
