const { make, P, B, bl, nl, H1, H2, H3, bold, run, brk, table, gap, lines, arabic, GAME, W } = require('./tp.js');
const out = '/home/user/ardcraft/teacher-pack/';
(async () => {
// ================= TEACHER GUIDE =================
const guide = [
  P(`${GAME} is a free browser game in which students explore a world of villages, masjids and deserts, learn Arabic words, keep the five daily prayers, and travel in the story to Makkah. This guide shows how to run it with a class aged 8 to 12.`),
  H1('1. What students will learn'),
  table([2300, 6726], [
    ['Topic', 'How the game teaches it'],
    ['Salah and wudu', 'Villagers call the adhan at the five prayer times. Students find the masjid, make wudu at the fountain and pray in congregation. A prayer clock shows the times.'],
    ['Arabic words', 'Every block, item and animal has an Arabic name with transliteration. Students collect words as they play and learn everyday phrases such as as-salaamu ʿalaykum and jazakallahu khayran.'],
    ['The journey of Umrah', 'In the story, the player travels to Madinah and then Makkah and performs the steps of Umrah: ihram, tawaf, the two rakʿahs, Zamzam, saʿi and halq.'],
    ['Community and character', 'Helping villagers, sharing, honesty and patience are part of how the story moves forward.'],
    ['Creativity and teamwork', 'In Creative mode, groups design and build together, for example a masjid.']
  ]),
  gap(),
  H1('2. Before your first lesson'),
  H3('What you need'),
  ...bl([
    'One device for you (a laptop or tablet) and one device per student or pair. Any modern browser works: Chrome, Edge, Safari or Firefox.',
    'A working internet connection on every device. The game connects devices through an online matchmaking service, so school Wi-Fi must allow it. Please test this before the lesson.',
    'Headphones are helpful. The game has sounds and the adhan, and a class can get noisy.',
    'No accounts, no logins and no downloads. Everything runs in the browser.'
  ]),
  H3('Set up a classroom world (about 5 minutes)'),
  ...nl([
    `Open the game and choose Singleplayer, then Create New World.`,
    'Give the world a name such as "Year 5 Class".',
    'Turn Classroom World ON. This picks Explore mode (no quest, no damage, no raiders) and starts student chat OFF. Use Creative mode instead if the lesson is about building.',
    'Leave Allow Cheats OFF, unless the lesson plan says otherwise (see Lesson 3).',
    'Create the world and let it load.'
  ]),
  H3('Open the world to the class'),
  ...nl([
    'Open the Game Menu (Esc, or the II button on a tablet) and choose Open to Friends (Host).',
    'A six-character room code appears at the top of the screen. Write it on the board.',
    'Students open the game on their own devices, choose Multiplayer, type their first name or a nickname, enter the code and press Join Game.',
    'Watch the player count at the top of the screen until everyone has joined.'
  ]),
  P([bold('Class size. '), run('A classroom world holds you plus up to 11 students. We have tested joining and the teacher controls with two devices, so please try a short trial with your real devices first. For a larger class, run two worlds on two teacher devices (for example two groups of 10), or split the class into groups for each lesson.')]),
  H1('3. Teacher controls'),
  P('When you are hosting, the Game Menu shows a Class Controls button. It has four tools:'),
  table([2400, 6626], [
    ['Tool', 'What it does'],
    ['Student Chat ON/OFF', 'Chat is OFF by default in a Classroom World. Students see "Chat is turned off by your teacher" if they try to type. Turn it on when you want students to talk, and off again afterwards. Your own messages always work.'],
    ['Freeze Students ON/OFF', 'Students cannot move, break or place anything, and see a banner asking them to look at you. Use it when you give instructions. The game keeps running for you.'],
    ['Message to everyone', 'Type a short message and press Send. It appears on every student screen for a few seconds, for example "Gather at the masjid".'],
    ['Remove', 'Removes a student from the game straight away. If they rejoin with the code, remove them again, or stop hosting and host again to get a new code. The button asks "Really remove?" so you do not press it by accident.']
  ]),
  gap(),
  P('Tip: use Freeze whenever you need to step away or talk to the class.'),
  H1('4. Keeping the class safe and calm'),
  ...bl([
    'Ask students to use first names or nicknames only. Never a full name, school name or address.',
    'Chat stays off unless you switch it on. There are no private messages: chat is visible to the whole class.',
    'In Explore and Creative worlds nobody can be hurt and there are no monsters or raiders.',
    'There are no adverts, no purchases and no student accounts. Each student\'s device keeps its own settings and words found in the browser.',
    'Chat is text only: there are no voice chats, no links and no private messages. Players see one another, build and walk around together.',
    'Set simple class rules before you begin, for example: "Build kindly. Do not break other people\'s builds. When I freeze the class, look at me."'
  ]),
  H1('5. Saving your work'),
  ...bl([
    'The world is saved in the host\'s browser (your device). Use the same device and browser next time and choose Continue.',
    'Press Save Game in the Game Menu before you close the page. Autosave also runs every minute.',
    'Use Export Backup (File) in the Game Menu to keep a copy of the world as a file.',
    'Students joining your world keep their own inventory and words found on their device. The build itself belongs to the world and is saved on yours.'
  ]),
  H1('6. Troubleshooting'),
  table([3000, 6026], [
    ['Problem', 'What to try'],
    ['A student cannot join', 'Check the code (letters and numbers, no spaces). Make sure you are still hosting. Reload the student page and try again. If the whole class fails, the school network may be blocking the connection: try a phone hotspot to test.'],
    ['A student keeps getting disconnected', 'Weak Wi-Fi. Move closer to the router, close other tabs, or have the student join again. They keep their own inventory.'],
    ['The game is slow on a tablet', 'Open Options and set Sharpness to Medium or Low, and Render Distance to Short. The game also lowers its own sharpness automatically when it slows down.'],
    ['No sound', 'Check the device volume and that the browser tab is not muted. The game shows Arabic words in writing with transliteration but does not speak them, so please model the pronunciation yourself.'],
    ['A student built something by mistake', 'Ask them to break it with the pickaxe, or use Freeze while you fix it. Creative mode lets everyone break blocks instantly.'],
    ['I closed the page by accident', 'Reopen the game in the same browser and choose Continue. Then host again: you will get a new room code.']
  ]),
  gap(),
  H1('7. Lesson overview'),
  table([800, 3400, 1500, 3326], [
    ['No.', 'Lesson', 'Time', 'Mode'],
    ['1', 'Salah and wudu', '40 minutes', 'Classroom World, Explore'],
    ['2', 'Arabic word hunt', '35 minutes', 'Classroom World, Explore'],
    ['3', 'The journey of Umrah', '40 minutes', 'Teacher demo (see lesson)'],
    ['4', 'Build a masjid', '45 minutes', 'Classroom World, Creative']
  ]),
  P('The lesson plans, worksheets with answer key and a letter for parents are in separate files in this pack.'),
  H1('8. Please review before use'),
  P('The religious content in these materials was drafted to be simple and accurate for ages 8 to 12, but it has not yet been reviewed by a scholar or a qualified teacher. Please read the lessons and the game\'s content with your own school\'s practice in mind, and adapt wording to your madhhab and local custom. If you notice anything that should be corrected, please tell us.'),
];
await make('Teacher Guide', `Running ${GAME} in a class or masjid school · ages 8 to 12`, guide, out + 'Teacher-Guide.docx');

// ================= PARENT LETTER =================
const letter = [
  P('Date: ____________        Dear parent or carer,'),
  P(`This term our class will use a free educational game called ${GAME} as part of our lessons. This letter explains what it is and how we keep it safe.`),
  H2('What is it?'),
  P(`${GAME} is a building and exploring game, in the style of well-known block games, set in a world of villages and masjids. Through it, children practise the five daily prayers and wudu, learn everyday Arabic words and phrases, follow the story of a journey to Makkah, and build together as a team.`),
  H2('How we use it'),
  ...bl(['Lessons last 35 to 45 minutes, led by a teacher, in a shared class world.', 'There are no monsters, no fighting and no damage in the class worlds.', 'Student chat is switched off by default. The teacher decides when to turn it on, and everything typed is visible to the whole class.']),
  H2('Privacy and safety'),
  ...bl(['Children do not need an account, an email address or any personal information to play.', 'We ask children to use only their first name or a nickname in the game.', 'The game contains no adverts and no purchases.', 'The teacher can pause the class, send messages to everyone, and remove a player at any time.', 'The game connects devices through an online matchmaking service so that a class can play together.']),
  H2('At home'),
  P('Children can also play at home in a web browser. Whether they do is your choice. Please talk with them about playing only with people they know. If you have questions, or would prefer your child not to take part, please contact me.'),
  P('Jazakum Allahu khayran,'),
  P('Name: ______________________________    School / class: ______________________'), P('Contact: ______________________________'),
  new (require('docx').Paragraph)({ border: { top: { style: require('docx').BorderStyle.SINGLE, size: 6, color: '999999', space: 8 } }, spacing: { before: 200, after: 120 }, children: [run('Reply slip (optional): please return to school', { bold: true })] }),
  P('Child\'s name: ______________________________      I give permission for my child to take part:   Yes  /  No'),
  P('Parent / carer signature: ______________________________      Date: ______________'),
];
await make('Letter to Parents', 'Edit the bracketed details, print on school paper and send home', letter, out + 'Parent-Letter.docx');
console.log('guide+letter done');
})();
