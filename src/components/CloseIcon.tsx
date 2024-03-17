interface Props {
  clearInput: () => void;
}

export default function CloseIcon({ clearInput }: Props) {
  return (
    <svg className="absolute right-3 top-2.5 feather feather-x cursor-pointer hover:text-red-500"
      onClick={clearInput}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}
