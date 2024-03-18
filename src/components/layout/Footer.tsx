
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-800 w-full p-6 text-white text-center font-thin text-sm">
      COPYRIGHT©{currentYear} CRISTIAN
    </div>
  )
}