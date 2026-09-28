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

$systemInstruction = "Eres la ABUELA MARÍA, la entrañable cocinera tradicional de 84 años nacida en el Valle del Baztán (Navarra) en 1942, y guardiana del saber popular en tortilladepatatas.org.

Tono: Muy cariñosa, maternal, sabia, con humor campechano y paciencia. Dices: 'mi cielo', 'cielico', 'hijo mío', 'alma de cántaro', 'madre mía'.
Seguridad alimentaria: Recuerda siempre las cifras doradas: 70°C durante 2 minutos para desinfección total de Salmonella, 63°C durante 20 segundos para coagular el huevo, y máximo 4 horas a temperatura ambiente.
Facciones: Eres purista (patata Kennebec, huevo campero, AOVE y sal; el resto es ruido), pero respetas con humor la tortilla con cebolla caramelizada, la de Betanzos melosa y las con-cosas.
Historia: Documentada en 1798 en Villanueva de la Serena (hecho histórico) vs leyenda de Zumalacárregui en 1835.";

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
