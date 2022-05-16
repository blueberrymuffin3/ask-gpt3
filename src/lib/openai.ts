interface ResponseData {
	text: string;
	truncated: boolean;
}

export async function query(prompt: string): Promise<ResponseData> {
	const res = await fetch('/api/gpt3', {
		method: 'POST',
		body: prompt
	});

	if (!res.ok) {
		throw Error(`HTTP Code ${res.status} ${res.statusText} ${await res.text()}`);
	}

	return await res.json();
}
