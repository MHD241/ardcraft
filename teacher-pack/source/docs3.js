const { H1pb, make, P, B, bl, nl, H1, H2, H3, bold, run, brk, table, gap, lines, arabic, GAME } = require('./tp.js');
const out = '/home/user/ardcraft/teacher-pack/';
const nm = () => P('Name: ______________________    Class: ____________    Date: ____________');
(async () => {
const c = [];
// W1
c.push(H1('Worksheet 1: Salah and wudu'), nm(),
  H2('A. The five prayers'), P('Fill in the table. Use the words in the box.'),
  P([bold('Word box: '), run('Fajr   Dhuhr   Asr   Maghrib   Isha   dawn   midday   afternoon   sunset   night')]),
  table([1900, 2500, 2300, 2326], [['Prayer', 'When is it prayed?', 'Number of rakʿahs', 'One thing I notice'],
    ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]),
  gap(),
  H2('B. Put the steps of wudu in order'), P('Write 1 to 8 in the boxes.'),
  table([900, 8126], [['No.', 'Step'],
    ['', 'Wash the face three times.'], ['', 'Wash the feet up to the ankles, right foot first.'], ['', 'Wash both hands three times.'], ['', 'Say Bismillah and make the intention.'],
    ['', 'Wipe the head and the ears once.'], ['', 'Sniff water into the nose and blow it out, three times.'], ['', 'Wash the arms up to the elbows, right arm first.'], ['', 'Rinse the mouth three times.']]),
  gap(), H2('C. Think about it'), P('Why do you think we pray together in the masjid when we can?'), ...lines(3));
// W2
c.push(H1pb('Worksheet 2: Arabic word hunt'), nm(),
  H2('A. Match the Arabic word with its meaning'), P('Draw a line, or write the matching letter.'),
  table([2000, 2300, 700, 4026], [['Arabic', 'Say it', '', 'Meaning (letter)'],
    ['خُبْز', 'khubz', '', 'A. Water'], ['مَاء', "maa'", '', 'B. Camel'], ['جَمَل', 'jamal', '', 'C. Stone'], ['حَجَر', 'hajar', '', 'D. Bread'], ['تَمْر', 'tamr', '', 'E. Dates'], ['شَمْس', 'shams', '', 'F. Sun']]),
  gap(),
  H2('B. Words I found in the game'), P('Write three more words you found, with their meaning.'),
  table([3000, 3000, 3026], [['Arabic', 'Say it', 'Meaning'], ['', '', ''], ['', '', ''], ['', '', '']]),
  gap(),
  H2('C. Phrases'), P('When do we say these? Write a sentence for each.'),
  table([4000, 5026], [['Phrase', 'When we say it'],
    ['as-salaamu ʿalaykum (Peace be upon you)', ''], ['wa ʿalaykumu s-salaam (And peace be upon you)', ''], ['jazakallahu khayran (May Allah reward you with good)', ''], ['bismillah (In the name of Allah)', '']]),
  gap(), P([bold('My total: '), run('I found ______ words. (15 words = Student of Arabic!)')]));
// W3
c.push(H1pb('Worksheet 3: The journey of Umrah'), nm(),
  H2('A. Put the steps in order'), P('Write 1 to 6.'),
  table([900, 8126], [['No.', 'Step'],
    ['', 'Tawaf: walk seven times around the Kaʿbah, starting at the Black Stone.'], ['', 'Halq or taqsir: shave or trim the hair.'], ['', 'Put on ihram and make the intention at the miqat.'],
    ['', 'Saʿi: go seven times between Safa and Marwa.'], ['', 'Pray two rakʿahs behind Maqam Ibrahim and drink Zamzam water.'], ['', 'Say the talbiyah on the way to Makkah.']]),
  gap(),
  H2('B. Draw and label'), P('Draw the Kaʿbah. Label: the Black Stone, the door, the direction of tawaf.'),
  box(3600),
  H2('C. Think about it'), P('Pilgrims wear simple white clothes. What does this teach us?'), ...lines(3));
// W4
c.push(H1pb('Worksheet 4: Build a masjid'), nm(), P('Group members: ____________________________________________'),
  H2('A. Plan'), P('Sketch your masjid from above in the box. Mark where the qibla is.'),
  box(3000),
  gap(),
  H2('B. Jobs'), table([3200, 5826], [['Name', 'My job (walls, dome, minaret, wudu area, courtyard, decoration)'], ['', ''], ['', ''], ['', ''], ['', '']]),
  gap(),
  H2('C. Checklist'), table([900, 8126], [['Done', 'Part'], ['', 'Prayer hall facing the qibla'], ['', 'Mihrab (niche that shows the qibla)'], ['', 'Minbar'], ['', 'Minaret'], ['', 'Dome'], ['', 'Place for wudu'], ['', 'Courtyard'], ['', 'Islamic decoration (arabesque, tiles, patterns)']]),
  gap(), H2('D. Reflection'), P('One thing my group did well:'), ...lines(2), P('One thing we would do differently:'), ...lines(2));
// W5
c.push(H1pb('Worksheet 5: Ramadan: a day of fasting'), nm(),
  H2('A. Complete the sentences'), P('Use the words in the box.'),
  P([bold('Word box: '), run('Fajr   Maghrib   suhoor   iftar   dates   patience')]),
  table([700, 8326], [['No.', 'Sentence'], ['1', 'The fast begins at ____________ (dawn) and ends at ____________ (sunset).'], ['2', 'The meal before dawn is called ____________.'], ['3', 'The meal when we break the fast is called ____________.'], ['4', 'Many Muslims break the fast with ____________ and water.'], ['5', 'Fasting helps us to learn ____________ and to remember people who are hungry.']]),
  gap(),
  H2('B. The dua for breaking the fast'), P('Copy it carefully, then write what it means in your own words.'),
  P([arabic('ذَهَبَ ٱلظَّمَأُ وَٱبْتَلَّتِ ٱلْعُرُوقُ وَثَبَتَ ٱلْأَجْرُ إِنْ شَاءَ ٱللَّٰهُ')]),
  P('dhahaba z-zama\'u wabtallati l-ʿurooqu wa thabata l-ajru in shaa\'a llaah'),
  ...lines(3),
  H2('C. Think about it'), P('What is one kind thing you can do for someone else in Ramadan?'), ...lines(3));
// KEY
c.push(H1pb('Answer key (for teachers)'),
  H3('Worksheet 1'), P('A. Fajr: dawn, 2 rakʿahs. Dhuhr: midday, 4. Asr: afternoon, 4. Maghrib: just after sunset, 3. Isha: night, 4.'),
  P('B. Correct order of wudu: 1 Say Bismillah and make the intention. 2 Wash both hands three times. 3 Rinse the mouth three times. 4 Sniff water into the nose and blow it out three times. 5 Wash the face three times. 6 Wash the arms up to the elbows, right first. 7 Wipe the head and the ears once. 8 Wash the feet up to the ankles, right first.'),
  H3('Worksheet 2'), P('A. khubz = D, maa\' = A, jamal = B, hajar = C, tamr = E, shams = F.'), P('B and C: answers will vary. Example for C: we say as-salaamu ʿalaykum when we meet someone; jazakallahu khayran when someone does something kind for us.'),
  H3('Worksheet 3'), P('A. Correct order: 1 Put on ihram and make the intention at the miqat. 2 Say the talbiyah on the way to Makkah. 3 Tawaf. 4 Pray two rakʿahs behind Maqam Ibrahim and drink Zamzam. 5 Saʿi. 6 Halq or taqsir.'),
  P('Please check this order against your own school\'s teaching. Some schools teach the Zamzam and the two rakʿahs in slightly different order, and the talbiyah starts from ihram.'),
  H3('Worksheet 4'), P('Marked with the rubric in Lesson 4.'),
  H3('Worksheet 5'), P('A. 1 Fajr, Maghrib. 2 suhoor. 3 iftar. 4 dates. 5 patience. B. The dua means: the thirst has gone, the veins are moist, and the reward is confirmed, if Allah wills. C: answers will vary (sharing food, giving charity, being kind, helping at home).'));
await make('Worksheets', `Printable worksheets for the four lessons · ${GAME} · ages 8 to 12`, c, out + 'Worksheets.docx');
console.log('worksheets done');
})();
function box(h) { const D = require('docx'); const bd = border(); const b4 = { top: bd, bottom: bd, left: bd, right: bd }; return new D.Table({ width: { size: 9026, type: D.WidthType.DXA }, columnWidths: [9026], rows: [new D.TableRow({ height: { value: h, rule: D.HeightRule.ATLEAST }, children: [new D.TableCell({ width: { size: 9026, type: D.WidthType.DXA }, borders: b4, children: [new D.Paragraph({ children: [] })] })] })] }); }
function border() { const { BorderStyle } = require('docx'); return { style: BorderStyle.SINGLE, size: 6, color: '666666' }; }
