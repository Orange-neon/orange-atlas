import { apWorldContentReviews } from "./apWorldContentReviews";

interface ChapterQuestion {
  id: number;
  sec: string;
  type: "mc";
  prompt: string;
  ch: string[];
  cor: string;
  exp: string;
}

const letters = ["A", "B", "C", "D"] as const;

const readingQuestion = (
  id: number,
  prompt: string,
  choices: [string, string, string, string],
  correct: (typeof letters)[number],
  explanation: string,
): ChapterQuestion => ({
  id,
  sec: "Chapters 1–2 · Cumulative Reading Test",
  type: "mc",
  prompt,
  ch: choices.map((choice, index) => `${letters[index]}) ${choice}`),
  cor: correct,
  exp: explanation,
});

const inMixedOrder = (questions: ChapterQuestion[], order: number[]): ChapterQuestion[] =>
  order.map((questionNumber, index) => ({
    ...questions[questionNumber - 1],
    id: index + 1,
  }));

const mixedReading1: ChapterQuestion[] = [
  readingQuestion(
    1,
    "Which statement most accurately describes the Agricultural Revolution presented in Chapter 1?",
    [
      "It developed independently through a gradual, sometimes reversible process but produced no lasting increase in population, settlement, or social complexity.",
      "It developed independently in many regions through a gradual, sometimes reversible process and eventually supported larger, more settled populations.",
      "It ended human migration because every agricultural community became a permanent city.",
      "It began after 1200 CE when pastoral peoples taught settled villagers to cultivate grain.",
    ],
    "B",
    "Agriculture emerged independently in roughly fifteen to twenty places between 10,000 and 2000 BCE. The transition was hesitant and sometimes reversed, but it ultimately supported population growth, villages, cities, and states.",
  ),
  readingQuestion(
    2,
    "A historian comparing Mesopotamian ziggurats with Egyptian pyramids would most accurately identify ziggurats as",
    [
      "stepped temple platforms that placed a city's sacred complex above the surrounding settlement and expressed the authority of its patron deity and priesthood.",
      "stepped royal tombs that preserved a pharaoh's body, placed his funeral cult above the city, and guaranteed his passage into the afterlife among the gods.",
      "military watchtowers built along the Silk Roads to protect caravans from pastoral nomads.",
      "public marketplaces designed primarily for electing Mesopotamian officials.",
    ],
    "A",
    "Mesopotamian ziggurats were elevated temple complexes at the religious and civic heart of a city. Egyptian pyramids, by contrast, were monumental royal tombs, which makes the tomb description the tempting but incorrect alternative.",
  ),
  readingQuestion(
    3,
    "Which formulation best captures the relationship among atman, Brahman, and moksha in philosophical Hinduism?",
    [
      "Atman was a priestly sacrifice offered to Brahman so that an entire caste could avoid karma.",
      "Atman was permanently separate from Brahman, and moksha meant release from an inferior rebirth through promotion into a higher caste within the same cycle.",
      "Atman, the individual soul, was ultimately part of Brahman, and moksha was liberation achieved by realizing or rejoining that ultimate unity.",
      "Brahman was the founder of Hinduism, and moksha was his code of laws for Indian rulers.",
    ],
    "C",
    "The Upanishads described atman as part of Brahman, the ultimate reality. A better rebirth could mark karmic progress, but moksha meant release from rebirth altogether, not merely promotion within caste society.",
  ),
  readingQuestion(
    4,
    "Which assessment of the Song dynasty examination system is most consistent with the reading?",
    [
      "It selected military governors by testing their skill with horses and weapons.",
      "It assigned offices by lottery so merchants and peasants would hold equal political power.",
      "It eliminated the advantages of wealth by giving every boy identical publicly funded schooling and the same preparation before competing for government office.",
      "It offered limited mobility to some talented commoners while still favoring men with privileged access to schooling.",
    ],
    "D",
    "The examinations allowed a modest route upward, sometimes with village or landlord sponsorship, but affluent families retained a major advantage because their sons could obtain the necessary education.",
  ),
  readingQuestion(
    5,
    "Which comparison best explains how Korea and Japan participated in the Chinese world order?",
    [
      "Both borrowed extensively from China while retaining political independence and adapting Chinese practices to local institutions and culture.",
      "Both borrowed extensively, but Korea did so only after permanent Chinese conquest and direct administration, whereas unconquered Japan could choose which institutions to accept.",
      "Both rejected Chinese writing and Buddhism in order to preserve entirely isolated cultures.",
      "Both became provinces administered by officials appointed through the Song examination system.",
    ],
    "A",
    "Korea maintained its own dynasties within a tributary relationship, and unconquered Japan borrowed voluntarily. Chinese influence was substantial in both, but neither simply became a Chinese province.",
  ),
  readingQuestion(
    6,
    "Which description most accurately characterizes Swahili civilization between about 800 and 1500?",
    [
      "It was a nomadic confederation that grew wealthy by breeding horses for the Mongol armies.",
      "It consisted chiefly of Arab and Persian settlers who displaced Bantu-speaking Africans, transplanted Islam, and governed the East African coast as overseas colonies.",
      "It comprised Bantu-speaking East African city-states whose merchants embraced Islam and Indian Ocean commerce while retaining an African identity.",
      "It was a centralized inland empire whose rulers prohibited maritime trade and Muslim settlement.",
    ],
    "C",
    "Swahili cities were commercially and religiously linked to the wider Indian Ocean, but their language and cultural foundations remained African. Describing them as transplanted Arab colonies erases that central continuity.",
  ),
  readingQuestion(
    7,
    "Which comparison best explains the different early political histories of Christianity and Islam?",
    [
      "Both began as official Roman religions but later lost imperial support.",
      "Muhammad created a state-building community in Arabia, while early Christians remained a minority under Roman rule and faced intermittent persecution before imperial adoption.",
      "Muhammad created a state-building community in Arabia, while early Christians remained a Roman minority because their teachings permanently prohibited political participation even after imperial adoption.",
      "Neither tradition formed institutions or communities beyond the founder's lifetime.",
    ],
    "B",
    "Islam began with a politically organized umma that unified much of Arabia. Christianity developed for centuries under Roman authority and became the empire's state religion only in 380 CE.",
  ),
  readingQuestion(
    8,
    "Which combination of developments provides the strongest evidence for widespread commercialization in Song China?",
    [
      "The disappearance of cities, the closing of canals, and a return to household self-sufficiency",
      "A ban on market farming combined with taxes collected only in grain and cloth",
      "Cash taxes, specialized production, and waterways expanded, but paper money and credit remained unavailable throughout Song China",
      "Cash taxes, specialized production for sale, paper money and credit, and a vast network of internal waterways",
    ],
    "D",
    "Waterways moved goods cheaply, while cash taxes pushed producers into markets and paper money and credit eased exchange. A canal system alone would be weaker evidence than this full combination.",
  ),
  readingQuestion(
    9,
    "Which distinction between Aztec and Inca imperial rule is most accurate?",
    [
      "Aztec rulers usually left local communities alone if tribute arrived, whereas Inca rulers used governors, resettlement, record keeping, and required labor to penetrate local life more deeply.",
      "Both empires governed indirectly through local leaders, but the Inca relied more heavily on tribute deliveries and avoided labor obligations, governors, resettlement, household records, and other administrative demands.",
      "Aztec officials abolished tribute, while Inca officials prohibited any form of state labor.",
      "Both empires were representative democracies whose provinces elected their rulers.",
    ],
    "A",
    "Aztec power was comparatively loose and tribute-centered. The Inca state was more bureaucratic and intrusive, using provincial governors, resettlement, quipus, and the mita labor obligation.",
  ),
  readingQuestion(
    10,
    "The reading's description of premodern Silk Roads commerce most strongly supports which conclusion?",
    [
      "Goods passed through many transactions, but individual merchants normally accompanied them across the full Eurasian route from China to Rome.",
      "Most trade consisted of low-value grain carried across the Atlantic in a single voyage.",
      "Goods normally passed through many transactions and traveled farther than the individual merchants who handled them.",
      "Religious and technological ideas could not move along routes designed for commercial exchange.",
    ],
    "C",
    "Silk Roads exchange worked through linked segments and repeated transactions. A product might cross Eurasia even though no individual merchant traveled the entire distance.",
  ),
];

const mixedReading2: ChapterQuestion[] = [
  readingQuestion(
    1,
    "Which description best reflects the variety of Paleolithic societies discussed in Chapter 1?",
    [
      "They all lived in permanent cities governed by hereditary kings.",
      "Many lived in small, mobile, relatively egalitarian bands, but others formed permanent settlements with wealth differences, slavery, or large monuments.",
      "They were generally mobile and egalitarian, and permanent settlements, inherited wealth, coerced labor, and monumental construction appeared only after communities adopted agriculture.",
      "They relied primarily on iron tools, domesticated horses, and written law codes.",
    ],
    "B",
    "Small nomadic bands were common, but the chapter explicitly rejects a single Paleolithic pattern by noting settled foragers, status differences, slavery, and monuments among some communities.",
  ),
  readingQuestion(
    2,
    "The replacement of wheat by barley in southern Mesopotamia after centuries of irrigation best illustrates which process?",
    [
      "Human modification increased production but also caused salt to accumulate, forcing farmers to adopt a more salt-tolerant crop.",
      "Human modification raised production and accumulated salt, but farmers responded by abandoning irrigation and grain cultivation throughout southern Mesopotamia.",
      "Pastoral invaders outlawed wheat because they regarded barley as a sacred crop.",
      "The Atlantic slave trade introduced a New World grain that displaced local agriculture.",
    ],
    "A",
    "Intensive irrigation caused salinization, and barley tolerated the salty soil better than wheat. The example shows that environmental engineering could create new ecological constraints.",
  ),
  readingQuestion(
    3,
    "Which development most clearly distinguished Mahayana Buddhism from earlier Theravada practice?",
    [
      "Mahayana rejected karma and rebirth in favor of worshipping nature spirits alone.",
      "Mahayana continued restricting enlightenment to monks whose disciplined self-effort rejected supernatural assistance and popular devotional practice.",
      "Mahayana emphasized compassionate bodhisattvas and made enlightenment more accessible within ordinary life.",
      "Mahayana restored Brahmin sacrifices as the only valid route to nirvana.",
    ],
    "C",
    "Mahayana traditions offered spiritual helpers and a path open well beyond monastic specialists. Theravada more strongly emphasized the Buddha as a teacher and disciplined individual effort.",
  ),
  readingQuestion(
    4,
    "Which statement provides the most complete assessment of women's lives in Song China?",
    [
      "Commercial growth ended patriarchal restrictions because women controlled all urban textile workshops.",
      "Foot binding and lost textile income tightened constraints, but these changes were fully offset because women of every class gained equal inheritance, schooling, and access to examinations.",
      "Women's status declined uniformly in every area of life and at every social level.",
      "Patriarchal ideals, foot binding, and the loss of lucrative weaving work tightened constraints, even as women's property rights and access to education expanded in some contexts.",
    ],
    "D",
    "Song women's experiences moved in more than one direction. The period brought harsher gender norms and economic losses alongside unusually strong dowry and inheritance rights and some additional education.",
  ),
  readingQuestion(
    5,
    "Why did Japan's borrowing from China produce a political order different from China's?",
    [
      "Japan copied the Chinese bureaucracy completely but replaced its emperor with an elected merchant council.",
      "Because borrowing was voluntary, Japan could combine imported culture with local institutions; its emperor retained ceremonial prestige while real power became decentralized among aristocrats and warriors.",
      "Japan borrowed voluntarily and combined Chinese culture with local institutions, but created a centralized examination bureaucracy stronger than Song China's and permanently subordinated warriors to scholar-officials.",
      "China occupied Japan and required every province to be governed by a samurai.",
    ],
    "B",
    "Japan adopted writing, Buddhism, and court practices without reproducing China's durable centralized bureaucracy. Political decentralization instead elevated aristocratic families and samurai.",
  ),
  readingQuestion(
    6,
    "Which generalization best describes Southeast Asia's encounters with India and China from 600 to 1500?",
    [
      "Trade and diplomacy carried Hindu, Buddhist, Islamic, and Chinese influences that local societies selectively adapted into distinct states and cultures.",
      "Trade and diplomacy carried Hindu, Buddhist, Islamic, and Chinese traditions, but local societies accepted them so completely that indigenous languages, institutions, and beliefs disappeared.",
      "Southeast Asia remained outside Indian Ocean commerce until direct European conquest.",
      "Every mainland and island kingdom became an administrative province of either India or China.",
    ],
    "A",
    "Vietnam adapted strong Chinese influences, while maritime states drew heavily from India and Indian Ocean religions. In both cases, local peoples blended outside ideas with indigenous practices.",
  ),
  readingQuestion(
    7,
    "How could the Islamic world remain a recognizable civilization after its political unity weakened?",
    [
      "The Abbasid caliph continued appointing every governor, judge, scholar, and military commander from Spain to India after 1200 despite the supposed rise of regional sultanates.",
      "Regional societies stopped trading with one another and abandoned Arabic learning.",
      "Shared texts and practices, ulama networks, pilgrimage, education, and commerce connected Muslims across competing states.",
      "All Muslims accepted a single ruler and eliminated Sunni-Shia differences.",
    ],
    "C",
    "The Dar al-Islam was politically fragmented but culturally connected. Common religious texts, scholars, law, pilgrimage, and trade sustained a transregional civilization without a single effective government.",
  ),
  readingQuestion(
    8,
    "Which description best explains the spread of Islam in West Africa?",
    [
      "It began when the Byzantine Empire conquered Mali and imposed Eastern Orthodoxy.",
      "It immediately erased indigenous beliefs among farmers throughout the countryside.",
      "It traveled through trans-Saharan commerce and gained strength among elites, but quickly displaced indigenous practice among rural farmers throughout West Africa.",
      "It traveled through trans-Saharan commerce and first gained particular strength among rulers, merchants, and urban elites while coexisting with local traditions.",
    ],
    "D",
    "Trade and elite adoption anchored Islam in courts and commercial cities such as Timbuktu. Its influence was important but uneven, and older beliefs remained especially strong outside urban centers.",
  ),
  readingQuestion(
    9,
    "Why did some merchants in medieval Western Europe gain more political independence than merchants in Song China?",
    [
      "Europe's fragmented order let towns negotiate political privileges because its commerce was far more extensive than Song China's and therefore harder for rulers to regulate.",
      "Europe's fragmented political order let towns negotiate charters and privileges, even though Chinese commerce was more extensive.",
      "Europe's fragmented political order eliminated kings and churches from public life entirely.",
      "Chinese cities had no markets, money, or long-distance trade for merchants to use.",
    ],
    "B",
    "Competing rulers, nobles, and church authorities gave European cities bargaining room. China's stronger state constrained merchants despite presiding over a much larger commercial economy.",
  ),
  readingQuestion(
    10,
    "Which comparison between the Aztec and Inca empires is most accurate?",
    [
      "Both were created in the fifteenth century by previously marginal peoples who conquered older cultural centers, but they developed substantially different systems of imperial administration.",
      "Both were created by previously marginal peoples who conquered older cultural centers, and regular diplomatic contact led them to exchange officials and institutions until both used identical tribute governments.",
      "Both arose as overseas colonies founded by Spanish conquistadores before 1200.",
      "Both rejected the religious and political traditions of the peoples they conquered.",
    ],
    "A",
    "The Mexica and Inca each built rapidly on older regional traditions, but the Aztec state remained looser and tribute-focused while the Inca state intervened much more directly in provincial life.",
  ),
];

const mixedReading3: ChapterQuestion[] = [
  readingQuestion(
    1,
    "Which explanation best accounts for the prominence of pastoral societies in Central Asia, Arabia, and the Sahara?",
    [
      "Dense forests made wheeled plows too efficient for settled farmers to compete.",
      "Pastoralism required year-round rainfall and could not function in grasslands or deserts.",
      "Mobile herding turned vegetation in regions poorly suited to crops into food, materials, transport, and military power; small Andean llama and alpaca communities were a rare American counterpart.",
      "Mobile herding turned vegetation in regions poorly suited to crops into food, materials, transport, and military power across Afro-Eurasia, but no community anywhere in the pre-Columbian Americas developed a comparable pastoral adaptation.",
    ],
    "C",
    "Pastoralists flourished where crop farming was difficult and moved seasonally with their animals. The Andean exception makes the otherwise plausible claim of no American pastoralism incomplete.",
  ),
  readingQuestion(
    2,
    "Why can historians describe a society as an urban civilization even when most of its people live outside cities?",
    [
      "The word urban means that agriculture and rural labor have disappeared.",
      "Only residents of capital cities counted as members of ancient societies.",
      "Cities concentrated administration, culture, markets, and specialized work, while imported food rather than a much larger rural population supplied the surplus that sustained them.",
      "Cities concentrated administration, culture, markets, and specialized work, while a much larger rural population produced the surplus that sustained them.",
    ],
    "D",
    "Cities defined civilization as political, cultural, manufacturing, and commercial hubs, but peasant farmers and herders remained the overwhelming majority and supported urban specialists.",
  ),
  readingQuestion(
    3,
    "Which comparison of classical Chinese and Indian social organization is most precise?",
    [
      "Both were hierarchical, but China elevated scholar-officials and offered limited examination mobility, whereas India ranked Brahmins highest and divided society into more numerous, rigid groups based on occupation and ritual purity.",
      "Both were hierarchical, but India elevated scholar-officials through examinations and divided people into broad political ranks, while China placed hereditary priests above rigid occupational groups defined by ritual purity in public office and religious life.",
      "Both gave merchants the highest rank because trade supplied most state revenue.",
      "Neither connected social inequality to cultural or religious traditions.",
    ],
    "A",
    "Birth shaped status in both societies, but their organizing principles differed. Political and educational office ranked highly in China, while priestly ritual purity and a more rigid caste structure distinguished India.",
  ),
  readingQuestion(
    4,
    "A Chinese official promotes education and filial piety at court, then withdraws to a mountain retreat for meditation and simplicity. The reading would interpret this behavior as",
    [
      "evidence that Daoism required officials to impose harsh laws on their families.",
      "a rejection of every Chinese tradition in favor of missionary Buddhism.",
      "the complementary use of Confucian public ethics and Daoist private withdrawal.",
      "proof that Confucianism and Daoism could coexist only after one had been abolished by the state.",
    ],
    "C",
    "Many elites treated the traditions as complementary: Confucianism guided public service and relationships, while Daoism offered retreat, spontaneity, and alignment with nature.",
  ),
  readingQuestion(
    5,
    "Which development most directly supported China's population increase from roughly 50–60 million in the ninth century to about 120 million by 1200?",
    [
      "The abandonment of southern rice farming in favor of northern pastoralism",
      "The adoption from Vietnam of fast-ripening, drought-resistant Champa rice as part of a broader expansion in agricultural production",
      "The adoption of Champa rice from Vietnam, whose slow ripening and dependence on heavy rain reduced multiple cropping and limited broader agricultural growth",
      "The replacement of canals by overland camel caravans carrying American maize",
    ],
    "B",
    "Many features of Song prosperity reinforced one another, but improved agricultural output—especially Champa rice—most directly made sustained population growth possible.",
  ),
  readingQuestion(
    6,
    "Which statement best describes Korea's adaptation of Chinese institutions?",
    [
      "Korea joined the tribute system and adopted examinations and Chinese elite culture, but those examinations displaced aristocratic families more completely than in China and opened most offices to commoners.",
      "Chinese influence eliminated Korean political independence and all writing in the Korean language.",
      "Korea rejected the tribute system but copied only China's military organization.",
      "Korea joined the tribute system and borrowed elite culture, but aristocrats kept a strong hold on office and the later hangul alphabet strengthened a distinct Korean culture.",
    ],
    "D",
    "Chinese models strongly shaped Korea's court, but examinations never challenged aristocratic officeholding as much as they did in China. Hangul later provided a phonetic system suited to Korean.",
  ),
  readingQuestion(
    7,
    "Why was Chinese influence in Vietnam both especially deep and persistently incomplete?",
    [
      "The Red River region experienced more than a millennium of direct Chinese rule and its elites adopted Chinese government, yet local language, gender customs, resistance traditions, and chu nom endured.",
      "Vietnamese elites borrowed Chinese government voluntarily, and no part of Vietnam experienced direct Chinese rule, so its local language and gender customs endured only because Chinese influence remained superficial throughout the first millennium CE.",
      "Vietnam adopted Chinese institutions only after Mongol settlers replaced the local population.",
      "Chinese influence ended all tribute missions once Vietnam became independent in 939.",
    ],
    "A",
    "Direct rule from 111 BCE to 939 CE helps explain Vietnam's deep institutional borrowing. Political independence did not erase tribute or elite Sinicization, but popular culture remained distinct.",
  ),
  readingQuestion(
    8,
    "Which comparison between the ulama and Sufi teachers is most accurate?",
    [
      "Both rejected the Quran and replaced Islam with local polytheism.",
      "The ulama led Christian monasteries, while Sufis administered the Chinese civil service.",
      "The ulama preserved legal and scholarly traditions, while Sufis emphasized personal mystical experience and often helped Islam take root in frontier regions.",
      "The ulama preserved Islamic law and scholarly traditions, while Sufis opposed every local adaptation and therefore rarely attracted converts or established devotional communities beyond Arabia.",
    ],
    "C",
    "Ulama served as scholars, judges, and interpreters of sharia. Sufi practices offered a more experiential route to the divine and proved especially effective in culturally diverse frontier regions.",
  ),
  readingQuestion(
    9,
    "What made Byzantine Christianity useful to rulers of Kievan Rus?",
    [
      "It required Rus rulers to surrender their authority to the Roman Catholic pope.",
      "It connected Rus to a wealthy neighboring civilization, supplied a prestigious religious tradition, and helped rulers support political unity.",
      "It connected Rus to wealthy Byzantium and prestigious Orthodoxy but weakened Rus rulers by transferring final political authority to Constantinople's patriarch.",
      "It transformed Kievan Rus into an Islamic sultanate governed from Baghdad.",
    ],
    "B",
    "Byzantine Orthodoxy tied Rus culturally and diplomatically to Constantinople and could legitimize rulers. It did not place Rus under the Roman Catholic Church.",
  ),
  readingQuestion(
    10,
    "Which pairing correctly identifies an Inca administrative tool and its function?",
    [
      "Quipus — knotted cords used to record population and accounting data; mita — permanent labor owed exclusively by enslaved captives rather than periodically by households",
      "Ziggurats — provincial warehouses that distributed maize to laborers",
      "Cuneiform — a phonetic script used to publish Inca law",
      "Quipus — knotted cords used to record population and accounting data; mita — periodic labor owed by households to the state",
    ],
    "D",
    "Quipus supported record keeping in a society without a conventional writing system, while mita organized state labor. Chinampas were Aztec raised fields, not Inca records.",
  ),
];

const mixedReading4: ChapterQuestion[] = [
  readingQuestion(
    1,
    "Which chronological account of early human migration is most accurate?",
    [
      "Homo sapiens arose in the Americas and reached East Africa only after the Agricultural Revolution.",
      "Homo sapiens likely emerged in East Africa about 350,000–260,000 years ago, began migrating out of Africa about 100,000–60,000 years ago, and reached New Zealand by about 1200 CE.",
      "Homo sapiens likely emerged in East Africa about 350,000–260,000 years ago, migrated outward, and had occupied every landmass, including Antarctica and New Zealand, by 10,000 BCE without any later migrations.",
      "Human migration began with steamships and ended before people developed stone tools.",
    ],
    "B",
    "The reading traces a very long migration from East Africa to nearly every inhabitable landmass, with New Zealand as the final major settlement around 1200 CE; Antarctica remained uninhabited.",
  ),
  readingQuestion(
    2,
    "Which regions does Chapter 1 identify as the earliest independent centers of civilization between about 3500 and 3000 BCE?",
    [
      "Japan, Korea, and Vietnam",
      "Mali, Byzantium, and the Aztec Empire",
      "Mesopotamia, Egypt, and the central coast of Peru",
      "Mesopotamia, Egypt, and the Indus valley, all created at exactly the same moment by one migrating people",
    ],
    "C",
    "The text identifies Mesopotamia, Egypt, and coastal Peru as the earliest centers in this date range. The Indus valley was another early civilization, but not part of this specific first trio in the reading.",
  ),
  readingQuestion(
    3,
    "Which example best supports the argument that physical geography influenced the political or cultural shape of civilizations?",
    [
      "The Atlantic Ocean encouraged regular diplomatic contact between the Inca and Song empires.",
      "River valleys made intensive agriculture impossible in Mesopotamia and Egypt.",
      "Greek mountains favored rival city-states, while Panama's narrow forests encouraged intensive and continuous exchange between Mesoamerica and the Andes.",
      "Greek mountains favored rival city-states, while Panama's narrow, forested terrain limited contact between Mesoamerica and the Andes.",
    ],
    "D",
    "The reading connects Greek fragmentation to mountains and limited inter-American contact to Panama's difficult terrain. River valleys generally aided, rather than prevented, intensive agriculture.",
  ),
  readingQuestion(
    4,
    "Which generalization about slavery in early civilizations is best supported by the reading?",
    [
      "Slavery appeared in many civilizations but varied greatly in importance; it was especially central in Greek and Roman society.",
      "Slavery appeared in many civilizations in an identical economic form and consistently accounted for about one-third of every urban and rural population from China to Rome.",
      "No civilization practiced slavery until Europeans crossed the Atlantic after 1492.",
      "Only pastoral societies enslaved people because cities had no demand for labor.",
    ],
    "A",
    "Many civilizations enslaved debtors or prisoners, but the institution's scale differed. The unusually high proportions in Athens and the Roman heartland made slavery especially defining there.",
  ),
  readingQuestion(
    5,
    "Why did the Bhakti movement help Hinduism regain strength as Buddhism declined in India?",
    [
      "It required philosophical study in Sanskrit and restricted worship to Brahmins.",
      "It offered ordinary people an emotionally accessible path of devotion that sometimes pushed against caste and gender barriers, while Hinduism also absorbed Buddhist elements.",
      "It offered ordinary people an emotionally accessible devotional path that challenged caste and gender barriers, but insisted that the Buddha and Buddhist ideas could never be incorporated into Hindu belief.",
      "It replaced every Hindu deity with the Chinese concept of the Mandate of Heaven.",
    ],
    "B",
    "Bhakti devotion was accessible outside elite ritual and speculation, and Hinduism's assimilative capacity included treating the Buddha as an incarnation of Vishnu.",
  ),
  readingQuestion(
    6,
    "Which statement best captures Judaism's world-historical significance in the reading?",
    [
      "It remained associated with a particular people and supplied foundations for Christianity and Islam while also operating as the first universal missionary faith to convert most Romans before Jesus.",
      "It originated as a branch of Islam after the Arab conquests.",
      "It remained associated with a particular people while supplying the monotheistic and scriptural foundation for the later, more widely spreading traditions of Christianity and Islam.",
      "It shared no beliefs, figures, or texts with later Abrahamic traditions.",
    ],
    "C",
    "Judaism was not initially a universal missionary tradition, but its monotheism and sacred history profoundly shaped Christianity and Islam.",
  ),
  readingQuestion(
    7,
    "Which combination most clearly shows that medieval Japan adapted rather than merely copied Chinese civilization?",
    [
      "Japan abolished its emperor, writing, and all local religious practices.",
      "The emperor retained ceremonial status as warriors gained power and Buddhism coexisted with kami, but Chinese writing permanently prevented Japan from developing a distinct court literature or culture.",
      "Japan rejected Buddhism but adopted Roman Catholicism through tribute missions to China.",
      "The emperor retained ceremonial status as warrior power decentralized; Chinese Buddhism coexisted with kami traditions; and a distinct court culture produced works such as The Tale of Genji.",
    ],
    "D",
    "Japan combined imported Buddhism, writing, and court culture with local kami beliefs and a decentralized warrior order. That selective synthesis, not institutional duplication, made it distinct.",
  ),
  readingQuestion(
    8,
    "Which comparison best describes Islam's political experience in India and Iberia between 1200 and 1450?",
    [
      "Muslim dynasties ruled much of India without converting most Indians, while Christian reconquest steadily reduced Muslim political control in Iberia.",
      "Muslim dynasties ruled both regions, converted nearly their entire populations by 1200, and maintained durable Islamic political control across India and Iberia after 1450.",
      "India became an Eastern Orthodox kingdom, while Iberia entered the Chinese tribute system.",
      "Neither region experienced religious coexistence, cultural exchange, or conflict.",
    ],
    "A",
    "The Delhi Sultanate governed a Hindu-majority society with limited penetration, while al-Andalus experienced a reversal as Christian states expanded. Both cases involved complex coexistence as well as conflict.",
  ),
  readingQuestion(
    9,
    "Which comparison of East and West African civilizations is most accurate?",
    [
      "Both depended on Atlantic plantations, but only West Africa had contact with Muslims.",
      "Both grew through long-distance trade and selective adoption of Islam; Swahili city-states faced the Indian Ocean, while West African states used trans-Saharan networks.",
      "Both grew through long-distance trade and adopted Islam, which immediately replaced local languages, political traditions, and indigenous beliefs among urban and rural populations in each region.",
      "Swahili civilization arose along the Niger River, while Mali controlled the East African coast.",
    ],
    "B",
    "Commerce connected both regions to the Islamic world without erasing their African foundations. Their key difference was geographic orientation: Indian Ocean coast versus trans-Saharan interior routes.",
  ),
  readingQuestion(
    10,
    "Which feature most clearly demonstrates a shared Mesoamerican cultural framework despite political fragmentation?",
    [
      "A single emperor imposed shared crops, market exchange, deities, ritual calendars, sacrifice, and hieroglyphic writing on every Maya and Aztec official for two thousand years.",
      "All states rejected maize farming and monumental religious architecture.",
      "Peoples shared crops, market exchange, deities, ritual calendars, sacrifice, and hieroglyphic traditions even while living in rival states and city-states.",
      "Peoples shared cultural traditions because regular ocean voyages connected them to the Andes.",
    ],
    "C",
    "Mesoamerica possessed durable cultural commonalities without lasting political unity. The Maya, for example, developed an especially elaborate writing system within a fragmented city-state order.",
  ),
];

const mixedReading5: ChapterQuestion[] = [
  readingQuestion(
    1,
    "What is the strongest evidence that the Agricultural Revolution did not produce one uniform kind of society?",
    [
      "Agricultural resources supported pastoral societies, villages, chiefdoms, and cities, but all eventually passed through the same fixed sequence toward centralized territorial empire.",
      "Agriculture eliminated gathering, hunting, and herding everywhere within a single generation.",
      "All farmers adopted identical kinship systems and gender roles regardless of environment.",
      "Agricultural resources supported pastoral societies, relatively egalitarian villages, chiefdoms, and urban civilizations in different settings.",
    ],
    "D",
    "Agricultural production opened new possibilities rather than dictating one outcome. Environment, local choices, and historical circumstances helped generate multiple forms of society.",
  ),
  readingQuestion(
    2,
    "Which evidence most strongly challenges a definition of civilization that requires both writing and severe hierarchy from the beginning?",
    [
      "Andean and West African civilizations lacked conventional writing, while some early Indus, Niger River, and coastal Peruvian centers show little evidence of sharp inequality or authoritarian rule.",
      "Every civilization used conventional writing and severe hierarchy from its beginning, although some recorded authority through alphabets while others preferred pictographs or syllabic signs that always served centralized rulers.",
      "Cities never supported specialists or political institutions.",
      "Civilizations existed only in isolated deserts where agriculture was impossible.",
    ],
    "A",
    "The reading emphasizes variation: some civilizations had no conventional written language, and several early cases do not display the intense hierarchy later associated with most civilizations.",
  ),
  readingQuestion(
    3,
    "Which pairing most accurately distinguishes characteristic monumental and written forms of ancient Mesopotamia and Egypt?",
    [
      "Mesopotamia: royal pyramids and hieroglyphs; Egypt: ziggurats and cuneiform",
      "Mesopotamia: ziggurats and cuneiform; Egypt: royal pyramids and hieroglyphs",
      "Mesopotamia: ziggurats used chiefly as royal tombs and cuneiform limited to religious spells; Egypt: democratic assembly halls and Latin",
      "Mesopotamia: Gothic cathedrals and movable type; Egypt: Buddhist stupas and Sanskrit",
    ],
    "B",
    "Ziggurats were Mesopotamian temple platforms, and cuneiform served administrative, economic, literary, and religious purposes. Egyptian pyramids were royal tombs associated with a hieroglyphic writing tradition.",
  ),
  readingQuestion(
    4,
    "Which statement best explains Buddhism's relationship to the Hindu traditions from which it emerged?",
    [
      "Buddhism retained karma, rebirth, meditation, and liberation while preserving Brahmin ritual authority, caste barriers, animal sacrifice, and metaphysical speculation as necessary parts of its discipline.",
      "Buddhism rejected every Hindu concept and had no South Asian intellectual roots.",
      "Buddhism retained ideas such as karma, rebirth, meditation, and liberation while challenging Brahmin authority, caste barriers, and metaphysical speculation.",
      "Buddhism retained caste as a barrier to enlightenment while replacing meditation with animal sacrifice.",
    ],
    "C",
    "The Buddha drew on a shared South Asian framework but rejected the ritual monopoly and social exclusions associated with Brahmins, offering a more individually accessible discipline.",
  ),
  readingQuestion(
    5,
    "Muhammad's idea of the umma was politically significant primarily because it",
    [
      "defined a moral community united by belief that could supersede competing tribal and clan loyalties.",
      "defined a moral community united by belief but preserved tribe and clan as the only legitimate foundations for political allegiance, law, and collective military action.",
      "required every Muslim to speak Persian and live within the city of Mecca.",
      "separated religious belief completely from the new state formed in Arabia.",
    ],
    "A",
    "The umma offered a new basis for solidarity centered on shared faith rather than territory, language, or tribe, helping make Islam both a religious and state-building movement.",
  ),
  readingQuestion(
    6,
    "Which set of evidence best supports the description of Song China as technologically and industrially dynamic?",
    [
      "The abolition of metallurgy and a state ban on printed books",
      "Coal-fueled iron, printed books, advanced ships, navigation, and gunpowder grew, but all were imported from Europe rather than developed within China",
      "The replacement of iron tools with stone and the closure of Buddhist workshops",
      "Coal-fueled iron production, cheap printed books, advanced ships and navigation, and the development of gunpowder weapons",
    ],
    "D",
    "Song production combined large industrial output with major innovations in printing, navigation, shipbuilding, and gunpowder. Coal fueled much of its metallurgy and household energy use.",
  ),
  readingQuestion(
    7,
    "How did Srivijaya turn its geographic position into political power?",
    [
      "It conquered the Chinese interior and collected land taxes from rice farmers along the Yellow River.",
      "It controlled the Strait of Melaka, taxed passing ships, drew on gold and spices, and used the revenue to support administration and naval security.",
      "It controlled the Strait of Melaka and taxed passing ships, but rejected Indian merchants, Buddhist teaching, foreign advisers, and every imported idea of political or sacred authority.",
      "It monopolized the trans-Saharan camel routes between Mali and Morocco.",
    ],
    "B",
    "Srivijaya's command of a maritime choke point generated revenue and attracted commerce. Its rulers also used Indian advisers and Buddhist ideas while retaining indigenous concepts of sacred kingship.",
  ),
  readingQuestion(
    8,
    "What role did Turkic-speaking peoples play in the Islamic world after about 1000?",
    [
      "After converting, Turkic warriors built sultanates and carried Islam into Anatolia and India, but surrendered their military authority so Abbasid officials could restore direct centralized rule.",
      "They remained outside Islam and prevented the religion from entering Anatolia or India.",
      "After converting, Turkic warriors built sultanates, became major military supporters of Islam, and carried the faith into regions including Anatolia and India.",
      "They replaced Islam with Buddhism throughout the Middle East by 1200.",
    ],
    "C",
    "Turkic groups moved from roles such as slave soldiers to political leadership. Seljuk and later Ottoman power made them central sustainers and expanders of Islamic civilization.",
  ),
  readingQuestion(
    9,
    "Which account best explains Western Europe's transformation after about 1000?",
    [
      "Agricultural improvements, population and town growth, mechanical energy, expanding trade, universities, and translated Greek and Arabic learning contributed to a more dynamic regional civilization.",
      "Agricultural improvements and mechanical energy increased population, but towns, commerce, universities, translated learning, and exchange with Byzantine and Islamic societies continued shrinking until well after 1500.",
      "Europe unified immediately under one bureaucracy and ended conflict among states.",
      "European scholars rejected all knowledge from Byzantine and Islamic societies.",
    ],
    "A",
    "The High Middle Ages brought connected economic, urban, technological, and intellectual changes. Political fragmentation persisted, and borrowing from Byzantium, Islam, and Asia remained crucial.",
  ),
  readingQuestion(
    10,
    "Why did warfare and human sacrifice become closely connected in fifteenth-century Aztec ideology?",
    [
      "Captives supplied blood believed necessary for the sun and cosmic order, but public sacrifice remained separate from rulers, priests, political display, and imperial expansion.",
      "Sacrifice was a private family practice with no connection to rulers or imperial expansion.",
      "Aztec rulers borrowed sacrifice from the Inca only after Spanish conquest.",
      "Captives supplied blood believed necessary to sustain the sun and cosmic order, while public sacrifice also displayed the power of rulers and priests.",
    ],
    "D",
    "Aztec warfare emphasized capturing prisoners because their sacrifice was understood to nourish the sun. The rituals simultaneously legitimized expansion and impressed subjects, allies, and enemies.",
  ),
];

const mixedReading6: ChapterQuestion[] = [
  readingQuestion(
    1,
    "How did leaders in early agricultural chiefdoms most often exercise authority according to Chapter 1?",
    [
      "They commanded professional armies and enforced obedience through written imperial law.",
      "They relied heavily on generosity, ritual standing, personal charisma, tribute collection, and redistribution because their coercive power was limited.",
      "They relied on generosity, ritual standing, and persuasion but refused to collect tribute or redistribute goods because warfare, craft production, and ritual life remained entirely private.",
      "They won office through civil service examinations modeled on Song China.",
    ],
    "B",
    "Chiefs or big men could rarely compel followers by force. Their authority rested on prestige and their ability to gather resources and redistribute them to warriors, artisans, and ritual specialists.",
  ),
  readingQuestion(
    2,
    "Which set of examples best demonstrates that civilizations transformed as well as adapted to their environments?",
    [
      "Mesopotamian irrigation salinized soil, Chinese expansion cleared forests, and European growth damaged waterways, but these changes were unrelated to intensive civilizational production.",
      "Greek mountains disappeared after city-states began intensive farming.",
      "Mesopotamian irrigation produced salty soils, Chinese expansion cleared southern forests, and European growth drove deforestation and damage to waterways.",
      "Civilizations had no larger environmental impact than small Paleolithic bands.",
    ],
    "C",
    "The examples link population and intensive production to salinization, forest loss, erosion, and water damage. Geography shaped societies, but human choices also reshaped geography.",
  ),
  readingQuestion(
    3,
    "Which comparison of Theravada and Mahayana Buddhism is most accurate?",
    [
      "Theravada emphasized the Buddha as a wise model and disciplined self-effort, while Mahayana offered bodhisattvas, devotional aid, and a path more accessible to ordinary people.",
      "Theravada emphasized the Buddha as a model and disciplined self-effort, while Mahayana preserved the same exclusively monastic path and rejected bodhisattvas, devotional aid, and supernatural helpers.",
      "Theravada required worship of the Roman emperor, while Mahayana followed the Jewish Torah.",
      "Both traditions taught that caste and gender made enlightenment impossible.",
    ],
    "A",
    "Both remained Buddhist, but Mahayana adapted the tradition for a mass following through compassionate helpers and the possibility of enlightenment within ordinary life.",
  ),
  readingQuestion(
    4,
    "Which sequence most accurately describes Christianity's development before 1200?",
    [
      "Jesus sought to renew Judaism, Paul widened the faith, and imperial acceptance followed centuries of vulnerability, but every Christian community then remained permanently united under one bishop.",
      "Christianity began as Islam's largest sect and separated from it after the fall of Constantinople.",
      "Roman emperors made Christianity official before Jesus began teaching, then abolished it in 380 CE.",
      "Jesus sought to renew Judaism, Paul helped transform the movement into a wider faith, imperial acceptance followed centuries of vulnerability, and distinct regional churches eventually emerged.",
    ],
    "D",
    "Christianity grew from a Jewish renewal movement into a missionary religion. It gained Roman state support only after centuries and later developed Roman Catholic, Eastern Orthodox, and other branches.",
  ),
  readingQuestion(
    5,
    "Which statement best relates the roles of the ulama and Sufis in maintaining and expanding Islam?",
    [
      "Only the ulama mattered because mystical practice disappeared by 1000.",
      "Ulama networks preserved shared law and learning, while Sufi orders spread a personal and adaptable devotional practice; together they connected a politically fragmented Islamic world.",
      "Ulama networks preserved shared law while Sufis spread adaptable devotion, but both primarily enforced direct Abbasid political rule and eliminated regional practice across every Muslim society.",
      "Both rejected mosques, Quranic teaching, pilgrimage, and conversion.",
    ],
    "B",
    "The scholarly-legal and mystical approaches differed, sometimes sharply, but both created transregional networks that helped Islam endure without political unity and reach new societies.",
  ),
  readingQuestion(
    6,
    "Which contrast between Song China and medieval Japan is most accurate?",
    [
      "Both gave military men higher prestige than scholars and dismantled central government examinations.",
      "Song China decentralized into hereditary samurai domains as scholar-officials lost influence, while Japan created the world's most centralized examination bureaucracy and subordinated local warrior elites to tested officials.",
      "Song China sustained a centralized scholar-bureaucracy, while Japanese central authority weakened and local warrior elites gained power.",
      "Neither society used Chinese writing or practiced Buddhism.",
    ],
    "C",
    "The Song state elevated educated officials and bureaucratic government. Japan retained a court and emperor, but effective power increasingly shifted to provincial aristocrats and samurai.",
  ),
  readingQuestion(
    7,
    "How did the spread of Confucian family ideals affect Korea?",
    [
      "Court-backed Confucian norms eroded practices such as female inheritance and widow remarriage, especially among elites, even though Korea remained politically and culturally distinct.",
      "Confucian norms eroded female inheritance and widow remarriage among elites, and court decrees immediately transformed peasants, artisans, and enslaved people to precisely the same degree.",
      "They expanded free-choice marriage and made Korean restrictions on widows less severe than China's.",
      "They ended Korea's tribute relationship by requiring the country to adopt Shinto.",
    ],
    "A",
    "Chinese family models had a particularly negative impact on elite Korean women, but their reach beyond the aristocracy was limited and Korea retained its own state and culture.",
  ),
  readingQuestion(
    8,
    "What does the history of Angkor Wat most clearly reveal about cultural change in Southeast Asia?",
    [
      "The Khmer built it as a copy of a Chinese Confucian school and prohibited religious reuse.",
      "It was a Muslim marketplace constructed by Srivijaya to collect ship taxes in the Strait of Melaka.",
      "The Khmer built it as a Hindu image of Mount Meru under direct rule by Indian officials, and later authorities prohibited Buddhists from reusing or reinterpreting the temple after dedicating it solely to Vishnu.",
      "The Khmer built it as a monumental Hindu image of the cosmos centered on Mount Meru, and Buddhists later used it as well, showing local adaptation and layering of imported traditions.",
    ],
    "D",
    "Angkor Wat expressed an Indian-derived Hindu cosmology but belonged to a Southeast Asian kingdom and later served Buddhist worshippers, illustrating adaptation rather than simple cultural replacement.",
  ),
  readingQuestion(
    9,
    "Which account most accurately describes Byzantium and its legacy between 1200 and 1450?",
    [
      "Byzantium conquered Western Europe and replaced Roman Catholicism with Islam.",
      "Byzantium remained the strongest Eurasian empire and captured the Ottoman capital in 1453.",
      "The empire declined and fell to the Ottomans in 1453, but its Orthodox Christian and cultural influence persisted, especially in Russia and Eastern Europe.",
      "The empire declined and fell to the Ottomans in 1453, and that political collapse immediately erased Orthodox religion, Byzantine writing, architecture, and political ideas from Russia and Eastern Europe.",
    ],
    "C",
    "Ottoman conquest ended the Byzantine state, not its historical influence. Orthodox Christianity, writing, art, and political models had already taken deep root beyond its borders.",
  ),
  readingQuestion(
    10,
    "Which statement best explains gender parallelism in Aztec and Inca societies?",
    [
      "Women and men performed identical tasks and held equal authority in every institution.",
      "Women and men often occupied distinct but mutually valued spheres, with parallel religious or political roles, though the system did not erase hierarchy or gender differences.",
      "Women and men occupied distinct spheres with parallel religious and political offices, but all female work, household authority, ritual service, and productive labor was legally and symbolically inferior.",
      "Gender roles disappeared because both empires required universal military service.",
    ],
    "B",
    "Gender parallelism describes separate but corresponding spheres, such as paired cults and officials or complementary farm labor. It does not mean complete social equality or identical work.",
  ),
];

export const apWorldChapterTests: Record<string, ChapterQuestion[]> = {
  "ap-world-reading-1": inMixedOrder(mixedReading1, [1, 4, 2, 6, 7, 5, 3, 9, 10, 8]),
  "ap-world-reading-2": inMixedOrder(mixedReading2, [1, 4, 2, 6, 3, 9, 5, 8, 10, 7]),
  "ap-world-reading-3": inMixedOrder(mixedReading3, [1, 5, 2, 7, 3, 8, 4, 10, 6, 9]),
  "ap-world-reading-4": inMixedOrder(mixedReading4, [1, 7, 2, 8, 3, 9, 4, 10, 5, 6]),
  "ap-world-reading-5": inMixedOrder(mixedReading5, [1, 6, 2, 7, 3, 8, 4, 9, 5, 10]),
  "ap-world-reading-6": inMixedOrder(mixedReading6, [1, 6, 2, 8, 3, 9, 4, 7, 5, 10]),
  "ap-world-ch1-2-review": apWorldContentReviews["ap-world-ch1-2-review"],
  "ap-world-ch1-2-review-2": apWorldContentReviews["ap-world-ch1-2-review-2"],
  "ap-world-ch1-2-review-3": apWorldContentReviews["ap-world-ch1-2-review-3"],
  "ap-world-ch1-2-review-4": apWorldContentReviews["ap-world-ch1-2-review-4"],
};
