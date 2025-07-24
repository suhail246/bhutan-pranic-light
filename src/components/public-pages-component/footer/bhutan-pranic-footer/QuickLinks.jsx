import React from 'react'
import { quickLinks } from "./StaticData"

const QuickLinks = () => {
  return (
<div>
          <h3 className="primary-font-family font-bold text-[20px] mb-5 select-text">
            Quick Links
          </h3>
          <table className="text-gray-700 w-full">
            <tbody>
              {quickLinks.map(({ label, href }) => (
                <tr
                  key={label}
                  className="primary-font-family block text-gray-800 hover:text-yellow-400 transition-all duration-300 hover:-translate-y-1 hover:-translate-x-[-5px]"
                >
                  <td className="py-2 border-b border-transparent hover:border-black select-text">
                    <a href={href} className="block">
                      {label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  )
}

export default QuickLinks