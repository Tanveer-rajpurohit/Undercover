import { useEffect, useState } from "react"

const useWord = () => {
    const [loading, setLoding] = useState<boolean>(true);
    const [gameword, setWord] = useState<JSON | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoding(true);

                const response = await fetch('http://localhost:8000/offline/game', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (!response.ok) {
                    console.log(data);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setWord(data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoding(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once after mount

    return { loading, gameword }; // Return hook results
};

export default useWord;
