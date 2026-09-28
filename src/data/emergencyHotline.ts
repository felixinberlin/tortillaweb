export interface EmergencyOption {
  id: string;
  text: { es: string; en: string; de: string };
  badge?: { es: string; en: string; de: string };
  nextQuestionId?: string;
  solutionId?: string;
}

export interface EmergencyQuestion {
  id: string;
  question: { es: string; en: string; de: string };
  context: { es: string; en: string; de: string };
  operatorCommentary: { es: string; en: string; de: string };
  options: EmergencyOption[];
}

export interface EmergencySolution {
  id: string;
  codeName: { es: string; en: string; de: string };
  successRate: string;
  timeLimit: { es: string; en: string; de: string };
  severity: 'catastrophic' | 'critical' | 'salvageable';
  safetyNote: { es: string; en: string; de: string };
  gourmetBaptism: { es: string; en: string; de: string };
  whyItHappened: { es: string; en: string; de: string };
  steps: { es: string; en: string; de: string }[];
  equipmentNeeded: { es: string; en: string; de: string }[];
  proTip: { es: string; en: string; de: string };
}

export interface EmergencyScenario {
  id: string;
  code: string;
  iconName: string;
  badge: { es: string; en: string; de: string };
  title: { es: string; en: string; de: string };
  subtitle: { es: string; en: string; de: string };
  description: { es: string; en: string; de: string };
  initialQuestionId: string;
  questions: Record<string, EmergencyQuestion>;
  solutions: Record<string, EmergencySolution>;
}

export const EMERGENCY_SCENARIOS: Record<string, EmergencyScenario> = {
  'stuck-pan': {
    id: 'stuck-pan',
    code: 'RED-01',
    iconName: 'Flame',
    badge: { es: 'Fallo Mecánico', en: 'Mechanical Failure', de: 'Mechanischer Defekt' },
    title: {
      es: 'Se ha soldado a la sartén como si fuera hormigón',
      en: 'The tortilla has welded itself to the pan like concrete',
      de: 'Die Tortilla hat sich wie Beton in der Pfanne festgesetzt'
    },
    subtitle: {
      es: 'La base no se mueve ni un milímetro y el pánico cunde.',
      en: 'The base does not budge a millimeter and panic ensues.',
      de: 'Der Pfannenboden rührt sich keinen Millimeter, Panik bricht aus.'
    },
    description: {
      es: 'Fallo de antiadherente o temperatura incorrecta de entrada. El almidón y las albúminas se han fusionado térmicamente con el metal.',
      en: 'Non-stick coating breakdown or incorrect heat input. Starch and egg albumins have fused chemically with the metal.',
      de: 'Beschichtungsversagen oder falsche Eintrittstemperatur. Stärke und Ei-Eiweiße sind eine thermische Bindung eingegangen.'
    },
    initialQuestionId: 'q1',
    questions: {
      q1: {
        id: 'q1',
        question: {
          es: '¿Qué sartén estás usando y qué ocurre al sacudir el mango?',
          en: 'What skillet are you using and what happens when you shake the handle?',
          de: 'Welche Pfanne nutzt du und was passiert beim Rütteln am Griff?'
        },
        context: {
          es: 'Analicemos la física de la superficie de contacto antes de tomar una decisión irreversible.',
          en: 'Let us assess the contact surface physics before doing anything irreversible.',
          de: 'Analysieren wir die Physik der Kontaktfläche, bevor wir unumkehrbare Schritte tun.'
        },
        operatorCommentary: {
          es: 'Operador: "Tranquilidad en la cocina. El teflón desgastado suele traicionar en el peor momento, pero hay maniobras de rescate físico."',
          en: 'Operator: "Remain calm. Worn-out Teflon loves to betray us at the worst possible second, but mechanical rescue protocols exist."',
          de: 'Zentrale: "Ruhe am Herd! Abgenutztes Teflon schlägt gern im schlechtesten Moment zu, aber es gibt physikalische Rettungswege."'
        },
        options: [
          {
            id: 'o1',
            text: {
              es: 'Sartén antiadherente normal: la tortilla no resbala en absoluto pero aún no huele a quemado.',
              en: 'Standard non-stick pan: the omelette does not slide at all but smells fine (not burnt yet).',
              de: 'Standard Antihaft-Pfanne: Sie rutscht kein Stück, riecht aber noch nicht verbrannt.'
            },
            nextQuestionId: 'q2-no-burn'
          },
          {
            id: 'o2',
            text: {
              es: 'Sartén de hierro o acero inoxidable sin curado previo suficiente.',
              en: 'Cast iron or stainless steel pan with insufficient pre-seasoning.',
              de: 'Gusseisen- oder Edelstahlpfanne ohne ausreichende Einbrennschicht.'
            },
            nextQuestionId: 'q2-iron'
          },
          {
            id: 'o3',
            text: {
              es: '¡Alarma! Ya huele a tostado oscuro o humo negro por la base.',
              en: 'Alarm! It already smells like dark toasting or black acrid smoke from below.',
              de: 'Alarm! Es riecht bereits nach verbranntem Röststoff oder schwarzem Rauch.'
            },
            solutionId: 'sol-scramble-rescue'
          }
        ]
      },
      'q2-no-burn': {
        id: 'q2-no-burn',
        question: {
          es: '¿Has intentado meter una espátula de metal a la fuerza?',
          en: 'Have you tried forcing a metal spatula underneath?',
          de: 'Hast du versucht, gewaltsam einen Metallspatel darunterzuschieben?'
        },
        context: {
          es: 'La fuerza bruta desgarra la película de albúmina y convierte la tortilla en una papilla informe.',
          en: 'Brute force tears the albumin film, destroying structural integrity.',
          de: 'Rohe Gewalt zerreißt den Eiweißfilm und ruiniert die Struktur.'
        },
        operatorCommentary: {
          es: 'Operador: "¡Alto el fuego! Aparta cualquier objeto punzante. Si desgarramos la piel exterior, perderemos la contención del huevo meloso."',
          en: 'Operator: "Hold fire! Put down any sharp utensils. If we tear the outer skin, runny yolk containment will be lost."',
          de: 'Zentrale: "Halt! Sofort spitze Gegenstände weglegen! Wenn die Außenhaut reißt, läuft der flüssige Kern aus."'
        },
        options: [
          {
            id: 'o2-1',
            text: {
              es: 'No, no la he tocado todavía. Solo la he sacudido desesperadamente.',
              en: 'No, I haven\'t touched it yet. Just shook it frantically.',
              de: 'Nein, noch unberührt. Nur panisch am Stiel gerüttelt.'
            },
            solutionId: 'sol-thermal-shock'
          },
          {
            id: 'o2-2',
            text: {
              es: 'Metí una espátula y se ha roto un trozo de la base, pero el 80% sigue unido.',
              en: 'I shoved a spatula in and chipped a piece of the base, but 80% remains intact.',
              de: 'Ich habe einen Pfannenwender reingedrückt; ein Stück riss ab, aber 80% halten noch.'
            },
            solutionId: 'sol-perimeter-lubrication'
          }
        ]
      },
      'q2-iron': {
        id: 'q2-iron',
        question: {
          es: '¿La sartén tiene mango metálico apto para horno?',
          en: 'Does your skillet have an all-metal, oven-safe handle?',
          de: 'Hat deine Pfanne einen ofenfesten Metallgriff?'
        },
        context: {
          es: 'Si el metal se resiste por abajo, el calor envolvente cenital por convección nos permite salvar el plato sin voltearlo.',
          en: 'If the base is anchored to stainless steel, top-down convection allows salvation without turning.',
          de: 'Wenn der Boden festbackt, ermöglicht Oberhitze die Rettung ohne riskantes Wenden.'
        },
        operatorCommentary: {
          es: 'Operador: "El hierro y el acero son nobles pero inclementes. Si el mango es de baquelita no lo metas al horno sin blindaje de papel aluminio."',
          en: 'Operator: "Iron is noble but unforgiving. If the handle has plastic, do not place in the oven without triple foil shielding."',
          de: 'Zentrale: "Gusseisen verzeiht nichts. Bei Kunststoffgriffen sofort drei Lagen Alufolie als Hitzeschild wickeln."'
        },
        options: [
          {
            id: 'o2-iron-yes',
            text: {
              es: 'Sí, es 100% hierro fundido o acero con mango metálico.',
              en: 'Yes, it is 100% cast iron or stainless with a metal handle.',
              de: 'Ja, 100% Gusseisen oder Edelstahl mit Metallgriff.'
            },
            solutionId: 'sol-oven-frittata-pivot'
          },
          {
            id: 'o2-iron-no',
            text: {
              es: 'No, tiene mango de plástico común o es sartén estándar.',
              en: 'No, standard plastic handle / non-oven cookware.',
              de: 'Nein, normaler Kunststoffgriff.'
            },
            solutionId: 'sol-thermal-shock'
          }
        ]
      }
    },
    solutions: {
      'sol-thermal-shock': {
        id: 'sol-thermal-shock',
        codeName: {
          es: 'Protocolo Alpha: Shock Térmico Perimetral y Capilaridad',
          en: 'Protocol Alpha: Perimeter Thermal Shock & Capillary Oil Release',
          de: 'Protokoll Alpha: Peripherer Thermoschock & Kapillar-Ölfilm'
        },
        successRate: '91% de éxito en despegue limpio',
        timeLimit: { es: '¡Tienes 40 segundos!', en: 'You have 40 seconds!', de: 'Du hast 40 Sekunden!' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Una vez despegada, asegúrate de voltear y verificar que el centro alcance **63°C durante 20 segundos** si buscas punto meloso, o **70°C durante 2 minutos** para seguridad total.',
          en: 'Once freed, ensure the flipped core reaches **63°C for 20 seconds** for a juicy center, or **70°C for 2 minutes** for total microbiological safety.',
          de: 'Nach dem Lösen wenden und sicherstellen, dass der Kern **63°C für 20 Sekunden** (saftig) oder **70°C für 2 Minuten** (volle Sicherheit) erreicht.'
        },
        gourmetBaptism: {
          es: '"Tortilla al punto con sellado milimétrico de costra caramelizada"',
          en: '"Pan-seared Spanish Tortilla with Artisanal Caramelized Crust"',
          de: '"Spanische Tortilla mit feingoldener Krustensiegelung nach Meisterart"'
        },
        whyItHappened: {
          es: 'Falta de grasa lubricante en el fondo o temperatura excesiva que provocó que el almidón de la patata gelatinizara directamente contra microporos del metal.',
          en: 'Lack of lubricating oil layer or excessive surface temp causing potato starches to gelatinize directly into metal micro-pores.',
          de: 'Zu wenig Öl oder zu hohe Anfangshitze führten dazu, dass Stärke direkt in den Mikroporen der Pfanne verklebte.'
        },
        steps: [
          {
            es: '1. ¡RETIRA LA SARTÉN DEL FUEGO YA! No dejes que la caramelización se convierta en carbón.',
            en: '1. REMOVE PAN FROM HEAT NOW! Do not let caramelization turn into carbon.',
            de: '1. PFANNE SOFORT VOM HERD NEHMEN! Keine Verbrennung riskieren.'
          },
          {
            es: '2. Vierte un hilo continuo de AOVE virgen extra (15-20 ml) por todo el borde interior perimetral.',
            en: '2. Pour a thin continuous stream of extra virgin olive oil (15-20 ml) along the entire inside perimeter wall.',
            de: '2. Einen dünnen Strahl natives Olivenöl extra (15-20 ml) rundherum am Innenrand entlanggießen.'
          },
          {
            es: '3. Deja reposar la sartén 30 segundos fuera del calor. La diferencia térmica contrae el metal y la patata, permitiendo que el aceite descienda por capilaridad bajo la tortilla.',
            en: '3. Let rest off the burner for 30 seconds. Thermal contraction separates the metal and potato, drawing oil underneath via capillary action.',
            de: '3. 30 Sekunden abseits der Hitze stehen lassen. Die Abkühlung zieht das Metall und die Kartoffel zusammen; das Öl kriecht unter den Boden.'
          },
          {
            es: '4. Con un plato plano o viratortillas ligeramente engrasado sobre la sartén, dale un golpe seco y firme al mango de la sartén con la palma de la mano en ángulo de 45°.',
            en: '4. Place an oiled flat plate on top, then give the skillet handle a firm, decisive 45° palm tap.',
            de: '4. Geölten flachen Teller auflegen und mit der flachen Hand einen gezielten 45°-Schlag gegen den Pfannenstiel setzen.'
          },
          {
            es: '5. ¡Volteo decidido! Vuelve a deslizarla a la sartén engrasada para cuajar la segunda cara.',
            en: '5. Decisive flip! Slide it back into the freshly oiled pan to cook the second side.',
            de: '5. Entschlossener Schwung! Zurück in die geölte Pfanne gleiten lassen.'
          }
        ],
        equipmentNeeded: [
          { es: 'Aceite de oliva virgen extra', en: 'Extra virgin olive oil', de: 'Natives Olivenöl extra' },
          { es: 'Plato llano o viratortillas más ancho que la sartén', en: 'Flat plate wider than the pan', de: 'Flacher Teller breiter als die Pfanne' },
          { es: 'Espátula de silicona suave (nunca metal)', en: 'Soft silicone spatula', de: 'Silikon-Spatel (kein Metall)' }
        ],
        proTip: {
          es: 'Nunca uses estropajos metálicos para limpiar tu sartén de tortilla. Reserva una sartén exclusivamente para huevos y cúrala con sal gorda templada.',
          en: 'Never use steel wool on your tortilla pan. Dedicate one skillet exclusively to eggs and maintain it strictly.',
          de: 'Niemals Stahlschwämme für die Tortilla-Pfanne nutzen. Am besten eine Pfanne exklusiv für Eierspeisen reservieren.'
        }
      },
      'sol-perimeter-lubrication': {
        id: 'sol-perimeter-lubrication',
        codeName: {
          es: 'Operación Descompresión Suave con Espátula de Silicona',
          en: 'Operation Soft Silicone Decompression',
          de: 'Sanfte Silikon-Dekompression'
        },
        successRate: '85% de salvamento visual',
        timeLimit: { es: '60 segundos de reloj', en: '60 seconds on the clock', de: '60 Sekunden Zeitfenster' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Comprueba que el huevo residual no quede expuesto más de **4 horas** a temperatura ambiente si no se consume al momento.',
          en: 'Ensure raw/semi-raw egg is never left exceeding the **4 hours** room temperature threshold.',
          de: 'Unverzehrte Reste keinesfalls länger als **4 Stunden** bei Raumtemperatur stehen lassen.'
        },
        gourmetBaptism: {
          es: '"Tortilla campera con costra de patata rústica al estilo de taberna"',
          en: '"Rustic Country-Style Spanish Tortilla with Crisp Hearth Crust"',
          de: '"Rustikale Land-Tortilla mit knuspriger Pfannensiegelung"'
        },
        whyItHappened: {
          es: 'La película de almidón se desgarró parcialmente al intentar forzarla sin lubricante térmico.',
          en: 'The starch film partially tore when force was applied without thermal lubricant.',
          de: 'Der Stärkefilm riss ein, als ohne Schmiermittel Druck ausgeübt wurde.'
        },
        steps: [
          {
            es: '1. Retira del fuego de inmediato y agrega 1 cucharada de aceite caliente en el punto desgarrado.',
            en: '1. Remove from heat immediately and spoon 1 tbsp hot olive oil directly into the torn gap.',
            de: '1. Sofort vom Herd nehmen und 1 EL heißes Olivenöl direkt in den Riss träufeln.'
          },
          {
            es: '2. Introduce una espátula de silicona flexible con movimientos horizontales lentos y rasantes, como acariciando el fondo metálico.',
            en: '2. Slide a flexible silicone spatula underneath in gentle, horizontal shaving motions flush against the pan floor.',
            de: '2. Flexiblen Silikonspatel ganz flach ansetzen und vorsichtig horizontal unter den Boden gleiten lassen.'
          },
          {
            es: '3. Una vez desprendido el perímetro, coloca un plato amplio bien engrasado y voltea en un único movimiento firme sin dudar.',
            en: '3. Once freed around the rim, place a generously oiled wide plate and flip in one swift, confident stroke.',
            de: '3. Nach dem Lösen des Rands einen gut geölten Teller aufsetzen und ohne Zögern wenden.'
          }
        ],
        equipmentNeeded: [
          { es: 'Espátula de silicona flexible', en: 'Flexible silicone spatula', de: 'Flexibler Silikonschaber' },
          { es: 'Plato llano grande engrasado', en: 'Large oiled plate', de: 'Großer, eingeölter Teller' }
        ],
        proTip: {
          es: 'Al devolverla a la sartén para la segunda cara, usa la espátula para meter los bordes hacia dentro, ocultando cualquier irregularidad.',
          en: 'When sliding back for the second side, tuck the edges under with your spatula to hide any cosmetic blemishes.',
          de: 'Beim Zurückgleiten die Ränder mit dem Spatel rundherum nach innen drücken – das kaschiert jeden Schönheitsfehler.'
        }
      },
      'sol-scramble-rescue': {
        id: 'sol-scramble-rescue',
        codeName: {
          es: 'Protocolo Fénix: Transformación en Revuelto Meloso Ilustrado',
          en: 'Phoenix Protocol: Transmutation into Supreme Truffled Revuelto',
          de: 'Phönix-Protokoll: Veredelung zum Feinschmecker-Rührei (Revuelto)'
        },
        successRate: '100% de salvamento culinario (0 desperdicio)',
        timeLimit: { es: '¡Acción inmediata antes del humo!', en: 'Immediate action before acrid smoke!', de: 'Sofortige Rettung vor Rauchbildung!' },
        severity: 'critical',
        safetyNote: {
          es: 'Al romper la masa, cocina a calor residual hasta que el huevo alcance un mínimo de **63°C durante 20 segundos** o **70°C durante 2 minutos** para desinfección higiénica perfecta.',
          en: 'When breaking up the mass, stir over gentle heat until egg reaches at least **63°C for 20 seconds** or **70°C for 2 minutes** for total hygiene.',
          de: 'Masse bei milder Resthitze durchschwenken, bis das Ei **63°C für 20 Sekunden** oder **70°C für 2 Minuten** erreicht.'
        },
        gourmetBaptism: {
          es: '"Revuelto de patata pochada en AOVE con yema cremosa y lascas de sal Maldon"',
          en: '"Slow-Poached Potato & Golden Egg Revuelto with Flaky Sea Salt Finish"',
          de: '"Cremiges Kartoffel-Ei-Revuelto mit feinem Olivenöl und Meersalzflocken"'
        },
        whyItHappened: {
          es: 'La base se carbonizó por fuego excesivo y ya no se puede voltear como un disco compacto sin arrastrar amargor.',
          en: 'The base scorched from excess heat and can no longer be flipped as an intact disk without bitter char.',
          de: 'Der Pfannenboden hat verbrannt; als feste Scheibe würde bitterer Brandgeschmack das Gericht ruinieren.'
        },
        steps: [
          {
            es: '1. ¡APAGA EL FUEGO YA! Retira la sartén del foco de calor.',
            en: '1. SHUT OFF HEAT NOW! Pull the pan off the burner.',
            de: '1. HERD SOFORT AUSSCHALTEN! Pfanne von der Hitzequelle ziehen.'
          },
          {
            es: '2. NO rasques el fondo negro. Con una cuchara de madera, rescata la parte superior y media de patata jugosa y huevo meloso.',
            en: '2. DO NOT scrape the black base. Using a wooden spoon, harvest only the juicy potato and creamy egg from the top and middle.',
            de: '2. Den schwarzen Boden NICHT abkratzen! Nur die saftige obere Schicht aus Kartoffeln und Ei abheben.'
          },
          {
            es: '3. Pásala a una fuente o sartén limpia templada con 1 chorrito de AOVE virgen crudo y remueve 15 segundos para formar un revuelto cremoso y brillante.',
            en: '3. Transfer to a warm clean plate with a splash of fresh raw EVOO; stir gently for 15 seconds into a lush, glistening scramble.',
            de: '3. Auf eine saubere Platte mit einem Schuss frischem Olivenöl geben und 15 Sekunden sanft cremig rühren.'
          },
          {
            es: '4. Sirve sobre rebanadas de pan tostado frotadas con ajo o tomate y remata con flor de sal y una pizca de pimentón.',
            en: '4. Heap onto warm toasted bread rubbed with garlic/tomato, topping with flaky salt and a dusting of smoked paprika.',
            de: '4. Auf knuspriges geröstetes Landbrot mit Tomate häufen, Meersalzflocken und eine Prise Pimentón de la Vera darübergeben.'
          }
        ],
        equipmentNeeded: [
          { es: 'Cuchara de madera o silicona', en: 'Wooden or silicone spoon', de: 'Holzlöffel oder Silikonschaber' },
          { es: 'Pan de hogaza tostado crujiente', en: 'Crusty sourdough toast', de: 'Geröstetes Sauerteigbrot' },
          { es: 'Flor de sal o sal en escamas', en: 'Flaky sea salt', de: 'Meersalzflocken' }
        ],
        proTip: {
          es: 'En las mejores tabernas de Madrid y Galicia, el "Revuelto de Betanzos roto sobre pan" cuesta el doble que una tortilla entera. ¡Véndelo como un lujo intencionado!',
          en: 'In high-end tapas bars in Madrid, a broken potato revuelto on sourdough toast costs more than a standard omelette. Own it proudly!',
          de: 'In Top-Tapasbars in Madrid zahlt man für ein gebrochenes Kartoffel-Revuelto oft mehr als für die ganze Tortilla. Verkaufe es als Absicht!'
        }
      },
      'sol-oven-frittata-pivot': {
        id: 'sol-oven-frittata-pivot',
        codeName: {
          es: 'Maniobra Gratinado Cenital: La Frittata Ibérica al Horno',
          en: 'Top-Down Heat Pivot: Iberian Oven-Finished Tortilla',
          de: 'Oberhitze-Wendung: Die iberische Ofen-Tortilla'
        },
        successRate: '95% de éxito sin necesidad de voltear',
        timeLimit: { es: '3 minutos de horno', en: '3 minutes in oven', de: '3 Minuten Ofenzeit' },
        severity: 'salvageable',
        safetyNote: {
          es: 'El calor del horno pasteuriza uniformemente alcanzando **70°C durante 2 minutos**, garantizando total inocuidad.',
          en: 'Convection heat pasteurizes evenly, guaranteeing standard **70°C for 2 minutes** microbial control.',
          de: 'Die Oberhitze pasteurisiert gleichmäßig bis zum Goldstandard von **70°C für 2 Minuten**.'
        },
        gourmetBaptism: {
          es: '"Tortilla al horno de leña con soufflé de yema y costra dorada"',
          en: '"Hearth-Baked Spanish Tortilla with Golden Soufflé Crust"',
          de: '"Ofengebackene Tortilla mit goldbraunem Eiersoufflé-Finish"'
        },
        whyItHappened: {
          es: 'El acero o hierro no curado retiene la proteína por enlaces metálicos. Cambiar la dirección del calor neutraliza el problema.',
          en: 'Unseasoned iron or stainless steel grips egg proteins. Changing the heat vector eliminates the need to flip.',
          de: 'Nicht eingebranntes Eisen bindet Eiweißmoleküle. Oberhitze macht das riskante Wenden überflüssig.'
        },
        steps: [
          {
            es: '1. Enciende el grill o calor superior del horno a 200°C.',
            en: '1. Preheat oven broiler / top grill to 200°C (395°F).',
            de: '1. Backofengrill / Oberhitze auf 200°C vorheizen.'
          },
          {
            es: '2. Si tu sartén tiene mango metálico, métela en la altura superior durante 3 a 4 minutos.',
            en: '2. If the skillet handle is full metal, slide the whole pan into the upper rack for 3-4 minutes.',
            de: '2. Pfanne mit Metallgriff auf die oberste Schiene für 3-4 Minuten stellen.'
          },
          {
            es: '3. Observa cómo la cara superior se infla elegantemente como un soufflé dorado.',
            en: '3. Watch the top surface puff elegantly like a golden soufflé.',
            de: '3. Beobachten, wie die Oberfläche goldbraun und leicht souffliert aufgeht.'
          },
          {
            es: '4. Sirve directamente en la mesa dentro de la propia sartén sobre un salvamanteles rústico de madera.',
            en: '4. Serve directly in the pan at the center of the table on a rustic wooden trivet.',
            de: '4. Direkt in der Pfanne auf einem rustikalen Holzuntersetzer am Tisch servieren.'
          }
        ],
        equipmentNeeded: [
          { es: 'Horno con función grill', en: 'Oven with top broiler', de: 'Backofen mit Grillfunktion' },
          { es: 'Guante térmico de cocina', en: 'Heavy-duty oven mitt', de: 'Ofenhandschuh' }
        ],
        proTip: {
          es: 'Servir en la propia sartén de hierro fundido le da un aire de bistró rústico irresistible a tus invitados.',
          en: 'Serving directly in a cast iron pan gives an irresistible artisan bistro presentation.',
          de: 'Das Servieren direkt in der Gusseisenpfanne wirkt absolut professionell und rustikal.'
        }
      }
    }
  },

  'flip-disaster': {
    id: 'flip-disaster',
    code: 'RED-02',
    iconName: 'RotateCw',
    badge: { es: 'Catástrofe de Vuelco', en: 'Flip Catastrophe', de: 'Wende-Katastrophe' },
    title: {
      es: 'El vuelco ha fallado: hay huevo por la encimera o la vitro',
      en: 'The flip failed: raw egg spilled on the countertop or stove',
      de: 'Wende-Unglück: Flüssiges Ei fließt über Arbeitsplatte oder Herd'
    },
    subtitle: {
      es: 'La masa se ha descuajeringado y la cocina parece una zona de guerra.',
      en: 'The omelette came apart and the stovetop looks like a splash zone.',
      de: 'Die Masse ist auseinandergefallen und die Küche gleicht einem Schlachtfeld.'
    },
    description: {
      es: 'Momento de máximo estrés culinario: plato demasiado pequeño, vacilación en el giro o falta de inercia.',
      en: 'Peak kitchen terror: undersized plate, hesitation mid-turn, or lack of momentum.',
      de: 'Der ultimative Schreckmoment: zu kleiner Teller, Zögern beim Schwung oder feuchte Finger.'
    },
    initialQuestionId: 'q-flip-1',
    questions: {
      'q-flip-1': {
        id: 'q-flip-1',
        question: {
          es: '¿Dónde está la mayor parte de la masa en este instante?',
          en: 'Where is the majority of the food mass located right now?',
          de: 'Wo befindet sich die meiste Masse in diesem Augenblick?'
        },
        context: {
          es: 'Evaluemos las pérdidas materiales y el estado de la emulsión restante.',
          en: 'Assess material volume losses and structural emulsion integrity.',
          de: 'Prüfen wir die Verlustmenge und den Zustand der Restemulsion.'
        },
        operatorCommentary: {
          es: 'Operador: "¡No limpies la encimera todavía! Primero salvamos la comida, luego vendrá el estropajo."',
          en: 'Operator: "Do NOT wipe the countertop yet! Save the food first, the sponge can wait."',
          de: 'Zentrale: "Arbeitsplatte jetzt NICHT putzen! Zuerst retten wir das Essen, gewischt wird danach."'
        },
        options: [
          {
            id: 'o-flip-plate',
            text: {
              es: 'Queda al menos un 60-70% en el plato o en la sartén, pero se ha abierto y gotea huevo.',
              en: 'At least 60-70% is still on the plate or in the pan, but it cracked and leaks egg.',
              de: 'Mindestens 60-70% sind auf Teller/Pfanne, aber die Masse ist aufgeplatzt.'
            },
            nextQuestionId: 'q-flip-integrity'
          },
          {
            id: 'o-flip-mess',
            text: {
              es: 'Ha caído casi todo fuera o se ha desintegrado en trozos desparramados.',
              en: 'Almost everything splashed outside or disintegrated into fragmented chunks.',
              de: 'Fast alles ist danebengegangen oder in unzählige Stücke zerbrochen.'
            },
            solutionId: 'sol-betanzos-tosta'
          },
          {
            id: 'o-flip-folded',
            text: {
              es: 'Aterrizó doblada sobre sí misma como una empanadilla gigante.',
              en: 'It landed folded completely onto itself like a massive calzone.',
              de: 'Sie landete zur Hälfte umgeklappt wie eine gigantische Teigtasche.'
            },
            solutionId: 'sol-calzone-tuck'
          }
        ]
      },
      'q-flip-integrity': {
        id: 'q-flip-integrity',
        question: {
          es: '¿El huevo derramado cayó sobre la placa de inducción/gas caliente?',
          en: 'Did the spilled liquid egg hit the hot active stove burner?',
          de: 'Ist flüssiges Ei auf das heiße Kochfeld/den Brenner geflossen?'
        },
        context: {
          es: 'El huevo quemado en placa emite compuestos azufrados que pueden contaminar el aroma de tu comida.',
          en: 'Burned egg on stovetops generates sulfurous fumes that can taint kitchen aromas.',
          de: 'Auf heißem Glas verbrennendes Ei riecht schweflig und kann den Geschmack beeinträchtigen.'
        },
        operatorCommentary: {
          es: 'Operador: "Si hay humo en la vitro, aparta la sartén a otra hornilla fría inmediatamente."',
          en: 'Operator: "If the glass stove is smoking, slide your pan to an unheated cold zone immediately."',
          de: 'Zentrale: "Wenn es auf der Platte raucht: Pfanne sofort auf eine kalte Nebenplatte schieben!"'
        },
        options: [
          {
            id: 'o-stove-clean',
            text: {
              es: 'No, cayó en la encimera fría o en el plato auxiliar.',
              en: 'No, it landed on the cold counter or auxiliary plate.',
              de: 'Nein, es tropfte nur auf die kalte Arbeitsfläche oder den Teller.'
            },
            solutionId: 'sol-calzone-tuck'
          },
          {
            id: 'o-stove-smoking',
            text: {
              es: 'Sí, hay huevo chisporroteando en el fuego caliente.',
              en: 'Yes, egg is sizzling and smoking on the hot surface.',
              de: 'Ja, Ei zischt und raucht auf dem heißen Kochfeld.'
            },
            solutionId: 'sol-tourniquet-recenter'
          }
        ]
      }
    },
    solutions: {
      'sol-tourniquet-recenter': {
        id: 'sol-tourniquet-recenter',
        codeName: {
          es: 'Operación Torniquete: Contención y Sellado Ovalado',
          en: 'Operation Tourniquet: Resealing & Oval French Folding',
          de: 'Operation Tourniquet: Randsiegelung und ovales Falten'
        },
        successRate: '88% de salvamento estético y jugosidad intacta',
        timeLimit: { es: '¡Tienes 25 segundos antes de que se seque!', en: 'You have 25 seconds before dry-out!', de: '25 Sekunden bis zum Austrocknen!' },
        severity: 'critical',
        safetyNote: {
          es: 'Una vez plegada y sellada la costra exterior, mantén fuego suave para asegurar **63°C durante 20 segundos** en el núcleo de huevo.',
          en: 'Once edges are tucked and exterior is sealed, ensure inner core maintains **63°C for 20 seconds**.',
          de: 'Nach dem Einschlagen der Ränder sicherstellen, dass das Innere **63°C für 20 Sekunden** erreicht.'
        },
        gourmetBaptism: {
          es: '"Tortilla ovalada a la minuta con corazón meloso estilo Betanzos"',
          en: '"Oval-Folded Betanzos-Style Omelette with Molten Core"',
          de: '"Ovale Tortilla à la minute mit saftigem Betanzos-Schmelzkern"'
        },
        whyItHappened: {
          es: 'Vacilación en el milisegundo crítico del giro o uso de un plato cóncavo en lugar de completamente plano.',
          en: 'Hesitation during the critical microsecond of turning or using a concave bowl-plate.',
          de: 'Zögern im entscheidenden Sekundenbruchteil oder Verwendung eines tiefen statt flachen Tellers.'
        },
        steps: [
          {
            es: '1. Mueve la sartén a un fuego limpio a potencia media-alta con 1 cucharada de AOVE limpio.',
            en: '1. Move pan to an unsoiled burner at medium-high heat with 1 tbsp clean EVOO.',
            de: '1. Pfanne auf saubere Kochstelle bei mittlerer bis hoher Hitze mit 1 EL frischem Olivenöl stellen.'
          },
          {
            es: '2. Desliza la masa del plato a la sartén sin dudar, acompañándola con la espátula.',
            en: '2. Slide the mass from the plate into the pan immediately, guiding it with your spatula.',
            de: '2. Die Masse zügig vom Teller in die Pfanne gleiten lassen und mit dem Spatel führen.'
          },
          {
            es: '3. En lugar de forzar un círculo perfecto, usa la espátula para empujar los dos extremos hacia dentro, dándole forma de balón de rugby o tortilla francesa clásica.',
            en: '3. Instead of forcing a perfect circle, use your spatula to tuck both outer ends inward, creating an elegant oval rugby-ball silhouette.',
            de: '3. Nicht zum Kreis zwingen! Beide Enden mit dem Spatel nach innen schlagen – elegante ovale Form bilden.'
          },
          {
            es: '4. Agita la sartén en vaivén 20 segundos para que el huevo crudo selle los pliegues como pegamento natural de albúmina.',
            en: '4. Shake pan back and forth for 20 seconds; the residual egg will seal the seams like natural culinary glue.',
            de: '4. Pfanne 20 Sekunden vor- und zurückrütteln; das flüssige Ei versiegelt die Falten perfekt.'
          },
          {
            es: '5. Vuelca al plato limpio de presentación: los pliegues quedan abajo, la cara lisa arriba.',
            en: '5. Roll onto a clean serving platter: seams facing down, perfectly smooth face up.',
            de: '5. Auf eine saubere Servierplatte stürzen: Naht nach unten, glatte Seite nach oben.'
          }
        ],
        equipmentNeeded: [
          { es: 'Espátula de silicona suave', en: 'Silicone spatula', de: 'Silikonspatel' },
          { es: 'Plato nuevo de servicio limpio', en: 'Clean presentation platter', de: 'Saubere Servierplatte' }
        ],
        proTip: {
          es: 'Nadie sospechará jamás que hubo un accidente: la forma ovalada es el estándar de oro de la alta cocina francesa clásica.',
          en: 'No guest will ever suspect an accident: the oval fold is the gold standard of classical French gastronomy.',
          de: 'Niemand ahnt ein Malheur: Die ovale Mandelform gilt in der Haute Cuisine als Königsdisziplin.'
        }
      },
      'sol-calzone-tuck': {
        id: 'sol-calzone-tuck',
        codeName: {
          es: 'El Abrazo Ibérico: Técnica Calzone de Sartenada',
          en: 'The Iberian Fold: Skillet Calzone Sealing',
          de: 'Der iberische Umschlag: Calzone-Pfannensiegelung'
        },
        successRate: '94% de éxito y textura ultracremosa',
        timeLimit: { es: '45 segundos de sellado', en: '45 seconds to seal', de: '45 Sekunden Versiegelung' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Al quedar más gruesa por el doblado, asegúrate de cocinar 1 minuto por cada lado para que el calor penetre y alcance los **63°C** de seguridad bacteriológica.',
          en: 'Since the fold creates double thickness, cook 1 minute per side so heat penetrates to microbiological safety standards (**63°C**).',
          de: 'Durch die doppelte Dicke jede Seite 1 Minute sanft garen, damit der Kern sichere **63°C** erreicht.'
        },
        gourmetBaptism: {
          es: '"Calzone de tortilla española a la antigua con corazón fluido"',
          en: '"Folded Iberian Calzone Omelette with Melting Yolk Reservoir"',
          de: '"Gefaltete iberische Calzone-Tortilla mit saftig-flüssigem Kern"'
        },
        whyItHappened: {
          es: 'El plato se separó unos milímetros de la sartén durante el arco del giro, provocando el colapso del hemisferio.',
          en: 'The plate separated slightly from the pan lip mid-arc, folding the hemisphere on impact.',
          de: 'Der Teller hob beim Schwung kurz vom Pfannenrand ab, wodurch die Hälfte umklappte.'
        },
        steps: [
          {
            es: '1. ¡NO intentes desdoblarla! Romperás la estructura por completo.',
            en: '1. DO NOT try to unfold it! It will rupture completely.',
            de: '1. NICHT versuchen, sie wieder aufzuklappen! Das zerreißt alles.'
          },
          {
            es: '2. Acepta la forma doblada como una empanadilla gigante de patata.',
            en: '2. Embrace the fold like an artisan oversized potato turnover.',
            de: '2. Die Klappform wie eine meisterhafte gefüllte Teigtasche annehmen.'
          },
          {
            es: '3. Con la espátula, sella el borde semicircular presionando ligeramente contra el fondo caliente.',
            en: '3. Use spatula to press along the semicircular edge against the hot pan to crimp-seal it.',
            de: '3. Mit dem Spatel den halbrunden Rand am Pfannenboden leicht andrücken und versiegeln.'
          },
          {
            es: '4. Dale la vuelta con la espátula (ahora es muy fácil al tener la mitad de diámetro) y cocina 45 segundos el otro lado.',
            en: '4. Flip it gently with a spatula (it is trivial now at half the diameter) and cook 45 seconds on the reverse.',
            de: '4. Mit dem Spatel wenden (halb so groß = kinderleicht) und 45 Sekunden fertigbacken.'
          }
        ],
        equipmentNeeded: [
          { es: 'Espátula ancha', en: 'Wide spatula', de: 'Breiter Pfannenwender' }
        ],
        proTip: {
          es: 'Corta rebanadas transversales como si fuera un pastel: cada porción revelará un centro ultra jugoso atrapado en un estuche de patata dorada.',
          en: 'Slice crosswise like a savory strudel: each portion reveals an ultra-creamy center encased in golden crust.',
          de: 'Wie einen Strudel in Tranchen schneiden: Jede Portion zeigt einen himmlisch saftigen Kern.'
        }
      },
      'sol-betanzos-tosta': {
        id: 'sol-betanzos-tosta',
        codeName: {
          es: 'Plan Taberna Ilustrada: Tostas de Betanzos Deconstruidas',
          en: 'Tavern Plan: Deconstructed Betanzos Sourdough Canapés',
          de: 'Tabernen-Plan: Dekonstruierte Betanzos-Bruschetta'
        },
        successRate: '100% (La cena más aclamada de la noche)',
        timeLimit: { es: '1 minuto de montaje', en: '1 minute assembly', de: '1 Minute Anrichtezeit' },
        severity: 'critical',
        safetyNote: {
          es: 'Si el huevo derramado tocó superficies frías no higienizadas, deséchalo y utiliza únicamente la masa rescatada de la sartén caliente (a >**70°C**).',
          en: 'Discard any liquid that touched unwashed surfaces; serve only the heated mass (>**70°C**) from the pan.',
          de: 'Verschüttetes Ei auf unsterilen Flächen verwerfen; nur die erhitzte Masse (>**70°C**) aus der Pfanne nutzen.'
        },
        gourmetBaptism: {
          es: '"Tostas de hogaza gallega con delicias de patata pochada y yema campestre"',
          en: '"Artisan Galician Sourdough Toasts with Runny Golden Potato Emulsion"',
          de: '"Galicische Sauerteig-Tostas mit geschmolzener Landei-Kartoffel-Emulsion"'
        },
        whyItHappened: {
          es: 'Rotura catastrófica de la contención estructural del disco.',
          en: 'Catastrophic rupture of disc structural containment.',
          de: 'Vollständiger struktureller Bruch der Scheibenform.'
        },
        steps: [
          {
            es: '1. Corta 4 a 6 rebanadas gruesas de buen pan de hogaza o masa madre.',
            en: '1. Cut 4 to 6 thick slices of good sourdough or rustic bread.',
            de: '1. 4 bis 6 dicke Scheiben gutes Sauerteigbrot abschneiden.'
          },
          {
            es: '2. Tuesta el pan en tostadora o en otra sartén con un poco de AOVE hasta que cruja.',
            en: '2. Toast bread until crisp and golden in a toaster or pan with olive oil.',
            de: '2. Brot mit etwas Olivenöl goldbraun und rösch toasten.'
          },
          {
            es: '3. Vuelve a calentar la masa rota en la sartén 20 segundos a fuego medio para ligar los jugos.',
            en: '3. Warm the broken mass in your skillet for 20 seconds to marry the warm juices.',
            de: '3. Die Masse in der Pfanne 20 Sekunden durchschwenken, um den Saft zu binden.'
          },
          {
            es: '4. Corona cada rebanada generosamente con la mezcla caliente y termina con flor de sal, unas gotas de AOVE crudo y pimentón ahumado.',
            en: '4. Mound onto the toasts, crowning with flaky salt, raw extra virgin olive oil, and smoked paprika.',
            de: '4. Großzügig auf die Tostas schichten, mit Meersalzflocken, nativem Olivenöl und Rauchpaprika krönen.'
          }
        ],
        equipmentNeeded: [
          { es: 'Pan de masa madre o rústico', en: 'Sourdough bread', de: 'Sauerteigbrot' },
          { es: 'Tostadora o sartén secundaria', en: 'Toaster', de: 'Toaster oder Grillpfanne' }
        ],
        proTip: {
          es: 'Si tienes a mano unas lascas de jamón ibérico o cecina, colócalas encima: la grasa se fundirá con el calor residual creando una tapa de estrella Michelin.',
          en: 'Drape with cured Iberian ham or cecina if available: the fat melts into the warm egg creating a Michelin-worthy tapa.',
          de: 'Mit etwas Iberico-Schinken belegen: Das Fett schmilzt in das warme Ei – pure Gourmetklasse!'
        }
      }
    }
  },

  'thermal-mirage': {
    id: 'thermal-mirage',
    code: 'RED-03',
    iconName: 'Thermometer',
    badge: { es: 'Fallo Térmico', en: 'Thermal Anomaly', de: 'Thermisches Paradoxon' },
    title: {
      es: 'El Espejismo Térmico: Quemándose fuera, helada dentro',
      en: 'The Thermal Mirage: Burning exterior, frozen / raw interior',
      de: 'Das thermische Paradoxon: Außen dunkelbraun, innen eiskalt'
    },
    subtitle: {
      es: 'La corteza está a punto de arder pero el corazón parece masa cruda fría.',
      en: 'The crust is nearing burnt state while the center is cold soup.',
      de: 'Die Kruste droht zu verbrennen, während der Kern noch kalt und flüssig ist.'
    },
    description: {
      es: 'Gradiente térmico descompensado provocado por fuego excesivo o patatas incorporadas frías de la nevera.',
      en: 'Unbalanced thermal gradient caused by fierce flame or cold pre-cooked potatoes from the fridge.',
      de: 'Extremes Temperaturgefälle durch zu aggressive Hitze oder kühlschrankkalte Kartoffeln.'
    },
    initialQuestionId: 'q-therm-1',
    questions: {
      'q-therm-1': {
        id: 'q-therm-1',
        question: {
          es: '¿Cómo de oscura está la superficie exterior de la tortilla?',
          en: 'How dark is the outer surface of your omelette?',
          de: 'Wie dunkel ist die äußere Kruste?'
        },
        context: {
          es: 'Debemos saber si la cara de contacto aún tolera calor directo o si requiere calor difuso.',
          en: 'We need to determine if the contact surface can tolerate direct heat or requires indirect diffusion.',
          de: 'Wir müssen klären, ob der Boden noch direkte Hitze verträgt oder indirekte Wärme braucht.'
        },
        operatorCommentary: {
          es: 'Operador: "El fuego nuclear es el mayor enemigo de la tortilla gruesa. Bajemos revoluciones antes de que se produzca acrilamida amarga."',
          en: 'Operator: "Volcanic flame is the greatest enemy of a thick tortilla. Let us bring the temperature down before acrid char develops."',
          de: 'Zentrale: "Zu hohe Flamme ist der Feind jeder dicken Tortilla. Wir müssen die Hitze sofort drosseln."'
        },
        options: [
          {
            id: 'o-therm-medium',
            text: {
              es: 'Dorado avellana / tostado moderado: aguanta calor suave pero no fuego vivo.',
              en: 'Hazelnut golden / moderate toast: can take gentle low heat but no flame.',
              de: 'Haselnussbraun: verträgt noch sanfte milde Wärme, aber kein offenes Feuer.'
            },
            solutionId: 'sol-dome-convection'
          },
          {
            id: 'o-therm-dark',
            text: {
              es: 'Marrón oscuro al límite del desastre: 30 segundos más de sartén y se quemará.',
              en: 'Dark brown on the razor edge of disaster: 30 more seconds in the skillet and it burns.',
              de: 'Dunkelbraun am Rande der Katastrophe: 30 Sekunden mehr und es verbrennt.'
            },
            nextQuestionId: 'q-therm-oven'
          },
          {
            id: 'o-therm-hard-potato',
            text: {
              es: '¡No solo está fría, sino que la patata está DURA como una manzana cruda!',
              en: 'Not only is it cold, but the potatoes inside are CRUNCHY like raw apples!',
              de: 'Nicht nur kalt: Die Kartoffeln sind hart wie rohe Äpfel!'
            },
            solutionId: 'sol-madrid-stew-rescue'
          }
        ]
      },
      'q-therm-oven': {
        id: 'q-therm-oven',
        question: {
          es: '¿Tienes un horno o microondas a mano para aplicar calor volumétrico?',
          en: 'Do you have an oven or microwave available for volumetric heating?',
          de: 'Hast du einen Ofen oder eine Mikrowelle für volumetrische Wärme greifbar?'
        },
        context: {
          es: 'La radiación de sartén es puramente conductiva. Para calentar el centro sin tocar la piel externa necesitamos convección o microondas.',
          en: 'Pan heat is conductive. Warming the core without burning the crust requires convection or microwave energy.',
          de: 'Pfannenwärme ist Konduktion. Um den Kern zu garen ohne die Haut zu verbrennen, hilft Konvektion.'
        },
        operatorCommentary: {
          es: 'Operador: "El microondas o el horno suave a 140°C calientan el agua del interior por agitación dipolar sin aplicar fuego a la piel quemada."',
          en: 'Operator: "A gentle 140°C oven warms internal moisture through radiant air, bypassing the scorched skin."',
          de: 'Zentrale: "Ein sanfter Ofen bei 140°C bringt das Innere auf Temperatur, ohne die Kruste weiter zu bräunen."'
        },
        options: [
          {
            id: 'o-oven-yes',
            text: {
              es: 'Sí, tengo horno disponible.',
              en: 'Yes, I have an oven ready.',
              de: 'Ja, Backofen ist vorhanden.'
            },
            solutionId: 'sol-gentle-oven-core'
          },
          {
            id: 'o-oven-no',
            text: {
              es: 'No, solo tengo los fogones de la cocina.',
              en: 'No, only the stovetop burners.',
              de: 'Nein, nur das Kochfeld.'
            },
            solutionId: 'sol-dome-convection'
          }
        ]
      }
    },
    solutions: {
      'sol-dome-convection': {
        id: 'sol-dome-convection',
        codeName: {
          es: 'Protocolo Cúpula: Convección por Tapa a Fuego Mínimo',
          en: 'Dome Protocol: Low-Heat Trapped Convection',
          de: 'Kuppel-Protokoll: Sanfte Dampfkonvektion unter Deckel'
        },
        successRate: '92% de equilibrio térmico',
        timeLimit: { es: '3 minutos de cocción lenta', en: '3 minutes of slow heat', de: '3 Minuten Schongaren' },
        severity: 'salvageable',
        safetyNote: {
          es: 'El vapor recirculante elevará la temperatura interna a los **63°C durante 20 segundos**, alcanzando la pasteurización higiénica sin endurecer la yema.',
          en: 'Circulating steam drives core temperature above **63°C for 20 seconds**, achieving microbiological safety without chalkiness.',
          de: 'Der zirkulierende Dampf hebt den Kern auf sichere **63°C für 20 Sekunden**, ohne das Eigelb auszutrocknen.'
        },
        gourmetBaptism: {
          es: '"Tortilla con acabado en cámara de vapor y núcleo meloso"',
          en: '"Slow-Steamed Hearth Tortilla with Tender Satin Center"',
          de: '"Sanft dampfgegarte Tortilla mit samtig-saftigem Kern"'
        },
        whyItHappened: {
          es: 'Fuego demasiado alto que selló la albúmina superficial antes de que el calor pudiera transferirse por conducción hacia el centro frío.',
          en: 'Flame was too high, setting surface albumin before heat could conduct to the cold center.',
          de: 'Zu starke Hitze schloss die Oberfläche ab, bevor Wärme durch Wärmeleitung ins Innere vordringen konnte.'
        },
        steps: [
          {
            es: '1. Baja el fuego al mínimo absoluto (potencia 2 de 10 en vitrocerámica o la llama más pequeña en gas).',
            en: '1. Drop heat to absolute minimum (level 2 out of 10 or lowest gas simmer).',
            de: '1. Hitze auf das absolute Minimum drosseln (Stufe 2 von 10).'
          },
          {
            es: '2. Coloca una tapadera metálica curva o plato hondo invertido sobre la sartén para atrapar el vapor.',
            en: '2. Place a domed metal lid or inverted heat-proof bowl over the skillet to trap convection currents.',
            de: '2. Einen gewölbten Deckel oder hitzefesten Teller umgedreht aufsetzen, um den Dampf zu fangen.'
          },
          {
            es: '3. Si la base está muy seca, vierte 1 cucharadita de agua en el borde de la sartén justo antes de tapar: el vapor instantáneo acelerará la transferencia térmica sin aguar la masa.',
            en: '3. If the bottom is bone dry, add 1 tsp water at the far rim right before sealing: flash steam accelerates thermal conduction.',
            de: '3. Wenn der Boden trocken ist, 1 TL Wasser am Rand zugeben: Blitzdampf beschleunigt den Hitzetransfer.'
          },
          {
            es: '4. Mantén tapado 2 minutos y medio. Apaga el fuego y deja reposar tapado otros 60 segundos con calor residual.',
            en: '4. Keep sealed for 2.5 minutes. Turn off heat and rest covered for 60 seconds on residual heat.',
            de: '4. 2,5 Minuten abgedeckt garen. Herd ausschalten und 60 Sekunden in der Resthitze ruhen lassen.'
          }
        ],
        equipmentNeeded: [
          { es: 'Tapa curva de sartén o plato hondo metálico', en: 'Curved skillet lid', de: 'Gewölbter Pfannendeckel' }
        ],
        proTip: {
          es: 'La condensación dentro de la cúpula calienta el huevo uniformemente sin añadir un solo grado extra a la base dorada.',
          en: 'Condensation inside the dome warms egg uniformly without adding thermal stress to the base.',
          de: 'Das Dampfklima wärmt den Kern schonend durch, ohne die Unterseite weiter zu bräunen.'
        }
      },
      'sol-gentle-oven-core': {
        id: 'sol-gentle-oven-core',
        codeName: {
          es: 'Incursión Volumétrica: Termalización al Horno Suave',
          en: 'Volumetric Incursion: Gentle 140°C Oven Thermalization',
          de: 'Volumetrische Rettung: Schonendes Ofenbad bei 140°C'
        },
        successRate: '97% de rescate sin quemar',
        timeLimit: { es: '4 minutos de horno suave', en: '4 minutes gentle oven', de: '4 Minuten Sanftbacken' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Este método garantiza alcanzar el estándar higiénico de oro: **70°C durante 2 minutos** en todo el volumen.',
          en: 'This method uniformly achieves the gold safety threshold: **70°C for 2 minutes** throughout the volume.',
          de: 'Erreicht mühelos den mikrobiologischen Goldstandard von **70°C für 2 Minuten**.'
        },
        gourmetBaptism: {
          es: '"Tortilla española con cuajado envolvente a la piedra"',
          en: '"Stone-Oven Finished Spanish Tortilla with Uniform Custard Center"',
          de: '"Im Steinofen sanft durchgezogene Tortilla Española"'
        },
        whyItHappened: {
          es: 'La masa tenía demasiado grosor para una cocción exclusiva por conducción de placa.',
          en: 'The omelette was too thick for pure bottom-up conductive stovetop cooking.',
          de: 'Die Tortilla war zu dick für reine Kontaktwärme von unten.'
        },
        steps: [
          {
            es: '1. Retira la sartén del fuego de inmediato.',
            en: '1. Pull the pan off the stovetop right now.',
            de: '1. Pfanne sofort von der Herdplatte nehmen.'
          },
          {
            es: '2. Precalienta el horno a 140°C–150°C (sin grill, calor arriba y abajo).',
            en: '2. Heat oven to 140°C–150°C (285°F) with top and bottom bake (no broiler).',
            de: '2. Backofen auf 140°C–150°C Ober-/Unterhitze einstellen (kein Grill).'
          },
          {
            es: '3. Si la sartén es apta para horno, introdúcela en la rejilla media. Si el mango no es apto, desliza la tortilla a una fuente redonda de horno.',
            en: '3. If oven-safe, slide pan onto middle rack. If the handle is plastic, slide tortilla onto a round baking dish.',
            de: '3. Ofenfeste Pfanne auf die mittlere Schiene schieben. Andernfalls auf eine runde Auflaufform gleiten lassen.'
          },
          {
            es: '4. Hornea durante 4 a 5 minutos: la masa interna alcanzará los 65°C-70°C sin dorar más la piel externa.',
            en: '4. Bake for 4-5 minutes: inner core reaches 65°C-70°C without darkening the exterior.',
            de: '4. 4 bis 5 Minuten backen: Das Innere gart auf 65°C-70°C durch, ohne außen dunkler zu werden.'
          }
        ],
        equipmentNeeded: [
          { es: 'Horno precalentado a 140°C', en: 'Oven at 140°C', de: 'Backofen auf 140°C' },
          { es: 'Fuente de horno o sartén con mango metálico', en: 'Baking dish or metal-handle pan', de: 'Auflaufform oder ofenfeste Pfanne' }
        ],
        proTip: {
          es: 'Al sacarla, déjala reposar 2 minutos: la inercia térmica completará el cuajado perfecto.',
          en: 'Let rest for 2 minutes after baking: thermal inertia finishes the custard texture.',
          de: 'Nach dem Backen 2 Minuten ruhen lassen: Die Resthitze sorgt für perfekten Schmelz.'
        }
      },
      'sol-madrid-stew-rescue': {
        id: 'sol-madrid-stew-rescue',
        codeName: {
          es: 'Guiso de Rescate Tradicional: La Tortilla Guisada Madrileña',
          en: 'Traditional Rescue Stew: Madrilenian Braised Tortilla',
          de: 'Traditionelles Rettungsgulasch: Madrider Tortilla Guisada'
        },
        successRate: '100% de transformación en manjar de taberna',
        timeLimit: { es: '10 minutos de chup-chup', en: '10 minutes gentle braise', de: '10 Minuten leichtes Köcheln' },
        severity: 'critical',
        safetyNote: {
          es: 'Al cocer en caldo hirviendo a más de 95°C durante varios minutos, supera con creces el estándar de **70°C durante 2 minutos** y elimina cualquier riesgo microbiológico.',
          en: 'Simmering in hot broth above 95°C for several minutes vastly exceeds the **70°C for 2 minutes** hygiene rule.',
          de: 'Das Köcheln in heißer Brühe über 95°C übertrifft mühelos die Sicherheitsnorm von **70°C für 2 Minuten**.'
        },
        gourmetBaptism: {
          es: '"Tortilla de patatas guisada en fondo de corral con pimentón de la Vera (Receta histórica de taberna castiza)"',
          en: '"Braised Spanish Tortilla in Rich Poultry Broth with Smoked Paprika"',
          de: '"Madrider Tortilla Guisada: Geschmorte Kartoffel-Tortilla in würziger Brühe mit Pimentón"'
        },
        whyItHappened: {
          es: 'Las patatas se frieron a fuego demasiado violento: el exterior se doró pero la fécula interior nunca superó los 60°C para gelatinizar.',
          en: 'Potatoes were fried in overly hot oil: the outside browned but internal starch never hit the 60°C required to gelatinize.',
          de: 'Kartoffeln wurden in zu heißem Fett frittiert: außen gebräunt, aber innen blieb die Stärke ungegart.'
        },
        steps: [
          {
            es: '1. Asume la realidad con nobleza: una patata cruda no se ablandará en la sartén sin quemar la tortilla. ¡Vamos a crear una joya gastronómica madrileña!',
            en: '1. Accept reality with dignity: raw crunchy potatoes will not soften in a dry pan. We are pivoting to an acclaimed Madrid tavern delicacy!',
            de: '1. Mut zur Wahrheit: Rohe harte Kartoffeln werden in der Pfanne nicht weich. Wir zaubern daraus einen Madrider Klassiker!'
          },
          {
            es: '2. Corta la tortilla en dados grandes de 3 a 4 cm.',
            en: '2. Cut the firm omelette into handsome 3-4 cm cubes.',
            de: '2. Die Tortilla in 3-4 cm große Würfel schneiden.'
          },
          {
            es: '3. En una cazuela o sartén honda, sofríe 1 diente de ajo laminado en un chorro de AOVE, añade 1 cucharadita de pimentón de la Vera dulce y 250 ml de caldo de pollo o verduras caliente.',
            en: '3. In a shallow pot, sauté 1 sliced garlic clove in EVOO, add 1 tsp sweet smoked paprika, and pour in 250 ml hot chicken or vegetable broth.',
            de: '3. In einem Schmortopf 1 Knoblauchzehe in Olivenöl anschwitzen, 1 TL Pimentón de la Vera zugeben und mit 250 ml heißer Geflügelbrühe ablöschen.'
          },
          {
            es: '4. Introduce los dados de tortilla en el caldo hirviendo suave, tapa y cocina 8 a 10 minutos a fuego lento.',
            en: '4. Slide the tortilla cubes into the simmering broth, cover, and gently braise for 8-10 minutes.',
            de: '4. Tortillawürfel in die Brühe legen, Deckel aufsetzen und 8-10 Minuten sanft köcheln lassen.'
          },
          {
            es: '5. La patata absorberá el caldo sabroso hasta quedar tierna como mantequilla, y el huevo esponjará formando una salsa ligada con almidón que es gloria bendita.',
            en: '5. Potatoes absorb the broth until melt-in-mouth tender; the egg swells like savory sponge cake, thickening the sauce into sheer bliss.',
            de: '5. Die Kartoffeln saugen die Brühe auf und werden butterweich; das Ei quillt wie feiner Biskuit und bindet die Sauce traumhaft.'
          }
        ],
        equipmentNeeded: [
          { es: 'Cazuela baja o sartén honda', en: 'Shallow pot or deep skillet', de: 'Schmortopf oder tiefe Pfanne' },
          { es: 'Caldo de ave o verduras caliente', en: 'Hot broth', de: 'Heiße Gemüse- oder Geflügelbrühe' },
          { es: 'Pimentón de la Vera dulce', en: 'Sweet smoked paprika', de: 'Edelsüßer Rauchpaprika' }
        ],
        proTip: {
          es: 'La tortilla guisada es un icono histórico de los mejores figones de Madrid (como Casa Paco o Taberna La Bola). Tus invitados te pedirán la receta pensando que tardaste dos días en diseñarla.',
          en: 'Tortilla guisada is an iconic secret weapon in historic Madrid taverns. Guests will praise your culinary genius.',
          de: 'Tortilla Guisada ist eine geschützte Legende alter Madrider Wirtshäuser. Deine Gäste werden begeistert nach dem Rezept fragen.'
        }
      }
    }
  },

  'dry-brick': {
    id: 'dry-brick',
    code: 'RED-04',
    iconName: 'ShieldAlert',
    badge: { es: 'Sobre-Cuajado', en: 'Overcooked Brick', de: 'Übergarung' },
    title: {
      es: 'Ha quedado como un adoquín seco / ladrillo refractario',
      en: 'It turned into a dry brick / overcooked rubber',
      de: 'Sie ist trocken wie ein Ziegelstein / zäh wie Gummi geworden'
    },
    subtitle: {
      es: 'El huevo coaguló más allá de los 85°C y expulsó toda la humedad.',
      en: 'Egg proteins coagulated past 85°C, squeezing out all moisture.',
      de: 'Das Eiweiß ist bei über 85°C koaguliert und hat alle Feuchtigkeit verloren.'
    },
    description: {
      es: 'Sinéresis proteica extrema provocada por olvido en el fuego. La textura es esponjosa y arenosa, pero tiene salvación sabrosa.',
      en: 'Extreme protein syneresis from unattended pan time. Spongy and chalky, but rescue dressings can resurrect it.',
      de: 'Extreme Proteinsynerese durch zu lange Garzeit. Krümelig, aber mit der richtigen Sauce wiederbelebbar.'
    },
    initialQuestionId: 'q-brick-1',
    questions: {
      'q-brick-1': {
        id: 'q-brick-1',
        question: {
          es: '¿La vas a comer caliente en la mesa o fría / para llevar a un picnic?',
          en: 'Are you eating it warm at dinner, or serving it cold / packing for a picnic?',
          de: 'Wird sie warm am Tisch gegessen oder kalt für ein Picknick vorbereitet?'
        },
        context: {
          es: 'Una tortilla sobre-cuajada en caliente necesita grasas emulsionadas; en frío es el soporte perfecto para pintxos vascos.',
          en: 'Hot overcooked tortilla needs emulsified fats; cold, it is the ideal canvas for Basque pintxos.',
          de: 'Warm braucht sie emulgiertes Fett; kalt ist sie das perfekte Fundament für baskische Pintxos.'
        },
        operatorCommentary: {
          es: 'Operador: "No todo está perdido. El País Vasco construyó su imperio gastronómico sobre tortillas bien cuajadas cubiertas de delicias marinas."',
          en: 'Operator: "All is not lost. The Basque Country built a culinary empire on firmly set omelettes topped with oceanic riches."',
          de: 'Zentrale: "Keine Panik. Das Baskenland hat sein Gastronomie-Imperium auf durchgegarten Tortillas mit edlen Toppings aufgebaut."'
        },
        options: [
          {
            id: 'o-brick-warm',
            text: {
              es: 'Queremos comerla ahora mismo, caliente y como plato principal.',
              en: 'We want to eat it right now, warm as the main course.',
              de: 'Wir wollen sie sofort warm als Hauptgericht essen.'
            },
            solutionId: 'sol-brava-aioli-infusion'
          },
          {
            id: 'o-brick-cold',
            text: {
              es: 'Es para aperitivo, tapas informales o comer más tarde.',
              en: 'It is for casual appetizers, tapas, or later snacking.',
              de: 'Es ist für einen Aperitif, Tapas oder später gedacht.'
            },
            solutionId: 'sol-donostia-pintxo-tower'
          }
        ]
      }
    },
    solutions: {
      'sol-brava-aioli-infusion': {
        id: 'sol-brava-aioli-infusion',
        codeName: {
          es: 'Tratamiento de Hidratación Emulsionada: Tortilla Brava & Alioli',
          en: 'Emulsion Hydration Treatment: Tortilla Brava & Artisan Alioli',
          de: 'Emulsions-Hydratisierung: Tortilla Brava mit hausgemachtem Alioli'
        },
        successRate: '96% de satisfacción en mesa',
        timeLimit: { es: '2 minutos de preparación', en: '2 minutes prep', de: '2 Minuten Zubereitung' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Al estar bien cuajada por encima de **70°C durante 2 minutos**, es bacteriológicamente 100% segura; recuerda no dejarla más de **4 horas** a temperatura ambiente sin refrigerar (<8°C).',
          en: 'Being firmly cooked past **70°C for 2 minutes**, microbial safety is impeccable; do not exceed **4 hours** at room temp before refrigerating (<8°C).',
          de: 'Durchgegart über **70°C für 2 Minuten** ist sie mikrobiologisch absolut sicher; nicht länger als **4 Stunden** ungekühlt lassen.'
        },
        gourmetBaptism: {
          es: '"Tortilla madrileña con salsa brava artesana y velo de alioli de mortero"',
          en: '"Madrid-Style Tortilla Brava Draped in Fiery Red Sauce & Garlic Alioli"',
          de: '"Madrider Tortilla Brava mit pikanter Sauce und samtigem Knoblauch-Alioli"'
        },
        whyItHappened: {
          es: 'La proteína del huevo superó los 82°C: los enlaces disulfuro expulsaron el agua retenida en el gel.',
          en: 'Egg proteins exceeded 82°C: disulfide crosslinks squeezed water out of the gel matrix.',
          de: 'Das Eiprotein stieg über 82°C: Die Eiweißstränge pressten das gebundene Wasser heraus.'
        },
        steps: [
          {
            es: '1. Corta la tortilla horizontalmente por la mitad como si abrieras un pan de hamburguesa o bizcocho.',
            en: '1. Slice the tortilla horizontally right through the equator like a burger bun.',
            de: '1. Die Tortilla waagerecht halbieren wie ein Burgerbrötchen oder Tortenbiskuit.'
          },
          {
            es: '2. Unta generosamente el interior con una mezcla de tomate frito casero con pimentón picante (salsa brava) o un alioli suave con AOVE.',
            en: '2. Slather inside with homemade salsa brava or rich extra virgin garlic alioli.',
            de: '2. Das Innere großzügig mit feiner Salsa Brava oder cremigem Olivenöl-Alioli bestreichen.'
          },
          {
            es: '3. Cierra la tapa superior, corona con otra cucharada de salsa y espolvorea perejil fresco picado.',
            en: '3. Close the lid, dollop another spoonful on top, and scatter fresh chopped parsley.',
            de: '3. Deckel aufsetzen, mit einem Klecks Sauce krönen und frische Petersilie darüberstreuen.'
          },
          {
            es: '4. La grasa emulsionada y los jugos penetrarán la masa esponjosa en 90 segundos, haciéndola ultra jugosa y adictiva.',
            en: '4. The emulsion penetrates the dry crumb within 90 seconds, rendering it juicy, velvety, and deeply savory.',
            de: '4. Die Emulsion zieht in 90 Sekunden in die Poren ein und verwandelt die Trockenheit in pure Saftigkeit.'
          }
        ],
        equipmentNeeded: [
          { es: 'Cuchillo de sierra largo (de pan)', en: 'Serrated bread knife', de: 'Langes Brotmesser mit Wellenschliff' },
          { es: 'Salsa brava o alioli', en: 'Bravas sauce or alioli', de: 'Salsa Brava oder Alioli' }
        ],
        proTip: {
          es: 'La "Tortilla Brava" es la reina indiscutible de los bares de la calle Fuencarral de Madrid. Nadie recordará que estaba seca.',
          en: 'Tortilla Brava is the reigning queen of Madrid tapas crawls. Nobody will remember dry egg.',
          de: 'Tortilla Brava ist der absolute Star uriger Tapas-Bars in Madrid. Niemand wird an Trockenheit denken.'
        }
      },
      'sol-donostia-pintxo-tower': {
        id: 'sol-donostia-pintxo-tower',
        codeName: {
          es: 'Estrategia Donostiarra: Torre de Pintxos de Barra Vasca',
          en: 'San Sebastián Strategy: Basque Bar Pintxo Architecture',
          de: 'Donostia-Strategie: Baskische Pintxo-Bar-Architektur'
        },
        successRate: '99% de éxito visual y festivo',
        timeLimit: { es: '3 minutos de montaje', en: '3 minutes assembly', de: '3 Minuten Anrichten' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Si vas a servir los pintxos en una fiesta o aperitivo prolongado, mantén la regla de oro: nunca más de **4 horas** fuera de la nevera.',
          en: 'For party platters, adhere to the fundamental rule: never surpass **4 hours** unchilled at room temperature.',
          de: 'Für Buffets und Partys gilt die goldene Regel: Keinesfalls länger als **4 Stunden** ungekühlt stehen lassen.'
        },
        gourmetBaptism: {
          es: '"Pintxos de tortilla estilo Parte Vieja con pimiento de piquillo y anchoa del Cantábrico"',
          en: '"San Sebastián Old Town Pintxos with Fire-Roasted Piquillos & Cantabrian Anchovies"',
          de: '"San-Sebastián-Pintxos mit karamellisiertem Piquillo und kantabrischer Sardelle"'
        },
        whyItHappened: {
          es: 'Cocción prolongada. La firmeza estructural es indeseable en plato único, pero óptima para sostener toppings húmedos sin desmoronarse.',
          en: 'Prolonged cooking. Firmness is bad for a solo slice, but unbeatable for supporting moist toppings.',
          de: 'Lange Garzeit. Die feste Konsistenz ist als Einzelgericht unerwünscht, aber ideal als stabile Basis für saftige Toppings.'
        },
        steps: [
          {
            es: '1. Deja enfriar la tortilla 5 minutos para que el corte sea geométricamente perfecto.',
            en: '1. Allow tortilla to cool 5 minutes so slices cut with laser-like geometric precision.',
            de: '1. Tortilla 5 Minuten abkühlen lassen, damit saubere Kanten geschnitten werden können.'
          },
          {
            es: '2. Córtala en dados exactos de 3 x 3 cm.',
            en: '2. Cut into uniform 3 x 3 cm bite-sized cubes.',
            de: '2. In akkurate 3 x 3 cm mundgerechte Würfel schneiden.'
          },
          {
            es: '3. Coloca sobre cada dado: una tira de pimiento del piquillo confitado y una anchoa o boquerón en vinagre.',
            en: '3. Crown each cube with: a sliver of confit piquillo pepper and a Cantabrian anchovy or pickled white boquerón.',
            de: '3. Jeden Würfel belegen mit: einem Streifen geröstetem Piquillo-Paprika und einer Sardelle.'
          },
          {
            es: '4. Atraviesa verticalmente con un palillo de bambú o brocheta pequeña.',
            en: '4. Spear vertically with a bamboo skewer or toothpick.',
            de: '4. Senkrecht mit einem Spießchen fixieren.'
          }
        ],
        equipmentNeeded: [
          { es: 'Palillos de madera o bambú', en: 'Toothpicks or bamboo skewers', de: 'Holz- oder Bambusspieße' },
          { es: 'Pimientos del piquillo en conserva', en: 'Jarred piquillo peppers', de: 'Piquillo-Paprika aus dem Glas' },
          { es: 'Anchoas o boquerones', en: 'Anchovies or sardines', de: 'Sardellenfilets' }
        ],
        proTip: {
          es: 'El jugo del piquillo y el aceite de la conserva humedecen el bocado en boca eliminando cualquier sensación de sequedad.',
          en: 'The savory piquillo marinade and fish oil saturate the bite, banishing dryness.',
          de: 'Das Öl und der Paprikasaft durchtränken den Bissen und machen ihn saftig und würzig.'
        }
      }
    }
  },

  'salt-crisis': {
    id: 'salt-crisis',
    code: 'RED-05',
    iconName: 'Droplet',
    badge: { es: 'Error Químico', en: 'Chemical Imbalance', de: 'Salz-Katastrophe' },
    title: {
      es: 'Crisis de Sal: O parece agua de mar o es comida de hospital',
      en: 'Salt Crisis: Tastes like seawater or bland hospital mash',
      de: 'Salz-Katastrophe: Meerwasser-Schock oder völlig geschmacklos'
    },
    subtitle: {
      es: 'Se cayó el salero o se te olvidó sazonar por completo.',
      en: 'The salt shaker lid flew off or you forgot salt entirely.',
      de: 'Der Salzstreuerdeckel fiel ab oder das Salz wurde komplett vergessen.'
    },
    description: {
      es: 'El cloruro sódico no tiene término medio: la salinidad ideal es 1.0g a 1.2g por cada 100g de mezcla. Te decimos cómo rebalancear la osmolaridad.',
      en: 'Ideal salinity is 1.0g to 1.2g per 100g. We show how to fix the chemical balance.',
      de: 'Der ideale Salzgehalt liegt bei 1,0g bis 1,2g pro 100g Masse. Hier ist die Rettungsrezeptur.'
    },
    initialQuestionId: 'q-salt-1',
    questions: {
      'q-salt-1': {
        id: 'q-salt-1',
        question: {
          es: '¿Cuál es la naturaleza exacta del desastre salino?',
          en: 'What is the exact nature of the salt disaster?',
          de: 'Was genau ist das Salz-Problem?'
        },
        context: {
          es: 'El exceso de sal requiere dilución de volumen o contra-sabores grasos; el defecto se cura con salazón por capilaridad superficial.',
          en: 'Excess salt demands volumetric dilution or fatty counter-balance; under-salting is solved by surface capillary seasoning.',
          de: 'Zu viel Salz erfordert Volumenerhöhung; zu wenig Salz heilt man durch gezieltes Oberflächen-Finishing.'
        },
        operatorCommentary: {
          es: 'Operador: "¡Paz mental! La sal es un mineral soluble. Si la mezcla sigue en el bol estamos a tiempo; si ya está cuajada, aplicamos gastronomía comparada."',
          en: 'Operator: "Salt is a water-soluble crystal. If it is still in the mixing bowl, rescue is mathematical. If cooked, we apply culinary science."',
          de: 'Zentrale: "Salz ist wasserlöslich. Ist die Masse noch in der Schüssel, rettet simple Mathematik; ist sie gegart, hilft die Aromenlehre."'
        },
        options: [
          {
            id: 'o-salt-too-much-bowl',
            text: {
              es: 'Demasiada sal y la mezcla TODAVÍA está cruda en el bol.',
              en: 'Way too salty and the mixture is STILL raw in the mixing bowl.',
              de: 'Viel zu viel Salz, aber die Masse ist NOCH ROH in der Schüssel.'
            },
            solutionId: 'sol-egg-potato-dilution'
          },
          {
            id: 'o-salt-too-much-cooked',
            text: {
              es: 'Demasiada sal y la tortilla YA está cocinada y emplatada.',
              en: 'Way too salty and the tortilla is ALREADY fully cooked on the plate.',
              de: 'Viel zu salzig und die Tortilla ist BEREITS FERTIG gegart auf dem Teller.'
            },
            solutionId: 'sol-sweet-fat-counterbalance'
          },
          {
            id: 'o-salt-bland',
            text: {
              es: 'Completamente sosa: se me olvidó la sal por completo.',
              en: 'Completely bland: I forgot the salt entirely.',
              de: 'Völlig ungesalzen: Salz schlichtweg vergessen.'
            },
            solutionId: 'sol-maldon-hot-oil-strike'
          }
        ]
      }
    },
    solutions: {
      'sol-egg-potato-dilution': {
        id: 'sol-egg-potato-dilution',
        codeName: {
          es: 'Protocolo de Amortiguación Osmótica: Dilución Matemática',
          en: 'Osmotic Buffer Protocol: Mathematical Egg-Starch Dilution',
          de: 'Osmotisches Pufferprotokoll: Mathematische Ei-Stärke-Verdünnung'
        },
        successRate: '100% de éxito matemático exacto',
        timeLimit: { es: '1 minuto de batido', en: '1 minute whisking', de: '1 Minute Rühren' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Al añadir más huevos crudos, asegúrate de alcanzar **70°C durante 2 minutos** o **63°C durante 20 segundos** al cuajar la nueva masa ampliada.',
          en: 'When incorporating extra raw eggs, ensure the larger mass achieves **70°C for 2 minutes** or **63°C for 20 seconds** during cooking.',
          de: 'Bei Zugabe weiterer roher Eier sicherstellen, dass die vergrößerte Masse beim Garen **70°C für 2 Minuten** oder **63°C für 20 Sekunden** erreicht.'
        },
        gourmetBaptism: {
          es: '"Tortilla XL de corral con cremosidad ampliada de yemas"',
          en: '"Family-Style XL Farmhouse Tortilla with Enriched Golden Yolks"',
          de: '"Große Bauern-Tortilla XL mit reichhaltigem Eigelb-Schmelz"'
        },
        whyItHappened: {
          es: 'La sal se añadió a ojo sin calibrar el peso total de la patata.',
          en: 'Salt was poured blindly without calibrating total potato weight.',
          de: 'Salz wurde nach Gefühl ohne Bezug zum Kartoffelgewicht hineingeschüttet.'
        },
        steps: [
          {
            es: '1. ¡NO tires nada a la basura! La solución es dilución de volumen.',
            en: '1. Throw nothing away! The solution is volumetric expansion.',
            de: '1. Nichts wegwerfen! Die Lösung heißt Volumenerweiterung.'
          },
          {
            es: '2. Bate 2 a 3 huevos adicionales en un cuenco aparte SIN UNA SOLA PIZCA DE SAL.',
            en: '2. Whisk 2 to 3 additional eggs in a separate bowl with ZERO added salt.',
            de: '2. 2 bis 3 Eier in einer Extraschüssel OHNE EINE EINZIGE PRISE SALZ verquirlen.'
          },
          {
            es: '3. Si tienes una patata ya cocida o incluso patatas fritas de bolsa artesanas sin sal, desmígalas e incorpóralas al bol.',
            en: '3. If you have a plain boiled potato or salt-free kettle potato chips, crumble them in.',
            de: '3. Falls vorhanden, eine gekochte Kartoffel oder ungesalzene Kesselchips zerkrümeln und zugeben.'
          },
          {
            es: '4. Mezcla todo con suavidad y deja reposar 3 minutos. El almidón extra absorberá el exceso de iones de sodio.',
            en: '4. Fold gently and let rest 3 minutes. Extra starches sponge up unbound sodium ions.',
            de: '4. Sanft unterrühren und 3 Minuten ruhen lassen. Die Stärke bindet überschüssiges Natrium.'
          }
        ],
        equipmentNeeded: [
          { es: '2-3 huevos extra frescos', en: '2-3 fresh extra eggs', de: '2-3 frische Eier' },
          { es: 'Bol adicional de batido', en: 'Whisking bowl', de: 'Rührschüssel' }
        ],
        proTip: {
          es: 'Terminarás con una tortilla más grande de lo previsto. ¡Mejor para todos!',
          en: 'You end up with a bigger, richer tortilla. A win for everyone!',
          de: 'Das Ergebnis ist eine größere, saftigere Tortilla – alle werden satt!'
        }
      },
      'sol-sweet-fat-counterbalance': {
        id: 'sol-sweet-fat-counterbalance',
        codeName: {
          es: 'Compensación Sensorial: Contrapunto Dulce & Láctico',
          en: 'Sensory Neutralization: Sweet & Lactic Fat Counterbalance',
          de: 'Sensorischer Ausgleich: Süß-Milchfett-Kontrapunkt'
        },
        successRate: '89% de mitigación palatal',
        timeLimit: { es: 'Al emplatar', en: 'On plating', de: 'Beim Anrichten' },
        severity: 'critical',
        safetyNote: {
          es: 'Consumir en el momento o refrigerar antes de superar las **4 horas** de exposición ambiental.',
          en: 'Consume immediately or chill before the **4 hours** ambient threshold.',
          de: 'Sofort servieren oder vor Ablauf der **4 Stunden**-Grenze kühlen.'
        },
        gourmetBaptism: {
          es: '"Tortilla con corona de cebolla confitada al Pedro Ximénez y crema fresca"',
          en: '"Sweet Confit Onion & Chilled Crème Fraîche Crowned Tortilla"',
          de: '"Tortilla mit karamellisierten PX-Zwiebeln und Crème-Fraîche-Haube"'
        },
        whyItHappened: {
          es: 'El cloruro sódico quedó encapsulado en la matriz de albúmina ya cuajada.',
          en: 'Sodium chloride is chemically locked into the set egg matrix.',
          de: 'Das Salz ist in der gestockten Eiweißmatrix gefangen.'
        },
        steps: [
          {
            es: '1. No intentes lavar ni enjuagar la tortilla (arruinarías la textura).',
            en: '1. Do not try to rinse or wash the tortilla (it ruins the crust).',
            de: '1. Die Tortilla keinesfalls abwaschen (ruiniert Konsistenz und Kruste).'
          },
          {
            es: '2. Los receptores linguales de salinidad se atenúan en presencia de azúcares naturales y grasas frías.',
            en: '2. Tongue salinity receptors are dampened by natural sugars and rich cool fats.',
            de: '2. Die Zungensensoren für Salz werden durch Süße und kühles Fett gedämpft.'
          },
          {
            es: '3. Sirve cada porción acompañada de: cebolla caramelizada tibia con reducción de vino dulce o una cucharada de crème fraîche / yogur griego espeso con cebollino.',
            en: '3. Serve each slice with: warm sweet caramelized onions or a dollop of cool crème fraîche / thick Greek yogurt with chives.',
            de: '3. Jedes Stück servieren mit: warmen karamellisierten Zwiebeln oder einem Löffel kühler Crème Fraîche mit Schnittlauch.'
          },
          {
            es: '4. Ofrece pan blanco crujiente sin sal: actúa como amortiguador en cada bocado.',
            en: '4. Offer crisp unsalted crusty bread to act as an oral starch buffer.',
            de: '4. Knuspriges ungesalzenes Weißbrot als Stärkepuffer dazu reichen.'
          }
        ],
        equipmentNeeded: [
          { es: 'Cebolla caramelizada o crème fraîche', en: 'Caramelized onions or crème fraîche', de: 'Karamellisierte Zwiebeln oder Crème Fraîche' },
          { es: 'Pan de masa madre sin sal', en: 'Unsalted bread', de: 'Ungesalzenes Brot' }
        ],
        proTip: {
          es: 'El contraste de la salinidad con la grasa dulce láctica es la base de la alta gastronomía escandinava y francesa.',
          en: 'Contrasting saltiness with sweet lactic fat is a hallmark of Scandinavian and French culinary art.',
          de: 'Der Kontrast von Salzigkeit mit süßlichem Milchfett ist ein bewährtes Prinzip der Spitzenküche.'
        }
      },
      'sol-maldon-hot-oil-strike': {
        id: 'sol-maldon-hot-oil-strike',
        codeName: {
          es: 'El Golpe Maestro: Salazón en Escamas por Capilaridad Lípida',
          en: 'The Master Finish: Capillary Flake Salt & Hot EVOO Strike',
          de: 'Der Meisterstreich: Kapillare Meersalz-Infusion mit heißem Olivenöl'
        },
        successRate: '100% de elegancia gourmet (Muchos lo prefieren así)',
        timeLimit: { es: '30 segundos', en: '30 seconds', de: '30 Sekunden' },
        severity: 'salvageable',
        safetyNote: {
          es: 'No altera la temperatura interna; asegúrate de que la cocción previa haya respetado los **63°C** o **70°C** reglamentarios.',
          en: 'Does not alter inner thermal safety; ensure initial cooking met statutory **63°C** or **70°C** standards.',
          de: 'Verändert die Innentemperatur nicht; sicherstellen, dass zuvor vorschriftsmäßig **63°C** oder **70°C** erreicht wurden.'
        },
        gourmetBaptism: {
          es: '"Tortilla en su jugo con acabado de Flor de Sal de las Salinas y AOVE Picual"',
          en: '"Naked Spanish Tortilla Finished with Sea Salt Pyramids & Fiery Picual EVOO"',
          de: '"Tortilla Española mit Meersalzpyramiden und feurigem Picual-Olivenöl-Finish"'
        },
        whyItHappened: {
          es: 'Despiste inocente durante la fase de batido.',
          en: 'Harmless oversight during egg beating phase.',
          de: 'Harmloser Flüchtigkeitsfehler beim Verquirlen der Eier.'
        },
        steps: [
          {
            es: '1. ¡Buenas noticias! Una tortilla sosa tiene la solución más deliciosa de toda la gastronomía.',
            en: '1. Great news! An under-salted tortilla has the most delicious fix in all of gastronomy.',
            de: '1. Gute Nachricht! Eine ungesalzene Tortilla lässt sich am elegantesten von allen Problemen lösen.'
          },
          {
            es: '2. Con la punta de un cuchillo afilado, realiza incisiones finas en forma de rombos superficiales sobre la tortilla caliente emplatada.',
            en: '2. With a sharp knife tip, score delicate diamond incisions across the surface of the hot plated tortilla.',
            de: '2. Mit einer Messerspitze feine Rautenmuster in die heiße Oberfläche ritzen.'
          },
          {
            es: '3. Calienta 2 cucharadas de AOVE en un cazo pequeño durante 30 segundos hasta que esté humeante pero sin quemar.',
            en: '3. Warm 2 tbsp extra virgin olive oil in a small pan for 30 seconds until shimmering hot.',
            de: '3. 2 EL natives Olivenöl in einem Pfännchen 30 Sekunden heiß werden lassen.'
          },
          {
            es: '4. Espolvorea generosamente escamas de sal Maldon o flor de sal marina por toda la superficie.',
            en: '4. Scatter crunchy Maldon salt flakes or fleur de sel across the surface.',
            de: '4. Großzügig Meersalzflocken (Maldon) über die Rauten streuen.'
          },
          {
            es: '5. Vierte el aceite caliente sobre la sal: chisporroteará levemente y arrastrará el mineral disuelto justo 1 milímetro dentro de la masa, regalando un crujiente inolvidable.',
            en: '5. Drizzle shimmering hot oil over the salt: it sizzles lightly and draws dissolved minerals just 1 mm inside for an intoxicating crunch.',
            de: '5. Das heiße Öl darüberträufeln: Es zischt leise und zieht das Salz 1 Millimeter tief ins Innere – genialer Knuspereffekt.'
          }
        ],
        equipmentNeeded: [
          { es: 'Flor de sal marina o sal Maldon en escamas', en: 'Flaky sea salt (Maldon)', de: 'Meersalzflocken (Maldon)' },
          { es: 'Aceite de oliva virgen extra de calidad', en: 'Top-quality EVOO', de: 'Hochwertiges Olivenöl' }
        ],
        proTip: {
          es: 'De hecho, varios chefs de estrella Michelin de San Sebastián y Bilbao NO ponen sal al batido, sino que la aplican únicamente de este modo al final.',
          en: 'Several Michelin-starred chefs in Bilbao and San Sebastián deliberately avoid salting raw egg, using this exact technique exclusively.',
          de: 'Mehrere Spitzenköche in San Sebastián salzen das Ei absichtlich nicht vorab, sondern wenden exakt diese Technik an.'
        }
      }
    }
  },

  'greasy-sponge': {
    id: 'greasy-sponge',
    code: 'RED-06',
    iconName: 'Droplets',
    badge: { es: 'Fallo de Pochar', en: 'Confit Breakdown', de: 'Fett-Sättigung' },
    title: {
      es: 'La patata es una esponja gomosa empapada de aceite',
      en: 'The potatoes are greasy sponges soaked in oil',
      de: 'Die Kartoffeln sind wie gummierte, ölige Schwämme'
    },
    subtitle: {
      es: 'El aceite estaba tibio y la patata bebió grasa en vez de confitarse.',
      en: 'Oil was too cool and the potato drank fat instead of poaching.',
      de: 'Das Öl war zu kalt und die Kartoffeln haben sich vollgesaugt.'
    },
    description: {
      es: 'La temperatura del aceite cayó por debajo de 115°C al añadir demasiada patata de golpe. La presión de vapor interna colapsó y la matriz absorbió aceite.',
      en: 'Oil dropped below 115°C due to overloading. Internal vapor pressure collapsed and starch sucked in liquid fat.',
      de: 'Öltemperatur sank unter 115°C durch Überladung. Der Innendampfdruck brach ein, Stärke sog Öl auf.'
    },
    initialQuestionId: 'q-sponge-1',
    questions: {
      'q-sponge-1': {
        id: 'q-sponge-1',
        question: {
          es: '¿En qué fase de la preparación te encuentras ahora mismo?',
          en: 'At what stage of preparation are you right now?',
          de: 'In welcher Phase der Zubereitung befindest du dich gerade?'
        },
        context: {
          es: 'Si las patatas aún no se han mezclado con el huevo, la centrifugación y drenaje térmico son infalibles.',
          en: 'If potatoes have not yet hit raw egg, thermal drainage and flash-crisping work wonders.',
          de: 'Sind die Kartoffeln noch getrennt vom Ei, hilft thermisches Sieben und Schockentfettung.'
        },
        operatorCommentary: {
          es: 'Operador: "¡No mezcles todavía con el huevo si las patatas parecen una piscina de aceite! Respira y aplica el filtro centrífugo."',
          en: 'Operator: "Do not touch raw egg yet if potatoes look like an oil slick! Breathe and let us drain properly."',
          de: 'Zentrale: "Noch nicht ins Ei geben, wenn die Kartoffeln vor Fett triefen! Erst entölen, dann mischen."'
        },
        options: [
          {
            id: 'o-sponge-separated',
            text: {
              es: 'Las patatas siguen en la sartén/escurridor, todavía NO las he mezclado con el huevo.',
              en: 'Potatoes are still in the pan/strainer, NOT yet mixed with egg.',
              de: 'Die Kartoffeln sind noch getrennt, NOCH NICHT mit dem Ei vermengt.'
            },
            solutionId: 'sol-mesh-steam-drain'
          },
          {
            id: 'o-sponge-mixed',
            text: {
              es: '¡Demasiado tarde! Ya las he volcado en el bol con los huevos batidos.',
              en: 'Too late! I already dumped them into the bowl with beaten eggs.',
              de: 'Zu spät! Ich habe sie bereits in die Schüssel mit den Eiern gekippt.'
            },
            solutionId: 'sol-pil-pil-emulsion-cook'
          }
        ]
      }
    },
    solutions: {
      'sol-mesh-steam-drain': {
        id: 'sol-mesh-steam-drain',
        codeName: {
          es: 'Protocolo de Drenaje Centrífugo en Malla de Acero',
          en: 'Centrifugal Wire Mesh Steam Drain Protocol',
          de: 'Drahtsieb-Dampfentölung nach Küchenstandard'
        },
        successRate: '95% de eliminación de grasa superflua',
        timeLimit: { es: '4 minutos de reposo', en: '4 minutes resting', de: '4 Minuten Ruhezeit' },
        severity: 'salvageable',
        safetyNote: {
          es: 'Al mezclar las patatas escurridas calientes con el huevo, la temperatura de reposo debe mantenerse al menos a **63°C durante 20 segundos** para la emulsión higiénica antes de cuajar.',
          en: 'When mixing warm drained potatoes into egg, maintain warmth to prime **63°C for 20 seconds** before frying.',
          de: 'Beim Mischen warmer Kartoffeln mit Ei auf Sauberkeit achten und beim Braten die **63°C für 20 Sekunden**-Hürde nehmen.'
        },
        gourmetBaptism: {
          es: '"Tortilla de patatas confitadas en AOVE con emulsión ligera y sedosa"',
          en: '"Light-Texture Confit Potato Tortilla with Clean Extra Virgin Finish"',
          de: '"Fein entölte Confit-Tortilla mit seidiger Eigelbbindung"'
        },
        whyItHappened: {
          es: 'El vapor de agua de la patata no tenía fuerza para salir, permitiendo que los lípidos ocuparan el espacio intercelular.',
          en: 'Internal water vapor lacked pressure to escape outward, allowing hot fat to occupy intercellular voids.',
          de: 'Wasserdampf hatte zu wenig Druck zum Entweichen; das Öl drang in die Zellzwischenräume.'
        },
        steps: [
          {
            es: '1. Vuelca inmediatamente las patatas sobre un colador grande de malla metálica apoyado sobre un cazo.',
            en: '1. Dump potatoes immediately into a large stainless steel wire sieve set over a bowl.',
            de: '1. Kartoffeln sofort in ein großes Edelstahlsieb über einem Topf schütten.'
          },
          {
            es: '2. NO las aplastes con fuerza para no hacer puré. Presiona con extrema suavidad con el dorso de una espumadera.',
            en: '2. DO NOT mash them aggressively into mush. Press with feather-light taps using the back of a skimmer.',
            de: '2. NICHT zerdrücken! Nur ganz sanft mit dem Schaumlöffelrücken abtupfen.'
          },
          {
            es: '3. Deja que el vapor caliente escape durante 3 minutos: el vapor saliente empuja activamente las microgotas de grasa hacia el exterior.',
            en: '3. Let hot steam billow out for 3 minutes: exiting steam actively expels lipid droplets outward.',
            de: '3. 3 Minuten abdampfen lassen: Der aufsteigende Dampf drückt das Fett nach außen weg.'
          },
          {
            es: '4. Vuelca las patatas sobre una bandeja con triple capa de papel de cocina absorbente antes de incorporarlas al bol de huevo batido.',
            en: '4. Roll onto a tray lined with triple paper towels for 30 seconds before sliding into the beaten eggs.',
            de: '4. Kurz auf dreilagiges Küchenpapier geben, bevor sie in die Eimasse gleiten.'
          }
        ],
        equipmentNeeded: [
          { es: 'Colador grande de malla metálica', en: 'Wire mesh colander', de: 'Großes Drahtsieb' },
          { es: 'Papel de cocina absorbente', en: 'Absorbent paper towels', de: 'Küchenpapier' }
        ],
        proTip: {
          es: 'El aceite recogido en el cazo está aromatizado por la patata: cuélalo y guárdalo para tu próxima tortilla.',
          en: 'The strained oil is beautifully infused with potato essence: save it for your next batch.',
          de: 'Das abgetropfte Öl ist voll feinem Kartoffelaroma: filtern und für die nächste Tortilla aufbewahren.'
        }
      },
      'sol-pil-pil-emulsion-cook': {
        id: 'sol-pil-pil-emulsion-cook',
        codeName: {
          es: 'Técnica Pil-Pil: Emulsión Forzada por Lecitina al Cuajar',
          en: 'Pil-Pil Dynamic: Lecithin-Driven Forced Emulsion at the Pan',
          de: 'Pil-Pil-Dynamik: Lecithin-Emulsion direkt beim Anbraten'
        },
        successRate: '91% de integración cremosa',
        timeLimit: { es: 'Los primeros 30 segundos en sartén', en: 'First 30 seconds in skillet', de: 'Erste 30 Sekunden in der Pfanne' },
        severity: 'critical',
        safetyNote: {
          es: 'Al cocinar con movimientos enérgicos, el calor se distribuye con rapidez: cuaja hasta que la base esté firme y el centro supere los **63°C durante 20 segundos** o **70°C durante 2 minutos**.',
          en: 'Vigorous stirring distributes heat rapidly: cook until base sets and center reaches **63°C for 20 seconds** or **70°C for 2 minutes**.',
          de: 'Durch das Rühren verteilt sich die Hitze rasant: garen bis der Kern sichere **63°C für 20 Sekunden** oder **70°C für 2 Minuten** misst.'
        },
        gourmetBaptism: {
          es: '"Tortilla mantecada al estilo pil-pil con emulsión natural de yema y oliva"',
          en: '"Creamy Pil-Pil Style Iberian Tortilla with Velvety Yolk Emulsion"',
          de: '"Cremig montierte Pil-Pil-Tortilla mit natürlicher Eigelb-Oliven-Emulsion"'
        },
        whyItHappened: {
          es: 'El aceite libre flotaba alrededor de las patatas antes de mezclar.',
          en: 'Free oil was pooling around potatoes prior to egg incorporation.',
          de: 'Freies Öl stand um die Kartoffeln, bevor das Ei hinzugefügt wurde.'
        },
        steps: [
          {
            es: '1. No entres en pánico: la yema de huevo contiene lecitina, el emulsionante natural más potente de la cocina.',
            en: '1. Don\'t panic: egg yolk contains natural lecithin, one of culinary nature\'s greatest emulsifiers.',
            de: '1. Keine Panik: Eigelb enthält natürliches Lecithin – einen der stärksten Emulgatoren der Welt.'
          },
          {
            es: '2. Calienta la sartén a fuego medio-alto SIN AÑADIR MÁS ACEITE (ya llevas suficiente en la masa).',
            en: '2. Heat pan to medium-high WITHOUT ADDING ANY EXTRA OIL (you have plenty inside).',
            de: '2. Pfanne auf mittelhohe Hitze bringen OHNE ZUSÄTZLICHES ÖL (es ist genug in der Masse).'
          },
          {
            es: '3. Vuelca la mezcla completa de golpe.',
            en: '3. Pour the entire mixture in at once.',
            de: '3. Die gesamte Masse mit Schwung hineingeben.'
          },
          {
            es: '4. Durante los primeros 25 segundos, realiza movimientos circulares enérgicos con la espátula o cuchara de madera como si ligaras una salsa pil-pil o risotto.',
            en: '4. For the first 25 seconds, stir vigorously in circular patterns like mounting a risotto or pil-pil sauce.',
            de: '4. Die ersten 25 Sekunden mit dem Holzlöffel energisch kreisend rühren wie bei einem Risotto oder Pil-Pil.'
          },
          {
            es: '5. La lecitina del huevo atrapará mecánicamente las microgotas de grasa en una emulsión sedosa y homogénea en lugar de dejar un charco grasiento.',
            en: '5. The egg lecithin traps the fat droplets into a velvety homogeneous custard instead of a greasy puddle.',
            de: '5. Das Lecithin bindet die Fetttröpfchen in eine cremige, samtige Emulsion statt einer Fettpfütze.'
          },
          {
            es: '6. Sella los bordes, voltea y disfruta de una cremosidad legendaria.',
            en: '6. Tuck edges, flip decisively, and savor a legendary velvety texture.',
            de: '6. Ränder einschlagen, wenden und himmlische Cremigkeit genießen.'
          }
        ],
        equipmentNeeded: [
          { es: 'Sartén antiadherente bien caliente', en: 'Hot non-stick skillet', de: 'Gut vorgeheizte Pfanne' },
          { es: 'Espátula de madera o silicona', en: 'Wooden or silicone spoon', de: 'Holz- oder Silikonlöffel' }
        ],
        proTip: {
          es: 'Esta es la técnica secreta de varias casas de comidas ilustres para lograr una untuosidad mantecosa que se deshace en la boca.',
          en: 'This is the closely guarded secret of classic Spanish eating houses to produce an unforgettable melt-in-the-mouth richness.',
          de: 'Das ist das Geheimnis berühmter Traditionslokale für eine unnachahmlich buttrig-schmelzende Textur.'
        }
      }
    }
  }
};
