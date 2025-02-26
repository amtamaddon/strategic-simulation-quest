
import { Scenario, StrategicPrinciple } from "../types/game";

export const strategicPrinciples: StrategicPrinciple[] = [
  {
    id: "center-of-gravity",
    name: "Center of Gravity",
    author: "Clausewitz",
    description: "The source of power that provides moral or physical strength, freedom of action, or will to act.",
    discovered: false
  },
  {
    id: "economy-of-force",
    name: "Economy of Force",
    author: "Clausewitz",
    description: "Allocating minimum essential combat power to secondary efforts.",
    discovered: false
  },
  {
    id: "moral-forces",
    name: "Moral Forces",
    author: "Clausewitz",
    description: "The psychological aspects of warfare (courage, morale, leadership).",
    discovered: false
  },
  {
    id: "politics-primacy",
    name: "Political Primacy",
    author: "Clausewitz",
    description: "War as an extension of politics by other means.",
    discovered: false
  },
  {
    id: "know-enemy",
    name: "Know Yourself and Know Your Enemy",
    author: "Sun Tzu",
    description: "Complete understanding of capabilities and limitations of both sides.",
    discovered: false
  },
  {
    id: "deception",
    name: "Deception",
    author: "Sun Tzu",
    description: "Appearing incapable when capable, appearing weak when strong.",
    discovered: false
  },
  {
    id: "indirect-approach",
    name: "Indirect Approach",
    author: "Sun Tzu",
    description: "Approaching indirectly where the enemy is unprepared.",
    discovered: false
  },
  {
    id: "attack-weakness",
    name: "Avoiding Strength, Attacking Weakness",
    author: "Sun Tzu",
    description: "Striking where the enemy is least prepared.",
    discovered: false
  }
];

export const scenarios: Scenario[] = [
  {
    id: "hannibal-218bc",
    title: "The Alpine Decision",
    year: "218 BCE",
    leader: "Hannibal Barca",
    context: "The Second Punic War has begun. Rome and Carthage once again find themselves locked in a struggle for dominance over the Mediterranean. The First Punic War, concluded 23 years ago, resulted in Carthage's loss of Sicily and enormous war reparations paid to Rome. Now, Carthage has rebuilt its strength through new territories in Spain.",
    situation: "You are Hannibal Barca, commander of Carthaginian forces in Spain. The Roman Senate is preparing two armies—one under Consul Publius Cornelius Scipio to sail for Spain and engage you directly, another under Consul Tiberius Sempronius Longus to invade Carthage through Sicily. Your forces consist of 50,000 infantry, 9,000 cavalry, and 37 war elephants. As Hannibal, what is your strategic approach to this war?",
    decisions: [
      {
        id: "defend-spain",
        text: "Defend Spanish territories",
        description: "Remain in Spain to protect Carthaginian territories and mining operations that fund the war effort. Engage Scipio's forces on favorable terrain.",
        outcomes: {
          description: "You prepare defensive positions in northeastern Spain. Your forces are well-supplied and hold strong positions, but this defensive posture cedes initiative to Rome and allows them to dictate the terms of engagement. Scipio's forces land and begin methodical operations to cut off your supply routes.",
          resources: { military: -10, economy: 5, morale: -5, political: 0 },
          nextScenarioId: "spain-defense",
          principle: strategicPrinciples[1] // Economy of Force
        }
      },
      {
        id: "sail-to-carthage",
        text: "Sail to defend Carthage",
        description: "Return to North Africa to defend the Carthaginian homeland directly against Sempronius' invasion force.",
        outcomes: {
          description: "You sail your forces back to Carthage to prepare for Sempronius' invasion. The Roman fleet is aware of your movement and engages your ships, causing significant losses. You arrive in Carthage with most of your army intact but facing low morale after the naval confrontation.",
          resources: { military: -15, economy: -5, morale: -10, political: 5 },
          nextScenarioId: "carthage-defense",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "invade-italy",
        text: "Cross the Alps and invade Italy",
        description: "Take an unexpected route through southern Gaul and across the Alps to strike at the heart of Roman territory, forcing them to recall their armies to defend Rome itself.",
        outcomes: {
          description: "You make the daring decision to cross the Alps with your entire army, including war elephants. The journey is treacherous and costly, with harsh weather, difficult terrain, and hostile Gallic tribes. However, your arrival in northern Italy catches Rome completely unprepared, as they expected to fight this war on their terms, away from their homeland.",
          resources: { military: -20, economy: -10, morale: 15, political: 10 },
          nextScenarioId: "alps-crossing",
          principle: strategicPrinciples[6] // Indirect Approach
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal chose to invade Italy by crossing the Alps, a move that shocked Rome. Despite losing nearly half his army and most of his elephants in the crossing, his bold strategy brought the war to Roman soil and allowed him to win several decisive victories, including at Trebia, Lake Trasimene, and most famously at Cannae, one of the most crushing defeats in Roman military history."
  },
  {
    id: "spain-defense",
    title: "The Spanish Campaign",
    year: "218-217 BCE",
    leader: "Hannibal Barca",
    context: "You've chosen to defend the valuable Spanish territories that provide Carthage with essential resources and manpower for the war effort.",
    situation: "Scipio's Roman forces have established a beachhead near Emporion and are methodically advancing. They're cutting off your supply lines and rallying local Iberian tribes against you. The Carthaginian Senate is demanding you preserve the mining operations at all costs, but your scouts report that the second Roman army under Sempronius has sailed for Africa and will soon threaten Carthage itself.",
    decisions: [
      {
        id: "guerrilla-warfare",
        text: "Adopt guerrilla tactics",
        description: "Avoid direct confrontation with Scipio's main force. Instead, utilize your superior knowledge of the terrain to harass supply lines and isolate Roman detachments.",
        outcomes: {
          description: "Your forces disperse into smaller, more mobile units that continually harass the Romans. While this prevents a decisive defeat, it also allows Scipio to gradually secure more territory. Meanwhile, news arrives that Sempronius has landed in Africa and is marching on Carthage, which has inadequate defenses without your army.",
          resources: { military: -5, economy: -10, morale: 0, political: -15 },
          nextScenarioId: "spain-retreat",
          principle: strategicPrinciples[7] // Attacking Weakness
        }
      },
      {
        id: "decisive-battle",
        text: "Force a decisive battle",
        description: "Concentrate your forces and engage Scipio before he can establish a stronger position. A decisive victory could eliminate the threat in Spain and allow you to reinforce Carthage.",
        outcomes: {
          description: "You marshal your forces for a major confrontation near the Ebro River. The battle is bloody and hard-fought, but Scipio proves to be a capable commander. Your army suffers heavy casualties, though you manage to inflict significant losses on the Romans as well. The engagement ends in a stalemate, but you've lost precious time and resources.",
          resources: { military: -25, economy: -5, morale: -10, political: 0 },
          nextScenarioId: "spain-retreat",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "late-italy-invasion",
        text: "Abandon Spain and march for Italy",
        description: "Recognize that the strategic situation has shifted and make a belated dash for Italy, attempting to force Rome to recall both armies to defend the homeland.",
        outcomes: {
          description: "You gather your forces and begin a rapid march toward the Alps, leaving minimal garrisons to slow Scipio's advance. The delay means you're crossing the mountains in worse weather conditions than if you had gone earlier. Scipio, learning of your movement, detaches part of his force to pursue you while sending word to Rome of your intentions.",
          resources: { military: -30, economy: -15, morale: 5, political: 5 },
          nextScenarioId: "late-alps-crossing",
          principle: strategicPrinciples[6] // Indirect Approach
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal did not choose to defend Spain, recognizing that despite its economic importance, victory could only be achieved by striking at Rome itself."
  },
  {
    id: "alps-crossing",
    title: "Crossing the Alps",
    year: "218 BCE",
    leader: "Hannibal Barca",
    context: "You've made the audacious decision to invade Italy by crossing the Alps, catching the Romans completely by surprise. After an arduous journey through southern Gaul, you now face the formidable mountain range with winter approaching.",
    situation: "Your army has suffered losses from skirmishes with Gallic tribes and the difficult terrain. Now you stand at the foothills of the Alps with approximately 40,000 infantry, 8,000 cavalry, and 37 elephants. The crossing will be treacherous, with narrow paths, freezing temperatures, and the constant threat of ambushes from mountain tribes. However, successfully crossing into Italy would bring the war directly to Roman soil, something they're not prepared for.",
    decisions: [
      {
        id: "quick-dangerous-route",
        text: "Take the shortest but most dangerous path",
        description: "Choose the most direct route through the mountains to reach Italy as quickly as possible, despite the greater dangers from both terrain and hostile tribes.",
        outcomes: {
          description: "You opt for speed over safety, pushing your army through treacherous passes. Avalanches, freezing temperatures, and attacks from mountain tribes take a severe toll. Nearly half your infantry, a third of your cavalry, and most of your elephants are lost. However, your army emerges into the Po Valley weeks earlier than the Romans thought possible, achieving complete strategic surprise.",
          resources: { military: -45, economy: -5, morale: 10, political: 15 },
          nextScenarioId: "po-valley",
          principle: strategicPrinciples[2] // Moral Forces
        }
      },
      {
        id: "secure-route",
        text: "Secure the route as you advance",
        description: "Move more methodically, securing each pass before advancing and negotiating with or subjugating the mountain tribes to ensure safer passage.",
        outcomes: {
          description: "Your careful approach reduces casualties from natural hazards and ambushes, but significantly slows your progress. You successfully negotiate with some tribes and defeat others, establishing a relatively secure supply line. When you finally descend into Italy, your army is in better condition, but the Romans have had more time to prepare for your arrival.",
          resources: { military: -25, economy: -15, morale: 5, political: 5 },
          nextScenarioId: "po-valley-late",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      },
      {
        id: "winter-delay",
        text: "Delay crossing until spring",
        description: "Establish winter quarters in Gaul and wait for better weather conditions before attempting the Alpine crossing.",
        outcomes: {
          description: "You decide that the risks of a winter crossing are too great and establish camps in friendly Gallic territory. This decision preserves your army's strength, but completely sacrifices the element of surprise. By spring, Rome has recalled Scipio's army from Spain and positioned forces to meet you when you emerge from the mountains. The strategic advantage of your bold move has been largely neutralized.",
          resources: { military: 5, economy: -20, morale: -10, political: -15 },
          nextScenarioId: "spring-crossing",
          principle: strategicPrinciples[1] // Economy of Force
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal crossed the Alps in late autumn, taking approximately 15 days for the crossing itself. He lost nearly half his army to the elements, treacherous terrain, and hostile tribes. Of his 37 elephants, only a handful survived. Despite these losses, the crossing achieved its strategic objective of bringing the war to Italian soil and demonstrating Hannibal's bold leadership, which helped rally Gallic tribes against Rome."
  },
  {
    id: "po-valley",
    title: "First Strikes in Italy",
    year: "218 BCE",
    leader: "Hannibal Barca",
    context: "You've successfully crossed the Alps, though at great cost. Your army now stands in the Po Valley of northern Italy, having achieved complete strategic surprise. The local Gallic tribes, long resentful of Roman expansion, view your arrival with interest.",
    situation: "Despite your losses in the Alpine crossing, your position has strategic advantages. The Roman forces under Scipio have been hastily recalled from their journey to Spain but are not yet fully organized. The second Roman army under Sempronius is still in Sicily, preparing to sail for Africa. You have approximately 26,000 soldiers remaining, exhausted but emboldened by their achievement. The Gallic tribes could provide reinforcements if convinced of your chances of success.",
    decisions: [
      {
        id: "rally-gauls",
        text: "Focus on rallying Gallic support",
        description: "Spend time diplomatically engaging with Gallic tribes to secure alliances, reinforcements, and supplies before engaging Roman forces.",
        outcomes: {
          description: "You dedicate several weeks to diplomatic efforts among the Gallic tribes. Your victories against Roman outposts impress them, and many pledge warriors to your cause. Your army grows by 14,000 infantry and 4,000 cavalry, though these new allies are less disciplined than your veteran troops. However, the delay gives Scipio more time to prepare his defenses.",
          resources: { military: 20, economy: 10, morale: 5, political: 5 },
          nextScenarioId: "trebia",
          principle: strategicPrinciples[3] // Political Primacy
        }
      },
      {
        id: "immediate-attack",
        text: "Strike immediately at Scipio's forces",
        description: "Exploit your surprise arrival by immediately engaging Scipio's army before it can be properly organized or reinforced.",
        outcomes: {
          description: "You march quickly toward Scipio's position near the Ticinus River. Your rapid movement catches his scouts by surprise, and you manage to engage his cavalry in a favorable skirmish. Scipio himself is wounded in the encounter, and his forces retreat in some disorder. This quick victory bolsters your reputation, but you've had no time to rest your troops or secure local support.",
          resources: { military: -5, economy: -5, morale: 15, political: 10 },
          nextScenarioId: "trebia-advantage",
          principle: strategicPrinciples[5] // Deception
        }
      },
      {
        id: "secure-supply-lines",
        text: "Secure a base of operations in northern Italy",
        description: "Consolidate your position by capturing key towns in the Po Valley to establish secure supply lines before engaging in major battles.",
        outcomes: {
          description: "You methodically capture several important settlements in the Po Valley, establishing a secure base of operations and supply lines. This cautious approach ensures your army is well-rested and supplied, but allows both Roman consuls to combine their forces, as Sempronius hurriedly brings his army north from Sicily.",
          resources: { military: 5, economy: 15, morale: 0, political: -5 },
          nextScenarioId: "trebia-defensive",
          principle: strategicPrinciples[1] // Economy of Force
        }
      }
    ],
    historicalOutcome: "Historically, after crossing the Alps, Hannibal first focused on securing Gallic allies while allowing his troops to recover from the crossing. He then defeated Scipio at the Battle of Ticinus, a cavalry engagement where the consul was wounded. This victory impressed the Gallic tribes, bringing many to his side. Later, at the Battle of the Trebia, Hannibal lured the combined Roman armies under Sempronius into an ambush, inflicting a severe defeat on Rome."
  },
  {
    id: "trebia",
    title: "The Battle of Trebia",
    year: "December 218 BCE",
    leader: "Hannibal Barca",
    context: "With Gallic reinforcements bolstering your ranks, you now face a critical moment in the campaign. The Roman consul Tiberius Sempronius Longus has arrived from Sicily and joined forces with the wounded Scipio near the Trebia River.",
    situation: "Winter has set in, with cold temperatures and occasional snow. The Romans have approximately 40,000 infantry and 4,000 cavalry positioned east of the Trebia River. Your intelligence suggests that Sempronius is eager for battle to secure glory before the new consuls take office, while the more cautious Scipio, still recovering from his wound, advises delay. The flat terrain near the river favors your superior cavalry, but crossing the cold river to attack would be challenging for your troops.",
    decisions: [
      {
        id: "frontal-assault",
        text: "Launch a frontal assault across the river",
        description: "Cross the Trebia directly and engage the Roman army in conventional battle formation.",
        outcomes: {
          description: "You lead your army across the cold Trebia waters in full view of the Romans. Your troops arrive on the opposite bank chilled and somewhat disorganized. The Romans, fresh and in formation, inflict heavy casualties on your forces, though your superior cavalry prevents a total disaster. The battle ends inconclusively, with both sides withdrawing after suffering significant losses.",
          resources: { military: -25, economy: -5, morale: -15, political: -10 },
          nextScenarioId: "winter-apennines",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "trebia-ambush",
        text: "Set an ambush",
        description: "Place your brother Mago with elite troops in hidden positions, then use a small force to lure the Romans across the river into your trap.",
        outcomes: {
          description: "Before dawn, you position 2,000 elite soldiers under your brother Mago in concealed ravines. At daybreak, you send your Numidian cavalry to harass the Roman camp and feign retreat. The impetuous Sempronius orders his entire army to pursue without breakfast, forcing them to cross the freezing river. As the cold, hungry Romans advance, your main force engages them from the front while Mago's hidden troops attack from behind. The result is a decisive victory, with most of the Roman army destroyed.",
          resources: { military: 10, economy: 5, morale: 25, political: 20 },
          nextScenarioId: "central-italy",
          principle: strategicPrinciples[6] // Indirect Approach
        }
      },
      {
        id: "winter-delay-trebia",
        text: "Avoid battle and continue winter preparations",
        description: "Decline battle during the harsh winter conditions, focusing instead on strengthening your position and allowing the Romans to face supply difficulties.",
        outcomes: {
          description: "You avoid engagement despite Roman provocations, conserving your strength through the winter months. This cautious approach frustrates Sempronius, but as winter deepens, the Romans face increasing supply problems. When spring arrives, you find yourself facing newly elected consuls with fresh armies, as Sempronius and Scipio return to Rome at the end of their term.",
          resources: { military: 5, economy: 10, morale: -5, political: -10 },
          nextScenarioId: "spring-campaign",
          principle: strategicPrinciples[7] // Attacking Weakness
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal executed a brilliant ambush at the Battle of Trebia. He placed his brother Mago with 2,000 elite troops in hiding, then sent Numidian cavalry to provoke Sempronius, who eagerly ordered his troops to pursue without breakfast. After crossing the freezing river, the cold and hungry Roman soldiers were attacked from both front and rear, resulting in a decisive Carthaginian victory. Only about 10,000 Romans fought their way out of the trap, while Hannibal's losses were relatively light, mostly among his Gallic allies."
  },
  {
    id: "central-italy",
    title: "Advance to Central Italy",
    year: "217 BCE",
    leader: "Hannibal Barca",
    context: "After your decisive victory at the Trebia River, Rome is in shock. The defeat has opened the way to central Italy, but the Romans are raising new armies under the newly elected consuls Gaius Flaminius and Gnaeus Servilius Geminus.",
    situation: "Spring has arrived, and you must decide your next move. You could advance along the easier coastal route, where Servilius is gathering his army, or take the more difficult inland route through the Apennine Mountains and the marshes of the Arno River, which would bring you directly toward Flaminius in Etruria. Your army has been strengthened by Gallic recruits impressed by your victory, but you're operating deep in enemy territory with lengthening supply lines.",
    decisions: [
      {
        id: "coastal-route",
        text: "Take the coastal route",
        description: "Advance along the more accessible coastal road, dealing with Servilius' army first before turning inland.",
        outcomes: {
          description: "You choose the more conventional coastal route, making good progress with minimal hardship for your troops. However, your movements are easily tracked by Roman scouts, allowing both consular armies time to coordinate their responses. As you approach Servilius' position, you receive intelligence that Flaminius is moving to join him, threatening to trap your army between two Roman forces.",
          resources: { military: 0, economy: -5, morale: 0, political: -5 },
          nextScenarioId: "avoid-encirclement",
          principle: strategicPrinciples[1] // Economy of Force
        }
      },
      {
        id: "arno-marshes",
        text: "Cross the Apennines and Arno marshes",
        description: "Take the unexpected and difficult route through the mountains and marshlands to bypass Servilius and surprise Flaminius.",
        outcomes: {
          description: "You lead your army on an arduous four-day march through the flooded marshes of the Arno. The conditions are brutal—men march through chest-deep water, unable to sleep properly for days. You yourself lose the sight in one eye from an infection. Many baggage animals are lost, but your army emerges behind Flaminius' position, cutting him off from Rome and surprising him completely. The difficult march has positioned you perfectly for your next move.",
          resources: { military: -10, economy: -15, morale: 5, political: 15 },
          nextScenarioId: "lake-trasimene",
          principle: strategicPrinciples[6] // Indirect Approach
        }
      },
      {
        id: "raid-countryside",
        text: "Raid the rich countryside",
        description: "Delay confronting either consular army directly, instead focusing on devastating the rich farming regions to draw them into pursuing you on your terms.",
        outcomes: {
          description: "You spread your forces to systematically ravage the fertile Italian countryside, destroying farms, seizing supplies, and liberating slaves. This approach replenishes your resources and causes political pressure on the Roman consuls to stop you. Flaminius, in particular, becomes increasingly impatient as reports of the destruction reach Rome, making him more likely to act rashly when you finally allow him to engage you.",
          resources: { military: 0, economy: 20, morale: 10, political: 5 },
          nextScenarioId: "lake-trasimene-advantage",
          principle: strategicPrinciples[5] // Deception
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal chose the unexpected route through the Apennines and the marshes of the Arno. This four-day march through flooded terrain was extremely difficult—Hannibal himself lost sight in one eye from an infection—but it allowed his army to bypass one Roman army and emerge unexpectedly in Etruria behind Flaminius' position. This strategic movement set the stage for another major victory at Lake Trasimene."
  },
  {
    id: "lake-trasimene",
    title: "The Trap at Lake Trasimene",
    year: "217 BCE",
    leader: "Hannibal Barca",
    context: "Having emerged from the Arno marshes, your army is now in Etruria, behind Consul Flaminius' position. Flaminius is enraged by your devastation of the countryside and eager to engage before you can escape or the other consul can join him.",
    situation: "You've scouted an ideal location for an ambush near Lake Trasimene, where the road passes through a narrow defile between the hills and the lakeshore. A morning fog frequently covers the area, limiting visibility. Your scouts report that Flaminius is hurriedly marching to catch you, pushing his army to move quickly without proper reconnaissance. You have approximately 30,000 troops against Flaminius' 25,000.",
    decisions: [
      {
        id: "trasimene-ambush",
        text: "Set the perfect ambush",
        description: "Position your troops in the hills overlooking the narrow passage by the lake, completely hidden from the road, and wait for the Romans to march into the trap.",
        outcomes: {
          description: "Under cover of night, you position your troops along the hills, concealing them completely from the road. At dawn, as a thick fog rolls in, Flaminius' army marches into the narrow defile, unaware of your presence. When the entire Roman column is in the trap, you give the signal to attack. Your forces charge down from the hills on all sides while your cavalry blocks both exits. In the fog and confusion, the Romans can't form proper battle lines. Within three hours, 15,000 Romans are killed or drowned in the lake attempting to escape, including Flaminius himself. Another 6,000 are captured, while only 4,000 escape.",
          resources: { military: 15, economy: 10, morale: 30, political: 25 },
          nextScenarioId: "dictator-appointed",
          principle: strategicPrinciples[7] // Attacking Weakness
        }
      },
      {
        id: "partial-ambush",
        text: "Split your forces",
        description: "Position part of your army for the ambush but keep a significant reserve to deal with unexpected developments or to pursue escapees.",
        outcomes: {
          description: "You set up a more conventional trap, keeping nearly a third of your forces in reserve. When the Romans enter the defile, your attack is still effective, but not as overwhelming as it might have been. More Romans manage to break out of the encirclement, including Flaminius himself. While still a significant victory, with perhaps 10,000 Romans killed and 5,000 captured, it lacks the psychological impact of completely destroying a consular army.",
          resources: { military: 5, economy: 5, morale: 15, political: 10 },
          nextScenarioId: "dictator-appointed-lesser",
          principle: strategicPrinciples[1] // Economy of Force
        }
      },
      {
        id: "conventional-battle",
        text: "Offer conventional battle",
        description: "Rather than an ambush, position your forces openly and challenge Flaminius to a traditional pitched battle, relying on your tactical superiority.",
        outcomes: {
          description: "You arrange your troops in standard battle formation on favorable ground and allow the Romans to approach with full knowledge of your position. Flaminius, eager for battle, accepts the challenge. While your superior cavalry and veteran infantry give you an advantage, the Romans are able to form proper battle lines and put up organized resistance. The battle is hard-fought, with significant casualties on both sides. You emerge victorious, but at a much higher cost than might have been necessary.",
          resources: { military: -15, economy: -5, morale: 5, political: 0 },
          nextScenarioId: "pyrrhic-advance",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal executed one of the largest and most successful ambushes in military history at Lake Trasimene. He positioned his entire army in the hills overlooking the narrow road between the lake and the hills. When Flaminius' army entered the four-mile-long defile in the morning fog, Hannibal's forces attacked from all sides. In the ensuing chaos, around 15,000 Romans were killed (including Flaminius) and 6,000 captured. Only about 4,000 escaped. The destruction of an entire consular army caused panic in Rome, leading to the appointment of Quintus Fabius Maximus as dictator."
  },
  {
    id: "dictator-appointed",
    title: "Facing the Dictator",
    year: "217 BCE",
    leader: "Hannibal Barca",
    context: "Your stunning victory at Lake Trasimene has thrown Rome into panic. For the first time since the Gallic invasion a century ago, Rome has appointed a dictator—Quintus Fabius Maximus—granting him extraordinary powers for six months to deal with the crisis.",
    situation: "With two massive victories against consular armies, the road to Rome itself appears open. However, Fabius adopts an unexpected strategy, refusing to meet you in open battle. Instead, he shadows your movements from a distance, harassing your foraging parties and cutting off stragglers while avoiding direct confrontation. This 'Fabian strategy' prevents you from achieving another decisive victory while slowly depleting your resources. Meanwhile, many Italian allies remain loyal to Rome, denying you the widespread defections you had hoped for.",
    decisions: [
      {
        id: "march-on-rome",
        text: "March directly on Rome",
        description: "Take advantage of the panic following Trasimene to make a bold move against Rome itself, hoping to force a decisive battle or even capture the city.",
        outcomes: {
          description: "You direct your army toward Rome, moving rapidly to capitalize on the post-Trasimene panic. However, as you approach the formidable walls of the capital, you discover that the Romans have recalled troops from other fronts and prepared substantial defenses. Fabius refuses to be provoked into a pitched battle even with Rome threatened. Lacking siege equipment and with insufficient forces to blockade the large city effectively, you're forced to withdraw after demonstrating Rome's vulnerability but achieving no concrete gains.",
          resources: { military: -5, economy: -15, morale: -10, political: 5 },
          nextScenarioId: "southern-strategy",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      },
      {
        id: "ravage-campania",
        text: "Invade Campania",
        description: "Move into the rich agricultural region of Campania, devastating the countryside to draw Fabius into battle while replenishing your supplies.",
        outcomes: {
          description: "You lead your army into the fertile plains of Campania, systematically plundering this rich agricultural heartland of the Roman Republic. Your troops gather abundant supplies and your Numidian cavalry excels in this open terrain. Fabius continues his cautious approach, following you along the hills and occasionally cutting off isolated raiding parties, but never risking a major engagement. His strategy frustrates your troops and officers, but also draws criticism from Roman politicians who see their lands devastated without response.",
          resources: { military: 5, economy: 20, morale: 5, political: 10 },
          nextScenarioId: "fabius-trap",
          principle: strategicPrinciples[3] // Political Primacy
        }
      },
      {
        id: "seek-italian-allies",
        text: "Focus on diplomatic outreach",
        description: "Dedicate effort to persuading Italian cities and tribes to defect from Rome, promising liberation from Roman domination.",
        outcomes: {
          description: "You send emissaries to various Italian communities, especially those with historical grievances against Rome. You release Italian prisoners without ransom while keeping Roman citizens captive, demonstrating your claim that you fight Rome, not Italy. Despite these efforts, most Italian allies remain loyal to Rome, especially in central Italy. However, you make some progress with certain Samnite and Greek communities in the south, who provide supplies and intelligence if not yet open alliance.",
          resources: { military: 0, economy: 5, morale: 0, political: 15 },
          nextScenarioId: "southern-strategy",
          principle: strategicPrinciples[3] // Political Primacy
        }
      }
    ],
    historicalOutcome: "Historically, after Trasimene, Hannibal did not march on Rome, recognizing he lacked the resources for a successful siege. Instead, he moved into Campania and other rich areas, devastating the countryside while seeking to draw Fabius into battle and persuade Italian allies to defect from Rome. Fabius, nicknamed 'the Delayer,' refused decisive engagement, following Hannibal at a distance and cutting off stragglers. This strategy was unpopular in Rome but prevented Hannibal from achieving another victory. Eventually, Roman impatience with Fabius' approach would lead to the disaster at Cannae under more aggressive leadership."
  },
  {
    id: "fabius-trap",
    title: "Escaping Fabius' Trap",
    year: "217 BCE",
    leader: "Hannibal Barca",
    context: "After months of devastating Campania under Fabius' frustrating shadow, you find yourself in a dangerous position. Fabius has finally sprung his trap, blocking the narrow pass at Callicula—your planned exit route from Campania back to the open plains of Apulia where your cavalry can operate effectively.",
    situation: "Your army is now potentially trapped in the Falernian Plain. Fabius has positioned forces to block all the mountain passes leading out of the region, with his main army occupying the heights overlooking the pass at Callicula. With winter approaching, you cannot remain in the now-depleted Campanian countryside, but forcing the pass against Fabius' advantageous position would result in heavy casualties.",
    decisions: [
      {
        id: "night-attack",
        text: "Attack the pass at night",
        description: "Launch a surprise night attack to dislodge Fabius' forces from their strong position guarding the pass.",
        outcomes: {
          description: "You organize your best troops for a dangerous night assault on the heights controlling the pass. Fighting uphill in darkness proves extremely difficult, with units becoming disoriented and coordination breaking down. Fabius' troops, holding strong defensive positions and anticipating your desperation, repel the attack with heavy casualties on your side. You're forced to withdraw and seek another solution with your army now weakened.",
          resources: { military: -20, economy: -5, morale: -15, political: -5 },
          nextScenarioId: "winter-retreat",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "cattle-deception",
        text: "Use the cattle deception",
        description: "Create a diversion using oxen with torches tied to their horns to confuse the Romans about your army's movements at night.",
        outcomes: {
          description: "You devise an ingenious deception. Having collected about 2,000 oxen during your campaign, you order torches tied to their horns. After nightfall, your light infantry drives these cattle up the hillsides away from the pass, lighting the torches as they go. Fabius, seeing the moving lights in the darkness, believes it's your main army trying to escape over the hills. He redirects troops to intercept this perceived movement, weakening his position at the main pass. Meanwhile, your actual army quietly moves through the partially defended Callicula pass and escapes to Apulia with minimal losses. By daybreak, when Fabius realizes the deception, you're already safely away.",
          resources: { military: 5, economy: -5, morale: 15, political: 20 },
          nextScenarioId: "cannae-prelude",
          principle: strategicPrinciples[5] // Deception
        }
      },
      {
        id: "find-unknown-path",
        text: "Scout for an unknown path",
        description: "Commit significant resources to finding an overlooked or poorly defended mountain path that could allow your army to escape the trap.",
        outcomes: {
          description: "You dispatch your most skilled scouts, offering substantial rewards for finding an alternative route. After several tense days, they identify a difficult but passable path through the mountains that Fabius has left lightly guarded, believing it too treacherous for an army to use. Moving primarily at night and maintaining strict discipline, you lead your army through this challenging route. The difficult terrain causes some losses in baggage animals and supplies, but your main force escapes intact, leaving Fabius frustrated by your evasion.",
          resources: { military: -5, economy: -10, morale: 5, political: 10 },
          nextScenarioId: "cannae-prelude",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal escaped Fabius' trap using the ingenious cattle deception. He ordered torches tied to the horns of about 2,000 oxen, which were driven up into the hills at night with the torches lit. The Romans, seeing the moving lights, thought Hannibal's army was trying to escape over the hills and diverted forces to intercept. Meanwhile, Hannibal led his actual army through the now under-defended Callicula pass. By the time Fabius realized the deception, the Carthaginian army had safely escaped to Apulia. This episode further damaged Fabius' reputation in Rome, as critics claimed he had deliberately let Hannibal escape."
  },
  {
    id: "cannae-prelude",
    title: "The Eve of Cannae",
    year: "216 BCE",
    leader: "Hannibal Barca",
    context: "Fabius' six-month term as dictator has ended, and Rome has returned to regular governance with new consuls elected: Gaius Terentius Varro and Lucius Aemilius Paullus. Frustrated by Fabius' cautious strategy, the Roman Senate has authorized the largest army in Roman history—approximately 80,000 men—to confront and destroy you once and for all.",
    situation: "After seizing the Roman supply depot at Cannae in Apulia, you've established a position on the plain near the Aufidus River. The massive Roman army has arrived nearby, with the two consuls alternating daily command according to Roman custom. Your intelligence indicates that Varro favors aggressive action while Paullus is more cautious, having been convinced of the merits of Fabius' approach. Tomorrow is Varro's day of command, and he appears eager to force a battle on the open plain—seemingly ideal conditions for your superior cavalry but challenging given the Romans' significant numerical advantage.",
    decisions: [
      {
        id: "conventional-formation",
        text: "Use a conventional formation",
        description: "Deploy your troops in a standard formation, placing your best infantry in the center and cavalry on the wings, fighting a conventional but well-executed battle.",
        outcomes: {
          description: "You arrange your forces in a traditional formation, with your veteran African infantry as the center and core of your line. When the Romans advance, your center holds firm while your superior cavalry drives the Roman horsemen from the field. However, the sheer numbers of the Roman infantry prevent a decisive outcome. After a day of bloody fighting, both armies withdraw with heavy casualties. While you've inflicted more damage than you've taken, this inconclusive result allows the Romans to regroup and continue the campaign.",
          resources: { military: -15, economy: -5, morale: 0, political: -5 },
          nextScenarioId: "war-of-attrition",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "cannae-trap",
        text: "Set the double-envelopment trap",
        description: "Deploy your army in a crescent formation with the center deliberately weakened to draw in the Roman infantry, planning to envelop them completely once they advance.",
        outcomes: {
          description: "You implement an audacious battle plan. You place your weaker Gallic and Spanish infantry in the center, arranged in a convex formation bulging toward the Romans, with your elite African infantry hidden in deep formation at the flanks. Your heavy cavalry under Hasdrubal is positioned on the left, opposite the Roman allied cavalry, while your Numidian light cavalry takes the right wing.\n\nWhen battle begins, your center initially holds but gradually gives way under Roman pressure, deliberately withdrawing in a controlled manner while maintaining formation. The Romans, sensing victory, pour more troops into the center, creating a dense, unwieldy mass. Meanwhile, Hasdrubal's cavalry crushes the Roman horse on your left, sweeps around behind the Roman army to help defeat their remaining cavalry, then attacks the Roman infantry from the rear.\n\nSimultaneously, your elite African infantry, concealed on the flanks, wheel inward to attack the Roman flanks. The Romans, already packed too densely to maneuver and now surrounded on all sides, are trapped in one of the most perfect double-envelopments in military history. By day's end, some 50,000-70,000 Romans lie dead, including Consul Paullus, scores of senators, and countless officers. It is possibly the most catastrophic defeat Rome has ever suffered.",
          resources: { military: 25, economy: 15, morale: 35, political: 30 },
          nextScenarioId: "post-cannae",
          principle: strategicPrinciples[7] // Attacking Weakness
        }
      },
      {
        id: "avoid-battle",
        text: "Refuse battle on Varro's terms",
        description: "Recognizing the risk of engaging such a numerically superior force, withdraw to more favorable terrain where the Roman numerical advantage would be neutralized.",
        outcomes: {
          description: "You order your army to pull back from the plain, seeking more defensible positions in the nearby hills. Varro, eager for battle on his day of command, attempts to force an engagement, but you successfully evade any major confrontation. The next day, under the more cautious Paullus' command, the Romans maintain a defensive posture. This continues for several days, with Varro unable to bring you to battle on his terms and Paullus unwilling to risk aggressive action. Eventually, supply concerns force both armies to seek new positions. The strategic situation remains unchanged, but you've avoided the risk of facing Rome's largest army on their preferred terms.",
          resources: { military: 0, economy: -10, morale: -10, political: -15 },
          nextScenarioId: "extended-campaign",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      }
    ],
    historicalOutcome: "Historically, Hannibal executed one of the most brilliant tactical masterpieces in military history at Cannae. Using the double-envelopment strategy, he deliberately weakened his center to draw in the Romans, then surrounded and annihilated them. Roughly 50,000-70,000 Romans were killed, including Consul Paullus, 80 senators, and numerous officers. This catastrophic defeat sent shockwaves through Rome and remains one of the most studied battles in military history. Despite this incredible victory, Hannibal did not march on Rome, recognizing he still lacked the resources for a successful siege of the well-fortified city."
  },
  {
    id: "post-cannae",
    title: "After Cannae",
    year: "216 BCE",
    leader: "Hannibal Barca",
    context: "Your stunning victory at Cannae has shaken Rome to its core. Never in its history has the Republic suffered such a catastrophic defeat. Panic grips the city, with rumors of your imminent arrival causing further chaos. However, Rome has not sued for peace, and survivors report that the Senate is organizing the defense of the city, even forbidding public mourning to maintain morale.",
    situation: "Your army, though victorious, has suffered casualties and needs rest. You've captured massive amounts of equipment and thousands of prisoners. More importantly, your victory has finally convinced many of Rome's Italian allies to reconsider their loyalty. Several cities in southern Italy, particularly in Campania, Samnium, and Magna Graecia, are now open to defection. The most significant potential ally is Capua, the second largest city in Italy. Meanwhile, your brother Mago is pushing to return to Carthage with news of the victory to secure reinforcements.",
    decisions: [
      {
        id: "march-on-rome",
        text: "March on Rome immediately",
        description: "Capitalize on Roman panic by moving quickly toward Rome itself, hoping to force a surrender or capture the city in its moment of maximum vulnerability.",
        outcomes: {
          description: "You gather your forces and march rapidly toward Rome, hoping to exploit the post-Cannae panic. However, as you approach, you find the Romans have enacted emergency measures, manning the walls with every available man, including veterans normally exempt from service. Your cavalry reconnaissance reveals that the city's formidable defenses remain intact, and without proper siege equipment, a direct assault would be costly and likely unsuccessful. After demonstrating before the walls for several days, you're forced to withdraw without achieving a decisive result. Meanwhile, several potential Italian allies, seeing your failure to capitalize on Cannae, reconsider their defection.",
          resources: { military: -10, economy: -15, morale: -15, political: -20 },
          nextScenarioId: "southern-strategy-weakened",
          principle: strategicPrinciples[0] // Center of Gravity
        }
      },
      {
        id: "secure-allies",
        text: "Focus on securing Italian allies",
        description: "Prioritize diplomatic efforts to bring more Italian cities into alliance against Rome, particularly Capua and the cities of Magna Graecia.",
        outcomes: {
          description: "You direct your energy toward diplomatic initiatives, meeting with representatives from various Italian cities and demonstrating your commitment to freeing Italy from Roman domination. Capua, the second-largest city in Italy, formally allies with you, providing valuable resources and a strategic base in Campania. Several other cities in Samnium, Lucania, and Bruttium also defect from Rome. While these new allies strengthen your position in southern Italy, they also create defensive obligations, as Rome will inevitably target these 'traitors' once they recover from Cannae. The need to protect these allies will constrain your strategic flexibility but provide crucial resources for sustaining your campaign.",
          resources: { military: 10, economy: 20, morale: 10, political: 15 },
          nextScenarioId: "holding-italy",
          principle: strategicPrinciples[3] // Political Primacy
        }
      },
      {
        id: "request-reinforcements",
        text: "Send Mago to Carthage for reinforcements",
        description: "Send your brother back to Carthage with news of your victory and trophies from Cannae to secure substantial reinforcements for continuing the war.",
        outcomes: {
          description: "You dispatch Mago to Carthage with news of your extraordinary victory, sending along captured Roman equipment and the gold rings of fallen Roman nobility as evidence of your success. In Carthage, Mago delivers a powerful speech to the Senate, dramatically dumping bushels of gold rings taken from dead Roman knights on the floor. This demonstration helps counter the influence of the Hanno faction, which opposes committing more resources to the Italian campaign. The Carthaginian Senate votes to send reinforcements, though fewer than you requested, and they will take months to arrive. Meanwhile, your army rests and recuperates while you consolidate control in regions that have defected from Rome.",
          resources: { military: 15, economy: 10, morale: 5, political: 5 },
          nextScenarioId: "holding-italy",
          principle: strategicPrinciples[3] // Political Primacy
        }
      }
    ],
    historicalOutcome: "Historically, after Cannae, Hannibal did not march on Rome, a decision later criticized by some. Instead, he focused on diplomatic efforts to break apart Rome's network of Italian allies. Capua and several other cities in southern Italy defected to his side. He sent his brother Mago to Carthage with news of the victory (along with bushels of gold rings taken from dead Roman knights) to secure reinforcements. The Carthaginian Senate did vote to send some reinforcements, but far fewer than Hannibal needed. Meanwhile, Rome recovered from the shock of Cannae with remarkable resilience, raising new armies and adopting a strategy of avoiding major battles while targeting Hannibal's allies."
  },
  {
    id: "finale",
    title: "Historical Conclusion",
    year: "202 BCE",
    leader: "Hannibal Barca",
    context: "Despite your brilliant victories at Trebia, Lake Trasimene, and Cannae, the war has stretched on for years. The Romans adopted Fabius' strategy of avoiding direct confrontation with you while methodically recapturing your Italian allies. Meanwhile, the young Roman general Scipio Africanus invaded North Africa, forcing Carthage to recall you from Italy.",
    situation: "After 16 years in Italy, you returned to defend your homeland. Now you face Scipio at Zama with an army less experienced than your veteran Italian force. Scipio has neutralized your cavalry advantage by allying with the Numidian king Masinissa, and your remaining elephants were countered by his innovative tactical formation. Despite your tactical genius, the battle ended in defeat. Carthage has sued for peace under harsh terms that will effectively end its status as a major power.",
    decisions: [
      {
        id: "accept-history",
        text: "Acknowledge historical outcome",
        description: "Reflect on the historical conclusion of the Second Punic War and Hannibal's legacy.",
        outcomes: {
          description: "The historical outcome saw Hannibal eventually defeated, but his campaign is remembered as one of the most brilliant military expeditions in history. For 16 years, he occupied Italian soil, winning stunning victories against overwhelming odds. His tactical innovations at Cannae have been studied by military commanders for over 2,000 years.\n\nThough ultimately unsuccessful in his strategic aim of breaking Roman power, Hannibal demonstrated the principles of strategic brilliance, tactical flexibility, and leadership that make him one of history's greatest commanders. His willingness to take calculated risks, his understanding of psychology in warfare, and his ability to use terrain to his advantage remain lessons for strategic thinkers in any field.",
          resources: { military: 0, economy: 0, morale: 0, political: 0 },
          nextScenarioId: "game-over",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      },
      {
        id: "new-campaign",
        text: "Begin a new historical scenario",
        description: "Start a new strategic simulation with a different historical leader and scenario.",
        outcomes: {
          description: "You've completed the Hannibal campaign! Choose this option to start a new historical strategy simulation with a different leader and scenario. Future scenarios could include Alexander at Gaugamela, Napoleon's Russian Campaign, Wellington at Waterloo, Admiral Yi Sun-sin defending Korea, Genghis Khan's invasion of Khwarazm, or Julius Caesar's Gallic Wars. Each presents unique strategic challenges and opportunities to apply different principles of strategic thinking.",
          resources: { military: 0, economy: 0, morale: 0, political: 0 },
          nextScenarioId: "restart",
          principle: strategicPrinciples[4] // Know Yourself and Know Your Enemy
        }
      }
    ],
    isFinale: true,
    historicalOutcome: "Despite Hannibal's tactical genius, the Second Punic War ultimately ended in Carthaginian defeat. Rome's strategic resilience, vast manpower reserves, and adoption of the Fabian strategy of avoiding direct confrontation while targeting Hannibal's allies proved effective over time. After Scipio invaded North Africa and defeated Hannibal at Zama in 202 BCE, Carthage was forced to accept harsh peace terms. Hannibal later served Carthage as a civil reformer before being driven into exile by Roman pressure. He continued to resist Roman power while serving other kingdoms until, facing capture, he took poison in 183 BCE, allegedly declaring: 'Let us relieve the Romans of their fear, since they think it too long to wait for the death of an old man.'"
  }
];

// Initial game state
export const initialGameState = {
  currentScenarioId: "hannibal-218bc",
  resources: {
    military: 75, // Army strength
    economy: 70, // Economic/supply status
    morale: 80,  // Army morale
    political: 65 // Political/diplomatic capital
  },
  history: [],
  turn: 1,
  gameOver: false,
  principles: strategicPrinciples
};
