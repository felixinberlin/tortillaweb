import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  ChefHat,
  Crown,
  Share2,
  Check,
  Vote,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TortillaPassportProps {
  lang?: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  faction: 'concebollistas' | 'sincebollistas' | 'betanzos' | 'clasica' | 'vanguardia';
  titleKey: string;
  avatarIcon: string;
  favoriteDoneness: 'jugosa' | 'cremosa' | 'cuajada' | 'betanzos';
  joinedDate: string;
  serialNumber: string;
}

const titles = [
  { id: 'master_flip', es: 'Gran Maestro Volteador de Sartenes', en: 'Grand Master of the Skillet Flip', de: 'Großmeister des Pfannen-Wendens' },
  { id: 'betanzos_doctor', es: 'Doctor Honoris Causa en Yema Líquida', en: 'Doctor of Philosophy in Liquid Yolk', de: 'Ehrendoktor des flüssigen Dotters' },
  { id: 'onion_defender', es: 'Defensor Supremo de la Cebolla Confitada', en: 'Supreme Guardian of Confit Onions', de: 'Oberster Schützer der Schmorzwiebel' },
  { id: 'purist_judge', es: 'Juez Purista de la Sagrada Tríada (Huevo, Patata, Aceite)', en: 'Purist Judge of the Sacred Triad', de: 'Puristischer Richter der Heiligen Dreifaltigkeit' },
  { id: 'pincho_taster', es: 'Catador Oficial de Pincho de las 11:00 AM', en: 'Official 11:00 AM Pincho Taster', de: 'Offizieller Pincho-Verkoster (11 Uhr)' }
];

const avatars = [
  { id: 'egg', label: 'Yema Dorada', icon: '🍳' },
  { id: 'hat', label: 'Gorro Chef', icon: '👨‍🍳' },
  { id: 'crown', label: 'Corona Real', icon: '👑' },
  { id: 'flame', label: 'Fuego Vivo', icon: '🔥' },
  { id: 'potato', label: 'Patata Monalisa', icon: '🥔' },
  { id: 'sparkles', label: 'Estrella Michelin', icon: '⭐' }
];

const STORAGE_KEY = 'tortilladepatatas_user_passport';

export const TortillaPassport: React.FC<TortillaPassportProps> = ({ lang = 'es' }) => {
  const isEs = lang.startsWith('es');
  const isDe = lang.startsWith('de');

  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [nameInput, setNameInput] = useState<string>('');
  const [factionInput, setFactionInput] = useState<MemberProfile['faction']>('concebollistas');
  const [titleInput, setTitleInput] = useState<string>('master_flip');
  const [avatarInput, setAvatarInput] = useState<string>('🍳');
  const [donenessInput, setDonenessInput] = useState<MemberProfile['favoriteDoneness']>('jugosa');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim() || (isEs ? 'Tortillero Anónimo' : 'Anonymous Chef');
    const randomSerial = `TORT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProfile: MemberProfile = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      faction: factionInput,
      titleKey: titleInput,
      avatarIcon: avatarInput,
      favoriteDoneness: donenessInput,
      joinedDate: new Date().toLocaleDateString(lang, { day: '2-digit', month: 'short', year: 'numeric' }),
      serialNumber: randomSerial
    };

    setProfile(newProfile);
    setIsEditing(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleCopyCard = () => {
    if (!profile) return;
    const selectedTitleObj = titles.find((t) => t.id === profile.titleKey);
    const titleLabel = selectedTitleObj ? (selectedTitleObj[lang as 'es'|'en'|'de'] || selectedTitleObj.es) : '';
    const text = `🪪 Carnet Oficial de Tortillólogo - tortilladepatatas.org\n👤 Nombre: ${profile.name}\n🎖️ Rango: ${titleLabel}\n🚩 Facción: ${profile.faction.toUpperCase()}\n🔢 ID Oficial: ${profile.serialNumber}\n🛡️ Certificado Seguridad: 70°C 2min / 63°C 20s\n👉 https://tortilladepatatas.org/${lang}/club`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const factionLabels = {
    concebollistas: { es: 'Concebollista Militante 🧅', en: 'Concebollista Defender 🧅', de: 'Concebollista (Mit Zwiebel) 🧅' },
    sincebollistas: { es: 'Sincebollista Purista 🥔', en: 'Sincebollista Purist 🥔', de: 'Sincebollista (Ohne Zwiebel) 🥔' },
    betanzos: { es: 'Betanceiro de Yema Fluida 🌊', en: 'Betanzos Liquid Yolk 🌊', de: 'Betanzos Flüssigdotter 🌊' },
    clasica: { es: 'Tradicionalista de Abuela 👵', en: 'Classic Traditionalist 👵', de: 'Klassischer Traditionskoch 👵' },
    vanguardia: { es: 'Innovador de El Bulli 🔬', en: 'Avant-Garde Innovator 🔬', de: 'Avantgarde-Kreativer 🔬' }
  };

  const donenessLabels = {
    jugosa: { es: 'Jugosa / Melosa (Oro de Betanzos)', en: 'Juicy / Melty (Golden Runny)', de: 'Saftig & Zart (Goldgelb)' },
    cremosa: { es: 'Cremosa / Punto Medio', en: 'Creamy / Medium Doneness', de: 'Cremig / Mittlere Garstufe' },
    cuajada: { es: 'Muy Cuajada (Firme para Bocadillo)', en: 'Firm / Well-Done for Sandwiches', de: 'Durchgegart (Fest für Baguettes)' },
    betanzos: { es: 'Líquida / Río de Yema Pura', en: 'Flowing Liquid / Pure Yolk River', de: 'Flüssig (Echte Betanzos-Art)' }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="card-notebook p-6 md:p-8 bg-card border border-border rounded-3xl shadow-sm text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#8D6E63] dark:text-[#FFB800] text-xs font-bold border border-[#FFB800]/35 shadow-2xs">
              <Award className="w-4 h-4 text-[#FFB800]" />
              <span>{isEs ? 'Registro Instantáneo & Carnet Digital' : isDe ? 'Digitaler Tortilla-Pass' : 'Digital Member Passport'}</span>
            </div>

            <h1 className="font-serif-heading text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              {isEs ? 'Carnet Oficial del Club de la Tortilla' : isDe ? 'Offizieller Pass des Tortilla-Clubs' : 'Official Tortilla Club Passport'}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed font-sans">
              {isEs
                ? 'Únete a la mayor comunidad mundial de amantes de la tortilla de patatas. Sin contraseñas tediosas, en 10 segundos obtendrás tu carnet digital oficial acreditado con número de serie y rango culinario.'
                : isDe
                ? 'Trete der weltweiten Gemeinschaft von Tortilla-Liebhabern bei. Ohne Passwort, in 10 Sekunden erhältst du deinen zertifizierten Club-Pass!'
                : 'Join the global fellowship of Spanish tortilla enthusiasts. Zero passwords, 10-second instant setup, and get your certified member credential.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-secondary border border-border shrink-0 text-center space-y-1">
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block">
              {isEs ? 'Acceso 100% Gratuito' : 'Free Instant Access'}
            </span>
            <div className="text-xl font-black text-[#2E7D32] dark:text-[#81C784]">
              {isEs ? 'Sin Registro Complejo' : 'Zero Friction'}
            </div>
            <span className="text-3xs text-muted-foreground font-bold block">
              {isEs ? 'Guardado en tu dispositivo' : 'Stored in Local Browser'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Form OR Generated Passport */}
      {!profile || isEditing ? (
        <div className="card-notebook p-6 md:p-8 bg-card border-2 border-[#FFB800]/50 rounded-3xl shadow-md space-y-6">
          <div className="pb-3 border-b border-border">
            <h2 className="font-serif-heading text-xl md:text-2xl font-bold text-foreground">
              {isEs ? 'Personaliza tu Carnet de Tortillólogo' : isDe ? 'Erstelle deinen Tortilla-Pass' : 'Customize Your Member Credential'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isEs ? 'Solo necesitamos tu nombre o alias gastronómico y tus preferencias sagradas.' : 'Just enter your chef alias and your culinary preferences.'}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Alias */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? 'Nombre o Alias de Chef:' : 'Your Name or Kitchen Alias:'}</span>
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={isEs ? 'Ej. Maestro Pepe, Laura de Betanzos, El Rey del Pincho...' : 'e.g. Chef Oliver, Golden Yolk Master...'}
                required
                className="w-full text-sm font-medium px-4 py-3 rounded-xl bg-accent border border-border text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
              />
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? 'Emblema del Carnet:' : 'Passport Badge Icon:'}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {avatars.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatarInput(av.icon)}
                    className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border transition-transform cursor-pointer ${
                      avatarInput === av.icon
                        ? 'bg-[#FFB800]/25 border-[#FFB800] scale-110 shadow-xs'
                        : 'bg-accent border-border hover:bg-secondary'
                    }`}
                  >
                    {av.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Faction Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Vote className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? 'Facción Culinaria:' : 'Culinary Faction:'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {(Object.keys(factionLabels) as MemberProfile['faction'][]).map((fKey) => (
                  <button
                    key={fKey}
                    type="button"
                    onClick={() => setFactionInput(fKey)}
                    className={`p-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer ${
                      factionInput === fKey
                        ? 'bg-[#8D6E63] text-white border-[#8D6E63] dark:bg-[#FFB800] dark:text-[#1C1917] dark:border-[#FFB800] shadow-xs'
                        : 'bg-accent border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    {factionLabels[fKey][lang as 'es'|'en'|'de'] || factionLabels[fKey].es}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? 'Título Honorífico Oficial:' : 'Honorary Tortilla Title:'}</span>
              </label>
              <select
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-3 rounded-xl bg-accent border border-border text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#FFB800]"
              >
                {titles.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t[lang as 'es'|'en'|'de'] || t.es}
                  </option>
                ))}
              </select>
            </div>

            {/* Doneness Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isEs ? 'Punto de Cuajado Favorito:' : 'Preferred Doneness:'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(donenessLabels) as MemberProfile['favoriteDoneness'][]).map((dKey) => (
                  <button
                    key={dKey}
                    type="button"
                    onClick={() => setDonenessInput(dKey)}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium border cursor-pointer ${
                      donenessInput === dKey
                        ? 'bg-secondary border-[#FFB800] text-foreground font-bold ring-1 ring-[#FFB800]'
                        : 'bg-accent border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {donenessLabels[dKey][lang as 'es'|'en'|'de'] || donenessLabels[dKey].es}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-base font-serif-heading font-black bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01]"
            >
              ✨ {isEs ? 'Generar Mi Carnet Oficial' : isDe ? 'Pass jetzt generieren' : 'Issue My Official Credential'}
            </Button>
          </form>
        </div>
      ) : (
        /* The Generated Skeuomorphic ID Card */
        <div className="space-y-6">
          {/* Card Presentation */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF0D9] to-[#F5E6BE] dark:from-[#2A231B] dark:via-[#1F1B16] dark:to-[#171411] border-2 border-[#FFB800] shadow-xl text-[#4A3B32] dark:text-[#FAF0D9] relative overflow-hidden space-y-6">
            {/* Holographic Watermark effect */}
            <div className="absolute right-4 -top-8 text-9xl opacity-5 pointer-events-none select-none">
              🍳
            </div>

            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#8D6E63]/20 dark:border-[#FFB800]/20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFB800] text-3xl flex items-center justify-center shadow-md border-2 border-white dark:border-[#3D3226]">
                  {profile.avatarIcon}
                </div>
                <div>
                  <div className="text-3xs font-extrabold uppercase tracking-widest text-[#8D6E63] dark:text-[#FFB800]">
                    Club Oficial tortilladepatatas.org
                  </div>
                  <h3 className="font-serif-heading text-xl md:text-2xl font-black text-foreground">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-bold text-[#8D6E63] dark:text-[#FFB800]">
                    {titles.find((t) => t.id === profile.titleKey)?.[lang as 'es'|'en'|'de'] || titles[0].es}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-[#1C1917] text-[#FFB800] border border-[#FFB800]/40 shadow-xs">
                  {profile.serialNumber}
                </span>
                <span className="text-3xs block text-muted-foreground mt-1 font-sans">
                  {isEs ? 'Expedido:' : 'Issued:'} {profile.joinedDate}
                </span>
              </div>
            </div>

            {/* Card Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-card/60 dark:bg-card/40 border border-[#8D6E63]/20 dark:border-border space-y-0.5">
                <span className="text-3xs uppercase font-extrabold text-muted-foreground block">
                  {isEs ? 'Facción Juramentada' : 'Sworn Faction'}
                </span>
                <p className="font-bold text-foreground">
                  {factionLabels[profile.faction][lang as 'es'|'en'|'de'] || factionLabels[profile.faction].es}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-card/60 dark:bg-card/40 border border-[#8D6E63]/20 dark:border-border space-y-0.5">
                <span className="text-3xs uppercase font-extrabold text-muted-foreground block">
                  {isEs ? 'Punto de Cuajado' : 'Doneness Preference'}
                </span>
                <p className="font-bold text-foreground">
                  {donenessLabels[profile.favoriteDoneness][lang as 'es'|'en'|'de'] || donenessLabels[profile.favoriteDoneness].es}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-card/60 dark:bg-card/40 border border-[#8D6E63]/20 dark:border-border space-y-0.5">
                <span className="text-3xs uppercase font-extrabold text-muted-foreground block">
                  {isEs ? 'Acreditación Térmica' : 'Safety Standard'}
                </span>
                <p className="font-bold text-[#2E7D32] dark:text-[#81C784] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span><strong>70°C</strong> 2min / <strong>63°C</strong> 20s</span>
                </p>
              </div>
            </div>

            {/* Card Security Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#8D6E63]/20 dark:border-[#FFB800]/20 text-3xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                <span>
                  {isEs
                    ? 'Carnet digital auténtico. Reconocido por maestros tortilleros y comensales de buen paladar.'
                    : 'Authentic digital passport recognized across Spanish tortilla culinary tables.'}
                </span>
              </div>
              <span className="font-mono text-3xs text-foreground/70">
                VERIFIED_MEMBER_v1.0
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold gap-1.5 h-10 px-4 bg-card border-border hover:bg-secondary cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isEs ? 'Editar Preferencias' : isDe ? 'Pass bearbeiten' : 'Edit Passport'}</span>
            </Button>

            <Button
              onClick={handleCopyCard}
              className="text-xs font-bold gap-1.5 h-10 px-5 bg-[#8D6E63] hover:bg-[#73564B] dark:bg-[#FFB800] dark:hover:bg-[#E0A200] text-white dark:text-[#1C1917] cursor-pointer shadow-sm"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#2E7D32]" />
                  <span>{isEs ? '¡Copiado para Compartir!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{isEs ? 'Compartir mi Carnet' : isDe ? 'Pass teilen' : 'Share Passport'}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
