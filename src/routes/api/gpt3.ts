import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

const OPENAI_SECRET: string = import.meta.env.VITE_OPENAI_SECRET;

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

export interface ResponseData {
	text: string;
	truncated: boolean;
}

export async function post(
	event: RequestEvent
): Promise<RequestHandlerOutput<ResponseData | string>> {
	const prompt = (await event.request.text()) ?? '';
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
		return { status: 500, body: `HTTP code ${res.status} with openai API` };
	}

	const data: QueryResponse = await res.json();
	console.log(data);

	const choice = data.choices[0];
	if (!choice) {
		return { status: 500, body: 'Error with openai API' };
	}

	return {
		body: {
			text: choice.text,
			truncated: choice?.finish_reason == 'length'
		}
	};
}
