import axios from "axios";

const Test = () => {
        
    return ( 
        <>
        <input type="file" multiple accept="image/*" onChange={(e) => {imageTable(e.target)}} name="test"/>
        </>
    )
}
export default Test;