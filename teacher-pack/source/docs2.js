const { H1pb, make, P, B, bl, nl, H1, H2, H3, bold, run, brk, table, gap, lines, arabic, GAME } = require('./tp.js');
const out = '/home/user/ardcraft/teacher-pack/';
const plan = (o) => [
  table([2200, 6826], [
    ['Age', '8 to 12'], ['Time', o.time], ['Game setup', o.setup], ['Materials', o.mat]
  ], false),
  H2('Learning goals'), ...bl(o.goals),
  H2('Lesson outline'),
  table([1300, 7726], [['Minutes', 'What happens'], ...o.steps]),
  H2('Questions to discuss'), ...nl(o.q),
  H2('How to check understanding'), ...bl(o.check),
  H2('Extension and differentiation'), ...bl(o.ext)
];
(async () => {
const L = [];
// ---------- Lesson 1
L.push(H1('Lesson 1: Salah and wudu'), ...plan({
  time: '40 minutes',
  setup: 'Classroom World, Explore mode, chat OFF. A game day lasts about 40 minutes, so a prayer time will come during or near the lesson. Watch the prayer clock at the top right.',
  mat: 'Devices, Worksheet 1, a board for the five prayers.',
  goals: ['Name the five daily prayers and say roughly when each is prayed.', 'Put the steps of wudu in the right order.', 'Explain why Muslims pray at set times, in congregation when they can.'],
  steps: [
    ['0 to 5', 'Gather without devices. Ask: "What do we do before we pray?" and "How many prayers are there in a day?" List the five prayers on the board: Fajr, Dhuhr, Asr, Maghrib, Isha.'],
    ['5 to 10', 'Students join the class world with the room code. Use Freeze and show on the projector: the prayer clock at the top right, the adhan, and the fountain.'],
    ['10 to 25', 'Explore in pairs. Task: walk to the village masjid, find the fountain, make wudu, and press P (Pray) when you are ready. Watch the villagers gather. Join the congregation if a prayer time comes. Use Message to everyone to guide them ("Look for the minaret").'],
    ['25 to 35', 'Freeze the class. Students complete Worksheet 1: order the wudu steps and fill in the prayer table. Compare answers.'],
    ['35 to 40', 'Close with the questions below. Remind students that the game is a way to practise, and that real prayer is with their family and in the masjid.']
  ],
  q: ['Why do you think the whole village stops what it is doing for prayer?', 'What does it feel like to pray together instead of alone?', 'Why do we make wudu before prayer? What does it teach us about cleanliness and readiness?', 'What helps you remember your prayers at home?'],
  check: ['Worksheet 1 is correct, or corrected in pairs.', 'Each student can say the five prayers in order.', 'Ask three students to explain one wudu step in their own words.'],
  ext: ['Support: give the wudu steps as pictures or cut-out cards to put in order.', 'Challenge: students write the number of rakʿahs in each prayer and explain which are fard.', 'Link to home: students teach a family member the order of wudu.']
}));
// ---------- Lesson 2
L.push(H1pb('Lesson 2: Arabic word hunt'), ...plan({
  time: '35 minutes',
  setup: 'Classroom World, Explore mode, chat OFF. In Options make sure Arabic Words is ON (it is by default).',
  mat: 'Devices, Worksheet 2.',
  goals: ['Read and say at least ten Arabic words from the game.', 'Match Arabic words with their meaning.', 'Use two everyday phrases correctly: as-salaamu ʿalaykum and jazakallahu khayran.'],
  steps: [
    ['0 to 5', 'Introduce the game of collecting words. Say a word together: "maa\'" (water). Show that holding an item in the game shows its Arabic name, for example bread: khubz.'],
    ['5 to 20', 'Students explore in pairs and try to find 15 words. They find a word by holding an item, looking at a block, or going near an animal. A small message pops up for each new word. Open Game Menu then Arabic Words to see the collection.'],
    ['20 to 30', 'Freeze the class. Worksheet 2: match words, then write the meaning of each word you found. Practise the phrases from the Phrases tab in pairs.'],
    ['30 to 35', 'Word race: call a meaning in English; students call out the Arabic. Finish with as-salaamu ʿalaykum around the room.']
  ],
  q: ['Which word was the easiest to remember? Why?', 'Which Arabic letters do you recognise in the words?', 'When do we say jazakallahu khayran, and what does it mean?', 'Do any of the words remind you of words you already know?'],
  check: ['Students show their Arabic Words screen: 15 or more words earns the "Student of Arabic" goal in the Progress Book.', 'Worksheet 2 matching section correct.', 'Pairs can say two phrases out loud and use them in a short role-play.'],
  ext: ['Support: use only the six words on Worksheet 2 and say them together.', 'Challenge: students invent a short sentence using two words and a phrase.', 'Note: the game shows the Arabic and its transliteration but does not speak the words. Model the pronunciation yourself, or ask a fluent speaker to read the words aloud for the class.']
}));
// ---------- Lesson 3
L.push(H1pb('Lesson 3: The journey of Umrah'), ...plan({
  time: '40 minutes',
  setup: 'Teacher demonstration on the projector. Create a separate world with Allow Cheats ON (Classroom World ON, Explore mode). Do not open it to students: Allow Cheats gives the Testing Tools menu, including teleport, to everyone who joins. Use Game Menu, Testing Tools, then pick a destination from the list and press Teleport.',
  mat: 'A device connected to a projector, Worksheet 3, a map of Makkah if you have one.',
  goals: ['Retell the order of the main steps of Umrah.', 'Name the key places: the miqat, the Kaʿbah, the Black Stone, Maqam Ibrahim, Zamzam, Safa and Marwa.', 'Describe how a pilgrim feels and behaves during Umrah.'],
  steps: [
    ['0 to 5', 'Ask: "Has anyone been to Makkah, or heard about it from family?" Explain that today we follow a pilgrim\'s steps, and that the game shows a simple picture of them.'],
    ['5 to 12', 'On the projector, teleport to the miqat. Explain ihram and the intention. Say the talbiyah slowly and have students repeat the first line. Keep this part respectful and unhurried.'],
    ['12 to 28', 'Teleport to the Haram and walk through the steps one by one: tawaf (seven rounds around the Kaʿbah, starting at the Black Stone), two rakʿahs behind Maqam Ibrahim, a drink of Zamzam, saʿi (seven trips between Safa and Marwa), and halq or taqsir (shaving or trimming the hair). After each step, pause and ask a student to retell it.'],
    ['28 to 38', 'Students complete Worksheet 3: put the steps in order and draw or label the Kaʿbah.'],
    ['38 to 40', 'Close with a du\'a, and remind students that Umrah is a real journey done with a guide and with knowledge, and that the game is only a picture to help us remember.']
  ],
  q: ['Why do pilgrims all wear simple white clothing (ihram)?', 'Why do you think there are seven rounds in tawaf and seven trips in saʿi?', 'What story does saʿi remind us of? (Hajar and Ismaʿil, peace be upon them.)', 'How should we behave on a journey like this?'],
  check: ['Worksheet 3 steps in the right order.', 'Students can name three of the places.', 'A student retells the journey in four sentences.'],
  ext: ['Support: use picture cards for each step.', 'Challenge: add the story of Zamzam and Hajar; write two sentences on why it matters.', 'Teacher note: please adapt this lesson to your own school\'s teaching on Umrah, since details of the rites are taught differently in different schools.']
}));
// ---------- Lesson 4
L.push(H1pb('Lesson 4: Build a masjid together'), ...plan({
  time: '45 minutes',
  setup: 'Classroom World, Creative mode, chat OFF (turn on briefly for planning). In Creative mode every block is available from the All Blocks button in the inventory, and blocks break instantly. Groups of three to four.',
  mat: 'Devices, Worksheet 4 (plan and checklist), the rubric below.',
  goals: ['Plan and build a masjid with the main parts and explain what each part is for.', 'Work as a team, share tasks and be kind about each other\'s work.', 'Use decoration inspired by Islamic art (arabesque, geometric tiles, calligraphy-style panels).'],
  steps: [
    ['0 to 8', 'Gather without devices. Ask groups to name the parts of a masjid: prayer hall, mihrab, minbar, minaret, dome, wudu area, courtyard. Explain that the prayer hall faces the qibla (towards Makkah). Hand out Worksheet 4.'],
    ['8 to 15', 'Groups sketch a plan on Worksheet 4 and give each member a job: foundation and walls, dome and minaret, wudu area and courtyard, decoration.'],
    ['15 to 40', 'Students join the class world. Give each group an area to build in, for example by reading out map coordinates (the X and Z numbers at the top left of the screen) with Message to everyone. Build. Use Freeze if you need to give a new instruction. Walk around and praise good teamwork.'],
    ['40 to 45', 'Gallery walk: each group shows their build and explains one part. Others give one kind compliment and one question. Use the rubric.']
  ],
  q: ['Why does the prayer hall face the qibla?', 'Why does a masjid have a place to make wudu near the entrance?', 'What decorations did you choose, and what do they mean to you?', 'How did your group make decisions? What would you do differently next time?'],
  check: ['Use the rubric below. Four levels: Not yet, Getting there, Good, Excellent.', 'Each student tells you which part they built.'],
  ext: ['Support: give a ready-made list of blocks (stone, sandstone, marble, glass, arabesque panels).', 'Challenge: add a courtyard garden, a fountain, a library, or lighting using lanterns.', 'Cross-curricular: link to maths (counting blocks, symmetry) and art (patterns).']
}));
L.push(H2('Rubric for Lesson 4'),
  table([2000, 1700, 1800, 1800, 1726], [
    ['Criterion', 'Not yet', 'Getting there', 'Good', 'Excellent'],
    ['Main parts of a masjid', 'One or two parts', 'Three or four parts', 'Five or six parts', 'All parts, clearly placed'],
    ['Prayer hall and qibla', 'Not shown', 'Prayer hall only', 'Prayer hall facing a chosen qibla', 'Qibla and mihrab clearly explained'],
    ['Decoration', 'None', 'A little', 'Patterns used on purpose', 'Patterns explained'],
    ['Teamwork', 'Worked alone', 'Some sharing', 'Shared jobs fairly', 'Supported others and solved problems'],
    ['Explaining', 'Could not explain', 'Explained with help', 'Explained one part well', 'Explained many parts with reasons']
  ]));
await make('Lesson Plans', `Four lessons for ages 8 to 12 · ${GAME}`, [
  P('Each lesson has a goal, an outline with timings, discussion questions, ways to check understanding and ideas for support and challenge. The game runs in a Classroom World; see the Teacher Guide for setup and the Class Controls (chat, freeze, message, remove).'),
  ...L], out + 'Lesson-Plans.docx');
console.log('plans done');
})();
