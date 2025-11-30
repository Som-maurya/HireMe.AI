🚀 HireMe.AI - Intelligent Interview Coach Agent

"Impossible to Possible" – An AI-powered interview assistant that scans your resume, acts as a strict technical teacher, and prepares you for your dream job with real-time feedback.

🌟 Features

🧠 Smart AI Agent (Google Vertex AI / Dialogflow CX)

Resume-Aware: Upload your PDF resume, and the AI scans it to ask specific questions based on your skills.

Teacher Persona: Doesn't just ask questions; it listens to your answers.

Wrong Answer? It corrects you immediately with the right concept.

Right Answer? It appreciates you and digs deeper.

Dynamic Field Detection: Automatically detects if you are a Python Dev, Java Dev, or Data Scientist.

🎨 Futuristic UI (Cyberpunk Theme)

3D Flip Authentication: A stunning 3D rotating card for Login & Registration.

Neon Aesthetics: Black & Blue Cyberpunk theme with glowing effects.

Smooth Animations: Floating panels, typing indicators, and seamless transitions.

🔐 Secure Authentication

User Registration: Create an account with a unique username.

Secure Login: Access the interview panel only after authentication.

In-Memory Store: Fast and lightweight user management for demos.

🛠️ Tech Stack

Frontend: HTML5, CSS3 (3D Transforms, Flexbox), Vanilla JavaScript.

Backend: Node.js, Express.js.

AI Engine: Google Cloud Vertex AI Agent / Dialogflow CX.

Resume Parsing: PDF.js for client-side PDF text extraction.

🚀 Getting Started

Follow these steps to run the project locally.

1. Prerequisites

Node.js installed on your machine.

A Google Cloud Project with Dialogflow CX API enabled.

A Service Account Key (key.json) from Google Cloud.

2. Installation

# Clone the repository
git clone [https://github.com/your-username/hireme-ai.git](https://github.com/your-username/hireme-ai.git)

# Navigate to the project directory
cd hireme-ai

# Install dependencies
npm install


3. Configuration

Create a .env file in the root directory and add your Google Cloud details:

PORT=3000
GCP_PROJECT_ID=your-google-cloud-project-id
GCP_AGENT_ID=your-dialogflow-agent-id
GCP_LOCATION=global


Important: Place your Google Cloud Service Account Key file named key.json in the root folder.

4. Run the Server

node agent.js


Visit http://localhost:3000 in your browser.

📸 Screenshots

3D Login Screen

AI Interview Chat





🤝 Contributing

Contributions are welcome!

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📜 License

Distributed under the MIT License. See LICENSE for more information.

Made with ❤️ by [Your Name]
