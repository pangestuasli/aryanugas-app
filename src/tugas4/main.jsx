import { createRoot } from "react-dom/client";  
import './tailwind.css';

import ServiceSearchFilter from "./ServiceSearchFilter";
import ServiceAdmin from "./ServiceAdmin";

createRoot(document.getElementById("root"))
.render(
    <div>
        <h1 className="text-2xl font-bold text-center mt-6">
            Guest View (Card)
        </h1>

        <ServiceSearchFilter/>

        <h1 className="text-2xl font-bold text-center mt-10">
            Admin View (Table)
        </h1>

        <ServiceAdmin/>
    </div>
)