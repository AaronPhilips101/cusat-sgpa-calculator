'use client';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const gradeOptions = [
  { label: "S (10)", value: 10 },
  { label: "A (9)", value: 9 },
  { label: "B (8)", value: 8 },
  { label: "C (7)", value: 7 },
  { label: "D (6)", value: 6 },
  { label: "F (0)", value: 0 },
];

export default function Home() {
  /* ----------------------------- Step-1 Counters ---------------------------- */
  const [oneCreditCount, setOneCreditCount] = useState(0);
  const [twoCreditCount, setTwoCreditCount] = useState(0);
  const [threeCreditCount, setThreeCreditCount] = useState(0);

  /* --------------------------- Step-2 Grade Arrays -------------------------- */
  const [oneCreditGrades, setOneCreditGrades] = useState<number[]>([]);
  const [twoCreditGrades, setTwoCreditGrades] = useState<number[]>([]);
  const [threeCreditGrades, setThreeCreditGrades] = useState<number[]>([]);

  /* -------------------------------- Result --------------------------------- */
  const [sgpa, setSgpa] = useState<string | null>(null);

  /* ------------------------- Keep Grade Arrays in Sync ---------------------- */
  useEffect(() => {
    setOneCreditGrades(Array(oneCreditCount).fill(-1));
  }, [oneCreditCount]);

  useEffect(() => {
    setTwoCreditGrades(Array(twoCreditCount).fill(-1));
  }, [twoCreditCount]);

  useEffect(() => {
    setThreeCreditGrades(Array(threeCreditCount).fill(-1));
  }, [threeCreditCount]);

  /* --------------------------- Utility Functions ---------------------------- */
  const allGradesSelected = () =>
    [...oneCreditGrades, ...twoCreditGrades, ...threeCreditGrades].every(
      (g) => g !== -1
    );

  const calculateSGPA = () => {
    const creditsArr: number[] = [
      ...Array(oneCreditCount).fill(1),
      ...Array(twoCreditCount).fill(2),
      ...Array(threeCreditCount).fill(3),
    ];
    const gradeArr = [
      ...oneCreditGrades,
      ...twoCreditGrades,
      ...threeCreditGrades,
    ];

    const totalCredits = creditsArr.reduce((a, b) => a + b, 0);
    const totalWeighted = gradeArr.reduce(
      (sum, gp, idx) => sum + gp * creditsArr[idx],
      0
    );
    const result = totalWeighted / totalCredits || 0;
    setSgpa(result.toFixed(2));
  };

  /* ------------------------------ UI Helpers -------------------------------- */
  const renderGradeSelectors = (
    count: number,
    creditValue: 1 | 2 | 3,
    grades: number[],
    setGrades: React.Dispatch<React.SetStateAction<number[]>>
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-indigo-700">
        {creditValue}-Credit Subjects
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <label
            key={idx}
            className="flex flex-col bg-white rounded-lg shadow p-4 transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="mb-2 font-medium text-gray-700">
              {creditValue}-Credit Subject {idx + 1}
            </span>
            <select
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              value={grades[idx] ?? -1}
              onChange={(e) => {
                const newGrades = [...grades];
                newGrades[idx] = Number(e.target.value);
                setGrades(newGrades);
              }}
            >
              <option value={-1}>Select Grade</option>
              {gradeOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="text-gray-800"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );

  const hasSubjects = oneCreditCount + twoCreditCount + threeCreditCount > 0;

  /* --------------------------------- Render -------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          SGPA Calculator
        </h1>

        {/* ------------------------------- Step 1 ------------------------------- */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
            <span className="text-3xl">🔽</span>
            Step 1: Select Number of Subjects
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* 1-credit */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Number of 1-Credit Subjects
              </label>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                value={oneCreditCount}
                onChange={(e) => setOneCreditCount(Number(e.target.value))}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i} className="text-gray-800">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            {/* 2-credit */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Number of 2-Credit Subjects
              </label>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                value={twoCreditCount}
                onChange={(e) => setTwoCreditCount(Number(e.target.value))}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i} className="text-gray-800">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            {/* 3-credit */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Number of 3-Credit Subjects
              </label>
              <select
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                value={threeCreditCount}
                onChange={(e) => setThreeCreditCount(Number(e.target.value))}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i} className="text-gray-800">
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ------------------------- Step 2 (Animated) -------------------------- */}
        <AnimatePresence initial={false}>
          {hasSubjects && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                Step 2: Input Grades for Each Subject
              </h2>

              {/* Inner credit groups with their own animations */}
              <AnimatePresence initial={false}>
                {oneCreditCount > 0 && (
                  <motion.div
                    key="one-credit"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderGradeSelectors(
                      oneCreditCount,
                      1,
                      oneCreditGrades,
                      setOneCreditGrades
                    )}
                  </motion.div>
                )}

                {twoCreditCount > 0 && (
                  <motion.div
                    key="two-credit"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderGradeSelectors(
                      twoCreditCount,
                      2,
                      twoCreditGrades,
                      setTwoCreditGrades
                    )}
                  </motion.div>
                )}

                {threeCreditCount > 0 && (
                  <motion.div
                    key="three-credit"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderGradeSelectors(
                      threeCreditCount,
                      3,
                      threeCreditGrades,
                      setThreeCreditGrades
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ------------------------------- Step 3 ------------------------------- */}
        {allGradesSelected() && (
          <section className="transition-opacity duration-500">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
              <span className="text-3xl">🧮</span>
              Step 3: SGPA Calculation
            </h2>
            <button
              onClick={calculateSGPA}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 active:scale-95 transition-transform duration-200"
            >
              Calculate SGPA
            </button>

            {sgpa && (
              <div className="mt-6 p-6 bg-teal-50 border border-teal-300 rounded-lg text-center">
                <p className="text-xl font-semibold text-teal-700">Your SGPA is:</p>
                <p className="text-4xl font-bold text-teal-900 mt-2 animate-bounce">
                  {sgpa}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
