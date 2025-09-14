# Museum/Gallery Curator

This project is a React application that displays a dashboard of images fetched from the [Unsplash API](https://unsplash.com/developers).  
Users can move organise the images in an aesthetic manner fir for their style. Additonally, users can move imagess between active and hidden sections, resize them, and even export the board.  

![ezgif-1502e40c673eb0](https://github.com/user-attachments/assets/025322d8-f0aa-4bc8-bd55-a63c897727c0)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- Unsplash API access key (create one at [Unsplash Developers](https://unsplash.com/developers))

### Installation
```bash
# Clone the repository
git clone museum-curator
cd museum-curator

# Install dependencies
npm install
```

### Setup Environment
Create a `.env` file in the project root and add your Unsplash access key:
```env
VITE_ACCESS_KEY=your_unsplash_access_key
```

### Run the Project
```bash
npm run dev
```
This will start the development server. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```
