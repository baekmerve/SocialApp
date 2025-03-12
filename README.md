# 📌 Social Media App

A modern social media platform built with **Next.js**, **React**, **Clerk**, **Prisma**, **Tailwind CSS**, **Shadcn**, and more. Users can create posts, follow others, and interact with content.

## 🚀 Features

### 🔑 Authentication
- Secure user authentication using **Clerk**.
- Users can sign up, log in, and manage their accounts.

### 🏠 Homepage
- View a list of posts (blurred for non-logged-in users).
- Create, read, and delete posts.
- See a random selection of users to follow.
- Discover recommended posts.
- Like and comment on posts.

### 📌 Profile Page
- View user details: **name, username, website, location, bio,** and more.
- See the number of **followers, following, and posts**.
- Follow/unfollow users.
- Edit your own profile.
- View all posts and liked posts of a user.

### 🔔 Notifications
- Get notified when someone **follows you, likes your post, or comments**.
- Accessible through a dropdown in the **Navbar**.

### 🎨 UI/UX
- **Dark/Light mode** toggle.
- Responsive design with **Tailwind CSS** & **Shadcn components**.
- **Blurred content for non-logged-in users**.

### 📸 Media Uploads
- Image uploads with **UploadThing**.

## 🛠️ Tech Stack
- **Next.js** – For server-side rendering and performance.
- **React** – Core frontend framework.
- **Clerk** – Authentication & user management.
- **Prisma** – Database ORM.
- **Tailwind CSS** – Fast styling.
- **Shadcn** – Pre-built UI components.
- **React Hot Toast** – For instant notifications.
- **UploadThing** – Simple file uploads.

## 🏗️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/baekmerve/SocialApp.git
   cd SocialApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file.
   - Add required API keys and database connection details.
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open **http://localhost:3000** in your browser.

## 📜 License
This project is licensed under the **MIT License**.

---
