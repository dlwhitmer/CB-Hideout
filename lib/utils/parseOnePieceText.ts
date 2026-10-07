function removeKeywordTags(text: string | null) {
  if (!text) return null; // ← prevents the crash

  const keywords = ["Blocker", "Rush", "Banish", "Double Attack", "DON!!", "Counter"];
  let cleaned = text;

  keywords.forEach((kw) => {
    cleaned = cleaned.replace(`[${kw}]`, "");
  });

  return cleaned.trim();
}


export function parseOnePieceText(text: string) {
  const sections = {
    main: null as string | null,
    trigger: null as string | null,
    onPlay: null as string | null,
    whenAttacking: null as string | null,
    activateMain: null as string | null,
    keywords: [] as string[],
  };

  // Helper: extract section text between tags
  function getSection(tag: string) {
    const start = text.indexOf(`[${tag}]`);
    if (start === -1) return null;

    const afterTag = start + tag.length + 2; // skip "[tag]"
    let end = text.length;

    // find next section tag
    const tags = [
      "[Main]",
      "[Trigger]",
      "[On Play]",
      "[When Attacking]",
      "[Activate: Main]",
    ];

    for (const t of tags) {
      if (t === `[${tag}]`) continue;
      const pos = text.indexOf(t, afterTag);
      if (pos !== -1 && pos < end) end = pos;
    }

    return text.slice(afterTag, end).trim();
  }

  // Extract keywords
  function extractKeywords() {
    const keywords = [
      "Blocker",
      "Rush",
      "Banish",
      "Double Attack",
      "DON!!",
      "Counter",
    ];
    const found: string[] = [];

    keywords.forEach((kw) => {
      if (text.includes(`[${kw}]`)) {
        found.push(kw);
      }
    });

    return found;
  }

  sections.main = removeKeywordTags(getSection("Main"));
  sections.trigger = removeKeywordTags(getSection("Trigger"));
  sections.onPlay = removeKeywordTags(getSection("On Play"));
  sections.whenAttacking = removeKeywordTags(getSection("When Attacking"));
  sections.activateMain = removeKeywordTags(getSection("Activate: Main"));

  sections.keywords = extractKeywords();

  return sections;
}
