# Event Management Platform

## Overview

Event Management Platform is a comprehensive web application designed to simplify event creation, management, and registration. Built with modern web technologies, this platform offers an intuitive interface for users to create, browse, and interact with events.

### Technology Stack

- Frontend: Next.js 14
- Database: PostgreSQL
- ORM: Prisma
- Authentication: NextAuth
- Styling: Tailwind CSS

---
## Prerequisites

- Node v18 installed in your machine


## Setup Instructions

### Local Development

#### Clone the repository:
```bash
https://github.com/sumanbalayar08/event-management.git
```
#### Set up environment variables:
1. Create a `.env` file inside the root directory with the following content:

   ```plaintext
   DATABASE_URL=your_database_url
   ```
#### Install Dependencies:
1. Run the following command to build and start the application:

   ```bash
   npm install
   ```
#### Database Setup with Prisma:
1. Run the following command to apply database migrations to your postgres instance:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init  
   ```
   
1. Run the development server:

   ```bash
   npm run dev
   ```

#### Access the application:
- **Frontend:** [http://localhost:3000](http://localhost:3000)  