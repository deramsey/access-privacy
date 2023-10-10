import { useState, useEffect } from 'react';
import axios from 'axios';

const masterList = axios.get("https://deramsey.github.io/policies/policies.json");

const PolicyList = () => {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        masterList.then((response) => {
            const fetchedPolicies = response.data.platforms;
            // Check the checkboxes with the values of "Blackboard", "Panopto", and "VoiceThread" by default
            fetchedPolicies.forEach(policy => {
                if (["Blackboard", "Panopto", "VoiceThread"].includes(policy.name)) {
                    policy.defaultChecked = true;
                }
            });
            setPolicies(fetchedPolicies);
        });
    }, []);

    return (
        <section>
            <form>
                {policies.map((policy, index) => (
                    <div key={index}>
                        <input 
                            type="checkbox" 
                            name="cb-item" 
                            id={"a" + index} 
                            value={policy.name} 
                            defaultChecked={policy.defaultChecked}
                            onChange={() => {
                                const row = document.querySelector(`.b${index}`);
                                row.style.display = row.style.display === "table-row" ? "none" : "table-row";
                            }}
                        />
                        <label htmlFor={index}>{policy.name}</label>
                    </div>
                ))}
            </form>
            <table>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Accessibility Policy</td>
                        <td>Privacy Policy</td>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy, index) => (
                        <tr key={index} className={"b" + index}>
                            <td className="row">{policy.name}</td>
                            <td><a href={policy.access} rel="noreferrer" target="_blank">Accessibility Policy</a></td>
                            <td><a href={policy.privacy} target="_blank" rel="noreferrer">Privacy Policy</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Please access this link for the institutional privacy policy: <a href="https://clevelandcc.edu/privacy-statement/" rel="noreferrer" target="_blank">CCC's Privacy Policy</a>.</p>
        </section>
    );
}

export default PolicyList;
