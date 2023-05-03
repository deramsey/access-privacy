//import react from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const masterList = axios.get("https://deramsey.github.io/policies/policies.json");




const PolicyList = () => {
    
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        masterList.then((response) => {
           setPolicies(response.data.platforms);
        })
    })

return (
    <section>
        <form>
        {policies.map((policy) => {
        return(
            <div>
            <input type="checkbox" name="cb-item" id={"a"+ policies.indexOf(policy)} value={policy.name} onChange={()=>{if(document.querySelector(`.b${policies.indexOf(policy)}`).style.display === "table-row"){document.querySelector(`.b${policies.indexOf(policy)}`).style.display = "none"}else{document.querySelector(`.b${policies.indexOf(policy)}`).style.display = "table-row"}}}/>
        <label for={policies.indexOf(policy)}>{policy.name}</label>
        </div>
   );
   })
}
    </form>
    <table>
        <thead><td>Product Name</td><td>Accessibility Policy</td><td>Privacy Policy</td></thead>

        {policies.map((policy) => {
        return(
            <tr className = {"b" + policies.indexOf(policy)}>
                <td className="row">{policy.name}</td><td><a href={policy.access} rel="noreferrer" target="_blank">Accessibility Policy</a></td><td><a href={policy.privacy} target="_blank">Privacy Policy</a></td>
   </tr>
   );
   })
}
    </table>
    <p>Please access this link for institutional privacy policy: <a href="https://clevelandcc.edu/privacy-statement/" rel="noreferrer" target="_blank">CCC's Privacy Policy</a>. </p>
    </section>
)
}

export default PolicyList;