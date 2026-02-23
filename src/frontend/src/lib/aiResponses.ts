// AI Response Generator for JengaBiz Assistant
// Detects language and provides contextual business advice

interface ResponseTemplate {
  keywords: string[];
  responses: {
    en: string[];
    sw: string[];
  };
}

const responseTemplates: ResponseTemplate[] = [
  {
    keywords: ['budget', 'bajeti', 'budgeting', 'financial plan', 'mpango wa fedha'],
    responses: {
      en: [
        "Creating a solid budget is crucial for business success! Here's what I recommend:\n\n1. **Track all expenses**: Keep detailed records of every business expense, no matter how small.\n\n2. **Separate business and personal finances**: Open a dedicated business bank account.\n\n3. **Use the 50/30/20 rule**: Allocate 50% to operations, 30% to growth, and 20% to savings/emergency fund.\n\n4. **Review monthly**: Set aside time each month to review your budget and adjust as needed.\n\n5. **Plan for taxes**: Set aside 20-30% of revenue for tax obligations.\n\nWould you like specific advice on any of these areas?",
        "Budgeting is the foundation of financial health! Here are key steps:\n\n• **Start with revenue projections**: Estimate your monthly income realistically\n• **List fixed costs**: Rent, utilities, salaries, insurance\n• **Identify variable costs**: Inventory, marketing, supplies\n• **Build an emergency fund**: Aim for 3-6 months of operating expenses\n• **Use budgeting tools**: Consider apps like QuickBooks or Wave\n\nRemember: A budget is a living document. Review and adjust it regularly based on your actual performance!",
      ],
      sw: [
        "Kuunda bajeti imara ni muhimu kwa mafanikio ya biashara! Hivi ndivyo ninavyopendekeza:\n\n1. **Fuatilia gharama zote**: Weka rekodi za kina za kila gharama ya biashara, haijalishi ni ndogo kiasi gani.\n\n2. **Tenga fedha za biashara na za kibinafsi**: Fungua akaunti ya benki maalum kwa biashara.\n\n3. **Tumia kanuni ya 50/30/20**: Tenga 50% kwa shughuli, 30% kwa ukuaji, na 20% kwa akiba/mfuko wa dharura.\n\n4. **Kagua kila mwezi**: Tenga muda kila mwezi kukagua bajeti yako na kurekebisha inapohitajika.\n\n5. **Panga kwa ajili ya kodi**: Tenga 20-30% ya mapato kwa wajibu wa kodi.\n\nUngependa ushauri maalum juu ya eneo lolote la haya?",
        "Bajeti ni msingi wa afya ya kifedha! Hapa kuna hatua muhimu:\n\n• **Anza na makadirio ya mapato**: Kadiria mapato yako ya kila mwezi kwa uwiano\n• **Orodhesha gharama za kudumu**: Kodi, huduma, mishahara, bima\n• **Tambua gharama zinazobadilika**: Hisa, masoko, vifaa\n• **Jenga mfuko wa dharura**: Lenga miezi 3-6 ya gharama za uendeshaji\n• **Tumia zana za bajeti**: Fikiria programu kama QuickBooks au Wave\n\nKumbuka: Bajeti ni hati inayoishi. Ikagua na uirekebishe mara kwa mara kulingana na utendaji wako halisi!",
      ],
    },
  },
  {
    keywords: ['price', 'pricing', 'bei', 'cost', 'charge', 'gharama'],
    responses: {
      en: [
        "Pricing strategy is critical for profitability! Here's a comprehensive approach:\n\n**Cost-Plus Pricing:**\n• Calculate total costs (materials + labor + overhead)\n• Add your desired profit margin (typically 20-50%)\n• Example: If costs are $100, with 30% margin, price at $130\n\n**Value-Based Pricing:**\n• Consider the value you provide to customers\n• Research competitor prices\n• Factor in your unique selling points\n\n**Tips:**\n✓ Don't undervalue your work\n✓ Consider offering tiered pricing (basic, standard, premium)\n✓ Review prices quarterly\n✓ Test different price points\n\nWhat type of product or service are you pricing?",
        "Let me help you develop a smart pricing strategy:\n\n1. **Know your costs**: Direct costs + indirect costs + time investment\n\n2. **Research the market**: What are competitors charging? What can customers afford?\n\n3. **Consider these models**:\n   - Cost-plus: Costs + markup\n   - Competitive: Match or beat competitors\n   - Value-based: Price based on perceived value\n   - Premium: Position as high-quality option\n\n4. **Psychological pricing**: $99 feels better than $100\n\n5. **Be flexible**: Offer discounts for bulk orders or loyal customers\n\nRemember: You can always adjust prices, but starting too low makes it hard to increase later!",
      ],
      sw: [
        "Mkakati wa bei ni muhimu kwa faida! Hapa kuna mbinu kamili:\n\n**Bei ya Gharama-Plus:**\n• Kokotoa gharama zote (vifaa + kazi + gharama za ziada)\n• Ongeza faida unayotaka (kawaida 20-50%)\n• Mfano: Ikiwa gharama ni $100, na faida ya 30%, bei ni $130\n\n**Bei Kulingana na Thamani:**\n• Fikiria thamani unayotoa kwa wateja\n• Fanya utafiti wa bei za washindani\n• Zingatia sifa zako za kipekee\n\n**Vidokezo:**\n✓ Usipunguze thamani ya kazi yako\n✓ Fikiria kutoa bei za ngazi (ya msingi, ya kawaida, ya juu)\n✓ Kagua bei kila robo mwaka\n✓ Jaribu bei tofauti\n\nUnapanga bei ya aina gani ya bidhaa au huduma?",
        "Hebu nikusaidie kuunda mkakati mzuri wa bei:\n\n1. **Jua gharama zako**: Gharama za moja kwa moja + gharama zisizo za moja kwa moja + uwekezaji wa muda\n\n2. **Fanya utafiti wa soko**: Washindani wanatoza kiasi gani? Wateja wanaweza kulipa kiasi gani?\n\n3. **Fikiria miundo hii**:\n   - Gharama-plus: Gharama + ongezeko\n   - Ushindani: Lingana au shinda washindani\n   - Kulingana na thamani: Bei kulingana na thamani inayoonekana\n   - Ya juu: Weka kama chaguo la ubora wa juu\n\n4. **Bei ya kisaikolojia**: $99 inahisi bora kuliko $100\n\n5. **Kuwa na kubadilika**: Toa punguzo kwa maagizo makubwa au wateja waaminifu\n\nKumbuka: Unaweza kubadilisha bei kila wakati, lakini kuanza chini sana kunafanya iwe ngumu kuongeza baadaye!",
      ],
    },
  },
  {
    keywords: ['cash flow', 'mtiririko wa fedha', 'cashflow', 'liquidity', 'ukwasi'],
    responses: {
      en: [
        "Cash flow management is the lifeblood of your business! Here's how to master it:\n\n**Improve Cash Inflow:**\n• Invoice promptly and follow up on payments\n• Offer early payment discounts (e.g., 2% off if paid within 10 days)\n• Accept multiple payment methods\n• Consider requiring deposits for large orders\n\n**Control Cash Outflow:**\n• Negotiate better payment terms with suppliers\n• Prioritize essential expenses\n• Avoid unnecessary purchases\n• Build relationships with vendors for flexibility\n\n**Monitor Regularly:**\n• Create a cash flow forecast (weekly or monthly)\n• Track accounts receivable aging\n• Maintain a cash reserve for emergencies\n\n**Red Flags:**\n⚠️ Consistently late payments to suppliers\n⚠️ Relying on credit cards for operations\n⚠️ No cash buffer for unexpected expenses\n\nWould you like help creating a cash flow forecast?",
        "Let's strengthen your cash flow position:\n\n**The Cash Flow Cycle:**\n1. Money comes in (sales, payments)\n2. Money goes out (expenses, inventory, salaries)\n3. The gap between these creates cash flow challenges\n\n**Strategies to Bridge the Gap:**\n\n📈 **Accelerate Receivables:**\n- Send invoices immediately\n- Offer incentives for quick payment\n- Use automated payment reminders\n\n📉 **Delay Payables (Smartly):**\n- Take full advantage of payment terms\n- Negotiate extended terms with suppliers\n- Never miss payments, but optimize timing\n\n💰 **Increase Cash Reserves:**\n- Set aside 10-15% of revenue monthly\n- Build a 3-month operating expense buffer\n- Consider a business line of credit for emergencies\n\nRemember: Profit ≠ Cash. You can be profitable but still run out of cash!",
      ],
      sw: [
        "Usimamizi wa mtiririko wa fedha ni pumzi ya biashara yako! Hivi ndivyo unavyoweza kuufanya vizuri:\n\n**Boresha Mtiririko wa Fedha Zinazoingia:**\n• Tuma ankara haraka na fuatilia malipo\n• Toa punguzo kwa malipo ya mapema (mfano, punguzo la 2% ikiwa utalipwa ndani ya siku 10)\n• Kubali njia nyingi za malipo\n• Fikiria kuhitaji amana kwa maagizo makubwa\n\n**Dhibiti Mtiririko wa Fedha Zinazotoka:**\n• Jadili masharti bora ya malipo na wasambazaji\n• Weka kipaumbele gharama muhimu\n• Epuka ununuzi usiohitajika\n• Jenga uhusiano na wauzaji kwa kubadilika\n\n**Fuatilia Mara kwa Mara:**\n• Unda utabiri wa mtiririko wa fedha (kila wiki au mwezi)\n• Fuatilia umri wa akaunti zinazostahili kulipwa\n• Weka akiba ya fedha kwa dharura\n\n**Ishara za Hatari:**\n⚠️ Malipo ya kuchelewa kwa wasambazaji\n⚠️ Kutegemea kadi za mkopo kwa shughuli\n⚠️ Hakuna kifaa cha fedha kwa gharama zisizotarajiwa\n\nUngependa msaada wa kuunda utabiri wa mtiririko wa fedha?",
        "Hebu tuimarishe hali yako ya mtiririko wa fedha:\n\n**Mzunguko wa Mtiririko wa Fedha:**\n1. Fedha zinaingia (mauzo, malipo)\n2. Fedha zinatoka (gharama, hisa, mishahara)\n3. Pengo kati ya hizi linaunda changamoto za mtiririko wa fedha\n\n**Mikakati ya Kuziba Pengo:**\n\n📈 **Harakisha Malipo Yanayostahili:**\n- Tuma ankara mara moja\n- Toa motisha kwa malipo ya haraka\n- Tumia vikumbusho vya malipo vya kiotomatiki\n\n📉 **Cheleza Malipo (Kwa Akili):**\n- Tumia kikamilifu masharti ya malipo\n- Jadili masharti ya kuongezwa na wasambazaji\n- Usikose malipo kamwe, lakini boresha muda\n\n💰 **Ongeza Akiba za Fedha:**\n- Weka kando 10-15% ya mapato kila mwezi\n- Jenga kifaa cha gharama za uendeshaji za miezi 3\n- Fikiria mstari wa mkopo wa biashara kwa dharura\n\nKumbuka: Faida ≠ Fedha. Unaweza kuwa na faida lakini bado ukose fedha!",
      ],
    },
  },
  {
    keywords: ['grow', 'growth', 'ukuaji', 'scale', 'expand', 'panua', 'increase sales', 'ongeza mauzo'],
    responses: {
      en: [
        "Growing your business requires strategic planning! Here's a roadmap:\n\n**Phase 1: Strengthen Your Foundation**\n• Perfect your core product/service\n• Build strong customer relationships\n• Establish efficient systems and processes\n• Document everything for consistency\n\n**Phase 2: Expand Your Reach**\n• Leverage social media marketing (Facebook, Instagram, WhatsApp)\n• Ask satisfied customers for referrals\n• Partner with complementary businesses\n• Attend local business events and network\n\n**Phase 3: Diversify Revenue**\n• Add complementary products/services\n• Create different pricing tiers\n• Explore new customer segments\n• Consider online sales channels\n\n**Phase 4: Scale Operations**\n• Hire strategically (start with part-time help)\n• Invest in tools that save time\n• Develop training systems\n• Focus on high-value activities\n\n**Key Metrics to Track:**\n📊 Customer acquisition cost\n📊 Customer lifetime value\n📊 Monthly recurring revenue\n📊 Profit margins\n\nWhat stage is your business currently in?",
        "Let's create a growth strategy tailored to your business:\n\n**Quick Wins (0-3 months):**\n1. **Optimize existing customers**: Upsell, cross-sell, ask for referrals\n2. **Improve online presence**: Update social media, collect reviews\n3. **Streamline operations**: Eliminate waste, automate repetitive tasks\n\n**Medium-term Growth (3-12 months):**\n1. **Expand product line**: Add complementary offerings\n2. **Enter new markets**: Different locations or customer segments\n3. **Build partnerships**: Collaborate with other businesses\n4. **Invest in marketing**: Consistent, targeted campaigns\n\n**Long-term Vision (1-3 years):**\n1. **Build a team**: Hire key positions\n2. **Develop systems**: Create processes that work without you\n3. **Secure funding**: If needed for major expansion\n4. **Consider franchising or licensing**: If model is proven\n\n**Growth Mindset Tips:**\n✓ Reinvest profits back into the business\n✓ Learn continuously (books, courses, mentors)\n✓ Take calculated risks\n✓ Stay customer-focused\n\nWhat's your biggest growth challenge right now?",
      ],
      sw: [
        "Kukuza biashara yako kunahitaji mipango ya kimkakati! Hapa kuna ramani:\n\n**Awamu ya 1: Imarisha Msingi Wako**\n• Kamilifu bidhaa/huduma yako ya msingi\n• Jenga uhusiano imara wa wateja\n• Weka mifumo na michakato yenye ufanisi\n• Andika kila kitu kwa uthabiti\n\n**Awamu ya 2: Panua Ufikio Wako**\n• Tumia masoko ya mitandao ya kijamii (Facebook, Instagram, WhatsApp)\n• Uliza wateja wenye kuridhika kwa rufaa\n• Shirikiana na biashara zinazojumuisha\n• Hudhuria matukio ya biashara za ndani na mtandao\n\n**Awamu ya 3: Tofautisha Mapato**\n• Ongeza bidhaa/huduma zinazojumuisha\n• Unda ngazi tofauti za bei\n• Chunguza sehemu mpya za wateja\n• Fikiria njia za mauzo ya mtandaoni\n\n**Awamu ya 4: Panda Shughuli**\n• Ajiri kwa mkakati (anza na msaada wa muda)\n• Wekeza katika zana zinazookoa muda\n• Tengeneza mifumo ya mafunzo\n• Zingatia shughuli za thamani kubwa\n\n**Vipimo Muhimu vya Kufuatilia:**\n📊 Gharama ya kupata mteja\n📊 Thamani ya maisha ya mteja\n📊 Mapato ya kila mwezi yanayorudiwa\n📊 Mapato ya faida\n\nBiashara yako iko katika hatua gani sasa?",
        "Hebu tuunde mkakati wa ukuaji unaofaa biashara yako:\n\n**Ushindi wa Haraka (0-3 miezi):**\n1. **Boresha wateja waliopo**: Uza zaidi, uza kwa njia ya kukatiza, uliza rufaa\n2. **Boresha uwepo wa mtandaoni**: Sasisha mitandao ya kijamii, kusanya mapitio\n3. **Rahisisha shughuli**: Ondoa upotevu, fanya kazi za kurudiwa kiotomatiki\n\n**Ukuaji wa Muda wa Kati (3-12 miezi):**\n1. **Panua mstari wa bidhaa**: Ongeza matoleo yanayojumuisha\n2. **Ingia masoko mapya**: Maeneo tofauti au sehemu za wateja\n3. **Jenga ushirikiano**: Shirikiana na biashara zingine\n4. **Wekeza katika masoko**: Kampeni za kudumu, zilizolengwa\n\n**Maono ya Muda Mrefu (1-3 miaka):**\n1. **Jenga timu**: Ajiri nafasi muhimu\n2. **Tengeneza mifumo**: Unda michakato inayofanya kazi bila wewe\n3. **Pata ufadhili**: Ikiwa inahitajika kwa upanuzi mkubwa\n4. **Fikiria franchise au leseni**: Ikiwa muundo umethibitishwa\n\n**Vidokezo vya Mawazo ya Ukuaji:**\n✓ Wekeza tena faida katika biashara\n✓ Jifunze mara kwa mara (vitabu, kozi, washauri)\n✓ Chukua hatari zilizokokotolewa\n✓ Endelea kuzingatia wateja\n\nNi changamoto gani kubwa ya ukuaji unayo sasa?",
      ],
    },
  },
  {
    keywords: ['start', 'anza', 'begin', 'new business', 'biashara mpya', 'entrepreneur', 'mfanyabiashara'],
    responses: {
      en: [
        "Starting a business is exciting! Here's your step-by-step guide:\n\n**1. Validate Your Idea**\n• Talk to potential customers\n• Research the market and competition\n• Start small with a minimum viable product (MVP)\n\n**2. Create a Simple Business Plan**\n• What problem are you solving?\n• Who are your customers?\n• How will you make money?\n• What are your startup costs?\n\n**3. Handle the Basics**\n• Register your business (if required)\n• Open a business bank account\n• Set up basic bookkeeping\n• Understand tax obligations\n\n**4. Start Marketing**\n• Create social media profiles\n• Tell everyone you know\n• Offer introductory discounts\n• Collect testimonials from early customers\n\n**5. Focus on Cash Flow**\n• Keep costs low initially\n• Get paid upfront when possible\n• Reinvest profits wisely\n\n**Common Mistakes to Avoid:**\n❌ Spending too much on fancy equipment initially\n❌ Not talking to customers before launching\n❌ Mixing personal and business finances\n❌ Trying to do everything yourself\n\nWhat type of business are you thinking of starting?",
      ],
      sw: [
        "Kuanza biashara ni kusisimua! Hapa kuna mwongozo wako wa hatua kwa hatua:\n\n**1. Thibitisha Wazo Lako**\n• Zungumza na wateja watarajiwa\n• Fanya utafiti wa soko na ushindani\n• Anza kidogo na bidhaa ya chini ya uwezo (MVP)\n\n**2. Unda Mpango Rahisi wa Biashara**\n• Unatatua tatizo gani?\n• Wateja wako ni nani?\n• Utapata pesa vipi?\n• Gharama zako za kuanza ni nini?\n\n**3. Shughulikia Mambo ya Msingi**\n• Sajili biashara yako (ikiwa inahitajika)\n• Fungua akaunti ya benki ya biashara\n• Weka uwekaji wa vitabu vya msingi\n• Elewa wajibu wa kodi\n\n**4. Anza Masoko**\n• Unda wasifu wa mitandao ya kijamii\n• Waambie kila mtu unayemjua\n• Toa punguzo za utangulizi\n• Kusanya ushuhuda kutoka kwa wateja wa mapema\n\n**5. Zingatia Mtiririko wa Fedha**\n• Weka gharama chini awali\n• Lipwa mapema inapowezekana\n• Wekeza tena faida kwa busara\n\n**Makosa ya Kawaida ya Kuepuka:**\n❌ Kutumia pesa nyingi sana kwa vifaa vya kifahari awali\n❌ Kutokuongea na wateja kabla ya kuzindua\n❌ Kuchanganya fedha za kibinafsi na za biashara\n❌ Kujaribu kufanya kila kitu mwenyewe\n\nUnafikiri kuanza aina gani ya biashara?",
      ],
    },
  },
];

const generalResponses = {
  en: [
    "That's a great question! As a business advisor, I'm here to help you with:\n\n• **Budgeting & Financial Planning**: Managing your money effectively\n• **Pricing Strategies**: Setting the right prices for profitability\n• **Cash Flow Management**: Keeping your business financially healthy\n• **Growth Strategies**: Scaling your business sustainably\n\nCould you tell me more about your specific situation? For example:\n- What type of business do you run?\n- What's your biggest challenge right now?\n- What are you hoping to achieve?\n\nThe more details you share, the better I can help!",
    "I'm here to support your business journey! Let me help you with practical advice on:\n\n✓ Creating and managing budgets\n✓ Developing pricing strategies\n✓ Improving cash flow\n✓ Planning for growth\n\nTo give you the most relevant advice, could you share:\n- Your business type or industry?\n- Your current challenge or goal?\n- Any specific numbers or context?\n\nDon't worry if you're just starting out - I'm here to help at every stage!",
  ],
  sw: [
    "Hilo ni swali zuri! Kama mshauri wa biashara, niko hapa kukusaidia na:\n\n• **Bajeti na Mipango ya Kifedha**: Kusimamia fedha zako kwa ufanisi\n• **Mikakati ya Bei**: Kuweka bei sahihi kwa faida\n• **Usimamizi wa Mtiririko wa Fedha**: Kuweka biashara yako yenye afya ya kifedha\n• **Mikakati ya Ukuaji**: Kupanda biashara yako kwa kudumu\n\nUnaweza kuniambia zaidi kuhusu hali yako maalum? Kwa mfano:\n- Unafanya aina gani ya biashara?\n- Changamoto yako kubwa sasa ni nini?\n- Unataka kufikia nini?\n\nKadri unavyoshiriki maelezo zaidi, ndivyo nitakavyoweza kukusaidia vizuri zaidi!",
    "Niko hapa kusaidia safari yako ya biashara! Hebu nikusaidie na ushauri wa vitendo juu ya:\n\n✓ Kuunda na kusimamia bajeti\n✓ Kuendeleza mikakati ya bei\n✓ Kuboresha mtiririko wa fedha\n✓ Kupanga ukuaji\n\nKukupa ushauri unaofaa zaidi, unaweza kushiriki:\n- Aina yako ya biashara au tasnia?\n- Changamoto yako ya sasa au lengo?\n- Nambari zozote maalum au muktadha?\n\nUsijali ikiwa unaanza tu - niko hapa kusaidia katika kila hatua!",
  ],
};

const greetings = {
  en: [
    "Hello! 👋 Welcome to JengaBiz Assistant. I'm here to help you with your business financial planning and growth strategies.\n\nHow can I assist you today? Feel free to ask about:\n• Budgeting and financial management\n• Pricing your products or services\n• Managing cash flow\n• Growing your business\n\nWhat would you like to know?",
    "Jambo! 🌟 I'm your JengaBiz business advisor. I'm excited to help you build and grow your business!\n\nI can provide guidance on budgeting, pricing, cash flow, and growth strategies. What's on your mind today?",
  ],
  sw: [
    "Habari! 👋 Karibu JengaBiz Assistant. Niko hapa kukusaidia na mipango yako ya kifedha ya biashara na mikakati ya ukuaji.\n\nNinaweza kukusaidiaje leo? Jisikie huru kuuliza kuhusu:\n• Bajeti na usimamizi wa kifedha\n• Bei ya bidhaa au huduma zako\n• Kusimamia mtiririko wa fedha\n• Kukuza biashara yako\n\nUngependa kujua nini?",
    "Jambo! 🌟 Mimi ni mshauri wako wa biashara wa JengaBiz. Nimefurahi kukusaidia kujenga na kukuza biashara yako!\n\nNinaweza kutoa mwongozo juu ya bajeti, bei, mtiririko wa fedha, na mikakati ya ukuaji. Kuna nini akilini mwako leo?",
  ],
};

function detectLanguage(text: string): 'en' | 'sw' {
  const swahiliWords = [
    'habari',
    'jambo',
    'karibu',
    'asante',
    'tafadhali',
    'ndiyo',
    'hapana',
    'sawa',
    'biashara',
    'fedha',
    'bei',
    'bajeti',
    'ukuaji',
    'mtiririko',
    'nina',
    'nataka',
    'naweza',
    'nini',
    'vipi',
    'gani',
    'kuhusu',
    'kwa',
    'na',
    'ya',
    'wa',
    'la',
  ];

  const lowerText = text.toLowerCase();
  const swahiliWordCount = swahiliWords.filter((word) => lowerText.includes(word)).length;

  return swahiliWordCount >= 2 ? 'sw' : 'en';
}

function isGreeting(text: string): boolean {
  const greetingPatterns = [
    /^(hi|hello|hey|jambo|habari|karibu|hola)/i,
    /^(good morning|good afternoon|good evening)/i,
    /^(how are you|what's up|sup)/i,
  ];

  return greetingPatterns.some((pattern) => pattern.test(text.trim()));
}

export function generateAIResponse(userMessage: string): string {
  const language = detectLanguage(userMessage);
  const lowerMessage = userMessage.toLowerCase();

  // Check for greetings
  if (isGreeting(userMessage)) {
    const greetingList = greetings[language];
    return greetingList[Math.floor(Math.random() * greetingList.length)];
  }

  // Check for matching templates
  for (const template of responseTemplates) {
    const hasKeyword = template.keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase()));

    if (hasKeyword) {
      const responses = template.responses[language];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default general response
  const generalList = generalResponses[language];
  return generalList[Math.floor(Math.random() * generalList.length)];
}
