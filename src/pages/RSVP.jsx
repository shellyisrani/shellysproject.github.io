import React, { useState } from "react";
import HomeButton from "@/components/wedding/HomeButton";
import { supabase } from "@/lib/supabaseClient";

export default function RSVP() {
  const [step, setStep] = useState("lookup"); // lookup | form | done
  const [searchName, setSearchName] = useState("");
  const [guestRecord, setGuestRecord] = useState(null);
  const [partyGuests, setPartyGuests] = useState([]);
  const [lookupError, setLookupError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReturningGuest, setIsReturningGuest] = useState(false);
  const [updateMode, setUpdateMode] = useState(null); // rsvp | details

  const [attending, setAttending] = useState(null);
  const [declineScope, setDeclineScope] = useState("self"); // self | additional
  const [declineSelectedIds, setDeclineSelectedIds] = useState([]); // ids of additional members to decline
  const [phone, setPhone] = useState("");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [wantsPlusOne, setWantsPlusOne] = useState(null);
  const [plusOneName, setPlusOneName] = useState("");
  const [plusOneDietary, setPlusOneDietary] = useState("");
  const [partyRsvps, setPartyRsvps] = useState([]);
  const [partyDetails, setPartyDetails] = useState([]);
  const [plusOneError, setPlusOneError] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();
    setLookupError("");
    setLoading(true);
    try {
      const { data: matches, error } = await supabase
        .from("guests")
        .select("id, full_name, party_id, has_plus_one, phone, attending, dietary_restrictions, message")
        .ilike("full_name", `%${searchName.trim()}%`)
        .limit(10);
      if (error) throw error;

      if (matches && matches.length > 0) {
        // Pick the best match (first for now)
        const guest = matches[0];
        setGuestRecord(guest);

        // Load entire party
        const { data: members, error: partyErr } = await supabase
          .from("guests")
          .select("id, full_name, phone, attending, dietary_restrictions, submitted_at")
          .eq("party_id", guest.party_id)
          .order("full_name");
        if (partyErr) throw partyErr;

        setPartyGuests(members || []);
        const initial = (members || []).map((m) => {
          const isSelf = m.id === guest.id;
          return {
          id: m.id,
          name: m.full_name,
          response:
            m.attending === true ? "yes" : m.attending === false ? "no" : isSelf ? "yes" : "unsure",
          dietary_restrictions: m.dietary_restrictions || "",
          };
        });
        setPartyRsvps(initial);
        setPartyDetails(
          (members || []).map((m) => ({
            id: m.id,
            name: m.full_name,
            phone: m.phone || "",
            dietary_restrictions: m.dietary_restrictions || "",
          }))
        );
        setIsReturningGuest(
          (members || []).some((m) => m.submitted_at) || guest.attending !== null || Boolean(guest.phone)
        );
        // Do not auto-select a mode for returning guests; they must choose
        setPhone(guest.phone || "");
        setStep("form");
      } else {
        setLookupError("We couldn't find your name on the guest list. Please check the spelling or contact us.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate plus one name if selected
      if (attending === true && guestRecord?.has_plus_one && wantsPlusOne === true && !plusOneName.trim()) {
        setPlusOneError("Please provide your plus one’s name.");
        setLoading(false);
        return;
      }
      setPlusOneError("");
      // Update phone and main guest message/dietary on the selected guest
      const plusOneNote =
        guestRecord?.has_plus_one
          ? wantsPlusOne
            ? `\nPlus One: ${plusOneName || "Name not provided"}${plusOneDietary ? ` (Dietary: ${plusOneDietary})` : ""}`
            : "\nPlus One: Declined"
          : "";
      const mainGuestPayload = {
        phone: phone || null,
        dietary_restrictions: dietary || null,
        message: `${message || ""}${plusOneNote}`.trim() || null,
        attending: attending === null ? null : attending,
        submitted_at: new Date().toISOString(),
      };
      await supabase.from("guests").update(mainGuestPayload).eq("id", guestRecord.id);

      // Returning guest editing contact/dietary only
      if (isReturningGuest && updateMode === "details") {
        await Promise.all(
          partyDetails.map((m) =>
            supabase
              .from("guests")
              .update({
                phone: m.phone || null,
                dietary_restrictions: m.dietary_restrictions || null,
                submitted_at: new Date().toISOString(),
              })
              .eq("id", m.id)
          )
        );
        setStep("done");
        return;
      }

      // If attending, update each party member according to selections
      if (attending === true && partyRsvps.length > 0) {
        await Promise.all(
          partyRsvps.map((m) =>
            supabase
              .from("guests")
              .update({
                attending: m.response === "yes" ? true : m.response === "no" ? false : null,
                dietary_restrictions: m.response === "yes" ? (m.dietary_restrictions || null) : null,
                submitted_at: new Date().toISOString(),
              })
              .eq("id", m.id)
          )
        );
      }

      // If declining and user selected additional members, mark only those members (not the whole party)
      if (attending === false && declineScope === "additional" && declineSelectedIds.length > 0) {
        await Promise.all(
          declineSelectedIds.map((memberId) =>
            supabase
              .from("guests")
              .update({
                attending: false,
                dietary_restrictions: null,
                submitted_at: new Date().toISOString(),
              })
              .eq("id", memberId)
          )
        );
      }

      setStep("done");
    } finally {
      setLoading(false);
    }
  };

  const updatePartyMember = (idx, field, value) => {
    setPartyRsvps((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };
  const updatePartyDetail = (idx, field, value) => {
    setPartyDetails((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };

  const hasPartyOptions = partyGuests.length > 1; // only treat as party UI when >1 members
  const showMainDietaryField = attending === true && !hasPartyOptions;

  const getGreeting = (fullName) => {
    const name = (fullName || "").trim().toLowerCase();
    if (name === "rajesh israni") return "Hi Papa!";
    if (name === "priti sehrawat") return "Hi Mama!";
    if (name === "divya israni") return "hiii Divya";
    if (name === "diya israni") return "hi Diyu :)";
    if (name === "nabhanya nebs" || name === "nabhanya neb") return "hey nebs!";
    if (name === "ryan ashe") return "Hey Señor Salmon 🐟";
    if (name === "wendy ashe") return "Hey Wendy aka Wendella 😈";
    if (name === "paul sampson") return "Welcome, Paul Sampson 🐦";
    return `Welcome, ${fullName}`;
  };

  const AcceptanceExtras = () => {
    const name = (guestRecord?.full_name || "").trim().toLowerCase();
    const inPartyEight = partyGuests.some((g) => g.id) && guestRecord?.party_id === 8;
    return (
      <>
        {name === "steve ashe" && (
          <p
            className="text-[#2c2c2c] opacity-80 text-sm leading-relaxed mt-3"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Can&apos;t wait to have you officially officiate the wedding Steve!
          </p>
        )}
        {(name === "andrew hof" || name === "sean hernandez") && (
          <div className="mt-4">
            <img
              src="/images/celebration.gif"
              alt="Celebration"
              className="mx-auto rounded-md"
            />
          </div>
        )}
        {inPartyEight && (
          <p
            className="text-[#2c2c2c] opacity-80 text-sm leading-relaxed mt-3"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Can&apos;t wait to see my favorite kiwi&apos;s!
          </p>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24 pb-20">
      <HomeButton />

      {/* Hero */}
      <div className="text-center px-6 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4" style={{ fontFamily: "var(--font-sans)" }}>
          Kindly Reply
        </p>
        <h1 className="text-5xl md:text-7xl font-light text-[#2c2c2c]" style={{ fontFamily: "var(--font-serif)" }}>
          RSVP
        </h1>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-px bg-[#c9a96e]" />
          <div className="w-20 h-px bg-[#c9a96e]" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6">
        {/* Step 1: Lookup */}
        {step === "lookup" && (
          <form onSubmit={handleLookup} className="flex flex-col gap-6">
            <p
              className="text-center text-[#2c2c2c] opacity-70 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              Please enter your name as it appears on your invitation to find your reservation.
            </p>
            <input
              type="text"
              placeholder="Your full name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              required
              className="w-full border-b border-[#c9a96e] bg-transparent py-3 text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none text-center"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
            />
            {lookupError && (
              <p className="text-red-500 text-xs text-center" style={{ fontFamily: "var(--font-sans)" }}>
                {lookupError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-10 py-3 bg-[#2c2c2c] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] transition-all disabled:opacity-50"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {loading ? "Searching..." : "Find My Invitation"}
            </button>
            {searchName && (
              <button
                type="button"
                onClick={() => {
                  setSearchName("");
                  setLookupError("");
                }}
                className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c] opacity-50 hover:opacity-80 transition-opacity text-center"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Clear
              </button>
            )}
          </form>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setStep("lookup");
                  setAttending(null);
                  setUpdateMode("rsvp");
                }}
                className="text-xs tracking-[0.15em] uppercase text-[#2c2c2c] opacity-50 hover:opacity-80 transition-opacity"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                ← Back
              </button>
            </div>
            <p className="text-center text-[#2c2c2c]" style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem" }}>
              {getGreeting(guestRecord?.full_name)}
            </p>

            {isReturningGuest && (
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4 text-center"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Welcome back! Are you changing your RSVP or something else?
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setUpdateMode("rsvp")}
                    className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                      updateMode === "rsvp"
                        ? "bg-[#2c2c2c] text-white"
                        : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Change RSVP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateMode("details");
                      setAttending(null);
                    }}
                    className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                      updateMode === "details"
                        ? "bg-[#2c2c2c] text-white"
                        : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Something Else
                  </button>
                </div>
              </div>
            )}

            {isReturningGuest && updateMode === "details" && (
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Update Phone or Dietary Info
                </p>
                <div className="space-y-6">
                  {partyDetails.map((member, idx) => (
                    <div key={member.id} className="pb-6 border-b border-[#e8e6e3] last:border-0">
                      <p className="mb-3 text-[#2c2c2c]" style={{ fontFamily: "var(--font-serif)" }}>
                        {member.name}
                      </p>
                      <div className="space-y-4">
                        <Field
                          label="Phone Number"
                          value={member.phone}
                          onChange={(value) => updatePartyDetail(idx, "phone", value)}
                          placeholder="(555) 000-0000"
                        />
                        <Field
                          label="Dietary Restrictions"
                          value={member.dietary_restrictions}
                          onChange={(value) => updatePartyDetail(idx, "dietary_restrictions", value)}
                          placeholder="None"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attending toggle */}
            {(!isReturningGuest || updateMode === "rsvp") && (
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4 text-center"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Will you be attending?
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setAttending(true);
                    setDeclineScope("self");
                  setDeclineSelectedIds([]);
                  }}
                  className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                    attending === true ? "bg-[#2c2c2c] text-white" : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAttending(false);
                    setDeclineScope("self");
                    setDeclineSelectedIds([]);
                  }}
                  className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                    attending === false ? "bg-[#2c2c2c] text-white" : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>
            )}

            {attending === false && partyGuests.length > 1 && (
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4 text-center"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Who are you declining for?
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDeclineScope("self")}
                    className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                      declineScope === "self"
                        ? "bg-[#2c2c2c] text-white"
                        : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Just Me
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeclineScope("additional");
                      // keep existing selections, ensure UI shows self as checked (rendered disabled)
                    }}
                    className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                      declineScope === "additional"
                        ? "bg-[#2c2c2c] text-white"
                        : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Additional Party Members
                  </button>
                </div>
                {declineScope === "additional" && (
                  <div className="mt-4 space-y-3">
                    {/* Always include a self row that is checked and disabled */}
                    <label className="flex items-center gap-3 text-sm text-[#2c2c2c]">
                      <input type="checkbox" checked readOnly disabled />
                      <span style={{ fontFamily: "var(--font-serif)" }}>Myself</span>
                    </label>
                    {partyGuests
                      .filter((m) => m.id !== guestRecord?.id)
                      .map((m) => {
                        const checked = declineSelectedIds.includes(m.id);
                        return (
                          <label key={m.id} className="flex items-center gap-3 text-sm text-[#2c2c2c]">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                setDeclineSelectedIds((prev) =>
                                  e.target.checked ? [...prev, m.id] : prev.filter((id) => id !== m.id)
                                );
                              }}
                            />
                            <span style={{ fontFamily: "var(--font-serif)" }}>{m.full_name}</span>
                          </label>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {attending === true && (!isReturningGuest || updateMode === "rsvp") && (
              <>
                <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="(555) 000-0000" />
                {showMainDietaryField && (
                  <Field label="Dietary Restrictions" value={dietary} onChange={setDietary} placeholder="None" />
                )}

                {guestRecord?.has_plus_one && (
                  <div>
                    <p
                      className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      We&apos;re inviting you to have a plus one! Would you like to bring a guest with you?
                    </p>
                    <div className="flex gap-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setWantsPlusOne(true)}
                        className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                          wantsPlusOne === true
                            ? "bg-[#2c2c2c] text-white"
                            : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                        }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setWantsPlusOne(false);
                          setPlusOneName("");
                          setPlusOneDietary("");
                        }}
                        className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all ${
                          wantsPlusOne === false
                            ? "bg-[#2c2c2c] text-white"
                            : "border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                        }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        No
                      </button>
                    </div>
                    {wantsPlusOne === true && (
                      <div className="space-y-4">
                        <Field
                          label="Plus One Name"
                          value={plusOneName}
                          onChange={setPlusOneName}
                          placeholder="Full name"
                        />
                        {plusOneError && (
                          <p className="text-red-500 text-xs" style={{ fontFamily: "var(--font-sans)" }}>
                            {plusOneError}
                          </p>
                        )}
                        <Field
                          label="Plus One Dietary Restrictions"
                          value={plusOneDietary}
                          onChange={setPlusOneDietary}
                          placeholder="None"
                        />
                      </div>
                    )}
                  </div>
                )}

                {partyRsvps.length > 1 && (
                  <div>
                    <p
                      className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-4"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Your Party
                    </p>
                    {partyRsvps.map((member, idx) => (
                      <div key={member.id} className="mb-6 pb-6 border-b border-[#e8e6e3] last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "#2c2c2c" }}>
                            {member.name}
                            {member.id === guestRecord?.id ? " (You)" : ""}
                          </span>
                          <div className="flex gap-2">
                            {(member.id === guestRecord?.id ? ["Attending", "Declining"] : ["Attending", "Declining", "Unsure"]).map((label) => (
                              <button
                                key={label}
                                type="button"
                                onClick={() =>
                                  updatePartyMember(
                                    idx,
                                    "response",
                                    label === "Attending" ? "yes" : label === "Declining" ? "no" : "unsure"
                                  )
                                }
                                className={`px-3 py-1 text-xs tracking-wider transition-all ${
                                  member.response === (label === "Attending" ? "yes" : label === "Declining" ? "no" : "unsure")
                                    ? "bg-[#2c2c2c] text-white"
                                    : "border border-[#2c2c2c] text-[#2c2c2c]"
                                }`}
                                style={{ fontFamily: "var(--font-sans)" }}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {member.response === "yes" && (
                          <input
                            type="text"
                            placeholder="Dietary restrictions (if any)"
                            value={member.dietary_restrictions}
                            onChange={(e) => updatePartyMember(idx, "dietary_restrictions", e.target.value)}
                            className="w-full border-b border-[#e8e6e3] bg-transparent py-2 text-sm text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#c9a96e] transition-colors"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {attending !== null && (
              <Field
                label="Message for the Couple (optional)"
                value={message}
                onChange={setMessage}
                placeholder="A note for Kerry & Shelly..."
                multiline
              />
            )}

            {((!isReturningGuest && attending !== null) || (isReturningGuest && updateMode === "details") || (isReturningGuest && updateMode === "rsvp" && attending !== null)) && (
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 bg-[#2c2c2c] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] transition-all disabled:opacity-50"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {loading ? "Submitting..." : "Submit RSVP"}
              </button>
            )}
          </form>
        )}

        {/* Step 3: Done */}
        {step === "done" && (
          <div className="text-center flex flex-col items-center gap-6 py-10">
            <div className="w-16 h-px bg-[#c9a96e] mx-auto" />
            <h2 className="text-3xl font-light text-[#2c2c2c]" style={{ fontFamily: "var(--font-serif)" }}>
              {attending ? "We can't wait to celebrate with you!" : "We'll miss you dearly."}
            </h2>
            <p
              className="text-[#2c2c2c] opacity-60 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              {attending
                ? "Your RSVP has been received. We look forward to sharing this special day with you."
                : "Thank you for letting us know. We hope to celebrate together soon."}
            </p>
            {attending && <AcceptanceExtras />}
            <div className="w-16 h-px bg-[#c9a96e] mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline }) {
  const baseClass =
    "w-full border-b border-[#e8e6e3] bg-transparent py-3 text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#c9a96e] transition-colors text-sm";
  const style = { fontFamily: "var(--font-sans)", fontWeight: 300 };
  return (
    <div>
      <p
        className="text-xs tracking-[0.2em] uppercase text-[#2c2c2c] opacity-60 mb-2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </p>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={baseClass + " resize-none"}
          style={style}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
          style={style}
        />
      )}
    </div>
  );
}