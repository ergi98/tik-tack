"use client";

const BOARD = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

export default function Home() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="h-fit">
        {BOARD.map((row, i) => (
          <div key={i} className="flex relative">
            {i !== 0 && (
              <div className=" absolute top-0">
                <Line size={96 * BOARD[i].length} />
              </div>
            )}
            {row.map((col, j) => (
              <div
                key={col}
                className="h-20 w-20 hover:bg-neutral-900/20 bg-neutral-950 flex items-center justify-center transition-colors rounded-lg text-neutral-50 cursor-pointer m-2 relative"
              >
                {[0, 1].includes(col) && (
                  <div className="absolute -right-2 top-0">
                    <Line size={96 * BOARD[j].length} vertical />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

type LineProps = {
  size: number | string;
  vertical?: boolean;
};

const Line: React.FC<LineProps> = ({ size, vertical }) => {
  return (
    <svg
      width={vertical ? 2 : size}
      height={vertical ? size : 2}
      style={{ strokeWidth: "4px" }}
      className="stroke-neutral-600"
    >
      {vertical ? (
        <line x1="0" y1="0" x2="0" y2="100%" />
      ) : (
        <line x1="0" y1="0" x2="100%" y2="0" />
      )}
    </svg>
  );
};
