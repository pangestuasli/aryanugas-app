import data from "./service.json";

export default function ServiceAdmin(){
  return(
    <div className="p-6">

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

        <table className="min-w-full text-sm text-gray-700">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Company</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className={`
                  ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  hover:bg-blue-50 transition duration-200
                `}
              >

                <td className="py-3 px-4 font-medium">
                  {item.name}
                </td>

                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                    {item.category}
                  </span>
                </td>

                <td className="py-3 px-4 text-blue-600 font-semibold">
                  Rp {item.price.toLocaleString()}
                </td>

                <td className="py-3 px-4 text-yellow-500 font-medium">
                  ⭐ {item.rating}
                </td>

                <td className="py-3 px-4">
                  {item.provider.company}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}