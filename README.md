# 📝 Angular Blog Project

This is a blog platform built with Angular, using JWT for authentication, and styled with Bootstrap and Popper.js. The application includes role-based access where users can interact with posts and an admin can manage the entire blog system.

---

## 💡 Main Idea

The blog project is a public platform where everyone can read posts and like them to stay informed. It's designed for open content access while providing administrative control to the blog owner.

---

## 🚀 Technologies Used

- Angular
- Bootstrap
- Popper.js
- RxJS
- JWT (JSON Web Token)
- ngx packages

---

## 🛠 How to Run

1. Clone the repository:
   ```bash
   git clone <your-repo-url>

2. Navigate to the project directory: 

   cd blogging-client

3. Install dependencies:

   npm install

4. Run the development server:

   ng serve

5. Open the app in your browser:
   
   http://localhost:4200

## 🔐 Authentication & Roles

- Users must register and then log in.
- After registration, users are assigned the User role.
- Users with the Admin role have full access.

---

## 👤 User Role Capabilities

- View all blog posts
- Like or unlike posts (likes are saved in the database)
- Access contact page to reach the admin

## 👨‍💼 Admin Role Capabilities

- Create, edit, and delete blog posts
- View deleted posts (in a separate page)
- View activity logs (who opened what)
- Change user roles (e.g., promote a user to admin)
- Define and assign custom roles
- Manage all content
- View personal profile page
- Access logout page

---

## ✍️ Features

- Register and log in with JWT
- Admin dashboard for managing users and posts
- Like system: users can like/unlike posts (only once per user per post)
- Deleted posts view
- Activity tracking page
- Role management
- Contact page for user-admin communication
- Personal information page (profile)
- Logout functionality
- Fully responsive design

---