/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		// Get your AWS Bedrock API key from cloudflare secret store.
		const model = "us.anthropic.claude-3-5-haiku-20241022-v1:0";
		const AWS_API_KEY = await env.BEDROCK_API_KEY.get(); // In cloudflare worker bindings create new one named BEDROCK_API_KEY and put your AWS Bedrock API key there.
		const url = "https://bedrock-runtime.us-east-1.amazonaws.com/model/us.anthropic.claude-3-5-haiku-20241022-v1:0/converse";

		const payload = {
		messages: [
			{
			role: "user",
			content: [{ text: "Hello" }]
			}
		]
		};

		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${AWS_API_KEY}` 
		};

		fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(payload)
		})
		.then(response => response.text())
		.catch(error => console.error("Error:", error));

		return new Response(response.text(), { status: 200 });

		
	},
};
