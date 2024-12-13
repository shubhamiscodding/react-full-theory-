import React, { useContext } from "react";
import { basecontext } from "./App.jsx";

export default 
    function Home() {
        const context = useContext(basecontext);
    return (
        <>
        <p>user:{context.name}</p>
        <p>password:{context.pass}</p>
        </>
    )
}