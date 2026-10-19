# ♥ Our Memories — Owner Guide & Documentation

## 🌐 1. Live Website Links

- **Main Survey Link (Share this with your ex-girlfriend):**
  [https://pdt-assist-struct-pharmacies.trycloudflare.com](https://pdt-assist-struct-pharmacies.trycloudflare.com)
- **Private Admin Dashboard (For you only):**
  [https://pdt-assist-struct-pharmacies.trycloudflare.com/admin](https://pdt-assist-struct-pharmacies.trycloudflare.com/admin)
- **Local Dev URL:** `http://localhost:3000`

---

## 🔒 2. Viewing Private Responses

1. Open the Admin link:
   `https://pdt-assist-struct-pharmacies.trycloudflare.com/admin`
2. Enter your Admin Secret Key:
   ```
   dev-admin-secret-123
   ```
3. Click **"View Responses"**.
4. You will see every submitted response timestamped, with all 12 survey answers, the October 20 memory, and the Freedom Wall message ("The Words We Never Said").

---

## 📸 3. How to Update or Replace Photos

1. Put your pictures (`.jpg`, `.jpeg`, `.png`, or `.webp`) into the folder:
   `public/gallery/`
2. Open [`src/lib/data.js`](src/lib/data.js).
3. Update the `galleryImages` array:
   ```javascript
   export const galleryImages = [
     {
       src: '/gallery/your_photo_name.jpg',
       caption: 'Our trip to the beach',
       date: 'Summer 2023',
     },
     {
       src: '/gallery/another_memory.jpg',
       caption: 'The night we talked for hours',
       date: 'October 20',
     },
   ];
   ```
4. If no photos are provided, an elegant placeholder camera icon with romantic text will appear automatically.

---

## ✍️ 4. How to Update Questions or Text

- **Questions**: Edit [`src/lib/data.js`](src/lib/data.js) inside `surveyQuestions`.
- **Welcome Message**: Edit [`src/app/page.js`](src/app/page.js) inside `WelcomeScreen`.
- **First Question ("October 20")**: Edit [`src/app/page.js`](src/app/page.js) inside `FirstQuestionScreen`.
- **Freedom Wall ("The Words We Never Said")**: Edit [`src/app/page.js`](src/app/page.js) inside `FreedomWallScreen`.
- **Final Message & Ending**: Edit [`src/app/page.js`](src/app/page.js) inside `FinalScreen`.

---

## ☁️ 5. Permanent Cloud Deployment (Vercel + Upstash Redis)

If you want a custom permanent domain on Vercel:

### Step 1: Upstash Redis (Free Persistent Database)
1. Go to [https://upstash.com](https://upstash.com) and create a free account.
2. Click **Create Database** -> Select **Redis** -> Region closest to you.
3. In the database details, scroll to **REST API** and copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Deploy to Vercel
1. Push this repository to GitHub or run:
   ```powershell
   npx vercel
   ```
2. In the Vercel project settings under **Environment Variables**, add:
   - `UPSTASH_REDIS_REST_URL`: (from Upstash)
   - `UPSTASH_REDIS_REST_TOKEN`: (from Upstash)
   - `ADMIN_SECRET`: (choose a secure secret password)
3. Hit Deploy! Your permanent URL (e.g. `our-memories.vercel.app`) will be live.
