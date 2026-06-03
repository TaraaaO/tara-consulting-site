// posts-data.js
// This file is the source of truth for blog posts.
// The admin panel (admin.html) writes updates to Supabase.
// This file is the fallback when Supabase isn't connected yet.

const FALLBACK_POSTS = [
  {
    id: "post-01",
    tag: "seo", tagLabel: "SEO",
    readTime: "3 min read",
    title: "Why ranking on Google matters less than it used to — and what to do instead",
    excerpt: "The rules of search visibility have shifted. Here's what's replacing the old playbook.",
    body: `<p>For years, the goal was simple: rank on page one of Google. In 2026, that's still worth chasing — but it's no longer the whole game. <strong>AI Overviews now appear on nearly half of all Google searches</strong>, answering questions directly before a user ever clicks a link. That changes what "being found" actually means.</p>
    <div class="stat-row">
      <div class="stat-box"><div class="stat-val">48%</div><div class="stat-label">of Google searches now show an AI Overview result at the top</div></div>
      <div class="stat-box"><div class="stat-val">50%</div><div class="stat-label">predicted drop in organic click-through to websites by 2028 (Gartner)</div></div>
    </div>
    <p>The shift isn't about abandoning SEO — it's about expanding what SEO means. Ranking matters less. <strong>Being referenced matters more.</strong> AI tools pull from sources they trust: businesses with clear, well-structured content that directly answers questions, consistent reviews, and mentions across multiple platforms.</p>
    <p>Practically speaking: make sure each key page on your website opens with a direct, plain-language answer to the question it's addressing. Write as if you're being cited in an AI summary, not trying to game a keyword match. Update your Google Business Profile regularly. And publish consistently — freshness is a trust signal AI systems actively reward.</p>
    <div class="cta-line">If you're not sure whether your business is showing up in AI search results, that's worth checking today — not next quarter.</div>`
  },
  {
    id: "post-02",
    tag: "social", tagLabel: "Social media",
    readTime: "3 min read",
    title: "The hashtag is dead. Here's what's replacing it on Instagram and Facebook",
    excerpt: "Platform behaviour has changed significantly. The caption strategies that worked in 2023 are actively hurting you now.",
    body: `<p>Instagram's own CEO has confirmed it: <strong>hashtags no longer increase a post's reach</strong>. The platform now recommends capping them at three to five per post, and stacking 20-plus not only doesn't help — it can flag your content as spammy to the algorithm.</p>
    <p>What's replaced it? Search behaviour. Instagram, Facebook, and TikTok now operate more like search engines than broadcast channels. Captions are scanned for natural, descriptive language that matches what real people type. And since 2025, Instagram posts from public business accounts can be indexed and appear directly in Google search results — which means the words in your caption are doing double duty.</p>
    <p>The practical shift: <strong>weave your keywords into the caption itself</strong>, not stacked as hashtags at the bottom. Write captions the way someone would search for what you offer. "Family-friendly holiday park on the NSW South Coast near Jervis Bay" beats "#familyholiday #holidaypark #shoalhaven" every time under the current algorithm.</p>
    <p>Engagement signals — saves, shares, watch time, meaningful comments — now carry more weight than raw reach. Content that gets read, saved, and shared is what the algorithm rewards.</p>
    <div class="cta-line">Small change, significant impact. If you update nothing else about your social content this month, update how you're writing captions.</div>`
  },
  {
    id: "post-03",
    tag: "ads", tagLabel: "Paid ads",
    readTime: "3 min read",
    title: "The most expensive mistake businesses make on Meta ads — and it's not the creative",
    excerpt: "Most wasted ad spend comes down to one missing step that happens before you ever write a caption.",
    body: `<p>Most businesses who've tried Facebook or Instagram ads and concluded "they don't work" made the same mistake before they ever launched: <strong>they didn't have tracking set up properly</strong>.</p>
    <p>Without a working Meta Pixel and a defined conversion event, the algorithm has no feedback loop. It can't learn who to show your ads to, it can't tell you what's working, and you're effectively paying for data collection while throwing the data away.</p>
    <div class="stat-row">
      <div class="stat-box"><div class="stat-val">61%</div><div class="stat-label">more likely to convert when appearing in both organic and paid channels</div></div>
      <div class="stat-box"><div class="stat-val">2×</div><div class="stat-label">revenue increase from improving conversion rate 2% → 3% with same spend</div></div>
    </div>
    <p>The second most common issue: changing too much, too fast. Meta's algorithm needs roughly two to four weeks of data before it optimises properly. Businesses that panic after a slow first week — cut the budget, change the audience, rewrite the creative — have essentially reset the learning phase every time.</p>
    <p>Before spending another dollar: <strong>check your Pixel is active in Events Manager</strong>. Define what a conversion actually means for your business — a booking, a form submission, a phone call. Only then does the creative matter.</p>
    <div class="cta-line">Ads amplify what already works. They don't fix a broken foundation — they just show the problem to more people, faster.</div>`
  },
  {
    id: "post-04",
    tag: "strategy", tagLabel: "Strategy",
    readTime: "3 min read",
    title: "Why your Google Business Profile is probably your highest-return free marketing asset",
    excerpt: "Most businesses set it up once and forget it. That's a significant missed opportunity in 2026.",
    body: `<p>Google Business Profile is free, takes under an hour to set up properly, and sits at exactly the moment a potential customer is actively looking for what you offer. Yet most small businesses either haven't fully completed theirs, or haven't touched it since they created it.</p>
    <p>In 2026, a well-maintained Google Business Profile does three things that are increasingly hard to replicate elsewhere: it appears in local search results, it contributes to AI Overview citations for local queries, and it surfaces in Google Maps — often the first stop for anyone looking for a local business or service area.</p>
    <p>What "fully completed" actually means: <strong>current photos added in the last 90 days</strong>, a description that uses the natural language your customers search with, services listed clearly, Q&A populated with the questions you actually get asked, and posts updated weekly (they expire after seven days, and a dead post sends the wrong signal).</p>
    <p>Reviews matter enormously here. Not just the star rating — the <strong>recency and volume of reviews</strong> is a ranking signal. Businesses with 40 reviews from three years ago are actively losing ground to businesses with 15 reviews from the last six months. Build asking for a review into every positive customer interaction.</p>
    <div class="cta-line">If you do nothing else this week, spend 20 minutes auditing your Google Business Profile. It's genuinely one of the highest-return actions available to any local business.</div>`
  },
  {
    id: "post-05",
    tag: "content", tagLabel: "Content",
    readTime: "3 min read",
    title: "One post, four platforms: how to create content once and distribute it everywhere",
    excerpt: "Posting separately on every platform is burning time you don't have. There's a smarter system.",
    body: `<p>The businesses that consistently show up across Instagram, Facebook, Google, and email aren't producing four times the content — they're thinking about content differently from the start. <strong>One core idea can become a reel, a carousel, a caption, a Google post, and an email subject line</strong> without starting from scratch each time.</p>
    <p>The shift in 2026 is thinking about content as a connected system rather than isolated platform posts. Customers don't live on one channel. They might discover you on Instagram, Google your name, check your reviews, visit your website, and then call you — and each of those touchpoints is an opportunity to reinforce the same message.</p>
    <p>A practical repurposing system looks like this: <strong>start with the most effort-heavy format</strong> — a short video or detailed caption — and strip it back for everything else. A 60-second reel becomes a still image with a key quote, a Google post with the essential details, and a two-line email teaser. Same core message, native to each platform.</p>
    <p>The goal isn't to post everywhere — it's to show up consistently in the places your customers actually are. For most small businesses, that's Instagram, Facebook, and Google. Start there before adding anything else.</p>
    <div class="cta-line">Three to four posts per week, consistently, will always outperform ten posts in one week followed by two weeks of silence.</div>`
  },
  {
    id: "post-06",
    tag: "ai", tagLabel: "AI & efficiency",
    readTime: "4 min read",
    title: "84% of small businesses are using AI for marketing. Here's what that actually means",
    excerpt: "The gap between businesses using AI tools and those that aren't is growing quickly — but not in the way most people think.",
    body: `<p>The number is striking: <strong>84% of small businesses now use AI to save time on content and marketing</strong>. That's not a future trend — it's the current landscape. The businesses not using it aren't competing on a level field when it comes to output speed and content volume.</p>
    <div class="stat-row">
      <div class="stat-box"><div class="stat-val">84%</div><div class="stat-label">of small businesses now use AI for content and marketing planning</div></div>
      <div class="stat-box"><div class="stat-val">11.4 hrs</div><div class="stat-label">saved per week on average by marketers using AI tools</div></div>
    </div>
    <p>But the more important point is what AI is actually good at versus what still requires you. <strong>AI is excellent at first drafts, repurposing, structuring ideas, and execution speed</strong>. It's not good at knowing your specific customers, understanding your local market, or making the strategic calls about what actually matters for your business.</p>
    <p>The businesses getting the most from AI tools aren't replacing their marketing thinking — they're accelerating the execution of it. Strategy remains human. The keyboard work doesn't have to be.</p>
    <p>For most small businesses, the practical starting point isn't a complex AI stack. It's learning how to brief AI tools well — giving them the right context, brand voice, and specific ask — so the output actually sounds like you and serves your goals.</p>
    <div class="cta-line">AI is a competitive advantage when you know how to use it. It's background noise when you don't. The difference is almost entirely in how you direct it.</div>`
  },
  {
    id: "post-07",
    tag: "strategy", tagLabel: "Strategy",
    readTime: "3 min read",
    title: "What is a cost per lead — and why every business owner should know theirs",
    excerpt: "One number that tells you whether your marketing is actually working. Most businesses don't track it.",
    body: `<p>Cost per lead is straightforward: take what you spent on marketing last month and divide it by the number of genuine enquiries you received. That's your number. <strong>If you don't know it, you can't make a single informed decision</strong> about where to put your marketing budget.</p>
    <p>This matters because marketing channels feel very different from the inside. You might sense that Facebook ads "feel" busier, or that Google brings better enquiries — but without tracking cost per lead by channel, you're navigating by gut feeling rather than data. The channel that feels most active is often not the most efficient.</p>
    <p>What an acceptable cost per lead looks like <strong>depends entirely on your business</strong>. A trades business closing one in three enquiries at a $2,500 average job value can afford a much higher cost per lead than a café running a lunch special. The number only means something when you know your conversion rate and average job value alongside it.</p>
    <p>Once you know your baseline, you have something to measure everything against. Every campaign, every channel change, every new platform you try — the first question becomes: did this improve or worsen my cost per lead?</p>
    <div class="cta-line">You don't need a complicated analytics setup to start. Spend + enquiries + a simple spreadsheet is enough to begin making better decisions.</div>`
  },
  {
    id: "post-08",
    tag: "content", tagLabel: "Content",
    readTime: "3 min read",
    title: "Why authentic, unpolished content is outperforming professional production right now",
    excerpt: "The phone-shot founder video outperforming the $5,000 production job is a real, documented phenomenon.",
    body: `<p>This is counterintuitive enough that it's worth saying clearly: <strong>across almost every social platform in 2026, unpolished, authentic content is consistently outperforming professionally produced creative</strong>. The algorithm rewards it. Audiences trust it more. And it costs a fraction of the alternative.</p>
    <p>The reason is psychological. Polished content reads as an ad before anyone processes the message. Authentic content — a founder talking directly to camera, a behind-the-scenes moment, a real customer reaction — reads as a genuine signal before the audience's ad filter activates. By the time viewers realise it's promotional, they're already engaged.</p>
    <p>User-generated content drives roughly <strong>28% higher engagement than brand-created content</strong> on average. That's not because it looks better — it's because it carries a social proof signal that branded content simply can't manufacture.</p>
    <p>The practical implication: stop waiting until you have a professional shoot organised. Film a 60-second video on your phone this week. Talk directly to camera about something your customers genuinely ask you. Post it. The bar isn't production quality — <strong>the bar is genuine usefulness and recognisable humanity</strong>.</p>
    <div class="cta-line">Consistency with imperfect content will always outperform perfection with no content. Every time.</div>`
  },
  {
    id: "post-09",
    tag: "ads", tagLabel: "Paid ads",
    readTime: "4 min read",
    title: "Google Ads vs Meta Ads: which one is right for your business?",
    excerpt: "They work completely differently and serve different purposes. Using the wrong one for your goals is an expensive lesson.",
    body: `<p>The simplest way to understand the difference: <strong>Google Search Ads capture existing demand. Meta Ads create demand.</strong></p>
    <p>Someone searching "emergency plumber Wollongong" has already identified a need and is actively looking for a solution. Google puts your business in front of that person at the exact moment of intent — that's extremely high value, and it's why search ads tend to convert more efficiently for service businesses.</p>
    <p>Meta (Facebook and Instagram) works fundamentally differently. You're interrupting someone who was not thinking about you. This makes it better suited to building awareness, showcasing something visually compelling, or retargeting people who've already shown interest. The creative has to earn the stop.</p>
    <div class="stat-row">
      <div class="stat-box"><div class="stat-val">Google</div><div class="stat-label">Best for: service businesses, high-intent searches, local areas, specific needs</div></div>
      <div class="stat-box"><div class="stat-val">Meta</div><div class="stat-label">Best for: visual products, awareness, retargeting, lifestyle and destination brands</div></div>
    </div>
    <p>For most small businesses, <strong>Google Search is the higher-priority starting point</strong> if your customers are actively searching for what you offer. Meta becomes more powerful once you have an audience to retarget and creative that's already proven itself organically.</p>
    <div class="cta-line">Before running any paid advertising: define what a conversion means for your business. A form, a call, a booking. Without that defined, no platform can optimise for what you actually want.</div>`
  },
  {
    id: "post-10",
    tag: "strategy", tagLabel: "Strategy",
    readTime: "3 min read",
    title: "The marketing channel most small businesses are ignoring — and it's completely free",
    excerpt: "You've likely invested in social and search. But the most consistent driver of repeat business costs almost nothing.",
    body: `<p>Email marketing. <strong>It outperforms social media for direct conversion</strong>, costs almost nothing beyond a basic platform subscription, and reaches people who have actively opted in to hear from you — which is a fundamentally different audience quality than a boosted post reaching strangers.</p>
    <p>Businesses not investing in email often cite the same reasons: they don't have a big list, they're not sure what to send, or it feels intrusive. All of these are solvable, and none of them are good reasons to leave the channel idle.</p>
    <p>A small, engaged email list consistently outperforms a large social following in terms of actual enquiries generated. <strong>72% of customers return to the same businesses each year</strong> — which means the biggest growth lever for most small businesses isn't acquisition, it's retention. Email is the most reliable tool for nurturing the customers you already have.</p>
    <p>Starting point: if you have any customer contact list — even 50 people — that's an email list. A monthly update, a genuine tip, an early offer before you post it publicly. Nothing elaborate. The discipline of showing up in someone's inbox consistently, with something worth reading, <strong>compounds over time</strong> in a way no social algorithm can replicate.</p>
    <div class="cta-line">If you're not emailing your existing customers at least once a month, you're leaving recurring revenue on the table. Start small. Start now.</div>`
  }
];

// Will be overwritten by Supabase data when connected
window.POSTS = [];
