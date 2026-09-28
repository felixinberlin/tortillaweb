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

// 1. Retrieve Gemini API Key from environment or local .env
$apiKey = getenv('GEMINI_API_KEY');
if (!$apiKey && file_exists(__DIR__ . '/../../.env')) {
    $envLines = file(__DIR__ . '/../../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            if (trim($key) === 'GEMINI_API_KEY') {
                $apiKey = trim($val, " \t\n\r\0\x0B\"'");
                break;
            }
        }
    }
}

if (!$apiKey) {
    echo json_encode([
        'success' => false,
        'reply' => '¡Ay, mi cielico! Falta configurar GEMINI_API_KEY en tu servidor de Strato. Añade la variable en tu panel o en un archivo .env en la raíz.'
    ]);
    exit;
}

// 2. Parse input JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true) ?: [];

// Check if this is a TTS voice request
if (isset($data['action']) && $data['action'] === 'tts' || !empty($data['text']) && empty($data['messages'])) {
    $ttsText = preg_replace('/[#*\[\]()]/', '', $data['text'] ?? '');
    $userLang = $data['lang'] ?? 'es';

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
    }
}

$rawMessages = isset($data['messages']) && is_array($data['messages']) ? $data['messages'] : [];

if (empty($rawMessages) && !empty($data['prompt'])) {
    $rawMessages = [['role' => 'user', 'text' => $data['prompt']]];
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
