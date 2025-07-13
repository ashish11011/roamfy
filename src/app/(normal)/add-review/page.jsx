"use client";
import Input from "@/conponents/input";
import SubmitButton from "@/conponents/submitButton";
import Textarea from "@/conponents/textArea";
import React, { useState } from "react";
import { Star } from "lucide-react";
import HeroBG from "@/conponents/tripHero";
import { addReview } from "../../../../lib/tripHelper";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const handleSubmit = async (e) => {
    if (!name || !email || !star || !message) return;
    setLoading(true);
    try {
      await addReview({
        name,
        email,
        rating: star,
        message,
      });

      setResMessage("Form Submitted Successfully");
    } catch (error) {
      console.log(error);
      setResMessage("Form Submit Failed, Please Try Again");
    } finally {
      setName("");
      setEmail("");
      setHoverStar(0);
      setStar(0);
      setMessage("");
    }

    console.log("data submitted");
    setLoading(false);
  };

  return (
    <div className="">
      <HeroBG text="Each Review Matters" />
      <div className="max-w-2xl space-y-6 px-4 mx-auto w-full my-20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-black">
            Share Your Trip Experience
          </h1>
          <p className="text-gray-500 mt-2">
            We’d love to hear how your journey went!
          </p>
        </div>
        <Input
          title={"Name"}
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          title={"Email"}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ⭐ Star Rating with Encouragement */}
        <div>
          <p className="mb-2 font-medium">Rate your experience</p>
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  (hoverStar || star) >= i ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverStar(i)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => setStar(i)}
                fill={(hoverStar || star) >= i ? "#facc15" : "none"}
              />
            ))}
          </div>

          {/* Encouragement Message */}
          <div className="mt-2 text-sm text-gray-600 min-h-[1.5rem]">
            {hoverStar === 5 || star === 5 ? (
              <span>⭐ You're awesome! Thanks for the perfect score! 😊</span>
            ) : hoverStar || star ? (
              {
                1: "😢 Oh no! What went wrong?",
                2: "😕 Sorry it wasn’t great...",
                3: "😐 Okay-ish, we’ll do better!",
                4: "🙂 Almost there!",
              }[hoverStar || star]
            ) : (
              ""
            )}
          </div>
        </div>

        <Textarea
          title={"Message"}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {resMessage && (
          <p className=" text-center font-medium text-green-600">
            {resMessage}
          </p>
        )}

        <SubmitButton onClick={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default Page;
