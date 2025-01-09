import { useEffect, useState } from "react"

const useActiveGameList = () => {
    const [loading, setLoading] = useState(true);
    const [activeGames, setActiveGames] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await fetch('http://localhost:8000/rooms/currentroom',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                })
    
                const data = await response.json();
                if(!response.ok){
                    console.log(data);
                    if(data.message === 'User not found'){
                        localStorage.removeItem('authToken')
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setActiveGames(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data', error);
            } finally{
                setLoading(false)
            }
        }
       
        fetchData()
    }, [])

    return {loading, activeGames}

}
export default useActiveGameList