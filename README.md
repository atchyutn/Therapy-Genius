# 🌟 AI-Powered Therapy Assistant

Welcome to the AI-Powered Therapy Assistant project! This open-source tool is designed to revolutionize how therapists create personalized activities for children with ADHD and autism. We're excited to share this project with the community and are open to discussions, contributions, and collaborations. Let's make therapy more efficient and effective together! 🚀

## 🤝 Open Source and Collaboration

This project is open source and we welcome contributions from the community. Whether you're a developer, therapist, or just interested in the project, we'd love to hear from you! Feel free to open issues, submit pull requests, or start discussions about features or improvements.

## 🎨 Creating and Customizing the OpenAI Assistant

Before setting up the project, you'll need to create and customize an OpenAI Assistant. Here's how:

1. **Create an OpenAI Account**: If you haven't already, sign up at [OpenAI](https://openai.com/).

2. **Access the API**: Navigate to the API section and create a new API key.

3. **Create a New Assistant**:
   - Go to the [OpenAI Playground](https://platform.openai.com/playground).
   - Click on "Create new assistant" and give it a name (e.g., "Therapy Activity Generator").

4. **Customize the Assistant**:
   - Set the model to GPT-4 or the latest available.
   - In the system message, provide context about generating therapy activities. For example:
     ```
     You are an AI assistant specialized in creating personalized therapy activities for children with ADHD and autism. Generate activities based on the child's age, specific condition, and therapy goals.
     ```

5. **Feed Data to the Assistant**:
   - Upload sample therapy reports or activity descriptions to help the AI understand the format and content.
   - You can do this by using the `files` parameter when creating the assistant via the API.

6. **Customize for Report Format**:
   - In the system message, specify the desired report format. For example:
     ```
     Generate activities in the following format:
     Activity Name:
     Objective:
     Materials Needed:
     Task:
     ```

7. **Save and Get Assistant ID**:
   - After creating and customizing your assistant, save it and note down the Assistant ID.

8. **Use in Your App**:
   - Create a `.env.local` file in your project root.
   - Add your OpenAI API key and Assistant ID:
     ```
     OPENAI_API_KEY=your_api_key_here
     OPENAI_ASSISTANT_ID=your_assistant_id_here
     ```

Now you're ready to set up the project!

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🌐 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🤔 Questions or Suggestions?

We're always looking to improve and expand this project. If you have any questions, suggestions, or just want to chat about the potential of AI in therapy, don't hesitate to reach out or open an issue. Let's make therapy more accessible and effective together! 💪

Happy coding and happy helping! 🎉
