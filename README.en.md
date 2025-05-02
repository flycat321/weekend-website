# WEEKEND Holiday Accommodation Website

## Project Introduction

WEEKEND is a website platform focused on providing high-quality holiday accommodation services. We carefully select accommodations with strong design aesthetics and beautiful natural environments to provide users with unforgettable holiday experiences.

### Main Features

- **Selected Holiday Accommodations**: Forest retreat cabins, lakeside villas, and other premium holiday options
- **Immersive Experience**: Each accommodation offers unique natural scenery and leisure experiences
- **Easy Booking**: Simple and intuitive booking process to easily plan your weekend getaway
- **Personalized Customization**: Customize your holiday plan according to your needs

## Technical Architecture

- **Frontend Framework**: Next.js 14
- **UI Components**: Based on Tailwind CSS and custom UI components
- **State Management**: React Hooks
- **Content Management**: Custom content management system

## Functional Modules

### Frontend Website

- Homepage: Showcasing popular holiday accommodations and platform features
- Accommodation Details Page: Displaying detailed information, facilities, prices, and booking functions
- Booking Process: Date selection, customization options, and online payment
- About Us: Platform philosophy and service introduction

### Backend Management

- Content Management System: Visual editing of website content
- User Management: Managing user accounts and permissions
- Order Management: Processing booking orders and viewing statistics

## Installation Guide

### Development Environment Requirements

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation Steps

1. Clone the repository to local
   ```bash
   git clone https://gitee.com/flycat321/weekend-website.git
   cd weekend-website
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the development site
   Open your browser and visit http://localhost:3000

## Deployment Guide

### Build Production Version

```bash
npm run build
# or
yarn build
```

### Run Production Version

```bash
npm run start
# or
yarn start
```

## Content Management System User Guide

1. Access admin backend: Log in to the `/admin` page
2. Content editing:
   - Select the page you want to edit on the content management page
   - Use the visual editor to add, modify, or delete content blocks
   - You can add titles, text, images, and other types of content
   - Mobile device preview supported
3. Save changes: Click the "Save" button to apply changes

## Project Directory Structure

```
weekend-website/
├── app/                # Next.js application directory
│   ├── admin/          # Admin backend pages
│   ├── house/          # House-related pages
│   ├── stay/           # Accommodation details pages
│   └── ...             # Other page components
├── components/         # Reusable components
│   ├── admin/          # Admin backend components
│   ├── ui/             # UI basic components
│   └── ...             # Other components
├── public/             # Static resource files
├── styles/             # Style files
├── types/              # TypeScript type definitions
└── ...                 # Other configuration files
```

## Contribution Guide

1. Fork this repository
2. Create your feature branch `git checkout -b feature/AmazingFeature`
3. Commit your changes `git commit -m 'Add some AmazingFeature'`
4. Push to the branch `git push origin feature/AmazingFeature`
5. Create a Pull Request

## Contact Information

For any questions or suggestions, please contact us through:

- Project address: [https://gitee.com/flycat321/weekend-website](https://gitee.com/flycat321/weekend-website)
- Email: [354610696@qq.com]

---

 2025 WEEKEND. All rights reserved.
