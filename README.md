
# 🎓 CUSAT SGPA Calculator

A sleek, responsive, and animated **SGPA Calculator** built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. Designed specifically for CUSAT students, this tool allows quick and accurate SGPA computation based on subject credits and grades.

## 🚀 Features

- 📚 Input subjects by credit weight (1, 2, or 3 credits)
- 🔢 Choose grades via dropdowns (S, A, B, C, D, F)
- 📈 Auto-calculates SGPA using weighted average
- 🧊 Beautiful animated UI with Framer Motion
- 💡 Built using App Router (`app/` directory structure)
- 🌐 Deployable on Vercel (fully supported)

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📦 Installation

```bash
git clone https://github.com/AaronPhilips101/cusat-sgpa-calculator.git
cd cusat-sgpa-calculator
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Live Demo

👉 [https://cusat-sgpa-calculator.aaronphilips101.eu.org](https://cusat-sgpa-calculator.aaronphilips101.eu.org)

## 📁 Project Structure (App Router)

```
src/
├── app/
│   ├── page.tsx          # Main calculator component
│   └── layout.tsx        # App layout
├── styles/
│   └── globals.css       # Tailwind CSS config
```

## 🧠 SGPA Formula

\[
SGPA = \frac{\sum (\text{Grade Points} \times \text{Credits})}{\sum \text{Credits}}
\]

Grade Mapping:

| Grade | Grade Point |
|-------|-------------|
| S     | 10          |
| A     | 9           |
| B     | 8           |
| C     | 7           |
| D     | 6           |
| F     | 0           |

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## 🙌 Contributions

Pull requests are welcome. For major changes, please open an issue first.

---

Made with 💙 by [Aaron Philips](https://github.com/AaronPhilips101)
