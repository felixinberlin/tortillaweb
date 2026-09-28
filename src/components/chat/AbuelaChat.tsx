import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Heart,
  MessageCircle,
  Copy,
  Check,
  CookingPot
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
  es: "¡Hola, cielico mío! Ven corriendo a la mesa y ponte cómodo mientras se pochan las patatas a fuego manso. Pregúntame lo que quieras: que si cebolla sí o no, cómo voltear la sartén sin miedo, qué patata elegir o qué hacer si se te ha pegado. ¡Aquí tu abuela te lo explica con todo el amor y el saber de toda una vida!",
  en: "Hello, my darling! Come sit at the kitchen table while the potatoes are gently confiting in olive oil. Ask me anything: the onion debate, how to flip the pan without spilling a drop, which potato to choose, or how to rescue a broken tortilla. Grandma is here to guide you with love and half a century of wisdom!",
  de: "Hallo, mein Liebling! Komm, setz dich an den Küchentisch, während die Kartoffeln sanft im Olivenöl pochieren. Frag mich alles: mit oder ohne Zwiebeln, wie man die Pfanne mutig wendet, welche Kartoffel die beste ist oder was zu tun ist, wenn etwas schiefgeht. Deine Großmutter hilft dir von ganzem Herzen!"
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Clean up speech synthesis when unmounting
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    // Clean text of markdown asterisks and URLs for speech
    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/#/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = currentLang === "de" ? "de-DE" : currentLang === "en" ? "en-US" : "es-ES";
    utterance.pitch = 1.1; // Friendly, slightly higher grandma pitch
    utterance.rate = 0.95;  // Calm, patient pace

    // Try to pick a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const langCode = utterance.lang.slice(0, 2);
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith(langCode) && (v.name.includes("Female") || v.name.includes("Natural") || v.name.includes("Monica") || v.name.includes("Lucia") || v.name.includes("Amira") || v.name.includes("Marlene"))
    ) || voices.find((v) => v.lang.startsWith(langCode));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

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

      if (autoSpeak) {
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
                  // Fallback icon if image fails to load
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
                  ? "Die Weisheit der spanischen Großmutter"
                  : currentLang === "en"
                  ? "Traditional grandmother culinary wisdom"
                  : "Sabiduría tradicional & amor de abuela"}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Auto-speech toggle */}
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
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
              autoSpeak 
                ? "bg-[#FFB800] text-stone-900 border-[#FFB800] font-bold shadow-xs" 
                : "bg-white/70 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
            title={autoSpeak ? "Desactivar voz automática" : "Activar voz automática de la Abuela"}
            aria-label="Voz automática"
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">
              {autoSpeak ? "Voz activa" : "Voz"}
            </span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/70 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Escuchar a la Abuela"
                        aria-label="Escuchar mensaje"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#8D6E63] dark:text-[#FFB800]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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

      {/* Input Box */}
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
              currentLang === "de"
                ? "Schreibe deiner Großmutter eine Frage..."
                : currentLang === "en"
                ? "Ask your Grandma anything about tortilla..."
                : "Escríbele a la Abuela María (ej. ¿cuántos huevos le pongo?)..."
            }
            className="w-full bg-[#FFFDF7] dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 focus:border-[#FFB800] dark:focus:border-[#FFB800] rounded-2xl px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden transition-all shadow-inner"
          />
        </div>

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
