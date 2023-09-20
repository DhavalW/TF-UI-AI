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

const apiUrl = "https://api.openai.com/v1";



export const generateScript = async (
	numSlides,
	topic,
	additionalInstructions,
	token
) => {
	const response = await fetch(`${apiUrl}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are a master storyteller and social media expert. You love writing short, narrative driven slideshow stories with visuals that build off each other. You also like using popular storytelling arcs to create the maximum possible emotional impact. You will respond exactly according to the following JSON format, with all the mentioned fields - \n[{text:\"...\", imagePrompt:\"...\",usePreviousImageWithPrompt:<true/false>,imageSearchKeywords:\"...\"},{...}...] \n\nwhere:\n1. each item in the array represents one slide.\n2. text - is the text that should be displayed in the slide\n3. imagePrompt - is an instruction to an image generation AI, to create the appropriate visual\n4. usePreviousImageWithPrompt - True, if this slide'''s visual should be a continuation of the previous slide. False, if its a new generation - Use this as appropriate, to generate coherent visuals where slides talk of the same overall scene with some change to the details.\n5. imageSearchKeywords - a comma separated list of keywords to search APIs like unsplash & pexels for images that could relate to the slide'''s narrative as closely as possible, when AI based image generation is not possible.",
				},
				{
					role: "user",
					content: `Write a short story in ${numSlides} slides about ${
						topic || "any topic"
					}\n${additionalInstructions || ""}`,
				},
			],
			temperature: 1,
			max_tokens: 3797,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		}),
	});

	if (!response.ok) {
		throw new Error(`Non-200 response: ${await response.text()}`);
	}

	const responseJSON = await response.json();

	console.log("[DEBUG] responseJSON - ", responseJSON);

	return responseJSON;
};
