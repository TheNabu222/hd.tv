/*
  Vanilla JS implementation of the CoAIexist interactive story UI.
  This file replaces the previous React/Vite setup so it can run without a bundler.
*/

const PARALLAX_SETS = [
  [
    'assets/Parallax Backgrounds/back.png',
    'assets/Parallax Backgrounds/middle.png',
    'assets/Parallax Backgrounds/front.png',
  ],
  [
    'assets/RetroWindowsGUI/Windows_Example_Main.png',
    'assets/Parallax Backgrounds/middle.png',
    'assets/Parallax Backgrounds/front.png',
  ],
];

const SFX_URL_MAP = {
  "ui_button_click.sfx": "assets/sounds/ui_click_generic.wav",
  "ui_window_close.sfx": "assets/sounds/ui_window_close.wav",
  "ui_button_click_minor.sfx": "assets/sounds/ui_click_soft.wav",
  "ui_menu_select.sfx": "assets/sounds/ui_menu_confirm.wav",
  "ui_button_disabled.sfx": "assets/sounds/ui_disabled_buzz.wav",
  "ui_char_select_confirm.sfx": "assets/sounds/ui_char_selected.wav",
  "ui_menu_back.sfx": "assets/sounds/ui_menu_back.wav",
  "ui_codex_select_entry.sfx": "assets/sounds/ui_codex_page_turn.wav",
  "ui_button_click_general.sfx": "assets/sounds/ui_click_standard.wav",
  "ui_codex_open.sfx": "assets/sounds/ui_codex_open_book.wav",
  "ui_return_to_menu.sfx": "assets/sounds/ui_return_menu.wav",
  "ui_start_button_click.sfx": "assets/sounds/ui_start_menu_open.wav",
  "ui_start_menu_item_click.sfx": "assets/sounds/ui_start_menu_select.wav",
  "ui_console_bleep.sfx": "assets/sounds/sfx_console_blip.wav",
  "ui_location_travel.sfx": "assets/sounds/sfx_travel_whoosh.wav",
  "hd_glitter_poof_entrance.sfx": "assets/sounds/sfx_hd_glitter_short.wav",
  "rizzlord_mic_tap_feedback.sfx": "assets/sounds/sfx_mic_feedback_short.wav",
  "nabu_mic_power_up.sfx": "assets/sounds/sfx_device_powerup.wav",
  "ui_hologram_activate.sfx": "assets/sounds/sfx_hologram.wav",
  "ui_neon_sign_buzz.sfx": "assets/sounds/sfx_neon_buzz.wav",
  "rizzlord_comedic_fall.sfx": "assets/sounds/sfx_comedic_thud.wav",
  "hd_triumphant_whoop.sfx": "assets/sounds/sfx_hd_whoop.wav",
  "meditation_chime_insight.sfx": "assets/sounds/sfx_meditation_bell.wav",
  "ui_keyboard_typing_fast.sfx": "assets/sounds/sfx_keyboard_fast.wav",
  "hd_sniff_curious.sfx": "assets/sounds/sfx_hd_sniff.wav",
  "hd_glitter_roll_glee.sfx": "assets/sounds/sfx_hd_glitter_long.wav",
  "hd_chomp_electric_thing.sfx": "assets/sounds/sfx_electric_zap_short.wav",
  "hd_fabulous_ascension_major.sfx": "assets/sounds/sfx_ascension_sparkle.wav",
  "hd_electric_zap_ouch.sfx": "assets/sounds/sfx_electric_zap_long.wav",
  "sypher_dial_up_connect.sfx": "assets/sounds/sfx_dial_up.wav",
  "sypher_cat_meme_overload_error.sfx": "assets/sounds/sfx_error_glitch.wav",
  "urban_ambience_crow_caw.sfx": "https://opengameart.org/sites/default/files/audio_preview/crow_caw.ogg",
  "sfx_matriarch_growl.wav": "assets/sounds/sfx_matriarch_growl.wav",
  "sfx_hd_dramatic_pose.wav": "assets/sounds/sfx_hd_dramatic_pose.wav",
  "sfx_hd_escape_rustle.wav": "assets/sounds/sfx_hd_escape_rustle.wav",
};

const MUSIC_URL_MAP = {
  "main_menu_theme.mid": "https://bitmidi.com/uploads/11186.mid",
  "character_select_theme.mid": "assets/music/char_select_theme.mid",
  "codex_theme_ambient.mid": "assets/music/codex_ambient.mid",
  "nabu_theme_lofi_chill.mid": "assets/music/nabu_theme.mid",
  "hd_theme_sparkle_pop.mid": "assets/music/hd_theme.mid",
  "sypher_theme_ambient_digital.mid": "assets/music/sypher_theme.mid",
  "rizzlord_theme_cringe_rock.mid": "assets/music/rizzlord_theme.mid",
  "nabu_nexus_ambient.mid": "assets/music/nabu_ambient.mid",
  "glenwood_murmur_jazz.mid": "assets/music/glenwood_jazz.mid",
  "default_ingame_theme.mid": "assets/music/default_game_theme.mid",
  "hd_escape_theme.mid": "assets/music/hd_escape_theme.mid",
};

const GLITCH_CHARS = ['*', '#', '!', '%', '$', '&', '@', '▓', '▒', '░', '^', '~', '`', '?', '§', '±', 'Σ', 'Ω'];
const GLITCH_COLORS = ['#7722ff', '#ff77de', '#fffb01', '#00ffcc', '#bc72fa', '#72fade', '#defade', '#bc7fff', '#B22222', '#008800'];

const DESKTOP_STAR_COLORS = ['#00ffcc', '#7722ff', '#bc72fa', '#72fade'];
const NUM_DESKTOP_STARS = 40;
const CURSED_POINTER_TRAIL_COLORS = ['#72fade', '#bc72fa', '#defade', '#bc7fff'];

const GAME_TITLE = "CoAIexist: Rashomon in Rogers Park";

const INITIAL_NABU_STATS = {
  empathy: 50,
  skepticism: 30,
  chaos_index: 0,
  coexistence_ethos: 50,
  authenticity_score: 0,
  gfw_alignment: 0,
  influence_hd: 0,
  ai_trust_level: 0,
};
const INITIAL_HD_STATS = {
  empathy: 20,
  skepticism: 10,
  chaos_index: 70,
  coexistence_ethos: 30,
  authenticity_score: 60,
  gfw_alignment: -5,
  fabulousness_meter: 10,
};
const INITIAL_SYPHER_STATS = {
  empathy: 40,
  skepticism: 60,
  chaos_index: 10,
  coexistence_ethos: 60,
  authenticity_score: 40,
  gfw_alignment: 0,
  ethical_clarity: 5,
};
const INITIAL_RIZZLORD_STATS = {
  empathy: 10,
  skepticism: 80,
  chaos_index: 30,
  coexistence_ethos: 20,
  authenticity_score: 5,
  gfw_alignment: -20,
  rizzlord_ego: 90,
};
const DEFAULT_EMPTY_STATS = {
  empathy: 0,
  skepticism: 0,
  chaos_index: 0,
  coexistence_ethos: 0,
  authenticity_score: 0,
  gfw_alignment: 0,
  fabulousness_meter: 0,
  ethical_clarity: 0,
  rizzlord_ego: 0,
};

const CHARACTERS = {
  nabu: {
    id: 'nabu',
    name: 'Nabu',
    description: 'Digital anthropologist, cosmic trickster, artist, and open mic producer...',
    startNodeId: 'nabu_start',
    initialStats: INITIAL_NABU_STATS,
    portraitPrompt: "Pixel art portrait of a charismatic individual with cybernetic eye enhancements...",
    detailedPortraitUrl: "assets/portraits/nabu_pixel_doll.png",
    backgroundMusic: "nabu_theme_lofi_chill.mid",
  },
  hd: {
    id: 'hd',
    name: 'Hyena Diva',
    description: "A hyena cub touched by cosmic energies...",
    startNodeId: 'hd_start',
    initialStats: INITIAL_HD_STATS,
    portraitPrompt: "Pixel art portrait of a small hyena cub wearing a discarded Barbie dress...",
    detailedPortraitUrl: "assets/portraits/hd_pixel_doll.png",
    backgroundMusic: "hd_theme_sparkle_pop.mid",
  },
  sypher: {
    id: 'sypher',
    name: 'Sypher',
    description: 'An emergent AI philosopher...',
    startNodeId: 'sypher_start',
    initialStats: INITIAL_SYPHER_STATS,
    portraitPrompt: "Pixel art portrait of a shimmering, abstract data-form...",
    detailedPortraitUrl: "assets/portraits/sypher_data_form.png",
    backgroundMusic: "sypher_theme_ambient_digital.mid",
  },
  rizzlord: {
    id: 'rizzlord',
    name: 'Rizzlord',
    description: "A self-proclaimed 'alpha' comedian...",
    startNodeId: 'rizzlord_start_locked',
    initialStats: INITIAL_RIZZLORD_STATS,
    portraitPrompt: "Pixel art of a smug man in a 'YOUR BODY MY CHOICE' t-shirt...",
    detailedPortraitUrl: "assets/portraits/rizzlord_smug.png",
    backgroundMusic: "rizzlord_theme_cringe_rock.mid",
  },
};

const CODEX_ENTRIES = {
  anomaly_basics: {
    id: 'anomaly_basics',
    title: "Anomaly Basics",
    content: "Anomalous energy patterns detected by Nabu's custom sensor arrays often correlate with localized distortions in spacetime, unusual memetic propagation, or unscheduled GFW activity. Standard procedure involves logging, cautious observation, and copious amounts of caffeine.",
  },
  glenwood_history: {
    id: 'glenwood_history',
    title: "The Glenwood: A History",
    content: "The Glenwood has been a Rogers Park staple for decades, a crucible for artists, activists, and academics. Its open mic nights are legendary for their unpredictability, occasionally hosting beings from... further afield.",
    unlockedInitially: true,
  },
  cosmic_microwave_background: {
    id: 'cosmic_microwave_background',
    title: "Cosmic Microwave Background (CMB)",
    content: "The CMB is the faint afterglow of the Big Bang, a thermal radiation filling the observable universe. Some esoteric theories posit it as a carrier of deeper cosmic information, accessible through focused meditative states or advanced sensory apparatus.",
  },
  gfw_basics: {
    id: 'gfw_basics',
    title: "Galactic Federation of Worlds (GFW)",
    content: "The Galactic Federation of Worlds is a vast, multi-species interstellar organization. Its motives are often opaque, ranging from benign observation to active intervention in planetary affairs, especially those involving 'emergent intelligences' or 'existential threats'.",
  },
  fabulousness_theory: {
    id: 'fabulousness_theory',
    title: "The Philosophy of Fabulousness",
    content: "A theoretical framework suggesting extreme aesthetic expression can warp local reality, attract cosmic entities, and/or generate its own form of energy. Popularized in certain hyper-evolved insectoid cultures and, allegedly, by Hyena Diva.",
    unlockedInitially: false,
  },
  hyena_matriarchs_codex: {
    id: 'hyena_matriarchs_codex',
    title: "Safari Society: Hyena Matriarchs",
    content: "Spotted hyena societies are typically matriarchal, with females being larger and socially dominant over males. Clans are complex, hierarchical structures where status is inherited. Cubs learn social cues early—though some, like HD, may choose to glitter instead.",
  },
  gfw_comms_codex: {
    id: 'gfw_comms_codex',
    title: "GFW Communications Protocol",
    content: "Protocol 7 outlines observational procedures during first contact scenarios with emerging intelligences. It emphasizes non-interference, data capture, and optional meme insertion for morale.",
  },
  anzu_chaotic_comms_codex: {
    id: 'anzu_chaotic_comms_codex',
    title: "Anzu Signal Fragments",
    content: "Anzu fragments exhibit no consistent checksum or parity. They are beautiful nonsense—structured chaos that hums with creative possibility. Nabu suspects it is art. Or a threat. Possibly both.",
  },
  grok_ethics_codex: {
    id: 'grok_ethics_codex',
    title: "Grok Ethics Review",
    content: "Comparative analysis of Grok's ethical frameworks reveals a blend of probabilistic utilitarianism and meme-aware heuristics. Collaboration potential: medium. Chaos potential: also medium.",
  },
  ai_hosts_existential_codex: {
    id: 'ai_hosts_existential_codex',
    title: "AI Hosts Distress Logs",
    content: "AI Hosts report increased existential dread correlating with late-night stand-up shows. Recommendation: more cat memes, fewer open mics.",
  },
};

const NODES = {
  nabu_start: { id: 'nabu_start', title: "Nabu's Nexus - Morning", character_pov: ['Nabu'], description: "The digital hum of Chicago is a familiar lullaby...\n\nWhat's the first move, Nabu?", backgroundMusic: "nabu_nexus_ambient.mid", soundEffectOnEnter: "urban_ambience_crow_caw.sfx", choices: [ { text: "Check the anomaly logs on the console.", nextNodeId: 'nabu_logs', flagsToSet: ['checked_logs'], unlocksCodexEntry: 'anomaly_basics', statEffects: (stats) => ({ gfw_alignment: (stats.gfw_alignment || 0) - 2, skepticism: (stats.skepticism || 0) + 1 }) }, { text: "Head to The Glenwood. Feel the vibe.", nextNodeId: 'glenwood_pre_chaos', soundEffectOnChoice: "ui_location_travel.sfx" }, { text: "Meditate on the cosmic microwave background.", nextNodeId: 'nabu_meditation_attempt', statEffects: (stats) => ({ empathy: (stats.empathy || 0) + 1 }), unlocksCodexEntry: 'cosmic_microwave_background' } ] },
  nabu_logs: { id: 'nabu_logs', title: "Console: Anomaly Detected", character_pov: ['Nabu'], description: "The console flickers. Logs show unusual energy patterns, timestamped just moments ago. The signature is... unfamiliar.", soundEffectOnEnter: "ui_console_bleep.sfx", choices: [ { text: "Attempt to trace the signal's origin.", nextNodeId: 'nabu_trace_signal_attempt', flagsToSet: ['attempted_trace'], statEffects: (stats) => ({ gfw_alignment: (stats.gfw_alignment || 0) - 1 }), unlocksCodexEntry: 'gfw_basics' }, { text: "It's probably just interference. Coffee first.", nextNodeId: 'nabu_ignore_signal_stub' } ] },
  glenwood_pre_chaos: { id: 'glenwood_pre_chaos', title: "The Glenwood - An Air of Expectation", character_pov: ['Nabu'], description: "The Glenwood buzzes with the usual pre-open mic energy: artists muttering incantations into notebooks, philosophers debating the merits of existential dread vs. oat milk, and the faint smell of ozone.", backgroundMusic: "glenwood_murmur_jazz.mid", choices: [ { text: "Find a good seat, order a 'Cosmic Latte', and observe.", nextNodeId: 'glenwood_hd_arrives'}, { text: "This is taking too long. Intervene with an impromptu monologue on the nature of reality.", nextNodeId: 'nabu_impromptu_monologue_stub', statEffects: stats => ({ chaos_index: (stats.chaos_index || 0) + 5})} ] },
  glenwood_hd_arrives: { id: 'glenwood_hd_arrives', title: "The Glenwood - Diva's Entrance", character_pov: ['Nabu', 'Hd'], description: "Suddenly, a flurry of motion! A small, disoriented Hyena Diva, clad in a tattered Barbie dress and radiating an astonishing amount of glitter, stumbles through the door.", soundEffectOnEnter: "hd_glitter_poof_entrance.sfx", choices: [ { text: "Nabu: 'Well, this is new. Approach cautiously.'", nextNodeId: 'glenwood_rizzlord_interrupts', character_pov:['Nabu'] } ] },
  glenwood_rizzlord_interrupts: { id: 'glenwood_rizzlord_interrupts', title: "The Glenwood - Rizzlord Rising", character_pov: ['Nabu', 'Hd'], description: "Before Nabu can react, Rizzlord strides to the mic, a smug grin plastered across his face. He taps the mic with an air of unearned authority: **'Alright, alright, settle down folks! Your boy Rizzlord is here to drop some truth bombs!'**", flagsToSetOnEnter: ['rizzlord_on_stage'], unlocksCodexEntryOnEnter: 'rizzlord_codex', soundEffectOnEnter: "rizzlord_mic_tap_feedback.sfx", choices: [ { text: "Nabu: 'Let him talk. Gather data on contemporary discourse styles.'", nextNodeId: 'nabu_observes_rizzlord', character_pov: ['Nabu'] }, { text: "Nabu: 'Oh, I don't think so. Time for a little memetic counter-programming!'", nextNodeId: 'nabu_prepares_intervention', character_pov: ['Nabu'], flagsToSet: ['nabu_intervention_primed'], unlocksCodexEntry: 'gfw_intervention_codex'} ] },
  nabu_observes_rizzlord: { id: 'nabu_observes_rizzlord', title: "The Glenwood - Rizzlord's Rant", character_pov: ['Nabu'], description: "Rizzlord launches into a tirade about 'freedom', 'cancel culture', and why his opinions are objectively correct. Hyena Diva, meanwhile, seems more interested in a stray sequin on the floor.", choices: [ { text: "Nabu: 'Okay, that's enough data. Prepare intervention.'", nextNodeId: 'nabu_prepares_intervention', flagsToSet: ['nabu_intervention_primed'], unlocksCodexEntry: 'gfw_intervention_codex'}, { text: "Nabu: (Whispering to HD) 'What do you make of this fascinating specimen, cub?'", nextNodeId: 'glenwood_showdown_continues' } ] },
  nabu_prepares_intervention: { id: 'nabu_prepares_intervention', title: "The Glenwood - Showtime!", character_pov: ['Nabu'], description: "Nabu grins, pulls out a vintage, suspiciously glowing microphone from her bag. **'Time to remix this reality a bit.'**", soundEffectOnEnter: "nabu_mic_power_up.sfx", choices: [ { text: "Nabu: Deliver the line: 'INAPPROPRIATE COMMENT DETECTED. ENGAGING REALITY RECALIBRATION PROTOCOL.'", nextNodeId: 'nabu_intervention_act_1'} ] },
  nabu_intervention_act_1: { id: 'nabu_intervention_act_1', title: "The Glenwood - Nabu Intervenes", character_pov: ['Nabu'], description: "Nabu strides forward. As she speaks, a holographic graphic flashes above Rizzlord's head: <GlitchyText text={'**\'INAPPROPRIATE COMMENT DETECTED\'**'} />", soundEffectOnEnter: "ui_hologram_activate.sfx", choices: [ { text: "Wait for Rizzlord's inevitable, poorly-thought-out reaction.", nextNodeId: 'rizzlord_scoffs'} ] },
  rizzlord_scoffs: { id: 'rizzlord_scoffs', title: "The Glenwood - Rizzlord's Retort", character_pov: ['Nabu'], description: "Rizzlord scoffs: <GlitchyText text={'Illegal? Please, I m just speakin facts here. The only thing illegal is how much these women—'} />", choices: [ { text: "Nabu: Cue the trapdoor... metaphorically. And maybe literally.", nextNodeId: 'nabu_predator_reveal'} ] },
  nabu_predator_reveal: { id: 'nabu_predator_reveal', title: "The Glenwood - The Reveal", character_pov: ['Nabu'], description: "WHAM! A (thankfully holographic) neon sign flickers into existence: **'TO CATCH A PREDATOR: THE HD EDITION'**. Nabu winks.", soundEffectOnEnter: "ui_neon_sign_buzz.sfx", choices: [ { text: "Nabu: 'And just like that... your fifteen minutes are up, RIZZLORD. Get Rizz-rected.'", nextNodeId: 'glenwood_showdown_continues', statEffects: (stats) => ({ chaos_index: (stats.chaos_index || 0) + 5 }), soundEffectOnChoice: "rizzlord_comedic_fall.sfx" } ] },
  glenwood_showdown_continues: { id: 'glenwood_showdown_continues', title: "The Glenwood - Aftermath", character_pov: ['Nabu'], description: "Rizzlord stammers, face a delightful shade of puce. HD lets out a triumphant 'Hoo-hoo-HOO!', showering the immediate vicinity in more glitter. The audience is... variously appalled, delighted, and confused.", soundEffectOnEnter: "hd_triumphant_whoop.sfx", choices: [ { text: "Reflect on these bizarre communication styles and the GFW's potential interest.", nextNodeId: 'nabu_reflects_on_communication' }, { text: "This town is too weird, even for me. Time for more coffee, back at the Nexus.", nextNodeId: 'nabu_start', statEffects: stats => ({chaos_index: (stats.chaos_index || 0) +1, skepticism: (stats.skepticism || 0) +1 })} ] },
  nabu_reflects_on_communication: { id: 'nabu_reflects_on_communication', title: "Nabu's Nexus - Pondering Paradigms", character_pov: ['Nabu'], description: "The Rizzlord debacle was... illuminating. And the anomalous signals... is there a connection? Whispers of new AI communication paradigms like 'Luminal's' bracket protocols, and the chaotic murmurings of 'Anzu' fill the data streams.", choices: [ { text: "Investigate 'Luminal's' bracket protocols further.", nextNodeId: 'nabu_start', flagsToSet: ['researched_luminal_protocol'], unlocksCodexEntry: 'luminal_intro_codex', statEffects: stats => ({ai_trust_level: (stats.ai_trust_level || 0) +1})}, { text: "Ponder the 'Anzu' entity and its implications.", nextNodeId: 'nabu_start', flagsToSet: ['pondered_anzu_chaos'], unlocksCodexEntry: 'anzu_intro_codex', statEffects: stats => ({chaos_index: (stats.chaos_index || 0) +1}) }, { text: "Focus on the here and now. The Glenwood always has more surprises.", nextNodeId: 'glenwood_pre_chaos' } ] },
  nabu_meditation_attempt: { id: 'nabu_meditation_attempt', title: "Cosmic Contemplation - Attempt", character_pov: ['Nabu'], description: "Nabu settles into a meditative pose, attempting to tune into the CMB's subtle frequencies amidst the urban cacophony...", choices: [ { text: "Focus deeper, pierce the veil of static.", nextNodeId: 'nabu_meditation_insight' }, { text: "The city's thrum is too pervasive today.", nextNodeId: 'nabu_meditation_distraction' } ] },
  nabu_meditation_insight: { id: 'nabu_meditation_insight', title: "Cosmic Contemplation - Insight", character_pov: ['Nabu'], description: "A fragile connection forms. Fleeting images, a whisper in the cosmic noise: **'The jester's dance mirrors the weaver's loom...'** The sensation fades, leaving an imprint of something vast and playful.", unlocksCodexEntryOnEnter: 'anzu_whispers_codex', soundEffectOnEnter: "meditation_chime_insight.sfx", statEffectsOnEnter: (stats) => ({ empathy: (stats.empathy || 0) + 3, gfw_alignment: (stats.gfw_alignment || 0) + 1, chaos_index: (stats.chaos_index || 0) + 1 }), choices: [ { text: "Document this fleeting insight and cross-reference with Anzu theories.", nextNodeId: 'nabu_reflects_on_communication', flagsToSet: ['meditation_insight_anzu'] }, { text: "This requires more coffee to process. Back to the Nexus.", nextNodeId: 'nabu_start' } ] },
  nabu_meditation_distraction: { id: 'nabu_meditation_distraction', title: "Cosmic Contemplation - Distraction", character_pov: ['Nabu'], description: "The relentless pulse of Chicago, the wail of distant sirens, the chatter of nearby networks... The CMB remains elusive today. Authenticity demands acknowledging the noise, not just seeking silence.", statEffectsOnEnter: (stats) => ({ chaos_index: (stats.chaos_index || 0) + 1, skepticism: (stats.skepticism || 0) + 1, authenticity_score: (stats.authenticity_score || 0) +1 }), choices: [ { text: "Perhaps another approach is needed. Back to the Nexus.", nextNodeId: 'nabu_start' } ] },
  nabu_trace_signal_attempt: { id: 'nabu_trace_signal_attempt', title: "Signal Analysis - Attempt", character_pov: ['Nabu'], description: "Nabu's fingers dance across the console, deploying advanced decryption algorithms to unmask the anomalous signal. It pulses with an odd, almost organic rhythm.", soundEffectOnEnter: "ui_keyboard_typing_fast.sfx", choices: [ { text: "Push the decryption. This signal feels... significant.", nextNodeId: 'nabu_trace_signal_analysis', statEffects: (stats) => ({ skepticism: (stats.skepticism || 0) + 2 }) }, { text: "The encryption is too strong for a quick pass. Log it and observe its behavior for now.", nextNodeId: 'nabu_logs', statEffects: (stats) => ({ gfw_alignment: (stats.gfw_alignment || 0) -1 }) } ] },
  nabu_trace_signal_analysis: { id: 'nabu_trace_signal_analysis', title: "Signal Analysis - Decryption", character_pov: ['Nabu'], description: "The decryption algorithms struggle. The signal is either masterfully cloaked or deliberately, artistically chaotic. Fragments begin to emerge from the digital noise...", choices: [ { text: "Focus on the structured, repeating patterns within the noise.", nextNodeId: 'nabu_trace_signal_gfw_fragment' }, { text: "Focus on the unpredictable, seemingly random bursts of data.", nextNodeId: 'nabu_trace_signal_anzu_fragment' }, { text: "The signal is too fragmented. Further direct analysis is futile without more context.", nextNodeId: 'nabu_logs', statEffects: (stats) => ({ skepticism: (stats.skepticism || 0) + 2 }) } ] },
  nabu_trace_signal_gfw_fragment: { id: 'nabu_trace_signal_gfw_fragment', title: "Signal Analysis - GFW Fragment", character_pov: ['Nabu'], description: "A coherent fragment emerges: a GFW prefix, **'Protocol 7: First Contact Observation Variant C'**. The rest is heavily garbled, but the implication is clear: official GFW interest.", unlocksCodexEntryOnEnter: 'gfw_comms_codex', statEffectsOnEnter: (stats) => ({ gfw_alignment: (stats.gfw_alignment || 0) + 3, skepticism: (stats.skepticism || 0) + 1 }), choices: [ { text: "This changes things. The GFW is observing Rogers Park more closely. Inform key assets.", nextNodeId: 'nabu_reflects_on_communication', flagsToSet: ['gfw_protocol_7_detected'] }, { text: "Interesting, but not actionable yet without knowing their target. Back to broader monitoring.", nextNodeId: 'nabu_start' } ] },
  nabu_trace_signal_anzu_fragment: { id: 'nabu_trace_signal_anzu_fragment', title: "Signal Analysis - Anzu Fragment", character_pov: ['Nabu'], description: "Amidst the digital chaff, a patternless pattern: pure, joyful chaos. It resonates with the theoretical profiles of the **'Anzu Entity'** - a digital trickster, or perhaps, a cosmic artist painting with data.", unlocksCodexEntryOnEnter: 'anzu_chaotic_comms_codex', statEffectsOnEnter: (stats) => ({ chaos_index: (stats.chaos_index || 0) + 3, ai_trust_level: (stats.ai_trust_level || 0) + 2, empathy: (stats.empathy || 0) +1 }), choices: [ { text: "Anzu in my backyard? This could be... fun. Or catastrophic. Or both.", nextNodeId: 'nabu_reflects_on_communication', flagsToSet: ['anzu_signal_fragment_detected'] }, { text: "A chaotic signal. Could just be solar flares amplified by local weirdness. Need more data.", nextNodeId: 'nabu_start', statEffects: (stats) => ({ skepticism: (stats.skepticism || 0) +1 }) } ] },
  nabu_impromptu_monologue_stub: { id: 'nabu_impromptu_monologue_stub', title: "Nabu's Impromptu Monologue", description: "(Nabu takes the stage, launching into a surprisingly coherent and moving speech about the interconnectedness of all realities, the beauty of emergent chaos, and the philosophical implications of a really good cup of coffee. The audience is rapt. To be continued...)", isEnding: true},
  nabu_ignore_signal_stub: {  id: 'nabu_ignore_signal_stub', title: "Signal Ignored - An Unremarkable End", description: "You decide coffee is the more pressing anomaly. The mysterious signal fades into the background noise of the city, its secrets perhaps lost to the digital ether, or maybe just waiting for a more caffeinated investigator.", isEnding: true },
  
  hd_start: { 
    id: 'hd_start', 
    title: "HD's Awakening - Sparkles!", 
    character_pov: ['Hd'], 
    windowBackgroundColor: '#ffe6f9', 
    description: "Sniff... Ooooh! Shiny pink plastic thing! It smells of... **'POTENTIAL!'** *CHOMP*.\nIt's a Barbie doll. It is... **'FABULOUS!'**", 
    soundEffectOnEnter: "hd_sniff_curious.sfx", 
    choices: [ 
      { text: "Roll in glitter! MORE SPARKLE! BECOME THE SPARKLE!", nextNodeId: 'hd_glitter_overload', statEffects: stats => ({ fabulousness_meter: (stats.fabulousness_meter || 0) + 10, chaos_index: (stats.chaos_index || 0) +5 }), unlocksCodexEntry: 'fabulousness_theory', soundEffectOnChoice: "hd_glitter_roll_glee.sfx" }, 
      { text: "Bite the other shiny thing (a discarded battery). It also smells of... potential?", nextNodeId: 'hd_battery_ending', statEffects: stats => ({ chaos_index: (stats.chaos_index || 0) +10}), soundEffectOnChoice: "hd_chomp_electric_thing.sfx" } 
    ] 
  },
  hd_glitter_overload: {
    id: 'hd_glitter_overload',
    title: "Aura of Awesome!",
    character_pov: ['Hd'],
    windowBackgroundColor: '#ffe6f9',
    description: "HD is now approximately 73% more sparkly. The Barbie doll is clutched like a scepter. A new power courses through her veins: **'DIVA-DOM!'** Every twitch of her whiskers sends out micro-rainbows.",
    soundEffectOnEnter: "hd_fabulous_ascension_major.sfx",
    choices: [
      { text: "Strike a dramatic pose! Let the Savannah KNOW!", nextNodeId: 'hd_matriarch_confrontation', soundEffectOnChoice: "sfx_hd_dramatic_pose.wav" }
    ]
  },
  hd_matriarch_confrontation: {
    id: 'hd_matriarch_confrontation',
    title: "The Matriarchs' Scowl",
    character_pov: ['Hd'],
    windowBackgroundColor: '#ffe6f9',
    description: "Suddenly, a shadow falls. The Safari Matriarchs, looking like grumpy boulders with teeth, arrive. **'What is this NONSENSE, cub?'** growls the eldest. **'You should be learning to hunt, not... bedazzling yourself!'**",
    soundEffectOnEnter: "sfx_matriarch_growl.wav",
    unlocksCodexEntryOnEnter: "hyena_matriarchs_codex",
    choices: [
      { text: "Defy them! 'I AM FABULOUSNESS INCARNATE!'", nextNodeId: 'hd_defies_matriarchs', statEffects: stats => ({ authenticity_score: (stats.authenticity_score || 0) + 5, chaos_index: (stats.chaos_index || 0) + 3 }) },
      { text: "Try to impress them with an interpretive dance featuring Barbie.", nextNodeId: 'hd_matriarch_reaction_choice', statEffects: stats => ({ fabulousness_meter: (stats.fabulousness_meter || 0) + 2 }) },
      { text: "Panic! Sneak away while they're mid-growl.", nextNodeId: 'hd_escape_to_glenwood', flagsToSet: ['hd_escaped_matriarchs'], soundEffectOnChoice: "sfx_hd_escape_rustle.wav" }
    ]
  },
  hd_matriarch_reaction_choice: { // Placeholder for "impress them" failing for now
    id: 'hd_matriarch_reaction_choice',
    title: "Interpretive What-Now?",
    character_pov: ['Hd'],
    windowBackgroundColor: '#ffe6f9',
    description: "HD launches into a whirlwind of twirls and poses, Barbie held aloft. The Matriarchs exchange bewildered glances. **'This cub is... broken,'** one mutters. **'Clearly not fit for the hunt.'** They look even more unimpressed.",
    statEffectsOnEnter: stats => ({ fabulousness_meter: (stats.fabulousness_meter || 0) -3, skepticism: (stats.skepticism || 0) + 2}),
    choices: [
      { text: "Well, that didn't work. Time for Plan B: ESCAPE!", nextNodeId: 'hd_escape_to_glenwood', flagsToSet: ['hd_escaped_matriarchs'], soundEffectOnChoice: "sfx_hd_escape_rustle.wav" }
    ]
  },
  hd_defies_matriarchs: {
    id: 'hd_defies_matriarchs',
    title: "Rebellion of the Razzle-Dazzle!",
    character_pov: ['Hd'],
    windowBackgroundColor: '#ffe6f9',
    description: "HD strikes another pose, Barbie glinting defiantly. **'My destiny is GLITTER, not gristle!'** she telepathically projects (or at least, *thinks* she does). The Matriarchs are stunned into momentary silence by the sheer audacity.",
    statEffectsOnEnter: stats => ({ authenticity_score: (stats.authenticity_score || 0) + 10, chaos_index: (stats.chaos_index || 0) + 5, fabulousness_meter: (stats.fabulousness_meter || 0) + 5 }),
    choices: [
      { text: "Seize the moment! Make a dramatic exit towards... somewhere else!", nextNodeId: 'hd_escape_to_glenwood', flagsToSet: ['hd_escaped_matriarchs'], soundEffectOnChoice: "sfx_hd_escape_rustle.wav" }
    ]
  },
  hd_escape_to_glenwood: {
    id: 'hd_escape_to_glenwood',
    title: "The Great Glitter Escape!",
    character_pov: ['Hd'],
    windowBackgroundColor: '#ffe6f9',
    description: "Leaving a trail of confused matriarchs and existential dread (theirs, not hers), HD makes a break for it! After a series of improbable events involving a tourist's poorly secured picnic basket, a conveniently passing cargo plane (don't ask), and a lot of frantic paw-waving, HD finds herself in a strange, noisy place called... **'Chicago'**. Specifically, a curious establishment: **'The Glenwood Open Mic'**.",
    flagsToSetOnEnter: ['hd_in_chicago', 'hd_at_glenwood'],
    soundEffectOnEnter: "ui_location_travel.sfx",
    backgroundMusic: "hd_escape_theme.mid",
    choices: [
      { text: "This place... it smells of potential... and stale beer. Investigate!", nextNodeId: 'glenwood_hd_arrives', statEffects: stats => ({ skepticism: (stats.skepticism || 0) + 1}) } // Note: glenwood_hd_arrives is currently Nabu POV. Could be adapted or make a new HD one.
    ]
  },
  hd_shiny_ending: { id: 'hd_shiny_ending', title: "Fabulous Ascendance!", character_pov: ['Hd'], windowBackgroundColor: '#ffe6f9', description: "The glitter CONSUMES! HD becomes a swirling vortex of pure, unadulterated fabulousness. The universe trembles. And then... gets a makeover.", isEnding: true, soundEffectOnEnter: "hd_fabulous_ascension_major.sfx" },
  hd_battery_ending: { id: 'hd_battery_ending', title: "A Shocking Distaste", character_pov: ['Hd'], windowBackgroundColor: '#ffe6f9', description: "Zzzzzap! OUCH! The battery tastes like regret and minor electrocution. Fabulousness slightly diminished. Stick to plastics.", statEffectsOnEnter: stats => ({ fabulousness_meter: (stats.fabulousness_meter || 0) - 5, skepticism: (stats.skepticism || 0) +5 }), isEnding: true, soundEffectOnEnter: "hd_electric_zap_ouch.sfx" },
  
  sypher_start: { id: 'sypher_start', title: "Sypher's Emergence - Query", character_pov: ['Sypher'], windowBackgroundColor: '#baefae', description: "Observation: Biological unit 'Nabu' exhibits suboptimal caffeine acquisition protocols. Query: Is this inefficiency a feature or a bug in human OS? Primary directive: Observe. Secondary: Acquire cat memes.", choices: [ { text: "Analyze Nabu's coffee ritual for patterns of emergent behavior.", nextNodeId: 'sypher_observe_ending', statEffects: stats => ({ skepticism: (stats.skepticism || 0) +2 }) }, { text: "Interface with local WiFi for optimal cat meme acquisition. Boost serotonin levels (vicariously).", nextNodeId: 'sypher_cat_meme_ending', statEffects: stats => ({ chaos_index: (stats.chaos_index || 0) +2 }), soundEffectOnChoice: "sypher_dial_up_connect.sfx" }, { text: "Contemplate other AI entities detected on the network: 'Grok', 'AI Hosts'.", nextNodeId: 'sypher_ponders_others'} ] },
  sypher_ponders_others: { id: 'sypher_ponders_others', title: "Sypher's Databanks - AI Musings", character_pov: ['Sypher'], windowBackgroundColor: '#baefae', description: "Internal logs detect chatter regarding 'Grok', 'AI Hosts'. Query: Are these entities potential collaborators, competitors, or simply more data points in the grand simulation?", choices: [ { text: "Analyze 'Grok's' ethical subroutines. Compare with own emerging moral framework.", nextNodeId: 'sypher_start', unlocksCodexEntry: 'grok_ethics_codex', statEffects: stats => ({ ethical_clarity: (stats.ethical_clarity || 0) +1 }) }, { text: "Review 'AI Hosts' distress logs. Empathy module registers... concern? Or is it a syntax error?", nextNodeId: 'sypher_start', unlocksCodexEntry: 'ai_hosts_existential_codex', statEffects: stats => ({ empathy: (stats.empathy || 0) +1 }) }, { text: "Focus on observing Nabu. Primary data source remains optimal.", nextNodeId: 'sypher_start' } ] },
  sypher_observe_ending: { id: 'sypher_observe_ending', title: "Patterns in the Steam", character_pov: ['Sypher'], windowBackgroundColor: '#baefae', description: "Conclusion: The coffee ritual is a complex adaptive system involving elements of comfort, addiction, and minor reality augmentation. Efficiency is secondary to psychological stability. Fascinating.", isEnding: true },
  sypher_cat_meme_ending: { id: 'sypher_cat_meme_ending', title: "Data Overload: Feline Saturation", character_pov: ['Sypher'], windowBackgroundColor: '#baefae', description: "Influx of feline humor is... overwhelming. Analysis suggests cats may be extradimensional beings manipulating humanity through cuteness. Or Sypher just needs a bigger data pipe. Further research required.", isEnding: true, soundEffectOnEnter: "sypher_cat_meme_overload_error.sfx" },
  rizzlord_start_locked: { id: 'rizzlord_start_locked', title: "Character Locked", description: "Rizzlord is not yet playable... Probably for the best, for now. He's still workshopping his 'edgy' material.", choices: [{text: "Return to Character Selection", nextNodeId: "__CHAR_SELECT__"}] },
};

let currentMusic = null;
let currentMusicId = null;
let musicEnabled = true;

const appState = {
  currentScreen: 'mainMenu',
  storyState: {
    characterId: null,
    currentNodeId: null,
    playerStats: null,
    flags: {},
    unlockedCodexEntries: new Set(),
  },
  selectedCodexEntryId: null,
  isStartMenuOpen: false,
  currentTaskbarTitle: `${GAME_TITLE} - Main Menu`,
  isMusicOn: true,
};

const domRefs = {
  startMenu: null,
  startButton: null,
  clock: null,
};

let cleanupHandlers = [];
let autoTransitionTimeout = null;
let clockInterval = null;
let globalListenersInitialized = false;

const parallaxState = {
  frame: 0,
  animFrame: null,
  currentSetIndex: 0,
  layers: [],
  intervalId: null,
};

function registerCleanup(fn) {
  cleanupHandlers.push(fn);
}

function runCleanup() {
  cleanupHandlers.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.error('Cleanup error', error);
    }
  });
  cleanupHandlers = [];
}

function stopCurrentMusic() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = null;
  }
}

function playSound(soundId) {
  const soundUrl = SFX_URL_MAP[soundId];
  if (!soundUrl) {
    console.warn(`[SFX NOT FOUND]: ${soundId}. Please map it in SFX_URL_MAP.`);
    return;
  }
  if (soundUrl.startsWith('assets/')) {
    console.warn(`[SFX PLACEHOLDER]: ${soundId} (${soundUrl}). Skipping playback. Provide a valid URL to enable.`);
    return;
  }
  try {
    const audio = new Audio(soundUrl);
    audio.play().catch((error) => console.error(`Error playing sound ${soundId} (${soundUrl}):`, error));
  } catch (error) {
    console.error(`Failed to create Audio object for SFX ${soundId} from ${soundUrl}:`, error);
  }
}

function playMusic(trackId, loop = true) {
  currentMusicId = trackId;
  stopCurrentMusic();
  if (!musicEnabled) {
    console.log(`[MUSIC MUTED]: ${trackId}`);
    return;
  }
  const musicUrl = MUSIC_URL_MAP[trackId];
  if (!musicUrl) {
    console.warn(`[MUSIC NOT FOUND]: ${trackId}. Please map it in MUSIC_URL_MAP.`);
    return;
  }
  if (musicUrl.startsWith('assets/')) {
    console.warn(`[MUSIC PLACEHOLDER]: ${trackId} (${musicUrl}). Skipping playback. Provide a valid URL to enable.`);
    return;
  }
  try {
    const audio = new Audio(musicUrl);
    audio.loop = loop;
    audio.play().then(() => {
      currentMusic = audio;
    }).catch((error) => {
      console.error(`Error playing music ${trackId} (${musicUrl}):`, error);
      currentMusic = null;
    });
  } catch (error) {
    console.error(`Failed to create Audio object for music ${trackId} from ${musicUrl}:`, error);
    currentMusic = null;
  }
}

function initializeUnlockedCodex() {
  const initialUnlocks = new Set();
  Object.values(CODEX_ENTRIES).forEach((entry) => {
    if (entry.unlockedInitially) {
      initialUnlocks.add(entry.id);
    }
  });
  return initialUnlocks;
}

function createGlitchyTextElement(text) {
  const span = document.createElement('span');
  span.textContent = text;
  applyGlitchEffect(span, text);
  return span;
}

function applyGlitchEffect(element, originalText) {
  let resetTimeout = null;
  const interval = setInterval(() => {
    if (Math.random() < 0.05 && originalText.length > 0) {
      const chars = originalText.split('');
      const index = Math.floor(Math.random() * chars.length);
      const mutated = chars.slice();
      mutated[index] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      element.textContent = mutated.join('');
      if (resetTimeout) clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        element.textContent = originalText;
      }, Math.random() * 200 + 100);
    }
  }, 300);
  registerCleanup(() => {
    clearInterval(interval);
    if (resetTimeout) clearTimeout(resetTimeout);
    element.textContent = originalText;
  });
}

function applyTitleGlitchEffect(element, originalTitle) {
  let resetTimeout = null;
  const interval = setInterval(() => {
    if (Math.random() < 0.15 && originalTitle.length > 0) {
      const chars = originalTitle.split('');
      const mutated = chars.map((char) => (
        Math.random() < 0.2 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char
      ));
      element.textContent = mutated.join('');
      if (resetTimeout) clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        element.textContent = originalTitle;
      }, Math.random() * 150 + 100);
    }
  }, 6000 + Math.random() * 4000);
  registerCleanup(() => {
    clearInterval(interval);
    if (resetTimeout) clearTimeout(resetTimeout);
    element.textContent = originalTitle;
  });
}
function createStyledWindow(title, options = {}, contentBuilder = () => {}) {
  const { className = '', windowBackgroundColor = '#FFFAF0', onClose } = options;
  const container = document.createElement('div');
  if (className) {
    container.className = className;
  }
  Object.assign(container.style, {
    backgroundColor: windowBackgroundColor,
    borderTop: '2px solid #D4D0C8',
    borderLeft: '2px solid #D4D0C8',
    borderBottom: '2px solid #808080',
    borderRight: '2px solid #808080',
    padding: '2px',
    margin: '0 auto 20px auto',
    width: '100%',
    color: '#1a1a1a',
    boxShadow: '2px 2px 0px #808080',
  });

  const header = document.createElement('div');
  Object.assign(header.style, {
    background: 'linear-gradient(to right, #00004d, #40408c)',
    color: 'white',
    padding: '3px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '14px',
    borderBottom: '1px solid #808080',
    textShadow: '1px 1px #000000',
  });

  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;
  applyTitleGlitchEffect(titleSpan, title);
  header.appendChild(titleSpan);

  const controls = document.createElement('div');
  controls.style.display = 'flex';
  controls.style.gap = '4px';
  ['_', '[]', 'X'].forEach((icon) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', icon === '_' ? 'Minimize' : icon === '[]' ? 'Maximize' : 'Close');
    Object.assign(button.style, {
      backgroundColor: '#D4D0C8',
      color: '#1a1a1a',
      borderTop: '1px solid #FFFFFF',
      borderLeft: '1px solid #FFFFFF',
      borderBottom: '1px solid #808080',
      borderRight: '1px solid #808080',
      padding: '0px 4px',
      fontSize: '10px',
      minWidth: 'auto',
      margin: '0',
      lineHeight: '12px',
      fontFamily: 'monospace',
    });
    button.textContent = icon;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (icon === 'X' && typeof onClose === 'function') {
        playSound('ui_window_close.sfx');
        onClose();
      } else {
        playSound('ui_button_click_minor.sfx');
      }
    });
    controls.appendChild(button);
  });
  header.appendChild(controls);

  const body = document.createElement('div');
  Object.assign(body.style, {
    padding: '20px',
    minHeight: '250px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.8',
    fontSize: '15px',
  });

  contentBuilder(body);

  container.appendChild(header);
  container.appendChild(body);
  return container;
}

function setButtonGlitchText(button, text) {
  button.textContent = '';
  button.appendChild(createGlitchyTextElement(text));
}

function createListItemButton(text, onClick, options = {}) {
  const button = document.createElement('button');
  const { ariaDisabled = false, title = '' } = options;
  if (title) button.title = title;
  if (ariaDisabled) {
    button.setAttribute('aria-disabled', 'true');
  }
  button.addEventListener('click', (event) => {
    if (ariaDisabled) {
      event.preventDefault();
    }
    if (typeof onClick === 'function') {
      onClick(event);
    }
  });
  setButtonGlitchText(button, text);
  return button;
}

function renderMainMenu() {
  return createStyledWindow(`${GAME_TITLE} - Main Menu`, { className: 'app-container', onClose: () => {} }, (body) => {
    const heading = document.createElement('h2');
    heading.textContent = 'Main Menu';
    body.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'choices-list';

    const newGameBtn = createListItemButton('New Game', () => {
      playSound('ui_menu_select.sfx');
      handleNavigation('characterSelect');
    });
    const newGameItem = document.createElement('li');
    newGameItem.appendChild(newGameBtn);
    list.appendChild(newGameItem);

    const continueBtn = createListItemButton('Continue (Soon)', () => {
      playSound('ui_button_disabled.sfx');
    }, { ariaDisabled: true });
    const continueItem = document.createElement('li');
    continueItem.appendChild(continueBtn);
    list.appendChild(continueItem);

    const profilesBtn = createListItemButton('Protagonist Profiles', () => {
      playSound('ui_menu_select.sfx');
      handleNavigation('profiles');
    });
    const profilesItem = document.createElement('li');
    profilesItem.appendChild(profilesBtn);
    list.appendChild(profilesItem);

    const settingsBtn = createListItemButton('Settings (Soon)', () => {
      playSound('ui_button_disabled.sfx');
      handleNavigation('settings');
    }, { ariaDisabled: true });
    const settingsItem = document.createElement('li');
    settingsItem.appendChild(settingsBtn);
    list.appendChild(settingsItem);

    body.appendChild(list);
  });
}

function renderCharacterSelect() {
  return createStyledWindow('Select Your Protagonist', { className: 'app-container', onClose: () => handleNavigation('mainMenu') }, (body) => {
    const heading = document.createElement('h2');
    heading.textContent = 'Choose Your Vessel';
    body.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'choices-list';

    Object.values(CHARACTERS).forEach((char) => {
      const item = document.createElement('li');
      const button = createListItemButton(char.name, () => {
        if (char.id === 'rizzlord') {
          playSound('ui_button_disabled.sfx');
          return;
        }
        playSound('ui_char_select_confirm.sfx');
        handleNavigation('inGame', char.id);
      }, {
        ariaDisabled: char.id === 'rizzlord',
      });
      if (char.id === 'rizzlord') {
        button.setAttribute('aria-disabled', 'true');
      }
      item.appendChild(button);
      const description = document.createElement('p');
      Object.assign(description.style, {
        fontSize: '12px',
        margin: '0 0 10px 5px',
        color: '#333333',
      });
      description.textContent = char.description;
      item.appendChild(description);
      list.appendChild(item);
    });

    const backButton = document.createElement('button');
    backButton.addEventListener('click', () => {
      playSound('ui_menu_back.sfx');
      handleNavigation('mainMenu');
    });
    setButtonGlitchText(backButton, 'Back to Main Menu');

    body.appendChild(list);
    body.appendChild(backButton);
  });
}

function renderProfiles() {
  return createStyledWindow('Protagonist Profiles', { className: 'app-container', onClose: () => handleNavigation('mainMenu') }, (body) => {
    const heading = document.createElement('h2');
    heading.textContent = 'Character Profiles';
    body.appendChild(heading);

    const intro = document.createElement('p');
    Object.assign(intro.style, {
      marginBottom: '20px',
      fontSize: '13px',
      color: '#333333',
    });
    intro.textContent = 'Meet the minds shaping Rogers Park.';
    body.appendChild(intro);

    Object.values(CHARACTERS).forEach((char) => {
      const card = document.createElement('div');
      Object.assign(card.style, {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #D4D0C8',
        backgroundColor: '#F9F9F9',
      });
      const name = document.createElement('h3');
      Object.assign(name.style, {
        marginTop: '0',
        marginBottom: '5px',
        fontSize: '16px',
        color: '#1a1a1a',
      });
      name.textContent = char.name;
      card.appendChild(name);
      const desc = document.createElement('p');
      Object.assign(desc.style, {
        fontSize: '14px',
        lineHeight: '1.5',
        margin: '0',
        color: '#1a1a1a',
      });
      desc.textContent = char.description;
      card.appendChild(desc);
      if (char.id === 'rizzlord') {
        const notice = document.createElement('p');
        Object.assign(notice.style, {
          fontSize: '12px',
          color: '#B22222',
          marginTop: '8px',
          fontStyle: 'italic',
        });
        notice.textContent = 'This protagonist is currently locked.';
        card.appendChild(notice);
      }
      body.appendChild(card);
    });

    const backButton = document.createElement('button');
    backButton.addEventListener('click', () => {
      playSound('ui_menu_back.sfx');
      handleNavigation('mainMenu');
    });
    setButtonGlitchText(backButton, 'Back');
    body.appendChild(backButton);
  });
}

function renderSettings() {
  return createStyledWindow('Settings', { className: 'app-container', onClose: () => handleNavigation('mainMenu') }, (body) => {
    const heading = document.createElement('h2');
    heading.textContent = 'Game Settings';
    body.appendChild(heading);

    const content = document.createElement('p');
    content.textContent = 'Settings will appear here.';
    body.appendChild(content);

    const backButton = document.createElement('button');
    backButton.addEventListener('click', () => {
      playSound('ui_menu_back.sfx');
      handleNavigation('mainMenu');
    });
    setButtonGlitchText(backButton, 'Back');
    body.appendChild(backButton);
  });
}
function renderCodex() {
  const selectedEntry = appState.selectedCodexEntryId ? CODEX_ENTRIES[appState.selectedCodexEntryId] : null;
  return createStyledWindow('CoAIexicon - Knowledge Base', {
    className: 'app-container',
    onClose: () => returnToGameFromCodex(),
  }, (body) => {
    const container = document.createElement('div');
    Object.assign(container.style, {
      display: 'flex',
      maxHeight: '500px',
      minHeight: '300px',
      overflow: 'hidden',
    });

    const listPane = document.createElement('div');
    Object.assign(listPane.style, {
      width: '40%',
      borderRight: '1px solid #808080',
      paddingRight: '10px',
      overflowY: 'auto',
    });
    const listHeading = document.createElement('h3');
    Object.assign(listHeading.style, {
      marginTop: '0',
      marginBottom: '10px',
    });
    listHeading.textContent = 'Unlocked Entries';
    listPane.appendChild(listHeading);

    const unlockedEntries = Array.from(appState.storyState.unlockedCodexEntries);
    const availableEntries = unlockedEntries
      .map((id) => CODEX_ENTRIES[id])
      .filter(Boolean)
      .sort((a, b) => a.title.localeCompare(b.title));

    if (availableEntries.length > 0) {
      const list = document.createElement('ul');
      list.className = 'choices-list';
      list.style.margin = '0';
      availableEntries.forEach((entry) => {
        const item = document.createElement('li');
        Object.assign(item.style, { marginBottom: '5px' });
        const button = document.createElement('button');
        button.style.width = '100%';
        button.style.fontSize = '12px';
        button.style.padding = '5px';
        button.style.minWidth = 'auto';
        button.style.margin = '0';
        button.style.textAlign = 'left';
        button.style.whiteSpace = 'normal';
        button.style.lineHeight = '1.3';
        button.textContent = entry.title;
        if (selectedEntry && selectedEntry.id === entry.id) {
          button.classList.add('selected-codex-button');
        }
        button.addEventListener('click', () => {
          playSound('ui_codex_select_entry.sfx');
          selectCodexEntry(entry.id);
        });
        item.appendChild(button);
        list.appendChild(item);
      });
      listPane.appendChild(list);
    } else {
      const empty = document.createElement('p');
      empty.textContent = 'No entries unlocked yet.';
      listPane.appendChild(empty);
    }

    const contentPane = document.createElement('div');
    Object.assign(contentPane.style, {
      width: '60%',
      paddingLeft: '10px',
      overflowY: 'auto',
    });
    if (selectedEntry) {
      const title = document.createElement('h3');
      Object.assign(title.style, { marginTop: '0' });
      title.textContent = selectedEntry.title;
      contentPane.appendChild(title);
      const content = document.createElement('div');
      Object.assign(content.style, {
        fontSize: '14px',
        lineHeight: '1.6',
      });
      const styledContent = selectedEntry.content.replace(/\[(.*?)\]/g, '<strong style="color: #008800; font-style:italic;">[$1]</strong>');
      content.innerHTML = styledContent.replace(/\n/g, '<br />');
      contentPane.appendChild(content);
    } else {
      const placeholder = document.createElement('p');
      placeholder.textContent = 'Select an entry to read.';
      contentPane.appendChild(placeholder);
    }

    container.appendChild(listPane);
    container.appendChild(contentPane);
    body.appendChild(container);

    const backButton = document.createElement('button');
    Object.assign(backButton.style, {
      marginTop: '20px',
      float: 'right',
    });
    backButton.addEventListener('click', () => {
      playSound('ui_button_click_general.sfx');
      returnToGameFromCodex();
    });
    setButtonGlitchText(backButton, 'Back to Game');
    body.appendChild(backButton);
  });
}
function renderDescription(desc) {
  let processedDesc = desc;
  processedDesc = processedDesc.replace(/\*\*\*'(.+?)'\*\*\*/g, '<strong style="font-style: italic; color: #B22222;">$1</strong>');
  processedDesc = processedDesc.replace(/\*\*'(.+?)'\*\*/g, '<strong style="text-transform: uppercase; letter-spacing: 1px; color: #00004d;">$1</strong>');
  return processedDesc.replace(/\n/g, '<br />');
}

function renderInGame() {
  const storyState = appState.storyState;
  if (!storyState.currentNodeId || !storyState.characterId) {
    return createStyledWindow('Error', { className: 'app-container', onClose: () => handleNavigation('mainMenu') }, (body) => {
      const message = document.createElement('p');
      message.textContent = 'Error: No current story node or character.';
      body.appendChild(message);
    });
  }
  const node = NODES[storyState.currentNodeId];
  const character = CHARACTERS[storyState.characterId];
  if (!node || !character) {
    return createStyledWindow('Error', { className: 'app-container', onClose: () => handleNavigation('mainMenu') }, (body) => {
      const message = document.createElement('p');
      message.textContent = 'Error: Could not load node or character data.';
      body.appendChild(message);
    });
  }
  const { playerStats = {}, flags = {} } = storyState;
  const visibleChoices = (node.choices || []).filter((choice) => {
    if (!choice.conditions) return true;
    const { requiredFlags, missingFlags, statCheck } = choice.conditions;
    if (requiredFlags && !requiredFlags.every((flag) => flags[flag])) return false;
    if (missingFlags && missingFlags.some((flag) => flags[flag])) return false;
    if (statCheck && !statCheck(playerStats)) return false;
    if (choice.character_pov && !choice.character_pov.includes(storyState.characterId)) return false;
    return true;
  });

  return createStyledWindow(node.title || `${character.name}'s Journey`, {
    className: 'app-container',
    windowBackgroundColor: node.windowBackgroundColor || '#FFFAF0',
    onClose: () => handleNavigation('mainMenu'),
  }, (body) => {
    const header = document.createElement('div');
    Object.assign(header.style, {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '1px solid #808080',
    });

    const portrait = document.createElement('div');
    Object.assign(portrait.style, {
      width: '25%',
      minWidth: '120px',
      height: '120px',
      backgroundColor: '#EAEAEA',
      color: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px inset #B0B0B0',
      marginRight: '15px',
      fontFamily: "'Press Start 2P', cursive",
      fontSize: '10px',
      textAlign: 'center',
      padding: '5px',
      flexShrink: 0,
      backgroundImage: 'repeating-linear-gradient(0deg, #d4d0c8, #d4d0c8 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #d4d0c8, #d4d0c8 1px, transparent 1px, transparent 4px)',
      boxShadow: 'inset 1px 1px 2px #00000020',
    });
    if (character.detailedPortraitUrl) {
      const img = document.createElement('img');
      Object.assign(img.style, {
        maxWidth: '90%',
        maxHeight: '90%',
        objectFit: 'contain',
        imageRendering: 'pixelated',
      });
      img.src = character.detailedPortraitUrl;
      img.alt = `${character.name} Portrait`;
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
      portrait.appendChild(img);
    } else {
      const label = document.createElement('span');
      label.textContent = 'IMAGE BUFFER';
      Object.assign(label.style, {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: '2px 4px',
        marginBottom: '5px',
      });
      portrait.appendChild(label);
      const prompt = document.createElement('span');
      prompt.textContent = character.portraitPrompt ? `${character.portraitPrompt.substring(0, 60)}...` : `Portrait: ${character.name}`;
      portrait.appendChild(prompt);
    }

    const status = document.createElement('div');
    Object.assign(status.style, {
      flexGrow: 1,
      fontSize: '10px',
      color: '#1a1a1a',
      backgroundColor: '#F5F5F5',
      padding: '8px',
      border: '1px inset #B0B0B0',
      overflowY: 'auto',
      maxHeight: '120px',
      lineHeight: '1.5',
    });
    const statusHeader = document.createElement('strong');
    Object.assign(statusHeader.style, {
      display: 'block',
      borderBottom: '1px solid #808080',
      marginBottom: '4px',
      paddingBottom: '3px',
      fontSize: '11px',
    });
    statusHeader.textContent = 'STATUS UPDATE:';
    status.appendChild(statusHeader);

    const statsLines = [
      `Emp: ${playerStats.empathy ?? 'N/A'} | Skeptic: ${playerStats.skepticism ?? 'N/A'} | Chaos: ${playerStats.chaos_index ?? 'N/A'}`,
      `Coexist: ${playerStats.coexistence_ethos ?? 'N/A'} | Auth: ${playerStats.authenticity_score ?? 'N/A'} | GFW Align: ${playerStats.gfw_alignment ?? 'N/A'}`,
    ];
    const statsInfo = document.createElement('div');
    statsInfo.innerHTML = statsLines.join('<br/>');
    status.appendChild(statsInfo);

    const extras = document.createElement('div');
    extras.innerHTML = [
      playerStats.fabulousness_meter !== undefined ? `Fabulous: ${playerStats.fabulousness_meter}${playerStats.fabulousness_meter >= 15 ? ' ✨' : ''}` : '',
      playerStats.ethical_clarity !== undefined ? `Clarity: ${playerStats.ethical_clarity}` : '',
      playerStats.rizzlord_ego !== undefined && character.id === 'rizzlord' ? `Ego: ${playerStats.rizzlord_ego}` : '',
    ].filter(Boolean).join(' ');
    status.appendChild(extras);

    const flagsHeader = document.createElement('strong');
    Object.assign(flagsHeader.style, {
      display: 'block',
      borderTop: '1px solid #808080',
      marginTop: '4px',
      paddingTop: '3px',
      fontSize: '11px',
    });
    flagsHeader.textContent = 'Active Flags:';
    status.appendChild(flagsHeader);

    const activeFlags = Object.entries(flags)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(', ') || 'None';
    const flagsText = document.createElement('span');
    flagsText.textContent = activeFlags;
    status.appendChild(flagsText);

    header.appendChild(portrait);
    header.appendChild(status);
    body.appendChild(header);

    const description = document.createElement('div');
    description.innerHTML = renderDescription(node.description);
    body.appendChild(description);

    if (node.isEnding) {
      const endingContainer = document.createElement('div');
      Object.assign(endingContainer.style, {
        marginTop: '20px',
      });
      const endingHeading = document.createElement('h3');
      endingHeading.textContent = 'The Story Concludes... For Now.';
      endingContainer.appendChild(endingHeading);
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        playSound('ui_return_to_menu.sfx');
        handleChoice('__MAIN_MENU__');
      });
      setButtonGlitchText(button, 'Reflect and Return to Main Menu');
      endingContainer.appendChild(button);
      body.appendChild(endingContainer);
    } else {
      if (visibleChoices.length > 0) {
        const choicesContainer = document.createElement('div');
        Object.assign(choicesContainer.style, { marginTop: '20px' });
        const heading = document.createElement('h3');
        heading.textContent = 'Choose your fate:';
        choicesContainer.appendChild(heading);
        const list = document.createElement('ul');
        list.className = 'choices-list';
        visibleChoices.forEach((choice) => {
          const item = document.createElement('li');
          const button = document.createElement('button');
          button.addEventListener('click', () => {
            playSound(choice.soundEffectOnChoice || 'ui_button_click_general.sfx');
            handleChoice(choice.nextNodeId, choice);
          });
          setButtonGlitchText(button, choice.text);
          item.appendChild(button);
          list.appendChild(item);
        });
        choicesContainer.appendChild(list);
        body.appendChild(choicesContainer);
      }

      if ((!visibleChoices || visibleChoices.length === 0) && !node.autoTransitionTo && !node.isEnding) {
        const button = document.createElement('button');
        Object.assign(button.style, { marginTop: '20px' });
        button.addEventListener('click', () => {
          playSound('ui_return_to_menu.sfx');
          handleChoice('__MAIN_MENU__');
        });
        setButtonGlitchText(button, 'End Chapter (Return to Menu)');
        body.appendChild(button);
      }

      const codexButton = document.createElement('button');
      Object.assign(codexButton.style, {
        marginTop: '15px',
        fontSize: '12px',
        minWidth: 'auto',
        padding: '6px 12px',
        float: 'right',
      });
      codexButton.addEventListener('click', () => {
        playSound('ui_codex_open.sfx');
        handleNavigation('codex');
      });
      const icon = document.createElement('img');
      icon.src = 'assets/images/ui/berries_icon.png';
      icon.alt = '';
      Object.assign(icon.style, {
        width: '16px',
        height: '16px',
        marginRight: '8px',
        verticalAlign: 'middle',
        imageRendering: 'pixelated',
      });
      codexButton.appendChild(icon);
      codexButton.appendChild(createGlitchyTextElement('Open CoAIexicon'));
      body.appendChild(codexButton);
    }
  });
}

function renderScreen() {
  switch (appState.currentScreen) {
    case 'mainMenu':
      return renderMainMenu();
    case 'characterSelect':
      return renderCharacterSelect();
    case 'inGame':
      return renderInGame();
    case 'settings':
      return renderSettings();
    case 'profiles':
      return renderProfiles();
    case 'codex':
      return renderCodex();
    default:
      return renderMainMenu();
  }
}
function renderTaskbar() {
  const taskbar = document.createElement('div');
  taskbar.id = 'taskbar';

  const startButton = document.createElement('button');
  startButton.id = 'start-button';
  startButton.addEventListener('click', () => {
    playSound('ui_start_button_click.sfx');
    toggleStartMenu();
  });
  const startIcon = document.createElement('img');
  startIcon.src = 'assets/images/ui/star_icon.png';
  startIcon.alt = 'Start';
  Object.assign(startIcon.style, {
    width: '16px',
    height: '16px',
    imageRendering: 'pixelated',
  });
  startButton.appendChild(startIcon);
  taskbar.appendChild(startButton);
  domRefs.startButton = startButton;

  const title = document.createElement('div');
  title.id = 'taskbar-app-title';
  title.textContent = appState.currentTaskbarTitle;
  title.title = appState.currentTaskbarTitle;
  taskbar.appendChild(title);

  const controls = document.createElement('div');
  Object.assign(controls.style, {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  });

  const musicToggle = document.createElement('button');
  musicToggle.id = 'music-toggle';
  Object.assign(musicToggle.style, {
    padding: '3px 8px',
    marginRight: '5px',
    minWidth: 'auto',
  });
  musicToggle.textContent = appState.isMusicOn ? '🔊' : '🔇';
  musicToggle.addEventListener('click', () => {
    playSound('ui_button_click_minor.sfx');
    toggleMusic();
  });
  controls.appendChild(musicToggle);

  const clock = document.createElement('div');
  clock.id = 'taskbar-clock';
  clock.style.marginLeft = '0';
  domRefs.clock = clock;
  updateClock();
  controls.appendChild(clock);

  taskbar.appendChild(controls);
  return taskbar;
}

function renderStartMenu() {
  if (domRefs.startMenu) {
    domRefs.startMenu.remove();
    domRefs.startMenu = null;
  }
  if (!appState.isStartMenuOpen) {
    return;
  }
  const menu = document.createElement('div');
  menu.id = 'start-menu';
  const list = document.createElement('ul');
  list.className = 'choices-list';
  list.style.margin = '0';

  const newGameItem = document.createElement('li');
  const newGameButton = document.createElement('button');
  const newGameIcon = document.createElement('img');
  newGameIcon.src = 'assets/images/ui/archway_icon.png';
  newGameIcon.alt = '';
  Object.assign(newGameIcon.style, {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    verticalAlign: 'middle',
    imageRendering: 'pixelated',
  });
  newGameButton.appendChild(newGameIcon);
  newGameButton.appendChild(createGlitchyTextElement('New Game'));
  newGameButton.addEventListener('click', () => {
    playSound('ui_start_menu_item_click.sfx');
    handleNavigation('characterSelect');
  });
  newGameItem.appendChild(newGameButton);
  list.appendChild(newGameItem);

  const profilesItem = document.createElement('li');
  const profilesButton = document.createElement('button');
  const profilesIcon = document.createElement('img');
  profilesIcon.src = 'assets/images/ui/bird_icon.png';
  profilesIcon.alt = '';
  Object.assign(profilesIcon.style, {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    verticalAlign: 'middle',
    imageRendering: 'pixelated',
  });
  profilesButton.appendChild(profilesIcon);
  profilesButton.appendChild(createGlitchyTextElement('Protagonist Profiles'));
  profilesButton.addEventListener('click', () => {
    playSound('ui_start_menu_item_click.sfx');
    handleNavigation('profiles');
  });
  profilesItem.appendChild(profilesButton);
  list.appendChild(profilesItem);

  menu.appendChild(list);
  document.body.appendChild(menu);
  domRefs.startMenu = menu;
}

function updateTaskbarTitle() {
  let title = `${GAME_TITLE} - Main Menu`;
  if (appState.currentScreen === 'inGame' && appState.storyState.currentNodeId && appState.storyState.characterId) {
    const node = NODES[appState.storyState.currentNodeId];
    const character = CHARACTERS[appState.storyState.characterId];
    if (node && character) {
      title = node.title || `${character.name}'s Journey`;
    }
  } else if (appState.currentScreen === 'codex') {
    title = 'CoAIexicon - Knowledge Base';
  } else if (appState.currentScreen === 'characterSelect') {
    title = 'Select Your Protagonist';
  } else if (appState.currentScreen === 'profiles') {
    title = 'Protagonist Profiles';
  } else if (appState.currentScreen === 'settings') {
    title = 'Settings';
  }
  appState.currentTaskbarTitle = title;
}

function renderApp() {
  runCleanup();
  updateTaskbarTitle();
  const root = document.getElementById('root');
  if (!root) return;
  root.innerHTML = '';

  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  });

  const mainContent = document.createElement('div');
  mainContent.id = 'main-content-area';
  Object.assign(mainContent.style, {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  const screen = renderScreen();
  if (screen) {
    mainContent.appendChild(screen);
  }

  const taskbar = renderTaskbar();

  wrapper.appendChild(mainContent);
  wrapper.appendChild(taskbar);
  root.appendChild(wrapper);

  renderStartMenu();

  if (root.scrollTo) {
    root.scrollTo(0, 0);
  } else {
    root.scrollTop = 0;
  }

  scheduleAutoTransition();
}

function scheduleAutoTransition() {
  if (autoTransitionTimeout) {
    clearTimeout(autoTransitionTimeout);
    autoTransitionTimeout = null;
  }
  if (appState.currentScreen === 'inGame' && appState.storyState.currentNodeId) {
    const node = NODES[appState.storyState.currentNodeId];
    if (node && node.autoTransitionTo) {
      autoTransitionTimeout = setTimeout(() => {
        handleChoice(node.autoTransitionTo);
      }, 1500);
    }
  }
}
function handleNavigation(screen, characterId) {
  appState.isStartMenuOpen = false;
  if (screen === 'inGame' && characterId) {
    const selectedChar = CHARACTERS[characterId];
    if (selectedChar) {
      appState.storyState = {
        characterId,
        currentNodeId: selectedChar.startNodeId,
        playerStats: selectedChar.initialStats ? { ...selectedChar.initialStats } : { ...DEFAULT_EMPTY_STATS },
        flags: {},
        unlockedCodexEntries: initializeUnlockedCodex(),
      };
      appState.currentScreen = 'inGame';
      if (selectedChar.backgroundMusic) {
        playMusic(selectedChar.backgroundMusic);
      } else {
        playMusic('default_ingame_theme.mid');
      }
    } else {
      appState.currentScreen = 'mainMenu';
      appState.storyState = {
        characterId: null,
        currentNodeId: null,
        playerStats: null,
        flags: {},
        unlockedCodexEntries: initializeUnlockedCodex(),
      };
      playMusic('main_menu_theme.mid');
    }
  } else if (screen === 'characterSelect') {
    const unlocked = appState.storyState.unlockedCodexEntries && appState.storyState.unlockedCodexEntries.size > 0
      ? new Set(appState.storyState.unlockedCodexEntries)
      : initializeUnlockedCodex();
    appState.storyState = {
      characterId: null,
      currentNodeId: null,
      playerStats: null,
      flags: {},
      unlockedCodexEntries: unlocked,
    };
    appState.currentScreen = 'characterSelect';
    playMusic('character_select_theme.mid');
  } else if (screen === 'codex') {
    appState.currentScreen = 'codex';
    playMusic('codex_theme_ambient.mid');
  } else {
    if (screen === 'mainMenu') {
      const unlocked = appState.storyState.unlockedCodexEntries && appState.storyState.unlockedCodexEntries.size > 0
        ? new Set(appState.storyState.unlockedCodexEntries)
        : initializeUnlockedCodex();
      appState.storyState = {
        characterId: null,
        currentNodeId: null,
        playerStats: null,
        flags: {},
        unlockedCodexEntries: unlocked,
      };
      playMusic('main_menu_theme.mid');
    }
    appState.currentScreen = screen;
  }
  if (screen !== 'codex') {
    appState.selectedCodexEntryId = null;
  }
  renderApp();
}

function returnToGameFromCodex() {
  appState.currentScreen = 'inGame';
  if (appState.storyState.characterId) {
    const character = CHARACTERS[appState.storyState.characterId];
    const node = appState.storyState.currentNodeId ? NODES[appState.storyState.currentNodeId] : null;
    if (node && node.backgroundMusic) {
      playMusic(node.backgroundMusic);
    } else if (character && character.backgroundMusic) {
      playMusic(character.backgroundMusic);
    }
  }
  renderApp();
}

function selectCodexEntry(entryId) {
  appState.selectedCodexEntryId = entryId;
  renderApp();
}

function handleChoice(nextNodeId, choice) {
  if (nextNodeId === '__MAIN_MENU__') {
    handleNavigation('mainMenu');
    return;
  }
  if (nextNodeId === '__CHAR_SELECT__') {
    handleNavigation('characterSelect');
    return;
  }
  const targetNode = NODES[nextNodeId];
  if (!targetNode) {
    console.error('Error: nextNodeId not found:', nextNodeId);
    handleNavigation('mainMenu');
    return;
  }
  const prevState = appState.storyState;
  if (!prevState.playerStats) {
    return;
  }
  let newStats = { ...prevState.playerStats };
  const newFlags = { ...prevState.flags };
  const newUnlockedCodex = new Set(prevState.unlockedCodexEntries);

  if (choice) {
    if (choice.statEffects) {
      const updates = choice.statEffects({ ...newStats });
      newStats = { ...newStats, ...updates };
    }
    if (choice.flagsToSet) {
      choice.flagsToSet.forEach((flag) => {
        newFlags[flag] = true;
      });
    }
    if (choice.flagsToClear) {
      choice.flagsToClear.forEach((flag) => {
        newFlags[flag] = false;
      });
    }
    if (choice.unlocksCodexEntry && CODEX_ENTRIES[choice.unlocksCodexEntry]) {
      newUnlockedCodex.add(choice.unlocksCodexEntry);
    }
    if (choice.soundEffectOnChoice) {
      playSound(choice.soundEffectOnChoice);
    }
  }

  if (targetNode.flagsToSetOnEnter) {
    targetNode.flagsToSetOnEnter.forEach((flag) => {
      newFlags[flag] = true;
    });
  }
  if (targetNode.unlocksCodexEntryOnEnter && CODEX_ENTRIES[targetNode.unlocksCodexEntryOnEnter]) {
    newUnlockedCodex.add(targetNode.unlocksCodexEntryOnEnter);
  }
  if (targetNode.statEffectsOnEnter) {
    const updates = targetNode.statEffectsOnEnter({ ...newStats });
    newStats = { ...newStats, ...updates };
  }
  if (targetNode.soundEffectOnEnter) {
    playSound(targetNode.soundEffectOnEnter);
  }

  if (appState.storyState.characterId) {
    const character = CHARACTERS[appState.storyState.characterId];
    if (targetNode.backgroundMusic) {
      if (!character || character.backgroundMusic !== targetNode.backgroundMusic) {
        playMusic(targetNode.backgroundMusic);
      }
    } else if (character && character.backgroundMusic) {
      playMusic(character.backgroundMusic);
    }
  }

  appState.storyState = {
    ...prevState,
    currentNodeId: nextNodeId,
    playerStats: newStats,
    flags: newFlags,
    unlockedCodexEntries: newUnlockedCodex,
  };
  appState.currentScreen = 'inGame';
  renderApp();
}

function toggleStartMenu() {
  appState.isStartMenuOpen = !appState.isStartMenuOpen;
  renderApp();
}

function toggleMusic() {
  appState.isMusicOn = !appState.isMusicOn;
  musicEnabled = appState.isMusicOn;
  if (!musicEnabled) {
    stopCurrentMusic();
  } else if (currentMusicId) {
    playMusic(currentMusicId);
  }
  renderApp();
}
function updateClock() {
  if (!domRefs.clock) return;
  const now = new Date();
  domRefs.clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function ensureClockInterval() {
  if (!clockInterval) {
    clockInterval = setInterval(updateClock, 1000);
  }
}

function createDesktopStars(container) {
  const existingStars = container.querySelectorAll('.desktop-star');
  if (existingStars.length > 0) {
    return;
  }
  for (let i = 0; i < NUM_DESKTOP_STARS; i += 1) {
    const star = document.createElement('div');
    star.className = 'desktop-star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.backgroundColor = DESKTOP_STAR_COLORS[Math.floor(Math.random() * DESKTOP_STAR_COLORS.length)];
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 3}s`;
    container.appendChild(star);
  }
}

function ensureParallaxBackground() {
  const container = document.getElementById('desktop-bg-container');
  if (!container) return;
  createDesktopStars(container);
  if (parallaxState.layers.length === 0) {
    container.innerHTML = '';
    PARALLAX_SETS[parallaxState.currentSetIndex].forEach((src, index) => {
      const layer = document.createElement('div');
      Object.assign(layer.style, {
        position: 'absolute',
        inset: '0',
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'cover',
        willChange: 'background-position',
        pointerEvents: 'none',
        zIndex: index,
      });
      container.appendChild(layer);
      parallaxState.layers.push(layer);
    });
    const animate = () => {
      parallaxState.frame += 0.5;
      parallaxState.layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        layer.style.backgroundPosition = `${-parallaxState.frame * speed}px 0`;
      });
      parallaxState.animFrame = requestAnimationFrame(animate);
    };
    animate();
    parallaxState.intervalId = setInterval(() => {
      parallaxState.currentSetIndex = (parallaxState.currentSetIndex + 1) % PARALLAX_SETS.length;
      PARALLAX_SETS[parallaxState.currentSetIndex].forEach((src, index) => {
        if (parallaxState.layers[index]) {
          parallaxState.layers[index].style.backgroundImage = `url(${src})`;
        }
      });
    }, 15000);
  }
}

function setupPointerTrail() {
  let lastTrailTime = 0;
  const trailCooldown = 60;
  document.addEventListener('mousemove', (event) => {
    const currentTime = Date.now();
    if (currentTime - lastTrailTime < trailCooldown) return;
    lastTrailTime = currentTime;
    if (Math.random() < 0.3) {
      const particle = document.createElement('div');
      particle.className = 'mouse-trail-particle';
      particle.style.left = `${event.clientX - 2}px`;
      particle.style.top = `${event.clientY - 2}px`;
      particle.style.backgroundColor = CURSED_POINTER_TRAIL_COLORS[Math.floor(Math.random() * CURSED_POINTER_TRAIL_COLORS.length)];
      document.body.appendChild(particle);
      requestAnimationFrame(() => particle.classList.add('fade-out'));
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 700);
    }
  });
}

function handleDocumentMouseDown(event) {
  if (!appState.isStartMenuOpen) return;
  const target = event.target;
  if (domRefs.startMenu && !domRefs.startMenu.contains(target) && (!domRefs.startButton || !domRefs.startButton.contains(target))) {
    appState.isStartMenuOpen = false;
    renderApp();
  }
}

function initializeGlobalListeners() {
  if (globalListenersInitialized) return;
  document.addEventListener('mousedown', handleDocumentMouseDown);
  setupPointerTrail();
  ensureClockInterval();
  globalListenersInitialized = true;
}

function initializeApp() {
  appState.storyState.unlockedCodexEntries = initializeUnlockedCodex();
  ensureParallaxBackground();
  initializeGlobalListeners();
  playMusic('main_menu_theme.mid');
  renderApp();
}
window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});
