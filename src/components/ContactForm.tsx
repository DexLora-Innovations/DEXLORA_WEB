import { useState } from "react";
import { Send, User, Mail, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactForm = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Use Web3Forms Access Key from environment variable
    // Or use Formspree as fallback (already configured in .env.example)
    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
    const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "xeeqykkp";

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = "Subject must be at least 3 characters";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please fix the errors in the form.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Use Web3Forms - it's free and works without API key for basic forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
                    name: formData.name,
                    email: formData.email,
                    subject: `[DexLora Contact] ${formData.subject}`,
                    message: formData.message,
                    from_name: "DexLora Innovations Website",
                    to: "dexlora.innovations@gmail.com",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                toast({
                    title: "Message Sent Successfully! 🎉",
                    description: "Thank you for reaching out! We'll get back to you soon.",
                });
                // Reset form
                setFormData({ name: "", email: "", subject: "", message: "" });
                // Reset success state after 3 seconds
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast({
                title: "Failed to Send Message",
                description: "Something went wrong. Please try again or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Send Us a Mail</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Get In <span className="gradient-text">Touch</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                            Have a project idea or want to collaborate? Fill out the form below and we'll get back to you instantly!
                        </p>
                    </div>

                    {/* Contact Form Card */}
                    <div className="glass-card p-8 md:p-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Your Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className={`
                      w-full px-4 py-3 rounded-xl
                      bg-background/50 border
                      ${errors.name ? "border-red-500" : "border-border/50"}
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      outline-none transition-all duration-300
                      placeholder:text-muted-foreground/50
                    `}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className={`
                      w-full px-4 py-3 rounded-xl
                      bg-background/50 border
                      ${errors.email ? "border-red-500" : "border-border/50"}
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      outline-none transition-all duration-300
                      placeholder:text-muted-foreground/50
                    `}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Subject
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Project Discussion / Collaboration / General Inquiry"
                                        className={`
                      w-full px-4 py-3 rounded-xl
                      bg-background/50 border
                      ${errors.subject ? "border-red-500" : "border-border/50"}
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      outline-none transition-all duration-300
                      placeholder:text-muted-foreground/50
                    `}
                                    />
                                    {errors.subject && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Your Message
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about your project, requirements, or any questions you have..."
                                        rows={5}
                                        className={`
                      w-full px-4 py-3 rounded-xl resize-none
                      bg-background/50 border
                      ${errors.message ? "border-red-500" : "border-border/50"}
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      outline-none transition-all duration-300
                      placeholder:text-muted-foreground/50
                    `}
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-lg
                  flex items-center justify-center gap-3
                  transition-all duration-300 transform
                  ${isSuccess
                                        ? "bg-green-500 text-white"
                                        : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25"
                                    }
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending Message...
                                    </>
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Message Sent Successfully!
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Privacy Note */}
                            <p className="text-xs text-muted-foreground text-center mt-4">
                                By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
