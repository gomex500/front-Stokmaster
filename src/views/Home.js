import React, {useEffect, useState} from "react";
import { configApi } from "../api/configApi";
import {alertas} from "../api/alertas"
import {Btn, Carga} from '../components'
import '../css/home.css'
import marca from '../img/marca.png'

import { useDispatch, useSelector } from "react-redux";
import { getPcs } from "../store/slices/pc/pcThunks";
import jsPDF from "jspdf";


const Home = () =>{


    const [compu, setCompu] = useState(null);
    const [ver, setVer] = useState(false);

    const dispatch = useDispatch();
    const { pc, isLoading } = useSelector( state => state.pc);

    const verDetalles = (p) =>{
        setCompu(p);
        setVer(true);
    }

    const cerrar = () =>{
        setVer(false);
    }

    const eliminarPc = (id) =>{
        configApi.delete(`/pc/${id}`)
            .then(response =>{
                alertas('success', response.data.mensaje)
                dispatch( getPcs() );
            })
            .catch(error =>{
                alertas('error', error)
            })
    }

    const generalPDF = () =>{

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: 'letter'
          });

          const fecha = new Date().toLocaleDateString();

          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;
          doc.addImage(marca, 'JPEG', 0, 0, pageWidth, pageHeight);

          doc.setFont('Time-Roman');
          doc.setFontSize(16);
          doc.setTextColor("#252525")
          var width = doc.internal.pageSize.getWidth()
          doc.text('STOCKSMASTER', 0.5, 0.4);
          doc.text(`Fecha: ${fecha}`, 8, 0.4, {align: 'right'});
            doc.setFontSize(25);
            doc.setTextColor("#ff9900")
            doc.text('StockMaster', width/2, 1, {align: 'center'});
            doc.setFontSize(20);
            doc.setTextColor("#252525")
            doc.text(`Infome Detallado De: ${compu.Codigo}`, width/2, 1.3, {align: 'center'});
            doc.setFontSize(20);
            doc.text('Pc:',1,2);
            doc.setFontSize(18);
            doc.setTextColor("#ff9900")
            doc.text(compu.Codigo,1,2.3);
            doc.setTextColor("#252525");
            doc.setFontSize(20);
            doc.text('Marca:',1,2.6);
            doc.setFontSize(18);
            doc.setTextColor("#ff9900")
            doc.text(compu.Marca,1,2.9);
            doc.save("Informe.pdf");
    }

    useEffect(() => {
        dispatch( getPcs() );
    }, [])


    if (isLoading) {
        return (<Carga/>)
    } else {
        return(
            <div className="container-fluid">
                <div className={ver ? "cont-pcV": "row cont-pc"}>
                    <div className="cont-btn1">
                        <Btn
                            text={"General Informe"}
                            cls={"btn btn-primary"}
                        />
                    </div>
                    {pc.length > 0 ? (
                        pc.map((p,i) =>(
                            <div key={i} className="col-md-3 cardPc">
                                <div className="cardPc-head">
                                    <h3>{p.Codigo}</h3>
                                </div>
                                <hr/>
                                <div className="cont-body">
                                    <h4>Marca:</h4>
                                    <p>{p.Marca}</p>
                                    <h4>Sistema Operativo:</h4>
                                    <p>{p.SistemaOperativo}</p>
                                </div>
                                <div className="cont-btn">
                                    <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-eye"></i>}
                                        tp={'button'}
                                        fun={() => verDetalles(p)}
                                    />
                                    <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-pencil"></i>}
                                        tp={'button'}
                                    />
                                    <Btn
                                        cls={"btn btn-primary"}
                                        text={<i className="fa-solid fa-trash"></i>}
                                        tp={'button'}
                                        fun={() => eliminarPc(p._id)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (<div>No hay Pc</div>)}
                </div>
                {ver ? 
                <div className="cont-compu">
                    <Btn
                            cls={"btn btn-primary"}
                            text={<i className="fa-solid fa-circle-xmark"></i>}
                            fun={cerrar}
                        />  
                    <div className="row compu">
                        <h2>{compu.Codigo}</h2>
                        <hr/>
                        <div className="col-md-4 cont-p">
                            <p><span>Marca:</span> {compu.Marca}</p>
                            <p><span>Sistema Operativo:</span> {compu.SistemaOperativo}</p>
                            <p><span>Hardware:</span></p>
                            <ul>
                            {compu.Hardware.map((h, i) =>(
                                <li key={i}>{h}</li>
                            ))}
                            </ul>
                            <p><span>Software:</span></p>
                            <ul>
                            {compu.Software.map((s, i) =>(
                                <li key={i}>{s}</li>
                            ))}
                            </ul>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Actualizaciones:</span> {compu.Actualizaciones}</p>
                            <p><span>Configuración Red:</span> {compu.ConfiguraciónRed}</p>
                            <p><span>Usuarios:</span> {compu.Usuarios}</p>
                            <p><span>Seguridad:</span> {compu.Seguridad}</p>
                            <p><span>Registro Eventos:</span> {compu.RegistroEventos}</p>
                            </div>
                            <div className="col-md-4 cont-p">
                            <p><span>Microscopio:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Microscopio.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Microscopio.Modelo}</p>
                                </li>
                            </ul>
                            <p><span>Bateria:</span></p>
                            <ul>
                                <li>
                                    <p><span>Codigo: </span>{compu.Bateria.Codigo}</p>
                                </li>
                                <li>
                                    <p><span>Modelo: </span>{compu.Bateria.Modelo}</p>
                                </li>
                            </ul>
                        </div>
                        <Btn
                            tp={"button"}
                            text={"General Informe"}
                            cls={"btn btn1 btn-primary"}
                            fun={generalPDF}
                        />
                    </div>
                </div> : null}
            </div>
        );
    }
}

export default Home;