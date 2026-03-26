"use client";
import { useState } from "react";

const Termsandcondition = () => {
    const [content, setContent] = useState(initialContent);

    return (
        <div className="h-full w-full p-4 rounded-2xl">
            <div
                style={{
                    border: "1px solid #989898",
                    borderRadius: 10,
                    padding: "20px",
                    minHeight: "600px",
                    maxHeight: "600px",
                    marginTop: "20px",
                    color: "#ededed",
                    overflow: "auto",
                    background: "var(--color-inputBg)",
                }}
                dangerouslySetInnerHTML={{
                    __html: content || "No content yet.",
                }}
            />
        </div>
    )

};

const initialContent = `<p data-start="58" data-end="584"><span style="font-size: 18px;"><strong data-start="58" data-end="85">Welcome to Outfit Orbit</strong>, the ultimate destination where your style takes center stage. Here, we believe that fashion is about expressing yourself authentically—no filters, no edits, just raw fashion.<br data-start="261" data-end="264">
Outfit Orbit is a social platform designed for fashion lovers who want to share their true outfits, connect with like-minded individuals, and discover endless outfit inspiration. Whether you’re into minimalist chic, streetwear, or sustainable fashion, Outfit Orbit celebrates every style, no matter how bold or subtle.</span></p>
<p data-start="586" data-end="873"><span style="font-size: 18px;"><strong data-start="586" data-end="607">Why Outfit Orbit?</strong><br data-start="607" data-end="610">
• <strong data-start="612" data-end="646">Authentic Fashion, Real People</strong><br data-start="646" data-end="649">
Our community is all about real, unfiltered outfits. Forget the polished, perfect influencer looks—Outfit Orbit is about you and your unique style. Share your looks, inspire others, and find the style that fits you best.</span></p>
<p data-start="875" data-end="1146"><span style="font-size: 18px;">• <strong data-start="877" data-end="917">Join a Like-Minded Fashion Community</strong><br data-start="917" data-end="920">
Outfit Orbit connects you with other fashion lovers who appreciate raw, personal style. Whether you’re browsing for inspiration or sharing your latest outfit, you’ll always find something that speaks to your individuality.</span></p>
<p data-start="1148" data-end="1394"><span style="font-size: 18px;">• <strong data-start="1150" data-end="1174">A Space for Everyone</strong><br data-start="1174" data-end="1177">
Fashion is for everyone, and at Outfit Orbit, we embrace all body types, cultures, and styles. Whether you prefer minimalism or love bold, vibrant colors, we’ve got a space for you to share, connect, and discover.</span></p>
<p data-start="1396" data-end="1624"><span style="font-size: 18px;">• <strong data-start="1398" data-end="1419">Sustainable Style</strong><br data-start="1419" data-end="1422">
We’re committed to promoting eco-friendly fashion. Our community embraces sustainable brands and secondhand finds, empowering you to make choices that are good for both your wardrobe and the planet.</span></p>
<p data-start="1626" data-end="1969"><span style="font-size: 18px;"><strong data-start="1626" data-end="1654">What Makes Us Different?</strong><br data-start="1654" data-end="1657">
Outfit Orbit isn’t just another social app—it’s a fashion revolution. We’re here to give everyday fashion lovers the platform they deserve, where real outfits, real people, and real inspiration shine. With Outfit Orbit, your style becomes your community, and your feed is filled with looks that truly resonate.</span></p>`;

export default Termsandcondition;