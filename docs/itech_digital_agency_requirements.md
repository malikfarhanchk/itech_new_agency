### iTech Digital Agency: The Definitive Technical Blueprint

Document Version: 3.0 (Final)

Date: 10 October 2025

#### 1.0 Introduction & System Purpose

This document outlines the complete architecture and functional specifications for the "**iTech Digital Agency**" a bespoke, all-in-one software platform designed to manage SEO clients, automate reporting, foster team collaboration, and drive agency growth. The system is intended for private use by a core team of administrators, providing them with a powerful suite of tools while offering a professional, simplified reporting dashboard for their clients.

#### 2.0 Foundational Architecture & Technology Stack

The system is built on a modern, scalable, and cost-effective technology stack.

**2.1 Technology Choices:**

**Frontend:** Next.js (React) - Chosen for its high performance, excellent developer experience, and seamless integration with the Vercel hosting platform.

**Backend:** Python with FastAPI - Chosen for its speed, ease of use, and extensive support for data science libraries (like Pandas), which are essential for processing SEO data.

**Database:** Supabase (PostgreSQL) - Chosen as an all-in-one solution providing a robust database, built-in user authentication, and file storage, with a generous free tier.

**AI Engine:** Google Gemini API - Chosen for its advanced capabilities in data analysis, summarization, and predictive insights.

**Deployment:** The Next.js frontend will be deployed on **Vercel**. The Python FastAPI backend will be deployed on a serverless platform (like Vercel Serverless Functions or Render) to ensure it only incurs costs when actively used, aligning with the goal of a near-zero operational cost.

**2.2 High-Level Data Flow:**

**Ingestion:** Data enters the system via two primary channels: direct API connections (Google Services) and manual file uploads (CSVs from Ahrefs, Semrush, etc.).

**Processing:** The FastAPI backend handles all incoming data. It authenticates with Google APIs, parses uploaded files using Pandas, and structures the data into a standardized format.

**Enrichment:** For specific analytics, the processed data is sent to the Gemini API. The AI's response (e.g., a summary or prediction) is received by the backend.

**Storage:** All structured data, client records, user information, and cached API responses are stored securely in the Supabase PostgreSQL database.

**Serving:** The Next.js frontend requests data from the FastAPI backend, which in turn queries the Supabase database. The frontend then renders this data into the various dashboards and components for the user.

**2.3 System-Wide Features & Settings:**

**User Roles:** The system is governed by a three-tier access model:

**Super Admin:** The system owner. Has full Admin capabilities plus the exclusive ability to manage other user accounts and system-wide settings.

**Admin:** A trusted team member. Can manage all clients, data, and collaborative tools.

**Client:** A client user. Has read-only access to their assigned domain's dashboard.

**White-Labeling:** In a dedicated "Settings" panel, the Super Admin can upload the agency's logo and select a primary brand colour. These assets will be dynamically applied to the client-facing dashboard, the main login page, and all generated PDF reports.

**Branded Login URL:** The system will support configuration to run on a custom subdomain (e.g., clients.youragency.co.uk), providing a fully branded and professional client experience.

#### 3.0 User Authentication & Onboarding Workflow

This section details every step of how users access and are added to the system.

**3.1 Screen: Login Page:**

**Frontend:** A clean, simple page featuring the agency's white-labeled logo. It contains fields for Email, Password, a Login button, and a Forgot Password? link.

**Backend:** When the user clicks Login, the frontend sends the credentials to a /login endpoint on the FastAPI backend. The backend uses the Supabase Auth library to securely verify the user's credentials against the auth.users table. Upon success, it returns a secure session token (JWT), which the frontend stores to authenticate subsequent requests.

**3.2 Workflow: Admin Onboarding:**

A new team member signs up on the main page.

Their account is created in Supabase but is flagged as pending_approval.

The Super Admin receives a notification and sees the new user in their "User Management" panel.

The Super Admin clicks "Approve," which updates the user's role to Admin, granting them full access.

**3.3 Workflow: Client Onboarding (Admin-Initiated):**

An Admin clicks the "Add New Client" button on their main dashboard.

They are presented with a form containing the fields: Client Name, Website Domain, Client Type (Local SEO/E-commerce), Contract Length, and Monthly Fee.

Upon submission, the backend:

Creates a new entry in the clients table in the database.

Uses Supabase Auth to create a new user account with a randomly generated, secure password. The user's role is set to Client and is linked to the newly created client ID.

The system displays the generated username and password to the Admin. The Admin is responsible for securely sharing these credentials with the client via email or another channel when the dashboard is populated with data.

#### 4.0 The Admin Main Dashboard: The Command Centre

This is the primary screen an Admin sees upon logging in. It's designed for a high-level overview and quick navigation.

**4.1 Screen Layout:**

**Header Bar:** Contains the agency logo, the Live Admin Counter (a small user icon with a number, e.g., 👥 3), and the Notifications Hub (a bell icon).

**Top-Level Overview Section:**

**Financial Widgets:** Displays Total Monthly Revenue, Total Active Clients, and Net Monthly Balance (After Tax).

**Client Status Summary:** A text line showing the portfolio health: Improving: 4 | Stable: 2 | Declined: 1.

**Client Grid:** A scrollable grid of large, round buttons, one for each client. Each button is color-coded (Green/Red/Yellow) and displays the domain name along with a key metric (e.g., clientdomain.com | +450 Clicks). Clicking a button navigates to that client's Detailed Dashboard.

**Internal Admin Chat:** A collapsible chat panel for real-time team communication, file sharing, and @clientdomain tagging, which creates a hyperlink to the respective client's dashboard.

**4.2 Feature: Client Status Grid & Button Logic:**

**Description:** The central feature is a grid of large, round, color-coded buttons representing each client.

**Backend Logic (Button Color Determination):**

A scheduled, automated job runs weekly (e.g., every Monday at 3 AM).

For each client, this job fetches the primary performance metric (e.g., total organic clicks from GSC) for the last 7 days (CurrentWeek) and the 7 days prior to that (PreviousWeek).

It calculates the percentage change: ((CurrentWeek - PreviousWeek) / PreviousWeek) * 100.

The system then assigns a status based on the following thresholds:

**Green (Improving):** If the percentage change is **greater than +10%**. The button will display the domain and a positive metric, e.g., clientdomain.com | +15% Clicks.

**Red (Declined):** If the percentage change is **less than -10%**. The button will display a negative metric, e.g., anotherdomain.co.uk | -12% Traffic.

**Yellow (Stable):** If the percentage change is **between -10% and +10%**. This accounts for normal weekly fluctuations. The button will display localbusiness.uk | Stable.

This status is stored in the clients table and is used to render the buttons on the main dashboard.

#### 5.0 The Admin Side Navigation & Global Tools

The left-hand sidebar provides access to all agency-wide management functions.

**5.1 Feature: Client Filters:** Buttons to filter the main client grid to show All Clients, Local SEO Clients, or E-commerce Websites.

**5.2 Feature: Lead & Proposal Management (CRM):**

**Screen: Leads Dashboard:** A dedicated page with a Kanban-style board to visually track leads through a sales pipeline (Initial Contact, Proposal Sent, Negotiation, Won, Lost).

**Screen: Proposal Generator:** A tool where an Admin can select a client lead, choose from pre-defined service templates, and generate a simple PDF proposal.

**5.3 Feature: Backlink Opportunities Database:**

**Screen: Backlinks Page:** A two-tabbed interface.

**Tab 1: Normal Backlinks:** A table with columns for Domain, DR, Spam Score, and Link Type (Blog, etc.).

**Tab 2: Local Directories:** A table with columns for Directory Name, City, and Verification Needed.

**5.4 Feature: Financials ("Total Earnings"):**

**Screen: Earnings Dashboard:** A page with advanced charts visualizing Monthly Recurring Revenue (MRR) Growth, Client Churn Rate, and Average Revenue Per Client.

**5.5 Feature: Internal Tools:**

**Screen: Prompt Management:** A simple CRUD interface to add, edit, and view AI prompts for team use.

**Screen: Schema Markup Generator & Validator:** A form-based tool to generate JSON-LD Schema for different types. It includes an input field where an Admin can paste a URL, and the backend will fetch the page and validate its existing structured data.

#### 6.0 The Detailed Client Dashboard (Admin View)

This is the most comprehensive screen, where all work for a single client is performed.

**6.1 Project Management Suite:**

**Task Management:** A client-specific to-do list where Admins can create, assign, and track tasks.

**Goal Setting & Tracking:** Set goals and visualize progress.

**Notes:** A shared notepad for the team.

**Client Communication Log:** A log of important interactions.

**6.2 SEO Analysis Modules:**

**Core Performance (Expanded):**

A unified view of SEO (GSC), Local (GBP API), and E-commerce (GA4) metrics.

**Feature: Lead/Form Submission Tracking:**

For clients marked as "Local SEO," a new widget will appear: "Lead Tracking."

It will feature an "Add Leads" button, opening a simple form with Date, Number of Leads, and Source (optional) fields.

**Data Flow:** An Admin can manually enter the number of form submissions or qualified calls for a given day or week. This data is stored in a leads table linked to the client ID. The dashboard will then display this data as a trend graph, allowing for easy weekly and monthly comparison to demonstrate business impact.

**Competitor Analysis:** Uses uploaded data to show Keyword Gaps and Traffic Overlap in a powerful, embedded spreadsheet-like view that mimics the structure of the uploaded file.

**Link Analysis:** Visualizes the internal linking structure ("Page Power").

**Market & Search Trend Analysis:** Integrates charts from Google Trends data.

**6.3 Feature: SEO Strategy & Audit Workspace:**

**Access:** A prominent button on the client dashboard labeled "Audit & Strategy Workspace".

**Interface:** Clicking this button opens a full-screen, **multi-tabbed, editable, spreadsheet-like interface**. This will be powered by a frontend library like AG-Grid or Handsontable to provide a rich, Excel-like user experience.

**Functionality:** For each new client, the system automatically generates a blank template of this workspace. Admins can then manually populate and update the data as part of their workflow. The data is saved to the database in real-time. The tabs will be structured exactly like your provided file:

**Tab 1: Client Details:** A key-value form for Name, Company, Address, USP, etc.

**Tab 2: Pages:** An editable table with columns for Page name, Page URL, Page type, Content action, Technical action, etc.

**Tab 3: Keywords:** A table for Keywords and Monthly search volume.

**Tab 4: Headers & Descriptions:** A table to track on-page SEO for Page, Title, Description, H1, New title, New description, etc.

**Tab 5: Competitors:** A table to manually input competitor analysis data.

**Tab 6: Content Strategy:** A simple table for Page name, Page type, Word count needed.

**Tab 7: Local Citations:** A comprehensive table to track citation building efforts with columns like SITE, DR, DATE SUBMITTED, LIVE LINK, STATUS.

**Tab 8: Link Building:** A table to track page, Competitor page, links needed, status.

**Tab 9: Surfer Optimised Pages:** A table to track content optimization scores with columns like Page, keyword, ranking before, surfer score before, surfer score after.

**Tab 10: Task Sheet:** A comprehensive checklist-style table to track the status of key SEO tasks (Task, Status, Notes). This can be linked to the main Task Management module.

#### 7.0 The Client-Facing Dashboard

A simplified, professional portal for clients.

**7.1 Screen: Client Dashboard:**

**Frontend:** The page is fully branded with the agency's logo, colour, and custom URL. It presents data through clear, easy-to-read charts showing performance trends and progress towards their goals. It includes a simplified Competitor Insights section.

**Backend:** The backend serves a restricted set of data for this view, omitting all internal notes, financial details, and complex admin tools.

#### 8.0 Backend Logic, Automation, and Data Management

This section details the system's "engine."

**8.1 Cost Control Engine & API Integration:** As previously detailed, using Smart Caching, concise Prompt Engineering, and Rate Limiting.

**8.2 Data Integrity & Automation:** Includes Failure Detection alerts and the "Process and Purge" policy for file uploads.

**8.3 Feature: Intelligent Data Parser:**

**Purpose:** To robustly and accurately extract data from uploaded CSV or sheet files (from Ahrefs, Semrush, etc.) without relying on a fixed column order.

**Backend Logic:**

**File Ingestion:** An Admin uploads a file. The backend receives this file and loads it into a Pandas DataFrame.

**Header Identification:** The system reads the first row of the file, which is assumed to be the header.

**Keyword Mapping:** The system maintains an internal "dictionary of synonyms" for key metrics. For example:

keyword: ['Keyword', 'query', 'Search term', 'Keywords']

url: ['URL', 'Page', 'Landing Page', 'Top pages']

traffic: ['Traffic', 'Organic Sessions', 'sessions', 'Clicks', 'clicks']

position: ['Position', 'Rank', 'ranking']

**Column Matching:** The parser iterates through each column header from the uploaded file. It cleans the header (converts to lowercase, removes extra spaces) and checks if it exists in any of the synonym lists in the dictionary.

**Data Extraction:** If a match is found (e.g., the file's header "Clicks" matches the traffic list), the system maps that column to the internal metric name (traffic). It then proceeds to extract and process all the data from that specific column.

**Error Handling:** If the parser cannot find the minimum required headers (e.g., it needs at least a 'keyword' and a 'traffic' column for a keyword report), it will reject the file. The backend will then send a notification to the Admin: "File processing failed for clientdomain.com. Could not identify required data columns. Please ensure your file has clear headers."

**Final Step:** Once the relevant data has been extracted and stored in the database, the "Process and Purge" policy is enacted, and the original file is deleted.

**8.4 API Integration Guide:**

**Google Services (GA4, GSC, GBP):**

**API Access:** Requires going to the Google Cloud Console, creating a project, enabling the "Google Analytics Data API," "Google Search Console API," and "Google Business Profile API." Then, create **OAuth 2.0 Credentials** (Web Application type) and add the application's URL to the authorized origins.

**Integration:** The Admin will click a "Connect" button in the app, initiating an OAuth 2.0 flow. After granting permission, Google sends back an authorization code. The backend exchanges this code for an access token and a long-lived refresh token. The **refresh token** is encrypted and stored securely in the database, allowing the backend to generate new access tokens in the future without user interaction.

**Google Gemini:**

**API Access:** Requires visiting Google AI Studio and creating an API key.

**Integration:** This API key will be stored as a secure environment variable on the backend server. The backend will make direct, authenticated server-to-server requests to the Gemini API.

**Google Trends:**

**API Access:** There is no official API.

**Integration:** The backend will use a third-party Python library (e.g., pytrends) that simulates a browser to scrape data from the Google Trends website. This connector may be fragile and require maintenance if Google changes its site structure.
