import { OPENAI_SECRET } from './credentials.json';

interface QueryResponse {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: {
		text: string;
		index: number;
		logprobs: any;
		finish_reason: string;
	}[];
}

export async function query(prompt: string): Promise<string> {
	const body = {
		prompt,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	};
	const res = await fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_SECRET}`
		},
		body: JSON.stringify(body)
	});

	const data: QueryResponse = await res.json();

	return data.choices[0]?.text;
}
