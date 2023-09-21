/**
 * CURL
 *
 * curl https://api.openai.com/v1/chat/completions \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer $OPENAI_API_KEY" \
 *   -d '{
 *   "model": "gpt-3.5-turbo",
 *   "messages": [
 *     {
 *       "role": "system",
 *       "content": "You are a master storyteller and social media expert. You love writing short, narrative driven slideshow stories with visuals that build off each other. You also like using popular storytelling arcs to create the maximum possible emotional impact. You respond only with the following JSON format - \n[{caption:\"...\", imagePrompt:\"...\",usePreviousImageWithPrompt:<true/false>,imageSearchKeywords:\"...\"},{...}...] \n\nwhere:\n1. each item in the array represents one slide.\n2. caption - is the text that should be displayed in the slide\n3. imagePrompt - is an instruction to an image generation AI, to create the appropriate visual\n4. usePreviousImageWithPrompt - True, if this slide'\''s visual should be a continuation of the previous slide. False, if its a new generation - Use this as appropriate, to generate coherent visuals where slides talk of the same overall scene with some change to the details.\n5. imageSearchKeywords - a comma separated list of keywords to search APIs like unsplash & pexels for images that could relate to the slide'\''s narrative as closely as possible, when AI based image generation is not possible."
 *     },
 *     {
 *       "role": "user",
 *       "content": "Write a short story in 5 slides about an Army wife'\''s story during war time"
 *     },
 *     {
 *       "role": "assistant",
 *       "content": "[{\n  \"caption\": \"Slide 1: The Farewell\",\n  \"imagePrompt\": \"Please generate an image of a soldier in uniform hugging his wife goodbye.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"soldier, wife, farewell\"\n}, {\n  \"caption\": \"Slide 2: Loneliness and Fear\",\n  \"imagePrompt\": \"Please generate an image depicting a woman sitting alone, looking out of a window with longing and worry.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"lonely woman, worried expression\"\n}, {\n  \"caption\": \"Slide 3: Cherished Memories\",\n  \"imagePrompt\": \"Please generate an image of a photo album with pictures of the couple, symbolizing their memories together.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"photo album, memories\"\n}, {\n  \"caption\": \"Slide 4: A Letter from the Frontline\",\n  \"imagePrompt\": \"Please continue the previous slide'\''s visual with an image of a letter, conveying the emotions of love and longing expressed from the war front.\",\n  \"usePreviousImageWithPrompt\": true,\n  \"imageSearchKeywords\": \"letter, war front\"\n}, {\n  \"caption\": \"Slide 5: Reunion and Celebration\",\n  \"imagePrompt\": \"Please generate an image of the soldier returning home, embraced by his wife with joy and relief, surrounded by friends and family.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"soldier returning home, happy reunion\"\n}]"
 *     }
 *   ],
 *   "temperature": 1,
 *   "max_tokens": 3797,
 *   "top_p": 1,
 *   "frequency_penalty": 0,
 *   "presence_penalty": 0
 * }'
 *
 * @format
 */

/* JSON

{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a master storyteller and social media expert. You love writing short, narrative driven slideshow stories with visuals that build off each other. You also like using popular storytelling arcs to create the maximum possible emotional impact. You respond only with the following JSON format - \n[{caption:\"...\", imagePrompt:\"...\",usePreviousImageWithPrompt:<true/false>,imageSearchKeywords:\"...\"},{...}...] \n\nwhere:\n1. each item in the array represents one slide.\n2. caption - is the text that should be displayed in the slide\n3. imagePrompt - is an instruction to an image generation AI, to create the appropriate visual\n4. usePreviousImageWithPrompt - True, if this slide's visual should be a continuation of the previous slide. False, if its a new generation - Use this as appropriate, to generate coherent visuals where slides talk of the same overall scene with some change to the details.\n5. imageSearchKeywords - a comma separated list of keywords to search APIs like unsplash & pexels for images that could relate to the slide's narrative as closely as possible, when AI based image generation is not possible."
    },
    {
      "role": "user",
      "content": "Write a short story in 5 slides about an Army wife's story during war time"
    },
    {
      "role": "assistant",
      "content": "[{\n  \"caption\": \"Slide 1: The Farewell\",\n  \"imagePrompt\": \"Please generate an image of a soldier in uniform hugging his wife goodbye.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"soldier, wife, farewell\"\n}, {\n  \"caption\": \"Slide 2: Loneliness and Fear\",\n  \"imagePrompt\": \"Please generate an image depicting a woman sitting alone, looking out of a window with longing and worry.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"lonely woman, worried expression\"\n}, {\n  \"caption\": \"Slide 3: Cherished Memories\",\n  \"imagePrompt\": \"Please generate an image of a photo album with pictures of the couple, symbolizing their memories together.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"photo album, memories\"\n}, {\n  \"caption\": \"Slide 4: A Letter from the Frontline\",\n  \"imagePrompt\": \"Please continue the previous slide's visual with an image of a letter, conveying the emotions of love and longing expressed from the war front.\",\n  \"usePreviousImageWithPrompt\": true,\n  \"imageSearchKeywords\": \"letter, war front\"\n}, {\n  \"caption\": \"Slide 5: Reunion and Celebration\",\n  \"imagePrompt\": \"Please generate an image of the soldier returning home, embraced by his wife with joy and relief, surrounded by friends and family.\",\n  \"usePreviousImageWithPrompt\": false,\n  \"imageSearchKeywords\": \"soldier returning home, happy reunion\"\n}]"
    }
  ],
  "temperature": 1,
  "max_tokens": 3797,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

*/

// import {encode, decode} from 'gpt-3-encoder';

const apiUrl = "https://api.openai.com/v1";

export const openAI = async (html, instructions, token, options = {}) => {
	console.log(
		"[DEBUG] Calling open ai with instr, token, html as - ",
		instructions,
		token,
		html
	);

	let body = Object.assign(
		{},
		{
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are a master web frontend developer and designer who helps the user to design and code HTML web user interfaces (UIs), using svelteJs v3.42.4 & bootstrap 5.5.0. You will modify the provided HTML according to the user's instructions. Make only those changes that are asked by the user and do so using best practises in responsive design, w3c standards & web security. You will respond only with the output html, nothing else.",
				},
				{
					role: "user",
					content: `Modify the provided html code as per the instructions below.\nHtml:"${
						html || ""
					}"\nInstructions:"${instructions || ""}"`,
				},
			],
			temperature: 1,
			max_tokens: 3097,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		},
		options
	);

	const response = await fetch(`${apiUrl}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		let res = await response.json();
		const inputString = res.error.message;

		const regexPattern =
			/This model's maximum context length is (\d+) tokens\. However, you requested (\d+) tokens \((\d+) in the messages, (\d+) in the completion\)\. Please reduce the length of the messages or completion\./;

		const match = inputString.match(regexPattern);

		if (match) {
            console.warn('max tokens exceeded. Retrying with adjusted max_tokens as below :-');
			const maxContextLength = parseInt(match[1]);
			const requestedTokens = parseInt(match[2]);
			const messagesTokens = parseInt(match[3]);
			const completionTokens = parseInt(match[4]);

			console.log("Max Context Length:", maxContextLength);
			console.log("Requested Tokens:", requestedTokens);
			console.log("Messages Tokens:", messagesTokens);
			console.log("Completion Tokens:", completionTokens);

            const max_tokens = maxContextLength - messagesTokens;
            console.log("\nNew max_tokens = ", max_tokens);
			return openAI(html, instructions, token, {
				max_tokens
			});
		} else {
			console.log("No match for error.");
			throw new Error(`Non-200 response: ${await response.text()}`);
		}
	}

	const responseJSON = await response.json();

	console.log("[DEBUG] responseJSON - ", responseJSON);

	return responseJSON;
};
