import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Map as LeafletMap, LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Award, LocateFixed, MapPin, Search, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import awardData from '@/data/awardWinners.json';

type Lang = 'es' | 'en' | 'de';

export interface AwardRecord {
  id: string;
  venue: string;
  city: string;
  area: string | null;
  region: string;
  address: string | null;
  lat: number;
  lng: number;
  geo_precision: 'municipio' | 'barrio' | 'geocoded';
  championship: string;
  edition: string | null;
  scope: 'national' | 'regional' | 'local';
  year: number;
  place: number;
  category: string;
  style: 'con cebolla' | 'sin cebolla' | null;
  chef: string | null;
  notes: string | null;
  verified: boolean;
  sources: string[];
}

export const AWARDS = awardData.awards as AwardRecord[];

const PLACE_COLORS: Record<number, string> = { 1: '#FFB800', 2: '#9AA1A8', 3: '#B0703C' };
const placeColor = (place: number) => PLACE_COLORS[place] ?? '#8D6E63';

const venueKey = (a: AwardRecord) => `${a.venue}|${a.city}`;

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

const T = {
  search: { es: 'Buscar bar, ciudad o chef…', en: 'Search bar, city or chef…', de: 'Bar, Stadt oder Koch suchen…' },
  region: { es: 'Región', en: 'Region', de: 'Region' },
  year: { es: 'Año', en: 'Year', de: 'Jahr' },
  championship: { es: 'Campeonato', en: 'Championship', de: 'Wettbewerb' },
  style: { es: 'Estilo', en: 'Style', de: 'Stil' },
  all: { es: 'Todos', en: 'All', de: 'Alle' },
  firstOnly: { es: 'Solo primeros puestos', en: 'First places only', de: 'Nur erste Plätze' },
  nearMe: { es: 'Cerca de mí', en: 'Near me', de: 'In meiner Nähe' },
  sortedByDistance: { es: 'ordenado por distancia', en: 'sorted by distance', de: 'nach Entfernung sortiert' },
  geoFail: {
    es: 'No se pudo obtener tu ubicación.',
    en: "Couldn't get your location.",
    de: 'Dein Standort konnte nicht ermittelt werden.',
  },
  none: {
    es: 'Ningún premio coincide con los filtros.',
    en: 'No awards match these filters.',
    de: 'Keine Auszeichnung passt zu diesen Filtern.',
  },
  reset: { es: 'Limpiar filtros', en: 'Clear filters', de: 'Filter zurücksetzen' },
  sources: { es: 'Fuentes', en: 'Sources', de: 'Quellen' },
  unverified: { es: 'sin verificar', en: 'unverified', de: 'unbestätigt' },
  chef: { es: 'Chef', en: 'Chef', de: 'Koch' },
  mapLabel: { es: 'Mapa de tortillas premiadas', en: 'Map of award-winning tortillas', de: 'Karte der preisgekrönten Tortillas' },
  notice: {
    es: 'Beta: datos recogidos de noticias y aún sin verificar. La ubicación de cada chincheta es aproximada.',
    en: 'Beta: data gathered from news reports and not yet verified. Each pin’s location is approximate.',
    de: 'Beta: Daten aus Presseberichten, noch nicht geprüft. Die Position jeder Markierung ist ungefähr.',
  },
} satisfies Record<string, Record<Lang, string>>;

const COUNT: Record<Lang, (n: number, v: number) => string> = {
  es: (n, v) => `${n} ${n === 1 ? 'premio' : 'premios'} · ${v} ${v === 1 ? 'local' : 'locales'}`,
  en: (n, v) => `${n} ${n === 1 ? 'award' : 'awards'} · ${v} ${v === 1 ? 'venue' : 'venues'}`,
  de: (n, v) => `${n} ${n === 1 ? 'Auszeichnung' : 'Auszeichnungen'} · ${v} ${v === 1 ? 'Lokal' : 'Lokale'}`,
};

const PLACE: Record<Lang, (p: number) => string> = {
  es: (p) => `${p}.º puesto`,
  en: (p) => `${p}${p === 1 ? 'st' : p === 2 ? 'nd' : p === 3 ? 'rd' : 'th'} place`,
  de: (p) => `${p}. Platz`,
};

const CATEGORY: Record<string, Record<Lang, string>> = {
  tradicional: { es: 'tradicional', en: 'traditional', de: 'traditionell' },
  'jurado profesional': { es: 'jurado profesional', en: 'jury prize', de: 'Jurypreis' },
  'premio del público': { es: 'premio del público', en: 'public vote', de: 'Publikumspreis' },
  originalidad: { es: 'originalidad', en: 'originality', de: 'Originalität' },
  'tortilla con': { es: 'tortilla con…', en: 'tortilla "con" (with extras)', de: 'Tortilla „con“ (mit Extras)' },
  'premio Huevos Larraz': { es: 'premio Huevos Larraz', en: 'Huevos Larraz prize', de: 'Huevos-Larraz-Preis' },
  'tortilla rellena': { es: 'tortilla rellena', en: 'filled tortilla', de: 'gefüllte Tortilla' },
  'ingrediente riojano': { es: 'ingrediente riojano', en: 'Rioja ingredient', de: 'Zutat aus La Rioja' },
};

const STYLE: Record<string, Record<Lang, string>> = {
  'con cebolla': { es: 'con cebolla', en: 'with onion', de: 'mit Zwiebel' },
  'sin cebolla': { es: 'sin cebolla', en: 'without onion', de: 'ohne Zwiebel' },
  unknown: { es: 'estilo desconocido', en: 'style unknown', de: 'Stil unbekannt' },
};

const SCOPE: Record<AwardRecord['scope'], Record<Lang, string>> = {
  national: { es: 'nacional', en: 'national', de: 'national' },
  regional: { es: 'regional', en: 'regional', de: 'regional' },
  local: { es: 'local', en: 'local', de: 'lokal' },
};

const PRECISION: Record<AwardRecord['geo_precision'], Record<Lang, string>> = {
  municipio: { es: 'ubicación aprox. (municipio)', en: 'approx. location (town)', de: 'ungefähre Lage (Ort)' },
  barrio: { es: 'ubicación aprox. (barrio)', en: 'approx. location (neighbourhood)', de: 'ungefähre Lage (Viertel)' },
  geocoded: { es: 'dirección geolocalizada', en: 'geocoded address', de: 'geokodierte Adresse' },
};

const uniq = <V,>(values: V[]) => Array.from(new Set(values));

export interface AwardMapProps {
  lang: Lang;
}

export const AwardMap: React.FC<AwardMapProps> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [championship, setChampionship] = useState('');
  const [style, setStyle] = useState('');
  const [firstOnly, setFirstOnly] = useState(false);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState(false);
  const [activeVenue, setActiveVenue] = useState<string | null>(null);

  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const leafletRef = useRef<typeof import('leaflet') | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const regions = useMemo(() => uniq(AWARDS.map((a) => a.region)).sort(), []);
  const years = useMemo(() => uniq(AWARDS.map((a) => a.year)).sort((x, y) => y - x), []);
  const championships = useMemo(() => uniq(AWARDS.map((a) => a.championship)).sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = AWARDS.filter((a) => {
      if (region && a.region !== region) return false;
      if (year && String(a.year) !== year) return false;
      if (championship && a.championship !== championship) return false;
      if (style && (a.style ?? 'unknown') !== style) return false;
      if (firstOnly && a.place !== 1) return false;
      if (q) {
        const hay = [a.venue, a.city, a.area, a.region, a.championship, a.chef].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).map((a) => ({ award: a, km: userPos ? distanceKm(userPos, a) : null }));
    if (userPos) {
      out.sort((x, y) => (x.km as number) - (y.km as number));
    } else {
      out.sort(
        (x, y) =>
          y.award.year - x.award.year || x.award.place - y.award.place || x.award.venue.localeCompare(y.award.venue),
      );
    }
    return out;
  }, [query, region, year, championship, style, firstOnly, userPos]);

  const venueCount = uniq(filtered.map((f) => venueKey(f.award))).length;

  // Leaflet touches `window`, so it is loaded only in the browser.
  useEffect(() => {
    let cancelled = false;
    import('leaflet').then((mod) => {
      const L = (mod as unknown as { default?: typeof import('leaflet') }).default ?? mod;
      if (cancelled || !mapEl.current || mapRef.current) return;
      leafletRef.current = L;
      const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView([40.2, -3.7], 5);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!mapReady || !L || !map || !layer) return;

    layer.clearLayers();
    markersRef.current = {};

    const groups = new Map<string, AwardRecord[]>();
    for (const { award } of filtered) {
      const k = venueKey(award);
      groups.set(k, [...(groups.get(k) ?? []), award]);
    }
    // Venues sharing approximate coordinates (same town centre) are spread on a small circle.
    const byCoord = new Map<string, string[]>();
    for (const [k, awards] of groups) {
      const c = `${awards[0].lat.toFixed(4)},${awards[0].lng.toFixed(4)}`;
      byCoord.set(c, [...(byCoord.get(c) ?? []), k]);
    }

    const bounds: [number, number][] = [];
    for (const keys of byCoord.values()) {
      keys.forEach((k, i) => {
        const awards = groups.get(k) as AwardRecord[];
        const a = awards[0];
        let lat = a.lat;
        let lng = a.lng;
        if (keys.length > 1) {
          const ang = (2 * Math.PI * i) / keys.length;
          lat += 0.006 * Math.sin(ang);
          lng += (0.006 * Math.cos(ang)) / Math.cos((lat * Math.PI) / 180);
        }
        const best = Math.min(...awards.map((x) => x.place));
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:28px;height:28px;border-radius:50%;background:${placeColor(best)};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px/1 system-ui,sans-serif">${awards.length > 1 ? awards.length : best}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });
        const where = [a.area, a.city].filter(Boolean).join(', ');
        const popup =
          `<strong>${escapeHtml(a.venue)}</strong><br>${escapeHtml(where)}` +
          (a.address ? `<br>${escapeHtml(a.address)}` : '') +
          `<ul style="margin:4px 0 0;padding-left:18px">${awards
            .map((x) => `<li>${escapeHtml(PLACE[lang](x.place))} · ${escapeHtml(x.championship)} · ${x.year}</li>`)
            .join('')}</ul>` +
          `<em>${escapeHtml(PRECISION[a.geo_precision][lang])}</em>`;
        const marker = L.marker([lat, lng], { icon, title: a.venue, keyboard: true }).bindPopup(popup);
        marker.on('click', () => setActiveVenue(k));
        marker.addTo(layer);
        markersRef.current[k] = marker;
        bounds.push([lat, lng]);
      });
    }
    if (userPos) bounds.push([userPos.lat, userPos.lng]);
    if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
  }, [filtered, mapReady, lang, userPos]);

  const focusVenue = (k: string) => {
    setActiveVenue(k);
    const marker = markersRef.current[k];
    const map = mapRef.current;
    if (marker && map) {
      map.setView(marker.getLatLng(), Math.max(map.getZoom(), 11));
      marker.openPopup();
    }
  };

  const toggleNearMe = () => {
    if (userPos) {
      setUserPos(null);
      return;
    }
    setGeoError(false);
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoError(true),
      { timeout: 10000 },
    );
  };

  const resetFilters = () => {
    setQuery('');
    setRegion('');
    setYear('');
    setChampionship('');
    setStyle('');
    setFirstOnly(false);
  };

  const selectClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800]';
  const labelClass = 'flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground';

  return (
    <div className="space-y-6">
      <p className="rounded-lg border border-[#FFC107]/40 bg-[#FFC107]/15 px-4 py-2 text-sm text-foreground">
        {T.notice[lang]}
      </p>

      <div className="card-notebook space-y-4 border border-[#8D6E63]/20 bg-[#FBF9F5]/90 p-5 shadow-sm dark:bg-card sm:p-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={T.search[lang]}
            aria-label={T.search[lang]}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className={labelClass}>
            {T.region[lang]}
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
              <option value="">{T.all[lang]}</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            {T.year[lang]}
            <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
              <option value="">{T.all[lang]}</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            {T.championship[lang]}
            <select value={championship} onChange={(e) => setChampionship(e.target.value)} className={selectClass}>
              <option value="">{T.all[lang]}</option>
              {championships.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            {T.style[lang]}
            <select value={style} onChange={(e) => setStyle(e.target.value)} className={selectClass}>
              <option value="">{T.all[lang]}</option>
              {['con cebolla', 'sin cebolla', 'unknown'].map((s) => (
                <option key={s} value={s}>{STYLE[s][lang]}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={firstOnly} onChange={(e) => setFirstOnly(e.target.checked)} />
            {T.firstOnly[lang]}
          </label>
          <button
            type="button"
            onClick={toggleNearMe}
            aria-pressed={userPos !== null}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
              userPos ? 'bg-[#8D6E63] text-white' : 'bg-[#FFB800] text-[#4A3B32] hover:bg-[#FFB800]/90'
            }`}
          >
            <LocateFixed className="h-3.5 w-3.5" />
            {T.nearMe[lang]}
          </button>
          {geoError && <span className="text-xs text-[#B00020]">{T.geoFail[lang]}</span>}
          <span className="ml-auto font-mono text-xs text-muted-foreground" aria-live="polite">
            {COUNT[lang](filtered.length, venueCount)}
            {userPos ? ` · ${T.sortedByDistance[lang]}` : ''}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div
          ref={mapEl}
          role="region"
          aria-label={T.mapLabel[lang]}
          className="z-0 h-[360px] overflow-hidden rounded-xl border border-[#8D6E63]/20 bg-[#F5E6BE]/40 lg:col-span-3 lg:h-[600px]"
        />

        <ol className="space-y-3 lg:col-span-2 lg:max-h-[600px] lg:overflow-y-auto lg:pr-1">
          {filtered.length === 0 && (
            <li className="card-notebook space-y-3 p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">{T.none[lang]}</p>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg bg-[#FFB800] px-4 py-2 text-xs font-bold text-[#4A3B32] hover:bg-[#FFB800]/90"
              >
                {T.reset[lang]}
              </button>
            </li>
          )}
          {filtered.map(({ award: a, km }) => {
            const k = venueKey(a);
            const where = [a.area, a.city].filter(Boolean).join(', ');
            const tags = [
              CATEGORY[a.category]?.[lang] ?? a.category,
              STYLE[a.style ?? 'unknown'][lang],
              SCOPE[a.scope][lang],
              PRECISION[a.geo_precision][lang],
              ...(a.verified ? [] : [T.unverified[lang]]),
            ];
            return (
              <li
                key={a.id}
                tabIndex={0}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) return;
                  focusVenue(k);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    focusVenue(k);
                  }
                }}
                className={`card-notebook grid cursor-pointer grid-cols-[auto_1fr] gap-x-3 gap-y-1 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] ${
                  activeVenue === k ? 'ring-2 ring-[#FFB800]' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="row-span-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: placeColor(a.place) }}
                >
                  {a.place}
                </span>
                <h2 className="font-serif-heading text-base font-bold leading-tight text-foreground">{a.venue}</h2>
                <div className="text-sm text-muted-foreground">
                  {where}
                  {a.address ? ` · ${a.address}` : ''}
                  {km !== null && <strong className="text-foreground"> · {Math.round(km)} km</strong>}
                </div>
                <div className="text-sm text-foreground">
                  <Award className="mr-1 inline h-3.5 w-3.5 text-[#FFB800]" />
                  {PLACE[lang](a.place)} · {a.championship}
                  {a.edition ? ` (${a.edition})` : ''} · {a.year}
                  {a.chef ? ` · ${T.chef[lang]}: ${a.chef}` : ''}
                </div>
                <div className="col-start-2 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#8D6E63]/25 bg-[#F5E6BE]/50 px-2 py-0.5 text-[11px] text-muted-foreground dark:bg-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="col-start-2 text-xs text-muted-foreground">
                  {T.sources[lang]}:{' '}
                  {a.sources.map((u, i) => (
                    <React.Fragment key={u}>
                      {i > 0 && ', '}
                      <a href={u} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                        {hostOf(u)}
                        <ExternalLinkIcon className="ml-0.5 inline h-3 w-3" />
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default AwardMap;
