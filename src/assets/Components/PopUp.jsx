export default function PopUp({ animal, handleClose }) {

    return (
        <>
            <div className="popUp">
                {animal !== null ?
                    <div className="info" style={{ backgroundColor: `#${animal.text_color}` }} key={animal._id}>
                        <div className="popUpInfo">
                            <img className="amiboPopUp" src={animal.image_url} alt={animal.name} />
                        </div>
                        <div className="textoPopUpInfo" >
                            <h2 style={{
                                color: `#${animal.title_color}`
                            }}>Name: {animal.name} {animal.gender === "Male" ? <img className="imgSex" src="../../../public/male.png" /> : <img className="imgSex" src="../../../public/female.png" />}</h2>
                            <p style={{
                                color: `#${animal.title_color}`
                            }}> Species: {animal.species}</p>
                            <p style={{
                                color: `#${animal.title_color}`
                            }}>Personality: {animal.personality}</p>
                            <p style={{
                                color: `#${animal.title_color}`
                            }}>Birthday</p>
                            <div className="calendar">
                                <h6>{animal.birthday_month}</h6>
                                <p>{animal.birthday_day}</p>
                            </div>
                            <p style={{
                                color: `#${animal.title_color}`
                            }} className="frase">"{animal.quote}"</p>
                            <a className="linkMoreInfo" target="_blank" href={animal.url}>More info</a>
                            <button className="cerrar" onClick={handleClose}><img className="cerrarImg" src="../../../public/Close.png" alt="" /></button>
                        </div>
                    </div>
                    : <div className="loader"><img className="vibrar" src="../../../public/Error.png" alt="" /></div>}
            </div >
        </>
    );
};