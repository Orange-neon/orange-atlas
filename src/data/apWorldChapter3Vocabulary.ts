interface Chapter3VocabularyQuestion {
  id: number;
  sec: string;
  type: "mc";
  prompt: string;
  ch: string[];
  cor: "A" | "B" | "C" | "D";
  exp: string;
}

const letters = ["A", "B", "C", "D"] as const;

const question = (
  id: number,
  sec: string,
  prompt: string,
  choices: [string, string, string, string],
  correct: Chapter3VocabularyQuestion["cor"],
  explanation: string,
): Chapter3VocabularyQuestion => ({
  id,
  sec,
  type: "mc",
  prompt,
  ch: choices.map((choice, index) => `${letters[index]}) ${choice}`),
  cor: correct,
  exp: explanation,
});

export const apWorldChapter3VocabularyBank: Chapter3VocabularyQuestion[] = [
  question(
    1,
    "Chapter 3 · Networks of Exchange",
    "Which term identifies the shifting, relay-based system of overland Eurasian routes that linked China, Central Asia, the Islamic world, and the Mediterranean, moving compact luxury goods as well as religions, technologies, and epidemic disease through many intermediaries rather than through continuous end-to-end journeys?",
    ["Sea Roads", "American web", "Sand Roads", "Silk Roads"],
    "D",
    "The Silk Roads were the overland Eurasian network defined by segmented caravan trade and high-value, low-bulk goods. The Sand Roads are the close distractor because they also relied on caravan relays, but they crossed the Sahara and centered especially on gold, salt, and enslaved people.",
  ),
  question(
    2,
    "Chapter 3 · Networks of Exchange",
    "Which term names the oasis at the western edge of China whose position at a branching point of trans-Eurasian routes fostered commerce and Buddhist cultural transmission, leaving a major cave-temple complex and a sealed manuscript library containing texts in numerous languages?",
    ["Melaka", "Dunhuang", "Great Zimbabwe", "Chaco Phenomenon"],
    "B",
    "Dunhuang was a Chinese oasis and Silk Roads crossroads famous for the Mogao caves and multilingual manuscripts. Melaka is the close distractor because it too was cosmopolitan, but it occupied a maritime chokepoint in Southeast Asia rather than an oasis corridor in northwestern China.",
  ),
  question(
    3,
    "Chapter 3 · The Mongol Moment",
    "Which term identifies the steppe leader who overcame enslavement, clan rivalries, and aristocratic opposition; was proclaimed universal ruler in 1206; reorganized followers into disciplined decimal units that cut across tribal loyalties; and initiated the conquests his descendants expanded across Eurasia?",
    ["Temujin/Chinggis Khan", "Kublai Khan", "Zheng He", "pochteca"],
    "A",
    "Temujin took the title Chinggis Khan after unifying the Mongols and began the imperial conquests. Kublai Khan is the close distractor because he was a major Mongol ruler, but he was Chinggis's grandson and later founded the Yuan dynasty.",
  ),
  question(
    4,
    "Chapter 3 · The Mongol Moment",
    "Which term best describes the interconnected thirteenth-century campaigns through which Chinggis Khan and his successors attacked northern China, Central Asia, the Islamic Middle East, the Russian principalities, and parts of eastern Europe, producing destruction on a scale contemporaries experienced as a Eurasian catastrophe?",
    ["Black Death", "Crusades", "Mongol world war", "Ming Dynasty"],
    "C",
    "Mongol world war is the interpretive label for the linked conquest campaigns that transformed much of Eurasia. The Crusades are the close distractor because they were also extended multi-regional wars, but they were Latin Christian expeditions focused chiefly on the eastern Mediterranean.",
  ),
  question(
    5,
    "Chapter 3 · The Mongol Moment",
    "Which term identifies the grandson of Chinggis Khan who became Great Khan, completed the defeat of the Southern Song, declared the Yuan dynasty, ruled China from present-day Beijing, and combined Chinese imperial institutions with privileges for Mongols and other non-Chinese groups?",
    ["Temujin/Chinggis Khan", "Kublai Khan", "Zheng He", "Ming Dynasty"],
    "B",
    "Kublai Khan founded the Yuan dynasty and completed the Mongol conquest of China. Chinggis Khan is the close distractor because he founded the Mongol Empire, but he died decades before the Southern Song fell and never ruled a unified China as a dynastic emperor.",
  ),
  question(
    6,
    "Chapter 3 · States and Empires",
    "Which term names the Chinese ruling house founded in 1368 after the expulsion of the Mongol Yuan, known for rebuilding a Confucian bureaucratic state, strengthening imperial institutions, sponsoring Zheng He's early fifteenth-century expeditions, and later ending those state-directed voyages?",
    ["Chaco Phenomenon", "Great Zimbabwe", "Kublai Khan", "Ming Dynasty"],
    "D",
    "The Ming Dynasty replaced Mongol rule in China and sponsored Zheng He's voyages before discontinuing them. Kublai Khan is the close distractor because his Yuan regime also ruled China through imperial structures, but it was the Mongol dynasty the Ming overthrew.",
  ),
  question(
    7,
    "Chapter 3 · Consequences of Connection",
    "Which term identifies the mid-fourteenth-century pandemic, generally associated with Yersinia pestis, that traveled through increasingly integrated Afro-Eurasian routes, devastated communities from East Asia and the Islamic world to Europe, produced severe labor shortages, and destabilized established social relations?",
    ["Black Death", "Mongol world war", "Crusades", "American web"],
    "A",
    "The Black Death was the catastrophic fourteenth-century plague pandemic spread through connected trade routes. Mongol world war is the close distractor because Mongol conquest reshaped those routes, but it names military campaigns rather than the epidemic.",
  ),
  question(
    8,
    "Chapter 3 · Networks of Exchange",
    "Which term identifies the Indian Ocean commercial system that joined East Africa, the Middle East, South Asia, Southeast Asia, and China; depended on predictable monsoon winds; carried bulk commodities more cheaply than caravans; and generated cosmopolitan ports without one empire policing the entire network?",
    ["American web", "Silk Roads", "Sea Roads", "Sand Roads"],
    "C",
    "The Sea Roads were the maritime Indian Ocean network whose vessels exploited monsoon cycles and transported large cargoes. The Silk Roads are the close distractor because they connected many of the same civilizations, but overland caravans emphasized compact luxury goods.",
  ),
  question(
    9,
    "Chapter 3 · Commercial Cities",
    "Which term names the powerful southern African center whose monumental mortarless stone enclosures expressed elite authority, while wealth from cattle and regional gold production connected its inland rulers indirectly to Swahili ports and the Indian Ocean economy between roughly 1200 and 1450?",
    ["Dunhuang", "Chaco Phenomenon", "Melaka", "Great Zimbabwe"],
    "D",
    "Great Zimbabwe was an inland southern African political and commercial center tied through gold exports to Indian Ocean trade. Melaka is the close distractor because it also mediated long-distance commerce, but it was a Southeast Asian seaport rather than an inland stone-built capital.",
  ),
  question(
    10,
    "Chapter 3 · Commercial Cities",
    "Which term identifies the fifteenth-century Muslim sultanate at a narrow Southeast Asian strait whose rulers converted strategic geography into commercial power by protecting merchants, accommodating multiple communities, and organizing exchange between the Indian Ocean and South China Sea?",
    ["Dunhuang", "Melaka", "Great Zimbabwe", "House of Wisdom"],
    "B",
    "Melaka controlled a maritime chokepoint and became a diverse Islamic entrepôt. Dunhuang is the close distractor because it likewise flourished at a strategic trade junction, but it was an inland Silk Roads oasis rather than a Southeast Asian sultanate and seaport.",
  ),
  question(
    11,
    "Chapter 3 · States and Empires",
    "Which term identifies the Muslim eunuch admiral who commanded seven massive Ming expeditions from 1405 to 1433, projecting imperial prestige and expanding tribute relationships from Southeast Asia to Arabia and East Africa without establishing a durable Chinese territorial empire overseas?",
    ["Temujin/Chinggis Khan", "Kublai Khan", "Zheng He", "pochteca"],
    "C",
    "Zheng He commanded the Ming treasure fleets and used display, diplomacy, and force to reinforce tribute relationships. Kublai Khan is the close distractor because he also sponsored overseas expeditions from China, but his attempted invasions sought conquest and occurred earlier.",
  ),
  question(
    12,
    "Chapter 3 · Networks of Exchange",
    "Which term names the trans-Saharan routes that linked Mediterranean North Africa with West African societies, expanded dramatically after adoption of the dromedary, and exchanged salt, textiles, manufactured goods, gold, and enslaved people while carrying Islam and Arabic literacy southward?",
    ["Sand Roads", "Silk Roads", "Sea Roads", "American web"],
    "A",
    "The Sand Roads crossed the Sahara through camel caravans. The Silk Roads are the close distractor because they were also segmented overland routes, but they traversed Eurasia and were especially associated with long-distance luxury exchange.",
  ),
  question(
    13,
    "Chapter 3 · Technologies of Exchange",
    "Which term identifies the single-humped dromedary whose ability to carry heavy loads, tolerate heat, and travel for long intervals with little water made sustained caravan commerce across the Sahara far more practical after its introduction into North Africa?",
    ["Sea Roads", "pochteca", "Sand Roads", "Arabian camel"],
    "D",
    "The Arabian camel was the transport animal whose desert adaptations transformed trans-Saharan exchange. The Sand Roads are the close distractor because that network depended on dromedary caravans, but the term names the routes rather than the enabling animal.",
  ),
  question(
    14,
    "Chapter 3 · Cultural Exchange",
    "Which term identifies the series of Latin Christian military expeditions beginning in 1095 that sought control of Jerusalem and other sacred territories, created temporary states in the eastern Mediterranean, intensified religious hostility, and increased western European contact with Mediterranean trade and knowledge?",
    ["Crusades", "Mongol world war", "Ming Dynasty", "Black Death"],
    "A",
    "The Crusades were papally authorized Latin Christian expeditions directed principally toward the Holy Land. Mongol world war is the close distractor because it also describes prolonged Eurasian warfare, but its steppe-led conquests pursued imperial expansion rather than recovery of Christian holy places.",
  ),
  question(
    15,
    "Chapter 3 · American Connections",
    "Which term describes the less densely integrated pre-Columbian exchange system that linked Mesoamerica, portions of North America, and the Andes only indirectly, spreading selected crops and cultural practices while constrained by north-south geography and the absence of large draft animals?",
    ["Sea Roads", "Silk Roads", "American web", "Sand Roads"],
    "C",
    "The American web was the looser interregional network connecting American societies before sustained Atlantic contact. The Silk Roads are the close distractor because they also transmitted goods and ideas across a vast landmass, but Afro-Eurasian routes were more densely integrated and used pack animals.",
  ),
  question(
    16,
    "Chapter 3 · American Connections",
    "Which term identifies the specialized long-distance merchants of the Mexica world who traveled beyond imperial frontiers for rare luxury goods, belonged to organized and privileged occupational communities, and could gather political and military intelligence for rulers as well as conduct commerce?",
    ["pochteca", "Zheng He", "Silk Roads", "Arabian camel"],
    "A",
    "Pochteca were specialized Mexica merchants whose journeys could serve commercial, diplomatic, and intelligence functions. The Silk Roads are the close distractor because they likewise involved long-distance luxury exchange, but they were a Eurasian route network rather than a merchant class.",
  ),
  question(
    17,
    "Chapter 3 · American Connections",
    "The Chaco Phenomenon in present-day New Mexico is distinguished by which combination of infrastructure and commerce?",
    [
      "A coastal harbor system that used monsoon winds to exchange bulk cargo with East Africa",
      "Great houses, ceremonial spaces, and engineered roads supporting a regional system that obtained goods such as turquoise, shells, and macaws",
      "An imperial highway built chiefly to collect taxes for the Mexica state",
      "A camel-caravan network carrying gold and salt across a desert",
    ],
    "B",
    "Chaco linked monumental great houses and ceremonial sites through roads and far-reaching exchange. The imperial-highway answer is the close distractor because Chaco had impressive coordinated infrastructure, but historians do not identify it as a Mexica-style tax empire.",
  ),
  question(
    18,
    "Chapter 3 · American Connections",
    "In the context of the American web, how did pochteca differ most significantly from the principal economic agents of the Inca Empire?",
    [
      "They were hereditary priests who redistributed tribute, whereas Inca merchants privately sold luxury goods",
      "They commanded maritime treasure fleets, whereas Inca officials managed camel caravans",
      "Both groups were salaried market inspectors who operated independently of political authorities",
      "They were professional long-distance merchants who could trade and gather intelligence, whereas Inca exchange relied more heavily on state officials, labor obligations, and redistribution",
    ],
    "D",
    "Pochteca combined specialized commerce with possible intelligence work; the Inca economy relied far more on state-organized labor and redistribution. The salaried-inspector answer is close only in recognizing political oversight, but it erases the distinct institutions governing exchange in the two empires.",
  ),
  question(
    19,
    "Chapter 3 · Consequences of Connection",
    "The Black Death is frequently cited as a major cause of which mid-fourteenth-century development, especially in parts of western Europe?",
    [
      "Severe labor scarcity that strengthened many surviving workers' bargaining position and weakened some forms of serfdom",
      "The immediate and simultaneous abolition of coerced labor throughout all of Afro-Eurasia",
      "The launch of the Ming treasure fleets to quarantine China from European merchants",
      "The conversion of West African rulers to Islam through trans-Saharan pilgrimage",
    ],
    "A",
    "Mass mortality created acute labor shortages and could improve wages or bargaining power for survivors, contributing in some regions to serfdom's decline. Universal abolition is the close distractor because it extends a regional tendency into an immediate Afro-Eurasian transformation that did not occur.",
  ),
  question(
    20,
    "Chapter 3 · Networks of Exchange",
    "How did the Sand Roads most directly reshape the political landscape of post-classical West Africa?",
    [
      "They transferred the region to direct Chinese rule through tribute fleets",
      "They prevented rulers from taxing commerce because caravans permanently bypassed urban centers",
      "Control and taxation of gold-salt commerce enriched states such as Ghana and Mali while connecting rulers to Islamic diplomatic and scholarly networks",
      "They replaced inland states with independent Swahili ports governed from the Indian Ocean coast",
    ],
    "C",
    "Revenue and strategic control derived from trans-Saharan commerce supported powerful West African states and stronger connections to the Islamic world. The bypass answer is close because merchants could choose routes, but major states prospered precisely by protecting, channeling, and taxing trade.",
  ),
  question(
    21,
    "Chapter 3 · Cultural Exchange",
    "The House of Wisdom in ninth-century Baghdad best exemplifies which broader trend in Islamic civilization?",
    [
      "The rejection of foreign scholarship in favor of exclusively oral religious teaching",
      "The translation, synthesis, and extension of Greek, Persian, and Indian learning within an Arabic-speaking cosmopolitan scholarly world",
      "The replacement of scientific inquiry by military training for Mongol cavalry",
      "The transfer of the Abbasid capital to a Buddhist monastery in Central Asia",
    ],
    "B",
    "The House of Wisdom represents the Abbasid-era translation movement and the creative development of knowledge drawn from several traditions. Calling it mere preservation is a close but incomplete interpretation: scholars also criticized, synthesized, and extended inherited learning.",
  ),
  question(
    22,
    "Chapter 3 · Cultural Exchange",
    "Which unintended consequence of the Crusades most influenced the subsequent development of western Europe?",
    [
      "They permanently reunited the Roman Catholic and Eastern Orthodox churches",
      "They ended Mediterranean commerce by eliminating Italian merchant communities",
      "They placed western Europe under lasting political rule from Jerusalem",
      "They intensified commercial and intellectual contacts with the eastern Mediterranean, benefiting trading cities and widening access to goods and knowledge",
    ],
    "D",
    "Although conquest of holy places was the stated purpose, crusading movement also expanded commercial and cultural contact. The claim that the churches reunited is the close distractor because crusaders interacted with Byzantium, but the campaigns deepened rather than healed major divisions.",
  ),
  question(
    23,
    "Chapter 3 · The Mongol Moment",
    "How did the Mongol world war transform the social and military organization of Inner Eurasian pastoral peoples under Chinggis Khan?",
    [
      "It dissolved cavalry forces and replaced them with infantry recruited from Chinese examination graduates",
      "It preserved autonomous clan armies under hereditary nobles and prohibited promotion by ability",
      "It reorganized men into mixed decimal units, weakened older tribal loyalties, and tied advancement and discipline more directly to the khan",
      "It converted steppe confederations into maritime republics governed by merchant councils",
    ],
    "C",
    "Decimal units deliberately mixed tribal affiliations and strengthened loyalty to Chinggis Khan, while discipline and merit aided expansion. Preserving clan armies is the close distractor because earlier steppe forces were clan-based, but breaking those loyalties was central to the reorganization.",
  ),
  question(
    24,
    "Chapter 3 · The Mongol Moment",
    "Which strategy best describes Kublai Khan's government of Yuan China?",
    [
      "He adopted Chinese dynastic titles and administrative practices while reserving important privileges and offices for Mongols and other favored non-Chinese groups",
      "He assimilated completely, abolished Mongol legal distinctions, and restored the Song ruling family",
      "He governed only through mobile camps and refused to use cities, taxation, or Chinese officials",
      "He transferred the imperial capital to Samarkand and made Persian the sole language of government",
    ],
    "A",
    "Kublai used Chinese imperial forms pragmatically without erasing a hierarchy that privileged Mongols. Complete assimilation is the close distractor because he did adopt many Chinese institutions, but the Yuan maintained significant ethnic and political distinctions.",
  ),
  question(
    25,
    "Chapter 3 · States and Empires",
    "Following the collapse of Mongol rule, how did the Ming Dynasty seek to restore Chinese civilization and political legitimacy?",
    [
      "By preserving Yuan ethnic hierarchies and making Tibetan Buddhism the exclusive state doctrine",
      "By reviving Confucian education and examinations, rebuilding agriculture and infrastructure, and presenting the dynasty as a restoration of Chinese rule",
      "By abolishing centralized bureaucracy in favor of independent pastoral clans",
      "By relocating the population to Indian Ocean colonies administered by Zheng He",
    ],
    "B",
    "The early Ming restored Confucian state practices and repaired an economy and landscape damaged by late-Yuan disorder. Simply continuing Yuan institutions is the close distractor because the Ming inherited some imperial machinery, but its legitimacy emphasized the restoration of Chinese rule.",
  ),
  question(
    26,
    "Chapter 3 · Consequences of Connection",
    "What was the broader relationship between the Black Death and the Mongol Empire's networks of exchange?",
    [
      "The plague remained confined to Mongolia because caravan stations prevented infected travelers from moving west",
      "The plague created Mongol unity by increasing the population and tax base of every khanate",
      "The plague ended all Eurasian exchange permanently and caused every Mongol khanate to collapse in the same year",
      "Routes secured and intensified under Mongol rule helped pathogens move across Eurasia, while mortality later disrupted commerce, revenue, and political stability without producing one uniform outcome",
    ],
    "D",
    "Mongol-era integration facilitated movement, including disease transmission; subsequent demographic shock weakened economies and governments unevenly. Total and simultaneous collapse is the close distractor because plague contributed to instability, but its effects varied and trade eventually continued.",
  ),
  question(
    27,
    "Chapter 3 · Networks of Exchange",
    "Which factor most distinguishes the Sea Roads from the Silk Roads in terms of economic capacity?",
    [
      "Sea Roads carried only religious ideas, whereas Silk Roads carried all physical merchandise",
      "Sea Roads depended on one unified oceanic empire that fixed prices throughout the network",
      "Ships could move heavier, bulkier cargo at a lower cost per unit than pack-animal caravans, broadening the range and volume of traded goods",
      "Ships eliminated seasonal constraints, while caravans alone depended on predictable weather",
    ],
    "C",
    "Maritime transport made bulk staples and larger cargo volumes economically practical. A single policing empire is the close distractor because states protected portions of the routes, but no one empire administered the entire Indian Ocean system.",
  ),
  question(
    28,
    "Chapter 3 · Commercial Cities",
    "What most directly enabled Great Zimbabwe to emerge as a powerful state in the Southeast African interior?",
    [
      "Its rulers built an ocean-going navy that directly conquered India and Arabia",
      "Agricultural and cattle wealth combined with control of regional gold flows that reached Indian Ocean commerce through Swahili ports",
      "Its location on the Strait of Malacca allowed it to tax every vessel sailing to China",
      "Its monopoly over trans-Saharan salt mines supported an alliance with the Abbasid caliphate",
    ],
    "B",
    "Great Zimbabwe joined a productive cattle and farming economy to control over inland gold exchanged through coastal intermediaries. Direct naval control is the close distractor because Indian Ocean commerce mattered greatly, but Great Zimbabwe was inland and did not rule that ocean with a fleet.",
  ),
  question(
    29,
    "Chapter 3 · States and Empires",
    "What was the primary objective of the Ming maritime expeditions led by Zheng He?",
    [
      "To settle millions of Chinese farmers in permanent colonies throughout East Africa",
      "To discover a previously unknown sea route to the Americas before European navigators",
      "To display Ming power, secure recognition and tribute, conduct diplomacy, and encourage commerce within an existing Indian Ocean system",
      "To conquer Japan and replace the emperor with a Ming provincial governor",
    ],
    "C",
    "The treasure fleets projected prestige and reinforced diplomatic and tributary relationships rather than seeking a settler empire. Overseas colonization is the close distractor because the fleets possessed enormous coercive capacity, but they did not establish a durable Ming territorial empire abroad.",
  ),
  question(
    30,
    "Chapter 3 · Technologies of Exchange",
    "What was the primary function of a caravanserai along the Silk Roads?",
    [
      "To serve as a permanent imperial capital from which one ruler governed the entire network",
      "To provide fortified lodging, water, food, storage, and trading space for merchants, animals, and cargo moving between route segments",
      "To manufacture ocean-going junks for monsoon navigation",
      "To train pochteca as intelligence agents for Mexica rulers",
    ],
    "B",
    "Caravanserais supported relay commerce by sheltering merchants and animals and facilitating local exchange. Calling them customs capitals is the close distractor because officials sometimes monitored or taxed commerce nearby, but no single caravanserai governed the trans-Eurasian network.",
  ),
];

const testOrders: Record<string, number[]> = {
  "ap-world-vocab-chapter-3-1": [1, 4, 7, 10, 13, 17, 20, 23, 26, 29],
  "ap-world-vocab-chapter-3-2": [2, 5, 8, 11, 14, 18, 21, 24, 27, 30],
  "ap-world-vocab-chapter-3-3": [3, 6, 9, 12, 15, 16, 19, 22, 25, 28],
};

export const apWorldChapter3VocabularyTests: Record<string, Chapter3VocabularyQuestion[]> =
  Object.fromEntries(
    Object.entries(testOrders).map(([slug, order]) => [
      slug,
      order.map((questionNumber, index) => ({
        ...apWorldChapter3VocabularyBank[questionNumber - 1],
        id: index + 1,
      })),
    ]),
  );
