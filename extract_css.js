const fs = require('fs');
const readline = require('readline');

async function extractOriginalCSS() {
  const fileStream = fs.createReadStream('C:/Users/PC/.gemini/antigravity/brain/9b96e131-7665-42a5-9aa5-a7fde3b9c46b/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"step_index":91') || line.includes('"step_index": 91')) {
      const obj = JSON.parse(line);
      const toolCall = obj.tool_calls && obj.tool_calls.find(t => t.name === 'write_file' && t.args.Path.includes('main.css'));
      if (toolCall) {
        fs.writeFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/original_main.css', toolCall.args.Content);
        console.log('Extracted original_main.css! Length:', toolCall.args.Content.length);
        return;
      }
    }
  }
  console.log('Step 91 not matched in transcript_full');
}

extractOriginalCSS();
