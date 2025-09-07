// import React, { useState } from "react";

// const GeminiSearch = () => {
//   const [query, setQuery] = useState(
//     `only give  total rating as out put ,so i will store in an input. only.God respect - 1 star  High Mother or father love - 3 star ( good emotion scenes between  parent and child  Different concepts . Different story no one  made yet - 5 star.  Logic fights - .5 star  Un expectable Twists by audeince -2 star. Little Comedy  -1 star Lovers love ok even if it is not main theme - 1 star Emotional scenes  other than parent child- 2 star Message - 1 star  Hero sacrificing - 1 star. Hero  is righteous - .5 star Swag - 1 star If villian is intelligent not very dumb and also no need to be more intelligent - 1 star  If film has that thing then add the star i gave dont give  stars on your own.Super hero story  PROBOSS  Nrra and his son look different . because nrra creature transform there shape like butterfly  Mythoria  See heroine from bath room .  Sees and fall down   Mystery  suspense element  5 twists  4 emotions  Elevations  Comedy   Intelligent  Style Attitude rod  Connecting  Every one life   Big speech     Different power  Mythical creatures  Villian  - control shadows .shadows tell talk to him  Emotions powers  ADD IN THE STORY  A masked lady shown suspiciously in delham . mom wear mask so that hero dont see in delham authority.but it fall down  A demon reviewed on hero at last fight . Which will try to kill all. It is also a villian character      Lose to one badly and trained and rised  This is last time i help you .ok u never need to help me  again. ---- everytime   Hero ( starting ) : take dog away .  Friend ( mom lick ): u deserve it   Hero ( animal sleep): he believed me .he think i can. I cant .but i will try .try now.  Villain’s Experiment: Ethan gained his powers as part of an experiment Umbrix orchestrated, making him her unwilling creation.  Accidental Villain Creation: Umbrix became the villain due to a mistake Ethan made during the lab fire.  Blood of Fire: The accident altered Ethan’s physiology so much that his blood burns when exposed to air.  Hunted as a Threat: Government agencies hunt Ethan, believing he’s too dangerous to be free.  Villain's Shadow Creature: Umbrix created a shadow creature using the soul of someone Ethan loved.  Energy of the Sun: Ethan’s powers drain energy directly from the sun, meaning every use brings the planet closer to ecological disaster.  Earth’s Only Light: In a post-apocalyptic world, Ethan is the only source of light after Umbrix plunged the world into eternal night  Love Across Realms: Ethan’s partner is from another realm and can only visit Earth for a limited time, complicating their relationship.  Old are women young are men  Umbrix know English   As usuall i am alone .can i kiss . Slipper tegipodi . But can have a small losse hug.  Each finger has a unique power . And unique finger pose needed   Can pierce through steel or gently carry an injured ally. From his index finger, Luminarch releases a concentrated light beam called "Auraflux." Unlike a simple laser, Auraflux has a consciousness of its own, sensing danger and reacting to situations eve  Heroine come to save mom  Kiss and tight hug   Mother at place hero plan to escape   Why u killed my father hungry .  Hero in his bed . Slept . Night villian also on bed see each other . STORY   In first fight hero and umbrix are friends   Hero and his brother is small evil . Acts good .   Brother telling about umbrix and become one with it to see and feel and live within it .  Hero stuck by lighting  Hi how are u . I am not god .    Mythical creatures in dreams.   Hunter ( about villain , before killing  ) : i am a fan of u sir    Voice over person kill parents . Voice over and to him .god give power and talk through animal with non understandable language  Meet hero gave apple . He did.not turn to apple  Voice over by villian  Karish -  a shadow without body . Lives somewhere. Plotting bad things .    Villian died become two become small. One old one one day back one bay future   Cliffhanger  Hero .child friend seeing all asking all.    1. Hero ( peace ). Friend u r wasting my time on Sundays with stupid search for umbrix .hero angry . This is last time i help you  .today is fathers day . He accepted useless like u to marry me .he love me  2. Hero and friend  (no believe) . Forever in umbrix  Villian eat apples  3. Hero and thunder . Saved a small animal .  4. Hero see villian eat apples Torcher  animals  5. Hero detective.go to town 5.5villian  make animal leave  6. Animal attack  badly. Chase small animal . Animal hunters . Human injured. Attached hero . See sadness.small animal see hero here . Hit articraft . Hero use it to travel a distance  7.Villan beat badly .kill hunter . Thought animal eat it . Capture animal in vessel All thing .villian is super hero . 8.Hero say everything to society  9.Head and villian eat apples  8.Friend in hospital like place. Need umbrix  12. at society hero see all families . All believe they are alive . Hero promise himself to solve their problem. No more killings.  13.society framed hero bad . All beat hero. Go their  home . Hero dont have any traveller. Small animal help him .  Half   Sorry buddy i cant help . 14.animal talk sadly about her mother .  Blackmail mother with beating son 15. No job .i want to say something to u boss.fuck u boss . I will do a i like . What will u do . Boss call. Please come my employee u are best at office work . Drawed mother with him .   16.Villian beat both animals past. Sleep here buddy u r mom will be here when u wake  17. Hero heroine search villian place   Sit on chair. V feel he put his legs on his head . I want him as my servant .kill servant .then wake servant shadow and asked for info . I will make him build new house for me .  Got beat by simple gaurd .  Scared of him . Gaurd protects the building and hero use it as his advantage to escape.  Sleep walk . Animal . Sorry i cant   Hero friend decide to go . Friend even u dont go i will go . Heroine followed them   Fight  Zaber feels pain Hero almost dying time . Articraft put on injury not worked .blood fall on it . A monster awaken and fight with more  superpowers.   Destroy everything at fight Heroine neck lift .  Heroine stopped by off the switch on it   Small dog try lick .hero avoid . Mother licked in face .face full saliva.   Boss do u have job .i arranged new.  Animal helped friend . Not forever Animals beat be happy all. Going to animal place in 4 dimension .( One animal can open portal)  This how u killed me  Wait for night powers           Just because I don’t stick around doesn’t mean I don’t care`
//   );
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async (userMessage) => {
//     if (!userMessage) return;
//     setIsLoading(true);
//     setResponse("Thinking...");

//     try {
//       const payload = {
//         contents: [{ role: "user", parts: [{ text: userMessage }] }],
//       };

//       // Gemini API setup
//       const apiKey = "AIzaSyCa7tBPLCBOc7_M_auDyc8yM-23vkyAZnM";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//       const res = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error.message || "Unknown error");
//       }

//       const result = await res.json();
//       const aiResponse =
//         result?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No response from AI.";

//       setResponse(aiResponse);
//     } catch (err) {
//       setResponse("Error: " + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSendMessage(query);
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "20px auto" }}>
//       <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
//         <input
//           type="text"
//           placeholder="Ask Gemini..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{ flex: 1, padding: "8px" }}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "..." : "Ask"}
//         </button>
//       </form>

//       {response && (
//         <div
//           style={{
//             marginTop: "16px",
//             padding: "12px",
//             border: "1px solid #ddd",
//             borderRadius: "6px",
//             background: "#f9f9f9",
//           }}
//         >
//           <strong>Gemini:</strong> {response}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeminiSearch;
import { useState } from "react";

export default function useGeminiRating() {
  const [isLoading, setIsLoading] = useState(false);

  const getRating = async (script) => {
    if (!script) return 0;
    setIsLoading(true);

    try {
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Rate this story strictly based on the rules below. Output ONLY the numeric rating (1–10). 


Story:
${script}`,
              },
            ],
          },
        ],
      };

      const apiKey = "AIzaSyCa7tBPLCBOc7_M_auDyc8yM-23vkyAZnM";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || "Unknown error");
      }

      const result = await res.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "0";
      const numeric = parseFloat(text.match(/\d+(\.\d+)?/)?.[0] || "0");

      return numeric;
    } catch (err) {
      console.error("Gemini Rating Error:", err.message);
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  return { getRating, isLoading };
}
