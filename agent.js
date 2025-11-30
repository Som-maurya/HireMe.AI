/**
 * ============================================================================
 * HIREME.AI BACKEND - LOGIN SYSTEM + SMART AGENT
 * ============================================================================
 */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { SessionsClient } from "@google-cloud/dialogflow-cx";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Key File Path
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'key.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// --- 💾 TEMPORARY USER DATABASE (RAM) ---
// Note: Server restart hone par users delete ho jayenge.
// Demo ke liye ye perfect hai.
const users = [];

// --- ⚙️ AGENT CONFIGURATION ---
const PROJECT_ID = process.env.GCP_PROJECT_ID; 
const LOCATION = "global"; 
const AGENT_ID = process.env.GCP_AGENT_ID; 
const client = new SessionsClient({ apiEndpoint: `${LOCATION}-dialogflow.googleapis.com` });

// ============================================================================
// 1. AUTHENTICATION ROUTES (LOGIN & REGISTER)
// ============================================================================

// REGISTER API
app.post("/register", (req, res) => {
    const { name, email, username, password } = req.body;

    // Check if user exists
    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ success: false, message: "Username already taken!" });
    }

    // Save User
    users.push({ name, email, username, password });
    console.log(`✅ New User Registered: ${username}`);
    res.json({ success: true, message: "Registration Successful! Please Login." });
});

// LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        console.log(`🔓 User Logged In: ${username}`);
        res.json({ success: true, name: user.name });
    } else {
        res.status(401).json({ success: false, message: "Invalid Username or Password" });
    }
});

// ============================================================================
// 2. INTERVIEW CHAT ROUTE
// ============================================================================

app.post("/chat", async (req, res) => {
    try {
        const { query, sessionId } = req.body;
        console.log(`📩 Input: ${query}`);

        // Use Session ID from frontend or create random
        const finalSession = sessionId || "session-" + Date.now();
        
        const sessionPath = client.projectLocationAgentSessionPath(
            PROJECT_ID, LOCATION, AGENT_ID, finalSession
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: { text: query },
                languageCode: "en",
            },
        };

        const [response] = await client.detectIntent(request);
        const result = response.queryResult;
        let aiResponse = "";

        if (result.responseMessages && result.responseMessages.length > 0) {
            aiResponse = result.responseMessages
                .map(msg => msg.text ? msg.text.text[0] : "")
                .join("\n");
        } else {
            aiResponse = "I am processing your resume... please wait a moment.";
        }

        console.log(`🤖 Agent Reply: ${aiResponse}`);
        res.json({ reply: aiResponse });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ reply: "Connection Error. Check Server Logs." });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 HireMe.AI Server Running on http://localhost:${PORT}`);
});