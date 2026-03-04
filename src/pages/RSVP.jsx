import React, { useState } from "react";
import HomeButton from "@/components/wedding/HomeButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Check } from "lucide-react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    attending: "",
    guest_count: 1,
    dietary_restrictions: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getPersonalizedMessage = () => {
    const name = formData.full_name.trim().toLowerCase();
    if (name === "diya israni" && formData.attending === "yes") {
      return "I can't wait to munch with you!";
    }
    if (name === "ryan ashe") {
      return "wanna wear our matching mauve nike sneakers?";
    }
    return "We've received your RSVP. We can't wait to celebrate with you!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real static site, you could:
    // - Use a form service like Formspree, Netlify Forms, or EmailJS
    // - Or just show the success message (current behavior)
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#2c2c2c] flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Thank You!
          </h2>
          <p
            className="text-[#2c2c2c] opacity-60 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            {getPersonalizedMessage()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <HomeButton />
      {/* Hero */}
      <div className="text-center px-6 py-16 md:py-20">
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          We'd Love to See You
        </p>
        <h1
          className="text-5xl md:text-7xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          RSVP
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-6 pb-28">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label
              className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Full Name *
            </Label>
            <Input
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0"
              style={{ fontFamily: "var(--font-sans)" }}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Phone Number *
            </Label>
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0"
              style={{ fontFamily: "var(--font-sans)" }}
              placeholder="Your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Email
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0"
              style={{ fontFamily: "var(--font-sans)" }}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Will you be attending? *
            </Label>
            <Select
              required
              value={formData.attending}
              onValueChange={(value) => setFormData({ ...formData, attending: value })}
            >
              <SelectTrigger className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0">
                <SelectValue placeholder="Select your response" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Joyfully Accepts</SelectItem>
                <SelectItem value="no">Regretfully Declines</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.attending === "yes" && (
            <>
              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Number of Guests
                </Label>
                <Select
                  value={String(formData.guest_count)}
                  onValueChange={(value) => setFormData({ ...formData, guest_count: Number(value) })}
                >
                  <SelectTrigger className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Dietary Restrictions
                </Label>
                <Input
                  value={formData.dietary_restrictions}
                  onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
                  className="border-[#e8e6e3] rounded-none py-6 focus:border-[#c9a96e] focus:ring-0"
                  style={{ fontFamily: "var(--font-sans)" }}
                  placeholder="Any allergies or dietary needs"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label
              className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Message for the Couple
            </Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-[#e8e6e3] rounded-none focus:border-[#c9a96e] focus:ring-0 min-h-[120px]"
              style={{ fontFamily: "var(--font-sans)" }}
              placeholder="Share your love and well wishes..."
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !formData.full_name || !formData.attending || !formData.phone}
            className="w-full py-6 bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white text-xs tracking-[0.25em] uppercase rounded-none transition-all duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {submitting ? "Sending..." : "Send RSVP"}
          </Button>

          <div className="text-center pt-4">
            <Heart className="w-4 h-4 text-[#c9a96e] mx-auto" />
          </div>
        </form>
      </div>
    </div>
  );
}