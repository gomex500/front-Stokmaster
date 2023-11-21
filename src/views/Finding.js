import React,{useState} from "react";
import { Checkbox } from "../components";
import '../css/finding.css'

const Finding = () =>{

    const [val1,setVal1] = useState(false);
    const [val2,setVal2] = useState(false);
    const [val3,setVal3] = useState(false);
    const [val4,setVal4] = useState(false);

    const contVal1 = (e) =>{
        setVal1(e.target.checked);
    }
    
    const contVal2 = (e) =>{
        setVal2(e.target.checked);
    }

    const contVal3 = (e) =>{
        setVal3(e.target.checked);
    }

    const contVal4 = (e) =>{
        setVal4(e.target.checked);
    }

    return(
        <div className="cont-finding">
            <h2>Hallazgos</h2>
            <div class="form-check">
                <Checkbox
                    cls={"form-check-input"}
                    val={val1}
                    id={"p1"}
                    func={contVal1}
                />
                <label class="form-check-label" htmlFor="p1">
                    <h4>{val1 ? '▲' : '▼'}Hallazgos a Abordar</h4>
                </label>
            </div>
            <hr/>
            {val1 ? (<div className="parrafos">
                <p>Los hallazgos relevantes identificados en el laboratorio B7 de bioanálisis incluyen la falta de cámaras de vigilancia y un sistema de alarma de seguridad, la necesidad de establecer políticas de seguridad específicas, como el registro de visitantes y el acceso controlado, y la recomendación de desarrollar un plan de respuesta a incidentes.<br/><br/>
                Las áreas específicas que requerirán acciones correctivas son la seguridad física del laboratorio, la gestión de políticas y procedimientos de seguridad, la respuesta a incidentes y la consideración de la implementación de sistemas de monitoreo adecuados.</p>
            </div>):null}
            <div class="form-check">
                <Checkbox
                    cls={"form-check-input"}
                    val={val2}
                    id={"p2"}
                    func={contVal2}
                />
                <label class="form-check-label" htmlFor="p2">
                    <h4>{val2 ? '▲' : '▼'}Descripción de Soluciones</h4>
                </label>
            </div>
            <hr/>
            {val2 ? (<div className="parrafos">
                <p>Cada uno de los hallazgos identificados en el laboratorio B7 se abordará mediante soluciones específicas, como la instalación de cámaras de vigilancia y un sistema de alarma de seguridad, la creación de políticas de seguridad, el desarrollo de un plan de respuesta a incidentes y la consideración de la implementación de sistemas de monitoreo adecuados.<br/><br/>
                Las acciones específicas que se llevarán a cabo para resolver estos hallazgos incluyen la contratación de un proveedor de seguridad para la instalación de cámaras y sistemas de alarma, la creación y documentación de políticas de seguridad, la capacitación del personal en el plan de respuesta a incidentes y la evaluación de soluciones de monitoreo de intrusiones.</p>
            </div>):null}
            <div class="form-check">
                <Checkbox
                    cls={"form-check-input"}
                    val={val3}
                    id={"p3 "}
                    func={contVal3}
                />
                <label class="form-check-label" htmlFor="p3 ">
                    <h4>{val3 ? '▲' : '▼'}Responsabilidades</h4>
                </label>
            </div>
            <hr/>
            {val3 ? (<div className="parrafos">
                <p>Las responsabilidades para llevar a cabo las acciones correctivas en el laboratorio incluyen la contratación del proveedor de seguridad, el personal encargado de implementar las políticas de seguridad, el equipo de respuesta a incidentes y el personal de TI encargado de la implementación de sistemas de monitoreo.<br/><br/>
                Se han designado roles específicos para cada tarea de corrección, como el responsable de la seguridad física, el encargado de la documentación de políticas, el líder del equipo de respuesta a incidentes y el personal de TI encargado de la implementación de sistemas de monitoreo.</p>
            </div>):null}
            <div class="form-check">
                <Checkbox
                    cls={"form-check-input"}
                    val={val4}
                    id={"p4"}
                    func={contVal4}
                />
                <label class="form-check-label" htmlFor="p4">
                    <h4>{val4 ? '▲' : '▼'}Recursos Necesarios</h4>
                </label>
            </div>
            <hr/>
            {val4 ? (<div className="parrafos">
                <p>Los recursos necesarios para implementar efectivamente las soluciones en el laboratorio incluyen personal de seguridad, equipos de seguridad como cámaras y sistemas de alarma, personal para la documentación de políticas, entrenamiento para el equipo de respuesta a incidentes y recursos técnicos para sistemas de monitoreo.<br/><br/>
                Se han identificado los recursos disponibles, como personal interno y equipos de cómputo, pero aún es necesario determinar los recursos externos requeridos, como el proveedor de seguridad y sistemas de monitoreo.</p>
            </div>):null}
            <div className="cont-table">
                <h3>Presupuesto de instalación de Cámaras</h3>
                <table className="table table table-bordered">
                    <thead>
                        <tr className="table-head">
                            <th>Elemento</th>
                            <th>Costo (USD)</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        <tr className="tbody">
                            <td>Cámaras Xiaomi (cantidad y modelo según necesidades)</td>
                            <td>$50 - $100 por cámara (por unidad)</td>
                        </tr>
                        <tr className="tbody">
                            <td>Almacenamiento Local</td>
                            <td>$300</td>
                        </tr>
                        <tr className="tbody">
                            <td>Cables y Accesorios</td>
                            <td>$50</td>
                        </tr>
                        <tr className="tbody">
                            <td>Mano de Obra (Instalación)</td>
                            <td>$300 - $800</td>
                        </tr>
                        <tr className="tbody">
                            <td>Configuración y Programación</td>
                            <td>$100 - $200</td>
                        </tr>
                        <tr className="tbody">
                            <td>Costo Total Estimado</td>
                            <td>$500 - $650 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Finding;