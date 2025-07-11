 function ErrorMessage({ message }) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
        <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
      </div>
    </div>
  )
}
export default ErrorMessage