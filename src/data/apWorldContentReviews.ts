interface ContentQuestion {
  id: number;
  sec: string;
  type: "mc";
  prompt: string;
  ch: string[];
  cor: "A" | "B" | "C" | "D";
  exp: string;
}

const letters = ["A", "B", "C", "D"] as const;
const q = (
  id: number,
  section: string,
  prompt: string,
  choices: [string, string, string, string],
  correct: ContentQuestion["cor"],
  explanation: string,
): ContentQuestion => ({
  id,
  sec: section,
  type: "mc",
  prompt,
  ch: choices.map((choice, index) => `${letters[index]}) ${choice}`),
  cor: correct,
  exp: explanation,
});

const review1: ContentQuestion[] = [
  q(1, "Chapter 1 · First Civilizations", "In ancient Mesopotamian cities, ziggurats primarily served as", [
    "elevated temple complexes at urban religious centers",
    "fortified royal tombs placed beyond settled areas",
    "covered markets where pastoral merchants sold animals",
    "irrigation towers that lifted river water onto fields",
  ], "A", "Ziggurats were stepped temple platforms located at the religious center of Mesopotamian cities."),
  q(2, "Chapter 1 · Agricultural Revolution", "Which statement most accurately describes the origins of agriculture?", [
    "It began once in Mesopotamia and spread unchanged across the world.",
    "It developed independently in multiple regions over a long, uneven transition.",
    "It appeared only after cities created a demand for reliable grain supplies.",
    "It replaced gathering and hunting immediately wherever farmers introduced crops.",
  ], "B", "Agriculture emerged independently in roughly fifteen to twenty regions between about 10,000 and 2000 BCE."),
  q(3, "Chapter 1 · Paleolithic Societies", "Which description best reflects the variety among Paleolithic societies?", [
    "All lived in permanent villages governed by hereditary chiefs.",
    "All remained mobile and avoided differences in wealth or status.",
    "Many were mobile and egalitarian, but some settled, stored food, or developed hierarchy.",
    "Most depended on domesticated livestock rather than gathering wild plants.",
  ], "C", "Small mobile bands were common, but settled foragers, monuments, slavery, and social differences also existed."),
  q(4, "Chapter 1 · Pastoral Societies", "Why did pastoral societies emerge widely in Afro-Eurasia but only in small parts of the pre-Columbian Americas?", [
    "American farmers prohibited seasonal movement across agricultural boundaries.",
    "Afro-Eurasian rulers required every grassland community to raise horses.",
    "American climates contained no grasslands suitable for grazing animals.",
    "The Americas lacked most large animals suitable for domestication and herding.",
  ], "D", "Apart from llamas and alpacas in parts of the Andes, the Americas lacked large domesticable herd animals."),
  q(5, "Chapter 1 · Urban Life", "What economic foundation allowed early cities to support scribes, priests, soldiers, and artisans?", [
    "Agricultural surpluses produced mainly by rural farmers and herders",
    "Imported food supplied entirely by distant pastoral confederations",
    "Equal household production with no taxes, tribute, or redistribution",
    "Urban gardens that eliminated dependence on surrounding villages",
  ], "A", "Productive agriculture supported specialists who did not grow their own food."),
  q(6, "Chapter 1 · Environment", "Why did barley replace much wheat in southern Mesopotamia after centuries of irrigation?", [
    "Barley required more salt and therefore caused fields to become saline.",
    "Barley tolerated the salt that accumulated in heavily irrigated soil.",
    "Wheat became forbidden after priests dedicated irrigated land to a city god.",
    "Wheat could grow only beside the Nile and had to be imported from Egypt.",
  ], "B", "Irrigation raised yields but accumulated salt; barley was more salt-tolerant than wheat."),
  q(7, "Chapter 1 · First Civilizations", "Which locations contained the earliest known civilizations between about 3500 and 3000 BCE?", [
    "Greece, the Indus valley, and the Yellow River valley",
    "Mesoamerica, the Andes highlands, and the Niger valley",
    "Mesopotamia, Egypt, and the central coast of Peru",
    "Anatolia, Japan, and the East African coast",
  ], "C", "The earliest civilizations arose in Mesopotamia, Egypt, and coastal Peru."),
  q(8, "Chapter 1 · Chiefdoms", "How did chiefs or “big men” commonly maintain authority when they possessed limited coercive power?", [
    "By selecting officials through written civil service examinations",
    "By commanding permanent armies financed through standardized coin taxes",
    "By granting every household equal influence over regional decisions",
    "By using generosity, ritual status, charisma, tribute, and redistribution",
  ], "D", "Chiefs persuaded followers through personal standing and redistribution more often than through direct force."),
  q(9, "Chapter 1 · Social Hierarchy", "In which ancient civilizations did slavery become especially central to the economy and population?", [
    "Greek and Roman civilizations",
    "Indus and Niger River civilizations",
    "Early Chinese and Egyptian civilizations",
    "Maya and Andean civilizations",
  ], "A", "Enslaved people made up roughly one-third of the population in parts of classical Greece and Rome."),
  q(10, "Chapter 1 · Defining Civilization", "Why do historians avoid requiring writing as an absolute feature of every civilization?", [
    "Writing appeared only after 1200 CE and therefore cannot identify ancient societies.",
    "Some urban civilizations, including Andean examples, operated without conventional writing.",
    "Written records existed only in religious buildings and reveal nothing about government.",
    "Every civilization used writing, but most scripts remain deliberately hidden from outsiders.",
  ], "B", "Urbanism and complex administration did not always depend on a conventional written script."),
  q(11, "Chapter 1 · Hinduism", "Which statement correctly relates atman, Brahman, and moksha in philosophical Hinduism?", [
    "Atman was a temple sacrifice, Brahman was a ruler, and moksha was a law code.",
    "Atman remained eternally separate from Brahman through every cycle of rebirth.",
    "Atman was the individual soul, Brahman ultimate reality, and moksha liberation into that unity.",
    "Atman described caste duty, Brahman described karma, and moksha meant a higher rebirth.",
  ], "C", "The Upanishads taught that the individual soul was ultimately part of Brahman and could attain liberation."),
  q(12, "Chapter 1 · Buddhism", "Early Buddhism challenged established Hindu practice most directly by", [
    "requiring worship of many new gods through Brahmin-led sacrifices",
    "teaching that only members of higher castes could achieve liberation",
    "rejecting karma, rebirth, meditation, and the possibility of nirvana",
    "questioning caste privilege and Brahmin ritual authority as paths to liberation",
  ], "D", "Buddhism retained karma and rebirth but rejected caste and sacrifice as requirements for spiritual progress."),
  q(13, "Chapter 1 · Confucianism", "What did Confucius identify as the foundation of social and political harmony?", [
    "Educated moral conduct within properly ordered relationships",
    "Withdrawal from society and rejection of formal learning",
    "Salvation through devotion to compassionate bodhisattvas",
    "Military equality among rulers, farmers, merchants, and soldiers",
  ], "A", "Confucianism emphasized education, filial piety, ritual conduct, and moral leadership within hierarchy."),
  q(14, "Chapter 1 · Daoism", "How did many Chinese elites combine Confucianism and Daoism?", [
    "They followed Daoism in office and used Confucianism to reject family duties.",
    "They practiced Confucian public service and Daoist retreat or simplicity in private life.",
    "They treated both as identical monastic religions governed by Buddhist monks.",
    "They abandoned both traditions whenever an emperor supported civil service examinations.",
  ], "B", "Confucian engagement and Daoist withdrawal were often understood as complementary."),
  q(15, "Chapter 1 · Judaism", "What was Judaism's most important long-term influence on Christianity and Islam?", [
    "Its rejection of scripture in favor of oral philosophical debate",
    "Its teaching that each city should worship an exclusive local god",
    "Its monotheistic, prophetic, and scriptural tradition",
    "Its requirement that all believers follow the Hindu caste system",
  ], "C", "Judaism supplied the monotheistic and prophetic foundation from which Christianity and Islam developed."),
  q(16, "Chapter 1 · Christianity", "What was Saint Paul's major role in early Christianity?", [
    "He persuaded Roman emperors to make Christianity official immediately after Jesus's death.",
    "He created Eastern Orthodoxy by breaking directly with the bishop of Rome.",
    "He limited Christian membership to Jews who followed every traditional ritual law.",
    "He founded communities among non-Jews and argued that Jesus's message was universal.",
  ], "D", "Paul's missions helped transform a small Jewish movement into a faith open to Gentiles."),
  q(17, "Chapter 1 · Islam", "Why was Muhammad's idea of the umma politically significant in seventh-century Arabia?", [
    "It united believers around faith rather than competing tribal loyalties.",
    "It restored the authority of Byzantine officials over Arabian cities.",
    "It divided Muslims into separate communities based on clan and ethnicity.",
    "It required every conquered people to speak Arabic before joining Islam.",
  ], "A", "The umma offered a community based on shared belief that could supersede tribal feuds."),
  q(18, "Chapter 1 · Christianity and Islam", "Why did Islam gain political power sooner than Christianity did?", [
    "Christianity began beyond imperial control, while Islam remained under Roman rule.",
    "Muhammad led an armed state-building community, while early Christians lived under Roman authority.",
    "Muslims inherited the Roman state religion, while Christians rejected all forms of government.",
    "Jesus ruled Arabia before his followers lost power to the Byzantine Empire.",
  ], "B", "Muhammad unified much of Arabia; Christians remained a vulnerable Roman minority for centuries."),
  q(19, "Chapter 1 · Silk Roads", "How did most goods move across the premodern Silk Roads?", [
    "One merchant normally carried a shipment from China to the Mediterranean without stopping.",
    "Governments moved only grain and livestock through a single imperial transport service.",
    "Goods passed through repeated exchanges and traveled farther than individual merchants.",
    "Ships carried goods across the Sahara before transferring them to Atlantic caravans.",
  ], "C", "Silk Roads commerce operated through linked segments and many transactions."),
  q(20, "Chapter 1 · Cultural Exchange", "Which combination most directly helped religions spread beyond their places of origin before 1200?", [
    "Local self-sufficiency, closed borders, and the decline of urban centers",
    "The disappearance of empires, merchants, missionaries, and pilgrimage",
    "A universal ban on adapting teachings to languages outside the founder's region",
    "Trade routes, missionary activity, imperial expansion, and state support",
  ], "D", "Religions traveled through commercial, political, and missionary networks."),
];

const review2: ContentQuestion[] = [
  q(1, "Chapter 2 · Song China", "Which development most directly supported China's population growth to roughly 120 million by 1200?", [
    "The replacement of rice cultivation with pastoral sheep herding",
    "The adoption of fast-ripening and drought-resistant Champa rice",
    "The end of trade with Vietnam and other Southeast Asian states",
    "The movement of most farmers from the Yangzi valley to Central Asia",
  ], "B", "Champa rice increased food production and helped sustain major population growth."),
  q(2, "Chapter 2 · Song Commerce", "Which evidence best demonstrates that Song China was highly commercialized?", [
    "Peasants paid taxes only in grain and produced almost entirely for household use.",
    "Officials closed canals so local markets would remain isolated from one another.",
    "Cash taxes, specialized crops, paper money, credit, and extensive waterways linked markets.",
    "Merchants replaced the emperor and governed every city through independent councils.",
  ], "C", "Market production, monetary taxes, financial instruments, and transport networks reinforced commerce."),
  q(3, "Chapter 2 · Song Industry", "What powered much of Song China's dramatic increase in iron production?", [
    "Imported petroleum refined in government factories near Hangzhou",
    "Windmills introduced by Portuguese merchants after 1500",
    "Water buffalo turning household furnaces in rice-growing villages",
    "Coal burned in large enterprises and smaller furnaces",
  ], "D", "Coal fueled Song metallurgy and also provided household energy."),
  q(4, "Chapter 2 · Civil Service", "Which statement best describes social mobility through Song civil service examinations?", [
    "A few commoners advanced, but wealthy families retained an educational advantage.",
    "Every boy received identical schooling and competed under fully equal conditions.",
    "Only hereditary military nobles could sit for examinations or enter government.",
    "Examinations selected merchants to govern independent cities outside imperial control.",
  ], "A", "The examination system offered limited mobility without eliminating the advantages of wealth."),
  q(5, "Chapter 2 · Song Women", "Why did foot binding spread among elite families during and after the Song dynasty?", [
    "It prepared women to work in state-operated silk factories and urban markets.",
    "It expressed ideals of beauty, delicacy, deference, and confinement to inner quarters.",
    "It allowed women to qualify for examinations by demonstrating Confucian discipline.",
    "It began as a Buddhist monastic practice requiring both women and men to bind their feet.",
  ], "B", "Foot binding embodied a tightening elite patriarchy and restricted mobility."),
  q(6, "Chapter 2 · Song Women", "Which statement gives the most accurate overall picture of women in Song China?", [
    "All women lost property rights, education, and paid work at exactly the same rate.",
    "Commercial growth ended patriarchy by transferring textile workshops to rural women.",
    "Restrictions tightened, yet some women gained stronger property rights and educational access.",
    "Foot binding expanded only among peasants while elite women entered government service.",
  ], "C", "Song women's experiences included both greater restrictions and some expanded opportunities."),
  q(7, "Chapter 2 · Korea", "What did Korea receive through its tributary relationship with China?", [
    "Direct rule by Chinese governors and the permanent abolition of Korean dynasties",
    "Freedom from Chinese cultural influence among the court and aristocracy",
    "A requirement that Korean peasants take China's civil service examination",
    "Gifts, peaceful relations, trade access, and recognition from the Chinese court",
  ], "D", "Tribute missions affirmed China's status while facilitating diplomacy, gifts, and commerce."),
  q(8, "Chapter 2 · Korea", "Why was the creation of hangul historically important in Korea?", [
    "It provided a phonetic script suited to Korean and broadened writing beyond Chinese characters.",
    "It replaced Korean speech with classical Chinese throughout every social class.",
    "It enabled Chinese officials to administer Korea as an imperial province.",
    "It was a Japanese writing system introduced by samurai after conquering Korea.",
  ], "A", "Hangul supported a distinctive Korean written culture and became important in popular and women's writing."),
  q(9, "Chapter 2 · Japan", "Why could Japan be especially selective when borrowing from China?", [
    "Japan was governed directly by China and could reject policies after each governor departed.",
    "Ocean separation meant borrowing was voluntary rather than imposed through Chinese conquest.",
    "Japan possessed no aristocracy or religious traditions before contact with China.",
    "Chinese rulers allowed Japan to borrow technology but prohibited Buddhism and writing.",
  ], "B", "Japan adopted Chinese culture without experiencing direct Chinese occupation."),
  q(10, "Chapter 2 · Japan", "Which development most clearly distinguished medieval Japanese politics from Song Chinese politics?", [
    "Japanese emperors built a stronger examination bureaucracy than the Song rulers did.",
    "Japanese merchants governed centralized provinces through Confucian ministries.",
    "Political power decentralized toward aristocratic families and samurai warrior elites.",
    "Political authority shifted from warriors to Buddhist nuns chosen through examinations.",
  ], "C", "Japan's emperor retained ceremonial importance while real power became increasingly decentralized."),
  q(11, "Chapter 2 · Japanese Culture", "How did Buddhism interact with Japan's indigenous kami traditions?", [
    "Buddhism immediately eliminated kami worship and closed all local shrines.",
    "Kami worship prevented Buddhist art, medicine, and ideas about the afterlife from entering Japan.",
    "The two remained legally separated because combining them was punishable by exile.",
    "Buddhism coexisted with kami worship, and some kami were treated as local Buddhist expressions.",
  ], "D", "Japanese religious practice layered imported Buddhism with local traditions later called Shinto."),
  q(12, "Chapter 2 · Vietnam", "Why was Chinese cultural influence especially deep in Vietnam?", [
    "The Red River valley was incorporated into the Chinese state for more than a thousand years.",
    "Vietnamese rulers voluntarily abandoned their language before any direct Chinese contact.",
    "Japan governed Vietnam and required its elites to study Chinese traditions.",
    "Vietnam remained geographically isolated from China but copied it through Arab merchants.",
  ], "A", "Direct Chinese rule from 111 BCE to 939 CE profoundly influenced Vietnamese elite culture and government."),
  q(13, "Chapter 2 · Vietnam", "How did Vietnam's use of Chinese-style examinations differ from Korea's?", [
    "Vietnam reserved office more completely for hereditary aristocrats than Korea did.",
    "Vietnam used examinations more effectively to weaken aristocrats and create a scholar-gentry.",
    "Vietnam abolished examinations after independence, while Korea admitted all commoners equally.",
    "Vietnam selected Buddhist monks only, while Korea selected samurai warriors.",
  ], "B", "Vietnam's examination system provided more mobility and more effectively challenged aristocratic control."),
  q(14, "Chapter 2 · Srivijaya", "How did Srivijaya gain wealth and political influence?", [
    "It taxed grain transported across the Sahara between Mali and North Africa.",
    "It conquered China's interior and controlled the entire Grand Canal system.",
    "It controlled the Strait of Melaka and taxed Indian Ocean shipping.",
    "It isolated its ports and required residents to produce all goods locally.",
  ], "C", "Srivijaya's strategic location let it profit from maritime commerce between India and China."),
  q(15, "Chapter 2 · Angkor", "What did Angkor Wat represent when Khmer rulers first constructed it?", [
    "An Islamic law school designed for Sufi teachers and Indian Ocean merchants",
    "A Confucian academy modeled directly on the Song civil service system",
    "A Buddhist monument built before Hinduism entered Southeast Asia",
    "A Hindu vision of the cosmos centered symbolically on Mount Meru",
  ], "D", "Angkor Wat was originally a Hindu temple complex and was later used by Buddhists."),
  q(16, "Chapter 2 · Islamic States", "What role did Turkic-speaking peoples play as Abbasid political power declined?", [
    "Converted Turkic warriors created sultanates and became major military carriers of Islam.",
    "They restored one permanent Abbasid government that ruled Spain, India, and China directly.",
    "They rejected Islam and removed Muslim communities from Anatolia and northern India.",
    "They served only as merchants and were prohibited from joining armies or ruling states.",
  ], "A", "Turkic peoples rose from slave soldiers and migrants to rulers of major Muslim sultanates."),
  q(17, "Chapter 2 · Islamic Society", "Which statement accurately distinguishes the ulama from Sufi teachers?", [
    "The ulama governed one empire, while Sufis served only as tax collectors.",
    "The ulama emphasized law and scholarship; Sufis emphasized mystical devotion and frontier teaching.",
    "The ulama rejected the Quran, while Sufis preserved Arabic legal traditions.",
    "The ulama were Christian translators, while Sufis were Hindu temple priests.",
  ], "B", "Both connected the Islamic world, but their scholarly-legal and mystical-devotional roles differed."),
  q(18, "Chapter 2 · Islam in India", "Which description best characterizes the spread of Islam in India before 1500?", [
    "All Indians converted immediately after the first Muslim military victory.",
    "Islam remained confined to foreign armies and attracted no merchants or local communities.",
    "Conversion was uneven and influenced by trade, rule, Sufis, and local social conditions.",
    "Hinduism disappeared from northern and southern India once the Delhi Sultanate formed.",
  ], "C", "Islam gained substantial communities, but most Indians remained Hindu and conversion varied by region."),
  q(19, "Chapter 2 · Iberia", "What happened to Muslim political power in Iberia between about 1000 and 1492?", [
    "It expanded steadily until Muslim rulers controlled France and the Byzantine Empire.",
    "It remained unchanged because Christian and Muslim states avoided warfare.",
    "It ended in 1200 when the Abbasid caliph personally surrendered Córdoba.",
    "Christian kingdoms gradually reconquered territory until Granada fell in 1492.",
  ], "D", "The Christian Reconquista steadily reduced Muslim rule, though Islamic learning strongly influenced Europe."),
  q(20, "Chapter 2 · Dar al-Islam", "What continued to connect Muslims after the Islamic world fragmented into competing states?", [
    "Shared scripture, law, scholarship, pilgrimage, commerce, and devotional networks",
    "Direct government by one Abbasid caliph who appointed every regional ruler",
    "One spoken language and the disappearance of all Sunni-Shia disagreement",
    "A ban on travel between sultanates and the end of long-distance trade",
  ], "A", "Religious and commercial networks sustained a recognizable civilization without political unity."),
];

const review3: ContentQuestion[] = [
  q(1, "Chapter 2 · Swahili Civilization", "Which description most accurately characterizes Swahili civilization?", [
    "A centralized inland empire that prohibited foreign merchants and Islam",
    "Arab colonies that displaced the Bantu-speaking population of East Africa",
    "Bantu-speaking coastal city-states linked to Islam and Indian Ocean trade",
    "Pastoral nomads who controlled trans-Saharan routes through the Sahara",
  ], "C", "Swahili civilization remained African in language and identity while participating in an Islamic commercial world."),
  q(2, "Chapter 2 · Swahili Culture", "What does the Swahili language reveal about the region's history?", [
    "Its Latin grammar and Chinese vocabulary show settlement by European sailors.",
    "Its Persian grammar proves that Africans were expelled from coastal cities.",
    "Its complete lack of Arabic loanwords shows centuries of isolation from overseas commerce.",
    "Its Bantu grammar and Arabic loanwords reflect African foundations and overseas contact.",
  ], "D", "The language records cultural exchange without erasing the coast's Bantu foundation."),
  q(3, "Chapter 2 · West Africa", "Which network most directly connected Ghana and Mali with North Africa and the Mediterranean?", [
    "Trans-Saharan caravan routes carrying gold, salt, goods, and ideas",
    "The Pacific Ocean routes connecting Mesoamerica to Japan",
    "The Grand Canal running from the Yellow River to the Yangzi",
    "Baltic Sea routes controlled by Kievan Rus and Byzantium",
  ], "A", "Camel caravans linked West African states to North African markets and Islamic influence."),
  q(4, "Chapter 2 · West African States", "Why were the rulers of Ghana and Mali able to accumulate substantial wealth?", [
    "They controlled every Indian Ocean port from Mozambique northward to the Arabian Peninsula.",
    "They taxed and regulated trade in gold, salt, and other trans-Saharan goods.",
    "They produced silk and paper money for export to Song China.",
    "They received annual tribute from the Aztec and Inca empires.",
  ], "B", "West African rulers benefited from gold production and taxation of caravan commerce."),
  q(5, "Chapter 2 · Hausa Civilization", "How was Hausa civilization politically organized?", [
    "As provinces governed by officials sent from the Mali capital",
    "As one coastal empire ruled by Swahili-speaking sultans",
    "As independent city-states linked through culture and commerce",
    "As nomadic bands without markets, specialized crafts, or urban centers",
  ], "C", "The Hausa developed a network of commercial city-states rather than a single empire."),
  q(6, "Chapter 2 · Byzantium", "How did most Byzantine people understand their empire?", [
    "As a newly founded Russian state with no connection to Rome",
    "As an Islamic caliphate governed from Baghdad",
    "As a western feudal kingdom under the authority of the pope",
    "As the continuing Roman Empire centered in the eastern Mediterranean",
  ], "D", "Byzantines preserved Roman imperial identity while using Greek language and Orthodox Christianity."),
  q(7, "Chapter 2 · Byzantine Legacy", "What occurred after the Ottoman conquest of Constantinople in 1453?", [
    "The Byzantine state ended, but Orthodox religion and cultural influence persisted elsewhere.",
    "Byzantium soon reconquered Anatolia and restored imperial government across the western Roman territories.",
    "Orthodox Christianity disappeared from Russia and southeastern Europe.",
    "The pope moved to Constantinople and unified Catholic and Orthodox churches.",
  ], "A", "Political collapse did not erase the Byzantine legacy already rooted in Eastern Europe and Rus."),
  q(8, "Chapter 2 · Kievan Rus", "Why did Prince Vladimir adopt Byzantine Christianity for Kievan Rus?", [
    "It placed Rus under direct rule by the bishop of Rome.",
    "It offered political unity and a prestigious connection to Byzantium.",
    "It ended Rus trade with Constantinople and the Black Sea.",
    "It required Rus rulers to replace the Cyrillic alphabet with Arabic.",
  ], "B", "Orthodox Christianity connected Rus to a powerful neighbor and strengthened princely authority."),
  q(9, "Chapter 2 · Western Europe", "Which condition most contributed to Western Europe's fragmented political structure?", [
    "A unified Roman imperial bureaucracy remained fully intact throughout the region after 500.",
    "Song officials divided Europe into provinces governed through examinations.",
    "Geography, competing rulers, nobles, cities, and church authorities dispersed power.",
    "Muslim rulers governed every western European kingdom from Córdoba.",
  ], "C", "Western Europe developed a multicentered order rather than a single enduring empire."),
  q(10, "Chapter 2 · European Merchants", "Why did some medieval European towns gain more political independence than cities in China?", [
    "European commerce was much larger and therefore made emperors unnecessary.",
    "Chinese merchants rejected urban life and traded only in isolated villages.",
    "European kings required every merchant to pass a Confucian examination.",
    "Competing European authorities allowed towns to bargain for charters and privileges.",
  ], "D", "Political fragmentation gave European towns leverage even though Chinese trade was more extensive."),
  q(11, "Chapter 2 · European Growth", "Which agricultural change helped support population growth in Europe after 1000?", [
    "Heavy plows, horse traction, and improved methods suited to northern soils",
    "The abandonment of grain farming in favor of camel pastoralism",
    "The end of watermills and other mechanical sources of energy",
    "The immediate medieval adoption of potatoes and maize imported from the Americas",
  ], "A", "New tools, crop patterns, and greater use of horses increased agricultural output before the Columbian Exchange."),
  q(12, "Chapter 2 · European Learning", "How did Western European scholars gain access to many Greek and Arabic works?", [
    "They recovered every text from isolated monasteries without outside contact.",
    "They translated works obtained through Byzantium and the Islamic world, especially in Spain.",
    "They required Chinese examination officials to teach translated texts at the first European universities.",
    "They rejected Aristotle and prohibited the use of logic in Christian theology.",
  ], "B", "Translation linked European universities to knowledge preserved and expanded in Byzantine and Islamic societies."),
  q(13, "Chapter 2 · Mesoamerica", "Which practices demonstrate a shared Mesoamerican cultural framework despite political division?", [
    "Confucian examinations, ancestor tablets, and tribute missions to China",
    "Quipus, mita labor, and worship centered on the Andean sun",
    "Maize agriculture, ritual calendars, sacrifice, markets, and related deities",
    "Islamic law, Arabic scholarship, and pilgrimage to Mecca",
  ], "C", "Mesoamerican peoples shared cultural patterns while living in rival states and city-states."),
  q(14, "Chapter 2 · Aztec Empire", "How did the Aztec Empire usually govern conquered communities?", [
    "It appointed provincial governors to count households and direct rotating labor crews for state projects.",
    "It resettled most conquered populations and placed all land under state ownership.",
    "It abolished local rulers and required exclusive worship of one deity.",
    "It often left local rulers in place as long as tribute and labor were delivered.",
  ], "D", "Aztec rule was comparatively loose, tribute-based, and frequently unstable."),
  q(15, "Chapter 2 · Aztec Religion", "Why did Aztec rulers connect warfare with large-scale human sacrifice?", [
    "Captives supplied blood believed to sustain the sun and cosmic order.",
    "Sacrifice served chiefly to recruit officials for the Inca labor system.",
    "Warriors believed captives would operate the chinampa farming system.",
    "The practice was introduced by Spanish missionaries to end local warfare.",
  ], "A", "Aztec ideology presented sacrificial blood as necessary to maintain the universe."),
  q(16, "Chapter 2 · Inca Empire", "Which policy best illustrates the Inca state's direct involvement in provincial life?", [
    "Allowing tribute deliveries while avoiding records, governors, and labor demands",
    "Using governors, censuses, resettlement, storehouses, and required labor service",
    "Relying on independent merchants and coin markets to supply every public project",
    "Replacing roads with ocean shipping between isolated Andean ports",
  ], "B", "The Inca state penetrated local society more deeply than the Aztec tribute system did."),
  q(17, "Chapter 2 · Inca Administration", "Which pairing correctly matches an Inca institution with its purpose?", [
    "Chinampas — floating fields used to feed the Andean capital of Cuzco",
    "Hangul — a phonetic system used to record Inca tax payments",
    "Quipus — record keeping; mita — rotating labor owed to the state",
    "Ziggurats — provincial storehouses governed by female officials",
  ], "C", "Quipus stored accounting data, while mita labor built roads, farmed state lands, and served public projects."),
  q(18, "Chapter 2 · American Empires", "What did the rise of both the Aztec and Inca empires have in common?", [
    "Both were founded by long-established coastal merchant elites with overseas colonies.",
    "Both copied their governments directly from Song China through Pacific trade.",
    "Both rejected the religious, political, and agricultural traditions developed by earlier regional civilizations.",
    "Both were built by previously marginal peoples who conquered older cultural centers.",
  ], "D", "Mexica and Inca rulers rose rapidly and incorporated long-standing Mesoamerican and Andean traditions."),
  q(19, "Chapter 2 · Gender Parallelism", "What did gender parallelism mean in Aztec and Inca societies?", [
    "Women and men occupied distinct but corresponding social, religious, or political spheres.",
    "Women and men performed identical work and held equal supreme authority everywhere.",
    "Women were excluded from ritual, production, household authority, and local office.",
    "Men traced descent through women while women traced descent through men.",
  ], "A", "Parallel roles could be valued without eliminating gender hierarchy or differences."),
  q(20, "Chapter 2 · European Women", "How did urban growth affect some women in medieval Western Europe?", [
    "It gave every woman equal entry to universities, guild leadership, and royal office.",
    "It created work opportunities, though guilds later restricted many female occupations.",
    "It immediately imposed Chinese foot binding throughout European commercial cities.",
    "It eliminated textile work and prohibited women from participating in markets.",
  ], "B", "Urban growth initially opened work for women, but male-controlled guilds later narrowed access."),
];

const review4: ContentQuestion[] = [
  q(1, "Chapters 1–2 · Human Migration", "Which sequence correctly summarizes the global spread of Homo sapiens?", [
    "Humans emerged in the Americas, reached Africa by 10,000 BCE, and entered Eurasia after 1200.",
    "Humans emerged in China, crossed Africa during the Roman era, and reached Australia after 1500.",
    "Humans emerged in Mesopotamia and settled every continent before developing stone tools.",
    "Humans emerged in Africa, migrated outward over millennia, and reached New Zealand by about 1200.",
  ], "D", "Homo sapiens emerged in Africa and completed the settlement of major habitable landmasses with New Zealand."),
  q(2, "Chapters 1–2 · Agricultural Outcomes", "Which set of societies developed from the new resources made available by agriculture?", [
    "Pastoral communities, farming villages, chiefdoms, and urban civilizations",
    "Only centralized empires with writing, taxation, and permanent armies",
    "Only egalitarian villages that rejected specialists and political leaders",
    "Maritime merchant cities that no longer depended on rural food production",
  ], "A", "Agriculture expanded possibilities but did not create one uniform social outcome."),
  q(3, "Chapters 1–2 · Cities", "Why can a society be urban even when most of its population consists of rural farmers?", [
    "Urban means that every resident lives inside a fortified capital.",
    "Cities concentrate administration, ritual, exchange, and specialized work supported by rural surplus.",
    "Rural populations are excluded from civilizations and therefore are not counted by historians.",
    "Cities produce all their own food and remain economically separate from surrounding villages.",
  ], "B", "Cities organized key functions while the majority of people supplied food from the countryside."),
  q(4, "Chapters 1–2 · Monumental Architecture", "Which comparison between Mesopotamian ziggurats and Egyptian pyramids is accurate?", [
    "Both were democratic meeting halls used to elect city officials.",
    "Ziggurats were royal tombs, while pyramids were urban marketplaces.",
    "Ziggurats were temple platforms, while pyramids were monumental royal tombs.",
    "Both were defensive walls built to keep pastoral herders outside river valleys.",
  ], "C", "Ziggurats elevated sacred urban temples; Egyptian pyramids housed deceased rulers."),
  q(5, "Chapters 1–2 · Social Hierarchy", "Which comparison of classical Chinese and Indian hierarchy is most accurate?", [
    "China ranked merchants first, while India granted equal status to every occupation.",
    "India selected Brahmins by examination, while China inherited every office by caste.",
    "Both systems allowed unrestricted movement between social ranks through education.",
    "China elevated scholar-officials; India gave Brahmins ritual priority within caste society.",
  ], "D", "Chinese status emphasized education and office, while Indian caste emphasized birth, occupation, and ritual purity."),
  q(6, "Chapters 1–2 · Buddhism", "What most clearly distinguished Mahayana Buddhism from Theravada Buddhism?", [
    "Mahayana emphasized bodhisattvas and devotional help available to ordinary people.",
    "Mahayana rejected karma, rebirth, nirvana, and the teachings of the Buddha.",
    "Theravada required worship of Hindu deities through Brahmin-led sacrifice.",
    "Theravada taught that enlightenment could be granted only by a Chinese emperor.",
  ], "A", "Mahayana offered compassionate spiritual helpers and a more accessible devotional path."),
  q(7, "Chapters 1–2 · Bhakti", "Why did the Bhakti movement strengthen Hinduism in India?", [
    "It limited worship to Sanskrit-speaking Brahmins performing costly sacrifices.",
    "It offered emotionally accessible devotion and sometimes challenged caste or gender barriers.",
    "It rejected Hindu gods and required conversion to Theravada Buddhism.",
    "It replaced Indian traditions with Confucian examinations and Daoist meditation.",
  ], "B", "Bhakti devotion made Hindu spiritual practice accessible beyond ritual specialists."),
  q(8, "Chapters 1–2 · Christianity", "Why was Christianity divided into several major regional churches by 1200?", [
    "All Christian communities used one language and accepted the pope without dispute.",
    "Christianity remained confined to a single city outside every major empire.",
    "Its geographic spread across different languages and states produced separate institutions and doctrines.",
    "Roman persecution prevented Christians from forming any lasting organization before 1200.",
  ], "C", "Geographic, linguistic, political, and doctrinal differences fragmented the Christian world."),
  q(9, "Chapters 1–2 · Islam", "What was the original source of the Sunni-Shia division?", [
    "A disagreement over whether Muslims should trade with Christian merchants",
    "A dispute about using Arabic or Persian in Quranic schools",
    "A conflict over whether Sufis could establish devotional brotherhoods",
    "A political dispute over rightful leadership after Muhammad's death",
  ], "D", "A succession dispute became a lasting religious and political division."),
  q(10, "Chapters 1–2 · Sea Roads", "What natural pattern made regular Indian Ocean commerce possible?", [
    "Predictable seasonal monsoon winds that sailors used in both directions",
    "Permanent westward winds that prevented ships from returning to Asia",
    "Frozen winter seas that allowed caravans to cross between India and Africa",
    "Nile flood cycles that carried ships directly from Egypt to China",
  ], "A", "Knowledge of monsoon rhythms supported repeated long-distance voyages."),
  q(11, "Chapters 1–2 · Sand Roads", "Which innovation most directly expanded trans-Saharan trade?", [
    "Chinese junks capable of sailing across desert sand during monsoon season",
    "Camel saddles and caravan organization suited to desert travel",
    "Andean llamas carrying gold between Mali and Mediterranean ports",
    "Heavy European plows that created canals through the Sahara",
  ], "B", "Camels and improved saddles made sustained caravan commerce across the Sahara practical."),
  q(12, "Chapters 1–2 · Geography", "Which example best shows geography influencing political or cultural development?", [
    "Flat Greek plains produced one empire, while Panama encouraged close Andean-Mesoamerican contact.",
    "The Sahara prevented all trade, while oceans kept East Africa outside Indian Ocean exchange.",
    "Greek mountains encouraged city-states, while Panama's forests limited contact between American regions.",
    "China's rivers prevented farming, while Japan's land border exposed it to direct Chinese conquest.",
  ], "C", "Physical barriers shaped Greek political fragmentation and limited Mesoamerican-Andean interaction."),
  q(13, "Chapters 1–2 · Song Technology", "Which group of achievements belongs to Song dynasty China?", [
    "Roman concrete, Egyptian hieroglyphs, Greek democracy, and Andean quipus",
    "Camel saddles, trans-Saharan caravans, chinampas, and Viking longships",
    "Steam engines, telegraphs, industrial factories, and petroleum refining",
    "Cheap printed books, advanced navigation, gunpowder weapons, and large-scale iron production",
  ], "D", "Song China led the world in printing, navigation, gunpowder, and industrial production."),
  q(14, "Chapters 1–2 · Japanese Culture", "Why is The Tale of Genji significant to historians of Japan?", [
    "It portrays the refined life and relationships of the imperial court around 1000.",
    "It records the first Chinese conquest and direct administration of Japan.",
    "It explains how samurai replaced Buddhism with exclusive Confucian worship.",
    "It is a Korean examination manual translated into hangul for Japanese officials.",
  ], "A", "Murasaki Shikibu's novel offers a detailed picture of elite Heian court culture."),
  q(15, "Chapters 1–2 · Vietnamese Society", "Which evidence shows that Chinese influence did not erase distinctive Vietnamese traditions?", [
    "Vietnam abandoned its language and used only Chinese in everyday speech.",
    "Women retained visible economic and religious roles, and local customs persisted beyond the elite.",
    "Vietnam rejected Confucian government, examinations, Buddhism, and tribute diplomacy entirely.",
    "Chinese governors continued ruling Vietnam directly without interruption after 939.",
  ], "B", "Vietnam borrowed deeply while retaining local language, gender customs, religion, and traditions of resistance."),
  q(16, "Chapters 1–2 · African Islam", "How did Islam first gain particular influence in many East and West African societies?", [
    "Through forced conversion of every rural household by one unified Arab empire",
    "Through the replacement of African languages with Arabic in all communities",
    "Through merchants, rulers, scholars, and urban groups connected to long-distance trade",
    "Through Christian monasteries that adopted the Quran during Byzantine expansion",
  ], "C", "Islam often spread first among commercial and political elites while coexisting with local practices."),
  q(17, "Chapters 1–2 · Western Europe", "Which developments drove Western Europe's expansion after about 1000?", [
    "The disappearance of towns, universities, trade, and mechanical energy",
    "Political unification under one emperor and the end of merchant privileges",
    "Isolation from Byzantine, Islamic, Chinese, and Central Asian technologies",
    "Agricultural gains, population growth, towns, trade, mills, and translated learning",
  ], "D", "A cluster of agricultural, urban, technological, commercial, and intellectual changes transformed Europe."),
  q(18, "Chapters 1–2 · Aztec and Inca", "Which statement most accurately compares Aztec and Inca administration?", [
    "Aztec rule emphasized tribute; Inca rule more directly organized labor, records, and provinces.",
    "Inca rule relied only on independent merchants, while Aztec governors recorded every household.",
    "Both empires used identical systems and avoided interfering in conquered communities.",
    "Neither empire built roads, collected resources, or required service from conquered peoples.",
  ], "A", "The Aztec state was looser and tribute-centered; the Inca state was more bureaucratic and intrusive."),
  q(19, "Chapters 1–2 · Environmental Change", "Which example shows a civilization altering its environment rather than merely adapting to it?", [
    "Greek mountains existing before the formation of rival city-states",
    "Chinese agricultural expansion clearing forests south toward the Yangzi",
    "Panama's narrow shape limiting travel between Mesoamerica and the Andes",
    "Seasonal vegetation encouraging pastoral mobility in Central Asia",
  ], "B", "Chinese settlement and intensive agriculture transformed southern forests and landscapes."),
  q(20, "Chapters 1–2 · Chronology", "Which sequence is in correct chronological order from earliest to latest?", [
    "Rise of Islam → first civilizations → Agricultural Revolution → Song dynasty",
    "First civilizations → Agricultural Revolution → Song dynasty → rise of Islam",
    "Agricultural Revolution → first civilizations → rise of Islam → Song dynasty",
    "Agricultural Revolution → Song dynasty → first civilizations → rise of Islam",
  ], "C", "Agriculture began first, followed by urban civilizations, Islam in the seventh century, and Song rule after 960."),
];

const sourceBanks = [review1, review2, review3, review4];

const cumulativeReview = (offset: number): ContentQuestion[] =>
  [0, 4, 8, 12, 16]
    .flatMap((baseIndex) => sourceBanks.map((bank) => bank[baseIndex + offset]))
    .map((question, index) => ({
      ...question,
      id: index + 1,
      sec: "Chapters 1–2 · Cumulative Content Review",
    }));

export const apWorldContentReviews: Record<string, ContentQuestion[]> = {
  "ap-world-ch1-2-review": cumulativeReview(0),
  "ap-world-ch1-2-review-2": cumulativeReview(1),
  "ap-world-ch1-2-review-3": cumulativeReview(2),
  "ap-world-ch1-2-review-4": cumulativeReview(3),
};
