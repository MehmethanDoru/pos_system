const categories = () => {
  return (
    <ul className="flex md:flex-col gap-6">
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Tümü</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Kebap</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Pide</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Fırın</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Tatlı</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>İçecek</span>
        </li>
        <li className="bg-green-600 py-8 px-10 text-white cursor-pointer hover:bg-rose-500 transition-all text-center">
            <span>Meze</span>
        </li>
    </ul>
  )
}

export default categories
