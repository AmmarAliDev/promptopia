import Prompt from '@models/prompt'
import { connectToDb } from "@utils/database";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    const res = req.json();

    try {
        // Check if all required fields are present
        if (!userId || !prompt || !tag) {
            throw new Error('Missing required fields.');
        }

        await connectToDb()

        const newPrompt = new Prompt({ creator: userId, prompt, tag });
        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201, })

    } catch (err) {
        console.error('Error creating prompt:', err);
        return new Response('Failed to create a prompt', { status: 500 })
    }
}