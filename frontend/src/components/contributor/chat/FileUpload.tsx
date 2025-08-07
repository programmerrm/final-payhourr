// import React from "react";
// import { ReactIcons } from "../../../utils/ReactIcons";

// interface FileUploadProps {
//     handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleFileUpload: () => void;
//     selectedFile: File | null;
// }

// export const FileUpload: React.FC<FileUploadProps> = ({
//     handleFileChange,
//     handleFileUpload,
//     selectedFile,
// }) => {
//     const { FaCloudUploadAlt } = ReactIcons;
//     return (
//         <div className="relative">

//             <label className="cursor-pointer relative">
//                 <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 hover:text-blue-600 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 10.828M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <input type="file" className="hidden" multiple />
//             </label>

//             <div id="image-preview" className="mt-2 hidden">
//                 <img src="" alt="Preview" className="w-12 h-12 rounded object-cover border border-gray-300" />
//             </div>

//             <input type="file" onChange={handleFileChange} />

//             <button
//                 onClick={handleFileUpload}
//                 className="bg-green-600 text-white px-4 py-2 rounded-xl"
//                 disabled={!selectedFile}
//             >
//                 <FaCloudUploadAlt />
//             </button>

//         </div>
//     );
// };

import React from "react";

export const FileUpload: React.FC = () => {
    

    return (
        <div>hjhj</div>
    );
};
