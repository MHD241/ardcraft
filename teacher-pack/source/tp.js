const fs = require('fs');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, Footer, PageNumber, PageBreak } = D;
const GAME = 'Ard Blocks';
const W = 9026;
const nums = [];
const run = (t, o = {}) => new TextRun({ text: t, font: 'Arial', ...o });
const P = (t, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, ...o.p, children: Array.isArray(t) ? t : [run(t, o)] });
const B = t => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 60, line: 290 }, children: Array.isArray(t) ? t : [run(t)] });
const bl = a => a.map(B);
const nl = a => { const ref = 'n' + nums.length; nums.push(ref); return a.map(t => new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 60, line: 290 }, children: Array.isArray(t) ? t : [run(t)] })); };
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [run(t)] });
const H1pb = t => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [run(t)] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [run(t)] });
const bold = t => run(t, { bold: true });
const brk = () => new Paragraph({ children: [new PageBreak()] });
const border = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
const borders = { top: border, bottom: border, left: border, right: border };
function table(widths, rows, header = true) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: rows.map((r, ri) => new TableRow({ tableHeader: header && ri === 0, cantSplit: true, children: r.map((c, ci) => new TableCell({ width: { size: widths[ci], type: WidthType.DXA }, borders, margins: { top: 70, bottom: 70, left: 100, right: 100 }, shading: header && ri === 0 ? { type: ShadingType.CLEAR, fill: 'E6EFE9', color: 'auto' } : undefined, children: (Array.isArray(c) ? c : [c]).map(x => typeof x === 'string' ? new Paragraph({ spacing: { after: 40, line: 280 }, children: [/[\u0600-\u06FF]/.test(x) ? run(x, { rightToLeft: true, size: 36 }) : run(x, { bold: header && ri === 0 })] }) : x) })) })) });
}
const gap = () => new Paragraph({ spacing: { after: 80 }, children: [] });
const lines = n => Array.from({ length: n }, () => new Paragraph({ spacing: { after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '999999', space: 8 } }, children: [] }));
const arabic = t => run(t, { rightToLeft: true, size: 28 });

function make(title, subtitle, children, file) {
  const doc = new Document({
    creator: GAME, title,
    styles: { default: { document: { run: { font: 'Arial', size: 22 } } }, paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: 'Arial', size: 44, bold: true, color: '1D4D3F' }, paragraph: { spacing: { before: 0, after: 120 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 32, bold: true, color: '1D4D3F' }, paragraph: { spacing: { before: 320, after: 140 }, keepNext: true, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 26, bold: true, color: '2F6B57' }, paragraph: { spacing: { before: 240, after: 100 }, keepNext: true, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 23, bold: true }, paragraph: { spacing: { before: 160, after: 80 }, keepNext: true, outlineLevel: 2 } }] },
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }, ...nums.map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] }))] },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1440, right: 1440 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [run(`${GAME} teacher pack · Draft: please have a qualified teacher review the religious content before classroom use · Page `, { size: 16, color: '666666' }), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: '666666' })] })] }) },
      children: [new Paragraph({ style: 'Title', children: [run(title)] }), P(subtitle, { color: '555555', italics: true }), ...children] }] });
  return Packer.toBuffer(doc).then(b => fs.writeFileSync(file, b));
}
module.exports = { H1pb, make, P, B, bl, nl, H1, H2, H3, bold, run, brk, table, gap, lines, arabic, GAME, W, Paragraph };
