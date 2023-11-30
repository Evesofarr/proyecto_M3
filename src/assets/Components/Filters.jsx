import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Filters({ changeSel, setChangeSel }) {
    const [firsSelectValue, setFirstSelectValue] = useState(null);
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();

    function changeTypeValue(e) {
        setFirstSelectValue(e.target.value);
        fetch(`http://localhost:3005/api/${e.target.value}`)
            .then(res => res.json())
            .then(res => {
                setOptions(res);
            });
    };

    function changeSelected(e) {
        setChangeSel(e.target.value);
    };

    useEffect(() => {
        if (changeSel !== "") {
            navigate(`/${firsSelectValue}/${changeSel}`);
        }
    }, [changeSel]);




    return (
        <>
            <select className='selector' onChange={changeTypeValue}>
                <option className='opciones' defaultValue>Choose an option</option>
                <option className='opciones' value="species">Specie</option>
                <option className='opciones' value="gender">Gender</option>
                <option className='opciones' value="personality">Personality</option>
            </select>
            {options !== null ?
                <select className='selector' onChange={changeSelected}>
                    <option className='opciones' defaultValue>Choose an option</option>
                    {options.map((opt, i) => (
                        <option className='opciones' key={i} value={opt.type}>
                            {opt.type}
                        </option>
                    ))}
                </select>
                : ''}
        </>
    );
}
