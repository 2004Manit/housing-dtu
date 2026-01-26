import { motion } from "motion/react";

// You'll need to replace this with your actual SVG path data
const svgPath = "M118.359 21.1971C150.467 -11.0362 194.953 -2.79761 215.585 21.201L297.369 101.661L318.632 124.648C328.507 133.26 332.821 147.151 334.68 158.805C335.612 164.647 335.932 169.955 336.019 173.802C336.062 175.725 336.047 177.285 336.021 178.365C336.008 178.905 335.993 179.326 335.981 179.611C335.975 179.754 335.969 179.864 335.965 179.937V350.845C333.368 368.5 329.847 381.41 322.119 391.726C314.386 402.048 302.489 409.712 283.29 416.963H64.7022C47.4689 414.973 35.1617 411.52 25.1729 404.382C15.3253 397.344 7.78784 386.764 0 370.603V199.605C6.97372 185.399 13.68 175.979 22.0166 169.218C30.3561 162.454 40.2871 158.382 53.9746 154.903C74.4161 155.911 88.3294 159.465 98.8682 167.75C109.402 176.03 116.489 188.978 123.276 208.596V232.891H214.727V168.451C217.649 158.813 223.918 153.26 230.744 152.938C237.577 152.617 244.679 157.551 249.222 168.331V334.456C247.819 339.519 246.358 343.184 243.865 345.865C241.358 348.559 237.863 350.204 232.503 351.298C225.424 350.008 221.637 348.484 219.27 345.871C216.92 343.277 216.04 339.67 214.742 334.508V272.483H123.303V334.442C122.085 339.796 120.835 344.052 117.74 346.947C114.629 349.856 109.756 351.307 101.538 351.307C97.36 351.307 94.1932 350.257 91.8018 348.657C89.4141 347.059 87.8282 344.932 86.7764 342.82C85.7257 340.711 85.2025 338.606 84.9414 337.034V210.964C83.4296 204.148 80.3505 199.051 75.7198 195.643C71.0743 192.225 64.8532 190.5 58.6065 190.5C52.3597 190.5 46.1387 192.225 41.4932 195.643C36.8624 199.051 33.7833 204.148 33.7832 210.964V353.904C37.4016 361.937 40.9259 367.304 45.544 371.315C50.1684 375.332 55.9291 378.025 64.0821 380.643H271.525C280.75 378.851 287.05 376.688 291.465 372.757C295.868 368.837 298.469 363.094 300.131 353.966V169.873C299.745 161.726 298.551 156.501 295.871 151.822C293.007 146.826 288.419 142.4 281.248 137.382C245.093 100.749 222.32 75.6988 191.546 50.2118C188.548 42.1735 179.344 37.4495 169.123 37.0887C158.93 36.7291 147.927 40.7291 141.634 50.1053L60.2022 129.931C51.144 133.306 41.7431 132.845 35.8965 128.643C32.5619 126.247 30.4034 122.639 30.2149 118.098C30.0272 113.569 31.7988 108.167 36.2002 102.148C51.8755 88.5555 58.8022 81.4982 66.7256 73.4413C82.5726 57.3274 102.409 37.2096 118.359 21.1971Z";

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#1B8FC7] to-[#0A2647] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 1, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-3 sm:gap-6 md:gap-10 px-2 sm:px-4">
        {/* Logo SVG with drawing animation */}
        <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-36 md:h-40 lg:w-44 lg:h-52 flex-shrink-0">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 337 417"
          >
            <defs>
              <clipPath id="clip0_1_25">
                <rect fill="white" height="417" width="337" />
              </clipPath>
            </defs>
            <g clipPath="url(#clip0_1_25)">
              <motion.path
                d={svgPath}
                stroke="#00C9A7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ 
                  pathLength: 0,
                }}
                animate={{ 
                  pathLength: 1,
                  fill: "#00C9A7"
                }}
                transition={{ 
                  pathLength: { duration: 2.5, ease: "easeInOut" },
                  fill: { delay: 2.3, duration: 0.2 }
                }}
              />
            </g>
          </svg>
        </div>

        {/* Text with reveal animation */}
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white whitespace-nowrap"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
        >
          Housing DTU.
        </motion.h1>
      </div>
    </motion.div>
  );
}