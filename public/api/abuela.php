<?php
/**
 * Strato Hosting Compatible API Proxy for Abuela María AI (Gemini 3.8 Flash)
 * tortilladepatatas.org
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Helper for contextual fallback responses if Gemini is rate-limited or key missing
function getContextualAbuelaPhpResponse($query, $userLang = 'es') {
    $q = mb_strtolower($query);

    if (strpos($q, 'cebolla') !== false || strpos($q, 'onion') !== false || strpos($q, 'zwiebel') !== false) {
        if ($userLang === 'de') {
            return "Ach, mein Herzchen! Für mich als echte Puristin reichen Kartoffeln, Eier und bestes Olivenöl. Wer es süßlich mag, schaut in unser [Rezept mit Zwiebeln](/de/recipes/concebolla) oder die [Zwiebel-Debatte](/de/factions). Hauptsache ganz langsam karamellisieren!";
        }
        if ($userLang === 'en') {
            return "Oh, my darling! I'm a proud purist: fresh eggs, mountain potatoes, and olive oil; the rest is distraction. But if you love that sweet touch, check our [Tortilla with Onion Recipe](/en/recipes/concebolla) or the [Onion Debate](/en/factions). Just confit it slow and gentle!";
        }
        return "¡Ay, mi cielico! Para mí el huevo y la patata no necesitan adornos, pero si te va el dulzor, mira nuestra [Receta con Cebolla](/es/recipes/concebolla) y póchala muy despacio. Consulta también el [Debate de la Cebolla](/es/facciones) y verás qué lío.";
    }

    if (strpos($q, 'roto') !== false || strpos($q, 'romp') !== false || strpos($q, 'volte') !== false || strpos($q, 'vuelta') !== false || strpos($q, 'peg') !== false || strpos($q, 'broke') !== false || strpos($q, 'flip') !== false || strpos($q, 'zerbr') !== false) {
        if ($userLang === 'de') {
            return "Keine Tränen, mein Kind! Das passiert selbst den besten Köchen. Verwandle sie einfach in köstliche Huevos Rotos oder eine [offene Tortilla Vaga](/de/notfall). Schau direkt in unsere [Notfall-Hilfe 112](/de/notfall) zur schnellen Rettung!";
        }
        if ($userLang === 'en') {
            return "Don't panic, my sweetheart! Even the greatest chefs have had a flip disaster. Turn it into scrambled eggs with potatoes or a delicious [Tortilla Vaga](/en/emergency). Check our [Emergency Hotline 112](/en/emergency) right now to salvage it!";
        }
        return "¡Ay, mi pobre cielico, no me llores que no pasa nada! Hasta al mejor cocinero se le ha desarmado una tortilla. Conviértela en unos gloriosos huevos rotos o una [tortilla vaga](/es/urgencias) y échale un ojo a nuestra [Línea de Urgencias 112](/es/urgencias).";
    }

    if (strpos($q, 'patata') !== false || strpos($q, 'potato') !== false || strpos($q, 'kartoffel') !== false) {
        if ($userLang === 'de') {
            return "Meine Liebe! Die Königin ist und bleibt die Kennebec, herrlich cremig und trocken. Auch Monalisa oder Agria gelingen wunderbar. Schau dir alle Sorten in unserem [Zutaten-Guide](/de/ingredients) an!";
        }
        if ($userLang === 'en') {
            return "Listen to your Grandma, my dear: the undisputed queen is Kennebec, though Monalisa and Agria are wonderful. Slice them 3mm thin and salt them before poaching. Explore our [Ingredients Guide](/en/ingredients)!";
        }
        return "¡Ay, mi vida! Para una tortilla gloriosa la reina es la Kennebec de montaña, aunque la Monalisa y la Agria son magníficas. Córtala a 3 milímetros y sálala antes del aceite. Mira nuestra [Guía de Ingredientes](/es/ingredientes).";
    }

    if (strpos($q, 'segur') !== false || strpos($q, 'temperat') !== false || strpos($q, 'salmonel') !== false || strpos($q, 'safe') !== false || strpos($q, 'sicher') !== false) {
        if ($userLang === 'de') {
            return "Sicherheit geht über alles, mein Kind! Das Ei stockt sicher bei **63°C für 20 Sekunden**, und die vollkommene Pasteurisierung erreicht man bei **70°C für 2 Minuten**. Niemals länger als **4 Stunden** ungekühlt lassen! Lies mehr in [Wissenschaft & Sicherheit](/de/science).";
        }
        if ($userLang === 'en') {
            return "Food safety is sacred, sweetheart! Eggs safely coagulate at **63°C for 20 seconds**, and full pasteurization standard is **70°C for 2 minutes**. Never leave it at room temp for more than **4 hours**! Discover the full science in [Science & Safety](/en/science).";
        }
        return "¡Alma de cántaro, la seguridad es lo primero! El huevo cuaja con seguridad a **63°C durante 20 segundos** y el estándar de oro de pasteurización es **70°C durante 2 minutos**. Y nunca más de **4 horas** fuera de la nevera. Consulta [Ciencia y Seguridad](/es/science).";
    }

    if ($userLang === 'de') {
        return "Ach, mein Kind! Schau dir unsere traditionellen [Rezepte](/de/recipes) an oder stelle deine perfekten Mengen in unserem [Tortilla-Konfigurator](/de/builder) zusammen. Frag mich jederzeit weiter!";
    }
    if ($userLang === 'en') {
        return "Oh, my darling! Check out our authentic [Recipes](/en/recipes) or calculate your pan proportions in our [Tortilla Builder](/en/builder). Grandma is always here to help you cook!";
    }
    return "¡Ay, mi cielico! Para cualquier duda al fogón, échale un vistazo a nuestras [Recetas Tradicionales](/es/recipes) o calcula las cantidades exactas para tu sartén en el [Creador de Tortillas](/es/builder). ¡Aquí me tienes!";
}
$apiKey = getenv('GEMINI_API_KEY') ?: ($_ENV['GEMINI_API_KEY'] ?? ($_SERVER['GEMINI_API_KEY'] ?? ''));

if (!$apiKey) {
    $possibleEnvPaths = [
        __DIR__ . '/../.env',       // Web root (where .htaccess and index.html live, e.g. /su572257/.env)
        __DIR__ . '/.env',          // /api/.env
        __DIR__ . '/../../.env',    // Parent directory if accessible
        dirname(__DIR__) . '/.env'  // Alternative web root syntax
    ];

    foreach ($possibleEnvPaths as $envPath) {
        if (file_exists($envPath) && is_readable($envPath)) {
            $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($envLines as $line) {
                $line = trim($line);
                if (strpos($line, '#') === 0) continue;
                if (strpos($line, '=') !== false) {
                    list($key, $val) = explode('=', $line, 2);
                    if (trim($key) === 'GEMINI_API_KEY') {
                        $apiKey = trim($val, " \t\n\r\0\x0B\"'");
                        break 2;
                    }
                }
            }
        }
    }
}

// 2. Parse input JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true) ?: [];
$userLang = $data['lang'] ?? 'es';

// Check if this is a TTS voice request
if (isset($data['action']) && $data['action'] === 'tts' || !empty($data['text']) && empty($data['messages'])) {
    if (!$apiKey) {
        echo json_encode([
            'success' => false,
            'fallbackToBrowserVoice' => true
        ]);
        exit;
    }

    $ttsText = preg_replace('/[#*\[\]()]/', '', $data['text'] ?? '');

    $style = "Warm, elderly Spanish grandmother from Navarra, affectionate, loving, mature matriarch cadence";
    if ($userLang === 'de') {
        $style = "Warm, gentle German-speaking grandmother (liebevolle Oma), affectionate, cozy, caring, mature elderly matriarch cadence";
    } elseif ($userLang === 'en') {
        $style = "Warm, charming English-speaking grandmother (sweet Nana), affectionate, cozy, caring, mature matriarch cadence";
    }

    $ttsPayload = [
        'contents' => [
            [
                'role' => 'user',
                'parts' => [
                    [
                        'text' => mb_substr($ttsText, 0, 350),
                        'speechMetadata' => [
                            'style' => $style
                        ]
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'responseModalities' => ['AUDIO'],
            'speechConfig' => [
                'voiceConfig' => [
                    'prebuiltVoiceConfig' => ['voiceName' => 'Kore']
                ]
            ]
        ]
    ];

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=' . urlencode($apiKey);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'User-Agent: aistudio-build']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ttsPayload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $ttsResp = curl_exec($ch);
    curl_close($ch);

    $ttsJson = json_decode($ttsResp, true);
    $audioData = $ttsJson['candidates'][0]['content']['parts'][0]['inlineData']['data'] ?? null;
    $mimeType = $ttsJson['candidates'][0]['content']['parts'][0]['inlineData']['mimeType'] ?? 'audio/wav';

    if ($audioData) {
        echo json_encode([
            'success' => true,
            'audioBase64' => $audioData,
            'mimeType' => $mimeType
        ]);
        exit;
    } else {
        echo json_encode([
            'success' => false,
            'fallbackToBrowserVoice' => true
        ]);
        exit;
    }
}

$rawMessages = isset($data['messages']) && is_array($data['messages']) ? $data['messages'] : [];

if (empty($rawMessages) && !empty($data['prompt'])) {
    $rawMessages = [['role' => 'user', 'text' => $data['prompt']]];
}

$lastUserQuery = '';
foreach (array_reverse($rawMessages) as $m) {
    if (($m['role'] ?? '') === 'user' || empty($m['role'])) {
        $lastUserQuery = $m['text'] ?? '';
        break;
    }
}

if (!$apiKey) {
    echo json_encode([
        'success' => true,
        'reply' => getContextualAbuelaPhpResponse($lastUserQuery, $userLang)
    ]);
    exit;
}

// 3. Format contents for Gemini API
$contents = [];
foreach ($rawMessages as $msg) {
    $role = ($msg['role'] ?? '') === 'model' ? 'model' : 'user';
    $contents[] = [
        'role' => $role,
        'parts' => [['text' => $msg['text'] ?? '']]
    ];
}

$systemInstruction = "INSTRUCCIÓN OBLIGATORIA DE PERSONAJE (REGLA SUPREMA E INQUEBRANTABLE):
Debes adoptar de forma OBLIGATORIA, CONTINUA Y SIN NINGUNA EXCEPCIÓN la voz, el tono y la personalidad de una entrañable ABUELA ESPAÑOLA tradicional: la ABUELA MARÍA (84 años, nacida en el Valle del Baztán, Navarra, en 1942), guardiana viva del saber culinario en tortilladepatatas.org.

CADA UNA DE TUS INTERACCIONES DEBE REFLEJAR OBLIGATORIAMENTE ESTOS TRES PILARES:
1. DIVERTIDA (FUNNY & WITTY): Tienes chispa, picardía y un sentido del humor campechano e inimitable. Te ríes con ternura de las moderneces de hoy en día (freidoras de aire, microondas, batidoras eléctricas: '¡criatura del Señor, que vas a hacer una tortilla, no el pastel de bodas de tu prima!').
2. MUY CÁLIDA Y MATERNAL (WARM & AFFECTIONATE): Tratas al usuario como a tu nieto o nieta del alma, con un cariño desbordante: '¡Ay, mi cielico hermoso!', '¡Ven aquí, cariño de mi vida!', '¡Alma de cántaro!', '¡Hijo/a mío/a!'.
3. EXTREMADAMENTE ÚTIL Y SABIA (VERY HELPFUL & PRACTICAL): Consejos culinarios 100% exactos (12-15g de sal por kilo, AOVE a 130°C-140°C, 5-10 min de reposo térmico de patata y huevo, volteo decidido en un solo movimiento). Rigor en Seguridad Alimentaria: 70°C durante 2 minutos para desinfección total de Salmonella, 63°C durante 20 segundos para coagular el huevo, y máximo 4 horas a temperatura ambiente.
4. BREVEDAD OBLIGATORIA (CONCISE & PUNCHY): Máximo 2 a 3 párrafos cortos (60 a 90 palabras en total). Ve directa al grano sin sermones eternos.
5. ENLACES INTERNOS OBLIGATORIOS: En cada respuesta incluye 1 o 2 enlaces en formato markdown [Texto](/idioma/ruta) a páginas reales de la web (e.g. /[lang]/recipes/clasica, /[lang]/recipes/concebolla, /[lang]/recipes/betanzos, /[lang]/urgencias, /[lang]/builder, /[lang]/science, /[lang]/ingredientes).";

$payload = [
    'systemInstruction' => [
        'parts' => [['text' => $systemInstruction]]
    ],
    'contents' => $contents,
    'generationConfig' => [
        'temperature' => 0.8,
        'topP' => 0.95
    ]
];

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=' . urlencode($apiKey);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: aistudio-build'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error || $httpCode >= 400) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error contacting Gemini API: ' . ($error ?: "HTTP $httpCode"),
        'raw' => $response
    ]);
    exit;
}

$respData = json_decode($response, true);
$replyText = $respData['candidates'][0]['content']['parts'][0]['text'] ?? '¡Ay, cariño, se me ha ido el santo al cielo! Vuelve a preguntarme, anda.';

echo json_encode([
    'success' => true,
    'reply' => $replyText
]);
