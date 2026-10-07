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

// Helper for autonomous response engine (Zero Vertex AI / External API calls)
function getContextualAbuelaPhpResponse($query, $userLang = 'es') {
    $q = mb_strtolower(trim($query));

    // 1. Saludos
    if (preg_match('/^(hola|buenas|buenos d[ií]as|buenas tardes|buenas noches|hey|hello|hi|guten tag|hallo|servus|moin|qu[eé] tal|c[oó]mo est[aá]s|wie geht|how are you)/i', $q) || $q === 'abuela' || $q === 'oma') {
        if ($userLang === 'de') {
            return "Hallo, mein Herzchen! Setz dich zu mir an den Küchentisch, während die Kartoffeln im Olivenöl sanft confieren. Was brennt dir auf der Seele? Die Zwiebel-Frage, der perfekte Pfannen-Wendeschwung oder suchst du ein [Rezept](/de/recipes)? Oma María ist hier!";
        }
        if ($userLang === 'en') {
            return "Hello, my darling! Come sit by the kitchen stove while the potatoes are confiting gently in golden olive oil. What's on your mind? The onion debate, how to flip without spilling, or choosing an authentic [Recipe](/en/recipes)? Grandma María is right here!";
        }
        return "¡Hola, mi cielico hermoso! Pasa a la cocina y siéntate conmigo mientras las patatas se pochan al amor de la lumbre. ¿Qué duda te ronda la cabeza? ¿El debate de la cebolla, el truco para voltear sin miedo o buscas una [Receta Canónica](/es/recipes)? ¡Cuéntale a tu abuela!";
    }

    // 2. Cebolla
    if (strpos($q, 'cebolla') !== false || strpos($q, 'onion') !== false || strpos($q, 'zwiebel') !== false || strpos($q, 'conceboll') !== false || strpos($q, 'sinceboll') !== false) {
        if ($userLang === 'de') {
            return "Ach, mein Herzchen! Für mich als echte Puristin reichen Kartoffeln, Eier und bestes Olivenöl. Wer es süßlich mag, schaut in unser [Rezept mit Zwiebeln](/de/recipes/concebolla) oder die [Zwiebel-Debatte](/de/factions). Hauptsache ganz langsam karamellisieren!";
        }
        if ($userLang === 'en') {
            return "Oh, my darling! I'm a proud purist: fresh eggs, mountain potatoes, and olive oil; the rest is distraction. But if you love that sweet touch, check our [Tortilla with Onion Recipe](/en/recipes/concebolla) or the [Onion Debate](/en/factions). Just confit it slow and gentle!";
        }
        return "¡Ay, mi cielico! Para mí el huevo y la patata no necesitan adornos, pero si te va el dulzor, mira nuestra [Receta con Cebolla](/es/recipes/concebolla) y póchala muy despacio. Consulta también el [Debate de la Cebolla](/es/facciones) y verás qué lío.";
    }

    // 3. Volteo & Urgencias
    if (strpos($q, 'roto') !== false || strpos($q, 'romp') !== false || strpos($q, 'volte') !== false || strpos($q, 'vuelta') !== false || strpos($q, 'peg') !== false || strpos($q, 'desarm') !== false || strpos($q, 'broke') !== false || strpos($q, 'flip') !== false || strpos($q, 'zerbr') !== false || strpos($q, 'wend') !== false || strpos($q, 'klebt') !== false) {
        if ($userLang === 'de') {
            return "Keine Tränen, mein Kind! Das passiert selbst den besten Köchen. Verwandle sie einfach in köstliche Huevos Rotos oder eine [offene Tortilla Vaga](/de/notfall). Schau direkt in unsere [Notfall-Hilfe 112](/de/notfall) zur schnellen Rettung!";
        }
        if ($userLang === 'en') {
            return "Don't panic, my sweetheart! Even the greatest chefs have had a flip disaster. Turn it into scrambled eggs with potatoes or a delicious [Tortilla Vaga](/en/emergency). Check our [Emergency Hotline 112](/en/emergency) right now to salvage it!";
        }
        return "¡Ay, mi pobre cielico, no me llores que no pasa nada! Hasta al mejor cocinero se le ha desarmado una tortilla. Conviértela en unos gloriosos huevos rotos o una [tortilla vaga](/es/urgencias) y échale un ojo a nuestra [Línea de Urgencias 112](/es/urgencias).";
    }

    // 4. Patatas
    if (strpos($q, 'patata') !== false || strpos($q, 'papa') !== false || strpos($q, 'potato') !== false || strpos($q, 'kartoffel') !== false || strpos($q, 'kennebec') !== false || strpos($q, 'monalisa') !== false || strpos($q, 'agria') !== false) {
        if ($userLang === 'de') {
            return "Meine Liebe! Die Königin ist und bleibt die Kennebec, herrlich cremig und trocken. Auch Monalisa oder Agria gelingen wunderbar. Schau dir alle Sorten in unserem [Zutaten-Guide](/de/ingredients) an!";
        }
        if ($userLang === 'en') {
            return "Listen to your Grandma, my dear: the undisputed queen is Kennebec, though Monalisa and Agria are wonderful. Slice them 3mm thin and salt them before poaching. Explore our [Ingredients Guide](/en/ingredients)!";
        }
        return "¡Ay, mi vida! Para una tortilla gloriosa la reina es la Kennebec de montaña, aunque la Monalisa y la Agria son magníficas. Córtala a 3 milímetros y sálala antes del aceite. Mira nuestra [Guía de Ingredientes](/es/ingredientes).";
    }

    // 5. Huevos
    if (strpos($q, 'huevo') !== false || strpos($q, 'yema') !== false || strpos($q, 'egg') !== false || strpos($q, 'yolk') !== false || strpos($q, 'eier') !== false || strpos($q, 'eigelb') !== false) {
        if ($userLang === 'de') {
            return "Mein Kind, beim Ei liegt das Geheimnis: Verwende frischeste Eier (ca. 1 Ei pro 100g Kartoffeln). Schlage sie nur sanft mit der Gabel auf und lasse die heißen Kartoffeln 5 Minuten im Ei-Bad ruhen! Siehe [Wissenschaft & Sicherheit](/de/science).";
        }
        if ($userLang === 'en') {
            return "My sweetheart, the egg is where the magic lives: use fresh eggs (roughly 1 egg per 100g of potatoes). Beat gently with a fork and rest the hot potatoes in the egg bath for 5 minutes! Read more in [Science & Safety](/en/science).";
        }
        return "¡Alma de cántaro, con el huevo no se juega! Usa huevos camperos muy frescos y calcula la regla de oro: 1 huevo por cada 100 gramos de patata. Nada de batidoras que metan espuma; y reposa la patata caliente con el huevo 5 minutos. Lee más en [Ciencia y Seguridad](/es/science).";
    }

    // 6. Seguridad & Temperaturas
    if (strpos($q, 'segur') !== false || strpos($q, 'temperat') !== false || strpos($q, 'salmonel') !== false || strpos($q, 'safe') !== false || strpos($q, 'grad') !== false || strpos($q, 'sicher') !== false) {
        if ($userLang === 'de') {
            return "Sicherheit geht über alles, mein Kind! Das Ei stockt sicher bei **63°C für 20 Sekunden**, und die vollkommene Pasteurisierung erreicht man bei **70°C für 2 Minuten**. Niemals länger als **4 Stunden** ungekühlt lassen! Lies mehr in [Wissenschaft & Sicherheit](/de/science).";
        }
        if ($userLang === 'en') {
            return "Food safety is sacred, sweetheart! Eggs safely coagulate at **63°C for 20 seconds**, and full pasteurization standard is **70°C for 2 minutes**. Never leave it at room temp for more than **4 hours**! Discover the full science in [Science & Safety](/en/science).";
        }
        return "¡Alma de cántaro, la seguridad es lo primero! El huevo cuaja con seguridad a **63°C durante 20 segundos** y el estándar de oro de pasteurización es **70°C durante 2 minutos**. Y nunca más de **4 horas** fuera de la nevera. Consulta [Ciencia y Seguridad](/es/science).";
    }

    // 7. Betanzos
    if (strpos($q, 'betanzos') !== false || strpos($q, 'jugos') !== false || strpos($q, 'runny') !== false || strpos($q, 'flüssig') !== false) {
        if ($userLang === 'de') {
            return "Ach, der legendäre Betanzos-Stil! Hauchdünne Kartoffeln, reichlich Eigelb, null Zwiebeln und nur 30 Sekunden pro Seite bei starker Hitze versiegelt. Sieh dir unser [Betanzos-Rezept](/de/recipes/betanzos) an!";
        }
        if ($userLang === 'en') {
            return "Oh, the legendary Betanzos style! Wafer-thin potatoes, extra yolks, zero onion, and seared for 30 seconds per side. Check our [Betanzos Recipe](/en/recipes/betanzos)!";
        }
        return "¡Ay, la bendita tortilla de Betanzos! Patata finísima frita crujiente, yemas extra, nada de cebolla y un sellado de 30 segundos por cara a fuego vivo. Mira nuestra [Receta de Betanzos](/es/recipes/betanzos).";
    }

    // 8. Historia & Bibliografía
    if (strpos($q, 'historia') !== false || strpos($q, 'origen') !== false || strpos($q, '1798') !== false || strpos($q, '1767') !== false || strpos($q, 'bibliograf') !== false || strpos($q, 'history') !== false) {
        if ($userLang === 'de') {
            return "Schau in unsere Geschichte, mein Kind! Valcárcel erwähnte sie 1767, und 1798 entstand das Pfannenrezept in Villanueva de la Serena. Alle Nachweise gibt es in unserer [Geschichte](/de/history) und im [Quellenarchiv](/de/bibliografia)!";
        }
        if ($userLang === 'en') {
            return "Look at our documented history, my dear! Valcárcel wrote in 1767, and Tena Godoy created the pan recipe in 1798. Explore our [History](/en/history) and [Bibliography](/en/bibliografia)!";
        }
        return "¡Qué hermosa historia, mi cielico! En 1767 Valcárcel documentó 'guisados y tortillas' con patatas, y en 1798 Tena Godoy formalizó la sartén en Villanueva de la Serena. Míralo en [Historia](/es/history) y en nuestra [Bibliografía](/es/bibliografia).";
    }

    // 9. Calculador & Proporciones
    if (strpos($q, 'calcul') !== false || strpos($q, 'builder') !== false || strpos($q, 'proporci') !== false || strpos($q, 'cantida') !== false || strpos($q, 'raciones') !== false) {
        if ($userLang === 'de') {
            return "Rechne es ganz genau aus, mein Kind! Probiere unseren [Tortilla-Konfigurator](/de/builder) für die perfekten Mengen nach Pfannengröße!";
        }
        if ($userLang === 'en') {
            return "Calculate it exactly, my darling! Use our [Tortilla Builder](/en/builder) to calculate tailored amounts for your pan size!";
        }
        return "¡Para calcular las medidas exactas según tu sartén y comensales, usa nuestro [Creador de Tortillas](/es/builder)!";
    }

    // 10. Fallback
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
    echo json_encode([
        'success' => false,
        'fallbackToBrowserVoice' => true
    ]);
    exit;
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

// Return autonomous local Abuela María knowledge response instantly with 0 external API cost
echo json_encode([
    'success' => true,
    'reply' => getContextualAbuelaPhpResponse($lastUserQuery, $userLang)
]);
exit;
