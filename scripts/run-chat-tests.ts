import { runChatTestCases, formatChatTestSummary } from "../src/lib/chat/runChatTestCases";

const summary = runChatTestCases("ar");
console.log(formatChatTestSummary(summary));
console.log("\nWarnings sample:");
for (const item of summary.results.filter((r) => r.warnings.length > 0).slice(0, 15)) {
  console.log(`- ${item.id}: ${item.warnings.join("; ")}`);
}
process.exit(summary.failed > 0 ? 1 : 0);
