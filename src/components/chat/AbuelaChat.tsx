import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart,
  Copy,
  Check,
  CookingPot,
  Mic,
  MicOff,
  Radio
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

interface AbuelaChatProps {
  lang?: string;
  initialPrompt?: string;
  compact?: boolean;
}

const SUGGESTIONS: Record<string, string[]> = {
  es: [
    "Abuela, ¿con cebolla o sin cebolla?",
    "¡Socorro! Se me ha roto la tortilla al darle la vuelta",
    "¿Qué patata compro: Kennebec, Monalisa o Agria?",
    "¿A qué temperatura y cuánto tiempo se cocina para que sea segura?",
    "¿Cuál es el secreto del confitado lento en aceite?",
    "¿Cómo calculo la cantidad exacta de sal?"
  ],
  en: [
    "Grandma, onion or no onion?",
    "Help! My tortilla broke when flipping it",
    "Which potato should I buy: Kennebec, Monalisa, or Agria?",
    "What temperature and time makes the runny egg safe?",
    "What is your secret for slow poaching in olive oil?",
    "How much salt should I use per kilogram?"
  ],
  de: [
    "Oma, mit Zwiebeln oder ohne Zwiebeln?",
    "Hilfe! Meine Tortilla ist beim Wenden zerbrochen",
    "Welche Kartoffelsorte soll ich kaufen: Kennebec oder Agria?",
    "Bei welcher Temperatur und Zeit ist das Ei mikrobiologisch sicher?",
    "Was ist das Geheimnis des sanften Pochierens in Olivenöl?",
    "Wie viel Salz brauche ich genau?"
  ]
};

const INITIAL_GREETINGS: Record<string, string> = {
  es: "¡Hola, cielico mío! Ven corriendo a la mesa y ponte cómodo mientras se pochan las patatas a fuego manso. Puedes escribirme o pulsar el micrófono para hablarme de viva voz. Pregúntame lo que quieras: cebolla sí o no, cómo voltear la sartén sin miedo o qué hacer si se te ha pegado. ¡Aquí tu abuela te lo explica con todo el amor!",
  en: "Hello, my darling! Come sit at the kitchen table while the potatoes are gently confiting in olive oil. You can type or press the microphone to talk to me with your voice! Ask me anything: the onion debate, how to flip without spilling, or how to fix a disaster. Grandma is right here!",
  de: "Hallo, mein Liebling! Komm, setz dich an den Küchentisch, während die Kartoffeln sanft im Olivenöl pochieren. Du kannst mir schreiben oder auf das Mikrofon drücken, um direkt mit mir zu sprechen! Frag mich alles, was dein Herz begehrt. Deine Großmutter ist für dich da!"
};

export const AbuelaChat: React.FC<AbuelaChatProps> = ({ 
  lang = "es", 
  initialPrompt,
  compact = false 
}) => {
  const currentLang = (lang === "es" || lang === "en" || lang === "de") ? lang : "es";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      role: "model",
      text: INITIAL_GREETINGS[currentLang] || INITIAL_GREETINGS.es,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Clean up speech synthesis and audio when unmounting
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  // Initialize Speech Recognition (Mic)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = currentLang === "de" ? "de-DE" : currentLang === "en" ? "en-US" : "es-ES";

        recognition.onstart = () => {
          setIsListening(true);
          setMicNotice(null);
          // Stop any ongoing grandma speech when user starts talking
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
          }
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInputText(currentTranscript);

          // If the recognition identifies a final sentence, automatically submit to Abuela!
          if (event.results[event.results.length - 1].isFinal) {
            setIsListening(false);
            if (currentTranscript.trim()) {
              handleSendMessage(currentTranscript.trim(), true);
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            setMicNotice(
              currentLang === "de" 
                ? "Mikrofonzugriff wurde im Browser blockiert." 
                : currentLang === "en" 
                ? "Microphone access was denied in browser." 
                : "Permiso de micrófono denegado en el navegador."
            );
          } else if (event.error !== "no-speech") {
            setMicNotice(
              currentLang === "de" 
                ? "Sprachaufnahme unterbrochen. Bitte erneut versuchen." 
                : currentLang === "en" 
                ? "Voice recognition interrupted. Please try again." 
                : "Se interrumpió la escucha de voz. Pulsa el micro de nuevo."
            );
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [currentLang]);

  const toggleMic = async () => {
    if (!speechSupported) {
      setMicNotice(
        currentLang === "de"
          ? "Dein Browser unterstützt die Spracheingabe leider nicht (z.B. Chrome, Edge oder Safari nutzen)."
          : currentLang === "en"
          ? "Your browser does not support speech recognition (recommended: Chrome, Safari, Edge)."
          : "Tu navegador no es compatible con reconocimiento de voz (prueba en Chrome, Edge o Safari)."
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        setMicNotice(null);

        // Pre-prompt microphone permission via getUserMedia
        if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => track.stop());
          } catch (permErr: any) {
            console.warn("Microphone permission prompt result:", permErr);
            setMicNotice(
              currentLang === "de"
                ? "Mikrofonzugriff blockiert. Klicke auf 🔒 in der Adressleiste oder öffne die Seite im Vollbild-Tab."
                : currentLang === "en"
                ? "Microphone access blocked. Click 🔒 in address bar to allow, or open in a full tab."
                : "Permiso de micrófono bloqueado. Haz clic en el candado 🔒 de la barra del navegador o abre la web en pestaña completa."
            );
            return;
          }
        }

        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Could not start speech recognition:", e);
      }
    }
  };

  const speakText = async (text: string) => {
    // If audio is currently playing, stop it
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    // Clean text of markdown asterisks, hashes, and URLs for speech
    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/#+\s*/g, "")
      .trim();

    // 1. First priority: High-fidelity AI Grandma voice generated on server
    try {
      const res = await fetch("/api/abuela-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: cleanSpeech.slice(0, 300), // First 300 characters for immediate, snappy playback
          lang: currentLang 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audioBase64) {
          const audio = new Audio(`data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`);
          currentAudioRef.current = audio;
          audio.onended = () => {
            setIsSpeaking(false);
            currentAudioRef.current = null;
          };
          audio.onerror = () => {
            setIsSpeaking(false);
            currentAudioRef.current = null;
          };
          await audio.play();
          return;
        }
      }
    } catch (ttsErr) {
      console.warn("AI TTS audio generation error, falling back to browser female voice:", ttsErr);
    }

    // 2. Fallback: Browser speech synthesis strictly filtered to female elderly/mature voices (NEVER MALE)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.lang = currentLang === "de" ? "de-DE" : currentLang === "en" ? "en-US" : "es-ES";
      utterance.pitch = 0.92; // Warm, mature grandmother pitch (not high-pitched, not male)
      utterance.rate = 0.90;  // Calm, patient, grandmotherly pace

      const voices = window.speechSynthesis.getVoices();
      const langCode = utterance.lang.slice(0, 2);

      // Exclude male voice names explicitly across all supported languages
      const isMaleVoice = /(jorge|pablo|diego|carlos|enrique|alvaro|manuel|raul|david|male|guy|man|stefan|markus|peter|hans|jürgen|martin|yannick|klaus|otto|dieter|werner|michael|richard|james|john|paul|brian|daniel|alex|tom|fred|george)/i;

      // Top authentic grandmother / mature female voices per language:
      const germanGrandmaVoices = /(marlene|gudrun|hedda|katja|anna|gisela|petra|helena|vicki|weiblich|female)/i;
      const englishGrandmaVoices = /(hazel|susan|moira|fiona|karen|samantha|tessa|victoria|serena|zoe|jenny|linda|female)/i;
      const spanishGrandmaVoices = /(monica|francisca|paloma|carmen|helena|laura|conchita|marta|victoria|lucia|amira|paulina|soledad|rosa|maria|elvira|penelope|female)/i;

      let preferredVoice: SpeechSynthesisVoice | undefined;

      if (currentLang === "de") {
        preferredVoice = voices.find(
          (v) => v.lang.startsWith("de") && !isMaleVoice.test(v.name) && germanGrandmaVoices.test(v.name)
        ) || voices.find(
          (v) => v.lang.startsWith("de") && !isMaleVoice.test(v.name)
        );
      } else if (currentLang === "en") {
        preferredVoice = voices.find(
          (v) => v.lang.startsWith("en") && !isMaleVoice.test(v.name) && englishGrandmaVoices.test(v.name)
        ) || voices.find(
          (v) => v.lang.startsWith("en") && !isMaleVoice.test(v.name)
        );
      } else {
        preferredVoice = voices.find(
          (v) => v.lang.startsWith("es") && !isMaleVoice.test(v.name) && spanishGrandmaVoices.test(v.name)
        ) || voices.find(
          (v) => v.lang.startsWith("es") && !isMaleVoice.test(v.name)
        );
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string, forceVoiceReply: boolean = false) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    // Stop listening if active
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    }

    const userMessage: Message = {
      id: "user-" + Date.now(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      // Build conversation payload for backend
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          text: m.text
        })),
        lang: currentLang
      };

      const res = await fetch("/api/abuela", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let reply = "";
      if (res.ok) {
        const data = await res.json();
        reply = data.reply || data.response || "";
      } else {
        // Fallback for static hosts without backend
        reply = currentLang === "de" 
          ? "Ach, mein Kind! Mein Küchenherd braucht gerade einen kurzen Moment zum Durchatmen. Probier es gleich noch einmal!"
          : currentLang === "en"
          ? "Oh, my darling! My kitchen stove needs a tiny breather. Ask me again in just a moment!"
          : "¡Ay, mi cielico! Parece que el fogón ha tirado un poco de humo. Vuelve a preguntarme ahora mismo, anda.";
      }

      const modelMessage: Message = {
        id: "abuela-" + Date.now(),
        role: "model",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, modelMessage]);

      // If user spoke via mic or has autoSpeak turned on, speak the answer aloud!
      if (autoSpeak || forceVoiceReply) {
        speakText(reply);
      }
    } catch (err) {
      console.error("Error communicating with Abuela María:", err);
      const fallbackMsg: Message = {
        id: "err-" + Date.now(),
        role: "model",
        text: currentLang === "de"
          ? "Ach, mein Kind! Das Telefon zur Küche knistert. Frag mich gleich noch einmal!"
          : currentLang === "en"
          ? "Oh, my dear! The kitchen line has a bit of static. Ask me again in a second!"
          : "¡Ay, alma mía! Se ha cortado la línea del fogón por un segundo. Vuelve a escribirme, que te escucho con atención.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    }
    setMessages([
      {
        id: "initial-greeting",
        role: "model",
        text: INITIAL_GREETINGS[currentLang] || INITIAL_GREETINGS.es,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Format markdown helper (bolding temperatures, bullets)
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((para, i) => {
      // Check if line is bullet list
      if (para.startsWith("- ") || para.startsWith("* ")) {
        const items = para.split("\n").filter(Boolean);
        return (
          <ul key={i} className="list-disc pl-5 my-2 space-y-1">
            {items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{
                __html: item.replace(/^[-*]\s+/, "")
                  .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-[#8D6E63] dark:text-[#FFB800]'>$1</strong>")
              }} />
            ))}
          </ul>
        );
      }

      return (
        <p key={i} className="my-2 leading-relaxed" dangerouslySetInnerHTML={{
          __html: para
            .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-[#8D6E63] dark:text-[#FFB800]'>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
        }} />
      );
    });
  };

  return (
    <div className={`flex flex-col bg-[#FFFDF7] dark:bg-[#1C1917] border-2 border-[#EADBB6] dark:border-[#443828] rounded-3xl shadow-xl overflow-hidden transition-all ${compact ? "max-h-[600px] h-[550px]" : "min-h-[650px] h-[750px]"}`}>
      
      {/* Header with Abuela María Persona Badge */}
      <div className="bg-gradient-to-r from-[#FDF6E2] via-[#FCEECB] to-[#F5E6BE] dark:from-[#292218] dark:via-[#241E15] dark:to-[#1C1917] px-6 py-4 border-b border-[#EADBB6] dark:border-[#443828] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-[#FFB800] p-1 overflow-hidden shadow-inner flex items-center justify-center">
              <img 
                src="/images/personas/cocineras.svg" 
                alt="Abuela María" 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <CookingPot className="w-8 h-8 text-[#FF8A00] hidden" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#1C1917] rounded-full shadow" title="Al fogón con su delantal" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#292524] dark:text-[#F5E6BE] font-serif tracking-tight">
                Abuela María
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] px-2 py-0.5 rounded-full border border-[#FFB800]/40">
                {currentLang === "de" ? "Navarra 1942" : currentLang === "en" ? "Navarre 1942" : "Navarra 1942"}
              </span>
            </div>
            <p className="text-xs text-[#78716C] dark:text-[#A8A29E] flex items-center gap-1.5 mt-0.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>
                {currentLang === "de"
                  ? "Herzliche Küchenweisheit & Humor"
                  : currentLang === "en"
                  ? "Loving kitchen wisdom & grandma humor"
                  : "Amor maternal, humor y sabiduría culinaria"}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Hands-Free Auto-Speech Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !autoSpeak;
              setAutoSpeak(next);
              if (!next && isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              autoSpeak 
                ? "bg-[#FFB800] text-stone-900 border-[#FFB800] font-bold shadow-xs" 
                : "bg-white/70 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
            title={autoSpeak ? "Desactivar voz de la Abuela" : "Activar respuesta por voz de la Abuela"}
            aria-label="Voz de la Abuela"
          >
            {autoSpeak ? <Volume2 className="w-4 h-4 text-stone-950" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">
              {autoSpeak ? "Voz activa" : "Voz"}
            </span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/70 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Reiniciar conversación"
            aria-label="Reiniciar conversación"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[radial-gradient(#F5E6BE_1px,transparent_1px)] dark:bg-[radial-gradient(#292218_1px,transparent_1px)] [background-size:16px_16px]">
        {messages.map((msg) => {
          const isAbuela = msg.role === "model";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] sm:max-w-[78%] ${
                isAbuela ? "self-start" : "self-end ml-auto flex-row-reverse"
              }`}
            >
              {isAbuela && (
                <div className="w-9 h-9 rounded-xl bg-[#F5E6BE] dark:bg-stone-800 border border-[#FFB800]/50 shrink-0 p-0.5 shadow-xs overflow-hidden">
                  <img
                    src="/images/personas/cocineras.svg"
                    alt="Abuela"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <div
                className={`group relative rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
                  isAbuela
                    ? "bg-[#FFFDF7] dark:bg-[#241F1A] border-2 border-[#EADBB6] dark:border-[#443828] text-stone-900 dark:text-stone-100"
                    : "bg-[#FFB800] text-stone-950 font-medium rounded-br-xs shadow-md border border-[#E0A200]"
                }`}
              >
                {/* Author & Timestamp */}
                <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] opacity-70">
                  <span className="font-bold uppercase tracking-wider font-mono">
                    {isAbuela ? "Abuela María" : "Tú"}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Body */}
                <div className="text-sm sm:text-base leading-relaxed">
                  {renderFormattedText(msg.text)}
                </div>

                {/* Utility Buttons on Abuela Messages */}
                {isAbuela && (
                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="text-[11px] italic font-serif opacity-75">
                      {currentLang === "de"
                        ? "Mit Liebe aus Navarra gekocht"
                        : currentLang === "en"
                        ? "Cooked with love in Navarre"
                        : "Con todo el cariño del Baztán"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => speakText(msg.text)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Escuchar a la Abuela"
                        aria-label="Escuchar mensaje"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#8D6E63] dark:text-[#FFB800]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Copiar respuesta"
                        aria-label="Copiar texto"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] self-start">
            <div className="w-9 h-9 rounded-xl bg-[#F5E6BE] dark:bg-stone-800 border border-[#FFB800]/50 shrink-0 p-0.5 overflow-hidden animate-pulse">
              <img
                src="/images/personas/cocineras.svg"
                alt="Abuela"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-[#FFFDF7] dark:bg-[#241F1A] border-2 border-[#EADBB6] dark:border-[#443828] rounded-2xl p-4 shadow-xs flex items-center gap-3 text-stone-600 dark:text-stone-300">
              <CookingPot className="w-5 h-5 text-[#FF8A00] animate-spin" style={{ animationDuration: '3s' }} />
              <div className="text-xs sm:text-sm font-medium italic">
                {currentLang === "de"
                  ? "Die Großmutter rührt die Kartoffeln um und überlegt..."
                  : currentLang === "en"
                  ? "Grandma is stirring the potatoes and thinking..."
                  : "La Abuela está removiendo las patatas con su cuchara de madera..."}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Section */}
      <div className="px-4 py-2.5 bg-[#FDF9EE] dark:bg-[#201B15] border-t border-[#EADBB6] dark:border-[#443828]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8D6E63] dark:text-[#FFB800] mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
          <span>
            {currentLang === "de"
              ? "Häufige Fragen an die Oma:"
              : currentLang === "en"
              ? "Popular questions for Grandma:"
              : "Preguntas rápidas para la Abuela:"}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(SUGGESTIONS[currentLang] || SUGGESTIONS.es).map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSendMessage(suggestion)}
              className="text-xs whitespace-nowrap bg-white dark:bg-stone-800/80 hover:bg-[#FFB800]/20 hover:border-[#FFB800] text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Live Voice Recording Status Banner */}
      {isListening && (
        <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
            <Radio className="w-4 h-4 text-rose-600 animate-spin" />
            <span>
              {currentLang === "de"
                ? "🎙️ Oma hört dir aufmerksam zu... Sprich frei heraus!"
                : currentLang === "en"
                ? "🎙️ Grandma is listening to you... Speak naturally!"
                : "🎙️ La Abuela te está escuchando con atención... ¡Cuéntale tu duda!"}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleMic}
            className="text-[11px] underline text-rose-600 dark:text-rose-400 font-bold hover:text-rose-800 cursor-pointer"
          >
            {currentLang === "de" ? "Stoppen" : currentLang === "en" ? "Stop" : "Detener"}
          </button>
        </div>
      )}

      {/* Microphone Permission Notice Banner */}
      {micNotice && (
        <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/60 border-t border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base shrink-0">🔒</span>
            <span className="leading-snug">{micNotice}</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {typeof window !== "undefined" && window.self !== window.top && (
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#FFB800] text-stone-950 font-bold rounded-lg hover:bg-[#E0A200] transition-colors inline-flex items-center gap-1 text-[11px]"
              >
                {currentLang === "de" ? "In neuem Tab öffnen ↗" : currentLang === "en" ? "Open in new tab ↗" : "Abrir en nueva pestaña ↗"}
              </a>
            )}
            <button 
              type="button" 
              onClick={() => setMicNotice(null)}
              className="text-[11px] font-bold underline cursor-pointer px-1.5 py-1 hover:text-amber-950 dark:hover:text-white"
            >
              {currentLang === "de" ? "Schließen" : currentLang === "en" ? "Dismiss" : "Cerrar"}
            </button>
          </div>
        </div>
      )}

      {/* Input Box with Microphone and Send Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 bg-white dark:bg-[#1C1917] border-t border-[#EADBB6] dark:border-[#443828] flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={
              isListening
                ? currentLang === "de" ? "Ich höre dir zu..." : currentLang === "en" ? "Listening to your voice..." : "Escuchando tu voz..."
                : currentLang === "de"
                ? "Schreibe oder sprich mit deiner Großmutter..."
                : currentLang === "en"
                ? "Type or talk to Grandma María..."
                : "Escribe o háblale por micrófono a la Abuela..."
            }
            className={`w-full bg-[#FFFDF7] dark:bg-stone-900 border-2 rounded-2xl px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden transition-all shadow-inner ${
              isListening 
                ? "border-rose-500 ring-2 ring-rose-500/20" 
                : "border-stone-300 dark:border-stone-700 focus:border-[#FFB800] dark:focus:border-[#FFB800]"
            }`}
          />
        </div>

        {/* Microphone Button */}
        <button
          type="button"
          onClick={toggleMic}
          disabled={isLoading}
          className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer ${
            isListening
              ? "bg-rose-600 text-white animate-bounce ring-4 ring-rose-500/30"
              : "bg-stone-100 hover:bg-[#FFB800]/20 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:border-[#FFB800]"
          }`}
          title={
            isListening 
              ? (currentLang === "de" ? "Aufnahme stoppen" : currentLang === "en" ? "Stop microphone" : "Detener micrófono") 
              : (currentLang === "de" ? "Mit Oma per Stimme sprechen" : currentLang === "en" ? "Talk to Grandma with your voice" : "Hablar con la Abuela por voz (Micrófono)")
          }
          aria-label="Micrófono"
        >
          {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-[#8D6E63] dark:text-[#FFB800]" />}
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="bg-[#FFB800] hover:bg-[#E0A200] disabled:bg-stone-300 dark:disabled:bg-stone-800 text-stone-950 font-bold p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
