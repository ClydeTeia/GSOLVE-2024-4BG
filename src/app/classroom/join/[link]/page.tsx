export default function JoinPage({ params }: { params: { link: string } }) {
  return (
    <div className="flex items-center justify-center h-full">
      Would you like to join the class {params.link}?
    </div>
  )
}