interface UploadButtonProps {
  onClick: () => void;
}

export const UploadButton = ({ onClick }: UploadButtonProps) => (
  <button className="fab-button" onClick={onClick} title="Add Image">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="28"
      height="28"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
    </svg>
  </button>
);
