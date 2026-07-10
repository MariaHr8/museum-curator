interface ExportButtonProps {
  handleExport: () => void;
}

export const ExportButton = ({ handleExport }: ExportButtonProps) => (
  <button className="export-button" onClick={handleExport} title="Export">
    <svg
      className="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-6-6m6 6l6-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14" />
    </svg>
  </button>
);
