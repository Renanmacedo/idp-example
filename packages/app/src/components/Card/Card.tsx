import { identityApiRef, useApi } from "@backstage/core-plugin-api";
import { useEffect } from "react";


type CardProps = { 

    resible: boolean;
    children: React.ReactNode;
    title: string;
}
export const Card = () => {
    const identity = useApi(identityApiRef);
    

    
    useEffect(() => {

        const loadTodos = async () => {
            const user = await identity.getCredentials();
            fetch('http://localhost:7007/api/entity-permission/todos', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }).then(async res => {
            const data = await res.json();
            console.log("todos", { data })
        }).catch(err => {
            console.error(err)
        })
        }
        loadTodos();
        
    }, [])
    return (
        <div className="card">
            <p>Card</p>
        </div>
    )
}