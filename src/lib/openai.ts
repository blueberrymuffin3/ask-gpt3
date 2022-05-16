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

export async function query(prompt: string) {
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

	if (!res.ok) {
        throw Error(res.statusText);
    }

	const data: QueryResponse = await res.json();
	console.log(data);

	const choice = data.choices[0];
	return choice && { text: choice?.text, truncated: choice?.finish_reason == "length" };
}
