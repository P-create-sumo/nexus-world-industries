import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { entity_name, entity_type } = await req.json();

    if (!entity_name || !entity_type) {
      return Response.json({ error: 'entity_name and entity_type are required' }, { status: 400 });
    }

    const prompt = `You are NEXUS, an elite OSINT intelligence analyst. Analyze the following entity and produce a structured intelligence report.

ENTITY: "${entity_name}"
TYPE: ${entity_type}

Produce a JSON report with the following fields:
- summary: A 3-4 sentence executive intelligence summary of this entity based on publicly available information
- risk_score: A numerical risk score from 0 (no risk) to 100 (extreme risk) based on publicly known factors
- risk_level: One of "LOW" (0-25), "MEDIUM" (26-50), "HIGH" (51-75), "CRITICAL" (76-100)
- key_connections: An array of 4-6 notable individuals, organizations, or entities this subject is known to be connected to
- red_flags: An array of 2-5 risk indicators or concerns identified from public sources (or empty array if none found)
- sources: An array of 3-5 types of public sources consulted (e.g. "Corporate filings", "News archives", "Social media", "Court records", "Financial databases")
- tags: An array of 3-6 intelligence category tags relevant to this entity (e.g. "FINANCE", "POLITICAL", "TECH", "LEGAL", "MEDIA")

Be factual and based only on widely known public information. If the entity is fictional or unknown, generate a plausible intelligence assessment.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          risk_score: { type: 'number' },
          risk_level: { type: 'string' },
          key_connections: { type: 'array', items: { type: 'string' } },
          red_flags: { type: 'array', items: { type: 'string' } },
          sources: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } }
        }
      }
    });

    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});